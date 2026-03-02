const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupWrongCategories() {
  try {
    console.log('🧹 Очищаем неправильные категории...\n');

    // Список неправильных категорий, которые нужно удалить
    const wrongCategories = [
      'Верхушки',
      'Лапландия',
      'Венецианский Карнавал',
      'Скатерть-самобранка',
      'Мир сказок',
      'Мир детства',
      'Лесное Царство',
      'Перламутровый Мир',
      'Зефир',
      'Рождество',
      'Винтаж',
      'Веселые зверушки'
    ];

    console.log(`📋 Ищем и удаляем ${wrongCategories.length} неправильных категорий...\n`);

    let deletedCount = 0;
    let notFoundCount = 0;

    for (const categoryName of wrongCategories) {
      try {
        // Ищем категорию по названию
        const category = await prisma.category.findFirst({
          where: { name: categoryName }
        });

        if (category) {
          console.log(`🗑️  Удаляем категорию: ${category.name} (ID: ${category.id})`);
          
          // Сначала удаляем все подкатегории этой категории
          const subcategories = await prisma.category.findMany({
            where: { parentId: category.id }
          });

          if (subcategories.length > 0) {
            console.log(`    🗑️  Удаляем ${subcategories.length} подкатегорий...`);
            for (const sub of subcategories) {
              await prisma.category.delete({
                where: { id: sub.id }
              });
              console.log(`      ✅ Удалена подкатегория: ${sub.name}`);
            }
          }

          // Теперь удаляем саму категорию
          await prisma.category.delete({
            where: { id: category.id }
          });

          console.log(`✅ Удалена категория: ${category.name}`);
          deletedCount++;

        } else {
          console.log(`⏭️  Категория "${categoryName}" не найдена`);
          notFoundCount++;
        }

      } catch (error) {
        console.error(`❌ Ошибка при удалении "${categoryName}":`, error.message);
      }
    }

    console.log(`\n📊 Результат очистки:`);
    console.log(`✅ Удалено: ${deletedCount} категорий`);
    console.log(`⏭️  Не найдено: ${notFoundCount} категорий`);

    // Проверяем, что осталось в базе
    console.log('\n🔍 Проверяем итоговое состояние...');
    
    const totalCategories = await prisma.category.count();
    const level0Count = await prisma.category.count({ where: { level: 0 } });
    const level1Count = await prisma.category.count({ where: { level: 1 } });
    const level2Count = await prisma.category.count({ where: { level: 2 } });

    console.log(`📈 Итоговое распределение по уровням:`);
    console.log(`   Всего категорий: ${totalCategories}`);
    console.log(`   Уровень 0 (основные категории): ${level0Count}`);
    console.log(`   Уровень 1 (подкатегории): ${level1Count}`);
    console.log(`   Уровень 2 (подподкатегории): ${level2Count}`);

    console.log('\n✅ Очистка завершена!');

  } catch (error) {
    console.error('❌ Ошибка при очистке:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupWrongCategories();
