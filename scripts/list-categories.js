require('dotenv').config();
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const indent = (level) => '  '.repeat(level);

async function run() {
  try {
    console.log('Fetching categories...');
    const categories = await prisma.category.findMany({
      orderBy: [{ level: 'asc' }, { name: 'asc' }],
    });

    // Группируем по parentId
    const byParent = new Map();
    for (const cat of categories) {
      const key = cat.parentId || 'root';
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key).push(cat);
    }

    const roots = byParent.get('root') || [];
    const lines = [];

    const collectTree = (cats, depth = 0) => {
      for (const cat of cats) {
        const line = `${indent(depth)}- ${cat.name} (slug: ${cat.slug}, level: ${cat.level})`;
        lines.push(line);
        console.log(line);
        const children = byParent.get(cat.id) || [];
        if (children.length) {
          collectTree(children, depth + 1);
        }
      }
    };

    collectTree(roots, 0);

    // Сохраняем дерево в UTF-8
    fs.writeFileSync('categories-tree.txt', ['Fetching categories...', ...lines].join('\n'), 'utf8');
    fs.writeFileSync('categories-tree.json', JSON.stringify(categories, null, 2), 'utf8');
    console.log('\nSaved files: categories-tree.txt (tree), categories-tree.json (raw)');
  } catch (err) {
    console.error('Error fetching categories:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

run();

