import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Проверка обязательных полей
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Создание нового пользователя
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'USER', // По умолчанию роль - пользователь
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Исключаем пароль из ответа
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { error: 'Ошибка при регистрации пользователя' },
      { status: 500 }
    );
  }
} 