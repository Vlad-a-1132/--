/**
 * Список категорий каталога (как на /catalog).
 * Используется в админке для фильтрации выбора категорий при создании/редактировании товара.
 * Данные и порядок — из единого источника (catalog-categories-data).
 */
import { CATALOG_CATEGORY_GROUPS } from './catalog-categories-data';

/** Имя подкатегории каталога по последнему сегменту пути (slug из URL). Если не найдено — null. */
export function getCategoryNameByPathSlug(pathSlug: string): string | null {
  for (const group of CATALOG_CATEGORY_GROUPS) {
    for (const item of group.items) {
      const segment = item.path.split('/').filter(Boolean).pop();
      if (segment === pathSlug) return item.name;
    }
  }
  return null;
}

export const CATALOG_MAIN_GROUP_TITLES: readonly string[] = CATALOG_CATEGORY_GROUPS.map((g) => g.title);

/** Для каждой основной группы — названия подкатегорий в том же порядке, что на каталоге */
export const CATALOG_ITEMS_BY_GROUP: Record<string, readonly string[]> = Object.fromEntries(
  CATALOG_CATEGORY_GROUPS.map((g) => [g.title, g.items.map((i) => i.name)])
);

export function isAllowedMainCategory(name: string): boolean {
  return CATALOG_MAIN_GROUP_TITLES.includes(name);
}

export function getAllowedSubcategoryNames(mainCategoryName: string): readonly string[] {
  return CATALOG_ITEMS_BY_GROUP[mainCategoryName] ?? [];
}

/** Все подкатегории группы из каталога (имя + path) для сайдбара на страницах раздела. */
export function getCatalogItemsByGroupTitle(groupTitle: string): { name: string; path: string }[] {
  const group = CATALOG_CATEGORY_GROUPS.find((g) => g.title === groupTitle);
  if (!group) return [];
  return group.items.map((i) => ({ name: i.name, path: i.path }));
}

/** Название группы каталога, в которую входит категория (по имени или по path-slug). Нужно для «Все товары» по разделу. */
export function getGroupTitleByCategoryName(categoryName: string): string | null {
  for (const group of CATALOG_CATEGORY_GROUPS) {
    if (group.items.some((i) => i.name === categoryName)) return group.title;
  }
  return null;
}

/** Логический родитель в каталоге (хлебные крошки/сайдбар): «Акварельные краски», «Акриловые краски» → «Краски». */
export function getLogicalParentCategoryName(categoryName: string): string | null {
  const map: Record<string, string> = {
    'Акварельные краски': 'Краски',
    'Акриловые краски': 'Краски',
  };
  return map[categoryName] ?? null;
}

/** Имена подкатегорий для логического родителя «Краски» (для сайдбара на страницах Акварельные/Акриловые краски). */
export const KRASKI_SUBCATEGORY_NAMES: readonly string[] = ['Акварельные краски', 'Акриловые краски'];

/** Подкатегории для основной категории: по всем id с таким именем (дубликаты в БД), порядок как в каталоге, без дублей по имени */
export function getSubcategoriesForMain<T extends { level: number; name: string; parentId?: string | null }>(
  mainCategoryName: string,
  categories: T[]
): T[] {
  const allowedNames = getAllowedSubcategoryNames(mainCategoryName);
  if (!allowedNames.length) return [];
  const mainIds = categories.filter((c) => c.level === 0 && c.name === mainCategoryName).map((c) => (c as T & { id: string }).id);
  if (!mainIds.length) return [];
  const subs = categories.filter(
    (c) => c.level === 1 && c.parentId && mainIds.includes(c.parentId) && allowedNames.includes(c.name)
  );
  return allowedNames.map((name) => subs.find((c) => c.name === name)).filter(Boolean) as T[];
}
