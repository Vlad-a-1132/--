const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addGiftsCategories() {
  try {
    console.log('📝 Добавляем подкатегории для "Подарки и декор"...\n');

    // Находим категорию "Подарки и декор"
    const giftsCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Подарки и декор' },
          { name: 'Подарки' },
          { slug: 'podarki-i-dekor' },
          { slug: 'podarki' }
        ]
      }
    });

    if (!giftsCategory) {
      console.log('❌ Категория "Подарки и декор" не найдена!');
      
      // Создаем категорию "Подарки и декор" если её нет
      console.log('📝 Создаем категорию "Подарки и декор"...');
      
      const newGiftsCategory = await prisma.category.create({
        data: {
          name: 'Подарки и декор',
          slug: 'podarki-i-dekor',
          description: 'Подарки, украшения и декоративные элементы',
          level: 0,
          parentId: null,
          order: 5,
          isActive: true
        }
      });
      
      console.log(`✅ Создана категория: ${newGiftsCategory.name} (ID: ${newGiftsCategory.id})`);
      
      // Теперь добавляем подкатегории
      await addGiftsSubcategories(newGiftsCategory.id);
      
    } else {
      console.log(`✅ Найдена категория: ${giftsCategory.name} (ID: ${giftsCategory.id})`);
      
      // Проверяем, есть ли уже подкатегории
      const existingSubcategories = await prisma.category.findMany({
        where: { parentId: giftsCategory.id }
      });
      
      if (existingSubcategories.length === 0) {
        console.log('📝 Добавляем подкатегории...');
        await addGiftsSubcategories(giftsCategory.id);
      } else {
        console.log(`📁 У категории уже есть ${existingSubcategories.length} подкатегорий:`);
        existingSubcategories.forEach(sub => {
          console.log(`  - ${sub.name}`);
        });
        
        // Добавляем недостающие подкатегории
        console.log('\n📝 Добавляем недостающие подкатегории...');
        await addGiftsSubcategories(giftsCategory.id);
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при добавлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addGiftsSubcategories(parentId) {
  try {
    // Список подкатегорий для "Подарки и декор"
    const giftsSubcategories = [
      {
        name: 'Подарочные наборы',
        slug: 'podarochnye-nabory',
        description: 'Готовые подарочные наборы',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Украшения для праздников',
        slug: 'ukrasheniya-dlya-prazdnikov',
        description: 'Украшения для различных праздников',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Декоративные элементы',
        slug: 'dekorativnye-elementy',
        description: 'Различные декоративные элементы',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Праздничные аксессуары',
        slug: 'prazdnichnye-aksessuary',
        description: 'Аксессуары для праздников',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Сувениры',
        slug: 'suveniry',
        description: 'Сувенирная продукция',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Новогодние украшения',
        slug: 'novogodnie-ukrasheniya',
        description: 'Украшения для Нового года',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Пасхальные украшения',
        slug: 'paskhalnye-ukrasheniya',
        description: 'Украшения для Пасхи',
        level: 1,
        parentId: parentId
      },
      {
        name: 'Детские подарки',
        slug: 'detskie-podarki',
        description: 'Подарки для детей',
        level: 1,
        parentId: parentId
      }
    ];

    console.log(`📋 Добавляем ${giftsSubcategories.length} подкатегорий...\n`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const subcategory of giftsSubcategories) {
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
          where: { parentId: parentId },
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
        if (subcategory.name === 'Подарочные наборы') {
          await addGiftSetSubcategories(newCategory.id);
        } else if (subcategory.name === 'Украшения для праздников') {
          await addHolidayDecorationSubcategories(newCategory.id);
        } else if (subcategory.name === 'Новогодние украшения') {
          await addNewYearDecorationSubcategories(newCategory.id);
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
  }
}

async function addGiftSetSubcategories(parentId) {
  try {
    const giftSetSubcategories = [
      {
        name: 'Наборы для творчества',
        slug: 'nabory-dlya-tvorchestva-podarki',
        description: 'Подарочные наборы для творчества',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Наборы для рукоделия',
        slug: 'nabory-dlya-rukodeliya',
        description: 'Подарочные наборы для рукоделия',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Наборы для рисования',
        slug: 'nabory-dlya-risovaniya-podarki',
        description: 'Подарочные наборы для рисования',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of giftSetSubcategories) {
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
    console.error('❌ Ошибка при добавлении подкатегорий для подарочных наборов:', error);
  }
}

async function addHolidayDecorationSubcategories(parentId) {
  try {
    const holidayDecorationSubcategories = [
      {
        name: 'Гирлянды',
        slug: 'girlyandy',
        description: 'Праздничные гирлянды',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Шары и игрушки',
        slug: 'shary-i-igrushki',
        description: 'Праздничные шары и игрушки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Ленты и банты',
        slug: 'lenty-i-banty',
        description: 'Праздничные ленты и банты',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of holidayDecorationSubcategories) {
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
    console.error('❌ Ошибка при добавлении подкатегорий для праздничных украшений:', error);
  }
}

async function addNewYearDecorationSubcategories(parentId) {
  try {
    const newYearDecorationSubcategories = [
      {
        name: 'Елки искусственные',
        slug: 'elki-iskusstvennye',
        description: 'Искусственные елки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Елочные игрушки',
        slug: 'elochnye-igrushki',
        description: 'Игрушки для елки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Мишура и дождик',
        slug: 'mishura-i-dozhdik',
        description: 'Мишура и дождик для елки',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of newYearDecorationSubcategories) {
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
    console.error('❌ Ошибка при добавлении подкатегорий для новогодних украшений:', error);
  }
}

addGiftsCategories();
