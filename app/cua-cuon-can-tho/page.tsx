import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight, ShieldCheck, Factory, HandCoins } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { ProductPhotos } from "@/components/sections/ProductPhotos";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Cần Thơ — Xưởng Sản Xuất Từ 2005",
  description:
    "Cửa cuốn Cần Thơ — xưởng sản xuất và lắp đặt tại Bình Thủy từ 2005, hơn 500 công trình. Đủ loại: nhôm công nghệ Đức, thép sơn tĩnh điện, tấm liền, song ngang, inox. Khảo sát miễn phí, trả đủ vào ngày lắp đặt. Gọi: 0963 021 639.",
  alternates: { canonical: `${siteUrl}/cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-can-tho`,
    title: "Cửa Cuốn Cần Thơ — Xưởng Sản Xuất Từ 2005",
    description:
      "Xưởng cửa cuốn tại Cần Thơ từ 2005. Đủ loại cửa cuốn, khảo sát miễn phí, trả đủ vào ngày lắp đặt. Gọi: 0963 021 639.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const types = [
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức",
    desc: "Nan nhôm định hình, cách âm và cách nhiệt tốt, vận hành êm. Không gỉ sét — phù hợp khí hậu ẩm miền Tây.",
    best: "Nhà phố, garage, showroom",
    highlight: "Phổ biến nhất",
    href: "/cua-cuon-nhom-can-tho",
  },
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Nan thép mạ kẽm sơn tĩnh điện — chịu lực cao, chi phí hợp lý hơn nhôm, bền với va đập mạnh.",
    best: "Nhà kinh doanh, kho hàng",
    highlight: "Chi phí tối ưu",
    href: "/blog/nhom-duc-vs-thep-tinh-dien",
  },
  {
    name: "Cửa Cuốn Tấm Liền",
    desc: "Bề mặt liền khối, không khe hở — chống bụi, chống nước tạt và bảo mật cao nhất trong các dòng cửa cuốn.",
    best: "Mặt tiền cần kín, chống bụi",
    highlight: "Bảo mật cao",
    href: null,
  },
  {
    name: "Cửa Cuốn Song Ngang / Mắc Võng",
    desc: "Nan thưa cho phép thông gió và nhìn xuyên — vừa đóng cửa vừa trưng bày hàng hoá bên trong.",
    best: "Cửa hàng, showroom trưng bày",
    highlight: "Thông thoáng",
    href: null,
  },
  {
    name: "Cửa Cuốn Khe Thoáng",
    desc: "Khe thoáng giữa các nan giúp lưu thông không khí, giảm hầm nóng cho garage và nhà để xe.",
    best: "Garage, nhà để xe",
    highlight: "Thoáng khí",
    href: null,
  },
  {
    name: "Cửa Cuốn Khổ Lớn Nhà Xưởng",
    desc: "Khẩu độ rộng, motor công suất lớn, kết cấu gia cường — thiết kế riêng theo kích thước công trình.",
    best: "Nhà xưởng, kho bãi",
    highlight: "Khổ lớn",
    href: "/cua-cuon-nha-xuong-can-tho",
  },
];

const reasons = [
  {
    icon: Factory,
    title: "Xưởng thật tại Bình Thủy, không phải đại lý trung gian",
    desc: "Cửa được sản xuất và cắt theo đúng kích thước công trình ngay tại xưởng Cần Thơ — không chờ hàng chuyển từ TP.HCM, không phụ thuộc kích thước có sẵn.",
  },
  {
    icon: Clock,
    title: "Từ 2005 — đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ",
    desc: "21+ năm làm nghề, hơn 500 công trình và 1000+ khách hàng trong khu vực. Địa chỉ cố định, có mặt bằng, có đội thợ riêng.",
  },
  {
    icon: ShieldCheck,
    title: "Bồi thường 100% nếu sai vật tư đã cam kết",
    desc: "Vật tư ghi rõ trong hợp đồng. Sai vật tư đã cam kết, HTP bồi thường 100% giá trị hợp đồng.",
  },
  {
    icon: HandCoins,
    title: "Đặt cọc 30%, lắp đặt xong mới thanh toán",
    desc: "Đặt cọc 30% khi chốt hợp đồng, lắp đặt xong nghiệm thu hài lòng mới thanh toán. Khảo sát và báo giá miễn phí tận nơi trước khi bạn quyết định.",
  },
];

const districtLinks = [
  { name: "Ninh Kiều", href: "/cua-cuon-ninh-kieu" },
  { name: "Bình Thủy", href: "/cua-cuon-binh-thuy" },
  { name: "Cái Răng", href: "/cua-cuon-cai-rang" },
  { name: "Ô Môn", href: "/cua-cuon-o-mon" },
  { name: "Thốt Nốt", href: "/cua-cuon-thot-not" },
];

