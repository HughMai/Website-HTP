import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Nhôm Cần Thơ — Công Nghệ Đức, Bảo Hành Chính Hãng",
  description:
    "Cửa cuốn nhôm tại Cần Thơ — công nghệ Đức, nhôm đùn dày 0.8–1.2mm, vận hành êm tuyệt đối. Lắp đặt trọn gói, bảo hành chính hãng. Báo giá miễn phí: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-cuon-nhom-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-nhom-can-tho`,
    title: "Cửa Cuốn Nhôm Cần Thơ — Công Nghệ Đức, Bảo Hành Chính Hãng",
    description:
      "Cửa cuốn nhôm công nghệ Đức tại Cần Thơ. Lắp đặt trọn gói, bảo hành chính hãng. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
  },
};

const variants = [
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức (Tiêu Chuẩn)",
    spec: "Thanh nhôm đùn rộng 77mm, dày 0.8mm",
    best: "Nhà phố, cửa hàng, văn phòng",
    warranty: "Theo tiêu chuẩn NSX",
    note: "Phổ biến nhất — cân bằng giữa chi phí và chất lượng",
  },
  {
    name: "Cửa Cuốn Nhôm Công Nghệ Đức (Cao Cấp)",
    spec: "Thanh nhôm đùn rộng 77mm, dày 1.0–1.2mm",
    best: "Biệt thự, showroom, cao ốc văn phòng",
    warranty: "Theo tiêu chuẩn NSX",
    note: "Vận hành êm hơn, tuổi thọ dài hơn 20–30%",
  },
  {
    name: "Cửa Cuốn Nhôm Tấm Liền",
    spec: "Tấm nhôm liền phẳng, không khe hở",
    best: "Spa, phòng khám, studio",
    warranty: "Theo tiêu chuẩn NSX",
    note: "Cách âm tốt, thẩm mỹ tối giản hiện đại",
  },
  {
    name: "Cửa Trượt Trần Nhôm",
    spec: "Thanh nhôm chạy ray trên trần nhà",
    best: "Garage ngầm, tầng hầm có trần thấp",
    warranty: "Theo tiêu chuẩn NSX",
    note: "Tiết kiệm không gian tối đa — không cần cuộn hộp phía trên",
  },
];

const advantages = [
  {
    icon: "🔇",
    title: "Vận hành cực êm",
    desc: "Lò xo cân bằng chính xác và ray nhôm đùn giảm tiếng ồn xuống dưới 45dB — êm hơn cửa thép 60%.",
  },
  {
    icon: "⚖️",
    title: "Nhẹ — motor bền lâu hơn",
    desc: "Nhôm nhẹ hơn thép 60%, giảm tải cho motor — motor bền hơn 2–3 lần so với lắp cửa thép cùng kích thước.",
  },
  {
    icon: "🌧️",
    title: "Chống oxy hóa vĩnh cửu",
    desc: "Nhôm đùn anodize không gỉ, không bong sơn dù tiếp xúc mưa nắng nhiều năm liên tục.",
  },
  {
    icon: "🎨",
    title: "Đa dạng màu sắc",
    desc: "Sơn tĩnh điện với hơn 20 màu chuẩn RAL — trắng, xám, nâu gỗ, đen — hoặc theo yêu cầu.",
  },
  {
    icon: "🔒",
    title: "Khóa ngang tích hợp",
    desc: "Tùy chọn lắp thêm khóa ngang chống cạy — bảo mật cao cho nhà phố và cửa hàng ban đêm.",
  },
  {
    icon: "🛡️",
    title: "Bảo hành chính hãng",
    desc: "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất — miễn phí sửa chữa tại nhà trong thời gian bảo hành.",
  },
];

