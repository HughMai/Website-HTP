import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Lắp Đặt Cửa Cuốn Cần Thơ — Trọn Gói",
  description:
    "Lắp đặt cửa cuốn tại Cần Thơ — nhôm Đức, thép tĩnh điện, inox, tôle. Thi công trọn gói, bảo hành chính hãng, có mặt trong ngày. Báo giá miễn phí: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/lap-dat-cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/lap-dat-cua-cuon-can-tho`,
    title: "Lắp Đặt Cửa Cuốn Cần Thơ — Trọn Gói",
    description:
      "Lắp đặt cửa cuốn nhôm, thép, inox tại Cần Thơ. Thi công trọn gói, bảo hành chính hãng. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};


const doorTypes = [
  {
    icon: "🏗️",
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Thanh nhôm đùn dày 0.8–1.2mm, cơ cấu lò xo cân bằng chính xác — vận hành êm, nhẹ, bền trên 10 năm.",
    best: "Nhà phố, biệt thự, showroom",
  },
  {
    icon: "⚙️",
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Thép dập sóng sơn tĩnh điện chống gỉ — phù hợp nhà xưởng, kho bãi, bảo mật cao.",
    best: "Nhà xưởng, kho hàng, cửa hàng",
  },
  {
    icon: "✨",
    name: "Cửa Cuốn Inox SUS 304",
    desc: "Inox 304 chống oxy hóa, sáng bóng vĩnh cửu — phù hợp môi trường ẩm hoặc yêu cầu thẩm mỹ cao.",
    best: "Nhà hàng, khách sạn, văn phòng",
  },
  {
    icon: "🔩",
    name: "Cửa Cuốn Tôle Công Nghệ Đài Loan",
    desc: "Tôle sóng dày, giá thành hợp lý — giải pháp kinh tế cho cửa hàng, nhà kho cần độ bền cơ bản.",
    best: "Cửa hàng tạp hóa, kho nhỏ",
  },
  {
    icon: "🔲",
    name: "Cửa Cuốn Tấm Liền",
    desc: "Bề mặt phẳng hoàn toàn, cách âm tốt — thiết kế hiện đại cho mặt tiền kinh doanh cao cấp.",
    best: "Spa, phòng khám, văn phòng",
  },
  {
    icon: "🌐",
    name: "Cửa Cuốn Song Ngang / Mắt Võng",
    desc: "Nan thép song hở thoáng, có thể quan sát bên trong khi đóng — phổ biến cho cửa hàng ban đêm.",
    best: "Cửa hàng, siêu thị mini",
  },
];

const steps = [
  {
    num: "01",
    title: "Khảo sát & tư vấn miễn phí",
    desc: "Kỹ thuật viên đến đo đạc tại chỗ, tư vấn loại cửa phù hợp công trình và ngân sách. Hoàn toàn miễn phí.",
  },
  {
    num: "02",
    title: "Báo giá minh bạch",
    desc: "Báo giá chi tiết theo từng hạng mục — vật tư, motor, phụ kiện, nhân công — không phát sinh ẩn.",
  },
  {
    num: "03",
    title: "Thi công lắp đặt",
    desc: "Đội kỹ thuật thi công đúng tiến độ, bảo vệ mặt sàn và tường, dọn dẹp sau lắp đặt.",
  },
  {
    num: "04",
    title: "Bàn giao & bảo hành",
    desc: "Chạy thử toàn hệ thống trước mặt chủ nhà, hướng dẫn sử dụng, cấp phiếu bảo hành theo tiêu chuẩn nhà sản xuất.",
  },
];

