import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductGrid from '@/app/components/ProductGrid';
import { getCategoryNameByPathSlug, getCatalogItemsByGroupTitle } from '@/lib/catalog-categories';

const PAPER_GROUP_TITLE = 'Бумажная продукция';

// Соответствие алиасов путей к slug из каталога (path) для API и БД
const ALIASES: Record<string, string> = {
  subject: 'tetradi-predmetnye',
  notebooks: 'tetradi-i-bloknoty',
  'zapisnye-knizhki': 'zapisnye-knizhki',
  folderbook: 'tetradi-folderbook',
  language: 'tetradi-dlya-zapisi-inostrannyh-slov',
  music: 'tetradi-dlya-not',
  planners: 'planingi-i-ezhednevniki',
  schedules: 'raspisaniya-urokov',
  stickers: 'nakleyki',
  'albomy-dlya-risovaniya': 'albomy-dlya-risovaniya',
  'drawing-paper': 'bumaga-dlya-risovaniya-v-papke',
  'creative-sets': 'nabory-dlya-tvorchestva',
  ring: 'tetradi-na-koltsakh',
  spiral: 'tetradi-na-spirali-i-bloknoty',
  'plastic-spiral': 'tetradi-i-bloknoty-s-plastikovoy-oblozhkoy',
};

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaperCategoryPage({ params, searchParams }: PageProps) {
  const { slug: rawSlug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const resolvedSlug = ALIASES[rawSlug] || rawSlug;
  const subcategoryParam = typeof resolvedSearchParams.subcategory === 'string' ? resolvedSearchParams.subcategory : undefined;

  let category = await prisma.category.findFirst({
    where: { slug: resolvedSlug, level: 1 },
    include: {
      parent: true,
      children: { orderBy: { name: 'asc' } },
    },
  });

  if (!category) {
    const categoryNameFromPath = getCategoryNameByPathSlug(resolvedSlug);
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

  const sidebarItems = getCatalogItemsByGroupTitle(PAPER_GROUP_TITLE);
  const currentPath = `/catalog/paper/${rawSlug}`;
  const showAll = resolvedSearchParams.all === '1';
  const allProductsHref = `${currentPath}?all=1`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/catalog" className="hover:text-blue-600 transition-colors">
          Каталог
        </Link>
        <span>/</span>
        <Link href="/catalog?category=paper" className="hover:text-blue-600 transition-colors">
          Бумажная продукция
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

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
                  showAll && !subcategoryParam
                    ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                    : 'hover:border-l-4 hover:border-blue-300'
                }`}
              >
                <span className="font-medium">Все товары</span>
              </Link>
              {sidebarItems.map((item) => {
                const isCurrentPage = item.path === currentPath && !showAll;
                const isActive = subcategoryParam ? false : isCurrentPage;
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
          {subcategoryParam ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {sidebarItems.find((s) => s.path.includes(subcategoryParam))?.name}
              </h2>
            </div>
          ) : null}

          <ProductGrid
            categorySlug={resolvedSlug}
            className="animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}
