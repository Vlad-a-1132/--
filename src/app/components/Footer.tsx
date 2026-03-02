import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#f6f1eb] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#f6f1eb]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Erich Krause Logo"
                width={180}
                height={48}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <p className="text-gray-600 text-sm">
              Официальный интернет-магазин канцелярских товаров Эквилибриум. 
              Качественные товары для офиса, школы и творчества.
            </p>
          </div>

          {/* Полезные ссылки */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Оплата
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Все товары
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=pens" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ручки
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=pencils" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Карандаши
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=notebooks" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Тетради
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Контакты</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="tel:+79282887532" className="hover:text-blue-600 transition-colors">+7 928 288-75-32</a>
              </li>
              <li>
                <a href="mailto:equilibriumkanz@gmail.com" className="hover:text-blue-600 transition-colors">equilibriumkanz@gmail.com</a>
              </li>
              <li>
                Ставропольский край, г. Пятигорск, ул. Рынок 21 Век 18, поселок Горячеводский
              </li>
              <li>Работаем в опт и розницу</li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            © 2024 Эквилибриум. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 