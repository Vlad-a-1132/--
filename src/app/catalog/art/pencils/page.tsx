"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ProductGrid from '../../../components/ProductGrid';

export default function ColoredPencilsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'jumbo', name: 'Цветные карандаши утолщенные Джамбо', description: 'Толстые карандаши для маленьких детей' },
    { id: 'colored', name: 'Цветные карандаши', description: 'Классические цветные карандаши' },
    { id: 'watercolor', name: 'Цветные карандаши акварельные', description: 'Карандаши с эффектом акварели' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Навигация */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <Link href="/catalog?category=art" className="hover:text-blue-600 transition-colors">
            Товары для творчества
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Цветные карандаши</span>
        </nav>

        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Цветные карандаши</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Яркие и качественные цветные карандаши для рисования и раскрашивания. 
            От утолщенных карандашей для малышей до профессиональных акварельных карандашей.
          </p>
        </div>

        {/* Фильтр подкатегорий */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Выберите тип карандашей</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSubcategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Все цветные карандаши
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => setSelectedSubcategory(subcategory.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSubcategory === subcategory.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>

        {/* Счетчик товаров */}
        <div className="mb-6">
          <p className="text-gray-600">
            {selectedSubcategory 
              ? `Показаны карандаши: ${subcategories.find(s => s.id === selectedSubcategory)?.name}`
              : 'Показаны все цветные карандаши'
            }
          </p>
        </div>

        {/* Сетка товаров */}
        <div className="w-full">
          <ProductGrid 
            category="art" 
            subcategory={selectedSubcategory} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
