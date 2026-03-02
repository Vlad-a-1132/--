'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'rc1',
    name: 'Папка-скоросшиватель Эквилибриум Classic, А4, пластиковая, синяя',
    price: 35,
    image: '/images/report-covers/cover1.jpg',
    subcategory: 'standard',
    description: 'Классическая папка-скоросшиватель формата А4 из плотного пластика'
  },
  {
    id: 'rc2',
    name: 'Папка-скоросшиватель Эквилибриум Glossy, А4, пластиковая, зеленая',
    price: 45,
    image: '/images/report-covers/cover2.jpg',
    subcategory: 'standard',
    description: 'Глянцевая папка-скоросшиватель формата А4 из прочного пластика'
  },
  {
    id: 'rc3',
    name: 'Папка-скоросшиватель Эквилибриум Transparent, А4, пластиковая, прозрачная',
    price: 40,
    image: '/images/report-covers/cover3.jpg',
    subcategory: 'standard',
    description: 'Прозрачная папка-скоросшиватель формата А4 для частого использования'
  }
];

// Подкатегории папок-скоросшивателей
const reportCoversSubcategories = [
  { id: 'standard', name: 'Папки-скоросшиватели' }
];

export default function ReportCoversPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все папки-скоросшиватели', count: 24 },
    { id: 'a4', name: 'Формат А4', count: 16 },
    { id: 'a5', name: 'Формат А5', count: 8 }
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
        <h1 className="text-3xl font-bold text-gray-900">Папки-скоросшиватели</h1>
        <p className="text-gray-600 mt-2">Папки для документов с металлическими скоросшивателями</p>
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
                <span className="font-medium">Все папки-скоросшиватели</span>
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
            category="report-covers" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 