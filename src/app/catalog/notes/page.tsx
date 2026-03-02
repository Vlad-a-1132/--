'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'n1',
    name: 'Бумага для заметок Эквилибриум Office, белая, 9x9 см, 500 листов',
    price: 70,
    image: '/images/notes/paper1.jpg',
    subcategory: 'paper',
    description: 'Классическая белая бумага для заметок в кубе'
  },
  {
    id: 'n2',
    name: 'Бумага для заметок Эквилибриум Color, цветная, 9x9 см, 500 листов',
    price: 85,
    image: '/images/notes/paper2.jpg',
    subcategory: 'paper',
    description: 'Цветная бумага для заметок, яркий микс из 5 цветов'
  },
  {
    id: 'n3',
    name: 'Бумага для заметок в диспенсере Эквилибриум Spiral, белая, 9x9 см, 500 листов',
    price: 110,
    image: '/images/notes/paper3.jpg',
    subcategory: 'paper',
    description: 'Бумага для заметок в удобном диспенсере с отверстием в центре'
  }
];

// Подкатегории бумаги для заметок
const noteSubcategories = [
  { id: 'paper', name: 'Бумага для заметок стандартная' },
  { id: 'dispenser', name: 'Бумага для заметок в диспенсере' }
];

export default function NotesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Вся бумага для заметок', count: 28 },
    { id: 'sticky', name: 'Стикеры', count: 15 },
    { id: 'paper', name: 'Бумажные заметки', count: 8 },
    { id: 'magnetic', name: 'Магнитные заметки', count: 5 }
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
        <h1 className="text-3xl font-bold text-gray-900">Бумага для заметок</h1>
        <p className="text-gray-600 mt-2">Различные типы бумаги для заметок и организации задач</p>
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
                <span className="font-medium">Вся бумага для заметок</span>
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
            category="notes" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 