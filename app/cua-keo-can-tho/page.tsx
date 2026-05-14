import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Kéo Cần Thơ — Thép, Nhôm, Inox — Hưng Thành Phát Door",
  description:
    "Cửa kéo Cần Thơ — thép công nghệ Đức, nhôm cao cấp, inox SUS 304. Phù hợp mặt tiền kinh doanh, chống đột nhập hiệu quả. Lắp đặt trong ngày, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-keo-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-keo-can-tho`,
    title: "Cửa Kéo Cần Thơ — Thép, Nhôm, Inox — Hưng Thành Phát Door",
    description:
      "Cửa kéo thép, nhôm, inox tại Cần Thơ. Chống đột nhập, bền bỉ. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const types = [
  {
    name: "Cửa Kéo Thép Công Nghệ Đức",
    desc: "Nan thép hộp mạ kẽm, ray dưới chịu lực — cứng chắc, khó phá, chi phí hợp lý. Lựa chọn số 1 cho mặt tiền kinh doanh.",
    best: "Cửa hàng, nhà kinh doanh",
    highlight: "Phổ biến nhất",
  },
  {
    name: "Cửa Kéo Nhôm Công Nghệ Đức",
    desc: "Profile nhôm định hình cao cấp — nhẹ hơn thép, không gỉ sét, thẩm mỹ hiện đại, vận hành êm hơn.",
    best: "Nhà phố hiện đại, showroom",
    highlight: "Nhẹ — Không gỉ",
  },
  {
    name: "Cửa Kéo Hoa Văn Cổ S9",
    desc: "Nan thép uốn hoa văn cổ điển — kết hợp bảo mật và trang trí, phù hợp nhà phố truyền thống và quán ăn.",
    best: "Nhà phố, nhà ở kết hợp kinh doanh",
    highlight: "Thẩm mỹ cao",
  },
  {
    name: "Cửa Kéo Inox SUS 304",
    desc: "Khung và nan inox cao cấp — không gỉ, sáng bóng lâu dài, chịu ẩm và hoá chất, phù hợp môi trường ẩm ven sông.",
    best: "Nhà hàng, quán ăn, ven sông",
    highlight: "Bền nhất",
  },
];

const advantages = [
  {
    icon: "🛡️",
    title: "Bảo mật cao hơn cửa cuốn",
    desc: "Cấu trúc nan kéo đan chéo chắc chắn, khóa ngang đa điểm — khó phá hơn cửa cuốn thông thường.",
  },
  {
    icon: "🌬️",
    title: "Thông thoáng khi đóng",
    desc: "Khe hở giữa các nan cho phép thông gió và quan sát từ bên ngoài — lý tưởng cho cửa hàng vừa đóng vừa trưng hàng.",
  },
  {
    icon: "📐",
    title: "Tiết kiệm không gian",
    desc: "Cửa kéo gom sang một bên thay vì cuộn lên — phù hợp mặt tiền có trần thấp hoặc máy lạnh gần cửa.",
  },
  {
    icon: "🔧",
    title: "Bảo trì đơn giản, chi phí thấp",
    desc: "Cơ học đơn giản — không cần motor, ít hỏng hóc, phụ kiện thay thế phổ biến, dễ tìm trên toàn quốc.",
  },
  {
    icon: "💰",
    title: "Giá thấp hơn 20–30% so với cửa cuốn",
    desc: "Chi phí đầu tư thấp với độ bảo mật tương đương — lựa chọn tối ưu cho chủ kinh doanh muốn tiết kiệm.",
  },
  {
    icon: "🏪",
    title: "Phù hợp mọi loại mặt tiền",
    desc: "Từ nhà phố 3m đến shophouse 6m — cửa kéo linh hoạt về kích thước và kiểu dáng.",
  },
];

