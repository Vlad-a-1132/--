const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugAdminCategories() {
  try {
    console.log('🔍 Отладка проблемы с отображением категорий в админке...\n');

    // Находим категорию "Подарки и декор"
    const giftsCategory = await prisma.category.findFirst({
      where: {
        name: 'Подарки и декор'
      }
    });

    if (!giftsCategory) {
      console.log('❌ Категория "Подарки и декор" не найдена!');
      return;
    }

    console.log(`✅ Найдена категория: ${giftsCategory.name} (ID: ${giftsCategory.id})`);

    // Получаем все подкатегории "Подарки и декор"
    const subcategories = await prisma.category.findMany({
      where: { parentId: giftsCategory.id },
      orderBy: { order: 'asc' }
    });

    console.log(`\n📋 Подкатегории "Подарки и декор" (${subcategories.length}):`);
    subcategories.forEach((sub, index) => {
      console.log(`  ${index + 1}. ${sub.name} (ID: ${sub.id}, slug: ${sub.slug})`);
      console.log(`     Уровень: ${sub.level}, Родитель: ${sub.parentId}`);
    });

    // Проверяем "Елочный декор" отдельно
    const christmasDecor = await prisma.category.findFirst({
      where: { name: 'Елочный декор' }
    });

    if (christmasDecor) {
      console.log(`\n🎄 Категория "Елочный декор":`);
      console.log(`   ID: ${christmasDecor.id}`);
      console.log(`   Slug: ${christmasDecor.slug}`);
      console.log(`   Уровень: ${christmasDecor.level}`);
      console.log(`   Родитель: ${christmasDecor.parentId}`);

      // Получаем подкатегории "Елочный декор"
      const christmasSubcategories = await prisma.category.findMany({
        where: { parentId: christmasDecor.id },
        orderBy: { order: 'asc' }
      });

      console.log(`\n📋 Подкатегории "Елочный декор" (${christmasSubcategories.length}):`);
      christmasSubcategories.forEach((sub, index) => {
        console.log(`  ${index + 1}. ${sub.name} (ID: ${sub.id}, slug: ${sub.slug})`);
        console.log(`     Уровень: ${sub.level}, Родитель: ${sub.parentId}`);
      });
    }

    // Проверяем, есть ли категории с неправильными названиями
    console.log('\n🔍 Поиск категорий с неправильными названиями...');
    
    const suspiciousCategories = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: 'Верхушки' } },
          { name: { contains: 'Лапландия' } },
          { name: { contains: 'Венецианский' } },
          { name: { contains: 'Скатерть' } },
          { name: { contains: 'Мир сказок' } },
          { name: { contains: 'Мир детства' } },
          { name: { contains: 'Лесное' } },
          { name: { contains: 'Перламутровый' } },
          { name: { contains: 'Зефир' } },
          { name: { contains: 'Рождество' } },
          { name: { contains: 'Винтаж' } },
          { name: { contains: 'зверушки' } }
        ]
      }
    });

    if (suspiciousCategories.length > 0) {
      console.log(`\n⚠️  Найдены подозрительные категории (${suspiciousCategories.length}):`);
      suspiciousCategories.forEach(cat => {
        console.log(`  - ${cat.name} (ID: ${cat.id}, slug: ${cat.slug})`);
        console.log(`    Уровень: ${cat.level}, Родитель: ${cat.parentId}`);
      });
    } else {
      console.log('\n✅ Подозрительных категорий не найдено');
    }

    // Проверяем, есть ли дублирующиеся названия
    console.log('\n🔍 Проверка на дублирующиеся названия...');
    
    const duplicateNames = await prisma.$queryRaw`
      SELECT name, COUNT(*) as count
      FROM categories
      GROUP BY name
      HAVING COUNT(*) > 1
      ORDER BY count DESC
    `;

    if (duplicateNames.length > 0) {
      console.log(`\n⚠️  Найдены дублирующиеся названия:`);
      duplicateNames.forEach(dup => {
        console.log(`  - "${dup.name}" встречается ${dup.count} раз`);
      });
    } else {
      console.log('\n✅ Дублирующихся названий не найдено');
    }

    console.log('\n💡 Анализ проблемы:');
    console.log('Если в базе данных правильные категории, но в админке отображаются неправильные,');
    console.log('то проблема может быть в:');
    console.log('1. Кэшировании на фронтенде');
    console.log('2. Неправильной логике фильтрации в админке');
    console.log('3. Старых данных в состоянии компонента');

  } catch (error) {
    console.error('❌ Ошибка при отладке:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugAdminCategories();
