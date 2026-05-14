import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Nhà Xưởng Cần Thơ — Khổ Lớn, Chịu Tải, Bền Bỉ",
  description:
    "Cửa cuốn nhà xưởng, kho hàng Cần Thơ — khổ rộng 4–12m, thép sơn tĩnh điện, tole Đài Loan, chịu tải nặng. Motor công nghiệp, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-nha-xuong-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-nha-xuong-can-tho`,
    title: "Cửa Cuốn Nhà Xưởng Cần Thơ — Khổ Lớn, Chịu Tải, Bền Bỉ",
    description:
      "Cửa cuốn nhà xưởng, kho hàng Cần Thơ — khổ lớn, motor công nghiệp. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const products = [
  {
    name: "Cửa Cuốn Tole Đài Loan — Nhà Xưởng",
    desc: "Tole thép sơn tĩnh điện 6 zem đến 1 ly — chi phí thấp, lắp được khổ rộng 6–10m, phù hợp kho hàng và nhà xưởng thông thường.",
    tag: "Tiết kiệm nhất",
    useCase: "Kho hàng, nhà xưởng nhỏ–vừa",
  },
  {
    name: "Cửa Cuốn Thép Sơn Tĩnh Điện",
    desc: "Thép tấm sơn tĩnh điện chống gỉ — chắc chắn hơn tole, phù hợp nhà xưởng cần bảo mật cao hơn, chịu va đập từ xe nâng và thiết bị.",
    tag: "Bảo mật cao",
    useCase: "Xưởng sản xuất, kho có hàng hóa giá trị",
  },
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức — Khổ Lớn",
    desc: "Thanh nhôm định hình vận hành êm, không gỉ sét — phù hợp nhà xưởng yêu cầu thẩm mỹ, showroom, trung tâm thương mại.",
    tag: "Cao cấp — Êm nhất",
    useCase: "Showroom, trung tâm thương mại",
  },
  {
    name: "Cửa Trượt Trần Nhà Xưởng",
    desc: "Cửa trượt theo ray trần — không chiếm diện tích sàn, phù hợp nhà xưởng có cầu trục hoặc thiết bị lớn di chuyển qua cửa.",
    tag: "Tiết kiệm diện tích",
    useCase: "Nhà xưởng có cầu trục, xưởng cơ khí",
  },
];

const features = [
  {
    icon: "📏",
    title: "Khổ cửa từ 3–12m",
    desc: "Sản xuất theo đặt hàng — không giới hạn khổ rộng. Lắp được cửa rộng 10–12m cho xe container ra vào.",
  },
  {
    icon: "⚙️",
    title: "Motor công nghiệp 500kg–1000kg",
    desc: "Motor tải trọng cao cho cửa khổ lớn, nặng — đảm bảo vận hành trơn tru dù cửa mở cả trăm lần mỗi ngày.",
  },
  {
    icon: "🔋",
    title: "Bình lưu điện — không gián đoạn sản xuất",
    desc: "Bình lưu điện tích hợp giúp cửa tiếp tục vận hành khi mất điện — quan trọng cho dây chuyền sản xuất liên tục.",
  },
  {
    icon: "🛡️",
    title: "Chống gỉ — bền trong môi trường công nghiệp",
    desc: "Sơn tĩnh điện epoxy chống hóa chất và độ ẩm cao — phù hợp nhà xưởng chế biến thực phẩm, hóa chất, đông lạnh.",
  },
  {
    icon: "⚡",
    title: "Lắp đặt ngoài giờ sản xuất",
    desc: "Đội kỹ thuật thi công buổi tối hoặc cuối tuần để không ảnh hưởng đến hoạt động sản xuất của nhà xưởng.",
  },
  {
    icon: "🔧",
    title: "Bảo trì định kỳ theo hợp đồng",
    desc: "Gói bảo trì định kỳ 6 tháng/lần — kiểm tra motor, dầu ray, cân bằng lò xo — kéo dài tuổi thọ cửa 2–3 lần.",
  },
];

const useCases = [
  "Nhà xưởng sản xuất", "Kho hàng logistics", "Kho lạnh đông lạnh",
  "Xưởng cơ khí", "Garage xe tải", "Trung tâm phân phối",
  "Nhà máy chế biến thực phẩm", "Khu công nghiệp Cần Thơ",
];

