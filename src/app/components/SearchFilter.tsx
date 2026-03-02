"use client";

import React, { useState } from 'react';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ price: '', brand: '', color: '' });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl p-4" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-3 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => toggleFilter('price')} 
            className={`px-4 py-2 rounded-lg border ${activeFilter === 'price' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'} flex items-center space-x-1 transition-colors`}
          >
            <span>Цена</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={() => toggleFilter('brand')} 
            className={`px-4 py-2 rounded-lg border ${activeFilter === 'brand' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'} flex items-center space-x-1 transition-colors`}
          >
            <span>Бренд</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={() => toggleFilter('color')} 
            className={`px-4 py-2 rounded-lg border ${activeFilter === 'color' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'} flex items-center space-x-1 transition-colors`}
          >
            <span>Цвет</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {activeFilter === 'price' && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">До 500 ₽</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">500 - 1000 ₽</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">1000 - 2000 ₽</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">Более 2000 ₽</button>
            </div>
          </div>
        )}
        
        {activeFilter === 'brand' && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">Erich Krause</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">Parker</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">Pilot</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">Все бренды</button>
            </div>
          </div>
        )}
        
        {activeFilter === 'color' && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-3">
              <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-white hover:border-gray-300 transition-all"></button>
              <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white hover:border-gray-300 transition-all"></button>
              <button className="w-8 h-8 rounded-full bg-green-500 border-2 border-white hover:border-gray-300 transition-all"></button>
              <button className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white hover:border-gray-300 transition-all"></button>
              <button className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white hover:border-gray-300 transition-all"></button>
              <button className="w-8 h-8 rounded-full bg-black border-2 border-white hover:border-gray-300 transition-all"></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter; 