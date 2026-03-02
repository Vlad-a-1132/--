import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCategoryNameByPathSlug, getGroupTitleByCategoryName, getAllowedSubcategoryNames } from '@/lib/catalog-categories';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const priceRange = searchParams.get('priceRange');
    const subcategorySlug = searchParams.get('subcategory');
    const showAllInSection = searchParams.get('all') === '1';
    
    const resolvedParams = await params;
    const categorySlug = resolvedParams.slug;
    
    console.log('Fetching products for category slug:', categorySlug);
    
    // Сначала находим категорию по slug
    let category = await prisma.category.findFirst({
      where: { slug: categorySlug },
      include: {
        children: {
          include: {
            children: true
          }
        }
      }
    });

    // Если не найдено по slug — резолвим по пути каталога (URL из catalog-categories.json может не совпадать со slug в БД)
    if (!category) {
      const categoryNameFromPath = getCategoryNameByPathSlug(categorySlug);
      if (categoryNameFromPath) {
        category = await prisma.category.findFirst({
          where: { name: categoryNameFromPath, level: 1 },
          include: {
            children: {
              include: {
                children: true
              }
            }
          }
        });
      }
    }

    // В каталоге пункты типа «Сумки-шопперы» — это level 1. Если по slug нашли level 2 (под-подкатегорию), подменяем на level 1 с тем же именем, чтобы показывать товары из админки (они привязаны к level 1).
    if (category && category.level !== 1) {
      const level1Cat = await prisma.category.findFirst({
        where: { name: category.name, level: 1 },
        include: {
          children: {
            include: {
              children: true
            }
          }
        }
      });
      if (level1Cat) category = level1Cat;
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Категория не найдена' },
        { status: 404 }
      );
    }

    console.log('Found category:', category.name, 'Level:', category.level, 'ID:', category.id);

    // Все id категорий с тем же именем и уровнем (дубликаты в БД — товары из админки могут быть привязаны к любому)
    const sameNameIds = await prisma.category.findMany({
      where: { name: category.name, level: category.level },
      select: { id: true },
    }).then((rows) => rows.map((r) => r.id));

    // Строим условие поиска товаров
    const where: any = {
      isActive: true
    };

    // ?all=1 — «Все товары»: показываем товары из всех подкатегорий раздела (группы каталога)
    if (showAllInSection && category) {
      let groupTitle = getGroupTitleByCategoryName(category.name);
      if (!groupTitle) {
        const nameFromPath = getCategoryNameByPathSlug(categorySlug);
        if (nameFromPath) groupTitle = getGroupTitleByCategoryName(nameFromPath);
      }
      if (groupTitle) {
        const namesInGroup = getAllowedSubcategoryNames(groupTitle);
        const allIdsInGroup: string[] = [];
        for (const name of namesInGroup) {
          const ids = await prisma.category.findMany({
            where: { name },
            select: { id: true },
          }).then((r) => r.map((x) => x.id));
          allIdsInGroup.push(...ids);
        }
        const allChildIds = await prisma.category.findMany({
          where: { parentId: { in: allIdsInGroup } },
          select: { id: true },
        }).then((r) => r.map((x) => x.id));
        where.OR = [
          { categoryId: { in: allIdsInGroup } },
          { categoryId: { in: allChildIds } },
          { subsubcategory: { in: allIdsInGroup } },
        ];
      }
    } else if (category.level === 0) {
      // Основная категория — все подкатегории всех категорий с этим именем
      const mainIds = sameNameIds;
      const allSubs = await prisma.category.findMany({
        where: { parentId: { in: mainIds } },
        select: { id: true },
      });
      const subcategoryIds = allSubs.map((s) => s.id);
      const allSubSubs = await prisma.category.findMany({
        where: { parentId: { in: subcategoryIds } },
        select: { id: true },
      });
      const subsubcategoryIds = allSubSubs.map((s) => s.id);

      where.OR = [
        { categoryId: { in: subcategoryIds } },
        { categoryId: { in: subsubcategoryIds } },
        { subcategory: { in: subcategoryIds } },
        { subsubcategory: { in: subsubcategoryIds } }
      ];
    } else if (category.level === 1) {
      // Подкатегория — эта и все с тем же именем + их под-подкатегории
      const subsubcategoryIds = await prisma.category.findMany({
        where: { parentId: { in: sameNameIds } },
        select: { id: true },
      }).then((rows) => rows.map((r) => r.id));

      where.OR = [
        { categoryId: { in: sameNameIds } },
        { categoryId: { in: subsubcategoryIds } },
        { subcategory: { in: sameNameIds } },
        { subsubcategory: { in: subsubcategoryIds } }
      ];
    } else if (category.level === 2) {
      where.OR = [
        { categoryId: { in: sameNameIds } },
        { subsubcategory: { in: sameNameIds } }
      ];
    }

    const andConditions: any[] = [];

    // Фильтр по подкатегории: ?subcategory=slug — показываем только товары этой подкатегории (не применяем при ?all=1)
    if (!showAllInSection && subcategorySlug && category) {
      let subName: string | null = null;
      const subCatByParent = await prisma.category.findFirst({
        where: {
          slug: subcategorySlug,
          OR: [
            { parentId: { in: sameNameIds } },
            { id: { in: sameNameIds } }
          ]
        },
        select: { name: true }
      });
      if (subCatByParent) {
        subName = subCatByParent.name;
      } else {
        const bySlug = await prisma.category.findFirst({
          where: { slug: subcategorySlug },
          select: { name: true }
        });
        if (bySlug) subName = bySlug.name;
        else subName = getCategoryNameByPathSlug(subcategorySlug);
      }
      if (subName) {
        const subIds = await prisma.category.findMany({
          where: { name: subName },
          select: { id: true }
        }).then((r) => r.map((x) => x.id));
        const subChildren = await prisma.category.findMany({
          where: { parentId: { in: subIds } },
          select: { id: true }
        }).then((r) => r.map((x) => x.id));
        andConditions.push({
          OR: [
            { categoryId: { in: subIds } },
            { categoryId: { in: subChildren } },
            { subsubcategory: { in: subIds } }
          ]
        });
      }
    }

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ]
      });
    }
    if (andConditions.length) where.AND = andConditions;

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      where.price = { 
        gte: min, 
        lte: max 
      };
    }

    console.log('Where condition:', JSON.stringify(where, null, 2));

    const skip = (page - 1) * limit;

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

    console.log(`Found ${products.length} products for category ${category.name}`);

    // Преобразуем Decimal в number для JSON
    const serializedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      seoTitle: product.seoTitle || null,
      seoDescription: product.seoDescription || null,
      color: product.color || null, // Добавляем поле color
    }));

    return NextResponse.json({
      products: serializedProducts,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        level: category.level
      },
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении товаров по категории' },
      { status: 500 }
    );
  }
}
