const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  // Основные категории
  { name: 'Ручки', description: 'Шариковые, гелевые, перьевые ручки', order: 1 },
  { name: 'Карандаши', description: 'Простые, цветные, механические карандаши', order: 2 },
  { name: 'Бумага', description: 'Тетради, блокноты, бумага для печати', order: 3 },
  { name: 'Папки и файлы', description: 'Папки, файлы, органайзеры', order: 4 },
  { name: 'Канцелярские принадлежности', description: 'Степлеры, скрепки, кнопки', order: 5 },
  { name: 'Клей и скотч', description: 'Клей, скотч, клейкие ленты', order: 6 },
  { name: 'Ножницы и резаки', description: 'Ножницы, резаки для бумаги', order: 7 },
  { name: 'Ластики и точилки', description: 'Ластики, точилки для карандашей', order: 8 },
  { name: 'Маркеры и фломастеры', description: 'Маркеры, фломастеры, текстовыделители', order: 9 },
  { name: 'Планировщики', description: 'Ежедневники, планировщики, календари', order: 10 },
  { name: 'Художественные принадлежности', description: 'Краски, кисти, холсты', order: 11 },
  { name: 'Офисные принадлежности', description: 'Подставки, калькуляторы, степлеры', order: 12 },
  { name: 'Школьные товары', description: 'Ранцы, пеналы, школьные наборы', order: 13 },
  { name: 'Подарки и декор', description: 'Подарочные наборы, декоративные элементы', order: 14 },
  { name: 'Специальные коллекции', description: 'Лимитированные и специальные издания', order: 15 }
];

async function seedCategories() {
  try {
    console.log('🌱 Начинаем добавление категорий...');
    
    for (const category of categories) {
      const slug = category.name
        .toLowerCase()
        .replace(/[^\wа-яё\s]/g, '')
        .replace(/\s+/g, '-');
      
      const existingCategory = await prisma.category.findUnique({
        where: { slug }
      });
      
      if (existingCategory) {
        console.log(`✅ Категория "${category.name}" уже существует`);
        continue;
      }
      
      const newCategory = await prisma.category.create({
        data: {
          name: category.name,
          slug,
          description: category.description,
          order: category.order,
          isActive: true,
        }
      });
      
      console.log(`✅ Создана категория: ${newCategory.name} (ID: ${newCategory.id})`);
    }
    
    console.log('🎉 Все категории успешно добавлены!');
    
    // Показываем все созданные категории
    const allCategories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });
    
    console.log('\n📋 Список всех категорий:');
    allCategories.forEach(cat => {
      console.log(`  ${cat.order}. ${cat.name} (ID: ${cat.id})`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories(); 