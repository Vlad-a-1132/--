import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Валидация
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      );
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12);

    // Генерация кода подтверждения
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        emailVerificationCode: verificationCode,
        emailVerificationExpires: verificationExpires,
        isActive: false, // Пользователь неактивен до подтверждения email
      }
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      role: user.role
    });

    // ВРЕМЕННО: Отключаем отправку email для тестирования
    // try {
    //   await sendVerificationEmail(email, name, verificationCode);
    // } catch (error) {
    //   console.error('Error sending verification email:', error);
    //   
    //   // Если не удалось отправить email, удаляем пользователя
    //   await prisma.user.delete({
    //     where: { id: user.id }
    //   });
    //   
    //   throw new Error('Ошибка отправки email подтверждения. Попробуйте еще раз.');
    // }

    // ВРЕМЕННО: Активируем пользователя сразу для тестирования
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        emailVerified: true,
        emailVerificationCode: null,
        emailVerificationExpires: null,
      }
    });

    return NextResponse.json(
      {
        message: 'Регистрация успешна! Пользователь активирован для тестирования.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Ошибка регистрации' },
      { status: 500 }
    );
  }
} 