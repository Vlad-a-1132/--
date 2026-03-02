"use client";

import React from 'react';
import CategoryPage from '../../components/CategoryPage';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 't1',
    name: 'Клейкая лента Эквилибриум Standard, прозрачная, 19мм x 33м',
    price: 40,
    image: '/images/tape/regular1.jpg',
    subcategory: 'regular',
    description: 'Стандартная прозрачная клейкая лента для офиса и дома'
  },
  {
    id: 't2',
    name: 'Клейкая лента Эквилибриум Invisible, матовая, 19мм x 33м',
    price: 60,
    image: '/images/tape/regular2.jpg',
    subcategory: 'regular',
    description: 'Матовая невидимая лента для работы с документами'
  },
  {
    id: 't3',
    name: 'Клейкая лента двухсторонняя Эквилибриум Double, 12мм x 10м',
    price: 85,
    image: '/images/tape/double1.jpg',
    subcategory: 'double',
    description: 'Двухсторонняя клейкая лента для монтажа и крепления'
  }
];

// Подкатегории клейких лент
const tapeSubcategories = [
  { id: 'regular', name: 'Клейкие ленты односторонние' },
  { id: 'double', name: 'Клейкие ленты двухсторонние' }
];

export default function TapePage() {
  return (
    <CategoryPage
      categoryName="Клейкие ленты"
      subcategories={tapeSubcategories}
      products={testProducts}
      categoryPath="tape"
    />
  );
} 