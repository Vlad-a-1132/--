const fs = require('fs');
const path = require('path');

// Шаблон для старого дизайна
const oldDesignTemplate = (categoryName, description, subcategories, categorySlug) => `'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ${categoryName.replace(/\s+/g, '')}Page() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все ${categoryName.toLowerCase()}', count: ${subcategories.reduce((sum, sub) => sum + (sub.count || 10), 0) + 10} },
${subcategories.map(sub => `    { id: '${sub.id}', name: '${sub.name}', count: ${sub.count || 10} }`).join(',\n')}
  ];

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Навигация */}
      <div className="mb-8">
        <Link 
          href="/catalog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">${categoryName}</h1>
        <p className="text-gray-600 mt-2">${description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры и подкатегории */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Подкатегории</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSubcategoryChange(null)}
                className={\`w-full text-left px-3 py-2 rounded-md transition-all duration-200 \${selectedSubcategory === null ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' : 'hover:border-l-4 hover:border-blue-300'}\`}
              >
                <span className="font-medium">Все ${categoryName.toLowerCase()}</span>
                <span className="ml-2 text-sm text-gray-500">({\${subcategories.reduce((sum, sub) => sum + sub.count, 0)}})</span>
              </button>
              {subcategories.slice(1).map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className={\`w-full text-left px-3 py-2 rounded-md transition-all duration-200 \${selectedSubcategory === subcategory.id ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' : 'hover:border-l-4 hover:border-blue-300'}\`}
                >
                  <span className="font-medium">{subcategory.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({\${subcategory.count}})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="w-full lg:w-3/4">
          {selectedSubcategory ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {subcategories.find(sub => sub.id === selectedSubcategory)?.name}
              </h2>
            </div>
          ) : null}

          <ProductGrid 
            category="${categorySlug}" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}`;

