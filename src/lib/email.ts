import nodemailer from 'nodemailer';

// Конфигурация транспорта для отправки email (Yandex)
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Генерация случайного кода подтверждения
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Отправка email с кодом подтверждения
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationCode: string
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Подтверждение регистрации - Эквилибриум',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Эквилибриум</h1>
          <p style="color: #666; margin: 10px 0;">Подтверждение регистрации</p>
        </div>
        
        <div style="padding: 30px 20px; background-color: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Здравствуйте, ${name}!</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Спасибо за регистрацию в нашем магазине канцелярских товаров. 
            Для завершения регистрации введите следующий код подтверждения:
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 30px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px; font-family: monospace;">
              ${verificationCode}
            </h1>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Код действителен в течение 10 минут. Если вы не регистрировались в нашем магазине, 
            просто проигнорируйте это письмо.
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            С уважением,<br>
            Команда Эквилибриум
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>Это автоматическое письмо, не отвечайте на него</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Ошибка отправки email');
  }
}

// Отправка email с уведомлением об успешной регистрации
export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Добро пожаловать в Эквилибриум!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Эквилибриум</h1>
          <p style="color: #666; margin: 10px 0;">Добро пожаловать!</p>
        </div>
        
        <div style="padding: 30px 20px; background-color: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Поздравляем, ${name}!</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Ваш аккаунт успешно подтвержден! Теперь вы можете войти в систему и 
            пользоваться всеми возможностями нашего магазина канцелярских товаров.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" 
               style="background-color: #007bff; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Войти в аккаунт
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            С уважением,<br>
            Команда Эквилибриум
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>Это автоматическое письмо, не отвечайте на него</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Ошибка отправки приветственного email');
  }
}

const ORDER_NOTIFICATION_EMAIL = 'equilibriumkanz@gmail.com';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  fio: string;
  phone: string;
  email?: string;
  items: OrderItem[];
  total: number;
}

// Отправка уведомления о новом заказе на equilibriumkanz@gmail.com
export async function sendOrderNotification(order: OrderData): Promise<void> {
  // Если почта не настроена — заказ всё равно считаем принятым, данные пишем в консоль
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('[Заказ] Почта не настроена (нет EMAIL_USER/EMAIL_PASS в .env.local). Заказ принят:', {
      fio: order.fio,
      phone: order.phone,
      email: order.email,
      items: order.items,
      total: order.total,
    });
    return;
  }

  const itemsRows = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.price} ₽</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity * item.price} ₽</td>
        </tr>`
    )
    .join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ORDER_NOTIFICATION_EMAIL,
    subject: `Новый заказ от ${order.fio} - Эквилибриум`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Новый заказ</h1>
          <p style="color: #666; margin: 10px 0;">Эквилибриум</p>
        </div>
        <div style="padding: 30px 20px; background-color: white;">
          <p><strong>ФИО:</strong> ${order.fio}</p>
          <p><strong>Телефон:</strong> ${order.phone}</p>
          ${order.email ? `<p><strong>Email:</strong> ${order.email}</p>` : ''}
          <h3 style="margin-top: 24px;">Состав заказа</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Товар</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Кол-во</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Цена</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Сумма</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
          <p style="margin-top: 16px; font-size: 18px;"><strong>Итого: ${order.total} ₽</strong></p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order notification sent to ${ORDER_NOTIFICATION_EMAIL}`);
  } catch (error) {
    // Не падаем перед пользователем — заказ считаем принятым, письмо просто не ушло
    console.error('Order notification failed (check EMAIL_USER/EMAIL_PASS and use Gmail App Password):', error);
  }
}
