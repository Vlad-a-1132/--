"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

// Определение типа для товара
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

// Определение типа для элемента корзины
export interface CartItem extends Product {
  quantity: number;
}

// Интерфейс контекста
interface ShopContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isInFavorites: (productId: string) => boolean;
  cartItemsCount: number;
  cartTotal: number;
  clearCart: () => void;
  cleanupInvalidCartItems: () => void;
  clearOldData: () => void;
}

// Создание контекста
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Провайдер контекста
export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Состояние для корзины и избранного
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Функция валидации и исправления элемента корзины
  const validateCartItem = (item: any): CartItem => {
    return {
      id: item.id || '',
      name: item.name || 'Неизвестный товар',
      price: typeof item.price === 'number' && item.price > 0 ? item.price : 0,
      image: item.image && item.image.trim() !== '' ? item.image : '/images/tovar.PNG',
      category: item.category && item.category.trim() !== '' ? item.category : 'Общие канцтовары',
      slug: item.slug || item.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-product',
      quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1
    };
  };

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Проверяем, есть ли товары без slug
        const hasItemsWithoutSlug = parsedCart.some((item: any) => !item.slug);
        
        if (hasItemsWithoutSlug) {
          console.warn('Found cart items without slug, clearing old data');
          localStorage.removeItem('cart');
          setCart([]);
        } else {
          // Валидация и исправление элементов корзины
          const validCart = parsedCart
            .filter((item: any) => item && item.id && item.name && item.price > 0)
            .map(validateCartItem);
          
          if (validCart.length !== parsedCart.length) {
            console.warn('Cleaned up invalid cart items on load');
            localStorage.setItem('cart', JSON.stringify(validCart));
          }
          setCart(validCart);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
        setCart([]);
      }
    }
    
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        
        // Проверяем, есть ли товары без slug
        const hasItemsWithoutSlug = parsedFavorites.some((item: any) => !item.slug);
        
        if (hasItemsWithoutSlug) {
          console.warn('Found favorites without slug, clearing old data');
          localStorage.removeItem('favorites');
          setFavorites([]);
        } else {
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem('favorites');
        setFavorites([]);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Сохранение данных в localStorage при изменении (только после инициализации)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [cart, favorites, isInitialized]);

  // Пересчет общей суммы и количества товаров в корзине
  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Функция добавления товара в корзину
  const addToCart = (product: Product) => {
    // Создаем копию товара для валидации
    const validatedProduct = { ...product };
    
    // Валидация данных товара
    if (!validatedProduct.image || validatedProduct.image.trim() === '') {
      console.warn('Product added to cart without image:', validatedProduct);
      // Используем fallback изображение
      validatedProduct.image = '/images/tovar.PNG';
    }
    if (!validatedProduct.category || validatedProduct.category.trim() === '') {
      console.warn('Product added to cart without category:', validatedProduct);
      // Используем fallback категорию
      validatedProduct.category = 'Общие канцтовары';
    }
    
    // Проверяем slug
    if (!validatedProduct.slug || validatedProduct.slug.trim() === '') {
      console.error('Product added to cart without slug:', validatedProduct);
      // Генерируем slug из названия
      validatedProduct.slug = validatedProduct.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-product';
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === validatedProduct.id);
      
      if (existingItem) {
        // Если товар уже в корзине, увеличиваем количество
        return prevCart.map(item => 
          item.id === validatedProduct.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Если товара нет в корзине, добавляем его
        return [...prevCart, { ...validatedProduct, quantity: 1 }];
      }
    });
  };

  // Функция удаления товара из корзины
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Функция обновления количества товара в корзине
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Функция очистки корзины
  const clearCart = () => {
    setCart([]);
  };

  // Функция очистки невалидных элементов корзины
  const cleanupInvalidCartItems = useCallback(() => {
    setCart(prevCart => {
      const validItems = prevCart
        .filter(item => item && item.id && item.name && item.price > 0)
        .map(validateCartItem);
      
      if (validItems.length !== prevCart.length) {
        console.warn('Cleaned up invalid cart items');
        return validItems;
      }
      
      // Если нет изменений, возвращаем тот же массив для предотвращения лишних рендеров
      return prevCart;
    });
  }, []);

  // Функция для очистки старых данных из localStorage
  const clearOldData = useCallback(() => {
    console.log('Clearing old data from localStorage...');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    setCart([]);
    setFavorites([]);
    console.log('Old data cleared');
  }, []);

  // Функция добавления товара в избранное
  const addToFavorites = (product: Product) => {
    // Создаем копию товара для валидации
    const validatedProduct = { ...product };
    
    // Валидация данных товара
    if (!validatedProduct.image || validatedProduct.image.trim() === '') {
      validatedProduct.image = '/images/tovar.PNG';
    }
    if (!validatedProduct.category || validatedProduct.category.trim() === '') {
      validatedProduct.category = 'Общие канцтовары';
    }
    
    // Проверяем slug
    if (!validatedProduct.slug || validatedProduct.slug.trim() === '') {
      console.error('Product added to favorites without slug:', validatedProduct);
      // Генерируем slug из названия
      validatedProduct.slug = validatedProduct.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-product';
    }
    
    setFavorites(prevFavorites => {
      const existingFavorite = prevFavorites.find(fav => fav.id === validatedProduct.id);
      
      if (existingFavorite) {
        // Если товар уже в избранном, убираем его
        return prevFavorites.filter(fav => fav.id !== validatedProduct.id);
      } else {
        // Если товара нет в избранном, добавляем его
        return [...prevFavorites, validatedProduct];
      }
    });
  };

  // Функция удаления товара из избранного
  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
  };

  // Проверка, находится ли товар в избранном
  const isInFavorites = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  // Значение контекста
  const value = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    cartItemsCount,
    cartTotal,
    clearCart,
    cleanupInvalidCartItems,
    clearOldData,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

// Хук для использования контекста
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShopContext must be used within a ShopProvider');
  }
  return context;
}; 