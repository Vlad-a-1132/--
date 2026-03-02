import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductGallery from './components/ProductGallery';
import ColorDisplay from './components/ColorDisplay';

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  sku: string;
  stock: number;
  specifications?: any;
  color?: string | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Получаем данные товара по slug
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, name: true }
      }
    }
  });

  if (!product) {
    notFound();
  }

  // Преобразуем Decimal в number
  const productData: ProductType = {
    ...product,
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - галерея с фото */}
        <div>
          <ProductGallery 
            images={productData.images} 
            productName={productData.name} 
          />
        </div>

        {/* Правая колонка - информация о товаре */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{productData.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-6">{productData.price} ₽</p>

          {/* Цвет товара */}
          {productData.color && <ColorDisplay color={productData.color} />}

          {/* Характеристики */}
          {productData.specifications && Object.keys(productData.specifications).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Характеристики</h2>
              <div className="space-y-2">
                {Object.entries(productData.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Описание */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание</h2>
            <p className="text-gray-600 whitespace-pre-line">{productData.description}</p>
          </div>

          {/* Кнопка добавления в корзину */}
          <button 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={productData.stock <= 0}
          >
            {productData.stock > 0 ? "Добавить в корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>
    </div>
  );
}
