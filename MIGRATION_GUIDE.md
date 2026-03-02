# Миграция с MongoDB на PostgreSQL - Инструкция по завершению

## ✅ Выполнено автоматически

1. **Обновлены зависимости** - убраны `mongoose` и `mongodb`, добавлены `prisma`, `@prisma/client`, `pg`
2. **Создана Prisma схема** - `prisma/schema.prisma` с моделями User, Category, Product
3. **Переписаны все API routes** - переведены с Mongoose на Prisma запросы
4. **Обновлены скрипты** - переписаны на Prisma
5. **Удалены старые модели** - убраны файлы Mongoose моделей
6. **Сгенерирован Prisma клиент**

## 🚀 Что нужно сделать дополнительно

### 1. Установка и настройка PostgreSQL

Установите PostgreSQL на ваш сервер:

**Windows:**
```bash
# Скачайте с https://www.postgresql.org/download/windows/
# Или используйте Chocolatey
choco install postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Создание базы данных

```sql
-- Подключитесь к PostgreSQL
sudo -u postgres psql

-- Создайте базу данных
CREATE DATABASE erich_krause_catalog;

-- Создайте пользователя (опционально)
CREATE USER erich_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE erich_krause_catalog TO erich_user;

-- Выйдите из psql
\q
```

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/erich_krause_catalog?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"
```

**Замените:**
- `username` - имя пользователя PostgreSQL
- `password` - пароль пользователя
- `localhost:5432` - хост и порт вашего PostgreSQL сервера
- `your-secret-key-here` - случайная строка для NextAuth

### 4. Применение миграций

```bash
# Создайте и примените миграцию
npm run db:migrate

# Или просто синхронизируйте схему (для разработки)
npm run db:push
```

### 5. Тестирование подключения

```bash
# Проверьте подключение к БД
npm run test-db
```

### 6. Создание администратора

```bash
# Создайте пользователя-администратора
npm run create-admin
```

**Учетные данные по умолчанию:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Обязательно смените пароль после первого входа!**

### 7. Заполнение тестовыми данными (опционально)

```bash
# Заполните базу категориями
npm run seed-categories

# Заполните базу товарами
npm run seed-db
```

## 📊 Структура новой базы данных

### Таблица `users`
```sql
id         UUID PRIMARY KEY
name       VARCHAR NOT NULL
email      VARCHAR UNIQUE NOT NULL
password   VARCHAR NOT NULL
role       Role DEFAULT 'USER' -- USER, ADMIN, EDITOR
isActive   BOOLEAN DEFAULT true
createdAt  TIMESTAMP DEFAULT now()
updatedAt  TIMESTAMP DEFAULT now()
```

### Таблица `categories`
```sql
id          UUID PRIMARY KEY
name        VARCHAR NOT NULL
slug        VARCHAR UNIQUE NOT NULL
description TEXT
order       INTEGER DEFAULT 0
isActive    BOOLEAN DEFAULT true
createdAt   TIMESTAMP DEFAULT now()
updatedAt   TIMESTAMP DEFAULT now()
```

### Таблица `products`
```sql
id             UUID PRIMARY KEY
name           VARCHAR NOT NULL
slug           VARCHAR UNIQUE NOT NULL
description    TEXT NOT NULL
price          DECIMAL(10,2) NOT NULL
oldPrice       DECIMAL(10,2)
images         TEXT[] -- Массив строк
categoryId     UUID REFERENCES categories(id)
sku            VARCHAR UNIQUE NOT NULL
stock          INTEGER DEFAULT 0
specifications JSONB DEFAULT '{}'
isActive       BOOLEAN DEFAULT true
createdAt      TIMESTAMP DEFAULT now()
updatedAt      TIMESTAMP DEFAULT now()
```

## 🔄 Миграция данных из MongoDB

Если у вас есть данные в MongoDB, создайте скрипт миграции:

```javascript
// scripts/migrate-from-mongodb.js
const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

async function migrateData() {
  const mongo = new MongoClient('mongodb://localhost:27017/old_database');
  const prisma = new PrismaClient();
  
  try {
    await mongo.connect();
    const db = mongo.db();
    
    // Мигрируйте пользователей
    const users = await db.collection('users').find({}).toArray();
    for (const user of users) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role.toUpperCase(),
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      });
    }
    
    // Аналогично для категорий и товаров...
    
  } finally {
    await mongo.close();
    await prisma.$disconnect();
  }
}
```

## 🛠 Полезные команды Prisma

```bash
# Просмотр базы данных в браузере
npm run db:studio

# Сброс базы данных
npm run reset-db

# Генерация клиента после изменения схемы
npm run db:generate

# Форматирование схемы
npx prisma format
```

## 🔍 Проверка работоспособности

1. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```

2. **Проверьте основные функции:**
   - Регистрация пользователей
   - Авторизация администратора
   - CRUD операции с категориями
   - CRUD операции с товарами
   - Поиск и фильтрация

3. **Проверьте API endpoints:**
   - `GET /api/categories` - список категорий
   - `GET /api/products` - список товаров
   - `POST /api/auth/register` - регистрация
   - Admin панель: `/admin`

## ⚠️ Важные замечания

1. **UUID vs ObjectId** - теперь используются UUID вместо MongoDB ObjectId
2. **Схема строже** - PostgreSQL требует строгого соответствия типам
3. **Транзакции** - теперь доступны ACID транзакции
4. **Производительность** - индексы настроены автоматически Prisma
5. **Бэкапы** - используйте `pg_dump` для создания резервных копий

## 🎯 Следующие шаги

1. Настройте продакшн базу данных
2. Обновите CI/CD пайплайны
3. Настройте мониторинг производительности
4. Создайте регулярные бэкапы
5. Обновите документацию API

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в консоли
2. Убедитесь, что PostgreSQL запущен
3. Проверьте правильность DATABASE_URL
4. Используйте `npm run test-db` для диагностики 