const pricing = [
  { size: "2.0m × 2.5m", range: "2.200.000 – 3.500.000 đ" },
  { size: "2.5m × 2.5m", range: "2.800.000 – 4.500.000 đ" },
  { size: "3.0m × 2.8m", range: "3.200.000 – 5.200.000 đ" },
  { size: "4.0m × 3.0m", range: "4.500.000 – 7.000.000 đ" },
  { size: "5.0m × 3.5m", range: "6.000.000 – 9.500.000 đ" },
  { size: "Kích thước đặc biệt", range: "Liên hệ báo giá" },
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Cửa kéo Cần Thơ giá bao nhiêu?",
    answer:
      "Giá cửa kéo tại Cần Thơ từ 2.200.000 đến 9.500.000 đồng tùy kích thước và chất liệu (thép, nhôm, inox). Giá đã bao gồm phụ kiện và lắp đặt. Liên hệ 0945 042 345 để được báo giá chính xác.",
  },
  {
    question: "Cửa kéo thép hay cửa cuốn nhôm — loại nào phù hợp hơn?",
    answer:
      "Cửa kéo thép phù hợp mặt tiền kinh doanh cần bảo mật cao, thông gió tốt và chi phí thấp. Cửa cuốn nhôm phù hợp garage, nhà phố cần thẩm mỹ cao và vận hành tự động tiện lợi hơn. Nên chọn theo mục đích sử dụng.",
  },
  {
    question: "Cửa kéo nhôm và cửa kéo thép khác nhau như thế nào?",
    answer:
      "Cửa kéo nhôm nhẹ hơn, không gỉ sét, thẩm mỹ hiện đại hơn nhưng giá cao hơn 20–30%. Cửa kéo thép bền hơn về cơ học, giá thấp hơn, phụ kiện phổ biến dễ thay thế. Cả hai đều phù hợp mặt tiền kinh doanh.",
  },
  {
    question: "Lắp cửa kéo mất bao lâu?",
    answer:
      "Lắp đặt cửa kéo tiêu chuẩn mất 3–5 giờ. Đội kỹ thuật có mặt trong ngày tại tất cả quận huyện Cần Thơ.",
  },
  {
    question: "Cửa kéo có bảo hành không?",
    answer:
      "Có. Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất. Trong thời gian bảo hành, sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-keo-can-tho#service`,
      name: "Cửa Kéo Cần Thơ",
      description:
        "Cung cấp và lắp đặt cửa kéo thép, nhôm, inox tại Cần Thơ — bền bỉ, chống đột nhập, bảo hành chính hãng.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
      },
      areaServed: [
        { "@type": "City", name: "Cần Thơ" },
        ...districts.map((d) => ({ "@type": "AdministrativeArea", name: `${d}, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-keo-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Kéo Cần Thơ", item: `${siteUrl}/cua-keo-can-tho` },
      ],
    },
  ],
};

export default function CuaKeoCanTho() {
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
              Cửa kéo — Bảo mật cao
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Kéo Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Thép, Nhôm, Inox — Lắp Trong Ngày
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Hưng Thành Phát Door cung cấp và lắp đặt cửa kéo thép, nhôm, inox tại Cần Thơ.
              Bảo mật cao, tiết kiệm không gian, phù hợp mặt tiền kinh doanh. Lắp trọn gói trong ngày.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/bang-gia-cua-keo-can-tho">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Xem bảng giá
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Types */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Loại Cửa Kéo Tại Cần Thơ
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {types.map((t) => (
                <div key={t.name} className="rounded-xl border bg-card p-6">
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {t.highlight}
                  </span>
                  <h3 className="mt-3 font-semibold">{t.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-brand/70">
                    <ShieldCheck className="h-3.5 w-3.5" /> {t.best}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ưu Điểm Của Cửa Kéo
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((a) => (
                <div key={a.title} className="rounded-xl border bg-background p-6">
                  <div className="mb-3 text-3xl">{a.icon}</div>
                  <h3 className="mb-2 font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Giá Cửa Kéo Tham Khảo
              </h2>
              <p className="mt-3 text-muted-foreground">Giá trọn gói bao gồm vật tư và nhân công lắp đặt</p>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Kích thước</th>
                    <th className="px-4 py-3 text-right font-semibold">Chi phí tham khảo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pricing.map((row) => (
                    <tr key={row.size}>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              * Giá tham khảo cửa kéo thép tiêu chuẩn, chưa bao gồm VAT.
            </p>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Lắp Cửa Kéo Toàn Cần Thơ</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span key={d} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  Cửa kéo {d}
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
            <Link href="/cua-keo-thep-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Kéo Thép</p>
                <p className="text-sm text-muted-foreground">Chi tiết & so sánh</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/bang-gia-cua-keo-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Bảng Giá Cửa Kéo</p>
                <p className="text-sm text-muted-foreground">Giá chính thức 2025</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/cua-cuon-nhom-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhôm</p>
                <p className="text-sm text-muted-foreground">Tự động, êm, hiện đại</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cần Lắp Cửa Kéo Tại Cần Thơ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí — báo giá tận nơi — lắp xong mới thanh toán.
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
