import React from 'react';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Убираем серверную проверку сессии, так как страница входа работает на клиенте
  // Проверка будет происходить на уровне страниц
  return <>{children}</>;
} 