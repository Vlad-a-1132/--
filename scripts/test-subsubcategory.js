const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSubsubcategory() {
  try {
    console.log('🔍 Тестируем работу подподкатегорий...\n');

    // 1. Проверяем структуру категорий
    console.log('📋 Структура категорий:');
    const categories = await prisma.category.findMany({
      where: { level: 0 },
      include: {
        children: {
          include: {
            children: true
          },
          orderBy: { order: 'asc' }
        },
        orderBy: { order: 'asc' }
      }
    });

    categories.forEach(mainCat => {
      console.log(`\n🏷️  ${mainCat.name} (ID: ${mainCat.id})`);
      
      if (mainCat.children && mainCat.children.length > 0) {
        mainCat.children.forEach(subCat => {
          console.log(`  ├─ ${subCat.name} (ID: ${subCat.id})`);
          
          if (subCat.children && subCat.children.length > 0) {
            subCat.children.forEach(subSubCat => {
              console.log(`  │  └─ ${subSubCat.name} (ID: ${subSubCat.id})`);
            });
          }
        });
      }
    });

    // 2. Проверяем товары
    console.log('\n📦 Товары в базе:');
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });

    products.forEach(product => {
      console.log(`\n🛍️  ${product.name}`);
      console.log(`   Категория: ${product.category.name}`);
      console.log(`   Подкатегория: ${product.subcategory || 'Не указана'}`);
      console.log(`   Подподкатегория: ${product.subsubcategory || 'Не указана'}`);
    });

    console.log('\n✅ Тест завершен успешно!');
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSubsubcategory();
