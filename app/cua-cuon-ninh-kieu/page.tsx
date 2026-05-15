import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Ninh Kiều Cần Thơ — Lắp Đặt",
  description:
    "Cửa cuốn Ninh Kiều Cần Thơ — lắp đặt nhà phố, mặt tiền kinh doanh, căn hộ trung tâm. Khảo sát miễn phí, lắp xong trong ngày, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-ninh-kieu` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-ninh-kieu`,
    title: "Cửa Cuốn Ninh Kiều Cần Thơ — Lắp Đặt",
    description:
      "Cửa cuốn Ninh Kiều — lắp nhà phố mặt tiền, khảo sát miễn phí, bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm định hình nhập khẩu — vận hành êm tuyệt đối, thẩm mỹ cao. Lựa chọn số một cho nhà phố và mặt tiền kinh doanh tại Ninh Kiều.",
    tag: "Phổ biến nhất Ninh Kiều",
  },
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Tole thép sơn bột tĩnh điện chống gỉ — giá hợp lý, độ bền cao. Phù hợp kho chứa hàng và mặt tiền kinh doanh cần tiết kiệm chi phí.",
    tag: "Giá tốt nhất",
  },
  {
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox chống gỉ hoàn toàn, sáng bóng — lý tưởng cho nhà hàng, quán ăn và spa trong khu trung tâm Ninh Kiều.",
    tag: "Sang trọng — Trung tâm",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Tấm nhôm liền khối không khe hở — cách âm, cách nhiệt vượt trội. Lý tưởng cho garage và phòng điều hòa trung tâm.",
    tag: "Cách âm tốt nhất",
  },
];

const localHighlights = [
  {
    icon: "🏙️",
    title: "Chuyên phục vụ nhà phố mặt tiền",
    desc: "Ninh Kiều là trung tâm thương mại sầm uất nhất Cần Thơ. Chúng tôi có kinh nghiệm lắp hàng trăm cửa cuốn cho nhà phố mặt tiền, quán ăn, shop và văn phòng tại đây.",
  },
  {
    icon: "⚡",
    title: "Từ showroom đến Ninh Kiều — 15 phút",
    desc: "Showroom tại Bình Thủy, chỉ 15 phút đến trung tâm Ninh Kiều. Kỹ thuật viên có mặt nhanh, lắp xong trong buổi — không làm gián đoạn kinh doanh của bạn.",
  },
  {
    icon: "🔧",
    title: "Sửa chữa khẩn cấp tại trung tâm",
    desc: "Cửa hỏng giữa giờ kinh doanh? Đội kỹ thuật hỗ trợ khẩn cấp tại toàn bộ Ninh Kiều — ưu tiên xử lý nhanh để bạn không mất doanh thu.",
  },
  {
    icon: "🏆",
    title: "21 năm uy tín tại Cần Thơ",
    desc: "Từ năm 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. Hàng nghìn công trình tại trung tâm thành phố. Uy tín được kiểm chứng qua thời gian.",
  },
];

const areas = [
  "Phường An Bình", "Phường An Cư", "Phường An Hòa",
  "Phường An Hội", "Phường An Lạc", "Phường An Nghiệp",
  "Phường An Phú", "Phường Cái Khế", "Phường Hưng Lợi",
  "Phường Tân An", "Phường Thới Bình",
];

