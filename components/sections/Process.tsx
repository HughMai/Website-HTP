"use client";

import { motion } from "framer-motion";
import { MessageSquare, PencilRuler, HardHat, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tư Vấn",
    description:
      "Gọi hoặc nhắn tin — kỹ thuật viên tư vấn sơ bộ ngay, đặt lịch khảo sát miễn phí tại nhà trong ngày.",
  },
  {
    number: "02",
    icon: PencilRuler,
    title: "Khảo Sát & Báo Giá",
    description:
      "Đo đạc thực tế, báo giá chi tiết từng hạng mục — vật tư, motor, nhân công — không phát sinh ẩn.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Thi Công Lắp Đặt",
    description:
      "Thợ lắp đúng ngày hẹn, bảo vệ sàn và tường, dọn dẹp gọn gàng. Hầu hết công trình nhà phố tiêu chuẩn hoàn thành trong 1 ngày làm việc.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Nghiệm Thu — Rồi Mới Thanh Toán",
    description:
      "Chạy thử toàn hệ thống trước mặt bạn, ký nghiệm thu, rồi mới thanh toán. Bồi thường 200% nếu sai vật liệu cam kết.",
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
      className="relative overflow-hidden bg-brand py-10 text-white md:py-20"
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
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:mt-4 md:text-4xl"
          >
            4 bước đơn giản — từ tư vấn đến bàn giao.
          </h2>
          <p className="mt-2 text-xs font-medium text-amber-300 md:mt-3 md:text-sm">
            Bồi thường 200% tổng giá trị hợp đồng nếu sử dụng không đúng chủng
            loại, thương hiệu đã cam kết.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-8 md:mt-16">
          {/* Dashed connector line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-white/20 lg:block"
          />

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:grid-cols-4">
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
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-brand shadow-lg ring-4 ring-brand md:h-20 md:w-20">
                    <Icon className="h-6 w-6 text-amber-300 md:h-8 md:w-8" aria-hidden />
                    {/* Step number badge */}
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-brand md:h-6 md:w-6 md:text-[10px]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-white md:mt-5 md:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/65 md:mt-2 md:text-sm">
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
