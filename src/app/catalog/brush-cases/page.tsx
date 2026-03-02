'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'bc1',
    name: 'Пенал для кистей Эквилибриум Roll, тканевый, зеленый',
    price: 350,
    image: '/images/brush-cases/case1.jpg',
    subcategory: 'roll',
    description: 'Тканевый пенал-рулон с отделениями для хранения и переноски кистей'
  },
  {
    id: 'bc2',
    name: 'Пенал для кистей Эквилибриум Roll, тканевый, черный',
    price: 350,
    image: '/images/brush-cases/case2.jpg',
    subcategory: 'roll',
    description: 'Тканевый пенал-рулон с отделениями для хранения и переноски кистей'
  },
  {
    id: 'bc3',
    name: 'Пенал для кистей Эквилибриум Stand, настольный, деревянный',
    price: 450,
    image: '/images/brush-cases/case3.jpg',
    subcategory: 'stand',
    description: 'Деревянный настольный пенал-подставка для хранения кистей в вертикальном положении'
  },
  {
    id: 'bc4',
    name: 'Пенал для кистей Эквилибриум Stand Plus, настольный, металлический',
    price: 520,
    image: '/images/brush-cases/case4.jpg',
    subcategory: 'stand',
    description: 'Металлический настольный пенал-подставка с вращающейся конструкцией'
  },
  {
    id: 'bc5',
    name: 'Пенал для кистей Эквилибриум Tube, тубус, пластиковый, прозрачный',
    price: 280,
    image: '/images/brush-cases/case5.jpg',
    subcategory: 'tube',
    description: 'Прозрачный пластиковый пенал-тубус с крышкой для хранения и защиты кистей'
  },
  {
    id: 'bc6',
    name: 'Пенал для кистей Эквилибриум Travel, складной, с замком',
    price: 420,
    image: '/images/brush-cases/case6.jpg',
    subcategory: 'special',
    description: 'Практичный складной пенал для кистей с замком и ручкой для переноски'
  }
];

// Подкатегории пеналов для кистей
const brushCasesSubcategories = [
  { id: 'roll', name: 'Пеналы-рулоны' },
  { id: 'stand', name: 'Пеналы-подставки' },
  { id: 'tube', name: 'Пеналы-тубусы' },
  { id: 'special', name: 'Специальные пеналы' }
];

export default function BrushCasesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все пеналы для кистей', count: 18 },
    { id: 'roll', name: 'Пеналы-рулоны', count: 8 },
    { id: 'tube', name: 'Пеналы-тубусы', count: 6 },
    { id: 'stand', name: 'Настольные пеналы', count: 4 }
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
        <h1 className="text-3xl font-bold text-gray-900">Пеналы для кистей</h1>
        <p className="text-gray-600 mt-2">Пеналы и чехлы для хранения художественных кистей</p>
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
                <span className="font-medium">Все пеналы для кистей</span>
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
            category="brush-cases" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 