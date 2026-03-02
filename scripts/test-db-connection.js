const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔌 Тестируем подключение к базе данных...');
    
    // Простой запрос для проверки подключения
    const categoryCount = await prisma.category.count();
    console.log(`✅ Подключение успешно! Найдено категорий: ${categoryCount}`);
    
    // Проверяем основные категории
    const mainCategories = await prisma.category.findMany({
      where: { level: 0 },
      select: { id: true, name: true, slug: true }
    });
    
    console.log(`\n📁 Основные категории (уровень 0): ${mainCategories.length}`);
    mainCategories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat.name} (${cat.slug})`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
