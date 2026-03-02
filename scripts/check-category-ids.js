const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCategoryIds() {
  try {
    console.log('🔍 Проверяем ID категорий...\n');

    const categories = [
      'Клей',
      'Маркеры', 
      'Степлеры',
      'Ручки'
    ];

    for (const categoryName of categories) {
      const category = await prisma.category.findFirst({
        where: { name: categoryName }
      });

      if (category) {
        console.log(`✅ ${categoryName}:`);
        console.log(`   ID: ${category.id}`);
        console.log(`   Slug: ${category.slug}`);
        console.log(`   Уровень: ${category.level}`);
        console.log(`   Родитель: ${category.parentId}`);
        console.log('');
      } else {
        console.log(`❌ ${categoryName}: не найдена`);
      }
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategoryIds();
