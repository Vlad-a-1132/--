import dbConnect from '../src/app/lib/mongodb';
import User from '../src/app/models/User';
import bcrypt from 'bcrypt';

async function createAdmin() {
  try {
    await dbConnect();

    // Проверяем, существует ли уже админ
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (existingAdmin) {
      console.log('Администратор уже существует');
      process.exit(0);
    }

    // Создаем администратора
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Администратор успешно создан:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
    process.exit(1);
  }
}

createAdmin(); 