const otherDistricts = ["Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền", "Thới Lai"];

const steps = [
  { n: "01", title: "Gọi hoặc nhắn Zalo", desc: "Mô tả sơ bộ mặt tiền và nhu cầu. Chúng tôi tư vấn loại cửa phù hợp trước khi tới." },
  { n: "02", title: "Khảo sát & báo giá miễn phí", desc: "Đo đạc tận nơi, chốt kích thước và vật tư. Báo giá rõ ràng trước khi làm — không phát sinh." },
  { n: "03", title: "Sản xuất tại xưởng", desc: "Cắt và gia công đúng kích thước công trình tại xưởng Bình Thủy." },
  { n: "04", title: "Lắp đặt & bàn giao", desc: "Đội thợ lắp đặt, chạy thử, hướng dẫn sử dụng. Trả đủ vào ngày lắp đặt." },
];

const faqItems = [
  {
    question: "Cửa cuốn Cần Thơ giá bao nhiêu một mét vuông?",
    answer:
      "Giá cửa cuốn tại Cần Thơ phụ thuộc vào loại nan (nhôm, thép, tấm liền, song ngang), kích thước mặt tiền và loại motor đi kèm. Vì mỗi công trình một kích thước nên chúng tôi khảo sát và báo giá miễn phí tận nơi, chốt giá trước khi làm. Gọi 0963 021 639 để nhận báo giá trong ngày.",
  },
  {
    question: "Nên chọn cửa cuốn nhôm hay cửa cuốn thép?",
    answer:
      "Cửa cuốn nhôm công nghệ Đức nhẹ hơn, không gỉ sét, cách âm cách nhiệt tốt và vận hành êm — phù hợp nhà phố và garage. Cửa cuốn thép sơn tĩnh điện chịu lực và chịu va đập tốt hơn với chi phí thấp hơn — phù hợp nhà kinh doanh và kho hàng. Với khí hậu ẩm ở Cần Thơ, nhôm thường bền hơn về lâu dài.",
  },
  {
    question: "Lắp cửa cuốn ở Cần Thơ mất bao lâu?",
    answer:
      "Với kích thước tiêu chuẩn, thời gian lắp đặt tại chỗ khoảng 3–5 giờ. Vì cửa được sản xuất ngay tại xưởng ở Bình Thủy nên không phải chờ hàng chuyển từ TP.HCM. Chúng tôi nhận lắp tại tất cả quận huyện Cần Thơ.",
  },
  {
    question: "Cửa cuốn có bảo hành không?",
    answer:
      "Có. Hưng Thành Phát Door bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất cho cả cửa và motor. Trong thời gian bảo hành, chúng tôi sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.",
  },
  {
    question: "Cửa cuốn tấm liền là gì?",
    answer:
      "Cửa cuốn tấm liền là loại cửa có bề mặt liền khối, không có khe hở giữa các nan. Ưu điểm là chống bụi, chống nước tạt và bảo mật cao nhất trong các dòng cửa cuốn. Nhược điểm là không thông gió, nên thường dùng cho mặt tiền cần kín hoàn toàn.",
  },
  {
    question: "Có nhận sửa cửa cuốn không hay chỉ lắp mới?",
    answer:
      "Chúng tôi nhận cả sửa chữa và lắp mới — thay motor, thay bình lưu điện, thay remote, chỉnh ray, bảo trì định kỳ cho mọi thương hiệu cửa cuốn, không chỉ cửa do chúng tôi lắp.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-can-tho#service`,
      name: "Cửa Cuốn Cần Thơ",
      serviceType: "Sản xuất và lắp đặt cửa cuốn",
      description:
        "Sản xuất, cung cấp và lắp đặt cửa cuốn tại Cần Thơ — cửa cuốn nhôm công nghệ Đức, thép sơn tĩnh điện, tấm liền, song ngang, khe thoáng và khổ lớn nhà xưởng. Xưởng tại Bình Thủy từ 2005.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
      },
      areaServed: [
        { "@type": "City", name: "Cần Thơ" },
        ...[...districtLinks.map((d) => d.name), ...otherDistricts].map((d) => ({
          "@type": "AdministrativeArea",
          name: `${d}, Cần Thơ`,
        })),
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Cần Thơ", item: `${siteUrl}/cua-cuon-can-tho` },
      ],
    },
  ],
};

