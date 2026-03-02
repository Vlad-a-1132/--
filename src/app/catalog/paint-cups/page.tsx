'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'pc1',
    name: 'Стакан-непроливайка Эквилибриум Basic, одинарный, синий',
    price: 80,
    image: '/images/paint-cups/cup1.jpg',
    subcategory: 'single',
    description: 'Практичный одинарный стакан-непроливайка для рисования акварелью и гуашью'
  },
  {
    id: 'pc2',
    name: 'Стакан-непроливайка Эквилибриум Basic, одинарный, красный',
    price: 80,
    image: '/images/paint-cups/cup2.jpg',
    subcategory: 'single',
    description: 'Практичный одинарный стакан-непроливайка для рисования акварелью и гуашью'
  },
  {
    id: 'pc3',
    name: 'Стакан-непроливайка Эквилибриум Double, двойной, красный/синий',
    price: 120,
    image: '/images/paint-cups/cup3.jpg',
    subcategory: 'double',
    description: 'Двойной стакан-непроливайка с крышкой для использования разных цветов или чистой и грязной воды'
  },
  {
    id: 'pc4',
    name: 'Стакан-непроливайка Эквилибриум Double, двойной, зеленый/желтый',
    price: 120,
    image: '/images/paint-cups/cup4.jpg',
    subcategory: 'double',
    description: 'Двойной стакан-непроливайка с крышкой для использования разных цветов или чистой и грязной воды'
  },
  {
    id: 'pc5',
    name: 'Стакан-непроливайка Эквилибриум Triple, тройной, разноцветный',
    price: 180,
    image: '/images/paint-cups/cup5.jpg',
    subcategory: 'multi',
    description: 'Тройной стакан-непроливайка с тремя отдельными секциями для смешивания красок или разных цветов'
  },
  {
    id: 'pc6',
    name: 'Стакан-непроливайка Эквилибриум Professional, с ручкой, 350 мл',
    price: 150,
    image: '/images/paint-cups/cup6.jpg',
    subcategory: 'special',
    description: 'Профессиональный стакан-непроливайка увеличенного объема с эргономичной ручкой'
  }
];

// Подкатегории стаканов-непроливаек
const paintCupsSubcategories = [
  { id: 'single', name: 'Одинарные' },
  { id: 'double', name: 'Двойные' },
  { id: 'multi', name: 'Многосекционные' },
  { id: 'special', name: 'Специальные' }
];

export default function PaintCupsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все стаканы-непроливайки', count: 18 },
    { id: 'plastic', name: 'Пластиковые', count: 10 },
    { id: 'paper', name: 'Бумажные', count: 6 },
    { id: 'reusable', name: 'Многоразовые', count: 2 }
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
        <h1 className="text-3xl font-bold text-gray-900">Стаканы-непроливайки</h1>
        <p className="text-gray-600 mt-2">Стаканы для смешивания и хранения красок</p>
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
                <span className="font-medium">Все стаканы-непроливайки</span>
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
            category="paint-cups" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 