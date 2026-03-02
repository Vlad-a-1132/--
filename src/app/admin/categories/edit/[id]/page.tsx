"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Upload } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  order: number;
  isActive: boolean;
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    _id: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    parent: undefined,
    order: 0,
    isActive: true,
  });
  const [error, setError] = useState('');

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/admin/categories/${params.id}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        setCategory(data);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Ошибка при загрузке категории');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        // Filter out current category and its children
        const filteredCategories = data.filter((c: Category) => c._id !== params.id);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Ошибка при загрузке категорий');
      }
    };

    fetchCategory();
    fetchCategories();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          ...category,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      router.push('/admin/categories');
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Ошибка при сохранении категории');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setCategory((prev) => ({
        ...prev,
        image: data.url,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Ошибка при загрузке изображения');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Редактирование категории</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Название
            </label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL slug
            </label>
            <input
              type="text"
              value={category.slug}
              onChange={(e) => setCategory({ ...category, slug: e.target.value })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Родительская категория
            </label>
            <select
              value={category.parent || ''}
              onChange={(e) => setCategory({ ...category, parent: e.target.value || undefined })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Нет родительской категории</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Изображение
            </label>
            <div className="mt-2 flex items-center space-x-4">
              {category.image ? (
                <div className="relative group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setCategory({ ...category, image: '' })}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Выбрать изображение
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Порядок
            </label>
            <input
              type="number"
              value={category.order}
              onChange={(e) => setCategory({ ...category, order: Number(e.target.value) })}
              min="0"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Статус
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={category.isActive}
                  onChange={(e) => setCategory({ ...category, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Активна</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Сохранить
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 