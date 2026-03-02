'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'bag1',
    name: 'Сумка Эквилибриум Campus 15L, черная',
    price: 1800,
    image: '/images/bags/bag1.jpg',
    subcategory: 'regular',
    description: 'Практичная сумка через плечо для учебы и работы'
  },
  {
    id: 'bag2',
    name: 'Сумка Эквилибриум Messenger 12L, синяя',
    price: 1600,
    image: '/images/bags/bag2.jpg',
    subcategory: 'regular',
    description: 'Стильная сумка-мессенджер с отделением для планшета'
  },
  {
    id: 'bag3',
    name: 'Сумка-шоппер Эквилибриум Eco 18L, бежевая',
    price: 980,
    image: '/images/bags/shopper1.jpg',
    subcategory: 'shopper',
    description: 'Вместительная эко-сумка из плотного хлопка для покупок'
  },
  {
    id: 'bag4',
    name: 'Сумка-шоппер Эквилибриум Urban 20L, графит',
    price: 1200,
    image: '/images/bags/shopper2.jpg',
    subcategory: 'shopper',
    description: 'Прочная городская сумка-шоппер с внутренним карманом'
  },
  {
    id: 'bag5',
    name: 'Мешок для обуви Эквилибриум Basic, черный',
    price: 350,
    image: '/images/bags/shoe1.jpg',
    subcategory: 'shoe',
    description: 'Простой и практичный мешок для обуви со шнурком-затяжкой'
  },
  {
    id: 'bag6',
    name: 'Мешок для обуви Эквилибриум Animals "Тигр"',
    price: 450,
    image: '/images/bags/shoe2.jpg',
    subcategory: 'shoe',
    description: 'Яркий мешок для обуви с принтом тигра и усиленными углами'
  },
  {
    id: 'bag7',
    name: 'Мешок для обуви Эквилибриум Sport, синий/красный',
    price: 400,
    image: '/images/bags/shoe3.jpg',
    subcategory: 'shoe',
    description: 'Мешок для обуви с дополнительным карманом на молнии'
  }
];

// Подкатегории сумок
const bagsSubcategories = [
  { id: 'regular', name: 'Сумки' },
  { id: 'shopper', name: 'Сумки-шопперы' },
  { id: 'shoe', name: 'Мешки для обуви' }
];

export default function BagsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все сумки', count: 36 },
    { id: 'regular', name: 'Сумки', count: 18 },
    { id: 'shopper', name: 'Сумки-шопперы', count: 12 },
    { id: 'shoe', name: 'Мешки для обуви', count: 6 }
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
        <h1 className="text-3xl font-bold text-gray-900">Сумки</h1>
        <p className="text-gray-600 mt-2">Сумки для различных нужд</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры и подкатегории */}
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
                <span className="font-medium">Все сумки</span>
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
            categorySlug="bags" 
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 