import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Kéo Thép Cần Thơ — Chống Đột Nhập",
  description:
    "Cửa kéo thép tại Cần Thơ — công nghệ Đức, chống đột nhập cao, phù hợp mặt tiền kinh doanh. Lắp đặt trọn gói, bảo hành chính hãng. Báo giá miễn phí: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-keo-thep-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-keo-thep-can-tho`,
    title: "Cửa Kéo Thép Cần Thơ — Chống Đột Nhập",
    description:
      "Cửa kéo thép công nghệ Đức tại Cần Thơ. Chống đột nhập cao. Bảo hành chính hãng. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const variants = [
  {
    name: "Cửa Kéo Thép Công Nghệ Đức",
    desc: "Thanh thép hộp mạ kẽm, cơ cấu trượt ray dưới — cứng chắc, chịu va đập, khó phá.",
    best: "Cửa hàng, nhà kinh doanh mặt tiền",
    highlight: "Phổ biến nhất tại Cần Thơ",
  },
  {
    name: "Cửa Kéo Thép Hoa Văn Cổ S9",
    desc: "Nan thép uốn hoa văn cổ điển — kết hợp bảo mật và trang trí, phù hợp nhà phố truyền thống.",
    best: "Nhà phố, nhà ở kết hợp kinh doanh",
    highlight: "Thẩm mỹ cao, giá hợp lý",
  },
  {
    name: "Cửa Kéo Inox",
    desc: "Khung và nan inox SUS 304 — không gỉ, sáng bóng lâu dài, phù hợp môi trường ẩm.",
    best: "Nhà hàng, quán ăn, mặt tiền ven sông",
    highlight: "Bền nhất trong dòng cửa kéo",
  },
];

const advantages = [
  {
    icon: "🛡️",
    title: "Chống đột nhập hiệu quả",
    desc: "11 giờ đêm khóa cửa xong về ngủ — thanh thép hộp và khóa đa điểm không để kẻ trộm có cơ hội. Bền hơn cửa cuốn thông thường trong môi trường mặt tiền.",
  },
  {
    icon: "🌬️",
    title: "Thông thoáng khi đóng",
    desc: "Cửa đóng mà khách vẫn thấy hàng qua nan — không mất doanh thu trưng bày, thông gió tự nhiên, không nóng bức trong cửa hàng.",
  },
  {
    icon: "📐",
    title: "Tiết kiệm không gian",
    desc: "Trần thấp, máy lạnh gần cửa, rào cản cơ học — cửa kéo gom sang một bên, không chiếm mét vuông nào phía trên đầu.",
  },
  {
    icon: "🔧",
    title: "Bảo trì đơn giản",
    desc: "Không motor, không mạch điện phức tạp — hỏng thì sửa một buổi sáng. Không lo mất điện, không lo cập nhật phần mềm.",
  },
  {
    icon: "💰",
    title: "Chi phí hợp lý",
    desc: "So với cửa cuốn nhôm cùng kích thước, tiết kiệm 20–30% — mà bảo mật không kém. Đúng cho chủ kinh doanh thực dụng.",
  },
  {
    icon: "🏪",
    title: "Phù hợp mặt tiền kinh doanh",
    desc: "Hàng triệu mặt tiền tại Việt Nam dùng cửa kéo thép — phụ kiện phổ biến, dễ thay, thợ nào cũng biết sửa.",
  },
];

