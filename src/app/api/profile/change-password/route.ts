import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function PUT(req: Request) {
  try {
    // Проверяем аутентификацию пользователя
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    // Проверка наличия всех необходимых полей
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Текущий и новый пароль обязательны' },
        { status: 400 }
      );
    }

    // Проверка минимальной длины нового пароля
    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'Новый пароль должен содержать минимум 6 символов' },
        { status: 400 }
      );
    }

    // Получаем текущего пользователя с паролем
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Проверяем текущий пароль
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Неверный текущий пароль' },
        { status: 400 }
      );
    }

    // Хешируем новый пароль
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedNewPassword,
      }
    });

    console.log('Password changed successfully for user:', user.id);

    return NextResponse.json(
      {
        message: 'Пароль успешно изменен',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { message: 'Ошибка при смене пароля' },
      { status: 500 }
    );
  }
}
