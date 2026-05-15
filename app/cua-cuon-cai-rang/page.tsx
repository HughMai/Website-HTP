import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Cái Răng Cần Thơ — Lắp Đặt Nhà Phố & Kho Xưởng, Bảo Hành 10 Năm",
  description:
    "Cửa cuốn Cái Răng Cần Thơ — lắp đặt nhà phố, kho hàng, nhà xưởng khu vực Cái Răng. Khảo sát miễn phí, lắp trong ngày, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-cai-rang` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-cai-rang`,
    title: "Cửa Cuốn Cái Răng Cần Thơ — Lắp Đặt Nhà Phố & Kho Xưởng, Bảo Hành 10 Năm",
    description:
      "Cửa cuốn Cái Răng — nhà phố, kho xưởng, khảo sát miễn phí, bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm định hình nhập khẩu — vận hành êm, bền 20–30 năm, không gỉ sét. Phù hợp nhà phố và mặt tiền kinh doanh tại Cái Răng.",
    tag: "Cao cấp nhất",
  },
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Tole thép sơn bột tĩnh điện — bền, giá hợp lý, phù hợp kho hàng, nhà xưởng và mặt tiền kinh doanh tại các khu vực Cái Răng.",
    tag: "Phổ biến nhất",
  },
  {
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox chống gỉ hoàn toàn, chịu ẩm — lý tưởng cho nhà hàng, quán ăn khu vực chợ Cái Răng và ven sông.",
    tag: "Chống gỉ — Ven sông",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Tấm nhôm liền khối không khe hở — cách âm, cách nhiệt tốt. Phù hợp kho lạnh, phòng máy và garage tại Cái Răng.",
    tag: "Cách âm tốt nhất",
  },
];

const localHighlights = [
  {
    icon: "🏭",
    title: "Chuyên kho hàng và nhà xưởng",
    desc: "Cái Răng có nhiều khu vực kho hàng, chợ đầu mối và cơ sở sản xuất. Chúng tôi có kinh nghiệm lắp cửa cuốn khổ lớn cho kho xưởng và cửa cuốn nhôm cho nhà phố tại đây.",
  },
  {
    icon: "⚡",
    title: "Gần — kỹ thuật viên đến nhanh",
    desc: "Showroom Bình Thủy liền kề Cái Răng qua cầu Cái Răng. Kỹ thuật viên có mặt nhanh chóng, lắp xong trong ngày — không gián đoạn hoạt động kinh doanh.",
  },
  {
    icon: "🔧",
    title: "Hỗ trợ sửa chữa khẩn cấp",
    desc: "Cửa kho hàng hỏng giữa mùa cao điểm? Đội kỹ thuật hỗ trợ khẩn cấp tại toàn bộ Cái Răng — xử lý nhanh để không ảnh hưởng đến hàng hóa và kinh doanh.",
  },
  {
    icon: "🏆",
    title: "21 năm phục vụ Cần Thơ",
    desc: "Từ năm 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. Hàng trăm công trình tại Cái Răng được bảo hành và bảo trì định kỳ.",
  },
];

const areas = [
  "Phường Ba Láng", "Phường Hưng Phú", "Phường Hưng Thạnh",
  "Phường Lê Bình", "Phường Phú Thứ", "Phường Tân Phú",
  "Phường Thường Thạnh",
];

const faqItems = [
  {
    question: "Cửa cuốn Cái Răng giá bao nhiêu?",
    answer:
      "Giá cửa cuốn tại Cái Răng từ 500.000đ/m² (tole Đài Loan) đến 2.300.000đ/m² (nhôm công nghệ Đức), chưa bao gồm motor và VAT. Liên hệ 0945 042 345 để được khảo sát và báo giá miễn phí tận nơi tại Cái Răng.",
  },
  {
    question: "Kho hàng tại Cái Răng nên dùng cửa cuốn gì?",
    answer:
      "Kho hàng tại Cái Răng nên dùng cửa cuốn thép sơn tĩnh điện khổ lớn — tiết kiệm chi phí, chịu lực tốt, phù hợp xe tải ra vào. Nếu kho lạnh hoặc gần sông hay ngập thì chọn cửa cuốn inox SUS 304 để chống gỉ hoàn toàn.",
  },
  {
    question: "Lắp cửa cuốn tại Cái Răng mất bao lâu?",
    answer:
      "Cửa cuốn tiêu chuẩn lắp trong 2–4 giờ, xong trong ngày. Cửa cuốn khổ lớn cho kho xưởng có thể mất nửa ngày đến 1 ngày. Đặt lịch trước để được sắp xếp thời gian phù hợp.",
  },
  {
    question: "Hưng Thành Phát Door có phục vụ chợ đầu mối Cái Răng không?",
    answer:
      "Có. Chúng tôi đã lắp đặt và bảo trì cửa cuốn cho nhiều tiểu thương và kho chứa hàng quanh khu vực chợ Cái Răng. Liên hệ để được tư vấn loại cửa phù hợp với môi trường thường xuyên ẩm ướt.",
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
      "@id": `${siteUrl}/cua-cuon-cai-rang#service`,
      name: "Cửa Cuốn Cái Răng Cần Thơ",
      description:
        "Lắp đặt và sửa chữa cửa cuốn tại Cái Răng, Cần Thơ — nhôm đức, thép tĩnh điện, inox, tấm liền. Bảo hành chính hãng.",
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
        { "@type": "AdministrativeArea", name: "Cái Răng, Cần Thơ" },
        ...areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a}, Cái Răng, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-cai-rang#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Cái Răng", item: `${siteUrl}/cua-cuon-cai-rang` },
      ],
    },
  ],
};

export default function CuaCuonCaiRang() {
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
              Phục vụ toàn quận Cái Răng
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Cái Răng —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Từ Nhà Phố Đến Kho Xưởng, Lắp Xong Trong Ngày
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Chuyên lắp cửa cuốn nhà phố, kho hàng và nhà xưởng tại Cái Răng — khảo sát miễn phí,
              tư vấn đúng loại, bảo hành chính hãng 5–10 năm.
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
                Các Dòng Cửa Cuốn Tại Cái Răng
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
              Phục Vụ Toàn Bộ Phường Thuộc Cái Răng
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
            <Link href="/cua-cuon-nha-xuong-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhà Xưởng</p>
                <p className="text-sm text-muted-foreground">Chuyên khổ lớn công nghiệp</p>
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
              Lắp Cửa Cuốn Tại Cái Răng — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, tư vấn đúng loại cho nhu cầu của bạn, bảo hành chính hãng 5–10 năm.
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
