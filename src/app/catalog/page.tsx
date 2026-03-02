"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CATALOG_CATEGORY_GROUPS } from '@/lib/catalog-categories-data';

const categoryGroups = CATALOG_CATEGORY_GROUPS;

export default function CatalogPage() {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Мобильная версия каталога: блоки и карточки */}
      <div className="sm:hidden space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Каталог</h1>
          <p className="mt-2 text-sm text-gray-600">Выберите раздел, чтобы перейти к товарам</p>
        </div>

        {categoryGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">{group.title}</h2>
            <div className="grid grid-cols-2 gap-2.5 catalog-mobile-cards">
              {group.items.map((category) => (
                <Link
                  key={category.path}
                  href={category.path}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm p-2.5 transition-transform duration-200 active:scale-[0.99]"
                >
                  {category.path === '/catalog/pens' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/category/rucka.webp"
                        alt="Ручки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/markers' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/category/marker.webp"
                        alt="Маркеры"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/sharpeners' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/category/tochilka.webp"
                        alt="Точилки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/leads' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/category/grif.webp"
                        alt="Грифели"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/pencils' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/category/karandash.webp"
                        alt="Карандаши"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/erasers' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkaqcjrf6vbj1r6qpqefjrk_1772322840_img_1.webp"
                        alt="Ластики"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/correctors' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkayqr0e3ps851w3dqyaenc_1772323083_img_0.webp"
                        alt="Корректоры"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/glue' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkb2pq4ftyt3qf8gtnq18kn_1772323214_img_1.webp"
                        alt="Клей"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/adhesive-tapes' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkb461nek18m9v504mc2x0q_1772323259_img_0.webp"
                        alt="Клейкие ленты"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/sticky-notes' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkb9hjweq2snamj2gxeh0zj_1772323433_img_0.webp"
                        alt="Клейкие закладки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/note-paper' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkbgw51f1atk86b0p04rm9g_1772323676_img_1.webp"
                        alt="Бумага для заметок"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/folders' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkc3r5yecj8q4cr2dfaj9h5_1772324296_img_0%20(1).webp"
                        alt="Папки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/perforated-files' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkc5p2jeg7rf8vce2mfd6mz_1772324361_img_1%20(1).webp"
                        alt="Перфофайлы"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/desk-mats' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkc84y9f568gc2be0nxdcws_1772324437_img_0.webp"
                        alt="Подкладки настольные"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/clipboards' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkd8vfjfmz9m7dxamse77af_1772325508_img_0.webp"
                        alt="Планшеты"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/staplers' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkdaa8qfey98ty38h2e834f_1772325561_img_0.webp"
                        alt="Степлеры"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/stamp-products' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkd9gz8f0cbtadg22pt4vsa_1772325534_img_0%20(1).webp"
                        alt="Штемпельная продукция"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/adhesive-tapes-dispensers' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkdfbqje01vsxzx1qvsr99k_1772325728_img_0%201.png"
                        alt="Клейкие ленты и диспенсеры"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/stationery-sets' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkdfpgmex8909wq0tk235e0_1772325746_img_0.webp"
                        alt="Канцелярские наборы"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper-trays' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkdr5fgf4fr6732chxmzfpc_1772326016_img_1%201.svg"
                        alt="Лотки и накопители"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/zip-bags' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkdrkx9epptzr97b9bew7xa_1772326025_img_1.webp"
                        alt="ZIP-пакеты"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/drawing-supplies' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjke2ga6f2tr8b91nm77fs6j_1772326357_img_0.webp"
                        alt="Чертежные принадлежности"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/knives-cutters' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjke3d1qfgyaxeh3h3dze7b1_1772326385_img_1.webp"
                        alt="Ножи и резаки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/scissors' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjke7dcvfqdstvvf7q52vz2x_1772326554_img_1.webp"
                        alt="Ножницы"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/covers' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkeefvwfh480gamfzn24xdj_1772326747_img_0.webp"
                        alt="Обложки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/albomy-dlya-risovaniya' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkek58zfe5s3hsa0gztv92z_1772326902_img_1.webp"
                        alt="Альбомы для рисования"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/bumaga-dlya-risovaniya-v-papke' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkekmxtexj9baq00aypzgcq_1772326910_img_0.webp"
                        alt="Бумага для рисования в папке"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/nabory-dlya-tvorchestva' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkftrq8es9tb467vr14etyf_1772328198_img_1.webp"
                        alt="Наборы для творчества"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/zapisnye-knizhki' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkfsm1zerwtrcx0payv7cf3_1772328158_img_0.webp"
                        alt="Записные книжки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/nakleyki' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkh33x8f12bqwpx6hdk8tb0_1772329523_img_0.webp"
                        alt="Наклейки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/planingi-i-ezhednevniki' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkh4hccetardk4s6b7dbjx6_1772329563_img_1%201.svg"
                        alt="Планинги и ежедневники"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/raspisaniya-urokov' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkhc1vhfxetg8g3gqykwxcg_1772329818_img_0.webp"
                        alt="Расписания уроков"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-folderbook' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkhcf82fbmr09y9bedm4nn5_1772329823_img_1.webp"
                        alt="Тетради FolderBook"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-dlya-not' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkhncq9e3jrhaaw6t6r5pyy_1772330116_img_1.webp"
                        alt="Тетради для нот"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-dlya-zapisi-inostrannyh-slov' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkhn26rf1ftze8w2s4t816n_1772330106_img_0.webp"
                        alt="Тетради для записи иностранных слов"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-i-bloknoty' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkkd6sbf7hv4z3f9jrqb1bm_1772331947_img_1.webp"
                        alt="Тетради и блокноты"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-i-bloknoty-s-plastikovoy-oblozhkoy' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkkz7v4ex5tbcfanp01ggfv_1772332533_img_0.webp"
                        alt="Тетради и блокноты с пластиковой обложкой"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-na-koltsakh' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkkz7v4ex5tbcfanp01ggfv_1772332533_img_0.webp"
                        alt="Тетради на кольцах"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-na-skobe-s-kartonnoy-oblozhkoy' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkm91z8e8taw2x65qm8t1cw_1772332855_img_0.webp"
                        alt="Тетради на скобе с картонной обложкой"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-na-spirali-i-bloknoty' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkm9r71frr8ak0fgtpjjp9a_1772332880_img_0.webp"
                        alt="Тетради на спирали и блокноты"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/paper/tetradi-predmetnye' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2bwczebpr8kzpfctzqg0q_1772414746_img_1.webp"
                        alt="Тетради предметные"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/kraski-i-kisti' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                        alt="Краски"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/akvarelnye-kraski' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                        alt="Акварельные краски"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/akrilovye-kraski' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                        alt="Акриловые краски"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/tsvetnye-karandashi' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2f8n7e2mbckde8nkz1jwa_1772414852_img_1.webp"
                        alt="Цветные карандаши"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/karandashi-chernografitnye' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp2t4twfa0vs7qrrnv9y077_1772415209_img_0.webp"
                        alt="Карандаши чернографитные"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/flomastery-i-markery' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp386w8ewnswsebgwadpxhg_1772415673_img_1.webp"
                        alt="Фломастеры и маркеры"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/lastiki' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjkaqcjrf6vbj1r6qpqefjrk_1772322840_img_1.webp"
                        alt="Ластики"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/melki-i-pastel' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp410zxfp6sr3bkp1mw7phn_1772416484_img_0.webp"
                        alt="Мелки и пастель"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/plastilin' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp41kakf7ws000j0ds4kvwa_1772416501_img_1.webp"
                        alt="Пластилин"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/art/aksessuary-dlya-tvorchestva' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp490vkej1vafc94fkbmj0f_1772416756_img_0.webp"
                        alt="Аксессуары для творчества"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/penals' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp47q1je90srprxet631dkk_1772416702_img_0.webp"
                        alt="Пеналы"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/bags' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp4agd9f7xs6wxe0cnwd2jk_1772416792_img_0.webp"
                        alt="Сумки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/----1756164862990-0' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp4bfdbf8wt1evzgmag7kjw_1772416829_img_1.webp"
                        alt="Ранцы и рюкзаки ученические"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/-1756164862998-1' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjp4bfdbf8wt1evzgmag7kjw_1772416829_img_1.webp"
                        alt="Рюкзаки"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/----1756164863000-0' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjpbe53kf3xv5pyqsftmgjxf_1772424257_img_1.webp"
                        alt="Мини-рюкзаки для детей"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/---1756164863012-1' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjpbej8hera8yz38r7ekne9g_1772424265_img_0.webp"
                        alt="Мешки для обуви"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : category.path === '/catalog/backpacks/--1756164863011-0' ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#f7e6ce] catalog-mobile-icon">
                      <Image
                        src="/images/task_01kjpbj400epf9bcpxh6sfa4s5_1772424384_img_0.webp"
                        alt="Сумки-шопперы"
                        width={200}
                        height={200}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                        style={{ maxWidth: 'none', maxHeight: 'none' }}
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {category.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-2">{category.name}</p>
                  </div>
                  <span className="text-gray-400 text-sm flex-shrink-0">›</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Десктопная версия: блоки и карточки */}
      <div className="hidden sm:flex sm:flex-col space-y-10">
        <h1 className="text-3xl font-bold text-gray-900">Каталог канцелярских товаров</h1>

        {categoryGroups.map((group) => (
          <div key={group.title} className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{group.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.items.map((category, idx) => {
                const isActive = pathname === category.path;
                const gradient =
                  idx % 3 === 0
                    ? 'from-blue-500 to-blue-600'
                    : idx % 3 === 1
                    ? 'from-indigo-500 to-purple-600'
                    : 'from-cyan-500 to-blue-500';

                return (
                  <Link
                    key={category.path}
                    href={category.path}
                    className={`group flex items-center gap-4 rounded-2xl border bg-white shadow-sm p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      isActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {category.path === '/catalog/pens' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/category/rucka.webp"
                          alt="Ручки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/markers' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/category/marker.webp"
                          alt="Маркеры"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/sharpeners' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/category/tochilka.webp"
                          alt="Точилки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/leads' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/category/grif.webp"
                          alt="Грифели"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/pencils' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/category/karandash.webp"
                          alt="Карандаши"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/erasers' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkaqcjrf6vbj1r6qpqefjrk_1772322840_img_1.webp"
                          alt="Ластики"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/correctors' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkayqr0e3ps851w3dqyaenc_1772323083_img_0.webp"
                          alt="Корректоры"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/glue' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkb2pq4ftyt3qf8gtnq18kn_1772323214_img_1.webp"
                          alt="Клей"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/adhesive-tapes' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkb461nek18m9v504mc2x0q_1772323259_img_0.webp"
                          alt="Клейкие ленты"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/sticky-notes' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkb9hjweq2snamj2gxeh0zj_1772323433_img_0.webp"
                          alt="Клейкие закладки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/note-paper' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkbgw51f1atk86b0p04rm9g_1772323676_img_1.webp"
                          alt="Бумага для заметок"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/folders' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkc3r5yecj8q4cr2dfaj9h5_1772324296_img_0%20(1).webp"
                          alt="Папки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/perforated-files' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkc5p2jeg7rf8vce2mfd6mz_1772324361_img_1%20(1).webp"
                          alt="Перфофайлы"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/desk-mats' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkc84y9f568gc2be0nxdcws_1772324437_img_0.webp"
                          alt="Подкладки настольные"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/clipboards' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkd8vfjfmz9m7dxamse77af_1772325508_img_0.webp"
                          alt="Планшеты"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/staplers' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkdaa8qfey98ty38h2e834f_1772325561_img_0.webp"
                          alt="Степлеры"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/stamp-products' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkd9gz8f0cbtadg22pt4vsa_1772325534_img_0%20(1).webp"
                          alt="Штемпельная продукция"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/adhesive-tapes-dispensers' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkdfbqje01vsxzx1qvsr99k_1772325728_img_0%201.png"
                          alt="Клейкие ленты и диспенсеры"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/stationery-sets' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkdfpgmex8909wq0tk235e0_1772325746_img_0.webp"
                          alt="Канцелярские наборы"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper-trays' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkdr5fgf4fr6732chxmzfpc_1772326016_img_1%201.svg"
                          alt="Лотки и накопители"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/zip-bags' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkdrkx9epptzr97b9bew7xa_1772326025_img_1.webp"
                          alt="ZIP-пакеты"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/drawing-supplies' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjke2ga6f2tr8b91nm77fs6j_1772326357_img_0.webp"
                          alt="Чертежные принадлежности"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/knives-cutters' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjke3d1qfgyaxeh3h3dze7b1_1772326385_img_1.webp"
                          alt="Ножи и резаки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/scissors' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjke7dcvfqdstvvf7q52vz2x_1772326554_img_1.webp"
                          alt="Ножницы"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/covers' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkeefvwfh480gamfzn24xdj_1772326747_img_0.webp"
                          alt="Обложки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/albomy-dlya-risovaniya' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkek58zfe5s3hsa0gztv92z_1772326902_img_1.webp"
                          alt="Альбомы для рисования"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/bumaga-dlya-risovaniya-v-papke' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkekmxtexj9baq00aypzgcq_1772326910_img_0.webp"
                          alt="Бумага для рисования в папке"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/nabory-dlya-tvorchestva' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkftrq8es9tb467vr14etyf_1772328198_img_1.webp"
                          alt="Наборы для творчества"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/zapisnye-knizhki' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkfsm1zerwtrcx0payv7cf3_1772328158_img_0.webp"
                          alt="Записные книжки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/nakleyki' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkh33x8f12bqwpx6hdk8tb0_1772329523_img_0.webp"
                          alt="Наклейки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/planingi-i-ezhednevniki' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkh4hccetardk4s6b7dbjx6_1772329563_img_1%201.svg"
                          alt="Планинги и ежедневники"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/raspisaniya-urokov' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkhc1vhfxetg8g3gqykwxcg_1772329818_img_0.webp"
                          alt="Расписания уроков"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-folderbook' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkhcf82fbmr09y9bedm4nn5_1772329823_img_1.webp"
                          alt="Тетради FolderBook"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-dlya-not' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkhncq9e3jrhaaw6t6r5pyy_1772330116_img_1.webp"
                          alt="Тетради для нот"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-dlya-zapisi-inostrannyh-slov' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkhn26rf1ftze8w2s4t816n_1772330106_img_0.webp"
                          alt="Тетради для записи иностранных слов"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-i-bloknoty' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkkd6sbf7hv4z3f9jrqb1bm_1772331947_img_1.webp"
                          alt="Тетради и блокноты"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-i-bloknoty-s-plastikovoy-oblozhkoy' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkkz7v4ex5tbcfanp01ggfv_1772332533_img_0.webp"
                          alt="Тетради и блокноты с пластиковой обложкой"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-na-koltsakh' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkkz7v4ex5tbcfanp01ggfv_1772332533_img_0.webp"
                          alt="Тетради на кольцах"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-na-skobe-s-kartonnoy-oblozhkoy' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkm91z8e8taw2x65qm8t1cw_1772332855_img_0.webp"
                          alt="Тетради на скобе с картонной обложкой"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-na-spirali-i-bloknoty' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkm9r71frr8ak0fgtpjjp9a_1772332880_img_0.webp"
                          alt="Тетради на спирали и блокноты"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/paper/tetradi-predmetnye' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2bwczebpr8kzpfctzqg0q_1772414746_img_1.webp"
                          alt="Тетради предметные"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/kraski-i-kisti' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                          alt="Краски"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/akvarelnye-kraski' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                          alt="Акварельные краски"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/akrilovye-kraski' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2ryesfg9bz3eqagq0r7p9_1772415173_img_1.webp"
                          alt="Акриловые краски"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/tsvetnye-karandashi' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2f8n7e2mbckde8nkz1jwa_1772414852_img_1.webp"
                          alt="Цветные карандаши"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/karandashi-chernografitnye' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp2t4twfa0vs7qrrnv9y077_1772415209_img_0.webp"
                          alt="Карандаши чернографитные"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/flomastery-i-markery' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp386w8ewnswsebgwadpxhg_1772415673_img_1.webp"
                          alt="Фломастеры и маркеры"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/lastiki' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjkaqcjrf6vbj1r6qpqefjrk_1772322840_img_1.webp"
                          alt="Ластики"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/melki-i-pastel' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp410zxfp6sr3bkp1mw7phn_1772416484_img_0.webp"
                          alt="Мелки и пастель"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/plastilin' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp41kakf7ws000j0ds4kvwa_1772416501_img_1.webp"
                          alt="Пластилин"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/art/aksessuary-dlya-tvorchestva' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp490vkej1vafc94fkbmj0f_1772416756_img_0.webp"
                          alt="Аксессуары для творчества"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/penals' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp47q1je90srprxet631dkk_1772416702_img_0.webp"
                          alt="Пеналы"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/bags' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp4agd9f7xs6wxe0cnwd2jk_1772416792_img_0.webp"
                          alt="Сумки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/----1756164862990-0' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp4bfdbf8wt1evzgmag7kjw_1772416829_img_1.webp"
                          alt="Ранцы и рюкзаки ученические"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/-1756164862998-1' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjp4bfdbf8wt1evzgmag7kjw_1772416829_img_1.webp"
                          alt="Рюкзаки"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/----1756164863000-0' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjpbe53kf3xv5pyqsftmgjxf_1772424257_img_1.webp"
                          alt="Мини-рюкзаки для детей"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/---1756164863012-1' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjpbej8hera8yz38r7ekne9g_1772424265_img_0.webp"
                          alt="Мешки для обуви"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : category.path === '/catalog/backpacks/--1756164863011-0' ? (
                      <div className="relative h-16 w-16 rounded-full bg-[#f7e6ce]">
                        <Image
                          src="/images/task_01kjpbj400epf9bcpxh6sfa4s5_1772424384_img_0.webp"
                          alt="Сумки-шопперы"
                          width={220}
                          height={220}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none"
                          style={{ maxWidth: 'none', maxHeight: 'none' }}
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-16 w-16 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-bold shadow-sm`}
                      >
                        {category.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base font-semibold leading-snug break-words transition-colors ${
                          isActive ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
                        }`}
                      >
                        {category.name}
                      </p>
                    </div>
                    <span
                      className={`text-lg pl-1 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                      }`}
                    >
                      ›
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="w-full">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Выберите категорию</h3>
            <p className="mt-2 text-sm text-gray-500">
              Выберите категорию товаров из списка выше для просмотра товаров
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}