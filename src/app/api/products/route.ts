import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('Connected to database for products fetch');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const priceRange = searchParams.get('priceRange');
    
    console.log('Search params:', { page, limit, category, search, priceRange });
    
    // Build where condition
    const where: any = {
      isActive: true
    };
    
    if (category) {
      // Ищем товары в указанной категории или в её подкатегориях
      // Сначала находим категорию по ID
      const categoryData = await prisma.category.findUnique({
        where: { id: category },
        include: {
          children: {
            include: {
              children: true
            }
          }
        }
      });

      if (categoryData) {
        if (categoryData.level === 0) {
          // Основная категория - ищем товары во всех её подкатегориях
          const subcategoryIds = categoryData.children?.map(child => child.id) || [];
          const subsubcategoryIds = categoryData.children?.flatMap(child => 
            child.children?.map(subchild => subchild.id) || []
          ) || [];
          
          where.OR = [
            { categoryId: { in: subcategoryIds } },
            { categoryId: { in: subsubcategoryIds } },
            { subcategory: { in: subcategoryIds } },
            { subsubcategory: { in: subsubcategoryIds } }
          ];
        } else if (categoryData.level === 1) {
          // Подкатегория - ищем товары в ней и её под-подкатегориях
          const subsubcategoryIds = categoryData.children?.map(child => child.id) || [];
          
          where.OR = [
            { categoryId: categoryData.id },
            { categoryId: { in: subsubcategoryIds } },
            { subcategory: categoryData.id },
            { subsubcategory: { in: subsubcategoryIds } }
          ];
        } else if (categoryData.level === 2) {
          // Под-подкатегория - ищем товары только в ней
          where.OR = [
            { categoryId: categoryData.id },
            { subsubcategory: categoryData.id }
          ];
        }
      }
    } else {
      // Если категория не указана, НЕ показываем товары
      // Это предотвращает показ всех товаров на главной странице каталога
      return NextResponse.json({
        products: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 0,
        },
      });
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      where.price = { 
        gte: min, 
        lte: max 
      };
    }
    
    console.log('Prisma where condition:', JSON.stringify(where, null, 2));
    
    const skip = (page - 1) * limit;
    
    console.log('Fetching products with categoryId:', category);
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true }
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

    console.log('Raw products from database:', products.map(p => ({ id: p.id, name: p.name, categoryId: p.categoryId, isActive: p.isActive, slug: p.slug })));

    // Преобразуем Decimal в number для JSON
    const serializedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      seoTitle: product.seoTitle || null,
      seoDescription: product.seoDescription || null,
      slug: product.slug, // Убеждаемся, что slug передается
      color: product.color || null // Добавляем поле color
    }));
    
    console.log(`Found ${products.length} products out of ${total} total`);
    
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
      { error: 'Ошибка при получении товаров' },
      { status: 500 }
    );
  }
} 