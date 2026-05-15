"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Sparkles, Wrench } from "lucide-react";
import Image from "next/image";

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
    title: "Đúng vật liệu cam kết — bồi thường 200% nếu sai",
    body: "Mỗi bộ cửa đều có CO/CQ chứng nhận xuất xứ. Sai một chi tiết nhỏ — bồi thường gấp đôi giá trị hợp đồng. Không có ngoại lệ.",
  },
  {
    icon: Wrench,
    title: "Có mặt trong ngày khảo sát — lắp đúng ngày hẹn",
    body: "Đội kỹ thuật thường trực tại Cần Thơ, không tính phí đi lại nội thành. Có mặt trong ngày để khảo sát — lắp đúng ngày hẹn đã cam kết.",
  },
  {
    icon: Sparkles,
    title: "Lắp xong mới trả tiền — không lo bị ép",
    body: "Chúng tôi không nhận trước toàn bộ. Chạy thử, kiểm tra hài lòng, ký nghiệm thu — rồi mới thanh toán. Đơn giản vậy thôi.",
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
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="about-layout"
        >
          {/* Zone 1: badge + heading */}
          <motion.div variants={item} className="about-zone-top">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Về Hưng Thành Phát Door
            </span>
            <h2
              id="about-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
            >
              21 năm, 500+ công trình —
              <br className="hidden sm:block" />
              chưa một khách nào gọi lại vì sai vật liệu.
            </h2>
          </motion.div>

          {/* Zone 2: showroom photo — between heading and body on mobile */}
          <motion.div variants={item} className="about-zone-photo relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/showroom.jpg"
              alt="Showroom Hưng Thành Phát Door tại 235-237 Võ Văn Kiệt, Bình Thủy, Cần Thơ"
              fill
              className="object-cover object-top"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/70 to-transparent px-5 pb-4 pt-10">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/90">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-white/70" aria-hidden />
                235–237 Võ Văn Kiệt, Bình Thủy, Cần Thơ
              </p>
            </div>
          </motion.div>

          {/* Zone 3: body paragraph + pillars */}
          <motion.div variants={item} className="about-zone-bottom">
            <p className="text-base leading-relaxed text-brand/75">
              Năm 2005, Hưng Thành Phát là đơn vị đầu tiên sản xuất và lắp
              đặt cửa cuốn tại Cần Thơ — khởi nghiệp tại 105 Đường 3/2 với
              một cam kết duy nhất: lắp đúng thứ đã báo giá. Không thay thế
              vật liệu rẻ hơn sau khi ký hợp đồng. Không làm tắt để tiết kiệm
              thời gian. Năm 2022 chuyển về showroom hiện tại 235–237 Võ Văn
              Kiệt, Bình Thủy — 21 năm sau, 500+ công trình từ nhà phố đến nhà
              xưởng công nghiệp, cam kết đó vẫn còn nguyên.
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
        </motion.div>
      </div>
    </section>
  );
}