const faqItems = [
  {
    question: "Cửa cuốn Ninh Kiều giá bao nhiêu?",
    answer:
      "Giá cửa cuốn tại Ninh Kiều từ 500.000đ/m² (tole Đài Loan) đến 2.300.000đ/m² (nhôm công nghệ Đức), chưa bao gồm motor và VAT. Liên hệ 0945 042 345 để được khảo sát và báo giá miễn phí tận nơi.",
  },
  {
    question: "Nhà phố mặt tiền Ninh Kiều nên chọn cửa cuốn gì?",
    answer:
      "Nhà phố mặt tiền tại Ninh Kiều nên chọn cửa cuốn nhôm công nghệ Đức — thẩm mỹ cao, vận hành êm, không gỉ sét và bền 20–30 năm. Với quán ăn hoặc shop gần sông thì cửa cuốn inox SUS 304 là lựa chọn tối ưu nhờ khả năng chống ẩm tuyệt đối.",
  },
  {
    question: "Lắp cửa cuốn tại Ninh Kiều có mất phí đi lại không?",
    answer:
      "Khảo sát và báo giá miễn phí. Phí đi lại (nếu có) sẽ được thông báo rõ trước khi ký hợp đồng — thường được tính vào gói lắp đặt trọn gói, không phát sinh sau khi ký.",
  },
  {
    question: "Lắp cửa cuốn mất bao lâu?",
    answer:
      "Thông thường 2–4 giờ cho một cửa cuốn tiêu chuẩn, lắp xong trong cùng ngày. Với công trình lớn hoặc cần đục tường, có thể mất 1 ngày. Đặt lịch trước để tránh ảnh hưởng đến giờ kinh doanh.",
  },
  {
    question: "Cửa cuốn bảo hành bao lâu?",
    answer:
      "Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất — tối thiểu 5 năm cho cửa cuốn nhôm, 10 năm cho một số dòng cao cấp. Trong thời gian bảo hành, sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-ninh-kieu#service`,
      name: "Cửa Cuốn Ninh Kiều Cần Thơ",
      description:
        "Lắp đặt và sửa chữa cửa cuốn tại Ninh Kiều, Cần Thơ — nhôm đức, thép tĩnh điện, inox, tấm liền. Bảo hành chính hãng.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: "235-237 Võ Văn Kiệt",
          addressLocality: "Bình Thủy",
          addressRegion: "Cần Thơ",
          addressCountry: "VN",
        },
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Ninh Kiều, Cần Thơ" },
        ...areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a}, Ninh Kiều, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-ninh-kieu#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang Chủ", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Ninh Kiều", item: `${siteUrl}/cua-cuon-ninh-kieu` },
      ],
    },
  ],
};

export default function CuaCuonNinhKieu() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Phục vụ toàn bộ quận Ninh Kiều
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Ninh Kiều —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Lắp Đặt Tại Trung Tâm Cần Thơ, Lắp Xong Trong Ngày
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Chuyên lắp cửa cuốn nhà phố, mặt tiền kinh doanh và căn hộ tại Ninh Kiều — khảo sát miễn phí,
              tư vấn tại chỗ, bảo hành chính hãng 5–10 năm.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href={SITE.mapDirectionsUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  <MapPin className="h-4 w-4" /> Xem trên bản đồ
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Local highlights */}
        <section className="py-14 border-b">
          <div className="container max-w-4xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {localHighlights.map((h) => (
                <div key={h.title} className="rounded-xl border bg-card p-5">
                  <div className="mb-3 text-2xl">{h.icon}</div>
                  <h3 className="mb-1.5 font-semibold text-sm">{h.title}</h3>
                  <p className="text-xs text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Dòng Cửa Cuốn Tại Ninh Kiều
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <div key={p.name} className="rounded-xl border bg-card p-6">
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Phục Vụ Toàn Bộ Phường Thuộc Ninh Kiều
            </h2>
            <p className="mt-3 text-muted-foreground">Khảo sát và báo giá miễn phí tại địa chỉ của bạn</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {areas.map((a) => (
                <span key={a} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Câu Hỏi Thường Gặp</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-2 font-semibold">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-10">
          <div className="container max-w-3xl grid gap-4 sm:grid-cols-3">
            <Link href="/bao-gia-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Báo Giá Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Bảng giá chính thức</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/lap-dat-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Lắp Đặt Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Quy trình trọn gói</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/cua-cuon-nhom-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhôm Đức</p>
                <p className="text-sm text-muted-foreground">Dòng cao cấp nhất</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Lắp Cửa Cuốn Tại Ninh Kiều — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, tư vấn tại chỗ, lắp xong mới thanh toán. Bảo hành chính hãng 5–10 năm.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> {SITE.hotlines[0]}
                </Button>
              </a>
              <a href={`tel:${SITE.hotlines[1].replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  <Phone className="h-4 w-4" /> {SITE.hotlines[1]}
                </Button>
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" />{SITE.address}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
