const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCategoryHierarchy() {
  try {
    console.log('🔍 Проверяем иерархию категорий...\n');

    // Получаем все категории
    const allCategories = await prisma.category.findMany({
      include: {
        children: {
          include: {
            children: true
          }
        },
        parent: true
      },
      orderBy: [
        { level: 'asc' },
        { order: 'asc' }
      ]
    });

    console.log('📊 Общая структура категорий:\n');

    // Показываем категории по уровням
    const level0Categories = allCategories.filter(cat => cat.level === 0);
    const level1Categories = allCategories.filter(cat => cat.level === 1);
    const level2Categories = allCategories.filter(cat => cat.level === 2);

    console.log(`📁 Категории уровня 0 (основные): ${level0Categories.length}`);
    level0Categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
      if (cat.children && cat.children.length > 0) {
        console.log(`    Подкатегории: ${cat.children.length}`);
        cat.children.forEach(child => {
          console.log(`      • ${child.name} (ID: ${child.id}, slug: ${child.slug})`);
          if (child.children && child.children.length > 0) {
            console.log(`        Подподкатегории: ${child.children.length}`);
            child.children.forEach(grandChild => {
              console.log(`          - ${grandChild.name} (ID: ${grandChild.id}, slug: ${grandChild.slug})`);
            });
          }
        });
      } else {
        console.log(`    ❌ Нет подкатегорий`);
      }
      console.log('');
    });

    console.log(`📁 Категории уровня 1 (подкатегории): ${level1Categories.length}`);
    level1Categories.forEach(cat => {
      const parentName = cat.parent ? cat.parent.name : 'Без родителя';
      console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug}) -> Родитель: ${parentName}`);
    });

    console.log(`📁 Категории уровня 2 (подподкатегории): ${level2Categories.length}`);
    level2Categories.forEach(cat => {
      const parentName = cat.parent ? cat.parent.name : 'Без родителя';
      console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug}) -> Родитель: ${parentName}`);
    });

    // Проверяем конкретно "Бумажная продукция"
    console.log('\n🔍 Детальная проверка "Бумажная продукция":\n');
    
    const paperCategory = allCategories.find(cat => 
      cat.name.toLowerCase().includes('бумажная продукция') || 
      cat.slug === 'paper-products'
    );

    if (paperCategory) {
      console.log(`✅ Найдена категория: ${paperCategory.name}`);
      console.log(`   ID: ${paperCategory.id}`);
      console.log(`   Slug: ${paperCategory.slug}`);
      console.log(`   Уровень: ${paperCategory.level}`);
      console.log(`   Родитель: ${paperCategory.parent ? paperCategory.parent.name : 'Нет'}`);
      console.log(`   Подкатегории: ${paperCategory.children ? paperCategory.children.length : 0}`);
      
      if (paperCategory.children && paperCategory.children.length > 0) {
        console.log('\n   📋 Список подкатегорий:');
        paperCategory.children.forEach(child => {
          console.log(`     • ${child.name} (ID: ${child.id}, slug: ${child.slug})`);
          if (child.children && child.children.length > 0) {
            console.log(`       Подподкатегории: ${child.children.length}`);
            child.children.forEach(grandChild => {
              console.log(`         - ${grandChild.name} (ID: ${grandChild.id}, slug: ${grandChild.slug})`);
            });
          }
        });
      } else {
        console.log('   ❌ У "Бумажная продукция" нет подкатегорий!');
      }
    } else {
      console.log('❌ Категория "Бумажная продукция" не найдена!');
    }

    // Проверяем категории без родителей
    console.log('\n🔍 Категории без родителей или с неправильными связями:\n');
    
    const orphanedCategories = allCategories.filter(cat => 
      (cat.level > 0 && !cat.parent) || 
      (cat.level === 0 && cat.parent)
    );

    if (orphanedCategories.length > 0) {
      console.log(`⚠️  Найдено ${orphanedCategories.length} проблемных категорий:`);
      orphanedCategories.forEach(cat => {
        console.log(`  - ${cat.name} (ID: ${cat.id}, уровень: ${cat.level})`);
        if (cat.level > 0 && !cat.parent) {
          console.log(`    ❌ Категория уровня ${cat.level} без родителя`);
        }
        if (cat.level === 0 && cat.parent) {
          console.log(`    ❌ Основная категория с родителем: ${cat.parent.name}`);
        }
      });
    } else {
      console.log('✅ Все категории имеют правильные связи');
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategoryHierarchy();
