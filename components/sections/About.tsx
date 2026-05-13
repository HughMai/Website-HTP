"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Wrench } from "lucide-react";
import { STATS } from "@/lib/site-data";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const pillars = [
  {
    icon: Award,
    title: "Chất lượng đạt chuẩn quốc tế",
    body: "Toàn bộ vật tư đạt tiêu chuẩn JIS / EN, bảo chứng bằng chứng nhận xuất xứ rõ ràng cho từng công trình.",
  },
  {
    icon: Wrench,
    title: "Đội ngũ kỹ thuật chuyên nghiệp",
    body: "Khảo sát, thiết kế, lắp đặt và bảo trì khép kín — thi công đúng tiến độ, gọn gàng, an toàn lao động.",
  },
  {
    icon: Sparkles,
    title: "Công nghệ vận hành thông minh",
    body: "Tích hợp motor lưu điện, điều khiển từ xa và kết nối điện thoại — kiểm soát ngôi nhà mọi lúc, mọi nơi.",
  },
];

export function About() {
  return (
    <section
      id="gioi-thieu"
      className="relative bg-white py-14 md:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
          className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]"
        >
          {/* Left: copy */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Về Hưng Thành Phát Door
            </span>
            <h2
              id="about-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
            >
              15 năm dựng xây niềm tin —
              <br className="hidden sm:block" />
              từng cánh cửa là một cam kết.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand/75">
              Khởi đầu năm 2008 tại Cần Thơ, chúng tôi từng bước trở thành
              đơn vị dẫn đầu trong lĩnh vực cung cấp và thi công cửa kỹ thuật
              cao tại khu vực Đồng bằng sông Cửu Long và toàn miền Nam. Hơn
              500 dự án nhà phố, biệt thự, văn phòng và nhà máy đã được Hưng
              Thành Phát bàn giao với sự tỉ mỉ, tận tâm và bền vững theo thời
              gian.
            </p>

            <ul className="mt-8 space-y-5">
              {pillars.map(({ icon: Icon, title, body }) => (
                <motion.li
                  variants={item}
                  key={title}
                  className="flex gap-4"
                >
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand/70">
                      {body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className={
                  "group relative overflow-hidden rounded-2xl border border-brand/10 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(10,37,64,0.18)] " +
                  (i % 3 === 0
                    ? "sm:translate-y-4"
                    : i % 3 === 2
                    ? "sm:translate-y-4"
                    : "")
                }
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
                />
                <p className="text-3xl font-semibold tracking-tight text-brand md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand/70">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand/65">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
