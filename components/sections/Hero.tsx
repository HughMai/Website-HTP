"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Hammer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustChips = [
  { icon: ShieldCheck, label: "Bảo hành đến 10 năm" },
  { icon: Hammer, label: "Thi công trọn gói" },
  { icon: BadgeCheck, label: "Vật liệu chính hãng" },
];

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden bg-brand pt-28 pb-20 md:pt-36 md:pb-28"
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
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Đối tác cửa số 1 cho công trình cao cấp
          </motion.span>

          <motion.h1
            variants={fadeUp}
            custom={1}
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.05]"
          >
            Cửa Cuốn, Cửa Kéo & Nhôm Kính —{" "}
            <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
              Cao Cấp Tại Cần Thơ
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg"
          >
            Hưng Thành Phát Door cung cấp đa dạng hệ thống cửa cuốn, cửa kéo
            và cửa nhôm kính — trải rộng từ phân khúc phổ thông đến cao cấp —
            với cam kết về chất lượng bền vững, vận hành ổn định và thiết kế
            tinh tế, đáp ứng yêu cầu của từng công trình.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-white/90"
              onClick={() => scrollTo("san-pham")}
            >
              Khám Phá Sản Phẩm
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
              onClick={() => scrollTo("lien-he")}
            >
              Nhận Báo Giá Miễn Phí
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            custom={4}
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Cam kết dịch vụ"
          >
            {trustChips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-white/85"
              >
                <Icon className="h-4 w-4 text-emerald-300" aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
