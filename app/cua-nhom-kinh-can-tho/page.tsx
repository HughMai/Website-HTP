import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Nhôm Kính Cần Thơ — Lắp Đặt Chính Hãng, Bảo Hành 10 Năm",
  description:
    "Cửa nhôm kính Cần Thơ — hệ cửa đi, cửa sổ, mặt dựng, lan can cầu thang. Nhôm cao cấp, kính cách âm cách nhiệt. Lắp đặt trọn gói, bảo hành chính hãng. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/cua-nhom-kinh-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-nhom-kinh-can-tho`,
    title: "Cửa Nhôm Kính Cần Thơ — Lắp Đặt Chính Hãng, Bảo Hành 10 Năm",
    description:
      "Cửa nhôm kính Cần Thơ — hệ cửa đi, cửa sổ, mặt dựng, lan can. Bảo hành 10 năm. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const systems = [
  {
    name: "Hệ Cửa Đi Nhôm Kính",
    desc: "Cửa nhôm kính 1–4 cánh, mở quay hoặc trượt — sang trọng, cách âm tốt, phù hợp cửa chính nhà phố và biệt thự.",
    best: "Nhà phố, biệt thự, văn phòng",
    highlight: "Phổ biến nhất",
  },
  {
    name: "Hệ Cửa Sổ Nhôm Kính",
    desc: "Cửa sổ mở quay, lật nghiêng, trượt — kính cường lực hoặc Low-E cách nhiệt, giảm tiếng ồn và nhiệt độ phòng.",
    best: "Nhà ở, căn hộ, văn phòng",
    highlight: "Cách âm — Cách nhiệt",
  },
  {
    name: "Hệ Mặt Dựng Nhôm Kính",
    desc: "Vách kính toàn khối cho mặt tiền tòa nhà, văn phòng, showroom — khung nhôm định hình công nghiệp, kính hộp Low-E.",
    best: "Tòa nhà, showroom, công trình thương mại",
    highlight: "Sang trọng — Hiện đại",
  },
  {
    name: "Lan Can & Cầu Thang Nhôm Kính",
    desc: "Tay vịn và lan can nhôm kính cho cầu thang, ban công, sân thượng — an toàn, thẩm mỹ, chịu lực tốt.",
    best: "Nhà phố, biệt thự, công trình dân dụng",
    highlight: "An toàn — Thẩm mỹ cao",
  },
];

const advantages = [
  {
    icon: "🔇",
    title: "Cách âm vượt trội",
    desc: "Đường phố đông xe cộ trở thành tiếng thì thầm khi bạn đóng cửa. Kính hộp 2 lớp hoặc Low-E giảm tiếng ồn 30–40dB — giấc ngủ và sự tập trung trở lại.",
  },
  {
    icon: "🌡️",
    title: "Cách nhiệt — tiết kiệm điện",
    desc: "Buổi chiều nóng nung người bên ngoài — bên trong phòng mát hơn 5–7°C nhờ kính Low-E phản xạ tia hồng ngoại. Hóa đơn điện lạnh giảm thấy rõ.",
  },
  {
    icon: "✨",
    title: "Nhà phố nhìn khác hẳn",
    desc: "Profile nhôm định hình mỏng, đường nét sắc nét — hàng xóm hỏi bạn vừa sửa nhà hay xây mới. Không cần đập tường, chỉ cần thay cửa.",
  },
  {
    icon: "🛡️",
    title: "Bền 20 năm — không gỉ sét",
    desc: "Hàng xóm dùng cửa sắt phải sơn lại mỗi 2–3 năm. Bạn lắp nhôm kính một lần, 20 năm sau vẫn nguyên màu, không gỉ, không cong vênh.",
  },
  {
    icon: "🔒",
    title: "Khóa đa điểm an toàn",
    desc: "Hệ khóa chốt 3–5 điểm tích hợp vào profile nhôm — chống phá khóa và đột nhập hiệu quả hơn cửa gỗ hay sắt truyền thống.",
  },
  {
    icon: "🏗️",
    title: "Thi công trọn gói — lắp xong mới trả",
    desc: "Từ khảo sát, gia công đến lắp đặt hoàn thiện — Hưng Thành Phát lo toàn bộ. Chạy thử hài lòng, ký nghiệm thu, rồi mới thanh toán.",
  },
];

