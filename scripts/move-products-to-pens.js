const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function moveProductsToPens() {
  try {
    console.log('🔍 Начинаем перемещение товаров в категорию "Ручки"...\n');

    // Находим категорию "Ручки"
    const ручкиCategory = await prisma.category.findFirst({
      where: { name: 'Ручки' }
    });

    if (!ручкиCategory) {
      console.error('❌ Категория "Ручки" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория "Ручки":`);
    console.log(`   ID: ${ручкиCategory.id}`);
    console.log(`   Название: ${ручкиCategory.name}`);
    console.log(`   Slug: ${ручкиCategory.slug}`);
    console.log('');

    // Получаем все товары
    const products = await prisma.product.findMany();

    console.log(`📦 Найдено товаров: ${products.length}\n`);

    if (products.length === 0) {
      console.log('❌ Товаров не найдено!');
      return;
    }

    // Перемещаем товары в категорию "Ручки"
    for (const product of products) {
      console.log(`🔄 Перемещаем товар "${product.name}" в категорию "Ручки"...`);
      
      try {
        await prisma.product.update({
          where: { id: product.id },
          data: { 
            categoryId: ручкиCategory.id,
            subcategory: 'Все ручки' // Устанавливаем подкатегорию
          }
        });
        
        console.log(`   ✅ Товар "${product.name}" успешно перемещен в категорию "Ручки"`);
      } catch (error) {
        console.error(`   ❌ Ошибка при перемещении товара "${product.name}":`, error.message);
      }
    }

    console.log('\n🔍 Проверяем результат...');
    
    // Проверяем, сколько товаров теперь в категории "Ручки"
    const ручкиProducts = await prisma.product.findMany({
      where: { categoryId: ручкиCategory.id }
    });

    console.log(`📦 Товаров в категории "Ручки": ${ручкиProducts.length}`);
    ручкиProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} (ID: ${product.id})`);
    });

    console.log('\n🎉 Перемещение товаров завершено!');

  } catch (error) {
    console.error('❌ Ошибка при перемещении товаров:', error);
  } finally {
    await prisma.$disconnect();
  }
}

moveProductsToPens();