const faqItems = [
  {
    question: "Cửa cuốn nhà xưởng Cần Thơ khổ lớn giá bao nhiêu?",
    answer:
      "Giá cửa cuốn nhà xưởng phụ thuộc vào khổ cửa và chất liệu. Tole Đài Loan từ 500.000đ/m², thép tĩnh điện từ 700.000đ/m². Motor tải trọng 500kg khoảng 4.000.000đ, 1000kg khoảng 6.000.000–8.000.000đ. Liên hệ để được báo giá trọn gói.",
  },
  {
    question: "Cửa cuốn nhà xưởng rộng 6–8m có lắp được không?",
    answer:
      "Có. Hưng Thành Phát Door sản xuất cửa cuốn nhà xưởng theo đặt hàng, khổ rộng từ 3m đến 12m. Cửa rộng trên 5m thường cần motor tải trọng cao 500–1000kg và gia cố hệ trục cuốn.",
  },
  {
    question: "Nhà xưởng mất điện — cửa cuốn có mở được không?",
    answer:
      "Có 2 phương án: (1) Bình lưu điện tự động chuyển sang pin khi mất điện lưới; (2) Cơ cấu mở bằng tay dự phòng luôn có sẵn. Khuyến nghị lắp bình lưu điện cho nhà xưởng sản xuất liên tục.",
  },
  {
    question: "Bao lâu thì lắp xong cửa cuốn nhà xưởng?",
    answer:
      "Cửa tiêu chuẩn (dưới 6m): 1 ngày thi công. Cửa khổ lớn (6–12m): 1–2 ngày. Thời gian gia công tại xưởng thêm 3–5 ngày. Có thể thi công ngoài giờ sản xuất theo yêu cầu.",
  },
  {
    question: "Cửa cuốn nhà xưởng bảo hành bao lâu?",
    answer:
      "Bảo hành theo kỳ hạn tiêu chuẩn nhà sản xuất — tối thiểu 5 năm cho cửa và motor nhập khẩu. Khuyến nghị ký hợp đồng bảo trì định kỳ 6 tháng/lần để kéo dài tuổi thọ thiết bị.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-nha-xuong-can-tho#service`,
      name: "Cửa Cuốn Nhà Xưởng Cần Thơ",
      description:
        "Lắp đặt cửa cuốn công nghiệp khổ lớn cho nhà xưởng, kho hàng tại Cần Thơ. Motor công nghiệp tải trọng cao, bảo hành chính hãng.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
      },
      areaServed: [{ "@type": "City", name: "Cần Thơ" }],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/cua-cuon-nha-xuong-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Nhà Xưởng Cần Thơ", item: `${siteUrl}/cua-cuon-nha-xuong-can-tho` },
      ],
    },
  ],
};

export default function CuaCuonNhaXuongCanTho() {
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
              Cửa cuốn công nghiệp — Nhà xưởng, kho hàng
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Nhà Xưởng Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Khổ Lớn, Chịu Tải, Motor Công Nghiệp
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Cửa cuốn công nghiệp cho nhà xưởng, kho hàng, kho lạnh tại Cần Thơ — khổ rộng 3–12m,
              motor tải trọng cao 500–1000kg, bình lưu điện dự phòng, bảo hành chính hãng.
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

        {/* Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Dòng Cửa Cuốn Cho Nhà Xưởng & Kho Hàng
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
                  <p className="mt-3 text-xs text-brand/70 font-medium">Phù hợp: {p.useCase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Đặc Điểm Cửa Cuốn Công Nghiệp
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-background p-6">
                  <div className="mb-3 text-3xl">{f.icon}</div>
                  <h3 className="mb-2 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Ứng Dụng Phổ Biến</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {useCases.map((u) => (
                <span key={u} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  {u}
                </span>
              ))}
            </div>
          </div>
        </section>

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
          <div className="container max-w-3xl grid gap-4 sm:grid-cols-3">
            <Link href="/bao-gia-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Báo Giá Cửa Cuốn</p>
                <p className="text-sm text-muted-foreground">Giá chính thức theo m²</p>
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
                <p className="text-sm text-muted-foreground">Motor, ray, lò xo</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cần Lắp Cửa Cuốn Nhà Xưởng Tại Cần Thơ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí — báo giá trọn gói — thi công ngoài giờ sản xuất theo yêu cầu.
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
