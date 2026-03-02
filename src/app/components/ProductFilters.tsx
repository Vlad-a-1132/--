'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
}

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    
    setSelectedCategory(categoryId);
    router.push(`/catalog?${params.toString()}`);
  };

  const handlePriceRangeChange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (range) {
      params.set('priceRange', range);
    } else {
      params.delete('priceRange');
    }
    
    setPriceRange(range);
    router.push(`/catalog?${params.toString()}`);
  };

  const priceRanges = [
    { label: 'До 100 ₽', value: '0-100' },
    { label: '100-500 ₽', value: '100-500' },
    { label: '500-1000 ₽', value: '500-1000' },
    { label: 'Более 1000 ₽', value: '1000-999999' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              !selectedCategory
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Все товары
          </button>
          {categories.map((category) => {
            const key =
              String(category._id ?? category.id ?? category.slug ?? category.name);
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  selectedCategory === key
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Цена</h3>
        <div className="space-y-2">
          <button
            onClick={() => handlePriceRangeChange('')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              !priceRange
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Все цены
          </button>
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handlePriceRangeChange(range.value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                priceRange === range.value
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 