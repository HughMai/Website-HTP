"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Anh Minh Tuấn",
    location: "Ninh Kiều, Cần Thơ",
    project: "Cửa cuốn nhôm Đức — nhà phố 4m",
    body: "Đội kỹ thuật đến đúng giờ, lắp đặt gọn gàng, không để lại bụi bẩn. Cửa vận hành cực êm so với cửa cuốn thép cũ trước đây. Rất hài lòng.",
    stars: 5,
  },
  {
    name: "Chị Lan Phương",
    location: "Bình Thủy, Cần Thơ",
    project: "Cửa kéo thép — mặt tiền cửa hàng",
    body: "Báo giá rõ ràng từ đầu, không phát sinh thêm. Thi công nhanh trong một buổi sáng. Đã dùng được 2 năm không có vấn đề gì.",
    stars: 5,
  },
  {
    name: "Anh Quốc Hùng",
    location: "Cái Răng, Cần Thơ",
    project: "Hệ cửa nhôm kính — văn phòng",
    body: "Cần lắp gấp trước ngày khai trương, Hưng Thành Phát sắp xếp đội thi công trong 2 ngày. Chất lượng nhôm kính rất tốt, cách âm hiệu quả.",
    stars: 5,
  },
  {
    name: "Chị Thu Hà",
    location: "Ô Môn, Cần Thơ",
    project: "Sửa motor cửa cuốn — nhà xưởng",
    body: "Gọi lúc 8 giờ sáng, kỹ thuật viên có mặt trước 10 giờ. Chẩn đoán đúng lỗi bo mạch, sửa xong trong buổi. Giá minh bạch như báo từ đầu.",
    stars: 5,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Testimonials() {
  return (
    <section
      id="danh-gia"
      className="relative bg-white py-14 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Khách Hàng Nói Gì
          </span>
          <h2
            id="testimonials-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            500+ công trình — khách hàng tin tưởng.
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Từ nhà phố Ninh Kiều đến nhà xưởng Cái Răng — chúng tôi đồng hành cùng
            từng công trình với cam kết bảo hành dài hạn.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              variants={card}
              className="flex flex-col rounded-2xl border border-brand/10 bg-gray-50 p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${r.stars} sao`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Body */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand/80">
                &ldquo;{r.body}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 border-t border-brand/10 pt-4">
                <p className="text-sm font-semibold text-brand">{r.name}</p>
                <p className="text-xs text-brand/55">{r.location}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand/45">
                  {r.project}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google reviews CTA */}
        <p className="mt-8 text-center text-sm text-brand/50">
          Xem thêm đánh giá của khách hàng trên{" "}
          <a
            href="https://www.google.com/maps/place/H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door/@10.0484783,105.7548398,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline underline-offset-2 hover:text-brand/80"
          >
            Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