const pricing = [
  { size: "Rộng 2.5m × Cao 2.5m", range: "3.800.000 – 5.500.000 đ" },
  { size: "Rộng 3.0m × Cao 2.8m", range: "4.500.000 – 6.500.000 đ" },
  { size: "Rộng 4.0m × Cao 3.0m", range: "6.000.000 – 9.000.000 đ" },
  { size: "Rộng 5.0m × Cao 3.5m", range: "8.500.000 – 13.000.000 đ" },
  { size: "Rộng 6.0m trở lên", range: "Liên hệ báo giá" },
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Cửa cuốn nhôm Cần Thơ giá bao nhiêu?",
    answer:
      "Giá cửa cuốn nhôm tại Cần Thơ dao động từ 3.800.000 đến 13.000.000 đồng tùy kích thước và loại nhôm. Giá đã bao gồm motor, phụ kiện và nhân công lắp đặt. Liên hệ để được báo giá chính xác theo kích thước thực tế.",
  },
  {
    question: "Cửa cuốn nhôm có bền hơn cửa cuốn thép không?",
    answer:
      "Nhôm bền hơn trong điều kiện ẩm ướt vì không gỉ. Tuy nhiên, thép chịu lực va đập tốt hơn — phù hợp hơn với nhà xưởng, kho bãi. Với nhà phố và cửa hàng thương mại, cửa cuốn nhôm là lựa chọn tối ưu về cả thẩm mỹ lẫn độ bền lâu dài.",
  },
  {
    question: "Cửa cuốn nhôm công nghệ Đức có gì khác so với hàng thường?",
    answer:
      "Cửa cuốn nhôm công nghệ Đức sử dụng thanh nhôm đùn theo tiêu chuẩn DIN với độ dày đồng đều, lò xo cân bằng tính toán chính xác theo trọng lượng cửa. Kết quả là vận hành êm hơn, tuổi thọ dài hơn và ít cần bảo trì hơn so với hàng Trung Quốc thông thường.",
  },
  {
    question: "Lắp cửa cuốn nhôm mất bao lâu?",
    answer:
      "Một cửa cuốn nhôm tiêu chuẩn (rộng 3–4m) được lắp đặt hoàn chỉnh trong 4–6 giờ. Chúng tôi có thể lắp đặt trong ngày tại tất cả quận huyện Cần Thơ.",
  },
  {
    question: "Cửa cuốn nhôm có cần bảo trì không?",
    answer:
      "Cần bảo trì nhẹ 1 lần/năm — tra dầu lò xo, kiểm tra ray và bu-lông. Chúng tôi cung cấp dịch vụ bảo trì định kỳ miễn phí trong năm đầu tiên.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-nhom-can-tho#service`,
      name: "Cửa Cuốn Nhôm Cần Thơ",
      description:
        "Cung cấp và lắp đặt cửa cuốn nhôm công nghệ Đức tại Cần Thơ — nhôm đùn dày, vận hành êm, bảo hành chính hãng.",
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
      "@id": `${siteUrl}/cua-cuon-nhom-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Nhôm Cần Thơ", item: `${siteUrl}/cua-cuon-nhom-can-tho` },
      ],
    },
  ],
};

export default function CuaCuonNhomCanTho() {
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
              Cửa cuốn nhôm — Công nghệ Đức
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cửa Cuốn Nhôm Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Công Nghệ Đức, Bảo Hành Chính Hãng
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Nhôm đùn dày 0.8–1.2mm theo tiêu chuẩn Đức — vận hành êm, nhẹ, không gỉ bất kể
              thời tiết. Lắp đặt trọn gói tại tất cả quận huyện Cần Thơ, báo giá miễn phí.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/#lien-he">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Báo giá miễn phí
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" />
              {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Variants */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Dòng Cửa Cuốn Nhôm
              </h2>
              <p className="mt-3 text-muted-foreground">
                Từ tiêu chuẩn đến cao cấp — tư vấn đúng loại theo công trình
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {variants.map((v) => (
                <div key={v.name} className="rounded-xl border bg-card p-6">
                  <h3 className="font-semibold text-brand">{v.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{v.spec}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{v.note}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                      {v.best}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                      Bảo hành {v.warranty}
                    </span>
                  </div>
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
                Tại Sao Chọn Cửa Cuốn Nhôm?
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

        {/* Pricing reference */}
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Báo Giá Cửa Cuốn Nhôm Tham Khảo
              </h2>
              <p className="mt-3 text-muted-foreground">
                Giá trọn gói bao gồm vật tư, motor và nhân công lắp đặt
              </p>
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
              * Giá tham khảo cho cửa cuốn nhôm tiêu chuẩn kèm motor nhập khẩu. Giá chính xác sau khi khảo sát thực tế.
            </p>
            <div className="mt-6 text-center">
              <Link href="/bao-gia-cua-cuon-can-tho">
                <Button variant="outline" className="gap-2">
                  Xem bảng giá chi tiết theo từng loại cửa
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Lắp Cửa Cuốn Nhôm Toàn Cần Thơ
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span key={d} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  Cửa cuốn nhôm {d}
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
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Cần lắp mới?</p>
                <p className="mt-1 font-semibold text-brand">Xem dịch vụ lắp đặt trọn gói</p>
              </div>
              <Link href="/lap-dat-cua-cuon-can-tho" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Lắp Đặt Cửa Cuốn <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-2xl border bg-brand/5 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Cửa bị hỏng?</p>
                <p className="mt-1 font-semibold text-brand">Xem dịch vụ sửa chữa — đến tận nơi</p>
              </div>
              <Link href="/sua-chua-cua-cuon-can-tho" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Sửa Chữa Cửa Cuốn <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Báo Giá Cửa Cuốn Nhôm Miễn Phí
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát tận nơi — báo giá minh bạch — lắp xong mới thanh toán.
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
