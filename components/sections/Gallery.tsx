"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/site-data";

const tiles = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export function Gallery() {
  return (
    <section
      id="du-an"
      className="relative bg-white py-14 md:py-20"
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Hoạt Động & Dự Án
          </span>
          <h2
            id="gallery-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            Khoảnh khắc thi công thực tế từ đội ngũ Hưng Thành Phát.
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Hơn 500 công trình lớn nhỏ khắp Đồng Bằng Sông Cửu Long — minh
            chứng sống động cho chất lượng thi công và sự tin tưởng của khách
            hàng.
          </p>
        </div>
      </div>

      <div
        className="relative mt-12 overflow-hidden mask-fade-x pause-on-hover"
        aria-label="Bộ sưu tập hình ảnh công trình thực tế"
      >
        <motion.div
          className="flex w-max gap-5 animate-marquee will-change-transform"
          aria-hidden
        >
          {tiles.map((t, i) => (
            <figure
              key={`${t.label}-${i}`}
              className="group relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-brand/10 shadow-[0_10px_40px_-22px_rgba(10,37,64,0.35)] md:h-64 md:w-96"
            >
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(min-width: 768px) 384px, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/80 via-brand/40 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
                {t.label}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