const pricing = [
  { system: "Cửa đi nhôm kính 1 cánh (0.8×2.1m)", range: "3.500.000 – 6.000.000 đ" },
  { system: "Cửa đi nhôm kính 2 cánh (1.6×2.1m)", range: "6.000.000 – 11.000.000 đ" },
  { system: "Cửa sổ nhôm kính (1.2×1.2m)", range: "2.200.000 – 4.500.000 đ" },
  { system: "Lan can nhôm kính (theo m dài)", range: "1.800.000 – 3.500.000 đ/m" },
  { system: "Mặt dựng nhôm kính (theo m²)", range: "1.200.000 – 2.500.000 đ/m²" },
  { system: "Kích thước đặc biệt / công trình lớn", range: "Liên hệ báo giá" },
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Cửa nhôm kính Cần Thơ giá bao nhiêu?",
    answer:
      "Giá cửa nhôm kính phụ thuộc vào loại hệ và kích thước. Cửa đi 1 cánh từ 3.500.000–6.000.000đ, cửa đi 2 cánh từ 6.000.000–11.000.000đ. Mặt dựng và lan can tính theo m². Liên hệ 0945 042 345 để được báo giá chính xác sau khảo sát.",
  },
  {
    question: "Cửa nhôm kính có chống nóng không?",
    answer:
      "Có, nếu dùng kính Low-E hoặc kính hộp 2 lớp. Kính Low-E phản xạ tia hồng ngoại, giảm nhiệt bức xạ vào phòng 40–60% so với kính đơn thông thường, giúp tiết kiệm điện điều hòa đáng kể trong khí hậu Cần Thơ.",
  },
  {
    question: "Nhôm Việt và nhôm nhập khẩu khác nhau như thế nào?",
    answer:
      "Nhôm nhập khẩu (Xingfa, Maxpro, Eurowindow) có độ dày thành ống cao hơn (1.4–2.0mm), bề mặt xử lý tốt hơn, ít bị cong vênh hơn. Nhôm Việt giá thấp hơn 20–30% nhưng phù hợp công trình không yêu cầu cao. Tư vấn viên sẽ giúp bạn chọn phù hợp ngân sách.",
  },
  {
    question: "Lắp cửa nhôm kính mất bao lâu?",
    answer:
      "Cửa đi và cửa sổ tiêu chuẩn: 1–2 ngày thi công sau khi gia công. Hệ mặt dựng lớn hoặc lan can nhiều tầng: 3–7 ngày. Thời gian gia công tại xưởng thêm 3–5 ngày làm việc sau khi chốt đơn.",
  },
  {
    question: "Cửa nhôm kính bảo hành bao lâu?",
    answer:
      "Hưng Thành Phát Door bảo hành cửa nhôm kính theo kỳ hạn tiêu chuẩn của nhà sản xuất — tối thiểu 5 năm cho profile nhôm và phụ kiện, 10 năm cho kính. Trong thời gian bảo hành, chúng tôi sửa chữa hoặc thay thế miễn phí tại công trình.",
  },
  {
    question: "Có nhận thi công công trình lớn như cao ốc, khu đô thị không?",
    answer:
      "Có. Hưng Thành Phát Door đã thi công 500+ công trình từ nhà phố đến cao ốc văn phòng và khu công nghiệp tại Cần Thơ và ĐBSCL. Liên hệ để được tư vấn phương án và báo giá theo quy mô dự án.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-nhom-kinh-can-tho#service`,
      name: "Cửa Nhôm Kính Cần Thơ",
      description:
        "Thi công cửa nhôm kính — hệ cửa đi, cửa sổ, mặt dựng, lan can cầu thang tại Cần Thơ. Bảo hành chính hãng.",
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
      "@id": `${siteUrl}/cua-nhom-kinh-can-tho#faq`,
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
      ],
    },
  ],
};

export default function CuaNhomKinhCanTho() {
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
              Nhôm kính — Cách âm, cách nhiệt, bền 20 năm không gỉ
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Nhà Phố Của Bạn Nhìn Khác Hẳn Sau Khi Lắp Nhôm Kính —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Cách Âm, Cách Nhiệt, Bền 20 Năm Không Lo Gỉ
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Đường phố ồn ào bên ngoài trở thành tiếng thì thầm khi đóng cửa nhôm kính. Kính
              Low-E giảm nhiệt 40–60%, profile nhôm bền 20+ năm không gỉ. Thi công trọn gói tại Cần Thơ.
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

        {/* Systems */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Hệ Cửa Nhôm Kính Thi Công Tại Cần Thơ
              </h2>
              <p className="mt-3 text-muted-foreground">Từ nhà phố đến công trình thương mại — đều có giải pháp phù hợp</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {systems.map((s) => (
                <div key={s.name} className="rounded-xl border bg-card p-6">
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {s.highlight}
                  </span>
                  <h3 className="mt-3 font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-brand/70">
                    <ShieldCheck className="h-3.5 w-3.5" /> {s.best}
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
                Tại Sao Chọn Cửa Nhôm Kính?
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
                Giá Cửa Nhôm Kính Tham Khảo
              </h2>
              <p className="mt-3 text-muted-foreground">Giá tham khảo — báo giá chính xác sau khảo sát thực tế</p>
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
                    <tr key={row.system}>
                      <td className="px-4 py-3">{row.system}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              * Giá chưa bao gồm VAT. Liên hệ để được báo giá trọn gói.
            </p>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Thi Công Cửa Nhôm Kính Toàn Cần Thơ
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span key={d} className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                  Cửa nhôm kính {d}
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
            <Link href="/lan-can-nhom-kinh-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Lan Can Nhôm Kính</p>
                <p className="text-sm text-muted-foreground">Cầu thang, ban công</p>
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
            <Link href="/cua-cuon-nhom-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
              <div>
                <p className="font-semibold text-brand">Cửa Cuốn Nhôm</p>
                <p className="text-sm text-muted-foreground">Công nghệ Đức</p>
              </div>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Nhà Phố Của Bạn Xứng Đáng Được Bảo Vệ Tốt Hơn
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Khảo sát miễn phí — báo giá tận nơi — thi công trọn gói, lắp xong mới thanh toán. Bồi thường 200% nếu sai vật liệu cam kết.
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
