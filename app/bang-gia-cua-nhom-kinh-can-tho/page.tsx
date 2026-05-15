import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Bảng Giá Cửa Nhôm Kính Cần Thơ 2026",
  description:
    "Bảng giá cửa nhôm kính Cần Thơ 2026 — nhôm Việt, nhôm nhập, Maxpro hệ 55/65/83, cửa kính bản lề sàn, lan can cầu thang. Chưa VAT. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho`,
    title: "Bảng Giá Cửa Nhôm Kính Cần Thơ 2026",
    description: "Giá cửa nhôm kính Cần Thơ — nhôm Việt, nhập, Maxpro. Chưa VAT. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const WARRANTY = "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất";

const pricingGroups = [
  {
    title: "Nhôm Việt — Cửa Đi",
    unit: "đ/m² — kính trắng 8 ly CL",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "2.200.000" },
      { spec: "Nhôm 1.4 ly/m²", price: "2.400.000" },
      { spec: "Nhôm 2.0 ly/m²", price: "2.600.000" },
    ],
    note: "Kính mờ cộng thêm 70.000 đ/m²",
  },
  {
    title: "Nhôm Việt — Cửa Sổ",
    unit: "đ/m²",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "2.100.000" },
      { spec: "Nhôm 1.4 ly/m²", price: "2.300.000" },
    ],
    note: "Kính mờ cộng thêm 70.000 đ/m²",
  },
  {
    title: "Nhôm Việt — Vách Kính",
    unit: "đ/m²",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "1.400.000" },
      { spec: "Nhôm 1.4 ly/m²", price: "1.500.000" },
    ],
    note: "Kính hộp nan đồng cộng thêm 1.100.000 đ/m²",
  },
  {
    title: "Nhôm Nhập — Cửa Đi",
    unit: "đ/m²",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "2.600.000" },
      { spec: "Nhôm 1.4 ly/m²", price: "2.800.000" },
    ],
    note: "Chất lượng nhôm cao hơn nhôm Việt",
  },
  {
    title: "Nhôm Nhập — Cửa Sổ",
    unit: "đ/m²",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "2.500.000" },
    ],
    note: "",
  },
  {
    title: "Nhôm Nhập — Vách Kính",
    unit: "đ/m²",
    rows: [
      { spec: "Nhôm 1.2 ly/m²", price: "1.700.000" },
    ],
    note: "",
  },
  {
    title: "Nhôm Maxpro (Cao Cấp)",
    unit: "đ/m²",
    rows: [
      { spec: "Hệ 55", price: "4.000.000" },
      { spec: "Hệ 65", price: "4.600.000" },
      { spec: "Hệ 83", price: "5.800.000" },
    ],
    note: "Dòng cao cấp — cách âm, cách nhiệt vượt trội",
  },
  {
    title: "Cửa Kính Bản Lề Sàn",
    unit: "đ/m²",
    rows: [
      { spec: "Kính 10 ly", price: "1.500.000" },
      { spec: "Kính 12 ly", price: "1.650.000" },
    ],
    note: "Phù hợp cửa chính, showroom, văn phòng",
  },
];

const lanCanTable = [
  { spec: "Lan can tay gỗ",          price: "1.950.000", unit: "đ/m" },
  { spec: "Lan can tay nhôm 3D 2×2", price: "2.050.000", unit: "đ/m" },
  { spec: "Lan can tay nhôm 3D 3×3", price: "2.300.000", unit: "đ/m" },
  { spec: "Lan can tay nhôm 3D 4×4", price: "2.600.000", unit: "đ/m" },
  { spec: "Lan can máng cover",       price: "5.800.000", unit: "đ/m" },
];

