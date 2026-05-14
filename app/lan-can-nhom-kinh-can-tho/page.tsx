import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Lan Can Nhôm Kính Cần Thơ — Cầu Thang, Ban Công, Sân Thượng",
  description:
    "Lan can nhôm kính Cần Thơ — cầu thang, ban công, sân thượng. Kính cường lực an toàn, khung nhôm bền bỉ, thẩm mỹ cao. Lắp đặt trọn gói, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/lan-can-nhom-kinh-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/lan-can-nhom-kinh-can-tho`,
    title: "Lan Can Nhôm Kính Cần Thơ — Cầu Thang, Ban Công, Sân Thượng",
    description:
      "Lan can nhôm kính Cần Thơ — kính cường lực, khung nhôm cao cấp. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const types = [
  {
    name: "Lan Can Cầu Thang Nhôm Kính",
    desc: "Tay vịn nhôm anod kết hợp tấm kính cường lực 8–12mm — an toàn tuyệt đối, tạo cảm giác rộng thoáng cho cầu thang nhà phố.",
    tag: "Phổ biến nhất",
  },
  {
    name: "Lan Can Ban Công Nhôm Kính",
    desc: "Hệ lan can ban công tầng 2–4 — kính cường lực chịu lực tốt, chắn gió hiệu quả, tầm nhìn thông thoáng.",
    tag: "An toàn cao",
  },
  {
    name: "Lan Can Sân Thượng",
    desc: "Lan can nhôm kính sân thượng chịu được gió lớn và thời tiết khắc nghiệt — phù hợp nhà phố và căn hộ tại Cần Thơ.",
    tag: "Chịu thời tiết",
  },
  {
    name: "Vách Kính Phân Cách",
    desc: "Vách kính nhôm phân cách không gian trong nhà — văn phòng, phòng khách, phòng tắm kiểu open. Tăng ánh sáng tự nhiên.",
    tag: "Nội thất hiện đại",
  },
];

const advantages = [
  {
    icon: "🛡️",
    title: "Kính cường lực — con bạn leo cũng không lo",
    desc: "Kính cường lực 8–12mm chịu lực gấp 5 lần kính thường. Khi vỡ (rất hiếm) không tạo mảnh sắc — an toàn tuyệt đối cho trẻ em và người cao tuổi.",
  },
  {
    icon: "✨",
    title: "Cầu thang nhìn như biệt thự — từ 1.950.000đ/m",
    desc: "Kính trong suốt mở rộng tầm nhìn, ánh sáng lan khắp cầu thang. Khách đến nhà ai cũng hỏi thợ đâu để lắp.",
  },
  {
    icon: "🌊",
    title: "Không gỉ — không sơn lại — không lo mùa mưa",
    desc: "Nhôm anod hóa và kính không gỉ sét trong khí hậu nóng ẩm Cần Thơ. Trong khi hàng xóm sơn lại lan can sắt mỗi 2 năm, bạn chỉ cần lau kính.",
  },
  {
    icon: "🔧",
    title: "Bảo trì gần như bằng không",
    desc: "Không cần sơn lại, không cần xử lý định kỳ. Lau kính sạch là đủ — đơn giản như lau cửa sổ.",
  },
  {
    icon: "📐",
    title: "Gia công theo số đo thực tế",
    desc: "Mỗi bộ lan can được cắt và gia công theo số đo chính xác tại công trình — không có kích thước chuẩn ép buộc, phù hợp mọi thiết kế cầu thang.",
  },
  {
    icon: "💰",
    title: "Đẹp không kém inox — giá thấp hơn 20–30%",
    desc: "Lan can nhôm kính có thẩm mỹ ngang inox nhưng chi phí thấp hơn đáng kể. Tối ưu cho nhà phố muốn đẹp mà ngân sách có hạn.",
  },
];

