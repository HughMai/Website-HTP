"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONG_TRINH, CONG_TRINH_CATEGORIES } from "@/lib/cong-trinh-data";

// Commercial priority, not data order — cửa cuốn is the P1 keyword and the
// highest-volume product, so it leads and is the tab that opens by default.
const TAB_ORDER = [
  "cua_cuon",
  "nhom_kinh",
  "cua_keo",
  "lan_can",
  "cong_vach",
  "nha_xuong",
  "khac",
] as const;

// Only the categories that actually carry enough installs to fill a row.
const TABS = TAB_ORDER.map((key) =>
  CONG_TRINH_CATEGORIES.find((c) => c.key === key)
)
  .filter((c): c is (typeof CONG_TRINH_CATEGORIES)[number] => !!c)
  .filter((c) => CONG_TRINH.filter((p) => p.category === c.key).length >= 6);

export function CongTrinhShowcase() {
  const [active, setActive] = React.useState(TABS[0]?.key ?? "cua_cuon");

  const items = React.useMemo(
    () => CONG_TRINH.filter((p) => p.category === active).slice(0, 8),
    [active]
  );

  return (
    <section
      id="du-an"
      className="bg-white py-14 md:py-20"
      aria-labelledby="cong-trinh-heading"
    >
      <div className="container">
        {/* Section intro — eyebrow + headline, the Mitadoor rhythm */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Công Trình Tiêu Biểu
          </span>
          <h2
            id="cong-trinh-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            {CONG_TRINH.length}+ công trình đã bàn giao tại Cần Thơ
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Toàn bộ hình dưới đây là ảnh chụp thực tế tại công trình — không
            phải ảnh mẫu, không phải ảnh catalogue.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0"
          role="tablist"
          aria-label="Lọc công trình theo loại"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                active === t.key
                  ? "border-brand bg-brand text-white"
                  : "border-brand/15 bg-white text-brand/70 hover:border-brand/40 hover:text-brand"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {items.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-brand/10 transition-shadow hover:shadow-lg"
            >
              <Link href={`/cong-trinh/${p.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                  <Image
                    src={p.cover}
                    alt={`${p.title}${p.location ? ` — ${p.location}` : ""}, Cần Thơ`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-1 text-sm font-semibold text-brand">
                    {p.title}
                  </h3>
                  {p.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-brand/60">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                      <span className="line-clamp-1">{p.location}</span>
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/cong-trinh"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Xem tất cả {CONG_TRINH.length} công trình
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
