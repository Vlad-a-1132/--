'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  sku: string;
  stock: number;
  isActive: boolean;
  slug: string;
  color?: string;
}

interface ProductGridProps {
  categorySlug?: string;
  className?: string;
}

export default function ProductGrid({ categorySlug, className }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const search = searchParams.get('search');
        const subcategory = searchParams.get('subcategory');
        const all = searchParams.get('all');
        
        let apiUrl = '/api/products';
        if (categorySlug) {
          apiUrl = `/api/products/category/${categorySlug}`;
        }
        
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (subcategory) params.append('subcategory', subcategory);
        if (all === '1') params.append('all', '1');
        
        const queryString = params.toString();
        const response = await fetch(queryString ? `${apiUrl}?${queryString}` : apiUrl);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, categorySlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Товары не найдены</h3>
        <p className="mt-2 text-sm text-gray-500">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            image={product.images[0]}
            images={product.images}
            category={product.category.name}
            stock={product.stock}
            slug={product.slug}
            color={product.color}
          />
        ))}
      </div>
    </div>
  );
} 