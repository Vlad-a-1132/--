const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkGiftsCategories() {
  try {
    console.log('🔍 Проверяем структуру категории "Подарки и декор"...\n');

    // Находим категорию "Подарки и декор"
    const giftsCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name: 'Подарки и декор' },
          { name: 'Подарки' },
          { slug: 'podarki-i-dekor' },
          { slug: 'podarki' }
        ]
      },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!giftsCategory) {
      console.log('❌ Категория "Подарки и декор" не найдена!');
      
      // Ищем все категории, которые могут быть связаны с подарками
      const allCategories = await prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: 'подарк' } },
            { name: { contains: 'декор' } },
            { name: { contains: 'украшен' } }
          ]
        },
        include: {
          children: {
            orderBy: { order: 'asc' }
          }
        }
      });

      if (allCategories.length > 0) {
        console.log('🔍 Найдены похожие категории:');
        allCategories.forEach(cat => {
          console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
          if (cat.children && cat.children.length > 0) {
            console.log(`    Подкатегории: ${cat.children.length}`);
            cat.children.forEach(child => {
              console.log(`      • ${child.name} (ID: ${child.id})`);
            });
          }
        });
      }
      return;
    }

    console.log(`✅ Найдена категория: ${giftsCategory.name} (ID: ${giftsCategory.id})`);
    console.log(`   Slug: ${giftsCategory.slug}`);
    console.log(`   Уровень: ${giftsCategory.level}`);
    console.log(`   Подкатегории: ${giftsCategory.children ? giftsCategory.children.length : 0}`);

    if (giftsCategory.children && giftsCategory.children.length > 0) {
      console.log('\n📋 Список подкатегорий:');
      giftsCategory.children.forEach((child, index) => {
        console.log(`  ${index + 1}. ${child.name} (ID: ${child.id}, slug: ${child.slug})`);
        if (child.children && child.children.length > 0) {
          console.log(`     Подподкатегории: ${child.children.length}`);
          child.children.forEach(grandChild => {
            console.log(`       - ${grandChild.name} (ID: ${grandChild.id})`);
          });
        } else {
          console.log(`     ❌ Нет подподкатегорий`);
        }
      });
    } else {
      console.log('   ❌ У "Подарки и декор" нет подкатегорий!');
    }

    // Проверяем, есть ли категории с похожими названиями
    console.log('\n🔍 Поиск похожих категорий...');
    
    const similarCategories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: 'подарк' } },
          { name: { contains: 'декор' } },
          { name: { contains: 'украшен' } },
          { name: { contains: 'праздн' } }
        ]
      },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (similarCategories.length > 0) {
      console.log(`\n📁 Найдено ${similarCategories.length} похожих категорий:`);
      similarCategories.forEach(cat => {
        if (cat.id !== giftsCategory.id) {
          console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
          if (cat.children && cat.children.length > 0) {
            console.log(`    Подкатегории: ${cat.children.length}`);
            cat.children.forEach(child => {
              console.log(`      • ${child.name} (ID: ${child.id})`);
            });
          }
        }
      });
    }

    // Анализ и рекомендации
    console.log('\n💡 Анализ и рекомендации:');
    
    if (!giftsCategory.children || giftsCategory.children.length === 0) {
      console.log('📝 Нужно добавить подкатегории для "Подарки и декор"');
      console.log('   Рекомендуемые подкатегории:');
      console.log('   - Подарочные наборы');
      console.log('   - Украшения для праздников');
      console.log('   - Декоративные элементы');
      console.log('   - Праздничные аксессуары');
      console.log('   - Сувениры');
    } else if (giftsCategory.children.length < 5) {
      console.log('📝 Можно добавить еще подкатегории для лучшей структуризации');
    } else {
      console.log('✅ Категория "Подарки и декор" хорошо структурирована');
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGiftsCategories();
