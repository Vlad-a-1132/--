import { NextResponse } from 'next/server';
import { sendOrderNotification, type OrderItem } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fio, phone, email, items, total } = body as {
      fio?: string;
      phone?: string;
      email?: string;
      items?: OrderItem[];
      total?: number;
    };

    if (!fio || typeof fio !== 'string' || !fio.trim()) {
      return NextResponse.json(
        { message: 'Укажите ФИО' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { message: 'Укажите номер телефона' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Корзина пуста' },
        { status: 400 }
      );
    }

    const orderItems: OrderItem[] = items.map((item: { name?: string; price?: number; quantity?: number }) => ({
      name: String(item.name ?? ''),
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    }));

    const orderTotal = typeof total === 'number' && total >= 0
      ? total
      : orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await sendOrderNotification({
      fio: fio.trim(),
      phone: phone.trim(),
      email: typeof email === 'string' && email.trim() ? email.trim() : undefined,
      items: orderItems,
      total: orderTotal,
    });

    return NextResponse.json({ success: true, message: 'Заказ принят' });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { message: 'Не удалось отправить заказ. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
