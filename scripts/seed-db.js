require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Определение схемы категории
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  image: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  order: Number,
  isActive: Boolean,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Определение схемы продукта
const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  oldPrice: Number,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sku: String,
  stock: Number,
  isActive: Boolean,
  specifications: { type: Map, of: String },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Начальные данные для категорий
const initialCategories = [
  {
    name: 'Ручки',
    slug: 'ruchki',
    description: 'Шариковые, гелевые и другие ручки',
    order: 1,
    isActive: true,
  },
  {
    name: 'Карандаши',
    slug: 'karandashi',
    description: 'Простые и механические карандаши',
    order: 2,
    isActive: true,
  },
  {
    name: 'Тетради',
    slug: 'tetradi',
    description: 'Школьные тетради и блокноты',
    order: 3,
    isActive: true,
  },
  {
    name: 'Папки и файлы',
    slug: 'papki-i-faily',
    description: 'Папки, файлы и архивные системы',
    order: 4,
    isActive: true,
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Очищаем существующие данные
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Existing data cleared');

    // Создаем категории
    const categories = await Category.insertMany(initialCategories);
    console.log('Categories created');

    // Создаем продукты для каждой категории
    const products = [];
    
    // Ручки
    products.push({
      name: 'Ручка шариковая Эквилибриум R-301',
      slug: 'ruchka-sharikovaya-эквилибриум-r-301',
      description: 'Классическая шариковая ручка синего цвета',
      price: 25.00,
      oldPrice: 30.00,
      images: ['/uploads/pen-r301.jpg'],
      category: categories[0]._id,
      sku: 'PEN' + uuidv4().substring(0, 8),
      stock: 100,
      isActive: true,
      specifications: new Map([
        ['Цвет чернил', 'Синий'],
        ['Толщина линии', '0.7 мм']
      ])
    });

    // Карандаши
    products.push({
      name: 'Карандаш чернографитный Эквилибриум HB',
      slug: 'karandash-chernografitnyi-эквилибриум-hb',
      description: 'Чернографитный карандаш средней твердости',
      price: 15.00,
      oldPrice: 20.00,
      images: ['/uploads/pencil-hb.jpg'],
      category: categories[1]._id,
      sku: 'PENCIL' + uuidv4().substring(0, 8),
      stock: 150,
      isActive: true,
      specifications: new Map([
        ['Твердость', 'HB'],
        ['Материал', 'Дерево']
      ])
    });

    // Тетради
    products.push({
      name: 'Тетрадь школьная Эквилибриум 48 листов',
      slug: 'tetrad-shkolnaya-эквилибриум-48',
      description: 'Школьная тетрадь в клетку, 48 листов',
      price: 45.00,
      oldPrice: 50.00,
      images: ['/uploads/notebook-48.jpg'],
      category: categories[2]._id,
      sku: 'NOTE' + uuidv4().substring(0, 8),
      stock: 200,
      isActive: true,
      specifications: new Map([
        ['Количество листов', '48'],
        ['Линовка', 'Клетка']
      ])
    });

    // Папки
    products.push({
      name: 'Папка-регистратор Эквилибриум А4',
      slug: 'papka-registrator-эквилибриум-a4',
      description: 'Папка-регистратор формата А4 с арочным механизмом',
      price: 180.00,
      oldPrice: 200.00,
      images: ['/uploads/folder-a4.jpg'],
      category: categories[3]._id,
      sku: 'FOLD' + uuidv4().substring(0, 8),
      stock: 75,
      isActive: true,
      specifications: new Map([
        ['Формат', 'A4'],
        ['Ширина корешка', '75 мм']
      ])
    });

    await Product.insertMany(products);
    console.log('Products created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 