require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('Connecting to PostgreSQL database...');
    await prisma.$connect();
    console.log('Connected to database');

    const email = 'admin@example.com';
    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Создаем или обновляем администратора
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        name: 'Administrator',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
      create: {
        name: 'Administrator',
        email,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
    });

    console.log('Admin user created/updated successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', plainPassword);
    console.log('Role:', admin.role);
    console.log('Please change the password after first login');

  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

console.log('Creating admin user...');
createAdmin(); 