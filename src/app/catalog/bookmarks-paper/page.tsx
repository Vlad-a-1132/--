"use client";

import React, { useState } from 'react';
import CategoryPage from '../../components/CategoryPage';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'bm1',
    name: 'Закладки Эквилибриум Paper, бумажные, разноцветные, 50 шт.',
    price: 65,
    image: '/images/bookmarks-paper/bookmark1.jpg',
    subcategory: 'standard',
    description: 'Бумажные закладки для книг и документов'
  },
  {
    id: 'bm2',
    name: 'Закладки Эквилибриум Corner, угловые, разноцветные, 10 шт.',
    price: 75,
    image: '/images/bookmarks-paper/bookmark2.jpg',
    subcategory: 'standard',
    description: 'Угловые закладки для удобной маркировки страниц'
  },
  {
    id: 'bm3',
    name: 'Закладки Эквилибриум Magnetic, магнитные, цветные, 6 шт.',
    price: 95,
    image: '/images/bookmarks-paper/bookmark3.jpg',
    subcategory: 'standard',
    description: 'Магнитные закладки для быстрого доступа к нужным страницам'
  }
];

// Подкатегории закладок
const bookmarksSubcategories = [
  { id: 'standard', name: 'Закладки' }
];

export default function BookmarksPaperPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все закладки', count: 28 },
    { id: 'magnetic', name: 'Магнитные закладки', count: 12 },
    { id: 'paper', name: 'Бумажные закладки', count: 16 }
  ];

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link 
          href="/catalog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Закладки для книг бумажные</h1>
        <p className="text-gray-600 mt-2">Закладки для книг различных типов</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Подкатегории</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSubcategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                  selectedSubcategory === null
                    ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                    : 'hover:border-l-4 hover:border-blue-300'
                }`}
              >
                <span className="font-medium">Все закладки</span>
                <span className="ml-2 text-sm text-gray-500">({subcategories.reduce((sum, sub) => sum + sub.count, 0)})</span>
              </button>
              {subcategories.slice(1).map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                    selectedSubcategory === subcategory.id
                      ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                      : 'hover:border-l-4 hover:border-blue-300'
                  }`}
                >
                  <span className="font-medium">{subcategory.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({subcategory.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          {selectedSubcategory ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {subcategories.find(sub => sub.id === selectedSubcategory)?.name}
              </h2>
            </div>
          ) : null}

          <ProductGrid 
            category="bookmarks-paper" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 