export default function CuaCuonCanTho() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Xưởng sản xuất tại Bình Thủy — từ 2005
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Xưởng Thật, Giá Báo Trước, Trả Đủ Vào Ngày Lắp Đặt
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. 21+ năm, hơn 500 công trình.
              Cửa cắt đúng kích thước ngay tại xưởng Bình Thủy — không chờ hàng chuyển từ TP.HCM.
            </p>
            <ZaloQuoteCard source="Cửa cuốn Cần Thơ · đầu trang" className="mx-auto mt-8 max-w-md" />
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/bao-gia-cua-cuon-can-tho">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Nhận báo giá miễn phí
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
                Các Loại Cửa Cuốn Tại Cần Thơ
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Mỗi mặt tiền một nhu cầu khác nhau. Chúng tôi tư vấn đúng loại theo mục đích sử dụng
                và ngân sách — không upsell dòng đắt hơn nếu bạn không cần.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {types.map((t) => {
                const card = (
                  <div className="h-full rounded-xl border bg-card p-6 transition-colors hover:bg-brand/5">
                    <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                      {t.highlight}
                    </span>
                    <h3 className="mt-3 font-semibold">{t.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand/70">
                      <ShieldCheck className="h-3.5 w-3.5" /> {t.best}
                    </p>
                  </div>
                );
                return t.href ? (
                  <Link key={t.name} href={t.href} className="block">
                    {card}
                  </Link>
                ) : (
                  <div key={t.name}>{card}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why HTP */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Vì Sao Chọn Hưng Thành Phát
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.title} className="rounded-xl border bg-background p-6">
                    <Icon className="mb-3 h-6 w-6 text-brand" />
                    <h3 className="mb-2 font-semibold">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing pointer */}
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Giá Cửa Cuốn Cần Thơ</h2>
            <p className="mt-4 text-muted-foreground">
              Giá cửa cuốn phụ thuộc vào loại nan, kích thước mặt tiền và loại motor. Vì mỗi công trình
              một kích thước, chúng tôi khảo sát và báo giá miễn phí tận nơi — và chốt giá trước khi làm,
              không phát sinh giữa chừng.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/bao-gia-cua-cuon-can-tho">
                <Button size="lg">Nhận báo giá cửa cuốn</Button>
              </Link>
              <Link href="/bang-gia-cua-keo-can-tho">
                <Button size="lg" variant="outline">
                  Xem bảng giá cửa kéo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Quy Trình Làm Việc</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="rounded-xl border bg-background p-6">
                  <span className="text-sm font-bold tracking-widest text-brand/70">{s.n}</span>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Districts */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Lắp Cửa Cuốn Toàn Cần Thơ
            </h2>
            <p className="mt-3 text-muted-foreground">
              Đội thợ có mặt tại tất cả quận huyện. Chọn khu vực của bạn để xem chi tiết.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districtLinks.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-brand/20 bg-brand/5 px-4 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  Cửa cuốn {d.name}
                </Link>
              ))}
              {otherDistricts.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-brand/10 px-4 py-2 text-sm font-medium text-brand/60"
                >
                  Cửa cuốn {d}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ProductPhotos
          categoryId="cua-cuon"
          heading="Ảnh cửa cuốn Hưng Thành Phát đã lắp tại Cần Thơ"
        />

        <CtaBand source="Cửa cuốn Cần Thơ" />

        {/* FAQ */}
        <section className="bg-muted/30 py-16 md:py-24">
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
          <div className="container max-w-4xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/lap-dat-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Lắp Đặt Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Trọn gói tận nơi</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </Link>
            <Link href="/sua-chua-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Sửa Chữa Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Motor, remote, ray</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </Link>
            <Link href="/cua-cuon-nhom-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhôm</p>
                <p className="text-sm text-muted-foreground">Công nghệ Đức</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </Link>
            <Link href="/cua-cuon-nha-xuong-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhà Xưởng</p>
                <p className="text-sm text-muted-foreground">Khổ lớn, chịu tải</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Khảo Sát Và Báo Giá Miễn Phí — Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Giá báo trước khi làm, không phát sinh. Đặt cọc 30%, lắp đặt xong mới thanh toán.
              Sai vật tư đã cam kết, HTP bồi thường 100% giá trị hợp đồng.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {SITE.hotlines.map((h, i) => (
                <a key={h} href={`tel:${h.replace(/\s/g, "")}`}>
                  <Button
                    size="lg"
                    variant={i === 0 ? "default" : "outline"}
                    className={
                      i === 0
                        ? "bg-white text-brand hover:bg-white/90"
                        : "border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
                    }
                  >
                    <Phone className="h-4 w-4" /> {h}
                  </Button>
                </a>
              ))}
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
