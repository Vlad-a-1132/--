"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: {
    _id: string;
    name: string;
  };
  order: number;
  isActive: boolean;
  productsCount?: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/categories');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Ошибка при загрузке категорий');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;

    try {
      const response = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Ошибка при удалении категории');
    }
  };

  // Change category order
  const handleChangeOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = categories.findIndex(c => c._id === id);
    if (currentIndex === -1) return;

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= categories.length) return;

    try {
      const response = await fetch('/api/admin/categories/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: id,
          direction,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Swap categories locally
      [newCategories[currentIndex], newCategories[targetIndex]] = 
      [newCategories[targetIndex], newCategories[currentIndex]];
      
      setCategories(newCategories);
    } catch (error) {
      console.error('Error reordering categories:', error);
      setError('Ошибка при изменении порядка категорий');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Управление категориями</h1>
        <Link href="/admin/categories/new">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-4 h-4 mr-2" />
            Добавить категорию
          </button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Родительская категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Товаров
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Порядок
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Категории не найдены
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {category.parent?.name || '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {category.productsCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.isActive ? 'Активна' : 'Неактивна'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleChangeOrder(category._id, 'up')}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleChangeOrder(category._id, 'down')}
                        disabled={index === categories.length - 1}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => router.push(`/admin/categories/edit/${category._id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 