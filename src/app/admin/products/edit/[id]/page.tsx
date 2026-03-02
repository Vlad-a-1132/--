"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Upload } from 'lucide-react';
import { isAllowedMainCategory, getSubcategoriesForMain } from '@/lib/catalog-categories';

interface Category {
  id: string;
  name: string;
  level: number;
  parentId?: string;
  children?: Category[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  categoryId: string;
  subcategory?: string;
  sku: string;
  stock: number;
  color?: string;
  isActive: boolean;
  specifications: { [key: string]: string };
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    oldPrice: undefined,
    images: [],
    categoryId: '',
    subcategory: '',
    sku: '',
    stock: 0,
    color: '#000000',
    isActive: true,
    specifications: {},
    seoTitle: '',
    seoDescription: '',
  });
  const [error, setError] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/admin/products/${resolvedParams.id}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        // Преобразуем данные для совместимости
        setProduct({
          ...data,
          categoryId: data.categoryId || data.category?.id || '',
          subcategory: data.subcategory || '',
          color: data.color || '#000000'
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Ошибка при загрузке товара');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories?admin=true');
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        setCategories(data);
        // Только категории каталога, без дубликатов по имени
        const mainCategoriesData = data
          .filter((cat: Category) => cat.level === 0 && isAllowedMainCategory(cat.name))
          .filter((cat: Category, idx: number, arr: Category[]) => arr.findIndex((c: Category) => c.name === cat.name) === idx);
        setMainCategories(mainCategoriesData);
        // Если у товара есть основная категория, подкатегории по всем id с тем же именем (дубликаты в БД)
        if (product.subcategory) {
          const mainCat = data.find((c: Category) => c.id === product.subcategory);
          if (mainCat) setSubcategories(getSubcategoriesForMain(mainCat.name, data));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Ошибка при загрузке категорий');
      }
    };

    fetchProduct();
    fetchCategories();
  }, [resolvedParams.id]);

  // Нормализация: если основная категория товара — дубликат (то же имя, другой id), подменяем на id из списка
  useEffect(() => {
    if (mainCategories.length === 0 || !product.subcategory) return;
    const inList = mainCategories.some((c: Category) => c.id === product.subcategory);
    if (inList) return;
    const currentMain = categories.find((c: Category) => c.id === product.subcategory);
    if (!currentMain || currentMain.level !== 0) return;
    const sameName = mainCategories.find((c: Category) => c.name === currentMain.name);
    if (sameName) setProduct((prev: Product) => ({ ...prev, subcategory: sameName.id }));
  }, [categories, mainCategories, product.subcategory]);

  // После загрузки товара и категорий — подставляем подкатегории по каталогу
  useEffect(() => {
    if (categories.length === 0 || !product.subcategory) return;
    const mainCat = categories.find((c: Category) => c.id === product.subcategory);
    if (mainCat) setSubcategories(getSubcategoriesForMain(mainCat.name, categories));
  }, [categories, product.subcategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/products/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          id: resolvedParams.id,
          subsubcategory: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Ошибка при сохранении товара');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Ошибка при загрузке изображений');
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const addSpecification = () => {
    const key = prompt('Введите название характеристики:');
    if (!key) return;

    handleSpecificationChange(key, '');
  };

  const removeSpecification = (key: string) => {
    setProduct((prev) => {
      const { [key]: removed, ...rest } = prev.specifications;
      return {
        ...prev,
        specifications: rest,
      };
    });
  };

  // Функция копирования товара
  const copyProduct = async () => {
    try {
      // Создаем копию товара с новым названием и SKU
      const copyData = {
        ...product,
        name: `${product.name} (копия)`,
        sku: `${product.sku}_COPY_${Date.now()}`,
        slug: `${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}-copy-${Date.now()}`
      };

      const copyResponse = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(copyData),
      });

      if (copyResponse.ok) {
        alert('Товар успешно скопирован!');
        // Перенаправляем на главную страницу админки
        router.push('/admin');
      } else {
        const error = await copyResponse.json();
        alert(`Ошибка при копировании: ${error.message}`);
      }
    } catch (error) {
      console.error('Error copying product:', error);
      alert('Произошла ошибка при копировании товара');
    }
  };

  // Функция удаления товара
  const deleteProduct = async () => {
    if (!confirm(`Вы уверены, что хотите удалить товар "${product.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Товар успешно удален!');
        // Перенаправляем на главную страницу админки
        router.push('/admin');
      } else {
        const error = await response.json();
        alert(`Ошибка при удалении: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Произошла ошибка при удалении товара');
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
        <h1 className="text-2xl font-semibold text-gray-800">Редактирование товара</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => copyProduct()}
            className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-150"
          >
            Копировать
          </button>
          <button
            type="button"
            onClick={() => deleteProduct()}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
          >
            Удалить
          </button>
        </div>
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
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* SEO поля */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO настройки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO заголовок
                </label>
                <input
                  type="text"
                  value={product.seoTitle || ''}
                  onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SEO заголовок для поисковых систем"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SEO описание
                </label>
                <textarea
                  value={product.seoDescription || ''}
                  onChange={(e) => setProduct({ ...product, seoDescription: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SEO описание для поисковых систем"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Эти поля используются для оптимизации страницы товара в поисковых системах. 
              Если не заполнены, будут использованы название и описание товара.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Цена
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                min="0"
                step="0.01"
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Старая цена
              </label>
              <input
                type="number"
                value={product.oldPrice || ''}
                onChange={(e) => setProduct({ ...product, oldPrice: Number(e.target.value) || undefined })}
                min="0"
                step="0.01"
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Артикул
              </label>
              <input
                type="text"
                value={product.sku}
                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Количество на складе
              </label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                min="0"
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Основная категория
            </label>
            <select
              value={product.subcategory}
              onChange={(e) => {
                const mainCat = categories.find((c: Category) => c.id === e.target.value);
                setSubcategories(mainCat ? getSubcategoriesForMain(mainCat.name, categories) : []);
                setProduct({ ...product, subcategory: e.target.value, categoryId: '' });
              }}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Выберите основную категорию</option>
              {mainCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Категория товара
            </label>
            <select
              value={product.categoryId}
              onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
              disabled={!product.subcategory || subcategories.length === 0}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{!product.subcategory ? 'Сначала выберите основную категорию' : subcategories.length === 0 ? 'Нет доступных категорий товаров' : 'Выберите категорию товара'}</option>
              {subcategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Цвет
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="color"
                value={product.color}
                onChange={(e) => setProduct({ ...product, color: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={product.color}
                onChange={(e) => setProduct({ ...product, color: e.target.value })}
                placeholder="#000000"
                className="flex-1 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Статус
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={product.isActive}
                  onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2">Активен</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Изображения
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setProduct({
                      ...product,
                      images: product.images.filter((_, i) => i !== index),
                    })}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-gray-400" />
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Характеристики
              </label>
              <button
                type="button"
                onClick={addSpecification}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Добавить характеристику
              </button>
            </div>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="flex-1 border rounded-md shadow-sm py-2 px-3 bg-gray-50"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="flex-1 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
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