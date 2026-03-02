'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'sp1',
    name: 'Перфофайлы Эквилибриум, А4, 30 мкм, 100 шт.',
    price: 250,
    image: '/images/sheet-protectors/protector1.jpg',
    subcategory: 'standard',
    description: 'Стандартные перфофайлы формата А4, прозрачные'
  },
  {
    id: 'sp2',
    name: 'Перфофайлы Эквилибриум, А4, 50 мкм, гладкие, 50 шт.',
    price: 280,
    image: '/images/sheet-protectors/protector2.jpg',
    subcategory: 'standard',
    description: 'Прочные перфофайлы формата А4 с увеличенной толщиной пленки'
  },
  {
    id: 'sp3',
    name: 'Перфофайлы Эквилибриум, А5, 35 мкм, 100 шт.',
    price: 220,
    image: '/images/sheet-protectors/protector3.jpg',
    subcategory: 'standard',
    description: 'Стандартные перфофайлы формата А5, прозрачные'
  }
];

// Подкатегории перфофайлов
const sheetProtectorsSubcategories = [
  { id: 'standard', name: 'Перфофайлы' }
];

export default function SheetProtectorsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все перфофайлы', count: 28 },
    { id: 'a4', name: 'Формат А4', count: 18 },
    { id: 'a5', name: 'Формат А5', count: 10 }
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
        <h1 className="text-3xl font-bold text-gray-900">Перфофайлы</h1>
        <p className="text-gray-600 mt-2">Защитные файлы для документов с перфорацией</p>
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
                <span className="font-medium">Все перфофайлы</span>
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
            category="sheet-protectors" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 