"use client";

import React, { useEffect, useState } from 'react';
import { Package, ShoppingBag, Tag, Layers, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Тип для статистики
interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  recentProducts: any[];
  isLoading: boolean;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    recentProducts: [],
    isLoading: true
  });

  // Проверяем авторизацию и перенаправляем если нужно
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.replace('/admin/login');
      return;
    }
    
    if (session.user?.role !== 'admin' && session.user?.role !== 'ADMIN') {
      router.replace('/');
      return;
    }
  }, [session, status, router]);

  // Загружаем статистику
  useEffect(() => {
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'ADMIN')) {
      return;
    }

    const fetchStats = async () => {
      try {
        // Загружаем реальные данные
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/categories?admin=true')
        ]);

        if (productsResponse.ok && categoriesResponse.ok) {
          const productsData = await productsResponse.json();
          const categoriesData = await categoriesResponse.json();

          // Получаем последние 5 товаров
          const recentProducts = productsData.products.slice(0, 5).map((product: any) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            category: product.category?.name || 'Без категории',
            image: product.images && product.images.length > 0 ? product.images[0] : '/images/tovar.PNG',
            createdAt: product.createdAt
          }));

          setStats({
            totalProducts: productsData.pagination?.total || 0,
            totalCategories: categoriesData.length || 0,
            recentProducts,
            isLoading: false
          });
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, [session]);

  // Функция для принудительного обновления данных
  const refreshStats = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories?admin=true')
      ]);

      if (productsResponse.ok && categoriesResponse.ok) {
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        const recentProducts = productsData.products.slice(0, 5).map((product: any) => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          category: product.category?.name || 'Без категории',
          image: product.images && product.images.length > 0 ? product.images[0] : '/images/tovar.PNG',
          createdAt: product.createdAt
        }));

        setStats({
          totalProducts: productsData.pagination?.total || 0,
          totalCategories: categoriesData.length || 0,
          recentProducts,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  // Функция копирования товара
  const copyProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      if (response.ok) {
        const product = await response.json();
        
        // Создаем копию товара с новым названием и SKU
        const copyData = {
          ...product,
          name: `${product.name} (копия)`,
          sku: `${product.sku}_COPY_${Date.now()}`,
          slug: `${product.slug}-copy-${Date.now()}`
        };

        const copyResponse = await fetch('/api/admin/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(copyData),
        });

        if (copyResponse.ok) {
          const newProduct = await copyResponse.json();
          alert('Товар успешно скопирован!');
          // Принудительно обновляем данные
          await refreshStats();
        } else {
          const error = await copyResponse.json();
          alert(`Ошибка при копировании: ${error.message}`);
        }
      } else {
        alert('Ошибка при получении данных товара');
      }
    } catch (error) {
      console.error('Error copying product:', error);
      alert('Произошла ошибка при копировании товара');
    }
  };

  // Функция удаления товара
  const deleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Вы уверены, что хотите удалить товар "${productName}"?`)) {
      return;
    }

    try {
      console.log('Attempting to delete product:', productId, productName);
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Delete response:', result);
        
        alert('Товар успешно удален!');
        // Принудительно обновляем данные
        await refreshStats();
      } else {
        const error = await response.json();
        console.error('Delete error:', error);
        alert(`Ошибка при удалении: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Произошла ошибка при удалении товара');
    }
  };

  // Определяем, что показывать
  const isLoading = status === 'loading';
  const isAuthenticated = session && (session.user?.role === 'admin' || session.user?.role === 'ADMIN');

  // Карточка со статистикой
  const StatCard = ({ title, value, icon, bgColor }: { title: string; value: number; icon: React.ReactNode; bgColor: string }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
      <div className="flex items-center">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Показываем загрузку или содержимое
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Заголовок и кнопки */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Панель управления</h1>
            <p className="mt-3 text-lg text-gray-600">Добро пожаловать в административную панель</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/admin/products/new">
              <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold hover:shadow-md" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                + Добавить товар
              </button>
            </Link>
            <Link href="/admin/categories/new">
              <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold hover:shadow-md" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                + Добавить категорию
              </button>
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-semibold hover:shadow-md flex items-center justify-center gap-2" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>

        {/* Статистика */}
        {stats.isLoading ? (
          <div className="flex justify-center my-12">
            <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Карточки статистики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Всего товаров" 
                value={stats.totalProducts} 
                icon={<Package className="h-6 w-6 text-white" />}
                bgColor="bg-blue-500"
              />
              <StatCard 
                title="Категории" 
                value={stats.totalCategories} 
                icon={<Tag className="h-6 w-6 text-white" />}
                bgColor="bg-green-500"
              />
              <StatCard 
                title="Заказы" 
                value={0} 
                icon={<ShoppingBag className="h-6 w-6 text-white" />}
                bgColor="bg-yellow-500"
              />
              <StatCard 
                title="Всего SKU" 
                value={stats.totalProducts} 
                icon={<Layers className="h-6 w-6 text-white" />}
                bgColor="bg-purple-500"
              />
            </div>

            {/* Последние товары */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Последние добавленные товары</h2>
                <p className="mt-1 text-sm text-gray-600">Недавно добавленные товары в систему</p>
              </div>
              <div className="divide-y divide-gray-100">
                {stats.recentProducts.length > 0 ? (
                  stats.recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/tovar.PNG';
                          }}
                        />
                      </div>
                      <div className="ml-5 flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 truncate">{product.name}</h3>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                          <span className="mx-3 text-gray-400">•</span>
                          <span className="font-semibold text-gray-900">{product.price} ₽</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex gap-2">
                        <Link 
                          href={`/admin/products/edit/${product.id}`}
                          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150"
                        >
                          Изменить
                        </Link>
                        <button 
                          onClick={() => copyProduct(product.id)}
                          className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-150"
                        >
                          Копировать
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id, product.name)}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Package className="h-12 w-12" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Нет добавленных товаров</h3>
                    <p className="mt-2 text-gray-500">Начните с добавления первого товара</p>
                    <div className="mt-6">
                      <Link href="/admin/products/new">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Добавить товар
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 