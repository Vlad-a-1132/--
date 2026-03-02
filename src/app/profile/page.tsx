"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, User, Mail, Shield, Edit, LogOut, Save, X, Lock, Eye, EyeOff, Phone, Package, Clock, MapPin, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' или 'orders'
  
  // Состояние для смены пароля
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Моковые данные заказов (в реальном приложении будут загружаться с сервера)
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      date: '2025-01-20',
      status: 'delivered',
      total: 1250.00,
      items: [
        { name: 'Ручка шариковая синяя', quantity: 2, price: 25.00 },
        { name: 'Тетрадь А5, 48 листов', quantity: 1, price: 1200.00 }
      ],
      deliveryAddress: 'г. Москва, ул. Примерная, д. 123, кв. 45',
      paymentMethod: 'Карта'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      date: '2025-01-18',
      status: 'processing',
      total: 850.00,
      items: [
        { name: 'Карандаш чернографитный', quantity: 5, price: 15.00 },
        { name: 'Ластик', quantity: 2, price: 25.00 },
        { name: 'Линейка 20см', quantity: 1, price: 750.00 }
      ],
      deliveryAddress: 'г. Москва, ул. Примерная, д. 123, кв. 45',
      paymentMethod: 'Наличные'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      date: '2025-01-15',
      status: 'shipped',
      total: 2100.00,
      items: [
        { name: 'Пенал пластиковый', quantity: 1, price: 500.00 },
        { name: 'Набор цветных карандашей', quantity: 1, price: 1600.00 }
      ],
      deliveryAddress: 'г. Москва, ул. Примерная, д. 123, кв. 45',
      paymentMethod: 'Карта'
    }
  ];

  // Используем useEffect для редиректа вместо прямого вызова router.push
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Показываем загрузку, пока проверяется сессия
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Если пользователь не авторизован, показываем загрузку (редирект произойдет в useEffect)
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleEdit = () => {
    setEditName(session?.user?.name || '');
    setEditEmail(session?.user?.email || '');
    // Для обычных пользователей не показываем предзаполненный телефон
    setEditPhone(session?.user?.role === 'ADMIN' ? '+7 (999) 123-45-67' : '');
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    if (!editName.trim() || !editEmail.trim()) {
      setError('Имя и email обязательны для заполнения');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName.trim(),
          email: editEmail.trim().toLowerCase(),
          phone: editPhone.trim() || null, // Телефон может быть пустым
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка обновления профиля');
      }

      setSuccess('Профиль успешно обновлен!');
      setIsEditing(false);
      
      // Обновляем сессию
      await update({
        name: editName.trim(),
        email: editEmail.trim().toLowerCase(),
      });
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    if (newPassword.length < 6) {
      setError('Новый пароль должен содержать минимум 6 символов');
      return;
    }

    setIsChangingPassword(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/profile/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка смены пароля');
      }

      setSuccess('Пароль успешно изменен!');
      setShowPasswordChange(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при смене пароля');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Доставлен';
      case 'shipped':
        return 'Отправлен';
      case 'processing':
        return 'В обработке';
      default:
        return 'Неизвестно';
    }
  };

  // Функция для отображения значения поля
  const getFieldValue = (fieldName: string, defaultValue: string | null | undefined) => {
    if (session?.user?.role === 'ADMIN') {
      return defaultValue || '';
    }
    // Для обычных пользователей показываем "Не заполнено" если поле пустое
    return defaultValue || 'Не заполнено';
  };

  // Функция для определения цвета текста "Не заполнено"
  const getEmptyFieldColor = (value: string | null | undefined) => {
    if (session?.user?.role === 'ADMIN') {
      return 'text-gray-900';
    }
    return value ? 'text-gray-900' : 'text-gray-600 italic';
  };

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={50}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Личный кабинет
          </h1>
        </div>

        {/* Навигация по вкладкам */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5 inline mr-2" />
              Профиль
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5 inline mr-2" />
              Ваши заказы
            </button>
          </div>
        </div>

        {/* Секция профиля */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">
                      {session?.user?.name}
                    </h2>
                    <p className="text-blue-100">
                      {session?.user?.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя и фамилия
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Введите имя и фамилию"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className={`text-lg ${getEmptyFieldColor(session?.user?.name)}`}>
                        {getFieldValue('name', session?.user?.name)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Введите email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className={`text-lg ${getEmptyFieldColor(session?.user?.email)}`}>
                        {getFieldValue('email', session?.user?.email)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Номер телефона
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    ) : (
                      <p className={`text-lg ${getEmptyFieldColor(editPhone)}`}>
                        {getFieldValue('phone', editPhone)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Роль
                    </label>
                    <p className="text-lg text-gray-900 capitalize">
                      {session?.user?.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                    </p>
                  </div>
                </div>

                {/* Кнопка смены пароля */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Lock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Пароль
                    </label>
                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showPasswordChange ? 'Скрыть форму смены пароля' : 'Сменить пароль'}
                    </button>
                  </div>
                </div>

                {/* Форма смены пароля */}
                {showPasswordChange && (
                  <div className="ml-14 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Текущий пароль
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Новый пароль
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Подтвердите новый пароль
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={isChangingPassword}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Смена пароля...
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Сменить пароль
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordChange(false);
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmNewPassword('');
                            setError('');
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Отмена
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Кнопки редактирования */}
              {isEditing && (
                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
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
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Отмена
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Секция заказов */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {mockOrders.length === 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">У вас пока нет заказов</h3>
                <p className="text-gray-600">Сделайте свой первый заказ в нашем магазине!</p>
              </div>
            ) : (
              mockOrders.map((order) => (
                <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Заказ {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(order.date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {order.total.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Товары в заказе */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Товары в заказе:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                Количество: {item.quantity} шт.
                              </p>
                            </div>
                            <p className="font-medium text-gray-900">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Информация о доставке и оплате */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                          <h5 className="font-medium text-gray-900">Адрес доставки</h5>
                        </div>
                        <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                          <h5 className="font-medium text-gray-900">Способ оплаты</h5>
                        </div>
                        <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Дополнительная информация */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Дополнительная информация
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Безопасность</h4>
                <p className="text-sm text-gray-600">
                  Ваш аккаунт защищен современными методами шифрования и двухфакторной аутентификацией.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Поддержка</h4>
                <p className="text-sm text-gray-600">
                  Если у вас возникли вопросы, обратитесь в службу поддержки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 