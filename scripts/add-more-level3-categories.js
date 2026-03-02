const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addMoreLevel3Categories() {
  try {
    console.log('📝 Добавляем дополнительные подкатегории 3-го уровня...\n');

    // Находим категорию "Тетради предметные"
    const subjectCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради предметные' },
          { slug: 'tetradi-predmetnye' }
        ]
      }
    });

    if (subjectCategory) {
      console.log(`✅ Найдена категория: ${subjectCategory.name} (ID: ${subjectCategory.id})`);

      const subjectSubcategories = [
        {
          name: 'Тетради предметные с картонной обложкой',
          slug: 'tetradi-predmetnye-s-kartonnoy-oblozhkoy',
          description: 'Тетради предметные с картонной обложкой',
          level: 2,
          parentId: subjectCategory.id
        },
        {
          name: 'Тетради предметные с пластиковой обложкой',
          slug: 'tetradi-predmetnye-s-plastikovoy-oblozhkoy',
          description: 'Тетради предметные с пластиковой обложкой',
          level: 2,
          parentId: subjectCategory.id
        }
      ];

      console.log(`📋 Добавляем ${subjectSubcategories.length} подкатегорий для "Тетради предметные"...\n`);

      for (const subcategory of subjectSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: subjectCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Тетради на кольцах"
    const ringCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради на кольцах' },
          { slug: 'tetradi-na-koltsakh' }
        ]
      }
    });

    if (ringCategory) {
      console.log(`\n✅ Найдена категория: ${ringCategory.name} (ID: ${ringCategory.id})`);

      const ringSubcategories = [
        {
          name: 'Тетради А5 на кольцах',
          slug: 'tetradi-a5-na-koltsakh',
          description: 'Тетради А5 на кольцах',
          level: 2,
          parentId: ringCategory.id
        },
        {
          name: 'Тетради А4 на кольцах',
          slug: 'tetradi-a4-na-koltsakh',
          description: 'Тетради А4 на кольцах',
          level: 2,
          parentId: ringCategory.id
        }
      ];

      console.log(`📋 Добавляем ${ringSubcategories.length} подкатегорий для "Тетради на кольцах"...\n`);

      for (const subcategory of ringSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: ringCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Тетради FolderBook"
    const folderbookCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради FolderBook' },
          { slug: 'tetradi-folderbook' }
        ]
      }
    });

    if (folderbookCategory) {
      console.log(`\n✅ Найдена категория: ${folderbookCategory.name} (ID: ${folderbookCategory.id})`);

      const folderbookSubcategories = [
        {
          name: 'Тетради А5 FolderBook',
          slug: 'tetradi-a5-folderbook',
          description: 'Тетради А5 формата FolderBook',
          level: 2,
          parentId: folderbookCategory.id
        },
        {
          name: 'Тетради A4 FolderBook',
          slug: 'tetradi-a4-folderbook',
          description: 'Тетради A4 формата FolderBook',
          level: 2,
          parentId: folderbookCategory.id
        }
      ];

      console.log(`📋 Добавляем ${folderbookSubcategories.length} подкатегорий для "Тетради FolderBook"...\n`);

      for (const subcategory of folderbookSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: folderbookCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Альбомы для рисования"
    const albumCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Альбомы для рисования' },
          { slug: 'albomy-dlya-risovaniya' }
        ]
      }
    });

    if (albumCategory) {
      console.log(`\n✅ Найдена категория: ${albumCategory.name} (ID: ${albumCategory.id})`);

      const albumSubcategories = [
        {
          name: 'Альбомы на скобе',
          slug: 'albomy-na-skobe',
          description: 'Альбомы для рисования на скобе',
          level: 2,
          parentId: albumCategory.id
        },
        {
          name: 'Альбомы на клею',
          slug: 'albomy-na-kleyu',
          description: 'Альбомы для рисования на клею',
          level: 2,
          parentId: albumCategory.id
        },
        {
          name: 'Альбомы на спирали',
          slug: 'albomy-na-spirali',
          description: 'Альбомы для рисования на спирали',
          level: 2,
          parentId: albumCategory.id
        }
      ];

      console.log(`📋 Добавляем ${albumSubcategories.length} подкатегорий для "Альбомы для рисования"...\n`);

      for (const subcategory of albumSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: albumCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Бумага для рисования в папке"
    const drawingPaperCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Бумага для рисования в папке' },
          { slug: 'bumaga-dlya-risovaniya-v-papke' }
        ]
      }
    });

    if (drawingPaperCategory) {
      console.log(`\n✅ Найдена категория: ${drawingPaperCategory.name} (ID: ${drawingPaperCategory.id})`);

      const drawingPaperSubcategories = [
        {
          name: 'Бумага для рисования',
          slug: 'bumaga-dlya-risovaniya',
          description: 'Бумага для рисования в папках',
          level: 2,
          parentId: drawingPaperCategory.id
        },
        {
          name: 'Бумага для акварели',
          slug: 'bumaga-dlya-akvareli',
          description: 'Бумага для акварели в папках',
          level: 2,
          parentId: drawingPaperCategory.id
        }
      ];

      console.log(`📋 Добавляем ${drawingPaperSubcategories.length} подкатегорий для "Бумага для рисования в папке"...\n`);

      for (const subcategory of drawingPaperSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: drawingPaperCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Наборы для творчества"
    const craftCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Наборы для творчества' },
          { slug: 'nabory-dlya-tvorchestva' }
        ]
      }
    });

    if (craftCategory) {
      console.log(`\n✅ Найдена категория: ${craftCategory.name} (ID: ${craftCategory.id})`);

      const craftSubcategories = [
        {
          name: 'Цветная бумага',
          slug: 'tsvetnaya-bumaga',
          description: 'Цветная бумага для творчества',
          level: 2,
          parentId: craftCategory.id
        },
        {
          name: 'Картон',
          slug: 'karton',
          description: 'Картон для творчества',
          level: 2,
          parentId: craftCategory.id
        },
        {
          name: 'Наборы картона и бумаги',
          slug: 'nabory-kartona-i-bumagi',
          description: 'Наборы картона и бумаги для творчества',
          level: 2,
          parentId: craftCategory.id
        }
      ];

      console.log(`📋 Добавляем ${craftSubcategories.length} подкатегорий для "Наборы для творчества"...\n`);

      for (const subcategory of craftSubcategories) {
        try {
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
            continue;
          }

          const maxOrder = await prisma.category.findFirst({
            where: { parentId: craftCategory.id },
            orderBy: { order: 'desc' },
            select: { order: true }
          });

          const newOrder = maxOrder ? maxOrder.order + 1 : 1;

          const newCategory = await prisma.category.create({
            data: {
              ...subcategory,
              order: newOrder,
              isActive: true
            }
          });

          console.log(`✅ Добавлена: ${newCategory.name} (ID: ${newCategory.id})`);

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    console.log('\n✅ Все дополнительные подкатегории 3-го уровня добавлены!');

  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addMoreLevel3Categories();
