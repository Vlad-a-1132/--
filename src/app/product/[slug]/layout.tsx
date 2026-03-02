import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductLayoutProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    
    // Получаем данные товара по slug
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: { name: true }
        }
      }
    });

    if (!product) {
      return {
        title: 'Товар не найден | Эквилибриум',
        description: 'Запрашиваемый товар не найден'
      };
    }

    // Используем SEO поля, если они заполнены, иначе используем стандартные
    const title = `${product.name} | ${product.category?.name || 'Товар'} | Эквилибриум`;
    const description = product.description;

    return {
      title,
      description,
      metadataBase: new URL('http://localhost:3000'),
      openGraph: {
        title,
        description,
        type: 'website',
        images: ['/images/logo.png'], // Логотип компании
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Товар | Эквилибриум',
      description: 'Канцелярские товары высокого качества'
    };
  }
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children;
}