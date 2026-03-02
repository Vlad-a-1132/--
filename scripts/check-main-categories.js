const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkMainCategories() {
  try {
    console.log('🔍 Проверяем все основные категории (уровень 0)...\n');

    // Получаем все основные категории
    const mainCategories = await prisma.category.findMany({
      where: { level: 0 },
      include: {
        children: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    console.log(`📊 Найдено ${mainCategories.length} основных категорий:\n`);

    mainCategories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name}`);
      console.log(`   ID: ${category.id}`);
      console.log(`   Slug: ${category.slug}`);
      console.log(`   Подкатегории: ${category.children ? category.children.length : 0}`);
      
      if (category.children && category.children.length > 0) {
        console.log('   📋 Список подкатегорий:');
        category.children.forEach((child, childIndex) => {
          console.log(`      ${childIndex + 1}. ${child.name} (ID: ${child.id})`);
        });
      } else {
        console.log('   ❌ Нет подкатегорий');
      }
      console.log('');
    });

    // Проверяем, какие категории нуждаются в доработке
    console.log('🔍 Анализ категорий:\n');
    
    const categoriesWithSubcategories = mainCategories.filter(cat => 
      cat.children && cat.children.length > 0
    );
    
    const categoriesWithoutSubcategories = mainCategories.filter(cat => 
      !cat.children || cat.children.length === 0
    );

    console.log(`✅ Категории с подкатегориями: ${categoriesWithSubcategories.length}`);
    categoriesWithSubcategories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat.children.length} подкатегорий`);
    });

    if (categoriesWithoutSubcategories.length > 0) {
      console.log(`\n⚠️  Категории без подкатегорий: ${categoriesWithoutSubcategories.length}`);
      categoriesWithoutSubcategories.forEach(cat => {
        console.log(`   - ${cat.name} (ID: ${cat.id})`);
      });
      console.log('\n💡 Эти категории нуждаются в добавлении подкатегорий');
    }

    // Рекомендации по улучшению
    console.log('\n💡 Рекомендации по улучшению структуры категорий:\n');
    
    mainCategories.forEach(cat => {
      if (!cat.children || cat.children.length === 0) {
        console.log(`📝 ${cat.name}: нужно добавить подкатегории`);
      } else if (cat.children.length < 5) {
        console.log(`📝 ${cat.name}: можно добавить еще подкатегории (сейчас ${cat.children.length})`);
      } else {
        console.log(`✅ ${cat.name}: хорошо структурирована (${cat.children.length} подкатегорий)`);
      }
    });

  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMainCategories();
