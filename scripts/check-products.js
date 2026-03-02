const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkProducts() {
  try {
    console.log('🔍 Проверяем товары и их категории...\n');

    // Получаем все товары с категориями
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });

    console.log(`📦 Найдено товаров: ${products.length}\n`);

    if (products.length === 0) {
      console.log('❌ Товаров не найдено!');
      return;
    }

    // Выводим информацию о каждом товаре
    products.forEach((product, index) => {
      console.log(`${index + 1}. Товар: "${product.name}"`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Категория: ${product.category?.name || 'Без категории'}`);
      console.log(`   ID категории: ${product.categoryId}`);
      console.log(`   Активен: ${product.isActive ? 'Да' : 'Нет'}`);
      console.log(`   Цена: ${product.price}`);
      console.log(`   Описание: ${product.description || 'Нет описания'}`);
      console.log('');
    });

    // Проверяем категорию "Ручки"
    console.log('🔍 Проверяем категорию "Ручки"...');
    const ручкиCategory = await prisma.category.findFirst({
      where: { name: 'Ручки' }
    });

    if (ручкиCategory) {
      console.log(`✅ Категория "Ручки" найдена:`);
      console.log(`   ID: ${ручкиCategory.id}`);
      console.log(`   Slug: ${ручкиCategory.slug}`);
      console.log(`   Уровень: ${ручкиCategory.level}`);
      console.log(`   Родитель: ${ручкиCategory.parentId}`);
      console.log('');

      // Ищем товары в категории "Ручки"
      const ручкиProducts = await prisma.product.findMany({
        where: { categoryId: ручкиCategory.id }
      });

      console.log(`📦 Товаров в категории "Ручки": ${ручкиProducts.length}`);
      ручкиProducts.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} (ID: ${product.id})`);
      });
    } else {
      console.log('❌ Категория "Ручки" не найдена!');
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts();
