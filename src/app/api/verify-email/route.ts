import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // Проверка наличия всех необходимых полей
    if (!email || !code) {
      return NextResponse.json(
        { message: 'Email и код подтверждения обязательны' },
        { status: 400 }
      );
    }

    console.log('Email verification attempt for:', email);

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Проверка, не подтвержден ли уже email
    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email уже подтвержден' },
        { status: 400 }
      );
    }

    // Проверка кода подтверждения
    if (user.emailVerificationCode !== code) {
      return NextResponse.json(
        { message: 'Неверный код подтверждения' },
        { status: 400 }
      );
    }

    // Проверка срока действия кода
    if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
      return NextResponse.json(
        { message: 'Код подтверждения истек. Зарегистрируйтесь заново.' },
        { status: 400 }
      );
    }

    // Подтверждение email и активация аккаунта
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        isActive: true,
        emailVerificationCode: null,
        emailVerificationExpires: null,
      }
    });

    console.log('Email verified successfully for:', email);

    // Отправка приветственного email
    try {
      await sendWelcomeEmail(email.toLowerCase(), user.name);
      console.log('Welcome email sent to:', email);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Не блокируем процесс если не удалось отправить приветственный email
    }

    return NextResponse.json(
      {
        message: 'Email успешно подтвержден! Теперь вы можете войти в аккаунт.',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { message: 'Ошибка при подтверждении email' },
      { status: 500 }
    );
  }
}
