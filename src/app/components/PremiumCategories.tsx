"use client";

import React from 'react';
import Link from 'next/link';

const categories = [
  {
    name: "Ручки",
    image: "/images/pens.webp"
  },
  {
    name: "Карандаши",
    image: "/images/pencils.webp"
  },
  {
    name: "Блокноты",
    image: "/images/notebooks.webp"
  },
  {
    name: "Блокноты",
    image: "/images/notepads.webp"
  },
  {
    name: "Планировщики",
    image: "/images/planners.webp"
  },
  {
    name: "Маркеры",
    image: "/images/Маркеры.webp"
  },
  {
    name: "Журналы",
    image: "/images/journals.webp"
  },
  {
    name: "Списки дел",
    image: "/images/to-do list.webp"
  },
  {
    name: "Заметки-липучки",
    image: "/images/стикеры.webp"
  },
  {
    name: "Блоки для заметок, индексы и закладки",
    image: "/images/блоки для записи.webp"
  },
  {
    name: "Ластик и коррекция",
    image: "/images/стерки.webp"
  },
  {
    name: "Точилки",
    image: "/images/точилки.webp"
  }
];

const PremiumCategories = () => {
  return (
    <div className="bg-[#f6f1eb] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Улучшите свое рабочее пространство с помощью канцелярских товаров премиум-класса</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="/catalog/pens?all=1"
              className="category-card-wrap flex flex-col items-center animate-section-in"
              style={{ animationDelay: `${0.08 + index * 0.05}s`, opacity: 0 }}
            >
              <div className="bg-white rounded-lg overflow-hidden mb-3 w-full aspect-square" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium text-sm">{category.name}</h3>
              <span className="text-blue-600 text-xs hover:underline">Подробнее</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumCategories; 