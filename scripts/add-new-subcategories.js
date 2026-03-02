const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Новые подкатегории для категории "Канцтовары"
const newSubcategories = [
  // Ручки (уже существует, но добавим недостающие)
  {
    name: 'Стержни',
    slug: 'sterzhni',
    description: 'Стержни для ручек',
    order: 10,
    level: 1,
    children: [
      { name: 'Стержни гелевые', slug: 'sterzhni-gelevye', order: 1, level: 2 },
      { name: 'Стержни шариковые', slug: 'sterzhni-sharikovye', order: 2, level: 2 },
      { name: 'Стержни для роллеров', slug: 'sterzhni-dlya-rollerov', order: 3, level: 2 }
    ]
  },

  // Маркеры
  {
    name: 'Маркеры',
    slug: 'markery',
    description: 'Различные типы маркеров',
    order: 11,
    level: 1,
    children: [
      { name: 'Маркеры для выделения текста', slug: 'markery-dlya-vydeleniya-teksta', order: 1, level: 2 },
      { name: 'Маркеры перманентные (нестираемые)', slug: 'markery-permanentnye', order: 2, level: 2 },
      { name: 'Маркеры для досок', slug: 'markery-dlya-dosok', order: 3, level: 2 },
      { name: 'Маркеры специальные', slug: 'markery-spetsialnye', order: 4, level: 2 }
    ]
  },

  // Карандаши чернографитные
  {
    name: 'Карандаши чернографитные',
    slug: 'karandashi-chernografitnye',
    description: 'Чернографитные карандаши',
    order: 12,
    level: 1,
    children: [
      { name: 'Карандаши чернографитные пластиковые', slug: 'karandashi-chernografitnye-plastikovye', order: 1, level: 2 },
      { name: 'Карандаши чернографитные деревянные', slug: 'karandashi-chernografitnye-derevyannye', order: 2, level: 2 },
      { name: 'Карандаши чернографитные механические', slug: 'karandashi-chernografitnye-mekhanicheskie', order: 3, level: 2 }
    ]
  },

  // Грифели
  {
    name: 'Грифели',
    slug: 'grifeli',
    description: 'Грифели для различных инструментов',
    order: 13,
    level: 1,
    children: [
      { name: 'Грифели для механических карандашей', slug: 'grifeli-dlya-mekhanicheskikh-karandashei', order: 1, level: 2 },
      { name: 'Грифели для циркуля', slug: 'grifeli-dlya-tsirkulya', order: 2, level: 2 }
    ]
  },

  // Точилки
  {
    name: 'Точилки',
    slug: 'tochilki',
    description: 'Точилки для карандашей',
    order: 14,
    level: 1,
    children: [
      { name: 'Точилки без контейнера', slug: 'tochilki-bez-konteynera', order: 1, level: 2 },
      { name: 'Точилки с контейнером', slug: 'tochilki-s-konteynerom', order: 2, level: 2 },
      { name: 'Точилки механические', slug: 'tochilki-mekhanicheskie', order: 3, level: 2 }
    ]
  },

  // Ластики
  {
    name: 'Ластики',
    slug: 'lastiki',
    description: 'Ластики и корректоры',
    order: 15,
    level: 1,
    children: [
      { name: 'Корректоры для текста', slug: 'korrektory-dlya-teksta', order: 1, level: 2 },
      { name: 'Корректирующая жидкость', slug: 'korrektiruyushchaya-zhidkost', order: 2, level: 2 },
      { name: 'Ручка-корректор', slug: 'ruchka-korrektor', order: 3, level: 2 },
      { name: 'Корректирующая лента', slug: 'korrektiruyushchaya-lenta', order: 4, level: 2 }
    ]
  },

  // Клей
  {
    name: 'Клей',
    slug: 'klej',
    description: 'Различные типы клея',
    order: 16,
    level: 1,
    children: [
      { name: 'Клей-карандаш', slug: 'klej-karandash', order: 1, level: 2 },
      { name: 'Клей канцелярский', slug: 'klej-kantselyarskij', order: 2, level: 2 },
      { name: 'Клей ПВА', slug: 'klej-pva', order: 3, level: 2 }
    ]
  },

  // Клейкие ленты
  {
    name: 'Клейкие ленты',
    slug: 'klejkaya-lenta',
    description: 'Клейкие ленты и закладки',
    order: 17,
    level: 1,
    children: [
      { name: 'Клейкие ленты двухсторонние', slug: 'klejkie-lenty-dvukhstoronnie', order: 1, level: 2 },
      { name: 'Клейкие закладки пластиковые', slug: 'klejkie-zakladki-plastikovye', order: 2, level: 2 },
      { name: 'Клейкие закладки бумажные', slug: 'klejkie-zakladki-bumazhnye', order: 3, level: 2 }
    ]
  },

  // Бумага для заметок
  {
    name: 'Бумага для заметок',
    slug: 'bumaga-dlya-zametok',
    description: 'Блоки для заметок',
    order: 18,
    level: 1,
    children: [
      { name: 'Блок самоклеящийся пластиковый', slug: 'blok-samokleyashchijsya-plastikovyj', order: 1, level: 2 },
      { name: 'Блок самоклеящийся бумажный', slug: 'blok-samokleyashchijsya-bumazhnyj', order: 2, level: 2 },
      { name: 'Блок статический (магнитный)', slug: 'blok-staticheskij-magnitnyj', order: 3, level: 2 }
    ]
  },

  // Канцелярские мелочи
  {
    name: 'Канцелярские мелочи',
    slug: 'kantselyarskie-melochi',
    description: 'Различные канцелярские принадлежности',
    order: 19,
    level: 1,
    children: [
      { name: 'Скрепки', slug: 'skrepki', order: 1, level: 2 },
      { name: 'Скрепочницы', slug: 'skrepochitsy', order: 2, level: 2 },
      { name: 'Кнопки', slug: 'knopki', order: 3, level: 2 },
      { name: 'Зажимы', slug: 'zazhimy', order: 4, level: 2 },
      { name: 'Канцелярские резинки для денег', slug: 'kantselyarskie-rezinki-dlya-deneg', order: 5, level: 2 },
      { name: 'Гелевые подушечки для пальцев', slug: 'gelevye-podushechki-dlya-paltsev', order: 6, level: 2 },
      { name: 'Брелоки', slug: 'breloki', order: 7, level: 2 }
    ]
  },

  // Демонстрационное оборудование
  {
    name: 'Демонстрационное оборудование',
    slug: 'demonstratsionnoe-oborudovanie',
    description: 'Оборудование для демонстраций',
    order: 20,
    level: 1,
    children: [
      { name: 'Аксессуары для досок', slug: 'aksessuary-dlya-dosok', order: 1, level: 2 },
      { name: 'Бейджи и держатели для бейджей', slug: 'bejdzhi-i-derzhateli-dlya-bejdzhej', order: 2, level: 2 }
    ]
  },

  // Канцелярские наборы
  {
    name: 'Канцелярские наборы',
    slug: 'kantselyarskie-nabory',
    description: 'Наборы канцелярских принадлежностей',
    order: 21,
    level: 1,
    children: [
      { name: 'Набор первоклассника', slug: 'nabor-pervoklassnika', order: 1, level: 2 }
    ]
  },

  // Обложки
  {
    name: 'Обложки',
    slug: 'oblozhki',
    description: 'Обложки для документов',
    order: 22,
    level: 1,
    children: [
      { name: 'Обложки для тетрадей и учебников', slug: 'oblozhki-dlya-tetradej-i-uchebnikov', order: 1, level: 2 }
    ]
  },

  // Перфофайлы
  {
    name: 'Перфофайлы',
    slug: 'perfofajly',
    description: 'Перфофайлы для документов',
    order: 23,
    level: 1,
    children: [
      { name: 'Папки-скоросшиватели', slug: 'papki-skorosshivateli', order: 1, level: 2 }
    ]
  },

  // Папки-уголки
  {
    name: 'Папки-уголки',
    slug: 'papki-ugolki',
    description: 'Папки-уголки для документов',
    order: 24,
    level: 1,
    children: [
      { name: 'Папки-конверты', slug: 'papki-konverty', order: 1, level: 2 }
    ]
  },

  // ZIP-пакеты
  {
    name: 'ZIP-пакеты',
    slug: 'zip-pakety',
    description: 'ZIP-пакеты для документов',
    order: 25,
    level: 1,
    children: []
  },

  // Папки пластиковые
  {
    name: 'Папки пластиковые',
    slug: 'papki-plastikovye',
    description: 'Пластиковые папки',
    order: 26,
    level: 1,
    children: [
      { name: 'Папки файловые', slug: 'papki-fajlovye', order: 1, level: 2 },
      { name: 'Папки файловые с карманом на корешке', slug: 'papki-fajlovye-s-karmanom-na-koreshke', order: 2, level: 2 },
      { name: 'Папки файловые на спирали', slug: 'papki-fajlovye-na-spirali', order: 3, level: 2 },
      { name: 'Папки на кольцах', slug: 'papki-na-koltsakh', order: 4, level: 2 },
      { name: 'Папки-скоросшиватели с пружинным механизмом', slug: 'papki-skorosshivateli-s-pruzhinnym-mekhanizmom', order: 5, level: 2 },
      { name: 'Папки с зажимами', slug: 'papki-s-zazhimami', order: 6, level: 2 },
      { name: 'Папки на молнии', slug: 'papki-na-molnii', order: 7, level: 2 },
      { name: 'Папки на резинках', slug: 'papki-na-rezinkakh', order: 8, level: 2 },
      { name: 'Папки на резинках с корешком 30 мм', slug: 'papki-na-rezinkakh-s-koreshkom-30-mm', order: 9, level: 2 },
      { name: 'Папки на кнопке', slug: 'papki-na-knopke', order: 10, level: 2 },
      { name: 'Папки-картотеки', slug: 'papki-kartoteki', order: 11, level: 2 }
    ]
  },

  // Планшеты
  {
    name: 'Планшеты',
    slug: 'planshety',
    description: 'Планшеты для документов',
    order: 27,
    level: 1,
    children: [
      { name: 'Папки-планшеты', slug: 'papki-planshety', order: 1, level: 2 },
      { name: 'Портфели пластиковые', slug: 'portfeli-plastikovye', order: 2, level: 2 }
    ]
  },

  // Закладки
  {
    name: 'Закладки',
    slug: 'zakladki',
    description: 'Закладки для книг',
    order: 28,
    level: 1,
    children: []
  },

  // Подкладки настольные
  {
    name: 'Подкладки настольные',
    slug: 'podkladki-nastolnye',
    description: 'Настольные подкладки',
    order: 29,
    level: 1,
    children: [
      { name: 'Настольные подкладки', slug: 'nastolnye-podkladki', order: 1, level: 2 }
    ]
  },

  // Лотки и накопители для бумаг
  {
    name: 'Лотки и накопители для бумаг',
    slug: 'lotki-i-nakopiteli-dlya-bumag',
    description: 'Лотки для бумаг',
    order: 30,
    level: 1,
    children: [
      { name: 'Горизонтальные', slug: 'gorizontalnye', order: 1, level: 2 },
      { name: 'Вертикальные', slug: 'vertikalnye', order: 2, level: 2 },
      { name: 'Угловые', slug: 'uglovye', order: 3, level: 2 },
      { name: 'Многоярусные', slug: 'mnogoyarusnye', order: 4, level: 2 }
    ]
  },

  // Клейкие ленты и диспенсеры
  {
    name: 'Клейкие ленты и диспенсеры',
    slug: 'klejkie-lenty-i-dispensery',
    description: 'Ленты и диспенсеры',
    order: 31,
    level: 1,
    children: [
      { name: 'Канцелярские', slug: 'kantselyarskie', order: 1, level: 2 },
      { name: 'Упаковочные', slug: 'upakovochnye', order: 2, level: 2 },
      { name: 'Диспенсеры для лент', slug: 'dispensery-dlya-lent', order: 3, level: 2 }
    ]
  },

  // Штемпельная продукция
  {
    name: 'Штемпельная продукция',
    slug: 'shtempelnya-produktsiya',
    description: 'Штемпели и краски',
    order: 32,
    level: 1,
    children: [
      { name: 'Штемпельная краска', slug: 'shtempelnya-kraska', order: 1, level: 2 },
      { name: 'Штемпельные подушки', slug: 'shtempelnye-podushki', order: 2, level: 2 }
    ]
  },

  // Папки для хранения документов
  {
    name: 'Папки для хранения документов',
    slug: 'papki-dlya-khraneniya-dokumentov',
    description: 'Папки для документов',
    order: 33,
    level: 1,
    children: [
      { name: 'Папки-регистраторы с арочным механизмом', slug: 'papki-registratory-s-arochnym-mekhanizmom', order: 1, level: 2 },
      { name: 'Папки-регистраторы на кольцах', slug: 'papki-registratory-na-koltsakh', order: 2, level: 2 }
    ]
  },

  // Чертежные принадлежности
  {
    name: 'Чертежные принадлежности',
    slug: 'chertezhnye-prinadlezhnosti',
    description: 'Инструменты для черчения',
    order: 34,
    level: 1,
    children: [
      { name: 'Линейки', slug: 'linejki', order: 1, level: 2 },
      { name: 'Угольники', slug: 'ugolniki', order: 2, level: 2 },
      { name: 'Транспортиры', slug: 'transportiry', order: 3, level: 2 },
      { name: 'Наборы геометрические', slug: 'nabory-geometricheskie', order: 4, level: 2 },
      { name: 'Циркули и готовальни', slug: 'tsirkuli-i-gotovalni', order: 5, level: 2 },
      { name: 'Грифели для циркулей', slug: 'grifeli-dlya-tsirkulej', order: 6, level: 2 },
      { name: 'Бумага для черчения', slug: 'bumaga-dlya-chercheniya', order: 7, level: 2 }
    ]
  },

  // Степлеры
  {
    name: 'Степлеры',
    slug: 'steplery',
    description: 'Степлеры и скобы',
    order: 35,
    level: 1,
    children: [
      { name: 'Степлеры №10', slug: 'steplery-10', order: 1, level: 2 },
      { name: 'Степлеры №24/6', slug: 'steplery-24-6', order: 2, level: 2 },
      { name: 'Мощные степлеры №23', slug: 'moshchnye-steplery-23', order: 3, level: 2 },
      { name: 'Скобы для степлеров', slug: 'skoby-dlya-steplerov', order: 4, level: 2 },
      { name: 'Антистеплеры', slug: 'antisteplery', order: 5, level: 2 }
    ]
  },

  // Дыроколы
  {
    name: 'Дыроколы',
    slug: 'dyrokoly',
    description: 'Дыроколы для бумаги',
    order: 36,
    level: 1,
    children: [
      { name: 'Мощные дыроколы', slug: 'moshchnye-dyrokoly', order: 1, level: 2 }
    ]
  },

  // Ножницы
  {
    name: 'Ножницы',
    slug: 'nozhnitsy',
    description: 'Ножницы и резаки',
    order: 37,
    level: 1,
    children: [
      { name: 'Ножницы канцелярские', slug: 'nozhnitsy-kantselyarskie', order: 1, level: 2 },
      { name: 'Ножницы детские', slug: 'nozhnitsy-detskie', order: 2, level: 2 }
    ]
  },

  // Ножи канцелярские и резаки
  {
    name: 'Ножи канцелярские и резаки',
    slug: 'nozhi-kantselyarskie-i-rezaki',
    description: 'Ножи и резаки',
    order: 38,
    level: 1,
    children: [
      { name: 'Ножи канцелярские', slug: 'nozhi-kantselyarskie', order: 1, level: 2 },
      { name: 'Лезвия запасные', slug: 'lezviya-zapasnye', order: 2, level: 2 },
      { name: 'Резаки для бумаги', slug: 'rezaki-dlya-bumagi', order: 3, level: 2 },
      { name: 'Коврики для резки', slug: 'kovriki-dlya-rezki', order: 4, level: 2 }
    ]
  }
];

