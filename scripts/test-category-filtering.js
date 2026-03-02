const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCategoryFiltering() {
  try {
    console.log('🧪 Тестируем фильтрацию товаров по категориям...\n');
    
    // 1. Проверяем товар "Ручка Шариковая" - должен быть только в категории "Ручки"
    console.log('📋 1. Проверяем товар "Ручка Шариковая":');
    const penProduct = await prisma.product.findFirst({
      where: { name: 'Ручка Шариковая ' },
      include: {
        category: true
      }
    });

    if (penProduct) {
      console.log(`   - ID: ${penProduct.id}`);
      console.log(`   - Название: ${penProduct.name}`);
      console.log(`   - categoryId: ${penProduct.categoryId}`);
      console.log(`   - subcategory: ${penProduct.subcategory}`);
      console.log(`   - subsubcategory: ${penProduct.subsubcategory}`);
      console.log(`   - Текущая категория: ${penProduct.category.name}`);
    }

    console.log('\n');

    // 2. Проверяем товары в категории "Ручки" (должны быть только ручки)
    console.log('📁 2. Товары в категории "Ручки":');
    const pensCategory = await prisma.category.findFirst({
      where: { name: 'Ручки' }
    });
    
    if (pensCategory) {
      const pensProducts = await prisma.product.findMany({
        where: {
          OR: [
            { categoryId: pensCategory.id },
            { subcategory: pensCategory.id }
          ],
          isActive: true
        },
        include: {
          category: true
        }
      });
      
      console.log(`   Найдено товаров: ${pensProducts.length}`);
      pensProducts.forEach(product => {
        console.log(`   - ${product.name} (categoryId: ${product.categoryId}, subcategory: ${product.subcategory})`);
      });
    }

    console.log('\n');

    // 3. Проверяем товары в категории "Сумки" (не должно быть ручек)
    console.log('📁 3. Товары в категории "Сумки":');
    const bagsCategory = await prisma.category.findFirst({
      where: { name: 'Сумки' }
    });
    
    if (bagsCategory) {
      const bagsProducts = await prisma.product.findMany({
        where: {
          OR: [
            { categoryId: bagsCategory.id },
            { subcategory: bagsCategory.id },
            { subsubcategory: bagsCategory.id }
          ],
          isActive: true
        },
        include: {
          category: true
        }
      });
      
      console.log(`   Найдено товаров: ${bagsProducts.length}`);
      bagsProducts.forEach(product => {
        console.log(`   - ${product.name} (categoryId: ${product.categoryId}, subcategory: ${product.subcategory})`);
      });
    }

    console.log('\n');

    // 4. Проверяем товары в категории "Пеналы" (должен быть только пенал)
    console.log('📁 4. Товары в категории "Пеналы":');
    const penalsCategory = await prisma.category.findFirst({
      where: { name: 'Пеналы' }
    });
    
    if (penalsCategory) {
      const penalsProducts = await prisma.product.findMany({
        where: {
          OR: [
            { categoryId: penalsCategory.id },
            { subcategory: penalsCategory.id },
            { subsubcategory: penalsCategory.id }
          ],
          isActive: true
        },
        include: {
          category: true
        }
      });
      
      console.log(`   Найдено товаров: ${penalsProducts.length}`);
      penalsProducts.forEach(product => {
        console.log(`   - ${product.name} (categoryId: ${product.categoryId}, subcategory: ${product.subcategory})`);
      });
    }

    console.log('\n✅ Тестирование завершено!');
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCategoryFiltering();
