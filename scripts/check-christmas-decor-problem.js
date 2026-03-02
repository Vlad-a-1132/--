const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkChristmasDecorProblem() {
  try {
    console.log('🔍 Проверяем проблему с категорией "Елочный декор"...\n');

    // Находим категорию "Елочный декор"
    const christmasDecorCategory = await prisma.category.findFirst({
      where: {
        name: 'Елочный декор'
      },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!christmasDecorCategory) {
      console.log('❌ Категория "Елочный декор" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория: ${christmasDecorCategory.name} (ID: ${christmasDecorCategory.id})`);
    console.log(`   Slug: ${christmasDecorCategory.slug}`);
    console.log(`   Уровень: ${christmasDecorCategory.level}`);
    console.log(`   Родитель: ${christmasDecorCategory.parentId}`);
    console.log(`   Подкатегории: ${christmasDecorCategory.children ? christmasDecorCategory.children.length : 0}`);

    if (christmasDecorCategory.children && christmasDecorCategory.children.length > 0) {
      console.log('\n📋 Текущие подкатегории "Елочный декора":');
      christmasDecorCategory.children.forEach((child, index) => {
        console.log(`  ${index + 1}. ${child.name} (ID: ${child.id}, slug: ${child.slug})`);
        console.log(`     Уровень: ${child.level}, Родитель: ${child.parentId}`);
      });
    }

    // Проверяем, есть ли другие категории с похожими названиями
    console.log('\n🔍 Поиск похожих категорий...');
    
    const similarCategories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: 'елочн' } },
          { name: { contains: 'новогодн' } },
          { name: { contains: 'рождеств' } },
          { name: { contains: 'верхушк' } },
          { name: { contains: 'лапланд' } },
          { name: { contains: 'венецианск' } },
          { name: { contains: 'скатерть' } },
          { name: { contains: 'сказк' } },
          { name: { contains: 'детств' } },
          { name: { contains: 'лесн' } },
          { name: { contains: 'перламутр' } },
          { name: { contains: 'зефир' } },
          { name: { contains: 'винтаж' } },
          { name: { contains: 'зверушк' } }
        ]
      }
    });

    if (similarCategories.length > 0) {
      console.log(`\n📁 Найдено ${similarCategories.length} похожих категорий:`);
      similarCategories.forEach(cat => {
        console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
        console.log(`    Уровень: ${cat.level}, Родитель: ${cat.parentId}`);
      });
    }

    // Проверяем, какие категории имеют parentId = christmasDecorCategory.id
    console.log('\n🔍 Категории, которые ссылаются на "Елочный декор" как на родителя:');
    
    const childrenOfChristmasDecor = await prisma.category.findMany({
      where: { parentId: christmasDecorCategory.id }
    });

    if (childrenOfChristmasDecor.length > 0) {
      console.log(`📁 Найдено ${childrenOfChristmasDecor.length} категорий:`);
      childrenOfChristmasDecor.forEach(cat => {
        console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
        console.log(`    Уровень: ${cat.level}, Родитель: ${cat.parentId}`);
      });
    }

    console.log('\n💡 Анализ проблемы:');
    console.log('Проблема в том, что в базе данных есть старые категории, которые не были правильно удалены');
    console.log('и теперь отображаются вместо правильных подкатегорий.');

  } catch (error) {
    console.error('❌ Ошибка при проверке:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkChristmasDecorProblem();