async function addNewSubcategories() {
  try {
    console.log('🌱 Начинаем добавление новых подкатегорий...');

    // Находим категорию "Канцтовары"
    const канцтовары = await prisma.category.findFirst({
      where: { name: 'Канцтовары' }
    });

    if (!канцтовары) {
      console.error('❌ Категория "Канцтовары" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория "Канцтовары" с ID: ${канцтовары.id}`);

    // Добавляем новые подкатегории
    for (const subcategoryData of newSubcategories) {
      const { children, ...subCategoryMain } = subcategoryData;
      
      // Проверяем, не существует ли уже такая подкатегория
      const existingSubcategory = await prisma.category.findFirst({
        where: {
          name: subcategoryData.name,
          parentId: канцтовары.id
        }
      });

      if (existingSubcategory) {
        console.log(`⚠️ Подкатегория "${subcategoryData.name}" уже существует, пропускаем`);
        continue;
      }

      // Создаем подкатегорию
      const subcategory = await prisma.category.create({
        data: {
          ...subCategoryMain,
          parentId: канцтовары.id
        }
      });
      
      console.log(`✅ Создана подкатегория: ${subcategory.name}`);

      // Создаем подподкатегории
      if (children) {
        for (const subSubCategoryData of children) {
          // Проверяем на дубли
          const existingSubSubcategory = await prisma.category.findFirst({
            where: {
              name: subSubCategoryData.name,
              parentId: subcategory.id
            }
          });

          if (existingSubSubcategory) {
            console.log(`⚠️ Подподкатегория "${subSubCategoryData.name}" уже существует, пропускаем`);
            continue;
          }

          await prisma.category.create({
            data: {
              ...subSubCategoryData,
              parentId: subcategory.id
            }
          });
          
          console.log(`    ✅ Создана подподкатегория: ${subSubCategoryData.name}`);
        }
      }
    }

    console.log('🎉 Все новые подкатегории успешно добавлены!');
    
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
    console.error('❌ Ошибка при добавлении подкатегорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addNewSubcategories();
