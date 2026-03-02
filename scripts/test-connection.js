require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Attempting to connect to PostgreSQL database...');
    
    // Проверяем подключение
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL database');
    
    // Проверяем существующие таблицы и их содержимое
    console.log('\nDatabase statistics:');
    
    try {
      const userCount = await prisma.user.count();
      console.log(`- Users: ${userCount} records`);
    } catch (error) {
      console.log('- Users: Table not found or error occurred');
    }
    
    try {
      const categoryCount = await prisma.category.count();
      console.log(`- Categories: ${categoryCount} records`);
    } catch (error) {
      console.log('- Categories: Table not found or error occurred');
    }
    
    try {
      const productCount = await prisma.product.count();
      console.log(`- Products: ${productCount} records`);
    } catch (error) {
      console.log('- Products: Table not found or error occurred');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 