import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/app/components/ProductGrid';
import { getCategoryNameByPathSlug, getCatalogItemsByGroupTitle } from '@/lib/catalog-categories';

const BACKPACKS_GROUP_TITLE = 'Рюкзаки и аксессуары';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BackpacksCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const subcategoryParam = typeof resolvedSearchParams.subcategory === 'string' ? resolvedSearchParams.subcategory : undefined;

  let category = await prisma.category.findFirst({
    where: { slug },
    include: {
      parent: true,
      children: { orderBy: { name: 'asc' } },
    },
  });

  if (!category) {
    const categoryNameFromPath = getCategoryNameByPathSlug(slug);
    if (categoryNameFromPath) {
      category = await prisma.category.findFirst({
        where: { name: categoryNameFromPath, level: 1 },
        include: {
          parent: true,
          children: { orderBy: { name: 'asc' } },
        },
      });
    }
  }

  if (!category) {
    notFound();
  }

  if (category.level !== 1) {
    const level1 = await prisma.category.findFirst({
      where: { name: category.name, level: 1 },
      include: {
        parent: true,
        children: { orderBy: { name: 'asc' } },
      },
    });
    if (level1) category = level1;
  }

  const sidebarItems = getCatalogItemsByGroupTitle(BACKPACKS_GROUP_TITLE);
  const currentPath = `/catalog/backpacks/${slug}`;
  const activeSubcategory = subcategoryParam;
  const showAll = resolvedSearchParams.all === '1';
  const allProductsHref = `${currentPath}?all=1`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/catalog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-2">Выберите подкатегорию, чтобы уточнить товары</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Подкатегории</h3>
            <div className="space-y-2">
              <Link
                href={allProductsHref}
                className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                  showAll && !activeSubcategory
                    ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                    : 'hover:border-l-4 hover:border-blue-300'
                }`}
              >
                <span className="font-medium">Все товары</span>
              </Link>
              {sidebarItems.map((item) => {
                const isCurrentPage = item.path === currentPath && !showAll;
                const isActive = activeSubcategory ? false : isCurrentPage;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' : 'hover:border-l-4 hover:border-blue-300'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          {activeSubcategory ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {sidebarItems.find((s) => s.path.includes(activeSubcategory))?.name}
              </h2>
            </div>
          ) : null}

          <ProductGrid
            categorySlug={slug}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}
