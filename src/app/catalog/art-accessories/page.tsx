'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'aa1',
    name: 'Кисти для акварели Эквилибриум Aqua, круглые, 6 шт.',
    price: 280,
    image: '/images/art-accessories/brushes1.jpg',
    subcategory: 'brushes',
    description: 'Набор круглых кистей из натурального волоса для акварельной живописи'
  },
  {
    id: 'aa2',
    name: 'Кисти для гуаши Эквилибриум Basic, плоские, 5 шт.',
    price: 320,
    image: '/images/art-accessories/brushes2.jpg',
    subcategory: 'brushes',
    description: 'Набор плоских кистей из синтетического волоса для работы с гуашью'
  },
  {
    id: 'aa3',
    name: 'Кисть для акварели Эквилибриум Professional, белка, круглая, №2',
    price: 150,
    image: '/images/art-accessories/brushes3.jpg',
    subcategory: 'brushes',
    description: 'Профессиональная кисть из натурального беличьего волоса для тонких работ акварелью'
  },
  {
    id: 'aa4',
    name: 'Стакан-непроливайка Эквилибриум Basic, одинарный, синий',
    price: 80,
    image: '/images/art-accessories/cup1.jpg',
    subcategory: 'cups',
    description: 'Практичный одинарный стакан-непроливайка для рисования акварелью и гуашью'
  },
  {
    id: 'aa5',
    name: 'Стакан-непроливайка Эквилибриум Double, двойной, красный/синий',
    price: 120,
    image: '/images/art-accessories/cup2.jpg',
    subcategory: 'cups',
    description: 'Двойной стакан-непроливайка с крышкой для использования разных цветов или чистой и грязной воды'
  },
  {
    id: 'aa6',
    name: 'Стакан-непроливайка Эквилибриум Triple, тройной, разноцветный',
    price: 180,
    image: '/images/art-accessories/cup3.jpg',
    subcategory: 'cups',
    description: 'Тройной стакан-непроливайка с тремя отдельными секциями для смешивания красок или разных цветов'
  },
  {
    id: 'aa7',
    name: 'Пенал для кистей Эквилибриум Roll, тканевый, зеленый',
    price: 350,
    image: '/images/art-accessories/brushcase1.jpg',
    subcategory: 'brushcases',
    description: 'Тканевый пенал-рулон с отделениями для хранения и переноски кистей'
  },
  {
    id: 'aa8',
    name: 'Пенал для кистей Эквилибриум Stand, настольный, деревянный',
    price: 450,
    image: '/images/art-accessories/brushcase2.jpg',
    subcategory: 'brushcases',
    description: 'Деревянный настольный пенал-подставка для хранения кистей в вертикальном положении'
  },
  {
    id: 'aa9',
    name: 'Пенал для кистей Эквилибриум Tube, тубус, пластиковый, прозрачный',
    price: 280,
    image: '/images/art-accessories/brushcase3.jpg',
    subcategory: 'brushcases',
    description: 'Прозрачный пластиковый пенал-тубус с крышкой для хранения и защиты кистей'
  },
  {
    id: 'aa10',
    name: 'Доска для лепки Эквилибриум Clay, А4, белая',
    price: 180,
    image: '/images/art-accessories/clayboard1.jpg',
    subcategory: 'clayboards',
    description: 'Пластиковая доска формата А4 для лепки из пластилина и глины'
  },
  {
    id: 'aa11',
    name: 'Доска для лепки Эквилибриум Model, А3, с бортиками, голубая',
    price: 250,
    image: '/images/art-accessories/clayboard2.jpg',
    subcategory: 'clayboards',
    description: 'Большая доска формата А3 с бортиками для предотвращения падения материалов'
  },
  {
    id: 'aa12',
    name: 'Доска для лепки Эквилибриум Sculptor, круглая, поворотная',
    price: 380,
    image: '/images/art-accessories/clayboard3.jpg',
    subcategory: 'clayboards',
    description: 'Круглая поворотная доска для скульптурной лепки с возможностью вращения'
  },
  {
    id: 'aa13',
    name: 'Настольная подкладка Эквилибриум Art, А3, прозрачная',
    price: 220,
    image: '/images/art-accessories/mat1.jpg',
    subcategory: 'mats',
    description: 'Прозрачная пластиковая подкладка для защиты стола при творческих занятиях'
  },
  {
    id: 'aa14',
    name: 'Настольная подкладка Эквилибриум Protect, А2, с нескользящей основой',
    price: 350,
    image: '/images/art-accessories/mat2.jpg',
    subcategory: 'mats',
    description: 'Большая подкладка с нескользящей основой для устойчивости при работе'
  },
  {
    id: 'aa15',
    name: 'Настольная подкладка Эквилибриум Creative, многослойная, сменные листы',
    price: 420,
    image: '/images/art-accessories/mat3.jpg',
    subcategory: 'mats',
    description: 'Многослойная подкладка со сменными листами для длительного использования'
  }
];

// Подкатегории аксессуаров для творчества
const artAccessoriesSubcategories = [
  { id: 'brushes', name: 'Кисти для акварели и гуаши' },
  { id: 'cups', name: 'Стаканы-непроливайки' },
  { id: 'brushcases', name: 'Пеналы для кистей' },
  { id: 'clayboards', name: 'Доски для лепки' },
  { id: 'mats', name: 'Настольные подкладки для творчества пластиковые' }
];

export default function ArtAccessoriesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все аксессуары для творчества', count: 52 },
    { id: 'brushes', name: 'Кисти для акварели и гуаши', count: 18 },
    { id: 'cups', name: 'Стаканы-непроливайки', count: 12 },
    { id: 'brushcases', name: 'Пеналы для кистей', count: 15 },
    { id: 'clayboards', name: 'Доски для лепки', count: 7 }
  ];

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Навигация */}
      <div className="mb-8">
        <Link 
          href="/catalog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Аксессуары для творчества</h1>
        <p className="text-gray-600 mt-2">Аксессуары для художественного творчества</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры и подкатегории */}
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
                <span className="font-medium">Все аксессуары для творчества</span>
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

        {/* Основной контент */}
        <div className="w-full lg:w-3/4">
          {selectedSubcategory ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {subcategories.find(sub => sub.id === selectedSubcategory)?.name}
              </h2>
            </div>
          ) : null}

          <ProductGrid 
            category="art-accessories" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 