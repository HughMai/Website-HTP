"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Anh Minh Tuấn",
    initial: "M",
    color: "bg-blue-600",
    location: "Ninh Kiều, Cần Thơ",
    date: "2 tuần trước",
    stars: 5,
    body: "Đội kỹ thuật đến đúng giờ, lắp đặt gọn gàng, không để lại bụi bẩn. Cửa vận hành cực êm so với cửa cuốn thép cũ trước đây. Rất hài lòng.",
  },
  {
    name: "Chị Lan Phương",
    initial: "L",
    color: "bg-pink-500",
    location: "Bình Thủy, Cần Thơ",
    date: "1 tháng trước",
    stars: 5,
    body: "Báo giá rõ ràng từ đầu, không phát sinh thêm. Thi công nhanh trong một buổi sáng. Đã dùng được 2 năm không có vấn đề gì.",
  },
  {
    name: "Anh Quốc Hùng",
    initial: "Q",
    color: "bg-emerald-600",
    location: "Cái Răng, Cần Thơ",
    date: "3 tuần trước",
    stars: 5,
    body: "Cần lắp gấp trước ngày khai trương, Hưng Thành Phát sắp xếp đội thi công trong 2 ngày. Chất lượng nhôm kính rất tốt, cách âm hiệu quả.",
  },
  {
    name: "Chị Thu Hà",
    initial: "T",
    color: "bg-rose-500",
    location: "Ô Môn, Cần Thơ",
    date: "2 tháng trước",
    stars: 5,
    body: "Gọi lúc 8 giờ sáng, kỹ thuật viên có mặt trước 10 giờ. Chẩn đoán đúng lỗi bo mạch, sửa xong trong buổi. Giá minh bạch như báo từ đầu.",
  },
  {
    name: "Anh Thanh Nam",
    initial: "N",
    color: "bg-amber-500",
    location: "Thốt Nốt, Cần Thơ",
    date: "1 tháng trước",
    stars: 5,
    body: "Đã làm 2 cửa cuốn và 1 cửa nhôm kính, đều ưng ý. Vật liệu đúng như cam kết, không bị đổi hàng. Tin tưởng thương hiệu này rồi.",
  },
  {
    name: "Anh Hoàng Phúc",
    initial: "P",
    color: "bg-cyan-600",
    location: "Phong Điền, Cần Thơ",
    date: "3 tháng trước",
    stars: 5,
    body: "Tư vấn tận tình, đo đạc kỹ càng, báo giá rõ ràng từng hạng mục. Không phát sinh thêm gì cả so với báo giá ban đầu.",
  },
  {
    name: "Chị Thu Mai",
    initial: "M",
    color: "bg-violet-500",
    location: "Vĩnh Thạnh, Cần Thơ",
    date: "2 tuần trước",
    stars: 5,
    body: "Cửa cuốn lắp xong chạy rất êm, remote bắt sóng nhanh. Đội thi công đúng giờ, làm việc cẩn thận. Rất hài lòng, sẽ giới thiệu bạn bè!",
  },
  {
    name: "Anh Văn Tài",
    initial: "T",
    color: "bg-indigo-500",
    location: "Ninh Kiều, Cần Thơ",
    date: "1 tháng trước",
    stars: 5,
    body: "Bảo hành rõ ràng, có vấn đề gọi là ra sửa liền không nói khó. Giá cả minh bạch, thợ thân thiện và chuyên nghiệp.",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function ReviewCard({ name, initial, color, location, date, stars, body }: (typeof reviews)[number]) {
  return (
    <div className="mx-3 flex w-72 shrink-0 flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.07)] ring-1 ring-black/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
            <p className="truncate text-xs text-slate-400">{location} · {date}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${stars} sao`}>
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
        ))}
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-slate-600">
        &ldquo;{body}&rdquo;
      </p>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Testimonials() {
  // Duplicate array for seamless infinite loop
  const track = [...reviews, ...reviews];

  return (
    <section
      id="danh-gia"
      className="overflow-hidden bg-slate-50 py-12 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <style>{`
        @keyframes htp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .htp-marquee-track {
          animation: htp-marquee 40s linear infinite;
          will-change: transform;
        }
        .htp-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="container mb-8 text-center md:mb-12"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand/80">
          Khách Hàng Nói Gì
        </span>
        <h2
          id="testimonials-heading"
          className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-800 md:mt-4 md:text-4xl"
        >
          500+ công trình — khách hàng tin tưởng.
        </h2>
        <p className="mt-2 text-sm text-slate-500 md:mt-3">
          Đánh giá thực tế từ khách hàng trên Google Business.
        </p>
      </motion.div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent md:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent md:w-32"
        />

        <div className="htp-marquee-track flex w-max py-4">
          {track.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>

      {/* Google Maps CTA */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="container mt-8 text-center text-sm text-slate-400"
      >
        Xem thêm đánh giá trên{" "}
        <a
          href="https://www.google.com/maps/place/H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door/@10.0484783,105.7548398,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline underline-offset-2 hover:text-brand/70"
        >
          Google Maps
        </a>
      </motion.p>
    </section>
  );
}
