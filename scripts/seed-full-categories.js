const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Полная структура категорий и подкатегорий
const categoriesData = [
  // 1. Канцтовары (основная категория)
  {
    name: 'Канцтовары',
    slug: 'kancelyarskie-tovary',
    description: 'Основная категория канцелярских товаров',
    order: 1,
    level: 0,
    parentId: null,
    children: [
      {
        name: 'Ручки',
        slug: 'ruchki',
        description: 'Все виды ручек',
        order: 1,
        level: 1,
        children: [
          { name: 'Все ручки', slug: 'vse-ruchki', order: 1, level: 2 },
          { name: 'Ручки шариковые', slug: 'ruchki-sharikovye', order: 2, level: 2 },
          { name: 'Ручки шариковые автоматические', slug: 'ruchki-sharikovye-avtomaticheskie', order: 3, level: 2 },
          { name: 'Ручки шариковые на подставке', slug: 'ruchki-sharikovye-na-podstavke', order: 4, level: 2 },
          { name: 'Ручки гелевые', slug: 'ruchki-gelevye', order: 5, level: 2 },
          { name: 'Ручки гелевые автоматические', slug: 'ruchki-gelevye-avtomaticheskie', order: 6, level: 2 },
          { name: 'Ручки со стираемыми чернилами', slug: 'ruchki-so-stiraemymi-chernilami', order: 7, level: 2 },
          { name: 'Ручки-роллеры', slug: 'ruchki-rollery', order: 8, level: 2 },
          { name: 'Ручки капиллярные', slug: 'ruchki-kapillyarnye', order: 9, level: 2 }
        ]
      },
      {
        name: 'Карандаши',
        slug: 'karandashi',
        description: 'Все виды карандашей',
        order: 2,
        level: 1,
        children: [
          { name: 'Все карандаши', slug: 'vse-karandashi', order: 1, level: 2 },
          { name: 'Карандаши для рисования', slug: 'karandashi-dlya-risovaniya', order: 2, level: 2 },
          { name: 'Цветные карандаши', slug: 'tsvetnye-karandashi', order: 3, level: 2 },
          { name: 'Угольные карандаши', slug: 'ugolnye-karandashi', order: 4, level: 2 },
          { name: 'Масляная пастель', slug: 'maslyanaya-pastel', order: 5, level: 2 }
        ]
      }
    ]
  },

  // 2. Бумажная продукция (основная категория)
  {
    name: 'Бумажная продукция',
    slug: 'bumazhnaya-produktsiya',
    description: 'Основная категория бумажной продукции',
    order: 2,
    level: 0,
    parentId: null,
    children: [
      {
        name: 'Тетради и блокноты',
        slug: 'tetradi-i-bloknoty',
        description: 'Тетради и блокноты',
        order: 1,
        level: 1,
        children: [
          { name: 'Все тетради', slug: 'vse-tetradi', order: 1, level: 2 },
          { name: 'Тетради школьные', slug: 'tetradi-shkolnye', order: 2, level: 2 },
          { name: 'Тетради общие', slug: 'tetradi-obshchie', order: 3, level: 2 },
          { name: 'Блокноты', slug: 'bloknoty', order: 4, level: 2 },
          { name: 'Ежедневники', slug: 'ezhednevniki', order: 5, level: 2 }
        ]
      }
    ]
  },

  // 3. Товары для творчества (основная категория)
  {
    name: 'Товары для творчества',
    slug: 'tovary-dlya-tvorchestva',
    description: 'Основная категория товаров для творчества',
    order: 3,
    level: 0,
    parentId: null,
    children: [
      {
        name: 'Краски и кисти',
        slug: 'kraski-i-kisti',
        description: 'Краски и кисти для рисования',
        order: 1,
        level: 1,
        children: [
          { name: 'Все краски', slug: 'vse-kraski', order: 1, level: 2 },
          { name: 'Акварельные краски', slug: 'akvarelnye-kraski', order: 2, level: 2 },
          { name: 'Акриловые краски', slug: 'akrilovye-kraski', order: 3, level: 2 },
          { name: 'Кисти и мастихины', slug: 'kisti-i-mastikhiny', order: 4, level: 2 }
        ]
      }
    ]
  },

  // 4. Рюкзаки и аксессуары (основная категория)
  {
    name: 'Рюкзаки и аксессуары',
    slug: 'ryukzaki-i-aksessuary',
    description: 'Основная категория рюкзаков и аксессуаров',
    order: 4,
    level: 0,
    parentId: null,
    children: [
      {
        name: 'Рюкзаки',
        slug: 'ryukzaki',
        description: 'Рюкзаки и сумки',
        order: 1,
        level: 1,
        children: [
          { name: 'Все рюкзаки', slug: 'vse-ryukzaki', order: 1, level: 2 },
          { name: 'Школьные рюкзаки', slug: 'shkolnye-ryukzaki', order: 2, level: 2 },
          { name: 'Спортивные рюкзаки', slug: 'sportivnye-ryukzaki', order: 3, level: 2 },
          { name: 'Сумки', slug: 'sumki', order: 4, level: 2 }
        ]
      }
    ]
  },

  // 5. Подарки и декор (основная категория)
  {
    name: 'Подарки и декор',
    slug: 'podarki-i-dekor',
    description: 'Основная категория подарков и декора',
    order: 5,
    level: 0,
    parentId: null,
    children: [
      {
        name: 'Подарки',
        slug: 'podarki',
        description: 'Подарочные товары',
        order: 1,
        level: 1,
        children: [
          { name: 'Все подарки', slug: 'vse-podarki', order: 1, level: 2 },
          { name: 'Подарочные наборы', slug: 'podarochnye-nabory', order: 2, level: 2 },
          { name: 'Специальные коллекции', slug: 'spetsialnye-kollektsii', order: 3, level: 2 }
        ]
      }
    ]
  }
];

