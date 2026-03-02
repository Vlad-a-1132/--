"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShopContext } from '../context/ShopContext';
import { Heart, ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const [catalogDropdownTimeout, setCatalogDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const { cartItemsCount, favorites } = useShopContext();

  const handleCatalogMouseEnter = () => {
    if (catalogDropdownTimeout) {
      clearTimeout(catalogDropdownTimeout);
      setCatalogDropdownTimeout(null);
    }
    setIsCatalogDropdownOpen(true);
  };

  const handleCatalogMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsCatalogDropdownOpen(false);
    }, 250); // Увеличиваем задержку для максимальной стабильности
    setCatalogDropdownTimeout(timeout);
  };

  const handleCatalogMouseLeaveImmediate = () => {
    // Немедленное закрытие при уходе курсора из контейнера
    if (catalogDropdownTimeout) {
      clearTimeout(catalogDropdownTimeout);
      setCatalogDropdownTimeout(null);
    }
    setIsCatalogDropdownOpen(false);
  };

  const handleDropdownMouseEnter = () => {
    // Если курсор вошел в выпадающее меню, отменяем таймер закрытия
    if (catalogDropdownTimeout) {
      clearTimeout(catalogDropdownTimeout);
      setCatalogDropdownTimeout(null);
    }
    setIsCatalogDropdownOpen(true);
  };

  const handleDropdownMouseMove = () => {
    // При движении курсора внутри меню обновляем состояние
    if (!isCatalogDropdownOpen) {
      setIsCatalogDropdownOpen(true);
    }
    if (catalogDropdownTimeout) {
      clearTimeout(catalogDropdownTimeout);
      setCatalogDropdownTimeout(null);
    }
  };

  // Обработка клика вне меню для мобильных устройств
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.catalog-dropdown-container')) {
        setIsCatalogDropdownOpen(false);
        if (catalogDropdownTimeout) {
          clearTimeout(catalogDropdownTimeout);
          setCatalogDropdownTimeout(null);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCatalogDropdownOpen(false);
        if (catalogDropdownTimeout) {
          clearTimeout(catalogDropdownTimeout);
          setCatalogDropdownTimeout(null);
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const target = event.target as Element;
      if (!target.closest('.catalog-dropdown-container')) {
        setIsCatalogDropdownOpen(false);
        if (catalogDropdownTimeout) {
          clearTimeout(catalogDropdownTimeout);
          setCatalogDropdownTimeout(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [catalogDropdownTimeout]);

  return (
    <nav className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="block">
              <Image
                src="/images/logo.png"
                alt="Эквилибриум Logo"
                width={120}
                height={50}
                priority
                style={{ width: 'auto', height: 'auto' }}
                className="transition-transform hover:scale-105"
              />
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center flex-1 justify-center">
            <div className="flex space-x-12">
              <div 
                className="relative catalog-dropdown-container" 
                onMouseEnter={handleCatalogMouseEnter}
                onMouseLeave={handleCatalogMouseLeaveImmediate}
              >
                <Link 
                  href="/catalog" 
                  className="inline-flex items-center px-3 pt-1 text-base font-bold text-gray-700 hover:text-blue-600 transition-colors"
                  aria-expanded={isCatalogDropdownOpen}
                  aria-haspopup="true"
                >
                  Канцтовары
                </Link>
                <div className={`fixed left-0 right-0 transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-[16px] ${isCatalogDropdownOpen ? 'block opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}>
                  <div className="relative mx-auto max-w-7xl">
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 w-full bg-white shadow-lg rounded-md mt-1 nav-dropdown"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleCatalogMouseLeave}
                      role="menu"
                      aria-label="Категории товаров"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <div className="flex items-center justify-between px-8 py-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Категории</h3>
                        <Link href="/catalog" className="text-blue-600 hover:text-blue-800 font-medium">
                          Перейти в каталог
                        </Link>
                      </div>
                      <div className="max-h-[80vh] overflow-y-auto py-6 px-8">
                        <div className="grid grid-cols-4 gap-8">
                          <div className="space-y-3">
                            <Link href="/catalog/pens" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ручки</Link>
                            <Link href="/catalog/markers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Маркеры</Link>
                            <Link href="/catalog/pencils" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Карандаши чернографитные</Link>
                            <Link href="/catalog/leads" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Грифели</Link>
                            <Link href="/catalog/sharpeners" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Точилки</Link>
                            <Link href="/catalog/erasers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ластики</Link>
                            <Link href="/catalog/correctors" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Корректоры</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/glue" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Клей</Link>
                            <Link href="/catalog/adhesive-tapes" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Клейкие ленты</Link>
                            <Link href="/catalog/sticky-notes" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Клейкие закладки</Link>
                            <Link href="/catalog/note-paper" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Бумага для заметок</Link>
                            <Link href="/catalog/static-notes" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Блок статический</Link>
                            <Link href="/catalog/stationery-supplies" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Канцелярские мелочи</Link>
                            <Link href="/catalog/demo-equipment" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Демонстрационное оборудование</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/folders" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Папки</Link>
                            <Link href="/catalog/perforated-files" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Перфофайлы</Link>
                            <Link href="/catalog/report-covers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Отчётные папки</Link>
                            <Link href="/catalog/document-storage-folders" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Папки для хранения документов</Link>
                            <Link href="/catalog/desk-mats" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Подкладки настольные</Link>
                            <Link href="/catalog/paper-trays" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Лотки и накопители</Link>
                            <Link href="/catalog/clipboards" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Планшеты</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/stamp-products" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Штемпельная продукция</Link>
                            <Link href="/catalog/staplers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Степлеры</Link>
                            <Link href="/catalog/adhesive-tapes-dispensers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Клейкие ленты и диспенсеры</Link>
                            <Link href="/catalog/stationery-sets" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Канцелярские наборы</Link>
                            <Link href="/catalog/zip-bags" className="block text-sm font-bold text-gray-900 hover:text-blue-600">ZIP-пакеты</Link>
                            <Link href="/catalog/drawing-supplies" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Чертежные принадлежности</Link>
                            <Link href="/catalog/knives-cutters" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ножи и резаки</Link>
                            <Link href="/catalog/scissors" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ножницы</Link>
                            <Link href="/catalog/covers" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Обложки</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link href="/catalog?category=paper" className="inline-flex items-center px-3 pt-1 text-base font-bold text-gray-700 hover:text-blue-600 transition-colors">
                  Бумажная продукция
                </Link>
                <div className="fixed left-0 right-0 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-100 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-[16px]">
                  <div className="relative mx-auto max-w-7xl">
                    <div className="absolute left-1/2 -translate-x-1/2 w-full bg-white shadow-lg rounded-md mt-1 nav-dropdown">
                      <div className="flex items-center justify-between px-8 py-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Бумажная продукция</h3>
                        <Link href="/catalog?category=paper" className="text-blue-600 hover:text-blue-800 font-medium">
                          Перейти в каталог
                        </Link>
                      </div>
                      <div className="max-h-[80vh] overflow-y-auto py-6 px-8">
                        <div className="grid grid-cols-4 gap-8">
                          <div className="space-y-3">
                            <Link href="/catalog/paper/albomy-dlya-risovaniya" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Альбомы для рисования</Link>
                            <Link href="/catalog/paper/bumaga-dlya-risovaniya-v-papke" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Бумага для рисования в папке</Link>
                            <Link href="/catalog/paper/zapisnye-knizhki" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Записные книжки</Link>
                            <Link href="/catalog/paper/nabory-dlya-tvorchestva" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Наборы для творчества</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/paper/nakleyki" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Наклейки</Link>
                            <Link href="/catalog/paper/planingi-i-ezhednevniki" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Планинги и ежедневники</Link>
                            <Link href="/catalog/paper/raspisaniya-urokov" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Расписания уроков</Link>
                            <Link href="/catalog/paper/tetradi-folderbook" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради FolderBook</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/paper/tetradi-dlya-zapisi-inostrannyh-slov" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради для записи иностранных слов</Link>
                            <Link href="/catalog/paper/tetradi-dlya-not" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради для нот</Link>
                            <Link href="/catalog/paper/tetradi-i-bloknoty" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради и блокноты</Link>
                            <Link href="/catalog/paper/tetradi-i-bloknoty-s-plastikovoy-oblozhkoy" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради и блокноты с пластиковой обложкой</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/paper/tetradi-na-koltsakh" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради на кольцах</Link>
                            <Link href="/catalog/paper/tetradi-na-skobe-s-kartonnoy-oblozhkoy" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради на скобе с картонной обложкой</Link>
                            <Link href="/catalog/paper/tetradi-na-spirali-i-bloknoty" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради на спирали и блокноты</Link>
                            <Link href="/catalog/paper/tetradi-predmetnye" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Тетради предметные</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link href="/catalog?category=art" className="inline-flex items-center px-3 pt-1 text-base font-bold text-gray-700 hover:text-blue-600 transition-colors">
                  Товары для творчества
                </Link>
                <div className="fixed left-0 right-0 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-100 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-[16px]">
                  <div className="relative mx-auto max-w-7xl">
                    <div className="absolute left-1/2 -translate-x-1/2 w-full bg-white shadow-lg rounded-md mt-1 nav-dropdown">
                      <div className="flex items-center justify-between px-8 py-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Товары для творчества</h3>
                        <Link href="/catalog?category=art" className="text-blue-600 hover:text-blue-800 font-medium">
                          Перейти в каталог
                        </Link>
                      </div>
                      <div className="max-h-[80vh] overflow-y-auto py-6 px-8">
                        <div className="grid grid-cols-4 gap-8">
                          <div className="space-y-3">
                            <Link href="/catalog/art/kraski-i-kisti" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Краски</Link>
                            <Link href="/catalog/art/tsvetnye-karandashi" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Цветные карандаши</Link>
                            <Link href="/catalog/art/karandashi-chernografitnye" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Карандаши чернографитные</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/art/lastiki" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ластики</Link>
                            <Link href="/catalog/art/melki-i-pastel" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Мелки и пастель</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/art/flomastery-i-markery" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Фломастеры и маркеры</Link>
                            <Link href="/catalog/art/plastilin" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Пластилин</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/art/aksessuary-dlya-tvorchestva" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Аксессуары для творчества</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link href="/catalog?category=backpacks" className="inline-flex items-center px-3 pt-1 text-base font-bold text-gray-700 hover:text-blue-600 transition-colors">
                  Рюкзаки и аксессуары
                </Link>
                <div className="fixed left-0 right-0 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-100 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-[16px]">
                  <div className="relative mx-auto max-w-7xl">
                    <div className="absolute left-1/2 -translate-x-1/2 w-full bg-white shadow-lg rounded-md mt-1 nav-dropdown">
                      <div className="flex items-center justify-between px-8 py-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Рюкзаки и аксессуары</h3>
                        <Link href="/catalog?category=backpacks" className="text-blue-600 hover:text-blue-800 font-medium">
                          Перейти в каталог
                        </Link>
                      </div>
                      <div className="max-h-[80vh] overflow-y-auto py-6 px-8">
                        <div className="grid grid-cols-3 gap-8">
                          <div className="space-y-3">
                            <Link href="/catalog/backpacks/penals" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Пеналы</Link>
                            <Link href="/catalog/backpacks/bags" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Сумки</Link>
                            <Link href="/catalog/backpacks/----1756164862990-0" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Ранцы и рюкзаки ученические</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/backpacks/-1756164862998-1" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Рюкзаки</Link>
                            <Link href="/catalog/backpacks/----1756164863000-0" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Мини-рюкзаки для детей</Link>
                          </div>
                          <div className="space-y-3">
                            <Link href="/catalog/backpacks/---1756164863012-1" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Мешки для обуви</Link>
                            <Link href="/catalog/backpacks/--1756164863011-0" className="block text-sm font-bold text-gray-900 hover:text-blue-600">Сумки-шопперы</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">

                <div className="fixed left-0 right-0 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-100 before:content-[''] before:absolute before:top-[-16px] before:left-0 before:right-0 before:h-[16px]">
                  <div className="relative mx-auto max-w-7xl">
                    <div className="absolute left-1/2 -translate-x-1/2 w-full bg-white shadow-lg rounded-md mt-1 nav-dropdown">
                      <div className="flex items-center justify-between px-8 py-4 border-b">

                        <Link href="/catalog?category=gifts" className="text-blue-600 hover:text-blue-800 font-medium">
                          Перейти в каталог
                        </Link>
                      </div>
                      <div className="max-h-[80vh] overflow-y-auto py-6 px-8">
                        <div className="grid grid-cols-3 gap-8">
                          {/* Колонка 1: Коллекции елочных украшений */}
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                              <Link href="/catalog/christmas-decor" className="hover:text-blue-600 transition-colors">Елочный декор</Link>
                            </h3>
                            <div className="space-y-2">
                              <Link href="/catalog/christmas-decor?subcategory=toppers" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Верхушки</Link>
                              <Link href="/catalog/christmas-decor?subcategory=lapland" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Лапландия</Link>
                              <Link href="/catalog/christmas-decor?subcategory=venice-carnival" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Венецианский Карнавал</Link>
                              <Link href="/catalog/christmas-decor?subcategory=tablecloth" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Скатерть-самобранка</Link>
                              <Link href="/catalog/christmas-decor?subcategory=fairytale" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Мир сказок</Link>
                              <Link href="/catalog/christmas-decor?subcategory=childhood" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Мир детства</Link>
                              <Link href="/catalog/gifts/christmas/forest" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Лесное Царство</Link>
                              <Link href="/catalog/gifts/christmas/pearl" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Перламутровый Мир</Link>
                              <Link href="/catalog/gifts/christmas/marshmallow" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Зефир</Link>
                              <Link href="/catalog/gifts/christmas/christmas" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Рождество</Link>
                              <Link href="/catalog/gifts/christmas/vintage" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Винтаж</Link>
                              <Link href="/catalog/gifts/christmas/funny-animals" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Веселые зверушки</Link>
                            </div>
                          </div>

                          {/* Колонка 2: Специальные коллекции и формы */}
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                              <Link href="/catalog/special-collections" className="hover:text-blue-600 transition-colors">Специальные коллекции</Link>
                            </h3>
                            <div className="space-y-2">
                              <Link href="/catalog/special-collections?subcategory=santa" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Дед Мороз & Co</Link>
                              <Link href="/catalog/special-collections?subcategory=baby-first" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Baby's 1st Christmas</Link>
                            </div>

                            <h3 className="text-sm font-bold text-gray-900 mb-3 mt-6">
                              <Link href="/catalog/shaped-decorations" className="hover:text-blue-600 transition-colors">Формовые украшения</Link>
                            </h3>
                            <div className="space-y-2">
                              <Link href="/catalog/shaped-decorations?subcategory=plastic" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Формовая игрушка из пластика</Link>
                              <Link href="/catalog/shaped-decorations?subcategory=snowflakes" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Снежинки и звезды</Link>
                              <Link href="/catalog/shaped-decorations?subcategory=pendants" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Прочие подвески</Link>
                            </div>
                          </div>

                          {/* Колонка 3: Декор и подарки */}
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3">
                              <Link href="/catalog/decor-and-gifts" className="hover:text-blue-600 transition-colors">Декор и подарки</Link>
                            </h3>
                            <div className="space-y-2">
                              <Link href="/catalog/decor-and-gifts?subcategory=interior" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Декор интерьера</Link>
                              <Link href="/catalog/decor-and-gifts?subcategory=wrapping" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Упаковка для подарков</Link>
                              <Link href="/catalog/decor-and-gifts?subcategory=souvenirs" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">Сувениры и подарки</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/catalog"
              className="text-gray-700 hover:text-blue-600 p-2"
              title="Поиск товаров"
            >
              <Search className="h-6 w-6" />
            </Link>
            <Link
              href="/favorites"
              className="relative text-gray-700 hover:text-blue-600 p-2"
            >
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/catalog" className="block pl-3 pr-4 py-3 border-l-4 border-blue-500 text-lg font-bold text-blue-700 bg-blue-50">Канцтовары</Link>
          <Link href="/catalog?category=paper" className="block pl-3 pr-4 py-3 border-l-4 border-transparent text-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Бумажная продукция</Link>
          <Link href="/catalog?category=art" className="block pl-3 pr-4 py-3 border-l-4 border-transparent text-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Товары для творчества</Link>
          <Link href="/catalog?category=backpacks" className="block pl-3 pr-4 py-3 border-l-4 border-transparent text-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Рюкзаки и аксессуары</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar; 