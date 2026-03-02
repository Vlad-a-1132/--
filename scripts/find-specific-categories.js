const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findSpecificCategories() {
  try {
    console.log('🔍 Ищем конкретные категории...\n');

    // Категории, которые нам нужны
    const neededCategories = [
      'Клей',
      'Ножницы',
      'Маркеры',
      'Фломастеры',
      'Восковые мелки',
      'Тетради',
      'Бумага',
      'Расписания',
      'Планинги',
      'Ежедневники',
      'Записные книжки',
      'Наборы для творчества',
      'Творчество'
    ];

    for (const categoryName of neededCategories) {
      console.log(`\n🔍 Ищем: ${categoryName}`);
      
      // Ищем по точному названию
      let category = await prisma.category.findFirst({
        where: { 
          name: { contains: categoryName, mode: 'insensitive' },
          isActive: true 
        }
      });

      if (category) {
        console.log(`✅ Найдена: ${category.name}`);
        console.log(`   ID: ${category.id}`);
        console.log(`   Slug: ${category.slug}`);
        console.log(`   Уровень: ${category.level}`);
      } else {
        // Ищем по частичному совпадению
        const partialMatches = await prisma.category.findMany({
          where: { 
            name: { contains: categoryName.toLowerCase(), mode: 'insensitive' },
            isActive: true 
          }
        });

        if (partialMatches.length > 0) {
          console.log(`🔍 Частичные совпадения для "${categoryName}":`);
          partialMatches.forEach(match => {
            console.log(`   - ${match.name} (ID: ${match.id}, Slug: ${match.slug})`);
          });
        } else {
          console.log(`❌ Не найдено: ${categoryName}`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findSpecificCategories();
