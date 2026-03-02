# Настройка Email для подтверждения регистрации

## Переменные окружения

Создайте файл `.env.local` в корне проекта со следующими переменными:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email configuration (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

## Настройка Gmail (обязательно для отправки писем о заказах)

Gmail **не принимает** обычный пароль от аккаунта для SMTP. Нужен **пароль приложения**.

### Как получить пароль приложения Gmail

1. Откройте https://myaccount.google.com/ и войдите в аккаунт **equilibriumkanz@gmail.com**.
2. Слева выберите **Безопасность**.
3. В блоке «Вход в Google» нажмите **Двухэтапная аутентификация** и **включите** её, если ещё не включена.
4. Вернитесь в **Безопасность** → в блоке «Вход в Google» нажмите **Пароли приложений**.
5. Выберите приложение: **Почта**, устройство: **Другое** (введите, например, «Сайт заказов») → **Создать**.
6. Google покажет **16-значный пароль** (например, `abcd efgh ijkl mnop`). Скопируйте его **без пробелов**.
7. В `.env.local` укажите:
   ```bash
   EMAIL_USER=equilibriumkanz@gmail.com
   EMAIL_PASS="скопированный_16_символов_без_пробелов"
   ```
8. Перезапустите `npm run dev`.

После этого письма о заказах будут уходить на equilibriumkanz@gmail.com.

## Альтернативные email сервисы

Если не хотите использовать Gmail, можете изменить конфигурацию в `src/lib/email.ts`:

### Для Outlook/Hotmail:
```typescript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Для Yandex:
```typescript
const transporter = nodemailer.createTransporter({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Для Mail.ru:
```typescript
const transporter = nodemailer.createTransporter({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Установка зависимостей

Убедитесь, что установлен пакет `nodemailer`:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Тестирование

После настройки:
1. Зарегистрируйте нового пользователя
2. Проверьте, что email с кодом подтверждения отправляется
3. Подтвердите email и войдите в аккаунт
