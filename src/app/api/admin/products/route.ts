import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';

// Функция для транслитерации кириллицы в латиницу
function transliterateToLatin(text: string): string {
  const transliterationMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };

  return text
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('');
}

// Helper function to check admin authorization
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN' && session.user.role !== 'editor')) {
    throw new Error('Unauthorized');
  }
}

// GET /api/admin/products
export async function GET(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      console.error('Unauthorized access attempt to fetch products');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for admin products fetch');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    console.log('Admin search params:', { page, limit, category, search });
    
    // Build where condition
    const where: any = {};
    
    if (category) {
      where.categoryId = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    console.log('Admin Prisma where condition:', JSON.stringify(where, null, 2));
    
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { name: true }
          }
        },
        orderBy: { 
          createdAt: 'desc' 
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ]);
    
    // Преобразуем Decimal в number для JSON
    const serializedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      subcategory: product.subcategory || null,
      subsubcategory: product.subsubcategory || null,
      seoTitle: product.seoTitle || null,
      seoDescription: product.seoDescription || null
    }));
    
    console.log(`Found ${products.length} products out of ${total} total for admin`);
    
    return NextResponse.json({
      products: serializedProducts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении товаров: ' + error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/products
export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      console.error('Unauthorized access attempt to create product');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for product creation');

    // Получение данных из запроса
    const data = await request.json();
    console.log('Received product data:', data);

    // Валидация обязательных полей
    const requiredFields = ['name', 'description', 'price', 'categoryId', 'sku', 'stock'];
    const missingFields = requiredFields.filter(field => !data[field] && data[field] !== 0);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Отсутствуют обязательные поля: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Проверка уникальности SKU
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku }
    });
    
    if (existingProduct) {
      console.error('Duplicate SKU found:', data.sku);
      return NextResponse.json(
        { error: 'Товар с таким артикулом уже существует' },
        { status: 400 }
      );
    }

    // Создание slug из названия с транслитерацией
    let slug = data.slug || transliterateToLatin(data.name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Убираем все символы кроме букв, цифр, пробелов и дефисов
      .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
      .replace(/-+/g, '-') // Убираем множественные дефисы
      .replace(/^-|-$/g, ''); // Убираем дефисы в начале и конце

    // Проверяем уникальность slug и добавляем число если нужно
    let counter = 1;
    let originalSlug = slug;
    while (true) {
      const existingProduct = await prisma.product.findUnique({
        where: { slug }
      });
      
      if (!existingProduct) break;
      
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    // Создание нового товара
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        oldPrice: data.oldPrice,
        images: data.images || [],
        categoryId: data.categoryId,
        sku: data.sku,
        stock: data.stock,
        color: data.color,
        subcategory: data.subcategory,
        subsubcategory: data.subsubcategory,
        specifications: data.specifications || {},
        isActive: data.isActive ?? true,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
      include: {
        category: {
          select: { name: true }
        }
      }
    });

    console.log('Product created successfully:', product.id);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании товара: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products
export async function PUT(request: NextRequest) {
  try {
    await checkAdminAuth();
    console.log('Connected to database for product update');

    const data = await request.json();
    const { id, ...updateData } = data;

    console.log('Attempting to update product:', id);
    console.log('Update data:', JSON.stringify(updateData, null, 2));

    // Если изменилось название, обновляем slug
    if (updateData.name) {
      let newSlug = transliterateToLatin(updateData.name)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      // Проверяем уникальность нового slug
      let counter = 1;
      let originalSlug = newSlug;
      while (true) {
        const existingProduct = await prisma.product.findFirst({
          where: { 
            slug: newSlug,
            id: { not: id } // Исключаем текущий товар
          }
        });
        
        if (!existingProduct) break;
        
        newSlug = `${originalSlug}-${counter}`;
        counter++;
      }
      
      updateData.slug = newSlug;
    }

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    const product = await prisma.product.update({
      where: { id },
      data: cleanUpdateData,
      include: {
        category: {
          select: { name: true }
        }
      }
    });

    console.log('Product updated successfully:', {
      id: product.id,
      name: product.name,
      sku: product.sku
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 401 });
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/products
export async function DELETE(request: NextRequest) {
  try {
    await checkAdminAuth();
    console.log('Connected to database for product deletion');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID товара не указан' }, { status: 400 });
    }

    console.log('Attempting to delete product:', id);

    await prisma.product.delete({
      where: { id }
    });

    console.log('Product deleted successfully:', id);

    return NextResponse.json({ message: 'Товар успешно удален' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 401 });
    }
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 