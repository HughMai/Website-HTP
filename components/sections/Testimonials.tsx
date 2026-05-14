"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Nhiên Nguyễn",
    initial: "N",
    color: "bg-pink-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Cửa hàng buôn bán rất uy tín, chất lượng. Cửa sử dụng bền, đẹp lắm mọi người ơi. Đặt biệt là vợ chồng chị chủ rất nhiệt tình, tư vấn kỹ, giá lại rẻ nữa. Bạn mình dọ giá ở các nơi khác rất nhiều. Đặt mua tại Hưng Thành Phát vận chuyển về Sóc Trăng mà vẫn rẻ hơn chỗ khác gần 1 triệu luôn.",
  },
  {
    name: "Thắng Võ Minh",
    initial: "T",
    color: "bg-blue-600",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Biết đến Hưng Thành Phát Door qua người quen giới thiệu. Cửa hàng có tiếng ở Cần Thơ về cửa cuốn và cửa nhôm kính, làm việc uy tín và bảo hành rõ ràng. Đáng tin cậy cho ai đang tìm nơi lắp đặt cửa chất lượng tại khu vực!",
  },
  {
    name: "Cương Trương Kim",
    initial: "C",
    color: "bg-emerald-600",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Mình đã lắp cửa cuốn tại Hưng Thành Phát Door và rất hài lòng với chất lượng dịch vụ. Đội ngũ thi công chuyên nghiệp, đúng tiến độ, dọn dẹp sạch sẽ sau khi hoàn thành. Sản phẩm chắc chắn, vận hành êm. Chủ cửa hàng tư vấn thật tâm, không ép mua. Sẽ quay lại khi có nhu cầu.",
  },
  {
    name: "Tien My Vo",
    initial: "T",
    color: "bg-amber-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Năm ngoái mình đặt cửa ở đây, sài bền tới nay, nhân viên hỗ trợ nhiệt tình, cần sửa chữa cũng nhanh chóng.",
  },
  {
    name: "Phan Thị Hồng Nhung",
    initial: "P",
    color: "bg-violet-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Gia đình mình đã lắp cửa cuốn tại Hưng Thành Phát Door và rất hài lòng. Đội ngũ thi công chuyên nghiệp, đúng tiến độ, dọn dẹp sạch sẽ. Sản phẩm chắc chắn, vận hành êm và sử dụng được rất lâu dài. Chủ cửa hàng tư vấn tận tâm và chân thật.",
  },
  {
    name: "Mai Hugh",
    initial: "M",
    color: "bg-rose-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Cửa hàng uy tín, sản phẩm chất lượng tốt, lắp đặt nhanh gọn và đúng hẹn. Nhân viên tư vấn nhiệt tình, giá cả hợp lý. Rất hài lòng.",
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

function ReviewCard({ name, initial, color, date, stars, body }: (typeof reviews)[number]) {
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
            <p className="truncate text-xs text-slate-400">{date}</p>
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
          href="https://www.google.com/maps/place/H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door/@10.0485097,105.7548479,17z/data=!4m8!3m7!1s0x31a08946f6a96a07:0xb1d3630ae8534a1b!8m2!3d10.0485044!4d105.7574228!9m1!1b1!16s%2Fg%2F11lwgjdghy?entry=ttu"
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
