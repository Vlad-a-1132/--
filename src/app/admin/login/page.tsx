"use client";

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Если пользователь уже авторизован как админ, перенаправляем его в админ-панель
  useEffect(() => {
    if (status === 'loading') return;
    
    console.log('Login page - Session status:', status);
    console.log('Login page - Session data:', session);
    console.log('Login page - User role:', session?.user?.role);
    
    if (session?.user?.role === 'admin' || session?.user?.role === 'ADMIN') {
      console.log('User is already authenticated as admin, redirecting...');
      // Используем replace вместо push, чтобы избежать возврата на страницу логина
      router.replace('/admin');
    }
  }, [session, status, router]);

  // Показываем загрузку пока проверяем сессию
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Неверный email или пароль');
      } else {
        // Успешный вход - ждем обновления сессии и затем редиректим
        setError('');
        console.log('Login successful, result:', result);
        console.log('Login successful, waiting for session update...');
        
        // Даем время NextAuth обновить сессию
        setTimeout(() => {
          console.log('Redirecting to admin panel...');
          router.push('/admin');
        }, 100);
      }
    } catch (error) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

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
              className="h-auto"
            />
          </div>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Вход в панель администратора
          </h2>
          {searchParams?.get('registered') && (
            <div className="mt-2 p-2 bg-green-50 text-green-600 text-center rounded">
              Регистрация успешна! Теперь вы можете войти.
            </div>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Только для администраторов
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
                placeholder="Введите email"
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