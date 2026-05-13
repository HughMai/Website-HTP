"use client";

import { motion } from "framer-motion";
import { MessageSquare, PencilRuler, HardHat, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tư Vấn",
    description:
      "Liên hệ tư vấn và ước lượng quy mô sản phẩm phù hợp với công trình của Quý khách.",
  },
  {
    number: "02",
    icon: PencilRuler,
    title: "Thiết Kế",
    description:
      "Phác họa và tính toán chi tiết kích thước, vật liệu cho dự án sắp thực hiện.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Thi Công Lắp Đặt",
    description:
      "Đội ngũ thi công giàu kinh nghiệm, chuyên nghiệp, đúng tiến độ cam kết.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Thanh Toán & Bảo Trì",
    description:
      "Bảo trì theo kỳ hạn tiêu chuẩn của nhà sản xuất. Bảo hành sản phẩm 5–10 năm.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Process() {
  return (
    <section
      id="quy-trinh"
      className="relative overflow-hidden bg-brand py-14 text-white md:py-20"
      aria-labelledby="process-heading"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            Quy Trình Thực Hiện
          </span>
          <h2
            id="process-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            4 bước đơn giản — từ tư vấn đến bàn giao.
          </h2>
          <p className="mt-3 text-sm font-medium text-amber-300">
            Bồi thường 200% tổng giá trị hợp đồng nếu sử dụng không đúng chủng
            loại, thương hiệu đã cam kết.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Dashed connector line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t-2 border-dashed border-white/20 lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle icon */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-brand shadow-lg ring-4 ring-brand">
                    <Icon className="h-8 w-8 text-amber-300" aria-hidden />
                    {/* Step number badge */}
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-brand">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
