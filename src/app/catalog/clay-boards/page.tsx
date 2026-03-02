'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'cb1',
    name: 'Доска для лепки Эквилибриум Clay, А4, белая',
    price: 180,
    image: '/images/clay-boards/board1.jpg',
    subcategory: 'standard',
    description: 'Пластиковая доска формата А4 для лепки из пластилина и глины'
  },
  {
    id: 'cb2',
    name: 'Доска для лепки Эквилибриум Clay, А3, белая',
    price: 220,
    image: '/images/clay-boards/board2.jpg',
    subcategory: 'standard',
    description: 'Пластиковая доска увеличенного формата А3 для лепки из пластилина и глины'
  },
  {
    id: 'cb3',
    name: 'Доска для лепки Эквилибриум Model, А4, с бортиками, голубая',
    price: 210,
    image: '/images/clay-boards/board3.jpg',
    subcategory: 'border',
    description: 'Доска с бортиками для предотвращения падения материалов во время работы'
  },
  {
    id: 'cb4',
    name: 'Доска для лепки Эквилибриум Model, А3, с бортиками, голубая',
    price: 250,
    image: '/images/clay-boards/board4.jpg',
    subcategory: 'border',
    description: 'Большая доска формата А3 с бортиками для предотвращения падения материалов'
  },
  {
    id: 'cb5',
    name: 'Доска для лепки Эквилибриум Sculptor, круглая, поворотная',
    price: 380,
    image: '/images/clay-boards/board5.jpg',
    subcategory: 'rotating',
    description: 'Круглая поворотная доска для скульптурной лепки с возможностью вращения'
  },
  {
    id: 'cb6',
    name: 'Набор для лепки Эквилибриум Artisan, доска А4 + 4 стека',
    price: 320,
    image: '/images/clay-boards/board6.jpg',
    subcategory: 'sets',
    description: 'Комплект из доски для лепки и набора инструментов для моделирования'
  }
];

// Подкатегории досок для лепки
const clayBoardsSubcategories = [
  { id: 'standard', name: 'Стандартные доски' },
  { id: 'border', name: 'Доски с бортиками' },
  { id: 'rotating', name: 'Поворотные доски' },
  { id: 'sets', name: 'Наборы для лепки' }
];

export default function ClayBoardsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все доски для лепки', count: 24 },
    { id: 'a4', name: 'Формат А4', count: 12 },
    { id: 'a3', name: 'Формат А3', count: 8 },
    { id: 'round', name: 'Круглые', count: 4 }
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
        <h1 className="text-3xl font-bold text-gray-900">Доски для лепки</h1>
        <p className="text-gray-600 mt-2">Пластиковые доски для лепки из пластилина</p>
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
                <span className="font-medium">Все доски для лепки</span>
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
            category="clay-boards" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 