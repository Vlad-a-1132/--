const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addLevel3Categories() {
  try {
    console.log('📝 Добавляем подкатегории 3-го уровня...\n');

    // Находим категорию "Тетради на спирали и блокноты"
    const spiralCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради на спирали и блокноты' },
          { slug: 'tetradi-na-spirali-i-bloknoty' }
        ]
      }
    });

    if (!spiralCategory) {
      console.log('❌ Категория "Тетради на спирали и блокноты" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория: ${spiralCategory.name} (ID: ${spiralCategory.id})`);

    // Подкатегории для "Тетради на спирали и блокноты"
    const spiralSubcategories = [
      {
        name: 'Тетради на спирали с картонной обложкой',
        slug: 'tetradi-na-spirali-s-kartonnoy-oblozhkoy',
        description: 'Тетради на спирали с картонной обложкой различных форматов',
        level: 2,
        parentId: spiralCategory.id
      },
      {
        name: 'Блокноты на спирали с картонной обложкой',
        slug: 'bloknoty-na-spirali-s-kartonnoy-oblozhkoy',
        description: 'Блокноты на спирали с картонной обложкой',
        level: 2,
        parentId: spiralCategory.id
      },
      {
        name: 'Блокноты на клею',
        slug: 'bloknoty-na-kleyu',
        description: 'Блокноты на клею различных форматов',
        level: 2,
        parentId: spiralCategory.id
      }
    ];

    console.log(`📋 Добавляем ${spiralSubcategories.length} подкатегорий для "Тетради на спирали и блокноты"...\n`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const subcategory of spiralSubcategories) {
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
          where: { parentId: spiralCategory.id },
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

    // Теперь добавим подкатегории для других важных категорий
    console.log('\n📝 Добавляем подкатегории для других категорий...\n');

    // Находим категорию "Тетради на скобе с картонной обложкой"
    const stapledCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради на скобе с картонной обложкой' },
          { slug: 'tetradi-na-skobe-s-kartonnoy-oblozhkoy' }
        ]
      }
    });

    if (stapledCategory) {
      console.log(`✅ Найдена категория: ${stapledCategory.name} (ID: ${stapledCategory.id})`);

      const stapledSubcategories = [
        {
          name: 'Тетради А5, 12 листов',
          slug: 'tetradi-a5-12-listov',
          description: 'Тетради А5 с 12 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А5, 18 листов',
          slug: 'tetradi-a5-18-listov',
          description: 'Тетради А5 с 18 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А5, 24 листа',
          slug: 'tetradi-a5-24-lista',
          description: 'Тетради А5 с 24 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А5, 48 листов',
          slug: 'tetradi-a5-48-listov',
          description: 'Тетради А5 с 48 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А5, 96 листов',
          slug: 'tetradi-a5-96-listov',
          description: 'Тетради А5 с 96 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради В5, 60 листов',
          slug: 'tetradi-b5-60-listov',
          description: 'Тетради В5 с 60 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А4, 48 листов',
          slug: 'tetradi-a4-48-listov',
          description: 'Тетради А4 с 48 листами',
          level: 2,
          parentId: stapledCategory.id
        },
        {
          name: 'Тетради А4, 96 листов',
          slug: 'tetradi-a4-96-listov',
          description: 'Тетради А4 с 96 листами',
          level: 2,
          parentId: stapledCategory.id
        }
      ];

      console.log(`📋 Добавляем ${stapledSubcategories.length} подкатегорий для "Тетради на скобе с картонной обложкой"...\n`);

      for (const subcategory of stapledSubcategories) {
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
            where: { parentId: stapledCategory.id },
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
          addedCount++;

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    // Добавляем подкатегории для "Тетради и блокноты с пластиковой обложкой"
    const plasticCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Тетради и блокноты с пластиковой обложкой' },
          { slug: 'tetradi-i-bloknoty-s-plastikovoy-oblozhkoy' }
        ]
      }
    });

    if (plasticCategory) {
      console.log(`\n✅ Найдена категория: ${plasticCategory.name} (ID: ${plasticCategory.id})`);

      const plasticSubcategories = [
        {
          name: 'Тетради на спирали с пластиковой обложкой',
          slug: 'tetradi-na-spirali-s-plastikovoy-oblozhkoy',
          description: 'Тетради на спирали с пластиковой обложкой',
          level: 2,
          parentId: plasticCategory.id
        },
        {
          name: 'Блокноты на спирали с пластиковой обложкой',
          slug: 'bloknoty-na-spirali-s-plastikovoy-oblozhkoy',
          description: 'Блокноты на спирали с пластиковой обложкой',
          level: 2,
          parentId: plasticCategory.id
        }
      ];

      console.log(`📋 Добавляем ${plasticSubcategories.length} подкатегорий для "Тетради и блокноты с пластиковой обложкой"...\n`);

      for (const subcategory of plasticSubcategories) {
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
            where: { parentId: plasticCategory.id },
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
          addedCount++;

        } catch (error) {
          console.error(`❌ Ошибка при добавлении "${subcategory.name}":`, error.message);
        }
      }
    }

    console.log(`\n📊 Итоговый результат:`);
    console.log(`✅ Добавлено: ${addedCount} подкатегорий 3-го уровня`);
    console.log(`⏭️  Пропущено: ${skippedCount} подкатегорий (уже существуют)`);

    // Проверяем итоговую структуру
    console.log('\n🔍 Проверяем итоговую структуру...\n');
    
    const updatedSpiralCategory = await prisma.category.findUnique({
      where: { id: spiralCategory.id },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (updatedSpiralCategory && updatedSpiralCategory.children) {
      console.log(`📁 У "${updatedSpiralCategory.name}" теперь ${updatedSpiralCategory.children.length} подкатегорий 3-го уровня:`);
      updatedSpiralCategory.children.forEach((child, index) => {
        console.log(`  ${index + 1}. ${child.name} (ID: ${child.id})`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка при добавлении подкатегорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addLevel3Categories();
