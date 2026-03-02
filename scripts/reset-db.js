require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    console.log('Connecting to PostgreSQL database...');
    await prisma.$connect();
    console.log('Connected to database');

    console.log('Resetting database...');

    // Удаляем все данные в правильном порядке (учитывая внешние ключи)
    console.log('Deleting products...');
    await prisma.product.deleteMany({});

    console.log('Deleting categories...');
    await prisma.category.deleteMany({});

    console.log('Deleting users...');
    await prisma.user.deleteMany({});

    console.log('Database reset completed successfully!');
    console.log('All tables have been cleared.');

  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

console.log('This will delete ALL data from the database!');
console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...');

setTimeout(() => {
  resetDatabase();
}, 5000); 