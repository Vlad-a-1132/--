const fs = require('fs');
const path = require('path');

// Маппинг категорий с реальными ID из базы данных
const categoryMapping = {
  // Клей
  'glue': {
    id: '2102ee79-3224-4ad7-839b-4009508c9415',
    name: 'Клей',
    path: 'src/app/catalog/glue/page.tsx'
  },
  
  // Тетради на спирали и блокноты
  'spiral': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради на спирали и блокноты',
    path: 'src/app/catalog/paper/spiral/page.tsx'
  },
  
  // Тетради с пластиковой обложкой
  'plastic-spiral': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради и блокноты с пластиковой обложкой',
    path: 'src/app/catalog/paper/plastic-spiral/page.tsx'
  },
  
  // Тетради FolderBook
  'folderbook': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради FolderBook',
    path: 'src/app/catalog/paper/folderbook/page.tsx'
  },
  
  // Тетради на кольцах
  'ring': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради на кольцах',
    path: 'src/app/catalog/paper/ring/page.tsx'
  },
  
  // Тетради для иностранных слов
  'language': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради для записи иностранных слов',
    path: 'src/app/catalog/paper/language/page.tsx'
  },
  
  // Тетради для нот
  'music': {
    id: 'ea9d1e8f-6390-44a0-81c7-9c327c3b4f0e', // Тетради и блокноты
    name: 'Тетради для нот',
    path: 'src/app/catalog/paper/music/page.tsx'
  },
  
  // Расписания уроков
  'schedules': {
    id: '8d408a20-324d-4487-b159-ee75e70d0922', // Ежедневники
    name: 'Расписания уроков',
    path: 'src/app/catalog/paper/schedules/page.tsx'
  },
  
  // Планинги и ежедневники
  'planners': {
    id: '8d408a20-324d-4487-b159-ee75e70d0922', // Ежедневники
    name: 'Планинги и ежедневники',
    path: 'src/app/catalog/paper/planners/page.tsx'
  },
  
  // Записные книжки
  'notebooks': {
    id: 'ada5b8dd-0fe2-4632-8697-21a587bd389d', // Блокноты
    name: 'Записные книжки',
    path: 'src/app/catalog/paper/notebooks/page.tsx'
  },
  
  // Наборы для творчества
  'creative-sets': {
    id: '3d7faba2-281a-43dd-98ae-254de5931854', // Набор первоклассника
    name: 'Наборы для творчества',
    path: 'src/app/catalog/paper/creative-sets/page.tsx'
  },
  
  // Бумага для рисования
  'drawing-paper': {
    id: 'c03626c9-95ab-4328-a180-18537124c04a', // Бумага для черчения
    name: 'Бумага для рисования в папке',
    path: 'src/app/catalog/paper/drawing-paper/page.tsx'
  },
  
  // Восковые мелки
  'crayons': {
    id: '18680b4f-03d2-455c-8718-0acd3e2358df', // Масляная пастель
    name: 'Восковые мелки',
    path: 'src/app/catalog/art/crayons/page.tsx'
  },
  
  // Фломастеры
  'markers': {
    id: 'bced3e1c-8441-42f0-9e46-ff33f9cde62c', // Маркеры
    name: 'Фломастеры',
    path: 'src/app/catalog/art/markers/page.tsx'
  },
  
  // Ножницы
  'scissors': {
    id: '68ddc7f1-d059-450b-a8a3-cf3e976cf157', // Ножницы
    name: 'Ножницы',
    path: 'src/app/catalog/art/scissors/page.tsx'
  }
};

async function updateCategoryIds() {
  console.log('🔧 Обновляем ID категорий во всех страницах...\n');

  for (const [key, category] of Object.entries(categoryMapping)) {
    try {
      const filePath = category.path;
      
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Файл не найден: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      
      // Заменяем placeholder ID на реальный
      const oldPattern = /const categoryId = '[^']*';/;
      const newPattern = `const categoryId = '${category.id}';`;
      
      if (oldPattern.test(content)) {
        content = content.replace(oldPattern, newPattern);
        
        // Также обновляем название категории если нужно
        const namePattern = /categoryName="[^"]*"/;
        const newNamePattern = `categoryName="${category.name}"`;
        
        if (namePattern.test(content)) {
          content = content.replace(namePattern, newNamePattern);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Обновлен: ${category.name} (ID: ${category.id})`);
      } else {
        console.log(`⚠️  Не найден placeholder ID в: ${filePath}`);
      }
      
    } catch (error) {
      console.error(`❌ Ошибка при обновлении ${category.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 Обновление завершено!');
}

updateCategoryIds();
