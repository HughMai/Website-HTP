"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Hammer, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { HomeBrandBand } from "@/components/sections/HomeBrandBand";
import { SITE, ZALO_URL } from "@/lib/site-data";

const fadeUp = {
  // Only animate Y (no opacity:0) so H1 is visible in HTML immediately → good LCP
  hidden: { y: 24 },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

// One claim per element. The eyebrow owns the workshop, the H1 owns the risk
// reversal, the subhead owns speed, and these three own everything else — the
// hero used to state "500+" and "lắp xong mới thanh toán" twice each.
const trustChips = [
  { icon: ShieldCheck, label: "Bồi thường 100% nếu sai vật tư" },
  { icon: Hammer, label: "500+ công trình đã bàn giao" },
  { icon: BadgeCheck, label: "Thợ của xưởng, không qua thầu phụ" },
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
    src: "/cong-trinh/nk23-cua-nhom-kinh-doi-xam/01.jpg",
    alt: "Cửa đi nhôm kính 2 cánh do Hưng Thành Phát lắp tại Cần Thơ",
  },
];

export function Hero() {
  const primaryHotline = SITE.hotlines[0];

  // The brand band opens the page (Hughie, 14/11/2026), so the hero no longer sits under the
  // fixed navbar and needs no room for it.
  return (
    <>
    <HomeBrandBand />
    <section
      id="trang-chu"
      className="relative overflow-hidden bg-brand pt-8 pb-16 md:pt-12 md:pb-24"
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
            {/* md and up only: on a phone the brand band's trust line says it, and its room
                keeps the form on the first screen. */}
            <motion.span
              variants={fadeUp}
              custom={0}
              className="hidden items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-amber-200 backdrop-blur md:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Xưởng sản xuất tại Cần Thơ từ {SITE.foundedYear}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              id="hero-heading"
              className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:mt-6 md:text-5xl md:leading-[1.05]"
            >
              Cửa Cuốn, Nhôm Kính, Cửa Kéo Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                Uy Tín, Chất Lượng Hàng Đầu
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-xl text-balance text-base text-white/80 md:text-lg"
            >
              Khảo sát và báo giá miễn phí trong ngày, lắp đúng hẹn.
            </motion.p>

            {/* Primary capture — above the fold, two fields */}
            <motion.div variants={fadeUp} custom={3} className="mt-7">
              {/* The ad pages' offer (Hughie, 14/11/2026): the catalog arrives at once, and
                  Hughie sends the total for their door himself within 30 minutes in working
                  hours. */}
              <p className="mb-2 text-sm font-semibold text-white">
                Ghi số Zalo, 30 phút có giá trọn gói cho cửa nhà mình:
              </p>
              <LeadForm source="Hero trang chủ" tone="dark" submitLabel="Nhận giá trọn gói" />
              <p className="mt-2 text-sm text-white/55">
                Nghe máy {SITE.phoneHours}. Hoặc gọi thẳng {primaryHotline} — miễn phí tư vấn, không ép chốt.
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
                  // Only the first shot gets the preload. This grid is
                  // `hidden ... lg:grid`, so below 1024px neither image renders
                  // and the LCP is the H1 text — preloading both meant every
                  // mobile visitor fetched two images they never see. On
                  // desktop only one element can be the LCP, and it is this
                  // one: same size as its sibling but without the mt-10 offset.
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
            { href: "/cua-cuon-can-tho", label: "Cửa cuốn" },
            { href: "/cua-nhom-kinh-can-tho", label: "Cửa nhôm kính" },
            { href: "/cua-keo-can-tho", label: "Cửa kéo" },
            { href: "/lan-can-nhom-kinh-can-tho", label: "Lan can kính" },
            { href: "/sua-chua-cua-cuon-can-tho", label: "Sửa cửa cuốn" },
            { href: "/cong-trinh", label: "Công trình đã làm" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 transition hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
    </>
  );
}
