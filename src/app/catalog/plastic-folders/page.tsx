"use client";

import React from 'react';
import CategoryPage from '../../components/CategoryPage';

// Подкатегории для пластиковых папок
const subcategories = [
  { id: 'plastic-folders-general', name: 'Папки пластиковые' },
  { id: 'file-folders', name: 'Папки файловые' },
  { id: 'file-folders-pocket', name: 'Папки файловые с карманом на корешке' },
  { id: 'file-folders-spiral', name: 'Папки файловые на спирали' },
  { id: 'ring-folders', name: 'Папки на кольцах' },
  { id: 'clamp-folders', name: 'Папки с зажимами' },
  { id: 'zipper-folders', name: 'Папки на молнии' },
  { id: 'rubber-folders', name: 'Папки на резинках' },
  { id: 'rubber-folders-30mm', name: 'Папки на резинках с корешком 30 мм' },
  { id: 'button-folders', name: 'Папки на кнопке' },
  { id: 'card-index-folders', name: 'Папки-картотеки' },
];

// Товары для пластиковых папок
const products = [
  {
    id: '1',
    name: 'Папка пластиковая А4 прозрачная',
    price: 75,
    image: '/images/tovar.PNG',
    subcategory: 'plastic-folders-general',
    description: 'Прозрачная пластиковая папка формата А4',
    category: 'Папки пластиковые',
    stock: 200,
    slug: 'papka-plastikovaya-a4-prozrachnaya'
  },
  {
    id: '2',
    name: 'Папка файловая А4',
    price: 95,
    image: '/images/tovar.PNG',
    subcategory: 'file-folders',
    description: 'Файловая папка формата А4',
    category: 'Папки пластиковые',
    stock: 150,
    slug: 'papka-faylovaya-a4'
  },
  {
    id: '3',
    name: 'Папка на кольцах А4',
    price: 180,
    image: '/images/tovar.PNG',
    subcategory: 'ring-folders',
    description: 'Папка на кольцах формата А4',
    category: 'Папки пластиковые',
    stock: 80,
    slug: 'papka-na-koltsakh-a4'
  },
  {
    id: '4',
    name: 'Папка на молнии А4',
    price: 120,
    image: '/images/tovar.PNG',
    subcategory: 'zipper-folders',
    description: 'Папка на молнии формата А4',
    category: 'Папки пластиковые',
    stock: 100,
    slug: 'papka-na-molnii-a4'
  }
];

export default function PlasticFoldersPage() {
  return (
    <CategoryPage
      categoryName="Папки пластиковые"
      subcategories={subcategories}
      products={products}
      categoryPath="plastic-folders"
    />
  );
} 