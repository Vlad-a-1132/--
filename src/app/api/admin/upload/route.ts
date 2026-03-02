import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Файлы не найдены' },
        { status: 400 }
      );
    }

    // Создаем папку для загрузок, если её нет
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        continue;
      }

      // Генерируем уникальное имя файла
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomString}.${extension}`;
      
      const filePath = join(uploadDir, fileName);
      
      // Сохраняем файл
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      
      // Добавляем URL к списку загруженных
      uploadedUrls.push(`/uploads/${fileName}`);
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { error: 'Не удалось загрузить ни одного изображения' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Изображения успешно загружены',
      urls: uploadedUrls
    });

  } catch (error: any) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке изображений: ' + error.message },
      { status: 500 }
    );
  }
} 