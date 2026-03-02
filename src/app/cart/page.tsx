'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShopContext } from '../context/ShopContext';
import { Minus, Plus, Trash2, X } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal, clearCart } = useShopContext();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Фильтрация валидных элементов корзины
  const validCartItems = React.useMemo(() => {
    try {
      return cart.filter(item => 
        item && item.id && item.name && item.price > 0
      );
    } catch (error) {
      console.error('Error filtering cart items:', error);
      return [];
    }
  }, [cart]);

  const openCheckout = () => {
    setError('');
    setSuccess(false);
    setFio('');
    setPhone('');
    setEmail('');
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    if (!submitting) {
      setCheckoutOpen(false);
      setError('');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!fio.trim()) {
      setError('Укажите ФИО');
      return;
    }
    if (!phone.trim()) {
      setError('Укажите номер телефона');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fio: fio.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          items: validCartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartTotal,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Не удалось отправить заказ');
        return;
      }
      setSuccess(true);
      clearCart();
      setTimeout(() => {
        setCheckoutOpen(false);
        setSuccess(false);
      }, 3000);
    } catch {
      setError('Ошибка соединения. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  if (validCartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">Ваша корзина пуста</h2>
          <Link
            href="/catalog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {validCartItems.map((item) => {
              try {
                return (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      {item.image && item.image.trim() !== '' ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover rounded"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/tovar.PNG';
                          }}
                        />
                      ) : (
                        <Image
                          src="/images/tovar.PNG"
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover rounded"
                        />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600">{item.category || 'Общие канцтовары'}</p>
                      <p className="text-lg font-bold text-blue-600">{item.price} ₽</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-5 w-5 text-gray-600" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                );
              } catch (error) {
                console.error('Error rendering cart item:', error, item);
                return null;
              }
            }).filter(Boolean)}
          </div>
          
          <button
            onClick={clearCart}
            className="mt-4 text-red-600 hover:text-red-700 font-medium"
          >
            Очистить корзину
          </button>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Итого</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({validCartItems.length})</span>
                <span>{cartTotal} ₽</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого к оплате</span>
                  <span>{cartTotal} ₽</span>
                </div>
              </div>
            </div>
            <button
              onClick={openCheckout}
              className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно оформления заказа */}
      {checkoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeCheckout}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCheckout}
              disabled={submitting}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            {success ? (
              <div className="text-center py-4">
                <p className="text-lg font-medium text-gray-900">
                  Свяжемся с вами в ближайшее время
                </p>
                <p className="text-gray-600 mt-2 text-sm">
                  Ваш заказ принят. Мы перезвоним по указанному номеру телефона.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Оформление заказа</h2>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label htmlFor="checkout-fio" className="block text-sm font-medium text-gray-700 mb-1">
                      ФИО <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-fio"
                      type="text"
                      value={fio}
                      onChange={(e) => setFio(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Иванов Иван Иванович"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Номер телефона <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-gray-400 text-xs">(необязательно)</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="example@mail.ru"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Отправка...' : 'Отправить заказ'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 