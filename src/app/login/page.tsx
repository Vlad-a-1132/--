"use client";

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, Mail, Key, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Используем useEffect для навигации
  useEffect(() => {
    if (session?.user) {
      if (session.user.email === 'admin@example.com' && session.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes('не активирован')) {
          setShowVerificationForm(true);
          setVerificationMessage('Введите код подтверждения, отправленный на ваш email');
        } else {
          setError('Неверный email или пароль');
        }
      } else {
        // Проверяем роль после успешного входа
        if (email.toLowerCase() === 'admin@example.com') {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
        router.refresh();
      }
    } catch (error) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          code: verificationCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка подтверждения');
      }

      setVerificationMessage('Email успешно подтвержден! Теперь вы можете войти.');
      setShowVerificationForm(false);
      setVerificationCode('');
      
      // Автоматически входим после подтверждения
      setTimeout(() => {
        handleSubmit(e);
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Ошибка при подтверждении email');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');

    try {
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка повторной отправки');
      }

      setVerificationMessage('Новый код подтверждения отправлен на ваш email');
    } catch (error: any) {
      setError(error.message || 'Ошибка при повторной отправке кода');
    } finally {
      setIsResending(false);
    }
  };

  if (showVerificationForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={180}
                height={48}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Подтверждение email
            </h2>
            
            <p className="text-gray-600 text-sm mb-6">
              Введите код подтверждения, отправленный на <strong>{email}</strong>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleVerification}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {verificationMessage && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                {verificationMessage}
              </div>
            )}

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Код подтверждения
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Введите 6-значный код"
                maxLength={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-lg font-mono tracking-widest"
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Подтверждение...
                  </>
                ) : (
                  'Подтвердить email'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить код повторно'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setShowVerificationForm(false)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к входу
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={180}
              height={48}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Вход в аккаунт
          </h2>
          {searchParams?.get('registered') && (
            <div className="mt-2 p-2 bg-green-50 text-green-600 text-center rounded">
              Регистрация успешна! Теперь вы можете войти.
            </div>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Введите свои учетные данные для входа
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Зарегистрируйтесь
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 