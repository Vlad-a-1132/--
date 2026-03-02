"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react';
import Link from 'next/link';
import { isAllowedMainCategory, getSubcategoriesForMain } from '@/lib/catalog-categories';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  level: number;
  parentId?: string;
  children?: Category[];
}

export default function NewProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    categoryId: '',
    subcategory: '',
    sku: '',
    stock: 1,
    color: '#000000',
    images: [] as string[],
    specifications: {} as { [key: string]: string },
    seoTitle: '',
    seoDescription: '',
    isActive: true,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories?admin=true');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          // Только категории каталога, без дубликатов по имени
          const mainCategoriesData = data
            .filter((cat: Category) => cat.level === 0 && isAllowedMainCategory(cat.name))
            .filter((cat: Category, idx: number, arr: Category[]) => arr.findIndex((c: Category) => c.name === cat.name) === idx);
          setMainCategories(mainCategoriesData);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Если изменилась основная категория (уровень 0), подкатегории по всем id с тем же именем (дубликаты в БД)
    if (name === 'subcategory') {
      const mainCat = categories.find((c: Category) => c.id === value);
      setSubcategories(mainCat ? getSubcategoriesForMain(mainCat.name, categories) : []);
      setFormData(prev => ({ ...prev, categoryId: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    const formData = new FormData();
    
    Array.from(e.target.files).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImages(prev => [...prev, ...data.urls]);
        setFormData(prev => ({ ...prev, images: [...prev.images, ...data.urls] }));
      } else {
        const error = await response.json();
        alert(`Ошибка загрузки: ${error.message}`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Ошибка при загрузке изображений');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addSpecification = () => {
    const key = prompt('Введите название характеристики:');
    if (!key) return;
    
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: ''
      }
    }));
  };

  const updateSpecification = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const { [key]: removed, ...rest } = prev.specifications;
      return {
        ...prev,
        specifications: rest
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Исправляем логику: categoryId должен быть из подкатегории (уровень 1), 
    // а subcategory из основной категории (уровень 0)
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      specifications: formData.specifications || {},
      stock: parseInt(formData.stock.toString()),
      color: formData.color || null,
      subsubcategory: null,
      // categoryId — категория товара (уровень 1), subcategory — основная категория (уровень 0)
      // subcategory остается как есть (это основная категория, например "Канцтовары")
    };

    // Проверяем, что categoryId выбран правильно
    if (!productData.categoryId) {
      alert('Пожалуйста, выберите категорию товара');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Произошла ошибка при создании товара');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/admin" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Добавить новый товар</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Название товара *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите название товара"
            />
          </div>

          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
              Основная категория *
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите основную категорию</option>
              {mainCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {isLoadingCategories && (
              <p className="text-sm text-gray-500 mt-1">Загрузка категорий...</p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Категория товара *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
              disabled={!formData.subcategory || subcategories.length === 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">{!formData.subcategory ? 'Сначала выберите основную категорию' : subcategories.length === 0 ? 'Нет доступных категорий товаров' : 'Выберите категорию товара'}</option>
              {subcategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {!formData.subcategory && (
              <p className="text-sm text-gray-500 mt-1">Сначала выберите основную категорию</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Цена *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Старая цена
            </label>
            <input
              type="number"
              id="oldPrice"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
              Артикул (SKU) *
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите артикул"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Количество на складе *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Цвет товара
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите описание товара"
          />
        </div>

        {/* SEO поля */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO настройки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                SEO заголовок
              </label>
              <input
                type="text"
                id="seoTitle"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="SEO заголовок для поисковых систем"
              />
            </div>

            <div>
              <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                SEO описание
              </label>
              <textarea
                id="seoDescription"
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="SEO описание для поисковых систем"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Эти поля используются для оптимизации страницы товара в поисковых системах. 
            Если не заполнены, будут использованы название и описание товара.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Характеристики
            </label>
            <button
              type="button"
              onClick={addSpecification}
              className="text-sm text-blue-600 hover:text-blue-700 px-2 py-1 rounded border border-blue-300 hover:border-blue-400"
            >
              + Добавить характеристику
            </button>
          </div>
          
          {Object.keys(formData.specifications).length === 0 ? (
            <p className="text-sm text-gray-500 italic">Характеристики не добавлены</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                    placeholder="Название характеристики"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateSpecification(key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Значение характеристики"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="px-3 py-2 text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-md"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Изображения товара
          </label>
          <div className="space-y-4">
            {/* Загрузка изображений */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {isUploading ? 'Загрузка...' : 'Нажмите для выбора изображений'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Поддерживаются форматы: JPG, PNG, GIF, WebP
                </span>
              </label>
            </div>

            {/* Предварительный просмотр загруженных изображений */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Изображение ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Товар активен
          </label>
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
                Создать товар
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