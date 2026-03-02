"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  name: string;
  level: number;
  parentId?: string | null;
}

export default function NewCategoryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [level, setLevel] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories?admin=true');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Проверяем авторизацию
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
          <p>Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'ADMIN')) {
    router.replace('/admin/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          parentId: parentId || null,
          level: level,
        }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Произошла ошибка при создании категории');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/admin" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Добавить новую категорию</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Название категории *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите название категории"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите описание категории"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Уровень категории *
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => {
                const newLevel = parseInt(e.target.value);
                setLevel(newLevel);
                // Если выбран уровень 0, сбрасываем родительскую категорию
                if (newLevel === 0) {
                  setParentId('');
                }
              }}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Основная категория (уровень 0)</option>
              <option value={1}>Подкатегория (уровень 1)</option>
              <option value={2}>Подподкатегория (уровень 2)</option>
            </select>
          </div>

          <div>
            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-2">
              Родительская категория
            </label>
            <select
              id="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              disabled={level === 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{level === 0 ? 'Не требуется для основной категории' : 'Выберите родительскую категорию'}</option>
              {categories
                .filter(cat => cat.level === level - 1) // Показываем только категории предыдущего уровня
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {level === 0 && (
              <p className="text-sm text-gray-500 mt-1">Основная категория не имеет родителя</p>
            )}
            {level > 0 && !parentId && (
              <p className="text-sm text-gray-500 mt-1">Выберите родительскую категорию</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Создание...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Создать категорию
              </>
            )}
          </button>
          
          <Link href="/admin">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Отмена
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
