'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'bp1',
    name: 'Рюкзак Эквилибриум Urban 25L, серый',
    price: 2800,
    image: '/images/backpacks/backpack1.jpg',
    subcategory: 'regular',
    description: 'Вместительный рюкзак для города с отделением для ноутбука до 15.6 дюймов'
  },
  {
    id: 'bp2',
    name: 'Рюкзак Эквилибриум City 20L, черный',
    price: 2400,
    image: '/images/backpacks/backpack2.jpg',
    subcategory: 'regular',
    description: 'Стильный городской рюкзак с водоотталкивающим покрытием'
  },
  {
    id: 'bp3',
    name: 'Рюкзак Эквилибриум Travel 30L, синий',
    price: 3200,
    image: '/images/backpacks/backpack3.jpg',
    subcategory: 'regular',
    description: 'Рюкзак для путешествий с множеством карманов и отделений'
  },
  {
    id: 'bp4',
    name: 'Мини-рюкзак Эквилибриум Kids 10L "Динозавры"',
    price: 1500,
    image: '/images/backpacks/mini1.jpg',
    subcategory: 'mini',
    description: 'Яркий мини-рюкзак для дошкольников и младших школьников'
  },
  {
    id: 'bp5',
    name: 'Мини-рюкзак Эквилибриум Kids 8L "Кошечка"',
    price: 1350,
    image: '/images/backpacks/mini2.jpg',
    subcategory: 'mini',
    description: 'Компактный и легкий рюкзачок для детей дошкольного возраста'
  },
  {
    id: 'bp6',
    name: 'Мини-рюкзак Эквилибриум Kids 12L "Космос"',
    price: 1650,
    image: '/images/backpacks/mini3.jpg',
    subcategory: 'mini',
    description: 'Мини-рюкзак с космическим принтом и светоотражающими элементами'
  }
];

// Подкатегории рюкзаков
const backpacksSubcategories = [
  { id: 'regular', name: 'Рюкзаки' },
  { id: 'mini', name: 'Мини-рюкзаки для детей' }
];

export default function BackpacksPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все рюкзаки', count: 48 },
    { id: 'school', name: 'Школьные рюкзаки', count: 24 },
    { id: 'travel', name: 'Туристические рюкзаки', count: 16 },
    { id: 'laptop', name: 'Рюкзаки для ноутбуков', count: 8 }
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
        <h1 className="text-3xl font-bold text-gray-900">Рюкзаки</h1>
        <p className="text-gray-600 mt-2">Качественные рюкзаки для различных целей</p>
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
                <span className="font-medium">Все рюкзаки</span>
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
            category="backpacks" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 