/**
 * Сид категорий каталога: 4 основные (level 0) + подкатегории (level 1).
 * Данные и порядок — из src/data/catalog-categories.json (как на /catalog).
 * order: основные 1–4; подкатегории группы 0 → 100–124, 1 → 200–215, 2 → 300–307, 3 → 400–406.
 */
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const catalogPath = path.join(__dirname, '../src/data/catalog-categories.json');
const categoryGroups = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/ё/g, 'e')
    .replace(/[^\wа-яa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Порядок для подкатегорий по группам: 100+, 200+, 300+, 400+ */
function subOrder(groupIndex, itemIndex) {
  return (groupIndex + 1) * 100 + itemIndex;
}

async function seedCatalogCategories() {
  try {
    console.log('Каталог категорий: данные из', catalogPath);
    console.log('Порядок: основные 1–4, подкатегории по группам 100+, 200+, 300+, 400+\n');

    for (let groupIndex = 0; groupIndex < categoryGroups.length; groupIndex++) {
      const group = categoryGroups[groupIndex];
      const mainSlug = slugify(group.title);
      const mainOrder = groupIndex + 1;

      let mainCat = await prisma.category.findFirst({
        where: { level: 0, slug: mainSlug },
      });
      if (!mainCat) {
        mainCat = await prisma.category.create({
          data: {
            name: group.title,
            slug: mainSlug,
            description: `Категория: ${group.title}`,
            order: mainOrder,
            level: 0,
            parentId: null,
            isActive: true,
          },
        });
        console.log('Основная категория:', mainCat.name, '(order', mainOrder, ')');
      } else {
        await prisma.category.update({
          where: { id: mainCat.id },
          data: { order: mainOrder },
        });
        console.log('Основная категория (обновлён order):', mainCat.name);
      }

      const items = group.items.map((item) => (typeof item === 'string' ? item : item.name));
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const itemName = items[itemIndex];
        const itemSlug = slugify(itemName);
        const slug = `${mainSlug}-${itemSlug}`;
        const order = subOrder(groupIndex, itemIndex);

        const existing = await prisma.category.findFirst({
          where: { parentId: mainCat.id, name: itemName },
        });
        if (!existing) {
          const slugTaken = await prisma.category.findUnique({ where: { slug } });
          const uniqueSlug = slugTaken ? `${slug}-${mainCat.id.slice(0, 8)}` : slug;
          await prisma.category.create({
            data: {
              name: itemName,
              slug: uniqueSlug,
              description: null,
              order,
              level: 1,
              parentId: mainCat.id,
              isActive: true,
            },
          });
          console.log('  + подкатегория:', itemName, '(order', order, ')');
        } else {
          await prisma.category.update({
            where: { id: existing.id },
            data: { order },
          });
        }
      }
    }

    const mainCount = await prisma.category.count({ where: { level: 0 } });
    const subCount = await prisma.category.count({ where: { level: 1 } });
    console.log('\nИтого: основных', mainCount, ', подкатегорий', subCount);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCatalogCategories();
