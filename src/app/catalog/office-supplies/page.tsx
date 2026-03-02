'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'os1',
    name: 'Скрепки Эквилибриум Classic, 28 мм, 100 шт., металлические',
    price: 40,
    image: '/images/office-supplies/clips1.jpg',
    subcategory: 'clips',
    description: 'Классические металлические скрепки для бумаги'
  },
  {
    id: 'os2',
    name: 'Скрепки Эквилибриум Color, 28 мм, 100 шт., цветные',
    price: 50,
    image: '/images/office-supplies/clips2.jpg',
    subcategory: 'clips',
    description: 'Цветные металлические скрепки для бумаги'
  },
  {
    id: 'os3',
    name: 'Скрепочница Эквилибриум Magnet, магнитная, со скрепками',
    price: 95,
    image: '/images/office-supplies/paper-clips1.jpg',
    subcategory: 'paper-clips',
    description: 'Магнитная скрепочница с набором скрепок'
  },
  {
    id: 'os4',
    name: 'Кнопки Эквилибриум Office, 50 шт., металлические',
    price: 45,
    image: '/images/office-supplies/buttons1.jpg',
    subcategory: 'buttons',
    description: 'Металлические кнопки для информационных досок'
  },
  {
    id: 'os5',
    name: 'Зажимы для бумаг Эквилибриум Standard, 19 мм, 12 шт.',
    price: 60,
    image: '/images/office-supplies/clamps1.jpg',
    subcategory: 'clamps',
    description: 'Стандартные металлические зажимы для бумаг'
  },
  {
    id: 'os6',
    name: 'Резинки для денег Эквилибриум Silk, 100 г, цветные',
    price: 75,
    image: '/images/office-supplies/rubber-bands1.jpg',
    subcategory: 'rubber-bands',
    description: 'Разноцветные резинки для денег и документов'
  },
  {
    id: 'os7',
    name: 'Гелевые подушечки для пальцев Эквилибриум Finger, 20 мл',
    price: 65,
    image: '/images/office-supplies/finger-pads1.jpg',
    subcategory: 'finger-pads',
    description: 'Гелевая подушечка для удобного перелистывания страниц'
  },
  {
    id: 'os8',
    name: 'Брелок для ключей Эквилибриум Tag, с бумажной вставкой, 6 шт.',
    price: 110,
    image: '/images/office-supplies/tags1.jpg',
    subcategory: 'tags',
    description: 'Цветные брелоки для ключей с возможностью подписи'
  }
];

// Подкатегории канцелярских мелочей
const officeSuppliesSubcategories = [
  { id: 'clips', name: 'Скрепки' },
  { id: 'paper-clips', name: 'Скрепочницы' },
  { id: 'buttons', name: 'Кнопки' },
  { id: 'clamps', name: 'Зажимы' },
  { id: 'rubber-bands', name: 'Канцелярские резинки для денег' },
  { id: 'finger-pads', name: 'Гелевые подушечки для пальцев' },
  { id: 'tags', name: 'Брелоки' }
];

export default function OfficeSuppliesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все канцтовары', count: 156 },
    { id: 'writing', name: 'Письменные принадлежности', count: 64 },
    { id: 'paper', name: 'Бумажная продукция', count: 48 },
    { id: 'storage', name: 'Хранение документов', count: 32 },
    { id: 'desk', name: 'Настольные принадлежности', count: 12 }
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
        <h1 className="text-3xl font-bold text-gray-900">Канцелярские мелочи</h1>
        <p className="text-gray-600 mt-2">Широкий ассортимент канцелярских товаров для офиса и учебы</p>
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
                <span className="font-medium">Все канцтовары</span>
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
            category="office-supplies" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 