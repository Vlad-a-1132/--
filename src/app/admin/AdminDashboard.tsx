"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  TagsIcon, 
  LayoutDashboard, 
  LogOut, 
  Users, 
  Settings,
  Loader2
} from 'lucide-react';

interface AdminDashboardProps {
  children: React.ReactNode;
}

export default function AdminDashboard({ children }: AdminDashboardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' || 
        (status === 'authenticated' && 
         (session?.user?.email !== 'admin@example.com' || 
          session?.user?.role !== 'admin'))) {
      router.push('/admin/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session?.user || session.user.email !== 'admin@example.com' || session.user.role !== 'admin') {
    return null;
  }

  const navItems = [
    { title: 'Панель', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { title: 'Товары', href: '/admin/products', icon: <Package size={20} /> },
    { title: 'Категории', href: '/admin/categories', icon: <TagsIcon size={20} /> },
    { title: 'Пользователи', href: '/admin/users', icon: <Users size={20} /> },
    { title: 'Настройки', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md">
            <div className="p-4 border-b">
              <Link href="/admin" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">
                  EK Admin
                </span>
              </Link>
            </div>
            <nav className="flex flex-col p-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
              <div className="mt-auto pt-6 border-t">
                <Link 
                  href="/api/auth/signout"
                  className="flex items-center px-4 py-3 mt-6 text-red-500 rounded hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="ml-3">Выйти</span>
                </Link>
              </div>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow">
              <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Панель администратора
                </h1>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-700">
                    {session?.user?.name || session?.user?.email}
                  </span>
                </div>
              </div>
            </header>
            
            {/* Page content */}
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
} 