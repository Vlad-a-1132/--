import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход в админ-панель | Эквилибриум',
  description: 'Страница входа в админ-панель',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 