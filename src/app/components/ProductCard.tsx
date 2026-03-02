'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

// Функция для получения CSS цвета по названию
const getColorValue = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    // Основные цвета
    'красный': '#ef4444',
    'синий': '#3b82f6',
    'зеленый': '#10b981',
    'желтый': '#f59e0b',
    'оранжевый': '#f97316',
    'фиолетовый': '#8b5cf6',
    'розовый': '#ec4899',
    'коричневый': '#a16207',
    'черный': '#000000',
    'белый': '#ffffff',
    'серый': '#6b7280',
    
    // Дополнительные цвета
    'голубой': '#06b6d4',
    'салатовый': '#84cc16',
    'малиновый': '#dc2626',
    'бирюзовый': '#14b8a6',
    'золотой': '#fbbf24',
    'серебряный': '#9ca3af',
    
    // Вариации цветов
    'темно-красный': '#dc2626',
    'светло-красный': '#fca5a5',
    'темно-синий': '#1e40af',
    'светло-синий': '#93c5fd',
    'темно-зеленый': '#059669',
    'светло-зеленый': '#86efac',
    'темно-желтый': '#d97706',
    'светло-желтый': '#fde047',
    'темно-оранжевый': '#ea580c',
    'светло-оранжевый': '#fdba74',
    'темно-фиолетовый': '#7c3aed',
    'светло-фиолетовый': '#c4b5fd',
    'темно-розовый': '#be185d',
    'светло-розовый': '#f9a8d4',
    'темно-коричневый': '#92400e',
    'светло-коричневый': '#d97706',
    
    // Металлические цвета
    'бронзовый': '#cd7f32',
    'медный': '#b87333',
    'платиновый': '#e5e4e2',
    'никелевый': '#727472',
    
    // Пастельные цвета
    'пастельно-розовый': '#fce7f3',
    'пастельно-голубой': '#e0f2fe',
    'пастельно-желтый': '#fefce8',
    'пастельно-зеленый': '#f0fdf4',
    'пастельно-фиолетовый': '#faf5ff',
    
    // Неоновые цвета
    'неоново-розовый': '#ff1493',
    'неоново-зеленый': '#39ff14',
    'неоново-синий': '#00bfff',
    'неоново-желтый': '#ffff00',
    'неоново-оранжевый': '#ff4500'
  };
  
  // Очищаем название цвета от лишних символов
  const cleanColorName = colorName.toLowerCase().trim();
  
  // Проверяем, есть ли цвет в нашей карте
  if (colorMap[cleanColorName]) {
    return colorMap[cleanColorName];
  }
  
  // Если цвет не найден, пытаемся угадать по ключевым словам
  for (const [key, value] of Object.entries(colorMap)) {
    if (cleanColorName.includes(key) || key.includes(cleanColorName)) {
      return value;
    }
  }
  
  // Если ничего не найдено, возвращаем случайный цвет из палитры
  const fallbackColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#f97316', '#8b5cf6', '#ec4899'];
  return fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
};

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  slug: string;
  color?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  images,
  category,
  stock,
  slug,
  color
}: ProductCardProps) {
  const { addToCart, addToFavorites, favorites, cart } = useShopContext();
  const isFavorite = favorites.some(fav => fav.id === id);
  const isInCart = cart.some(item => item.id === id);
  const cartItem = cart.find(item => item.id === id);
  
  // Состояние для текущего изображения
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Получаем все доступные изображения
  const allImages = images && images.length > 0 ? images : [image];
  const currentImage = allImages[currentImageIndex];
  
  // Функции для листания изображений
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev: number) => (prev + 1) % allImages.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev: number) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Обработка свайпов для мобильных устройств
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || allImages.length <= 1) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image: image || '/images/tovar.PNG',
      category,
      slug
    });
  };

  const handleToggleFavorite = () => {
    addToFavorites({
      id,
      name,
      price,
      image: image || '/images/tovar.PNG',
      category,
      slug
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[400px] sm:min-h-[520px] flex flex-col product-card-hover">
      <div 
        className="relative h-64 sm:h-80 w-full group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {currentImage && currentImage.startsWith('/uploads/') ? (
          <img
            src={currentImage}
            alt={name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/tovar.PNG';
            }}
          />
        ) : (
          <Image
            src={currentImage || '/images/tovar.PNG'}
            alt={name}
            fill
            className="object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/tovar.PNG';
            }}
          />
        )}
        
        {/* Кнопки листания изображений */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Предыдущее изображение"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Следующее изображение"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Индикаторы изображений */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Индикатор "в корзине" */}
        {isInCart && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            В корзине
          </div>
        )}
        
        {/* Ссылка на страницу товара */}
        <Link href={`/product/${slug}`} className="absolute inset-0 z-10" />
      </div>

      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1 sm:mb-2">
          <Link href={`/product/${slug}`} className="flex-1">
            <h3 className="text-sm sm:text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <button
            onClick={handleToggleFavorite}
            className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors btn-hover"
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-1 sm:mb-2">{category}</p>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            Остаток: {stock}
          </span>
        </div>

        {/* Цветовые кружки */}
        {color && (
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-gray-500">Цвет:</span>
            <div className="flex space-x-1">
              {color.split(',').map((colorName, index) => {
                const colorValue = getColorValue(colorName.trim());
                const isLightColor = colorValue === '#ffffff' || colorValue === '#fefce8' || colorValue === '#f0fdf4' || colorValue === '#faf5ff' || colorValue === '#e0f2fe' || colorValue === '#fce7f3';
                
                return (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center shadow-sm"
                    title={colorName.trim()}
                  >
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: colorValue,
                        border: isLightColor ? '1px solid #d1d5db' : 'none',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors mt-1 sm:mt-auto btn-hover ${
            isInCart
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isInCart ? `В корзине (${cartItem?.quantity || 1})` : 'Добавить в корзину'}
        </button>
      </div>
    </div>
  );
} 