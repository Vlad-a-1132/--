import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог | Эквилибриум',
  description: 'Каталог товаров Эквилибриум - канцелярские товары, товары для офиса и школы',
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 