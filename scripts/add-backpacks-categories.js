const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addBackpacksCategories() {
  try {
    console.log('📝 Добавляем подкатегории для "Рюкзаки и аксессуары"...\n');

    // Находим категорию "Рюкзаки и аксессуары"
    const backpacksCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Рюкзаки и аксессуары' },
          { slug: 'ryukzaki-i-aksessuary' }
        ]
      }
    });

    if (!backpacksCategory) {
      console.log('❌ Категория "Рюкзаки и аксессуары" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория: ${backpacksCategory.name} (ID: ${backpacksCategory.id})`);

    // Список подкатегорий для "Рюкзаки и аксессуары"
    const backpacksSubcategories = [
      {
        name: 'Школьные рюкзаки',
        slug: 'shkolnye-ryukzaki',
        description: 'Рюкзаки для школы',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Спортивные рюкзаки',
        slug: 'sportivnye-ryukzaki',
        description: 'Рюкзаки для спорта',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Туристические рюкзаки',
        slug: 'turisticheskie-ryukzaki',
        description: 'Рюкзаки для туризма',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Сумки',
        slug: 'sumki',
        description: 'Различные виды сумок',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Портфели',
        slug: 'portfeli',
        description: 'Портфели и кейсы',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Кошельки и портмоне',
        slug: 'koshelki-i-portmone',
        description: 'Кошельки и портмоне',
        level: 1,
        parentId: backpacksCategory.id
      },
      {
        name: 'Аксессуары для сумок',
        slug: 'aksessuary-dlya-sumok',
        description: 'Аксессуары для сумок и рюкзаков',
        level: 1,
        parentId: backpacksCategory.id
      }
    ];

    console.log(`📋 Добавляем ${backpacksSubcategories.length} подкатегорий...\n`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const subcategory of backpacksSubcategories) {
      try {
        // Проверяем, существует ли уже такая категория
        const existingCategory = await prisma.category.findFirst({
          where: {
            OR: [
              { name: subcategory.name },
              { slug: subcategory.slug }
            ]
          }
        });

        if (existingCategory) {
          console.log(`⏭️  Пропускаем "${subcategory.name}" - уже существует`);
          skippedCount++;
          continue;
        }

        // Получаем максимальный порядок для подкатегорий
        const maxOrder = await prisma.category.findFirst({
          where: { parentId: backpacksCategory.id },
          orderBy: { order: 'desc' },
          select: { order: true }
        });

        const newOrder = maxOrder ? maxOrder.order + 1 : 1;

        // Создаем новую подкатегорию
        const newCategory = await prisma.category.create({
          data: {
            ...subcategory,
            order: newOrder,
            isActive: true
          }
        });

        console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);
        addedCount++;

        // Добавляем подкатегории 3-го уровня для некоторых категорий
        if (subcategory.name === 'Школьные рюкзаки') {
          await addSchoolBackpackSubcategories(newCategory.id);
        } else if (subcategory.name === 'Сумки') {
          await addBagsSubcategories(newCategory.id);
        }

      } catch (error) {
        console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }

    console.log(`\n📊 Результат:`);
    console.log(`✅ Добавлено: ${addedCount} подкатегорий`);
    console.log(`⏭️  Пропущено: ${skippedCount} подкатегорий (уже существуют)`);

  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addSchoolBackpackSubcategories(parentId) {
  try {
    const schoolBackpackSubcategories = [
      {
        name: 'Рюкзаки для начальной школы',
        slug: 'ryukzaki-dlya-nachalnoy-shkoly',
        description: 'Рюкзаки для учеников 1-4 классов',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Рюкзаки для средней школы',
        slug: 'ryukzaki-dlya-sredney-shkoly',
        description: 'Рюкзаки для учеников 5-9 классов',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Рюкзаки для старшей школы',
        slug: 'ryukzaki-dlya-starshey-shkoly',
        description: 'Рюкзаки для учеников 10-11 классов',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of schoolBackpackSubcategories) {
      try {
        const existingCategory = await prisma.category.findFirst({
          where: {
            OR: [
              { name: subcategory.name },
              { slug: subcategory.slug }
            ]
          }
        });

        if (!existingCategory) {
          const maxOrder = await prisma.category.findFirst({
            where: { parentId: parentId },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`    ✅ Добавлена подкатегория: ${subcategory.name}`);
        }
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для школьных рюкзаков:', error);
  }
}

async function addBagsSubcategories(parentId) {
  try {
    const bagsSubcategories = [
      {
        name: 'Сумки через плечо',
        slug: 'sumki-cherez-plecho',
        description: 'Сумки через плечо',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Сумки-мешки',
        slug: 'sumki-meshki',
        description: 'Сумки-мешки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Сумки для ноутбуков',
        slug: 'sumki-dlya-noutbukov',
        description: 'Сумки для ноутбуков',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of bagsSubcategories) {
      try {
        const existingCategory = await prisma.category.findFirst({
          where: {
            OR: [
              { name: subcategory.name },
              { slug: subcategory.slug }
            ]
          }
        });

        if (!existingCategory) {
          const maxOrder = await prisma.category.findFirst({
            where: { parentId: parentId },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`    ✅ Добавлена подкатегория: ${subcategory.name}`);
        }
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для сумок:', error);
  }
}

addBackpacksCategories();
