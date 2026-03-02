# 📧 Настройка Email для регистрации

## 🚨 Проблема
Ошибка `Missing credentials for "PLAIN"` означает, что не настроены переменные окружения для отправки email.

## ✅ Решение

### 1. Создайте файл `.env.local` в корне проекта:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/equilibrium_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### 2. Настройка Gmail для отправки email:

#### Шаг 1: Включите двухфакторную аутентификацию
1. Перейдите в [Google Account](https://myaccount.google.com/)
2. Выберите "Безопасность"
3. Включите "Двухэтапную аутентификацию"

#### Шаг 2: Создайте App Password
1. В разделе "Безопасность" найдите "Пароли приложений"
2. Выберите "Почта" и "Windows Computer"
3. Скопируйте сгенерированный пароль (16 символов)

#### Шаг 3: Обновите .env.local
```bash
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"  # Ваш App Password
```

### 3. Альтернативные email сервисы:

#### Outlook/Hotmail:
```bash
EMAIL_USER="your-email@outlook.com"
EMAIL_PASS="your-password"
```

#### Yandex:
```bash
EMAIL_USER="your-email@yandex.ru"
EMAIL_PASS="your-password"
```

#### Mail.ru:
```bash
EMAIL_USER="your-email@mail.ru"
EMAIL_PASS="your-password"
```

### 4. Перезапустите сервер:
```bash
npm run dev
```

## 🔧 Проверка настройки

После настройки попробуйте зарегистрировать нового пользователя. Если email отправляется успешно, вы увидите в консоли:
```
Verification email sent to user@example.com
```

## 🐛 Возможные проблемы

### Проблема: "Invalid login"
**Решение:** Проверьте правильность EMAIL_USER и EMAIL_PASS

### Проблема: "Authentication failed"
**Решение:** Убедитесь, что используете App Password для Gmail

### Проблема: "Connection timeout"
**Решение:** Проверьте интернет-соединение и настройки файрвола

## 📱 Тестирование

1. Зарегистрируйте нового пользователя
2. Проверьте email (включая спам)
3. Введите код подтверждения
4. Войдите в систему

## 🎯 Результат

После правильной настройки:
- ✅ Регистрация работает без ошибок
- ✅ Email с кодом подтверждения отправляется
- ✅ Пользователи могут подтверждать аккаунты
- ✅ Система аутентификации полностью функциональна
