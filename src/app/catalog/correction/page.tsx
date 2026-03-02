'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'c1',
    name: 'Корректирующая жидкость Эквилибриум White, 20мл',
    price: 65,
    image: '/images/correction/fluid1.jpg',
    subcategory: 'fluid',
    description: 'Корректирующая жидкость с кисточкой, быстросохнущая'
  },
  {
    id: 'c2',
    name: 'Ручка-корректор Эквилибриум Precision, 8мл',
    price: 75,
    image: '/images/correction/pen1.jpg',
    subcategory: 'pen',
    description: 'Ручка-корректор с металлическим наконечником для точного нанесения'
  },
  {
    id: 'c3',
    name: 'Корректирующая лента Эквилибриум Techno, 5мм x 8м',
    price: 85,
    image: '/images/correction/tape1.jpg',
    subcategory: 'tape',
    description: 'Корректирующая лента для мгновенного исправления текста'
  }
];

// Подкатегории корректоров
const correctionSubcategories = [
  { id: 'fluid', name: 'Корректирующая жидкость' },
  { id: 'pen', name: 'Ручка-корректор' },
  { id: 'tape', name: 'Корректирующая лента' }
];

export default function CorrectionPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все корректоры', count: 36 },
    { id: 'tape', name: 'Корректор-лента', count: 18 },
    { id: 'fluid', name: 'Корректор-жидкость', count: 12 },
    { id: 'pen', name: 'Корректор-ручка', count: 6 }
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
        <h1 className="text-3xl font-bold text-gray-900">Корректоры для текста</h1>
        <p className="text-gray-600 mt-2">Средства для исправления ошибок в тексте</p>
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
                <span className="font-medium">Все корректоры</span>
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
            category="correction" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 