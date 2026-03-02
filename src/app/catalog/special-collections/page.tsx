'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'sc1',
    name: 'Фигурка "Дед Мороз с мешком подарков", 15 см',
    price: 650,
    image: '/images/special-collections/santa1.jpg',
    subcategory: 'santa',
    description: 'Классическая фигурка Деда Мороза в красной шубе с мешком подарков'
  },
  {
    id: 'sc2',
    name: 'Игрушка "Снегурочка", подвесная, стекло, 12 см',
    price: 520,
    image: '/images/special-collections/santa2.jpg',
    subcategory: 'santa',
    description: 'Изящная стеклянная игрушка в виде Снегурочки с ручной росписью'
  },
  {
    id: 'sc3',
    name: 'Набор подвесок "Дед Мороз и олени", 5 шт.',
    price: 780,
    image: '/images/special-collections/santa3.jpg',
    subcategory: 'santa',
    description: 'Комплект из 5 тематических подвесок для новогодней елки'
  },
  {
    id: 'sc4',
    name: 'Игрушка "Первый Новый Год" с датой, персонализированная',
    price: 890,
    image: '/images/special-collections/baby1.jpg',
    subcategory: 'baby-first',
    description: 'Специальная игрушка для празднования первого Нового Года малыша с возможностью персонализации'
  },
  {
    id: 'sc5',
    name: 'Набор "Baby\'s 1st Christmas", шар и носочек',
    price: 990,
    image: '/images/special-collections/baby2.jpg',
    subcategory: 'baby-first',
    description: 'Подарочный набор из елочного шара и миниатюрного носочка для первого Рождества малыша'
  },
  {
    id: 'sc6',
    name: 'Фоторамка "Мой первый Новый Год", для елки',
    price: 750,
    image: '/images/special-collections/baby3.jpg',
    subcategory: 'baby-first',
    description: 'Елочная игрушка-фоторамка для первой новогодней фотографии ребенка'
  }
];

// Подкатегории специальных коллекций
const specialCollectionsSubcategories = [
  { id: 'santa', name: 'Дед Мороз & Co' },
  { id: 'baby-first', name: 'Baby\'s 1st Christmas' }
];

export default function SpecialCollectionsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все специальные коллекции', count: 64 },
    { id: 'seasonal', name: 'Сезонные коллекции', count: 32 },
    { id: 'themed', name: 'Тематические коллекции', count: 20 },
    { id: 'limited', name: 'Ограниченные серии', count: 12 }
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
        <h1 className="text-3xl font-bold text-gray-900">Специальные коллекции</h1>
        <p className="text-gray-600 mt-2">Уникальные и ограниченные коллекции товаров</p>
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
                <span className="font-medium">Все специальные коллекции</span>
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
            category="special-collections" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 