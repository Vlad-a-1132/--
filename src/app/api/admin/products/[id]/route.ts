import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      console.error('Unauthorized access attempt to get product');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for product fetch');

    const { id } = await params;

    // Получение товара с категорией
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    if (!product) {
      console.error('Product not found:', id);
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      );
    }

    console.log('Product found:', product.id);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении товара: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      console.error('Unauthorized access attempt to update product');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    console.log('Connected to database for product update');

    const { id } = await params;
    const data = await request.json();

    // Обновление товара
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        oldPrice: data.oldPrice,
        images: data.images || [],
        categoryId: data.categoryId,
        subcategory: data.subcategory,
        subsubcategory: data.subsubcategory,
        sku: data.sku,
        stock: data.stock,
        color: data.color,
        specifications: data.specifications || {},
        isActive: data.isActive ?? true,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    console.log('Product updated successfully:', product.id);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении товара: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'ADMIN')) {
      console.error('Unauthorized access attempt to delete product');
      return NextResponse.json(
        { error: 'Недостаточно прав' },
        { status: 401 }
      );
    }

    const { id } = await params;
    console.log('Connected to database for product deletion');
    console.log('Attempting to delete product with ID:', id);

    // Сначала проверяем, существует ли товар
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      console.error('Product not found for deletion:', id);
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      );
    }

    console.log('Product found for deletion:', existingProduct.name, 'ID:', existingProduct.id);

    // Удаление товара
    await prisma.product.delete({
      where: { id }
    });

    console.log('Product deleted successfully:', id);
    return NextResponse.json({ 
      message: 'Товар успешно удален',
      deletedProduct: {
        id: existingProduct.id,
        name: existingProduct.name
      }
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении товара: ' + error.message },
      { status: 500 }
    );
  }
}
