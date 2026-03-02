const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkFinalGiftsStructure() {
  try {
    console.log('🔍 Проверяем итоговую структуру категории "Подарки и декор"...\n');

    // Находим категорию "Подарки и декор"
    const giftsCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Подарки и декор' },
          { slug: 'podarki-i-dekor' }
        ]
      },
      include: {
        children: {
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!giftsCategory) {
      console.log('❌ Категория "Подарки и декор" не найдена!');
      return;
    }

    console.log(`✅ Категория: ${giftsCategory.name} (ID: ${giftsCategory.id})`);
    console.log(`   Slug: ${giftsCategory.slug}`);
    console.log(`   Уровень: ${giftsCategory.level}`);
    console.log(`   Подкатегории: ${giftsCategory.children ? giftsCategory.children.length : 0}`);

    if (giftsCategory.children && giftsCategory.children.length > 0) {
      console.log('\n📋 Структура подкатегорий:');
      giftsCategory.children.forEach((child, index) => {
        console.log(`\n  ${index + 1}. ${child.name} (ID: ${child.id}, slug: ${child.slug})`);
        console.log(`     Уровень: ${child.level}`);
        console.log(`     Подкатегории 3-го уровня: ${child.children ? child.children.length : 0}`);
        
        if (child.children && child.children.length > 0) {
          child.children.forEach((grandChild, grandIndex) => {
            console.log(`       ${grandIndex + 1}. ${grandChild.name} (ID: ${grandChild.id})`);
          });
        }
      });
    } else {
      console.log('   ❌ У "Подарки и декор" нет подкатегорий!');
    }

    // Проверяем общее количество категорий
    const totalCategories = await prisma.category.count();
    console.log(`\n📊 Общее количество категорий в базе: ${totalCategories}`);

    // Проверяем количество категорий по уровням
    const level0Count = await prisma.category.count({ where: { level: 0 } });
    const level1Count = await prisma.category.count({ where: { level: 1 } });
    const level2Count = await prisma.category.count({ where: { level: 2 } });

    console.log(`📈 Распределение по уровням:`);
    console.log(`   Уровень 0 (основные категории): ${level0Count}`);
    console.log(`   Уровень 1 (подкатегории): ${level1Count}`);
    console.log(`   Уровень 2 (подподкатегории): ${level2Count}`);

    console.log('\n✅ Проверка завершена!');

  } catch (error) {
    console.error('❌ Ошибка при проверке структуры:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFinalGiftsStructure();
