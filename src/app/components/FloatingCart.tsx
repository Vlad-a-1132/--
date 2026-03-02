'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

export default function FloatingCart() {
  const { cartItemsCount } = useShopContext();

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors hover:scale-110 floating-cart-button"
      title="Корзина"
    >
      <ShoppingCart className="h-7 w-7" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
}
