'use client';

import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductGrid from '../../components/ProductGrid';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Временные данные для тестовых карточек товаров
const testProducts = [
  {
    id: 'b1',
    name: 'Кисти для акварели Эквилибриум Aqua, круглые, 6 шт.',
    price: 280,
    image: '/images/brushes/brush1.jpg',
    subcategory: 'watercolor',
    description: 'Набор круглых кистей из натурального волоса для акварельной живописи'
  },
  {
    id: 'b2',
    name: 'Кисти для гуаши Эквилибриум Basic, плоские, 5 шт.',
    price: 320,
    image: '/images/brushes/brush2.jpg',
    subcategory: 'gouache',
    description: 'Набор плоских кистей из синтетического волоса для работы с гуашью'
  },
  {
    id: 'b3',
    name: 'Кисть для акварели Эквилибриум Professional, белка, круглая, №2',
    price: 150,
    image: '/images/brushes/brush3.jpg',
    subcategory: 'watercolor',
    description: 'Профессиональная кисть из натурального беличьего волоса для тонких работ акварелью'
  },
  {
    id: 'b4',
    name: 'Кисть для гуаши Эквилибриум Expert, синтетика, плоская, №8',
    price: 180,
    image: '/images/brushes/brush4.jpg',
    subcategory: 'gouache',
    description: 'Профессиональная плоская кисть из синтетического волоса для работы с гуашью'
  },
  {
    id: 'b5',
    name: 'Набор кистей Эквилибриум Mixed, для акварели и гуаши, 10 шт.',
    price: 450,
    image: '/images/brushes/brush5.jpg',
    subcategory: 'sets',
    description: 'Комбинированный набор кистей различных форм и размеров для разных техник рисования'
  },
  {
    id: 'b6',
    name: 'Набор кистей Эквилибриум Start, для начинающих, 8 шт.',
    price: 350,
    image: '/images/brushes/brush6.jpg',
    subcategory: 'sets',
    description: 'Стартовый набор кистей для начинающих художников, подходит для разных видов красок'
  }
];

// Подкатегории кистей
const brushesSubcategories = [
  { id: 'watercolor', name: 'Кисти для акварели' },
  { id: 'gouache', name: 'Кисти для гуаши' },
  { id: 'sets', name: 'Наборы кистей' }
];

export default function BrushesPage() {
  return (
    <CategoryPage
      categoryName="Кисти для акварели и гуаши"
      subcategories={brushesSubcategories}
      products={testProducts}
      categoryPath="brushes"
    />
  );
} 