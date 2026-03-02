import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/app/components/ProductGrid';
import { getCategoryNameByPathSlug, getCatalogItemsByGroupTitle, getGroupTitleByCategoryName } from '@/lib/catalog-categories';

const STATIONERY_GROUP_TITLE = 'Канцтовары';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const subcategoryParam = typeof resolvedSearchParams.subcategory === 'string' ? resolvedSearchParams.subcategory : undefined;

  let category = await prisma.category.findFirst({
    where: { slug, level: 1 },
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

  const groupTitle = getGroupTitleByCategoryName(category.name);
  const nameFromPath = getCategoryNameByPathSlug(slug);
  const groupBySlug = nameFromPath ? getGroupTitleByCategoryName(nameFromPath) : null;
  const isStationery = groupTitle === STATIONERY_GROUP_TITLE || groupBySlug === STATIONERY_GROUP_TITLE;

  const sidebarItems = isStationery ? getCatalogItemsByGroupTitle(STATIONERY_GROUP_TITLE) : [];
  const subcategoriesFromDb = category.children || [];
  const currentPath = `/catalog/${slug}`;
  const showAll = resolvedSearchParams.all === '1';
  const allProductsHref = `${currentPath}?all=1`;

  const activeSubcategory = subcategoryParam;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isStationery && (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">
            Канцтовары
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>
      )}

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
          {isStationery && sidebarItems.length > 0 ? (
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
          ) : subcategoriesFromDb.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Подкатегории</h3>
              <div className="space-y-2">
                <Link
                  href={currentPath}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                    !activeSubcategory
                      ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                      : 'hover:border-l-4 hover:border-blue-300'
                  }`}
                >
                  <span className="font-medium">Все товары</span>
                </Link>
                {subcategoriesFromDb.map((subcategory) => {
                  const isActive = activeSubcategory === subcategory.slug;
                  return (
                    <Link
                      key={subcategory.id}
                      href={`/catalog/${slug}?subcategory=${encodeURIComponent(subcategory.slug)}`}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                          : 'hover:border-l-4 hover:border-blue-300'
                      }`}
                    >
                      <span className="font-medium">{subcategory.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-full lg:w-3/4">
          {activeSubcategory && subcategoriesFromDb.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {subcategoriesFromDb.find((sub) => sub.slug === activeSubcategory)?.name}
              </h2>
            </div>
          )}

          <ProductGrid
            categorySlug={slug}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}
