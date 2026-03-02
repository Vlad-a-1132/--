const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeGiftsCategory() {
  try {
    console.log('🗑️  Удаляем категорию "Подарки и декор" и все её подкатегории...\n');

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

    // Получаем все подкатегории 1-го уровня
    const level1Subcategories = await prisma.category.findMany({
      where: { parentId: giftsCategory.id }
    });

    console.log(`📁 Найдено ${level1Subcategories.length} подкатегорий 1-го уровня:`);
    level1Subcategories.forEach(sub => {
      console.log(`  - ${sub.name} (ID: ${sub.id})`);
    });

    // Удаляем подкатегории 3-го уровня сначала
    let totalLevel3Deleted = 0;
    for (const subcategory of level1Subcategories) {
      const level3Categories = await prisma.category.findMany({
        where: { parentId: subcategory.id }
      });
      
      if (level3Categories.length > 0) {
        console.log(`\n🗑️  Удаляем ${level3Categories.length} подкатегорий 3-го уровня для "${subcategory.name}":`);
        for (const level3Cat of level3Categories) {
          await prisma.category.delete({
            where: { id: level3Cat.id }
          });
          console.log(`    ✅ Удалена: ${level3Cat.name}`);
          totalLevel3Deleted++;
        }
      }
    }

    // Удаляем подкатегории 2-го уровня
    console.log('\n🗑️  Удаляем подкатегории 2-го уровня...');
    for (const subcategory of level1Subcategories) {
      await prisma.category.delete({
        where: { id: subcategory.id }
      });
      console.log(`✅ Удалена подкатегория: ${subcategory.name}`);
    }

    // Удаляем основную категорию "Подарки и декор"
    console.log('\n🗑️  Удаляем основную категорию "Подарки и декор"...');
    await prisma.category.delete({
      where: { id: giftsCategory.id }
    });
    console.log(`✅ Удалена основная категория: ${giftsCategory.name}`);

    // Проверяем итоговое состояние
    console.log('\n🔍 Проверяем итоговое состояние...');
    
    const totalCategories = await prisma.category.count();
    const level0Count = await prisma.category.count({ where: { level: 0 } });
    const level1Count = await prisma.category.count({ where: { level: 1 } });
    const level2Count = await prisma.category.count({ where: { level: 2 } });

    console.log(`📊 Итоговое распределение по уровням:`);
    console.log(`   Всего категорий: ${totalCategories}`);
    console.log(`   Уровень 0 (основные категории): ${level0Count}`);
    console.log(`   Уровень 1 (подкатегории): ${level1Count}`);
    console.log(`   Уровень 2 (подподкатегории): ${level2Count}`);

    // Показываем оставшиеся основные категории
    const remainingMainCategories = await prisma.category.findMany({
      where: { level: 0 },
      orderBy: { order: 'asc' }
    });

    console.log(`\n📋 Оставшиеся основные категории (${remainingMainCategories.length}):`);
    remainingMainCategories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat.name} (ID: ${cat.id})`);
    });

    console.log(`\n✅ Удаление завершено!`);
    console.log(`📊 Статистика удаления:`);
    console.log(`   Удалено подкатегорий 3-го уровня: ${totalLevel3Deleted}`);
    console.log(`   Удалено подкатегорий 2-го уровня: ${level1Subcategories.length}`);
    console.log(`   Удалено основных категорий: 1`);

  } catch (error) {
    console.error('❌ Ошибка при удалении:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeGiftsCategory();