// Маппинг категорий с их описаниями и подкатегориями
const categoryMapping = {
  'glue': {
    name: 'Клей',
    description: 'Широкий выбор клея для различных задач',
    subcategories: [
      { id: 'stick', name: 'Клей-карандаш', count: 15 },
      { id: 'office', name: 'Клей канцелярский', count: 12 },
      { id: 'pva', name: 'Клей ПВА', count: 8 }
    ]
  },
  'paper/spiral': {
    name: 'Тетради на спирали и блокноты',
    description: 'Тетради и блокноты на спирали различных форматов',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 20 },
      { id: 'a5', name: 'Формат А5', count: 18 },
      { id: 'a6', name: 'Формат А6', count: 15 }
    ]
  },
  'paper/plastic-spiral': {
    name: 'Тетради с пластиковой обложкой',
    description: 'Тетради и блокноты с прочной пластиковой обложкой',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 16 },
      { id: 'a5', name: 'Формат А5', count: 14 },
      { id: 'a6', name: 'Формат А6', count: 12 }
    ]
  },
  'paper/folderbook': {
    name: 'Тетради FolderBook',
    description: 'Инновационные тетради с уникальной системой переплета',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 10 },
      { id: 'a5', name: 'Формат А5', count: 8 }
    ]
  },
  'paper/ring': {
    name: 'Тетради на кольцах',
    description: 'Тетради и блокноты на кольцах для удобного использования',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 12 },
      { id: 'a5', name: 'Формат А5', count: 10 }
    ]
  },
  'paper/language': {
    name: 'Тетради для иностранных слов',
    description: 'Специальные тетради для изучения иностранных языков',
    subcategories: [
      { id: 'english', name: 'Английский язык', count: 15 },
      { id: 'german', name: 'Немецкий язык', count: 12 },
      { id: 'french', name: 'Французский язык', count: 10 }
    ]
  },
  'paper/music': {
    name: 'Тетради для нот',
    description: 'Тетради с нотными линейками для музыкантов',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 8 },
      { id: 'a5', name: 'Формат А5', count: 6 }
    ]
  },
  'paper/schedules': {
    name: 'Расписания уроков',
    description: 'Расписания уроков и планировщики для школьников',
    subcategories: [
      { id: 'elementary', name: 'Начальная школа', count: 12 },
      { id: 'middle', name: 'Средняя школа', count: 10 },
      { id: 'high', name: 'Старшая школа', count: 8 }
    ]
  },
  'paper/planners': {
    name: 'Планинги и ежедневники',
    description: 'Планинги, ежедневники и органайзеры для планирования',
    subcategories: [
      { id: 'daily', name: 'Ежедневники', count: 15 },
      { id: 'weekly', name: 'Еженедельники', count: 12 },
      { id: 'monthly', name: 'Ежемесячники', count: 8 }
    ]
  },
  'paper/notebooks': {
    name: 'Записные книжки',
    description: 'Записные книжки различных размеров и форматов',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 18 },
      { id: 'a5', name: 'Формат А5', count: 16 },
      { id: 'a6', name: 'Формат А6', count: 14 }
    ]
  },
  'paper/creative-sets': {
    name: 'Наборы для творчества',
    description: 'Наборы для творчества и рукоделия',
    subcategories: [
      { id: 'drawing', name: 'Рисование', count: 20 },
      { id: 'scrapbooking', name: 'Скрапбукинг', count: 15 },
      { id: 'origami', name: 'Оригами', count: 12 }
    ]
  },
  'paper/drawing-paper': {
    name: 'Бумага для рисования',
    description: 'Специальная бумага для рисования и художественного творчества',
    subcategories: [
      { id: 'a4', name: 'Формат А4', count: 25 },
      { id: 'a3', name: 'Формат А3', count: 18 },
      { id: 'a5', name: 'Формат А5', count: 20 }
    ]
  },
  'art/crayons': {
    name: 'Восковые мелки',
    description: 'Яркие восковые мелки для детского творчества',
    subcategories: [
      { id: 'jumbo', name: 'Утолщенные мелки', count: 15 },
      { id: 'standard', name: 'Стандартные мелки', count: 20 },
      { id: 'thin', name: 'Тонкие мелки', count: 12 }
    ]
  },
  'art/markers': {
    name: 'Фломастеры',
    description: 'Яркие и качественные фломастеры для творчества',
    subcategories: [
      { id: 'water', name: 'На водной основе', count: 18 },
      { id: 'alcohol', name: 'На спиртовой основе', count: 12 },
      { id: 'permanent', name: 'Перманентные', count: 8 }
    ]
  },
  'art/scissors': {
    name: 'Ножницы',
    description: 'Качественные ножницы для различных задач',
    subcategories: [
      { id: 'office', name: 'Канцелярские', count: 15 },
      { id: 'school', name: 'Школьные', count: 12 },
      { id: 'craft', name: 'Для творчества', count: 10 }
    ]
  }
};

// Функция для преобразования страницы
function convertPageToOldDesign(filePath) {
  try {
    const relativePath = filePath.replace('src/app/catalog/', '').replace(/\\/g, '/');
    const categoryKey = relativePath.replace('/page.tsx', '');
    
    if (!categoryMapping[categoryKey]) {
      console.log(`⚠️  Нет маппинга для: ${categoryKey}`);
      return false;
    }
    
    const category = categoryMapping[categoryKey];
    const newContent = oldDesignTemplate(category.name, category.description, category.subcategories, categoryKey);
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Преобразована: ${category.name}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Ошибка при преобразовании ${filePath}:`, error.message);
    return false;
  }
}

// Основная функция
function convertAllPagesToOldDesign() {
  console.log('🔧 Преобразуем все страницы в старый дизайн...\n');
  
  const catalogDir = 'src/app/catalog';
  const allPages = findTsxFiles(catalogDir);
  
  let convertedCount = 0;
  let totalCount = 0;
  
  allPages.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Проверяем, использует ли страница CategoryPage
    if (content.includes('import CategoryPage')) {
      totalCount++;
      if (convertPageToOldDesign(filePath)) {
        convertedCount++;
      }
    }
  });
  
  console.log(`\n🎉 Преобразование завершено!`);
  console.log(`   Преобразовано: ${convertedCount} из ${totalCount} страниц`);
}

// Функция для поиска файлов
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

// Запускаем преобразование
convertAllPagesToOldDesign();
