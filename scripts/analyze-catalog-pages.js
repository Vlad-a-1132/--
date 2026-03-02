const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска всех .tsx файлов в папке
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') && file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Функция для анализа дизайна страницы
function analyzePageDesign(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Определяем тип дизайна
    if (content.includes('import CategoryPage')) {
      return 'CategoryPage';
    } else if (content.includes('import ProductGrid')) {
      return 'ProductGrid (старый)';
    } else if (content.includes('ProductCard')) {
      return 'ProductCard (старый)';
    } else {
      return 'Неизвестный';
    }
  } catch (error) {
    return 'Ошибка чтения';
  }
}

// Основная функция анализа
function analyzeCatalogPages() {
  console.log('🔍 Анализируем все страницы каталога...\n');
  
  const catalogDir = 'src/app/catalog';
  const allPages = findTsxFiles(catalogDir);
  
  console.log(`📋 Найдено ${allPages.length} страниц каталога:\n`);
  
  const designStats = {
    'CategoryPage': [],
    'ProductGrid (старый)': [],
    'ProductCard (старый)': [],
    'Неизвестный': [],
    'Ошибка чтения': []
  };
  
  allPages.forEach(filePath => {
    const relativePath = filePath.replace('src/app/catalog/', '');
    const design = analyzePageDesign(filePath);
    
    designStats[design].push(relativePath);
  });
  
  // Выводим результаты по типам дизайна
  Object.entries(designStats).forEach(([design, pages]) => {
    if (pages.length > 0) {
      console.log(`\n🎨 ${design} (${pages.length} страниц):`);
      pages.forEach(page => {
        console.log(`   ✅ ${page}`);
      });
    }
  });
  
  // Общая статистика
  console.log('\n📊 ОБЩАЯ СТАТИСТИКА:');
  console.log(`   Всего страниц: ${allPages.length}`);
  Object.entries(designStats).forEach(([design, pages]) => {
    if (pages.length > 0) {
      const percentage = ((pages.length / allPages.length) * 100).toFixed(1);
      console.log(`   ${design}: ${pages.length} (${percentage}%)`);
    }
  });
  
  // Список страниц для обновления
  const pagesToUpdate = [...designStats['ProductGrid (старый)'], ...designStats['ProductCard (старый)']];
  if (pagesToUpdate.length > 0) {
    console.log('\n🔧 СТРАНИЦЫ ДЛЯ ОБНОВЛЕНИЯ НА CategoryPage:');
    pagesToUpdate.forEach(page => {
      console.log(`   📝 ${page}`);
    });
  }
  
  return designStats;
}

// Запускаем анализ
const results = analyzeCatalogPages();
