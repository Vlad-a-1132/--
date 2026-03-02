'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'pc1',
    name: 'Пенал пластиковый Эквилибриум Basic, прямоугольный, черный',
    price: 150,
    image: '/images/pencil-cases/plastic1.jpg',
    subcategory: 'plastic',
    description: 'Прочный пластиковый пенал прямоугольной формы с одним отделением'
  },
  {
    id: 'pc2',
    name: 'Пенал пластиковый Эквилибриум Colorful, с рисунком, голубой',
    price: 180,
    image: '/images/pencil-cases/plastic2.jpg',
    subcategory: 'plastic',
    description: 'Яркий пластиковый пенал с изображением героев мультфильмов'
  },
  {
    id: 'pc3',
    name: 'Пенал на кнопке Эквилибриум Button, А5, прозрачный',
    price: 120,
    image: '/images/pencil-cases/button1.jpg',
    subcategory: 'button',
    description: 'Удобный пенал на кнопке формата А5, подходит для хранения мелких канцелярских принадлежностей'
  },
  {
    id: 'pc4',
    name: 'Пенал на кнопке Эквилибриум Document, А4, синий',
    price: 160,
    image: '/images/pencil-cases/button2.jpg',
    subcategory: 'button',
    description: 'Вместительный пенал на кнопке формата А4 для хранения документов и канцелярских принадлежностей'
  },
  {
    id: 'pc5',
    name: 'Пенал текстильный Эквилибриум Floral, на молнии, розовый',
    price: 350,
    image: '/images/pencil-cases/textile1.jpg',
    subcategory: 'textile',
    description: 'Стильный текстильный пенал с цветочным принтом и одним отделением на молнии'
  },
  {
    id: 'pc6',
    name: 'Косметичка текстильная Эквилибриум Beauty, с ручкой, черная',
    price: 420,
    image: '/images/pencil-cases/textile2.jpg',
    subcategory: 'textile',
    description: 'Удобная текстильная косметичка с внутренними карманами и ручкой для переноски'
  },
  {
    id: 'pc7',
    name: 'Пенал квадро Эквилибриум Quadro, 4 отделения, серый',
    price: 550,
    image: '/images/pencil-cases/quadro1.jpg',
    subcategory: 'quadro',
    description: 'Вместительный пенал с четырьмя отдельными отделениями для удобной организации канцелярских принадлежностей'
  },
  {
    id: 'pc8',
    name: 'Пенал квадро Эквилибриум Space, 4 отделения, космический принт',
    price: 590,
    image: '/images/pencil-cases/quadro2.jpg',
    subcategory: 'quadro',
    description: 'Пенал с четырьмя отделениями и ярким космическим принтом'
  },
  {
    id: 'pc9',
    name: 'Пенал-футляр Эквилибриум Classic, металлический, серебристый',
    price: 480,
    image: '/images/pencil-cases/case1.jpg',
    subcategory: 'case',
    description: 'Классический металлический пенал-футляр для хранения ручек и карандашей'
  },
  {
    id: 'pc10',
    name: 'Пенал-футляр Эквилибриум Modern, пластиковый, прозрачный',
    price: 380,
    image: '/images/pencil-cases/case2.jpg',
    subcategory: 'case',
    description: 'Современный пенал-футляр из прочного прозрачного пластика'
  },
  {
    id: 'pc11',
    name: 'Пенал-органайзер Эквилибриум Organizer, настольный, черный',
    price: 620,
    image: '/images/pencil-cases/organizer1.jpg',
    subcategory: 'organizer',
    description: 'Удобный настольный пенал-органайзер с множеством отделений для хранения канцелярских принадлежностей'
  },
  {
    id: 'pc12',
    name: 'Пенал-органайзер Эквилибриум Office, вращающийся, серый',
    price: 750,
    image: '/images/pencil-cases/organizer2.jpg',
    subcategory: 'organizer',
    description: 'Вращающийся пенал-органайзер для рабочего стола с вертикальным расположением отделений'
  },
  {
    id: 'pc13',
    name: 'Пенал-конверт Эквилибриум Envelope, на молнии, синий',
    price: 280,
    image: '/images/pencil-cases/envelope1.jpg',
    subcategory: 'envelope',
    description: 'Плоский пенал в форме конверта на молнии, удобно помещается в сумке или рюкзаке'
  },
  {
    id: 'pc14',
    name: 'Пенал-конверт Эквилибриум Document, с отделениями, черный',
    price: 320,
    image: '/images/pencil-cases/envelope2.jpg',
    subcategory: 'envelope',
    description: 'Пенал-конверт с несколькими отделениями для организованного хранения канцелярских принадлежностей'
  },
  {
    id: 'pc15',
    name: 'Пенал-книжка Эквилибриум Book, раскладной, красный',
    price: 480,
    image: '/images/pencil-cases/book1.jpg',
    subcategory: 'book',
    description: 'Раскладной пенал-книжка с креплениями для карандашей, ручек и других принадлежностей'
  },
  {
    id: 'pc16',
    name: 'Пенал-книжка Эквилибриум School, двухсторонний, синий',
    price: 520,
    image: '/images/pencil-cases/book2.jpg',
    subcategory: 'book',
    description: 'Двусторонний пенал-книжка с отделениями для карандашей, ручек, ластика и точилки'
  }
];

// Подкатегории пеналов
const pencilCasesSubcategories = [
  { id: 'plastic', name: 'Пеналы пластиковые' },
  { id: 'button', name: 'Пеналы на кнопке' },
  { id: 'textile', name: 'Пеналы и косметички текстильные' },
  { id: 'quadro', name: 'Пеналы квадро' },
  { id: 'case', name: 'Пеналы-футляры' },
  { id: 'organizer', name: 'Пеналы-органайзеры' },
  { id: 'envelope', name: 'Пеналы-конверты' },
  { id: 'book', name: 'Пеналы-книжки' }
];

export default function PencilCasesPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'all', name: 'Все пеналы', count: 42 },
    { id: 'hard', name: 'Жесткие пеналы', count: 20 },
    { id: 'soft', name: 'Мягкие пеналы', count: 15 },
    { id: 'roll', name: 'Пеналы-рулоны', count: 7 }
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
        <h1 className="text-3xl font-bold text-gray-900">Пеналы</h1>
        <p className="text-gray-600 mt-2">Пеналы для хранения письменных принадлежностей</p>
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
                <span className="font-medium">Все пеналы</span>
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
            categorySlug="penals" 
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
} 