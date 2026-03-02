'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'sb1',
    name: 'Ранец Эквилибриум ErgoLine 16L "Дино", с эргономичной спинкой',
    price: 4500,
    image: '/images/school-backpacks/ergonomic1.jpg',
    subcategory: 'ergonomic-satchels',
    description: 'Ранец с ортопедической спинкой, светоотражающими элементами и отделением для ноутбука'
  },
  {
    id: 'sb2',
    name: 'Ранец Эквилибриум ErgoLine 18L "Космос", с эргономичной спинкой',
    price: 4750,
    image: '/images/school-backpacks/ergonomic2.jpg',
    subcategory: 'ergonomic-satchels',
    description: 'Легкий ранец с формованной спинкой и дышащими материалами'
  },
  {
    id: 'sb3',
    name: 'Рюкзак Эквилибриум EasyGo 20L "Футбол", с эргономичной спинкой',
    price: 3800,
    image: '/images/school-backpacks/ergonomic-backpacks1.jpg',
    subcategory: 'ergonomic-backpacks',
    description: 'Рюкзак с ортопедической спинкой и широкими регулируемыми лямками'
  },
  {
    id: 'sb4',
    name: 'Рюкзак Эквилибриум EasyGo 22L "Цветы", с эргономичной спинкой',
    price: 3950,
    image: '/images/school-backpacks/ergonomic-backpacks2.jpg',
    subcategory: 'ergonomic-backpacks',
    description: 'Рюкзак с анатомической спинкой и отделением для планшета'
  },
  {
    id: 'sb5',
    name: 'Рюкзак Эквилибриум Casual 18L "Графика", с укрепленной спинкой',
    price: 2800,
    image: '/images/school-backpacks/reinforced1.jpg',
    subcategory: 'reinforced',
    description: 'Рюкзак с укрепленной спинкой и вместительным основным отделением'
  },
  {
    id: 'sb6',
    name: 'Рюкзак Эквилибриум Modern 16L "Яркие узоры"',
    price: 2200,
    image: '/images/school-backpacks/regular1.jpg',
    subcategory: 'regular',
    description: 'Классический рюкзак для учебы и повседневного использования'
  }
];

// Подкатегории ранцев и рюкзаков
const schoolBackpacksSubcategories = [
  { id: 'ergonomic-satchels', name: 'Ранцы с эргономичной спинкой' },
  { id: 'ergonomic-backpacks', name: 'Рюкзаки с эргономичной спинкой' },
  { id: 'reinforced', name: 'Рюкзаки с укреплённой спинкой' },
  { id: 'regular', name: 'Рюкзаки' }
];

export default function SchoolBackpacksPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все школьные рюкзаки', count: 36 },
    { id: 'elementary', name: 'Для младших классов', count: 16 },
    { id: 'middle', name: 'Для средних классов', count: 12 },
    { id: 'senior', name: 'Для старших классов', count: 8 }
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
        <h1 className="text-3xl font-bold text-gray-900">Ранцы и рюкзаки ученические</h1>
        <p className="text-gray-600 mt-2">Качественные ранцы и рюкзаки для школьников</p>
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
                <span className="font-medium">Все школьные рюкзаки</span>
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
            category="school-backpacks" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 