const pricing = [
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
    question: "Cửa kéo thép Cần Thơ giá bao nhiêu?",
    answer:
      "Giá cửa kéo thép tại Cần Thơ dao động từ 2.800.000 đến 9.500.000 đồng tùy kích thước và loại thép. Giá đã bao gồm phụ kiện và nhân công lắp đặt. Liên hệ để được báo giá chính xác.",
  },
  {
    question: "Cửa kéo thép hay cửa cuốn nhôm — loại nào tốt hơn?",
    answer:
      "Tùy mục đích. Cửa kéo thép bảo mật cao hơn, thông thoáng hơn khi đóng, chi phí thấp hơn — phù hợp cửa hàng kinh doanh. Cửa cuốn nhôm thẩm mỹ hơn, vận hành tự động tiện lợi hơn — phù hợp nhà phố, garage.",
  },
  {
    question: "Cửa kéo thép có tự động không?",
    answer:
      "Cửa kéo thép thường vận hành bằng tay. Có thể lắp thêm bộ tự động hóa với motor riêng nhưng ít phổ biến hơn và chi phí cao hơn cửa cuốn có motor. Hầu hết khách hàng chọn vận hành tay cho cửa kéo.",
  },
  {
    question: "Lắp cửa kéo thép mất bao lâu?",
    answer:
      "Lắp đặt cửa kéo thép tiêu chuẩn mất 3–5 giờ. Chúng tôi có mặt trong ngày tại tất cả quận huyện Cần Thơ.",
  },
  {
    question: "Cửa kéo thép có bảo hành không?",
    answer:
      "Có. Cửa kéo thép được bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất. Trong thời gian bảo hành, chúng tôi sửa chữa hoặc thay thế miễn phí tại nhà.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-keo-thep-can-tho#service`,
      name: "Cửa Kéo Thép Cần Thơ",
      description:
        "Cung cấp và lắp đặt cửa kéo thép công nghệ Đức tại Cần Thơ — bền bỉ, chống đột nhập, bảo hành chính hãng.",
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
      "@id": `${siteUrl}/cua-keo-thep-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Kéo Thép Cần Thơ", item: `${siteUrl}/cua-keo-thep-can-tho` },
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
      name: "Cửa kéo thép có an toàn chống đột nhập không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Cửa kéo thép có cấu trúc lá thép đan chéo chắc chắn, kết hợp khóa ngang, chống cắt và phá khóa hiệu quả. Phù hợp mặt tiền cửa hàng, nhà kho, cổng rào cần bảo mật cao.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa kéo thép có lá và không lá khác nhau như thế nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cửa có lá: lá thép đan kín hơn, thẩm mỹ tốt hơn, thường dùng cho mặt tiền nhà ở và cửa hàng. Cửa không lá: khung thép rỗng thoáng hơn, giá thấp hơn, phù hợp cổng rào, bãi xe, kho xưởng.",
      },
    },
    {
      "@type": "Question",
      name: "Giá cửa kéo thép tại Cần Thơ bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Giá tính theo m²: cửa có lá từ 640.000–900.000đ/m², cửa không lá từ 540.000–800.000đ/m² tùy độ dày từ 6zem đến 1.4ly. Chưa bao gồm VAT 10%. Liên hệ 0945 042 345 để được báo giá trọn gói.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa kéo thép có bền không, bảo hành bao lâu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cửa kéo thép sơn tĩnh điện chống gỉ sét, bền 10–15 năm nếu bảo trì định kỳ. Hưng Thành Phát bảo hành theo tiêu chuẩn nhà sản xuất và cam kết bồi thường 200% nếu dùng sai vật liệu cam kết.",
      },
    },
  ],
};

export default function CuaKeoThepCanTho() {
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
              Cửa kéo thép — Bảo mật cao cho mặt tiền kinh doanh
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Kéo Thép Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Đóng Cửa Về Đêm Mà Không Lo Ai Phá, Lắp Trong Ngày
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              11 giờ đêm khóa cửa, 6 giờ sáng mở lại — thanh thép hộp mạ kẽm và khóa đa
              điểm giữ mặt tiền của bạn an toàn suốt đêm. Lắp trong ngày, báo giá miễn phí.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/#lien-he">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Báo giá miễn phí
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Variants */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Dòng Cửa Kéo Thép
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {variants.map((v) => (
                <div key={v.name} className="rounded-xl border bg-card p-6">
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {v.highlight}
                  </span>
                  <h3 className="mt-3 font-semibold">{v.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-brand/70">
                    <ShieldCheck className="h-3.5 w-3.5" /> Phù hợp: {v.best}
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
                Tại Sao Cửa Kéo Thép Phổ Biến Tại Cần Thơ?
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
                Giá Cửa Kéo Thép Tham Khảo
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
              * Giá tham khảo cho cửa kéo thép tiêu chuẩn. Giá chính xác sau khi khảo sát thực tế.
            </p>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Lắp Cửa Kéo Thép Toàn Cần Thơ
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span key={d} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  Cửa kéo thép {d}
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
          <div className="container max-w-3xl grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between gap-3 rounded-2xl border bg-brand/5 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Xem thêm</p>
                <p className="mt-1 font-semibold text-brand">Cửa cuốn nhôm — nhẹ, êm, tự động</p>
              </div>
              <Link href="/cua-cuon-nhom-can-tho" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Cửa Cuốn Nhôm Cần Thơ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-2xl border bg-brand/5 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Xem tất cả sản phẩm</p>
                <p className="mt-1 font-semibold text-brand">Cửa cuốn, cửa kéo & nhôm kính cao cấp</p>
              </div>
              <Link href="/#san-pham" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Xem Sản Phẩm <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Bảo Mật Mặt Tiền Kinh Doanh — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát tại nhà miễn phí — báo giá trong ngày — lắp xong mới thanh toán. Bồi thường 200% nếu dùng sai vật liệu cam kết.
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
