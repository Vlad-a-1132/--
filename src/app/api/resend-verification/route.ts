import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email обязателен' },
        { status: 400 }
      );
    }

    console.log('Resend verification attempt for:', email);

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

    // Генерация нового кода подтверждения
    const newVerificationCode = generateVerificationCode();
    const newVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

    // Обновление кода подтверждения
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationCode: newVerificationCode,
        emailVerificationExpires: newVerificationExpires,
      }
    });

    // Отправка нового email с кодом подтверждения
    try {
      await sendVerificationEmail(email.toLowerCase(), user.name, newVerificationCode);
      console.log('New verification email sent to:', email);
    } catch (emailError) {
      console.error('Error sending new verification email:', emailError);
      return NextResponse.json(
        { message: 'Ошибка отправки email. Попробуйте еще раз.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Новый код подтверждения отправлен на ваш email',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error resending verification:', error);
    return NextResponse.json(
      { message: 'Ошибка при повторной отправке кода подтверждения' },
      { status: 500 }
    );
  }
}
