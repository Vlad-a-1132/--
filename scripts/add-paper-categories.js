const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addPaperCategories() {
  try {
    console.log('📝 Добавляем недостающие подкатегории для "Бумажная продукция"...\n');

    // Находим категорию "Бумажная продукция"
    const paperCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { contains: 'Бумажная продукция' } },
          { slug: 'bumazhnaya-produktsiya' }
        ]
      }
    });

    if (!paperCategory) {
      console.log('❌ Категория "Бумажная продукция" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория: ${paperCategory.name} (ID: ${paperCategory.id})`);

    // Список подкатегорий, которые нужно добавить
    const newSubcategories = [
      {
        name: 'Тетради на скобе с картонной обложкой',
        slug: 'tetradi-na-skobe-s-kartonnoy-oblozhkoy',
        description: 'Тетради на скобе с картонной обложкой различных форматов',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради предметные',
        slug: 'tetradi-predmetnye',
        description: 'Тетради для различных предметов',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Наклейки',
        slug: 'nakleyki',
        description: 'Различные виды наклеек',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради на спирали и блокноты',
        slug: 'tetradi-na-spirali-i-bloknoty',
        description: 'Тетради на спирали и различные блокноты',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради и блокноты с пластиковой обложкой',
        slug: 'tetradi-i-bloknoty-s-plastikovoy-oblozhkoy',
        description: 'Тетради и блокноты с пластиковой обложкой',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради на кольцах',
        slug: 'tetradi-na-koltsakh',
        description: 'Тетради на кольцах различных форматов',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради FolderBook',
        slug: 'tetradi-folderbook',
        description: 'Тетради формата FolderBook',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради для записи иностранных слов',
        slug: 'tetradi-dlya-zapisi-inostrannyh-slov',
        description: 'Специальные тетради для изучения иностранных языков',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Тетради для нот',
        slug: 'tetradi-dlya-not',
        description: 'Тетради для записи нот',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Расписания уроков',
        slug: 'raspisaniya-urokov',
        description: 'Расписания уроков и занятий',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Альбомы для рисования',
        slug: 'albomy-dlya-risovaniya',
        description: 'Альбомы для рисования различных форматов',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Бумага для рисования в папке',
        slug: 'bumaga-dlya-risovaniya-v-papke',
        description: 'Бумага для рисования в папках',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Наборы для творчества',
        slug: 'nabory-dlya-tvorchestva',
        description: 'Наборы для творчества и рукоделия',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Записные книжки',
        slug: 'zapisnye-knizhki',
        description: 'Записные книжки и дневники',
        level: 1,
        parentId: paperCategory.id
      },
      {
        name: 'Планинги и ежедневники',
        slug: 'planingi-i-ezhednevniki',
        description: 'Планинги, ежедневники и органайзеры',
        level: 1,
        parentId: paperCategory.id
      }
    ];

    console.log(`📋 Добавляем ${newSubcategories.length} новых подкатегорий...\n`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const subcategory of newSubcategories) {
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
          where: { parentId: paperCategory.id },
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

      } catch (error) {
        console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
      }
    }

    console.log(`\n📊 Результат:`);
    console.log(`✅ Добавлено: ${addedCount} категорий`);
    console.log(`⏭️  Пропущено: ${skippedCount} категорий (уже существуют)`);

    // Проверяем итоговую структуру
    console.log('\n🔍 Проверяем итоговую структуру "Бумажная продукция"...\n');
    
    const updatedPaperCategory = await prisma.category.findUnique({
      where: { id: paperCategory.id },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (updatedPaperCategory && updatedPaperCategory.children) {
      console.log(`📁 У "Бумажная продукция" теперь ${updatedPaperCategory.children.length} подкатегорий:`);
      updatedPaperCategory.children.forEach((child, index) => {
        console.log(`  ${index + 1}. ${child.name} (ID: ${child.id})`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при добавлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addPaperCategories();
