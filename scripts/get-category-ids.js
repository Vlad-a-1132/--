const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCategoryIds() {
  try {
    console.log('🔍 Получаем все категории из базы данных...\n');

    // Получаем все категории с иерархией
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        children: {
          include: {
            children: true
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    console.log('📋 СТРУКТУРА КАТЕГОРИЙ:\n');

    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name} (ID: ${category.id})`);
      console.log(`   Slug: ${category.slug}`);
      console.log(`   Уровень: ${category.level}`);
      
      if (category.children && category.children.length > 0) {
        console.log(`   ├─ Подкатегории:`);
        category.children.forEach((child, childIndex) => {
          console.log(`   │  ${childIndex + 1}. ${child.name} (ID: ${child.id})`);
          console.log(`   │     Slug: ${child.slug}`);
          console.log(`   │     Уровень: ${child.level}`);
          
          if (child.children && child.children.length > 0) {
            console.log(`   │     ├─ Подподкатегории:`);
            child.children.forEach((subChild, subIndex) => {
              console.log(`   │     │  ${subIndex + 1}. ${subChild.name} (ID: ${subChild.id})`);
              console.log(`   │     │     Slug: ${subChild.slug}`);
              console.log(`   │     │     Уровень: ${subChild.level}`);
            });
          }
        });
      }
      console.log('');
    });

    // Выводим статистику
    const totalCategories = await prisma.category.count({ where: { isActive: true } });
    const mainCategories = await prisma.category.count({ where: { level: 0, isActive: true } });
    const subCategories = await prisma.category.count({ where: { level: 1, isActive: true } });
    const subSubCategories = await prisma.category.count({ where: { level: 2, isActive: true } });

    console.log('📊 СТАТИСТИКА:');
    console.log(`   Всего категорий: ${totalCategories}`);
    console.log(`   Основных категорий: ${mainCategories}`);
    console.log(`   Подкатегорий: ${subCategories}`);
    console.log(`   Подподкатегорий: ${subSubCategories}`);

    // Выводим ID для конкретных категорий, которые нам нужны
    console.log('\n🎯 ID ДЛЯ НОВЫХ СТРАНИЦ КАТАЛОГА:');
    
    const neededCategories = [
      'Клей',
      'Тетради на спирали и блокноты',
      'Тетради и блокноты с пластиковой обложкой',
      'Тетради FolderBook',
      'Тетради на кольцах',
      'Тетради для записи иностранных слов',
      'Тетради для нот',
      'Расписания уроков',
      'Планинги и ежедневники',
      'Записные книжки',
      'Наборы для творчества',
      'Бумага для рисования в папке',
      'Восковые мелки',
      'Фломастеры',
      'Ножницы'
    ];

    neededCategories.forEach(categoryName => {
      const category = categories.find(cat => 
        cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
        cat.children?.some(child => 
          child.name.toLowerCase().includes(categoryName.toLowerCase()) ||
          child.children?.some(subChild => 
            subChild.name.toLowerCase().includes(categoryName.toLowerCase())
          )
        )
      );

      if (category) {
        console.log(`✅ ${categoryName}: ${category.id}`);
      } else {
        console.log(`❌ ${categoryName}: не найдена`);
      }
    });

  } catch (error) {
    console.error('❌ Ошибка при получении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getCategoryIds();
