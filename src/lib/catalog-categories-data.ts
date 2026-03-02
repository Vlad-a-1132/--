/**
 * Единый источник списка категорий каталога (порядок и состав как на /catalog).
 * Используется: страница каталога, whitelist админки, сид БД.
 */
import catalogCategoriesJson from '@/data/catalog-categories.json';

export type CatalogCategoryItem = { name: string; path: string; description: string };
export type CatalogCategoryGroup = { title: string; items: CatalogCategoryItem[] };

export const CATALOG_CATEGORY_GROUPS: CatalogCategoryGroup[] = catalogCategoriesJson as CatalogCategoryGroup[];
