import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Bình Thủy Cần Thơ — Lắp Đặt",
  description:
    "Cửa cuốn Bình Thủy Cần Thơ — showroom tại 235 Võ Văn Kiệt, Bình Thủy. Lắp đặt trong ngày, khảo sát miễn phí, bảo hành chính hãng 10 năm. Gọi ngay: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-binh-thuy` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-binh-thuy`,
    title: "Cửa Cuốn Bình Thủy Cần Thơ — Lắp Đặt",
    description:
      "Cửa cuốn Bình Thủy — showroom tại chỗ, lắp trong ngày, bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm định hình nhập khẩu — vận hành êm tuyệt đối, bền 20+ năm, phù hợp nhà phố và garage cao cấp Bình Thủy.",
    tag: "Cao cấp nhất",
  },
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Tole thép sơn bột tĩnh điện chống gỉ — giá hợp lý, bền bỉ, phù hợp nhà xưởng và kho hàng khu vực Bình Thủy.",
    tag: "Giá tốt nhất",
  },
  {
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox chống gỉ hoàn toàn, sáng bóng, chịu ẩm — lý tưởng cho nhà hàng, quán ăn ven sông tại Bình Thủy.",
    tag: "Chống gỉ — Ven sông",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Tấm nhôm liền khối không khe hở — cách âm, cách nhiệt tốt nhất, phù hợp garage và phòng máy lạnh.",
    tag: "Cách âm tốt nhất",
  },
];

const localHighlights = [
  {
    icon: "📍",
    title: "Showroom tại Bình Thủy — xem mẫu trước",
    desc: "235–237 Võ Văn Kiệt, Bình Thủy — đến xem mẫu cửa thực tế, chạm tay vào vật liệu, so sánh trực tiếp trước khi quyết định. Không cần đặt hàng theo ảnh.",
  },
  {
    icon: "⚡",
    title: "Gọi sáng — thợ đến trong 2 giờ",
    desc: "Kỹ thuật viên có mặt tại Bình Thủy trong vòng 2 giờ sau khi gọi, không tính phí đi lại — kịp lắp xong trước bữa cơm trưa.",
  },
  {
    icon: "🔧",
    title: "Sửa chữa khẩn cấp ngoài giờ",
    desc: "Cửa hỏng lúc 9 giờ tối? Đội kỹ thuật hỗ trợ khẩn cấp tại Bình Thủy và lân cận — vì cửa hỏng không chờ đến sáng.",
  },
  {
    icon: "🏆",
    title: "21 năm phục vụ Bình Thủy",
    desc: "Từ năm 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. Hàng nghìn cửa cuốn được lắp và bảo trì tại Bình Thủy. Hỏi hàng xóm ai đã từng dùng.",
  },
];

const areas = [
  "Phường An Thới", "Phường Bình Thủy", "Phường Cái Khế",
  "Phường Long Hòa", "Phường Long Tuyền", "Phường Thới An Đông",
  "Phường Trà An", "Phường Trà Nóc",
];

const faqItems = [
  {
    question: "Cửa cuốn Bình Thủy giá bao nhiêu?",
    answer:
      "Giá cửa cuốn tại Bình Thủy từ 500.000đ/m² (tole Đài Loan) đến 2.300.000đ/m² (nhôm công nghệ Đức), chưa bao gồm motor và VAT. Liên hệ 0945 042 345 để được khảo sát và báo giá miễn phí tận nơi tại Bình Thủy.",
  },
  {
    question: "Hưng Thành Phát Door có showroom tại Bình Thủy không?",
    answer:
      "Có. Showroom và xưởng sản xuất đặt tại 235–237 Võ Văn Kiệt, Bình Thủy, Cần Thơ. Khách hàng có thể đến xem mẫu cửa thực tế, so sánh chất liệu và nhận tư vấn trực tiếp từ 8:00–17:30, Thứ 2 đến Thứ 7.",
  },
  {
    question: "Lắp cửa cuốn tại Bình Thủy có mất phí đi lại không?",
    answer:
      "Không. Toàn bộ khu vực Bình Thủy không tính phí đi lại — khảo sát, báo giá và lắp đặt đều miễn phí công đi lại.",
  },
  {
    question: "Cửa cuốn bảo hành bao lâu?",
    answer:
      "Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất — tối thiểu 5 năm cho cửa cuốn nhôm công nghệ Đức, 10 năm cho một số dòng cao cấp. Trong thời gian bảo hành, sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.",
  },
  {
    question: "Bình Thủy có nhiều nhà bị ngập lũ — cửa cuốn có phù hợp không?",
    answer:
      "Cửa cuốn nhôm công nghệ Đức và cửa cuốn inox SUS 304 phù hợp nhất cho khu vực hay ngập nước vì không gỉ sét. Tránh dùng cửa tole thép thông thường ở các vùng hay bị ngập lâu ngày.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-binh-thuy#service`,
      name: "Cửa Cuốn Bình Thủy Cần Thơ",
      description:
        "Lắp đặt và sửa chữa cửa cuốn tại Bình Thủy, Cần Thơ — nhôm đức, thép tĩnh điện, inox, tấm liền. Bảo hành chính hãng.",
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
        { "@type": "AdministrativeArea", name: "Bình Thủy, Cần Thơ" },
        ...areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a}, Bình Thủy, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-binh-thuy#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Bình Thủy", item: `${siteUrl}/cua-cuon-binh-thuy` },
      ],
    },
  ],
};

export default function CuaCuonBinhThuy() {
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
              Showroom ngay tại Bình Thủy — không phí đi lại
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Người Bình Thủy Gọi —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Chúng Tôi Đến Trong 2 Giờ, Showroom Ngay Tại Bình Thủy
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Showroom và xưởng đặt ngay tại Bình Thủy — kỹ thuật viên đến trong 2 giờ sau khi
              gọi, không tính phí đi lại. Lắp xong trong ngày, bảo hành chính hãng.
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
                Các Dòng Cửa Cuốn Tại Bình Thủy
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
              Phục Vụ Toàn Bộ Phường Xã Bình Thủy
            </h2>
            <p className="mt-3 text-muted-foreground">Không tính phí đi lại — lắp đặt trong ngày</p>
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
            <Link href="/sua-chua-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Sửa Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Đến tận nơi trong ngày</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Lắp Cửa Cuốn Tại Bình Thủy — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, có mặt trong 2 giờ, lắp xong mới thanh toán.
              Bồi thường 200% nếu dùng sai vật liệu cam kết.
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
