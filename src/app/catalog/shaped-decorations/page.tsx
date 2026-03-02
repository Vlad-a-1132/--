'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'sd1',
    name: 'Фигурка "Снеговик", пластик, 10 см',
    price: 350,
    image: '/images/shaped-decorations/plastic1.jpg',
    subcategory: 'plastic',
    description: 'Яркая пластиковая фигурка снеговика для украшения елки'
  },
  {
    id: 'sd2',
    name: 'Фигурка "Олень", пластик, красный, 8 см',
    price: 370,
    image: '/images/shaped-decorations/plastic2.jpg',
    subcategory: 'plastic',
    description: 'Пластиковая фигурка оленя с блестками для новогодней елки'
  },
  {
    id: 'sd3',
    name: 'Набор фигурок "Лесные животные", пластик, 4 шт.',
    price: 690,
    image: '/images/shaped-decorations/plastic3.jpg',
    subcategory: 'plastic',
    description: 'Комплект из 4 пластиковых игрушек в виде лесных животных'
  },
  {
    id: 'sd4',
    name: 'Снежинка ажурная, серебро, 15 см',
    price: 280,
    image: '/images/shaped-decorations/snowflake1.jpg',
    subcategory: 'snowflakes',
    description: 'Ажурная снежинка с серебристым покрытием и блестками'
  },
  {
    id: 'sd5',
    name: 'Звезда рельефная, золото, 12 см',
    price: 320,
    image: '/images/shaped-decorations/snowflake2.jpg',
    subcategory: 'snowflakes',
    description: 'Рельефная звезда с золотым покрытием для украшения елки или интерьера'
  },
  {
    id: 'sd6',
    name: 'Набор снежинок "Зимняя сказка", 6 шт., белые',
    price: 450,
    image: '/images/shaped-decorations/snowflake3.jpg',
    subcategory: 'snowflakes',
    description: 'Комплект из 6 белых снежинок разных дизайнов для создания зимней атмосферы'
  },
  {
    id: 'sd7',
    name: 'Подвеска "Ключик от счастья", 8 см',
    price: 290,
    image: '/images/shaped-decorations/pendant1.jpg',
    subcategory: 'pendants',
    description: 'Декоративная подвеска в виде ключика с новогодними мотивами'
  },
  {
    id: 'sd8',
    name: 'Подвеска "Сапожок Санты", красный, 10 см',
    price: 340,
    image: '/images/shaped-decorations/pendant2.jpg',
    subcategory: 'pendants',
    description: 'Подвеска в виде рождественского сапожка для елки или интерьера'
  },
  {
    id: 'sd9',
    name: 'Набор подвесок "Рождественские символы", 5 шт.',
    price: 680,
    image: '/images/shaped-decorations/pendant3.jpg',
    subcategory: 'pendants',
    description: 'Комплект из 5 подвесок с различными рождественскими символами'
  }
];

// Подкатегории формовых украшений
const shapedDecorationsSubcategories = [
  { id: 'plastic', name: 'Формовая игрушка из пластика' },
  { id: 'snowflakes', name: 'Снежинки и звезды' },
  { id: 'pendants', name: 'Прочие подвески' }
];

export default function ShapedDecorationsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все формовые украшения', count: 32 },
    { id: 'animals', name: 'Животные', count: 12 },
    { id: 'flowers', name: 'Цветы', count: 10 },
    { id: 'geometric', name: 'Геометрические', count: 10 }
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
        <h1 className="text-3xl font-bold text-gray-900">Формовые украшения</h1>
        <p className="text-gray-600 mt-2">Декоративные элементы различных форм</p>
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
                <span className="font-medium">Все формовые украшения</span>
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
            category="shaped-decorations" 
            subcategory={selectedSubcategory}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 