const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixGiftsCategories() {
  try {
    console.log('🔧 Исправляем структуру категории "Подарки и декор"...\n');

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
      return;
    }

    console.log(`✅ Найдена категория: ${giftsCategory.name} (ID: ${giftsCategory.id})`);

    // Удаляем все существующие подкатегории
    console.log('🗑️  Удаляем существующие неправильные подкатегории...');
    
    const existingSubcategories = await prisma.category.findMany({
      where: { parentId: giftsCategory.id }
    });

    if (existingSubcategories.length > 0) {
      console.log(`📁 Найдено ${existingSubcategories.length} существующих подкатегорий для удаления:`);
      existingSubcategories.forEach(sub => {
        console.log(`  - ${sub.name} (ID: ${sub.id})`);
      });

      // Удаляем подкатегории 3-го уровня сначала
      for (const subcategory of existingSubcategories) {
        const level3Categories = await prisma.category.findMany({
          where: { parentId: subcategory.id }
        });
        
        if (level3Categories.length > 0) {
          console.log(`    🗑️  Удаляем ${level3Categories.length} подкатегорий 3-го уровня для "${subcategory.name}"`);
          for (const level3Cat of level3Categories) {
            await prisma.category.delete({
              where: { id: level3Cat.id }
            });
            console.log(`      ✅ Удалена: ${level3Cat.name}`);
          }
        }
      }

      // Теперь удаляем подкатегории 2-го уровня
      for (const subcategory of existingSubcategories) {
        await prisma.category.delete({
          where: { id: subcategory.id }
        });
        console.log(`✅ Удалена подкатегория: ${subcategory.name}`);
      }
    }

    // Создаем правильные подкатегории
    console.log('\n📝 Создаем правильные подкатегории...');
    
    const correctSubcategories = [
      {
        name: 'Елочный декор',
        slug: 'elochnyy-dekor',
        description: 'Украшения для елки и новогоднего декора',
        level: 1,
        parentId: giftsCategory.id
      },
      {
        name: 'Специальные коллекции',
        slug: 'spetsialnye-kollektsii',
        description: 'Специальные коллекции декора и подарков',
        level: 1,
        parentId: giftsCategory.id
      },
      {
        name: 'Декор и подарки',
        slug: 'dekor-i-podarki',
        description: 'Декоративные элементы и подарки',
        level: 1,
        parentId: giftsCategory.id
      },
      {
        name: 'Формовые украшения',
        slug: 'formovye-ukrasheniya',
        description: 'Формовые украшения для различных праздников',
        level: 1,
        parentId: giftsCategory.id
      }
    ];

    console.log(`📋 Создаем ${correctSubcategories.length} правильных подкатегорий...\n`);

    for (const subcategory of correctSubcategories) {
      try {
        // Получаем максимальный порядок для подкатегорий
        const maxOrder = await prisma.category.findFirst({
          where: { parentId: giftsCategory.id },
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

        console.log(`✅ Создана: ${newCategory.name} (ID: ${newCategory.id})`);

        // Добавляем подкатегории 3-го уровня для каждой категории
        if (subcategory.name === 'Елочный декор') {
          await addChristmasDecorationSubcategories(newCategory.id);
        } else if (subcategory.name === 'Специальные коллекции') {
          await addSpecialCollectionsSubcategories(newCategory.id);
        } else if (subcategory.name === 'Декор и подарки') {
          await addDecorAndGiftsSubcategories(newCategory.id);
        } else if (subcategory.name === 'Формовые украшения') {
          await addFormedDecorationsSubcategories(newCategory.id);
        }

      } catch (error) {
        console.error(`❌ Ошибка при создании "${subcategory.name}":`, error.message);
      }
    }

    console.log('\n✅ Структура категории "Подарки и декор" исправлена!');

  } catch (error) {
    console.error('❌ Ошибка при исправлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addChristmasDecorationSubcategories(parentId) {
  try {
    const christmasSubcategories = [
      {
        name: 'Елочные шары',
        slug: 'elochnye-shary',
        description: 'Различные елочные шары',
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
        name: 'Гирлянды',
        slug: 'girlyandy',
        description: 'Новогодние гирлянды',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Мишура и дождик',
        slug: 'mishura-i-dozhdik',
        description: 'Мишура и дождик для елки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Звезды и верхушки',
        slug: 'zvezdy-i-verkushki',
        description: 'Звезды и верхушки для елки',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of christmasSubcategories) {
      try {
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
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для елочного декора:', error);
  }
}

async function addSpecialCollectionsSubcategories(parentId) {
  try {
    const specialCollectionsSubcategories = [
      {
        name: 'Праздничные наборы',
        slug: 'prazdnichnye-nabory',
        description: 'Наборы для различных праздников',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Тематические коллекции',
        slug: 'tematicheskie-kollektsii',
        description: 'Тематические коллекции украшений',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Лимитированные серии',
        slug: 'limitirovannye-serii',
        description: 'Лимитированные серии декора',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Авторские работы',
        slug: 'avtorskie-raboty',
        description: 'Авторские декоративные работы',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of specialCollectionsSubcategories) {
      try {
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
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для специальных коллекций:', error);
  }
}

async function addDecorAndGiftsSubcategories(parentId) {
  try {
    const decorAndGiftsSubcategories = [
      {
        name: 'Декоративные элементы',
        slug: 'dekorativnye-elementy',
        description: 'Различные декоративные элементы',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Подарочные наборы',
        slug: 'podarochnye-nabory',
        description: 'Готовые подарочные наборы',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Сувениры',
        slug: 'suveniry',
        description: 'Сувенирная продукция',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Праздничные аксессуары',
        slug: 'prazdnichnye-aksessuary',
        description: 'Аксессуары для праздников',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Украшения для дома',
        slug: 'ukrasheniya-dlya-doma',
        description: 'Украшения для интерьера дома',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of decorAndGiftsSubcategories) {
      try {
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
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для декора и подарков:', error);
  }
}

async function addFormedDecorationsSubcategories(parentId) {
  try {
    const formedDecorationsSubcategories = [
      {
        name: 'Формовые шары',
        slug: 'formovye-shary',
        description: 'Формовые декоративные шары',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Формовые фигурки',
        slug: 'formovye-figurki',
        description: 'Формовые декоративные фигурки',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Формовые цветы',
        slug: 'formovye-tsvety',
        description: 'Формовые декоративные цветы',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Формовые листья',
        slug: 'formovye-listya',
        description: 'Формовые декоративные листья',
        level: 2,
        parentId: parentId
      },
      {
        name: 'Формовые банты',
        slug: 'formovye-banty',
        description: 'Формовые декоративные банты',
        level: 2,
        parentId: parentId
      }
    ];

    for (const subcategory of formedDecorationsSubcategories) {
      try {
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
      } catch (error) {
        console.error(`    ❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий для формовых украшений:', error);
  }
}

fixGiftsCategories();
