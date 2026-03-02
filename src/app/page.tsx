import Image from "next/image";
import Link from 'next/link';
import SliderComponent from './components/SliderComponent';
import SearchFilter from './components/SearchFilter';
import PremiumCategories from './components/PremiumCategories';
import ProductCard from './components/ProductCard';

export default function Home() {
  // Массив категорий для блоков Bento
  const categories = [
    {
      title: "Канцтовары",
      description: "Широкий выбор ручек, блокнотов, бумаги и других канцелярских принадлежностей.",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "blue",
      isLarge: true
    },
    {
      title: "Творчество",
      description: "Все для творчества и рисования.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "green",
      isLarge: false
    },
    {
      title: "Офисные принадлежности",
      description: "Все необходимое для офиса.",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "purple",
      isLarge: false
    },
    {
      title: "Школьные товары",
      description: "Все для школы и учебы.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "yellow",
      isLarge: false
    },
    {
      title: "Подарки и декор",
      description: "Идеи для подарков и украшений.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "red",
      isLarge: false
    }
  ];

  // Массив товаров для блоков под слайдером
  const featuredProducts = [
    {
      title: "Гелевые ручки Zebra Sarasa Clip",
      description: "Ограниченный выпуск",
      image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "blue"
    },
    {
      title: "Перьевые ручки Monteverde Ritma",
      description: "Элегантность и стиль",
      image: "https://images.unsplash.com/photo-1560166444-7d8dead0fb49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "green"
    },
    {
      title: "Чехлы для переноски телефонов Delfonics",
      description: "Практичность и защита",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "purple"
    },
    {
      title: "Ластики для фруктов PLUS Air-In",
      description: "Инновационный дизайн",
      image: "https://images.unsplash.com/photo-1600348712459-a6967f15d7fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      color: "yellow"
    }
  ];

  // Массив новинок
  const newProducts = [
    { 
      id: '1',
      name: 'Ручка шариковая Эквилибриум', 
      image: '/images/pens.webp', 
      price: 120,
      category: 'Ручки',
      stock: 50,
      slug: 'ruchka-sharikovaya-ekvilibrium'
    },
    { 
      id: '2',
      name: 'Блокнот в клетку А5', 
      image: '/images/notebooks.webp', 
      price: 250,
      category: 'Блокноты',
      stock: 30,
      slug: 'bloknot-v-kletku-a5'
    },
    { 
      id: '3',
      name: 'Набор карандашей 12 цветов', 
      image: '/images/pencils.webp', 
      price: 350,
      category: 'Карандаши',
      stock: 25,
      slug: 'nabor-karandashey-12-tsvetov'
    },
    { 
      id: '4',
      name: 'Ежедневник планировщик', 
      image: '/images/planners.webp', 
      price: 580,
      category: 'Планировщики',
      stock: 15,
      slug: 'ezhednevnik-planirovshchik'
    }
  ];

  return (
    <div className="min-h-screen">
      <SliderComponent />
      
    
      
      <PremiumCategories />
      
      {/* Баннер */}
      <div className="w-full py-8 bg-[#f6f1eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg group">
            <img
              src="https://i.postimg.cc/SRz0wxRy/office-supplies-1000x565.webp"
              alt="Office supplies banner"
              className="banner-image-zoom w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
              <div className="w-full max-w-xl pl-10 pr-6 sm:pl-14 sm:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  Улучшите свое рабочее пространство с помощью канцелярских товаров премиум-класса
                </h2>
                <button className="bg-white text-blue-600 px-7 py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 shadow-md text-lg hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Контакты и карта — один блок */}
      <div className="w-full py-8 bg-[#f6f1eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Контакты
          </h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              <div className="p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Адрес</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ставропольский край, г. Пятигорск, ул. Рынок 21 Век 18, поселок Горячеводский
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Телефон</h3>
                  <a href="tel:+79282887532" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                    +7 928 288-75-32
                  </a>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Почта</h3>
                  <a href="mailto:equilibriumkanz@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">
                    equilibriumkanz@gmail.com
                  </a>
                </div>
                <p className="mt-6 pt-6 border-t border-gray-200">
                  <span className="inline-block bg-blue-600 text-white font-bold text-base px-4 py-3 rounded-xl">
                    Работаем в опт и розницу
                  </span>
                </p>
              </div>
              <div className="min-h-[300px] lg:min-h-[400px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A5ab6ffac26267d603a8d15e3f051ff8f7d4eb0601e5493aee1d1d2fc500cc421&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full min-h-[300px] lg:min-h-[400px] block"
                  title="Карта"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Категории товаров */}
      <div className="w-full py-8 bg-[#f6f1eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Повысьте эффективность своего рабочего пространства — с товарами для офиса
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* ножницы и резаки для бумаги */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/2 ножницы и резаки для бумаги.webp"
                  alt="ножницы и резаки для бумаги"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">ножницы и резаки для бумаги</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Степлеры и булавки */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/stepleru and bulavki.webp"
                  alt="Степлеры и булавки"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Степлеры и булавки</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Калькуляторы */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/3 калькулятор.webp"
                  alt="Калькуляторы"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Калькуляторы</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Папки и файлы */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/папки.webp"
                  alt="Папки и файлы"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Папки и файлы</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Подставки */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/подставки.webp"
                  alt="Подставки"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Подставки</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Лупы  */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/лупы.webp"
                  alt="Лупы"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Лупы</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>
          </div>

          {/* Вторая строка категорий */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {/* Концелярские ножи */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/фрезы.webp"
                  alt="Концелярские ножи"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Концелярские ножи</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Скрепки */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/скрепки.webp"
                  alt="Скрепки"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Скрепки</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Доски и маркеры  */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/доски и маркеры.webp"
                  alt="Доски и маркеры"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Доски и маркеры</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Клей */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/клей.webp"
                  alt="Клей"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Клей</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Дыроколы */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/удары.webp"
                  alt="Дыроколы"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Дыроколы</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Клейкие ленты */}
            <Link href="/catalog/paper/zapisnye-knizhki?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/2catigor/клейкая лента.webp"
                  alt="Клейкие ленты"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Клейкие ленты</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Погрузитесь в мир творчества с нашими чудесами искусства и рукоделия
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Акварельные краски */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                  alt="Акварельные краски"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Акварельные краски</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Акриловые краски */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                  alt="Акриловые краски"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Акриловые краски</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Цветные карандаши */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/task_01kjp2f8n7e2mbckde8nkz1jwa_1772414852_img_1.webp"
                  alt="Цветные карандаши"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Цветные карандаши</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Карандаши для рисования */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Карандаши для рисования.webp"
                  alt="Карандаши для рисования"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Карандаши для рисования</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Угольные карандаши */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Угольные карандаши.webp"
                  alt="Угольные карандаши"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Угольные карандаши</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Ручки-кисти */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Ручки-кисти.webp"
                  alt="Ручки-кисти"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Ручки-кисти</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>
          </div>

          {/* Вторая строка категорий */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {/* Тонкие лайнеры*/}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Тонкие лайнеры.webp"
                  alt="Тонкие лайнеры"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Тонкие лайнеры</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Масляная паста */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Масляная пастель.webp"
                  alt="Масляная паста"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Масляная паста</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Кисти и мастихины  */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="flex flex-col items-center category-card-wrap">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img 
                    src="/images/art category/Кисти и мастихины.webp"
                  alt="Кисти и мастихины"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Кисти и мастихины</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Эскизные бумаги */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Эскиз и рисунок.webp"
                  alt="Эскизные бумаги"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Эскизные бумаги</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Исскуство мандала */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Искусство мандалы.webp"
                  alt="Исскуство мандала"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Исскуство мандалы</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>

            {/* Клейкие ленты */}
            <Link href="/catalog/art/kraski-i-kisti?all=1" className="category-card-wrap flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px 0 rgb(23 23 23)' }}>
                <img
                  src="/images/art category/Ленты для маскировки и декорирования.webp"
                  alt="Клейкие ленты"
                  className="card-image-zoom w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium">Клейкие ленты</h3>
              <span className="text-blue-600 text-sm hover:underline">Подробнее</span>
            </Link>
          </div>
        </div>
      </div>
      


    </div>
  );
}
