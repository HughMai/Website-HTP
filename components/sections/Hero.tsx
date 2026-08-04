"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Hammer, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { SITE, ZALO_URL } from "@/lib/site-data";

const fadeUp = {
  // Only animate Y (no opacity:0) so H1 is visible in HTML immediately → good LCP
  hidden: { y: 24 },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustChips = [
  { icon: ShieldCheck, label: "Bồi thường 200% nếu sai vật liệu" },
  { icon: Hammer, label: "500+ công trình từ 2005" },
  { icon: BadgeCheck, label: "Lắp xong mới thanh toán" },
];

// Real installs from the công trình library — the arch frames echo a door
// opening. These must never be catalogue stock: the supplier photos that used
// to sit here carried a competitor's watermark.
const heroShots = [
  {
    src: "/cong-trinh/p01-cc-nan-bac/01.jpg",
    alt: "Cửa cuốn nan nhôm do Hưng Thành Phát lắp tại Cần Thơ",
  },
  {
    src: "/cong-trinh/nk38-cua-nhom-4-canh-xam/01.jpg",
    alt: "Cửa đi nhôm kính 4 cánh do Hưng Thành Phát lắp tại Cần Thơ",
  },
];

export function Hero() {
  const primaryHotline = SITE.hotlines[0];

  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden bg-brand pt-24 pb-16 md:pt-32 md:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 80% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* ── Copy + capture ── */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-amber-200 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Phục vụ Cần Thơ từ {SITE.foundedYear} — 500+ công trình
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              id="hero-heading"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.05]"
            >
              Cửa Cuốn, Nhôm Kính, Cửa Kéo{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                Cần Thơ
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-xl text-balance text-base text-white/80 md:text-lg"
            >
              Khảo sát và báo giá miễn phí trong ngày. Lắp đúng hẹn, lắp xong
              mới thanh toán — bồi thường 200% nếu dùng sai vật liệu cam kết.
            </motion.p>

            {/* Primary capture — above the fold, two fields */}
            <motion.div variants={fadeUp} custom={3} className="mt-7">
              <p className="mb-2 text-sm font-semibold text-white">
                Để lại số — thợ gọi lại trong ít phút:
              </p>
              <LeadForm source="Hero trang chủ" tone="dark" />
              <p className="mt-2 text-xs text-white/55">
                Hoặc gọi thẳng {primaryHotline} — miễn phí tư vấn, không ép chốt.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-brand hover:bg-white/90"
              >
                <a href={`tel:${primaryHotline.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  Gọi {primaryHotline}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
              >
                <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
                  Nhắn Zalo
                </a>
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              custom={5}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Cam kết dịch vụ"
            >
              {trustChips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-white/85"
                >
                  <Icon className="h-4 w-4 text-amber-300" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Arch-framed product shots (the one visual idea borrowed) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden grid-cols-2 gap-4 lg:grid"
            aria-hidden
          >
            {heroShots.map((shot, i) => (
              <div
                key={shot.src}
                className={
                  "relative aspect-[3/4] overflow-hidden rounded-t-full border-2 border-amber-400/60 " +
                  (i === 1 ? "mt-10" : "")
                }
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 0px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Quick jump into the catalog — mirrors Mitadoor's category entry points */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6"
          aria-label="Danh mục sản phẩm nhanh"
        >
          {[
            { href: "/cua-cuon-nhom-can-tho", label: "Cửa cuốn" },
            { href: "/cua-nhom-kinh-can-tho", label: "Cửa nhôm kính" },
            { href: "/cua-keo-can-tho", label: "Cửa kéo" },
            { href: "/lan-can-nhom-kinh-can-tho", label: "Lan can kính" },
            { href: "/sua-chua-cua-cuon-can-tho", label: "Sửa cửa cuốn" },
            { href: "/cong-trinh", label: "Công trình đã làm" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
