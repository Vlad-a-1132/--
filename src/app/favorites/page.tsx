'use client';

import React from 'react';
import Link from 'next/link';
import { useShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const FavoritesPage = () => {
  const { favorites } = useShopContext();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Избранное</h1>
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">У вас пока нет избранных товаров</h2>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Избранное</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
            stock={1}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage; 