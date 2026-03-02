import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';

// GET all categories
export async function GET(request: NextRequest) {
  try {
    console.log('Connected to database for categories fetch');

    // Получение параметров запроса
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    // Формирование запроса
    const where = adminMode ? {} : { isActive: true };

    // Получение категорий с иерархией
    const categories = await prisma.category.findMany({
      where,
      include: {
        children: {
          include: {
            children: true
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    
    console.log(`Found ${categories.length} categories`);

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении категорий: ' + error.message },
      { status: 500 }
    );
  }
}

// POST a new category
export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      console.error('Unauthorized access attempt to create category');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for category creation');

    // Получение данных из запроса
    const data = await request.json();
    console.log('Received category data:', data);

    // Валидация обязательных полей
    if (!data.name) {
      console.error('Missing required field: name');
      return NextResponse.json(
        { error: 'Название категории обязательно' },
        { status: 400 }
      );
    }

    // Создание slug из названия
    const slug = data.name
      .toLowerCase()
      .replace(/[^\wа-яё\s]/g, '')
      .replace(/\s+/g, '-');

    // Проверка уникальности slug
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });
    
    if (existingCategory) {
      console.error('Duplicate slug found:', slug);
      return NextResponse.json(
        { error: 'Категория с таким названием уже существует' },
        { status: 400 }
      );
    }

    // Получение максимального значения order
    const maxOrderCategory = await prisma.category.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const order = maxOrderCategory ? maxOrderCategory.order + 1 : 0;

    // Создание новой категории
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        order,
        isActive: data.isActive ?? true,
        level: data.level || 0,
        parentId: data.parentId || null,
      }
    });

    console.log('Category created successfully:', category.id);
    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании категории: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/categories
export async function PUT(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      console.error('Unauthorized access attempt to update category');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for category update');

    // Получение данных из запроса
    const data = await request.json();
    console.log('Received category update data:', data);

    if (!data.id) {
      return NextResponse.json(
        { error: 'ID категории обязателен' },
        { status: 400 }
      );
    }

    // Обновление категории
    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        order: data.order,
        isActive: data.isActive,
      }
    });

    console.log('Category updated successfully:', updatedCategory.id);
    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Категория не найдена' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Ошибка при обновлении категории: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories
export async function DELETE(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      console.error('Unauthorized access attempt to delete category');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for category deletion');

    // Получение ID категории из URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID категории обязателен' },
        { status: 400 }
      );
    }

    // Проверка наличия связанных товаров
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    });
    
    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'Невозможно удалить категорию, содержащую товары' },
        { status: 400 }
      );
    }

    // Удаление категории
    await prisma.category.delete({
      where: { id }
    });

    console.log('Category deleted successfully:', id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Категория не найдена' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Ошибка при удалении категории: ' + error.message },
      { status: 500 }
    );
  }
} 