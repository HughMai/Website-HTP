import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Thốt Nốt Cần Thơ — Lắp Đặt Tận Nơi, Bảo Hành 10 Năm",
  description:
    "Cửa cuốn Thốt Nốt Cần Thơ — lắp đặt nhà phố, kho xưởng tại Thốt Nốt và các xã lân cận. Đến tận nơi, bảo hành chính hãng. Gọi ngay: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-thot-not` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-thot-not`,
    title: "Cửa Cuốn Thốt Nốt Cần Thơ — Lắp Đặt Tận Nơi, Bảo Hành 10 Năm",
    description:
      "Cửa cuốn Thốt Nốt — đến tận nơi, khảo sát miễn phí, bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Tole thép sơn bột tĩnh điện chống gỉ — tiết kiệm chi phí, bền bỉ, phù hợp nhà ở, kho hàng và mặt tiền kinh doanh tại Thốt Nốt.",
    tag: "Phổ biến nhất",
  },
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm định hình nhập khẩu — vận hành êm, bền 20–30 năm, thẩm mỹ cao. Phù hợp nhà phố và mặt tiền kinh doanh cao cấp tại Thốt Nốt.",
    tag: "Cao cấp nhất",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Tấm nhôm liền khối không khe hở — cách âm, cách nhiệt vượt trội. Phù hợp kho lạnh và garage tại khu vực Thốt Nốt.",
    tag: "Cách nhiệt kho lạnh",
  },
  {
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox chống gỉ hoàn toàn, chịu ẩm — phù hợp nhà hàng, cơ sở chế biến thủy sản và kho gần sông tại khu vực Thốt Nốt.",
    tag: "Chống gỉ — Ven sông",
  },
];

const localHighlights = [
  {
    icon: "🚗",
    title: "Đến tận nơi — không ngại xa",
    desc: "Thốt Nốt cách showroom khoảng 30–35km. Chúng tôi vẫn đến tận nơi khảo sát và lắp đặt — phí đi lại (nếu có) được thông báo rõ ràng trước khi ký hợp đồng, không phát sinh sau.",
  },
  {
    icon: "📋",
    title: "Đặt lịch trước — đúng giờ, đúng hẹn",
    desc: "Đặt lịch trước 1–2 ngày để chúng tôi sắp xếp kỹ thuật viên có mặt đúng giờ tại Thốt Nốt — không để bạn chờ đợi.",
  },
  {
    icon: "🔧",
    title: "Sửa chữa và bảo trì định kỳ",
    desc: "Sau khi lắp đặt, đội kỹ thuật tiếp tục hỗ trợ sửa chữa và bảo trì định kỳ tại Thốt Nốt — không phải lo tìm thợ xa lạ khi cửa có sự cố.",
  },
  {
    icon: "🏆",
    title: "21 năm uy tín tại Cần Thơ",
    desc: "Từ năm 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. Phục vụ khách hàng từ trung tâm đến các huyện xa — uy tín không phân biệt địa bàn.",
  },
];

const areas = [
  "Phường Tân Hưng", "Phường Thới Thuận", "Phường Thuận An",
  "Phường Trung Kiên", "Phường Trung Nhứt", "Phường Tân Lộc",
  "Phường Trung Hưng", "Phường Thốt Nốt",
];

const faqItems = [
  {
    question: "Hưng Thành Phát Door có lắp cửa cuốn tại Thốt Nốt không?",
    answer:
      "Có. Chúng tôi phục vụ toàn bộ quận Thốt Nốt — từ trung tâm thị trấn đến các phường xã. Đặt lịch trước 1–2 ngày để chúng tôi sắp xếp kỹ thuật viên đến đúng giờ.",
  },
  {
    question: "Lắp cửa cuốn tại Thốt Nốt có phí đi lại không?",
    answer:
      "Phí đi lại (nếu có) được thông báo rõ ràng và minh bạch trước khi ký hợp đồng — thường được tính vào gói lắp đặt trọn gói, không phát sinh thêm sau khi đã chốt giá. Khảo sát và báo giá miễn phí.",
  },
  {
    question: "Cửa cuốn Thốt Nốt giá bao nhiêu?",
    answer:
      "Giá cửa cuốn tại Thốt Nốt từ 500.000đ/m² (tole thép tĩnh điện) đến 2.300.000đ/m² (nhôm công nghệ Đức), chưa bao gồm motor và VAT. Liên hệ 0945 042 345 để được khảo sát và báo giá tận nơi.",
  },
  {
    question: "Khu vực Thốt Nốt gần sông nên chọn cửa cuốn gì?",
    answer:
      "Nhà gần sông hoặc khu vực hay ngập nước tại Thốt Nốt nên chọn cửa cuốn inox SUS 304 hoặc nhôm công nghệ Đức — cả hai đều không gỉ sét trong môi trường ẩm ướt. Tránh cửa cuốn tole thép tại các vị trí thường xuyên tiếp xúc với nước mặn hoặc ngập lâu ngày.",
  },
  {
    question: "Cửa cuốn bảo hành bao lâu?",
    answer:
      "Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất — tối thiểu 5 năm cho cửa cuốn nhôm và thép, 10 năm cho một số dòng cao cấp. Trong thời gian bảo hành, sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt, kể cả tại Thốt Nốt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-thot-not#service`,
      name: "Cửa Cuốn Thốt Nốt Cần Thơ",
      description:
        "Lắp đặt và sửa chữa cửa cuốn tại Thốt Nốt, Cần Thơ — nhôm đức, thép tĩnh điện, inox, tấm liền. Bảo hành chính hãng.",
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
        { "@type": "AdministrativeArea", name: "Thốt Nốt, Cần Thơ" },
        ...areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a}, Thốt Nốt, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-thot-not#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Thốt Nốt", item: `${siteUrl}/cua-cuon-thot-not` },
      ],
    },
  ],
};

export default function CuaCuonThotNot() {
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
              Phục vụ toàn quận Thốt Nốt — đến tận nơi
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Thốt Nốt —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Lắp Đặt Tận Nơi, Không Ngại Xa, Bảo Hành Chính Hãng
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Phục vụ khách hàng tại Thốt Nốt — đặt lịch trước, kỹ thuật viên đến đúng giờ,
              lắp xong trong ngày, bảo hành chính hãng 5–10 năm.
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
                Các Dòng Cửa Cuốn Tại Thốt Nốt
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
              Phục Vụ Toàn Bộ Phường Xã Thuộc Thốt Nốt
            </h2>
            <p className="mt-3 text-muted-foreground">Đặt lịch trước để được phục vụ tận nơi</p>
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
              Lắp Cửa Cuốn Tại Thốt Nốt — Gọi Đặt Lịch Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Đặt lịch trước, kỹ thuật viên đến đúng giờ. Bảo hành chính hãng 5–10 năm, hỗ trợ tận nơi.
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
