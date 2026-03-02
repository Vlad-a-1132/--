"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '../../../components/ProductGrid';

// Статические slug'и из БД для этой ветки
const CATEGORY_SLUG = 'tetradi-predmetnye';
const SUBCATEGORIES = [
  { slug: 'tetradi-predmetnye-s-kartonnoy-oblozhkoy', name: 'Тетради предметные с картонной обложкой' },
  { slug: 'tetradi-predmetnye-s-plastikovoy-oblozhkoy', name: 'Тетради предметные с пластиковой обложкой' },
];

export default function SubjectNotebooksPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Тетради предметные</h1>
        <p className="text-gray-600 mt-2">Выберите подкатегорию, чтобы уточнить товары</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры и подкатегории */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Подкатегории</h3>
            <div className="space-y-2">
              <Link
                href="/catalog/paper/subject"
                className="block w-full text-left px-3 py-2 rounded-md transition-all duration-200 bg-blue-50 border-l-4 border-blue-500 shadow-sm"
              >
                <span className="font-medium">Все товары</span>
              </Link>
              {SUBCATEGORIES.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/catalog/paper/subject?subcategory=${subcategory.slug}`}
                  className="block w-full text-left px-3 py-2 rounded-md transition-all duration-200 hover:border-l-4 hover:border-blue-300"
                >
                  <span className="font-medium">{subcategory.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="w-full lg:w-3/4">
          <ProductGrid 
            categorySlug={CATEGORY_SLUG}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}