const faqItems = [
  {
    question: "Nhôm Việt và nhôm nhập khác nhau như thế nào?",
    answer: "Nhôm nhập có hàm lượng nhôm nguyên chất cao hơn, bề mặt đồng đều hơn, chịu lực tốt hơn và ít bị co ngót theo nhiệt độ. Nhôm Việt chi phí thấp hơn và vẫn đáp ứng tốt cho các công trình dân dụng thông thường.",
  },
  {
    question: "Nhôm Maxpro hệ 55, 65, 83 nghĩa là gì?",
    answer: "Con số là chiều rộng của profile nhôm tính bằng mm. Hệ càng lớn thì khung nhôm càng rộng, cứng chắc hơn, cách âm và cách nhiệt tốt hơn — phù hợp với tòa nhà, công trình yêu cầu cao về chuẩn kỹ thuật.",
  },
  {
    question: "Giá cửa nhôm kính đã bao gồm kính chưa?",
    answer: "Có. Giá bảng trên đã bao gồm kính trắng 8 ly tiêu chuẩn. Kính mờ cộng thêm 70.000 đ/m². Các loại kính đặc biệt (cường lực, hộp, phản quang) báo giá riêng.",
  },
  {
    question: "Bảo hành cửa nhôm kính như thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
  {
    question: "Có thi công cửa nhôm kính tại các quận huyện Cần Thơ không?",
    answer: "Có. Chúng tôi thi công tại toàn bộ quận huyện Cần Thơ: Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và các huyện ngoại thành. Không tính phí đi lại.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho#service`,
      name: "Cửa Nhôm Kính Cần Thơ",
      description: "Cung cấp và thi công cửa nhôm kính tại Cần Thơ — nhôm Việt, nhôm nhập, Maxpro, lan can cầu thang.",
      provider: { "@type": "HomeAndConstructionBusiness", "@id": siteUrl, name: SITE.brand },
      areaServed: { "@type": "City", name: "Cần Thơ" },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Bảng Giá Cửa Nhôm Kính Cần Thơ", item: `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho` },
      ],
    },
  ],
};

export default function BangGiaCuaNhomKinhCanTho() {
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Giá thật — kính đã bao gồm — không phụ phí ẩn
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Bảng Giá Cửa Nhôm Kính Cần Thơ 2025 —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Kính Đã Bao Gồm Trong Giá — Nhôm Việt Từ 1.4tr, Maxpro Từ 4tr
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Giá niêm yết đã bao gồm kính trắng 8 ly tiêu chuẩn. Kính đặc biệt, VAT, và lắp
              đặt ghi rõ riêng — không có hạng mục ẩn phát sinh sau khi ký hợp đồng.
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
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bảng Giá Cửa Nhôm Kính</h2>
              <p className="mt-3 text-sm text-muted-foreground">Giá tính theo m² — chưa bao gồm VAT và chi phí lắp đặt</p>
            </div>

            {pricingGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-1 font-semibold text-brand">{group.title}</h3>
                <p className="mb-3 text-xs text-muted-foreground">Đơn vị: {group.unit}</p>
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Loại</th>
                        <th className="px-4 py-3 text-right font-semibold">Đơn giá</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {group.rows.map((row) => (
                        <tr key={row.spec}>
                          <td className="px-4 py-3">{row.spec}</td>
                          <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {group.note && <p className="mt-2 text-xs text-muted-foreground">* {group.note}</p>}
              </div>
            ))}

            {/* Lan can */}
            <div>
              <h3 className="mb-1 font-semibold text-brand">Lan Can Cầu Thang</h3>
              <p className="mb-3 text-xs text-muted-foreground">Đơn vị: đ/m dài</p>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Loại lan can</th>
                      <th className="px-4 py-3 text-right font-semibold">Đơn giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lanCanTable.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3">{row.spec}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.price} đ/m</td>
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
                <li>Giá cửa đã bao gồm kính trắng 8 ly tiêu chuẩn</li>
                <li>Kính mờ, kính cường lực, kính hộp tính riêng theo yêu cầu</li>
                <li>Chi phí lắp đặt và vận chuyển tính riêng</li>
                <li>{WARRANTY}</li>
                <li>Có phụ kiện Candy theo yêu cầu — liên hệ để báo giá</li>
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
                  <p className="text-sm text-muted-foreground">Tole, Đức, Inox, CN Úc + Motor</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
              <Link href="/bang-gia-cua-keo-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Cửa Kéo</p>
                  <p className="text-sm text-muted-foreground">Cửa kéo có láu & không láu</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Nhận Báo Giá Trọn Gói — Kính Đã Bao Gồm</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Khảo sát tận nơi, báo giá chi tiết từng hạng mục trước khi thi công. Lắp xong mới thanh toán — bồi thường 200% nếu dùng sai vật liệu cam kết.</p>
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