const pricing = [
  { item: "Lan can cầu thang nhôm kính (m dài)", range: "1.800.000 – 3.500.000 đ/m" },
  { item: "Lan can ban công nhôm kính (m dài)", range: "1.500.000 – 2.800.000 đ/m" },
  { item: "Lan can sân thượng (m dài)", range: "1.600.000 – 3.000.000 đ/m" },
  { item: "Vách kính phân cách nội thất (m²)", range: "1.200.000 – 2.200.000 đ/m²" },
  { item: "Tay vịn nhôm đơn (không kính)", range: "600.000 – 1.200.000 đ/m" },
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Lan can nhôm kính Cần Thơ giá bao nhiêu?",
    answer:
      "Giá lan can nhôm kính tại Cần Thơ từ 1.500.000 đến 3.500.000 đồng mỗi mét dài, tùy loại (cầu thang, ban công, sân thượng) và độ dày kính. Chưa bao gồm VAT. Liên hệ để được báo giá sau khảo sát thực tế.",
  },
  {
    question: "Kính lan can có an toàn không khi bị va đập mạnh?",
    answer:
      "Chúng tôi dùng kính cường lực 8–12mm đạt tiêu chuẩn an toàn — chịu lực gấp 5 lần kính thường. Khi vỡ (rất hiếm xảy ra), kính vỡ thành hạt nhỏ tròn không sắc nhọn, không gây thương tích. Hoàn toàn an toàn cho gia đình có trẻ nhỏ.",
  },
  {
    question: "Lan can nhôm kính có cần bảo trì không?",
    answer:
      "Gần như không. Khung nhôm không gỉ sét, không cần sơn lại. Kính chỉ cần lau chùi định kỳ. Khuyến nghị kiểm tra đinh vít và kẹp kính mỗi 2–3 năm để đảm bảo độ chắc chắn.",
  },
  {
    question: "Bao lâu thì làm xong lan can nhôm kính?",
    answer:
      "Thông thường 3–5 ngày làm việc từ khi đo đạc đến lắp đặt hoàn thiện. Bao gồm: 1 ngày khảo sát và đo đạc, 2–3 ngày gia công tại xưởng, 1 ngày lắp đặt tại công trình.",
  },
  {
    question: "Có thể làm lan can theo thiết kế riêng không?",
    answer:
      "Có. Hưng Thành Phát Door gia công theo bản vẽ hoặc yêu cầu riêng — tay vịn đơn, có thanh đứng, kính ốp toàn phần, hoặc kết hợp nhôm và kính theo tỷ lệ tuỳ ý. Liên hệ để được tư vấn và báo giá.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/lan-can-nhom-kinh-can-tho#service`,
      name: "Lan Can Nhôm Kính Cần Thơ",
      description:
        "Thi công lan can nhôm kính — cầu thang, ban công, sân thượng tại Cần Thơ. Kính cường lực an toàn, bảo hành chính hãng.",
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
      "@id": `${siteUrl}/lan-can-nhom-kinh-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Cửa Nhôm Kính Cần Thơ", item: `${siteUrl}/cua-nhom-kinh-can-tho` },
        { "@type": "ListItem", position: 3, name: "Lan Can Nhôm Kính Cần Thơ", item: `${siteUrl}/lan-can-nhom-kinh-can-tho` },
      ],
    },
  ],
};

export default function LanCanNhomKinhCanTho() {
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
              Lan can nhôm kính — Đẹp như biệt thự, không gỉ, không sơn lại
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Cầu Thang Nhà Bạn Có Thể Nhìn Như Biệt Thự —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Lan Can Nhôm Kính Cần Thơ, Không Gỉ, Không Sơn Lại
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Hàng xóm dùng sắt sơn — phải sơn lại mỗi 2 năm. Bạn lắp nhôm kính một lần —
              20 năm sau vẫn sáng bóng, không gỉ, không cần sơn lại. Gia công theo số đo thực tế, lắp trọn gói.
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

        {/* Types */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Loại Lan Can Nhôm Kính
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {types.map((t) => (
                <div key={t.name} className="rounded-xl border bg-card p-6">
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {t.tag}
                  </span>
                  <h3 className="mt-3 font-semibold">{t.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
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
                Tại Sao Chọn Lan Can Nhôm Kính?
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
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Giá Lan Can Tham Khảo</h2>
              <p className="mt-3 text-muted-foreground">Giá tính theo m dài hoặc m² — chưa bao gồm VAT</p>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Hạng mục</th>
                    <th className="px-4 py-3 text-right font-semibold">Chi phí tham khảo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pricing.map((row) => (
                    <tr key={row.item}>
                      <td className="px-4 py-3">{row.item}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              * Giá chính xác sau khi khảo sát và đo đạc thực tế.
            </p>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Thi Công Lan Can Toàn Cần Thơ</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span key={d} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  Lan can nhôm kính {d}
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
            <Link href="/cua-nhom-kinh-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Nhôm Kính Cần Thơ</p>
                <p className="text-sm text-muted-foreground">Hệ cửa đi, cửa sổ, mặt dựng</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
            <Link href="/bang-gia-cua-nhom-kinh-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Bảng Giá Nhôm Kính</p>
                <p className="text-sm text-muted-foreground">Giá chính thức 2025</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cầu Thang Nhà Bạn Xứng Đáng Nhìn Khác Hơn
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí, gia công theo số đo thực tế, lắp xong mới thanh toán.
              Bồi thường 200% nếu dùng sai vật liệu cam kết.
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
