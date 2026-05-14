"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES, SITE } from "@/lib/site-data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Products() {
  const scrollContact = () =>
    document.getElementById("lien-he")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="san-pham"
      className="relative bg-gray-50 py-14 md:py-20"
      aria-labelledby="products-heading"
    >
      <div className="container">
        {/* Section intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Sản Phẩm Chủ Lực
          </span>
          <h2
            id="products-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            Cửa nào phù hợp công trình của bạn?
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Chúng tôi tư vấn loại cửa phù hợp theo ngân sách và mục đích —
            không upsell loại đắt hơn nếu không cần thiết. Bảo hành chính
            hãng, thi công trọn gói tại Cần Thơ.
          </p>
        </div>

        {/* Category blocks */}
        <div className="mt-14 space-y-14">
          {PRODUCT_CATEGORIES.map((cat) => {
            const upper = `${cat.name} ${SITE.brand}`.toUpperCase();
            return (
              <motion.div
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                variants={container}
              >
                {/* Category header — matches reference: title left, "Xem tất cả" right */}
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-brand/15 pb-3">
                  <div>
                    <div className="h-0.5 w-12 rounded-full bg-amber-400" />
                    <h3 className="mt-2 text-lg font-extrabold uppercase tracking-wider text-brand md:text-xl">
                      {upper}
                    </h3>
                    <p className="mt-1 text-sm text-brand/65">{cat.tagline}</p>
                  </div>
                  <button
                    onClick={scrollContact}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand/70 transition hover:text-brand"
                  >
                    Xem tất cả <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtypes grid */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  {cat.subtypes.map((s) => (
                    <motion.article
                      key={s.name}
                      variants={card}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      className="group cursor-pointer overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-brand/10 transition-shadow hover:shadow-lg"
                      onClick={scrollContact}
                    >
                      <div className={cn("relative aspect-[340/300] w-full overflow-hidden", (cat as any).contain ? "bg-white p-4" : "bg-brand-50")}>
                        <Image
                          src={s.image}
                          alt={`${s.name} — lắp đặt tại Cần Thơ`}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 50vw"
                          className={cn(
                            "transition-transform duration-500 group-hover:scale-[1.04]",
                            (cat as any).contain ? "object-contain" : "object-cover object-top"
                          )}
                        />
                      </div>
                      <div className="border-t border-brand/10 bg-gray-50 px-3 py-3 text-left">
                        <p className="min-h-[2.4em] text-[11px] font-bold uppercase leading-snug tracking-wider text-brand md:text-xs">
                          {s.name}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