const included = [
  "Khảo sát và tư vấn tại nhà miễn phí",
  "Cung cấp cửa cuốn chính hãng, có CO/CQ",
  "Motor nhập khẩu, remote chính hãng",
  "Lắp đặt ray, thanh chắn, hộp motor",
  "Chạy thử và căn chỉnh toàn hệ thống",
  "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất",
  "Bảo trì định kỳ miễn phí năm đầu",
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Lắp đặt cửa cuốn tại Cần Thơ mất bao lâu?",
    answer:
      "Hầu hết các cửa cuốn tiêu chuẩn (rộng 3–5m) được lắp đặt hoàn chỉnh trong 4–6 giờ. Công trình nhiều cửa hoặc có yêu cầu đặc biệt có thể mất 1–2 ngày.",
  },
  {
    question: "Chi phí lắp cửa cuốn nhôm Cần Thơ khoảng bao nhiêu?",
    answer:
      "Chi phí lắp đặt cửa cuốn nhôm tại Cần Thơ dao động từ 3.500.000 đến 8.000.000 đồng tùy kích thước và loại motor. Giá bao gồm vật tư và nhân công. Liên hệ để được báo giá chính xác.",
  },
  {
    question: "Có cần cắt tường hay đục tường để lắp cửa cuốn không?",
    answer:
      "Thường không cần đục phá nhiều — kỹ thuật viên sử dụng khoan nở và khoan bê tông để gắn ray và hộp motor. Chúng tôi bảo vệ toàn bộ bề mặt và dọn dẹp sạch sau thi công.",
  },
  {
    question: "Hưng Thành Phát Door có lắp đặt cửa cuốn cho nhà xưởng lớn không?",
    answer:
      "Có. Chúng tôi thi công cửa cuốn cho mọi quy mô từ nhà phố đến nhà xưởng công nghiệp, cửa khổ rộng, cửa đặc biệt theo yêu cầu với motor tải trọng lớn.",
  },
  {
    question: "Cửa cuốn sau khi lắp có bảo hành không?",
    answer:
      "Có. Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/lap-dat-cua-cuon-can-tho#service`,
      name: "Lắp Đặt Cửa Cuốn Cần Thơ",
      description:
        "Dịch vụ lắp đặt cửa cuốn trọn gói tại Cần Thơ — nhôm Đức, thép tĩnh điện, inox, tôle. Bảo hành theo tiêu chuẩn nhà sản xuất.",
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
        { "@type": "City", name: "Cần Thơ" },
        ...districts.map((d) => ({ "@type": "AdministrativeArea", name: `${d}, Cần Thơ` })),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Các loại cửa cuốn lắp đặt",
        itemListElement: doorTypes.map((d) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: d.name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/lap-dat-cua-cuon-can-tho#faq`,
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Lắp Đặt Cửa Cuốn Cần Thơ",
          item: `${siteUrl}/lap-dat-cua-cuon-can-tho`,
        },
      ],
    },
  ],
};

export default function LapDatCuaCuonCanTho() {
  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Lắp đặt trọn gói — Gọi sáng, dùng chiều
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Lắp Cửa Cuốn Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Gọi Sáng Dùng Chiều, Báo Giá Trước Làm, Lắp Xong Mới Trả
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Báo giá trước khi làm — không phát sinh chi phí bất ngờ. Lắp xong chạy thử, ký
              nghiệm thu, rồi mới thanh toán. Có mặt tại tất cả quận huyện Cần Thơ trong ngày.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/#lien-he">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
                >
                  Yêu cầu báo giá miễn phí
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" />
              {SITE.workingHours} — Khảo sát & báo giá miễn phí
            </p>
          </div>
        </section>

        {/* Door types */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Loại Cửa Cuốn Lắp Đặt Tại Cần Thơ
              </h2>
              <p className="mt-3 text-muted-foreground">
                Đa dạng mẫu mã — tư vấn chọn đúng loại theo công trình và ngân sách
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {doorTypes.map((d) => (
                <div key={d.name} className="rounded-xl border bg-card p-6">
                  <div className="mb-3 text-3xl">{d.icon}</div>
                  <h3 className="mb-2 font-semibold">{d.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{d.desc}</p>
                  <p className="text-xs font-medium text-brand/70">
                    Phù hợp: {d.best}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Gói Lắp Đặt Trọn Gói Bao Gồm
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border bg-background p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Quy Trình Lắp Đặt 4 Bước
              </h2>
              <p className="mt-3 text-muted-foreground">
                Minh bạch từ khảo sát đến bàn giao
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.num} className="relative rounded-xl border bg-background p-6">
                  <div className="mb-3 text-4xl font-bold text-brand/15">{step.num}</div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Districts served */}
        <section className="bg-muted/30 py-14 md:py-16">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Phục Vụ Toàn Bộ Cần Thơ
            </h2>
            <p className="mt-3 text-muted-foreground">
              Đội kỹ thuật có mặt tại tất cả quận, huyện
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand"
                >
                  Lắp cửa cuốn {d}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Câu Hỏi Thường Gặp
              </h2>
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

        {/* Related service banner */}
        <section className="py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-brand/5 px-6 py-5 sm:flex-row">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">
                  Cửa cuốn bị hỏng?
                </p>
                <p className="mt-1 font-semibold text-brand">
                  Xem dịch vụ sửa chữa cửa cuốn — đến tận nơi trong ngày
                </p>
              </div>
              <Link
                href="/sua-chua-cua-cuon-can-tho"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Xem Dịch Vụ Sửa Chữa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Gọi Ngay — Lắp Xong Hôm Nay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, báo giá chi tiết trước khi làm, lắp xong mới thanh toán.
              Bồi thường 200% nếu dùng sai vật liệu cam kết.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  {SITE.hotlines[0]}
                </Button>
              </a>
              <a href={`tel:${SITE.hotlines[1].replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
                >
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[1]}
                </Button>
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" />
              {SITE.address}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
