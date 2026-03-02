'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Обработка клавиатуры
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (images.length <= 1) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  // Обработка свайпов
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || images.length <= 1) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src="/images/tovar.PNG"
          alt={productName}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Главное изображение с кнопками листания */}
      <div 
        className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[currentImageIndex] || '/images/tovar.PNG'}
          alt={`${productName} - фото ${currentImageIndex + 1}`}
          fill
          className="object-contain"
        />
        
        {/* Кнопки листания */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Предыдущее изображение"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Следующее изображение"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Индикатор текущего изображения */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      
      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative h-24 bg-gray-100 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'ring-2 ring-blue-500 opacity-100' 
                  : 'hover:opacity-80 opacity-70'
              }`}
            >
              <Image
                src={image || '/images/tovar.PNG'}
                alt={`${productName} - фото ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
