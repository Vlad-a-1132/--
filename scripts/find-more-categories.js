const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findMoreCategories() {
  try {
    console.log('🔍 Ищем дополнительные категории...\n');

    // Ищем по ключевым словам
    const keywords = [
      'спираль',
      'кольца',
      'folder',
      'иностранн',
      'ноты',
      'музык',
      'рисован',
      'худож',
      'мелки',
      'фломастер',
      'планировщик',
      'блокнот',
      'записн'
    ];

    for (const keyword of keywords) {
      console.log(`\n🔍 Ищем по ключевому слову: "${keyword}"`);
      
      const matches = await prisma.category.findMany({
        where: { 
          name: { contains: keyword, mode: 'insensitive' },
          isActive: true 
        }
      });

      if (matches.length > 0) {
        matches.forEach(match => {
          console.log(`   ✅ ${match.name} (ID: ${match.id}, Slug: ${match.slug}, Уровень: ${match.level})`);
        });
      } else {
        console.log(`   ❌ Не найдено`);
      }
    }

    // Ищем все категории 2-го уровня
    console.log('\n🔍 Все категории 2-го уровня:');
    const level2Categories = await prisma.category.findMany({
      where: { 
        level: 2,
        isActive: true 
      },
      orderBy: { name: 'asc' }
    });

    level2Categories.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findMoreCategories();
