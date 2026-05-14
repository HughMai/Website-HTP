import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Bảng Giá Cửa Kéo Cần Thơ 2025 — Giá Theo m²",
  description:
    "Bảng giá cửa kéo Cần Thơ 2025 — cửa có lá và không lá, từ U 6 zem đến U 1.4 ly. Giá tính theo m², chưa VAT. Báo giá miễn phí: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/bang-gia-cua-keo-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/bang-gia-cua-keo-can-tho`,
    title: "Bảng Giá Cửa Kéo Cần Thơ 2025 — Giá Theo m²",
    description: "Giá cửa kéo tính theo m² tại Cần Thơ. Chưa VAT. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const WARRANTY = "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất";

const cuaCoLau = [
  { spec: "U 6 zem",  price: "640.000" },
  { spec: "U 8 zem",  price: "700.000" },
  { spec: "U 1 ly",   price: "760.000" },
  { spec: "U 1.2 ly", price: "820.000" },
  { spec: "U 1.4 ly", price: "900.000" },
];

const cuaKhongLau = [
  { spec: "U 6 zem",  price: "540.000" },
  { spec: "U 8 zem",  price: "600.000" },
  { spec: "U 1 ly",   price: "660.000" },
  { spec: "U 1.2 ly", price: "720.000" },
  { spec: "U 1.4 ly", price: "800.000" },
];

const faqItems = [
  {
    question: "Cửa kéo có lá và không lá khác nhau như thế nào?",
    answer: "Cửa có lá là loại cửa kéo có thêm thanh dọc (lá) gia cố ở hai bên, giúp cứng chắc hơn và chống vặn vẹo. Cửa không lá đơn giản hơn, giá rẻ hơn, phù hợp với cửa hàng nhỏ hoặc kho ít yêu cầu bảo mật.",
  },
  {
    question: "Giá cửa kéo tính như thế nào?",
    answer: "Giá tính theo m² diện tích cửa (chiều rộng × chiều cao). Cửa dưới 8m² cộng thêm 20.000 đ/m²; cửa dưới 5m² cộng thêm 40.000 đ/m². Chưa bao gồm VAT và chi phí lắp đặt.",
  },
  {
    question: "Zem là gì trong báo giá cửa kéo?",
    answer: "Zem (hay mm) là độ dày của thanh U cửa kéo. Thanh U dày hơn (1 ly = 1mm) thì cứng và bền hơn nhưng nặng hơn và giá cao hơn. U 6 zem = 0.6mm, U 8 zem = 0.8mm, U 1 ly = 1.0mm.",
  },
  {
    question: "Bảo hành cửa kéo như thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
  {
    question: "Có thi công cửa kéo tại các quận huyện Cần Thơ không?",
    answer: "Có. Chúng tôi thi công tại toàn bộ quận huyện Cần Thơ: Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và các huyện ngoại thành. Không tính phí đi lại.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/bang-gia-cua-keo-can-tho#service`,
      name: "Cửa Kéo Cần Thơ",
      description: "Cung cấp và lắp đặt cửa kéo tại Cần Thơ — có lá và không lá, từ U 6 zem đến U 1.4 ly.",
      provider: { "@type": "HomeAndConstructionBusiness", "@id": siteUrl, name: SITE.brand },
      areaServed: { "@type": "City", name: "Cần Thơ" },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/bang-gia-cua-keo-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Bảng Giá Cửa Kéo Cần Thơ", item: `${siteUrl}/bang-gia-cua-keo-can-tho` },
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bảng giá cửa kéo Cần Thơ năm 2025 là bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Giá cửa kéo tính theo m²: Có lá từ 640.000đ/m² (U6zem) đến 900.000đ/m² (U1.4ly). Không lá từ 540.000đ/m² (U6zem) đến 800.000đ/m² (U1.4ly). Giá chưa bao gồm VAT 10% và phụ kiện lắp đặt.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa kéo U6zem và U1.4ly khác nhau như thế nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Số zem và ly chỉ độ dày của lá thép. U6zem (khoảng 0.6mm) là loại phổ thông, giá rẻ, phù hợp dùng tạm hoặc kho bãi. U1.4ly (1.4mm) dày hơn nhiều, chắc chắn hơn, chống đột nhập tốt hơn, phù hợp mặt tiền cửa hàng lâu dài.",
      },
    },
    {
      "@type": "Question",
      name: "Giá đã bao gồm công lắp đặt chưa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chưa. Bảng giá thể hiện đơn giá vật liệu theo m². Chi phí thi công tùy thuộc vào điều kiện công trình. Gọi 0945 042 345 để được báo giá trọn gói bao gồm vật tư và lắp đặt.",
      },
    },
  ],
};

export default function BangGiaCuaKeoCanTho() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Bảng giá chính hãng 2025
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Bảng Giá Cửa Kéo Cần Thơ 2025 —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Giá Theo m², Minh Bạch
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Bảng giá cửa kéo chính thức — cửa có lá và không lá, từ U 6 zem đến U 1.4 ly.
              Giá tính theo m², chưa bao gồm VAT và lắp đặt.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi báo giá: {SITE.hotlines[0]}
                </Button>
              </a>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Price tables */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bảng Giá Cửa Kéo</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Giá tính theo m² — áp dụng cho cửa từ 8m² trở lên — chưa bao gồm VAT và lắp đặt
              </p>
            </div>

            {/* Cửa có láu */}
            <div>
              <h3 className="mb-1 font-semibold text-brand">Cửa Kéo Có Lá</h3>
              <p className="mb-3 text-xs text-muted-foreground">Có thanh dọc gia cố — cứng chắc, bảo mật cao hơn</p>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Loại thanh U</th>
                      <th className="px-4 py-3 text-right font-semibold">Đơn giá (đ/m²)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cuaCoLau.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3">{row.spec}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cửa không láu */}
            <div>
              <h3 className="mb-1 font-semibold text-brand">Cửa Kéo Không Lá</h3>
              <p className="mb-3 text-xs text-muted-foreground">Không có thanh dọc — giá hợp lý, phù hợp cửa hàng nhỏ</p>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Loại thanh U</th>
                      <th className="px-4 py-3 text-right font-semibold">Đơn giá (đ/m²)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cuaKhongLau.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3">{row.spec}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <p className="font-semibold mb-1">Lưu ý quan trọng</p>
              <ul className="space-y-1 list-disc list-inside text-amber-800">
                <li>Giá trên chưa bao gồm VAT</li>
                <li>Cửa dưới 8m² cộng thêm 20.000 đ/m²</li>
                <li>Cửa dưới 5m² cộng thêm 40.000 đ/m²</li>
                <li>Chi phí lắp đặt tính riêng sau khi khảo sát</li>
                <li>{WARRANTY}</li>
                <li>Tiêu chuẩn: khoảng cách giữa các thanh U là 1 tấc</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Câu Hỏi Thường Gặp</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border bg-background p-6">
                  <h3 className="mb-2 font-semibold">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other price pages */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-brand/60">Xem thêm bảng giá</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/bao-gia-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Cửa Cuốn</p>
                  <p className="text-sm text-muted-foreground">Tole, Đức, Inox, CN Úc</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
              <Link href="/bang-gia-cua-nhom-kinh-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Cửa Nhôm Kính</p>
                  <p className="text-sm text-muted-foreground">Nhôm Việt, nhập, Maxpro, lan can</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Nhận Báo Giá Cửa Kéo Tại Nhà</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Khảo sát miễn phí — báo giá trọn gói trước khi thi công.</p>
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
