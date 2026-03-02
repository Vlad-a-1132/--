import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const { name, email, phone } = await req.json();

    // Validation: name and email are required, phone is optional
    if (!name || !email) {
      return NextResponse.json({ message: 'Имя и email обязательны для заполнения' }, { status: 400 });
    }

    // Check if email is already taken by another user
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
          NOT: { id: session.user.id }
        }
      });
      if (existingUser) {
        return NextResponse.json({ message: 'Пользователь с таким email уже существует' }, { status: 400 });
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        phone: phone ? phone.trim() : null, // Phone can be null
      }
    });

    console.log('Profile updated successfully for user:', updatedUser.id);

    return NextResponse.json(
      {
        message: 'Профиль успешно обновлен',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Ошибка при обновлении профиля' }, { status: 500 });
  }
}