async function seedCategories() {
  try {
    console.log('🌱 Начинаем заполнение категорий...');

    // Очищаем существующие категории
    await prisma.category.deleteMany({});
    console.log('🗑️ Существующие категории удалены');

    // Создаем основные категории
    for (const categoryData of categoriesData) {
      const { children, ...mainCategoryData } = categoryData;
      
      const mainCategory = await prisma.category.create({
        data: mainCategoryData
      });
      
      console.log(`✅ Создана основная категория: ${mainCategory.name}`);

      // Создаем подкатегории первого уровня
      for (const subCategoryData of children) {
        const { children: subChildren, ...subCategoryMain } = subCategoryData;
        
        const subCategory = await prisma.category.create({
          data: {
            ...subCategoryMain,
            parentId: mainCategory.id
          }
        });
        
        console.log(`  ✅ Создана подкатегория: ${subCategory.name}`);

        // Создаем подкатегории второго уровня
        if (subChildren) {
          for (const subSubCategoryData of subChildren) {
            await prisma.category.create({
              data: {
                ...subSubCategoryData,
                parentId: subCategory.id
              }
            });
            
            console.log(`    ✅ Создана подподкатегория: ${subSubCategoryData.name}`);
          }
        }
      }
    }

    console.log('🎉 Все категории успешно созданы!');
    
    // Выводим статистику
    const totalCategories = await prisma.category.count();
    const mainCategories = await prisma.category.count({ where: { level: 0 } });
    const subCategories = await prisma.category.count({ where: { level: 1 } });
    const subSubCategories = await prisma.category.count({ where: { level: 2 } });
    
    console.log(`📊 Статистика:`);
    console.log(`   Всего категорий: ${totalCategories}`);
    console.log(`   Основных категорий: ${mainCategories}`);
    console.log(`   Подкатегорий 1 уровня: ${subCategories}`);
    console.log(`   Подкатегорий 2 уровня: ${subSubCategories}`);

  } catch (error) {
    console.error('❌ Ошибка при создании категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
