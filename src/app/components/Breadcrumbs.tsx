"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  inactiveItemClasses?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  homeElement = 'Главная',
  separator = '/',
  containerClasses = 'py-4 px-4 sm:px-6 lg:px-8',
  listClasses = 'flex items-center space-x-2 text-sm',
  activeItemClasses = 'text-gray-500',
  inactiveItemClasses = 'text-blue-600 hover:text-blue-800 hover:underline'
}) => {
  const paths = usePathname();
  
  // Если мы на главной странице, не показываем хлебные крошки
  if (paths === '/') return null;
  
  const pathNames = paths.split('/').filter(path => path);
  
  // Словарь для перевода URL-сегментов в читаемые названия
  const pathTranslations: { [key: string]: string } = {
    'catalog': 'Каталог',
    'product': 'Товар',
    'about': 'О компании',
    'contacts': 'Контакты',
    'delivery': 'Доставка',
    'payment': 'Оплата'
  };

  // Функция для получения читаемого названия из URL-сегмента
  const getReadableName = (path: string): string => {
    // Если это ID товара (числовое значение), возвращаем "Товар #ID"
    if (!isNaN(Number(path))) {
      return `Товар #${path}`;
    }
    
    // Иначе ищем в словаре или возвращаем исходное значение с заглавной буквы
    return pathTranslations[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <div className="max-w-7xl mx-auto">
        <ol className={listClasses}>
          <li>
            <Link href="/" className={inactiveItemClasses}>
              {homeElement}
            </Link>
          </li>
          
          {pathNames.map((name, index) => {
            const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;
            
            return (
              <React.Fragment key={routeTo}>
                <li className="text-gray-400">{separator}</li>
                <li>
                  {isLast ? (
                    <span className={activeItemClasses}>
                      {getReadableName(name)}
                    </span>
                  ) : (
                    <Link href={routeTo} className={inactiveItemClasses}>
                      {getReadableName(name)}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs; 