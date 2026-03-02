"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';

// Интерфейс для подкатегории
interface Subcategory {
  id: string;
  name: string;
}

// Интерфейс для продукта
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
  description: string;
  category?: string;
  stock?: number;
  slug: string;
}

// Интерфейс для пропсов компонента
interface CategoryPageProps {
  categoryName: string;           // Название категории
  subcategories: Subcategory[];   // Список подкатегорий
  products: Product[];            // Список товаров
  categoryPath: string;           // Путь к странице категории
}

export default function CategoryPage({ 
  categoryName, 
  subcategories, 
  products, 
  categoryPath 
}: CategoryPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSubcategory = searchParams.get('subcategory') || 'all';

  // Функция для изменения подкатегории
  const handleSubcategoryChange = (subcategoryId: string) => {
    if (subcategoryId === 'all') {
      router.push(`/catalog/${categoryPath}`);
    } else {
      router.push(`/catalog/${categoryPath}?subcategory=${subcategoryId}`);
    }
  };

  // Фильтрация товаров по подкатегории
  const filteredProducts = currentSubcategory === 'all' 
    ? products 
    : products.filter(product => product.subcategory === currentSubcategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Навигация и кнопка назад */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link 
            href="/catalog" 
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center group"
          >
            <svg 
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Каталог
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
        </div>
        
        <Link
          href="/catalog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7-7m7 7l-7 7" />
          </svg>
          Назад к каталогу
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры подкатегорий */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Типы {categoryName.toLowerCase()}</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSubcategoryChange('all')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  currentSubcategory === 'all'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>Все {categoryName.toLowerCase()}</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    {products.length}
                  </span>
                </div>
              </button>
              {subcategories.map((subcategory) => {
                const productCount = products.filter(product => product.subcategory === subcategory.id).length;
                return (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                      currentSubcategory === subcategory.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{subcategory.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentSubcategory === subcategory.id
                          ? 'bg-blue-200 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {productCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Сетка товаров */}
        <div className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category || 'Ручки'}
                    stock={product.stock || 1}
                    slug={product.slug}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-bounce mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Товары не найдены</h3>
              <p className="mt-2 text-sm text-gray-500">
                Попробуйте выбрать другую категорию
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 