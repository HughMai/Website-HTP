import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Ô Môn Cần Thơ — Lắp Đặt Kho Xưởng & Nhà Phố, Bảo Hành 10 Năm",
  description:
    "Cửa cuốn Ô Môn Cần Thơ — lắp đặt nhà xưởng, khu công nghiệp và nhà phố tại Ô Môn. Cửa cuốn khổ lớn chuyên công nghiệp. Gọi ngay: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-o-mon` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-o-mon`,
    title: "Cửa Cuốn Ô Môn Cần Thơ — Lắp Đặt Kho Xưởng & Nhà Phố, Bảo Hành 10 Năm",
    description:
      "Cửa cuốn Ô Môn — chuyên kho xưởng khu công nghiệp, khảo sát miễn phí, bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Tole thép khổ lớn sơn bột tĩnh điện — chịu lực tốt, giá hợp lý, phù hợp nhà xưởng, kho hàng và cơ sở sản xuất tại Ô Môn.",
    tag: "Phổ biến nhất",
  },
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm định hình nhập khẩu — vận hành êm, bền 20–30 năm. Phù hợp nhà phố, văn phòng và showroom tại Ô Môn.",
    tag: "Cao cấp nhất",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Tấm nhôm liền khối không khe hở — cách âm, cách nhiệt cao. Lý tưởng cho kho lạnh, phòng máy và nhà xưởng yêu cầu kiểm soát nhiệt độ.",
    tag: "Cách nhiệt kho lạnh",
  },
  {
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox chống gỉ hoàn toàn — phù hợp cơ sở chế biến thực phẩm, xưởng sản xuất yêu cầu vệ sinh cao tại Ô Môn.",
    tag: "Tiêu chuẩn vệ sinh",
  },
];

const localHighlights = [
  {
    icon: "🏭",
    title: "Chuyên cửa cuốn công nghiệp khổ lớn",
    desc: "Ô Môn có nhiều khu công nghiệp, nhà máy và cơ sở sản xuất. Chúng tôi lắp cửa cuốn khổ lớn từ 4m đến 8m chiều rộng — xe tải vào thoải mái, vận hành bền bỉ nhiều ca.",
  },
  {
    icon: "⚡",
    title: "Hỗ trợ nhanh — không để dây chuyền đứng",
    desc: "Cửa xưởng hỏng là dây chuyền sản xuất đứng. Đội kỹ thuật ưu tiên xử lý khẩn cấp tại Ô Môn — phản hồi nhanh nhất có thể để khôi phục hoạt động.",
  },
  {
    icon: "🔧",
    title: "Lắp đặt ngoài giờ sản xuất",
    desc: "Để không gián đoạn hoạt động nhà máy, chúng tôi linh hoạt lắp đặt vào ca đêm, cuối tuần hoặc ngày nghỉ — theo lịch phù hợp với kế hoạch sản xuất của bạn.",
  },
  {
    icon: "🏆",
    title: "21 năm kinh nghiệm tại Cần Thơ",
    desc: "Từ năm 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. Hàng trăm công trình công nghiệp và dân dụng tại Ô Môn đang được bảo hành định kỳ.",
  },
];

const areas = [
  "Phường Châu Văn Liêm", "Phường Long Hưng", "Phường Phước Thới",
  "Phường Thới An", "Phường Thới Long", "Phường Trường Lạc",
];

const faqItems = [
  {
    question: "Cửa cuốn nhà xưởng Ô Môn giá bao nhiêu?",
    answer:
      "Cửa cuốn khổ lớn cho nhà xưởng tại Ô Môn từ 500.000đ/m² (tole thép tĩnh điện) đến 2.300.000đ/m² (nhôm công nghệ Đức), chưa bao gồm motor công nghiệp và VAT. Liên hệ 0945 042 345 để được khảo sát và báo giá tận nơi.",
  },
  {
    question: "Cửa cuốn khổ lớn cho nhà xưởng có thể rộng tối đa bao nhiêu?",
    answer:
      "Cửa cuốn công nghiệp có thể lắp đặt với khổ rộng từ 2m đến 10m, cao từ 2,5m đến 6m. Với khổ trên 6m thường dùng motor công nghiệp 3 pha công suất lớn. Chúng tôi khảo sát thực tế để tư vấn giải pháp phù hợp nhất.",
  },
  {
    question: "Lắp cửa cuốn tại Ô Môn có xa không, có mất phí đi lại không?",
    answer:
      "Ô Môn cách showroom Bình Thủy khoảng 15–20km. Phí đi lại (nếu có) sẽ được thông báo rõ ràng trước khi ký hợp đồng và thường được tính vào gói lắp đặt — không phát sinh sau khi đã chốt giá.",
  },
  {
    question: "Nhà xưởng ở Ô Môn nên chọn motor cửa cuốn gì?",
    answer:
      "Nhà xưởng vận hành nhiều lần trong ngày nên chọn motor công nghiệp 3 pha (từ 1HP trở lên) của các thương hiệu uy tín như Somfy, CAME hoặc Nice. Motor dân dụng 1 pha tiết kiệm chi phí hơn nhưng chỉ phù hợp với cửa vận hành không quá 20–30 lần/ngày.",
  },
  {
    question: "Cửa cuốn bảo hành bao lâu?",
    answer:
      "Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất — tối thiểu 5 năm cho cửa cuốn nhôm và thép, 10 năm cho một số dòng cao cấp. Trong thời gian bảo hành, sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-o-mon#service`,
      name: "Cửa Cuốn Ô Môn Cần Thơ",
      description:
        "Lắp đặt và sửa chữa cửa cuốn tại Ô Môn, Cần Thơ — cửa cuốn công nghiệp khổ lớn, nhôm đức, thép tĩnh điện, inox. Bảo hành chính hãng.",
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
        { "@type": "AdministrativeArea", name: "Ô Môn, Cần Thơ" },
        ...areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a}, Ô Môn, Cần Thơ` })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-o-mon#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Ô Môn", item: `${siteUrl}/cua-cuon-o-mon` },
      ],
    },
  ],
};

export default function CuaCuonOMon() {
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
              Chuyên kho xưởng & khu công nghiệp Ô Môn
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Ô Môn —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Chuyên Kho Xưởng Khổ Lớn, Lắp Đặt Tận Nơi
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Chuyên lắp cửa cuốn công nghiệp, nhà xưởng và nhà phố tại Ô Môn — khảo sát miễn phí,
              linh hoạt lịch lắp đặt, bảo hành chính hãng 5–10 năm.
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
                Các Dòng Cửa Cuốn Tại Ô Môn
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
              Phục Vụ Toàn Bộ Phường Thuộc Ô Môn
            </h2>
            <p className="mt-3 text-muted-foreground">Khảo sát tận nơi, báo giá miễn phí</p>
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
            <Link href="/cua-cuon-nha-xuong-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhà Xưởng</p>
                <p className="text-sm text-muted-foreground">Chuyên khổ lớn công nghiệp</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/bao-gia-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Báo Giá Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Bảng giá chính thức</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/blog/motor-cua-cuon-tot-nhat" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Motor Cửa Cuốn Nào Tốt?</p>
                <p className="text-sm text-muted-foreground">So sánh 5 thương hiệu</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Lắp Cửa Cuốn Tại Ô Môn — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, tư vấn đúng giải pháp cho nhà xưởng và nhà phố. Bảo hành chính hãng 5–10 năm.
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
