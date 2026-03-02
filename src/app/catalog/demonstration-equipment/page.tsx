'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'd1',
    name: 'Доска магнитно-маркерная Эквилибриум, 60x90 см, алюминиевая рамка',
    price: 3500,
    image: '/images/demonstration/board1.jpg',
    subcategory: 'board-accessories',
    description: 'Магнитно-маркерная доска с качественной рабочей поверхностью'
  },
  {
    id: 'd2',
    name: 'Магниты для досок Эквилибриум, 30 мм, 6 шт., ассорти',
    price: 250,
    image: '/images/demonstration/magnets1.jpg',
    subcategory: 'board-accessories',
    description: 'Набор разноцветных магнитов для крепления информации на магнитной доске'
  },
  {
    id: 'd3',
    name: 'Держатель для бейджа Эквилибриум, на шнурке, вертикальный',
    price: 120,
    image: '/images/demonstration/badge1.jpg',
    subcategory: 'badges',
    description: 'Держатель для бейджа с прочным шнурком и надежным карабином'
  }
];

// Подкатегории демонстрационного оборудования
const demonstrationEquipmentSubcategories = [
  { id: 'board-accessories', name: 'Аксессуары для досок' },
  { id: 'badges', name: 'Бейджи и держатели для бейджей' }
];

export default function DemonstrationEquipmentPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все демо-оборудование', count: 28 },
    { id: 'boards', name: 'Доски', count: 12 },
    { id: 'stands', name: 'Стенды', count: 8 },
    { id: 'projectors', name: 'Проекторы', count: 8 }
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
        <h1 className="text-3xl font-bold text-gray-900">Демонстрационное оборудование</h1>
        <p className="text-gray-600 mt-2">Оборудование для презентаций и демонстраций</p>
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
                <span className="font-medium">Все демо-оборудование</span>
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
            category="demonstration-equipment" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 