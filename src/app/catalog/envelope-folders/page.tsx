'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Подкатегории для папок-конвертов
const subcategories = [
  { id: 'envelope-folders-general', name: 'Папки-конверты' },
];

// Товары для папок-конвертов
const products = [
  {
    id: '1',
    name: 'Папка-конверт А4 прозрачная',
    price: 45,
    image: '/images/tovar.PNG',
    subcategory: 'envelope-folders-general',
    description: 'Прозрачная папка-конверт формата А4',
    category: 'Папки-конверты',
    stock: 180,
    slug: 'papka-konvert-a4-prozrachnaya'
  },
  {
    id: '2',
    name: 'Папка-конверт А4 цветная',
    price: 50,
    image: '/images/tovar.PNG',
    subcategory: 'envelope-folders-general',
    description: 'Цветная папка-конверт формата А4',
    category: 'Папки-конверты',
    stock: 150,
    slug: 'papka-konvert-a4-tsvetnaya'
  },
  {
    id: '3',
    name: 'Папка-конверт А5 прозрачная',
    price: 35,
    image: '/images/tovar.PNG',
    subcategory: 'envelope-folders-general',
    description: 'Прозрачная папка-конверт формата А5',
    category: 'Папки-конверты',
    stock: 200,
    slug: 'papka-konvert-a5-prozrachnaya'
  }
];

export default function EnvelopeFoldersPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все папки-конверты', count: 32 },
    { id: 'a4', name: 'Формат А4', count: 18 },
    { id: 'a5', name: 'Формат А5', count: 10 },
    { id: 'special', name: 'Специальные', count: 4 }
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
        <h1 className="text-3xl font-bold text-gray-900">Папки-конверты</h1>
        <p className="text-gray-600 mt-2">Папки в виде конвертов для документов</p>
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
                <span className="font-medium">Все папки-конверты</span>
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
            category="envelope-folders" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 