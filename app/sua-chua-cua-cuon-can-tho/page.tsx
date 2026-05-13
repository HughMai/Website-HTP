import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Sửa Chữa Cửa Cuốn Cần Thơ — Đến Tận Nơi Trong Ngày",
  description:
    "Sửa cửa cuốn Cần Thơ chuyên nghiệp — motor cháy, remote lỗi, cuốn lệch ray, cửa không lên. Đến tận nơi trong ngày, báo giá minh bạch, bảo hành sau sửa. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/sua-chua-cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/sua-chua-cua-cuon-can-tho`,
    title: "Sửa Chữa Cửa Cuốn Cần Thơ — Đến Tận Nơi Trong Ngày",
    description:
      "Sửa cửa cuốn Cần Thơ chuyên nghiệp — motor cháy, remote lỗi, cuốn lệch ray. Đến tận nơi trong ngày, bảo hành sau sửa. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
  },
};

const commonIssues = [
  {
    icon: "⚡",
    title: "Motor cháy / quá tải",
    desc: "Cửa không phản hồi khi nhấn remote hoặc nghe tiếng kêu lạ từ hộp motor — cần kiểm tra cuộn dây và tụ điện.",
  },
  {
    icon: "📡",
    title: "Remote mất tín hiệu",
    desc: "Nhấn remote không phản ứng dù đã thay pin — thường do lập trình bị xóa hoặc bo mạch thu phát lỗi.",
  },
  {
    icon: "🔄",
    title: "Cửa cuốn lệch ray",
    desc: "Cửa bị kẹt khi lên hoặc xuống, phát tiếng cọ kim loại — cần chỉnh lại thanh ray và con lăn dẫn hướng.",
  },
  {
    icon: "🌀",
    title: "Lò xo gãy / giảm lực",
    desc: "Cửa nặng bất thường, motor quá tải sớm — dấu hiệu lò xo cân bằng đã yếu hoặc gãy cần thay mới.",
  },
  {
    icon: "🔋",
    title: "Bình lưu điện hỏng",
    desc: "Cửa không hoạt động khi mất điện — bình lưu cạn hoặc không nhận sạc, cần kiểm tra và thay thế.",
  },
  {
    icon: "🔩",
    title: "Dây cuốn mòn / đứt",
    desc: "Cửa cuốn không đều, mép nhăn hoặc nghe tiếng cọ liên tục — cần thay dây cuốn kịp thời tránh đứt đột ngột.",
  },
];

const steps = [
  {
    num: "01",
    title: "Gọi hoặc nhắn tin báo sự cố",
    desc: "Mô tả triệu chứng qua điện thoại — kỹ thuật viên tư vấn sơ bộ và ước tính chi phí ngay lập tức.",
  },
  {
    num: "02",
    title: "Kỹ thuật viên đến kiểm tra",
    desc: "Đội kỹ thuật có mặt trong ngày tại Cần Thơ, mang theo đủ phụ kiện phổ biến để xử lý ngay tại chỗ.",
  },
  {
    num: "03",
    title: "Báo giá minh bạch — xác nhận sửa",
    desc: "Kiểm tra xong báo giá rõ ràng trước khi sửa. Khách hàng đồng ý mới tiến hành — không phát sinh thêm.",
  },
  {
    num: "04",
    title: "Bàn giao & bảo hành",
    desc: "Chạy thử trước mặt khách, ký phiếu bảo hành từ 3–12 tháng tùy hạng mục sửa chữa.",
  },
];

const pricingRows = [
  { label: "Sửa / lập trình lại remote", range: "100.000 – 300.000 đ" },
  { label: "Chỉnh ray, con lăn lệch", range: "200.000 – 500.000 đ" },
  { label: "Thay lò xo cân bằng", range: "300.000 – 700.000 đ" },
  { label: "Sửa motor (cuộn dây, tụ, bo mạch)", range: "300.000 – 1.500.000 đ" },
  { label: "Thay motor nhập khẩu mới", range: "1.500.000 – 4.000.000 đ" },
  { label: "Thay bình lưu điện", range: "400.000 – 900.000 đ" },
  { label: "Thay dây cuốn", range: "200.000 – 600.000 đ" },
];

const faqItems = [
  {
    question: "Sửa cửa cuốn bị lỗi motor hết bao nhiêu tiền?",
    answer:
      "Chi phí sửa motor cửa cuốn tại Cần Thơ dao động từ 300.000 đến 1.500.000 đồng tùy loại motor và mức độ hỏng hóc. Chúng tôi báo giá miễn phí trước khi sửa, không phát sinh thêm.",
  },
  {
    question: "Sửa cửa cuốn mất bao lâu?",
    answer:
      "Hầu hết các sự cố thông thường như lỗi remote, cửa lệch ray, motor bị kẹt được xử lý trong 30–90 phút. Các hỏng hóc phức tạp hơn như thay motor mới có thể mất 2–4 giờ.",
  },
  {
    question: "Hưng Thành Phát Door có sửa cửa cuốn các hãng khác không?",
    answer:
      "Có. Chúng tôi sửa chữa tất cả các loại cửa cuốn nhôm, thép, inox, tôle — bất kể thương hiệu hay nơi mua. Kỹ thuật viên được đào tạo đa dạng hãng motor nhập khẩu.",
  },
  {
    question: "Có bảo hành sau khi sửa không?",
    answer:
      "Có. Tất cả dịch vụ sửa chữa được bảo hành từ 3 đến 12 tháng tùy hạng mục. Nếu phát sinh lại trong thời gian bảo hành, chúng tôi đến sửa miễn phí.",
  },
  {
    question: "Cửa cuốn không lên xuống có thể tự sửa không?",
    answer:
      "Không nên tự sửa vì cửa cuốn vận hành bằng điện và có dây cuốn chịu lực căng cao. Tự can thiệp sai có thể gây hỏng thêm hoặc mất an toàn. Hãy gọi kỹ thuật viên chuyên nghiệp.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/sua-chua-cua-cuon-can-tho#service`,
      name: "Sửa Chữa Cửa Cuốn Cần Thơ",
      description:
        "Dịch vụ sửa chữa cửa cuốn chuyên nghiệp tại Cần Thơ — motor cháy, remote lỗi, cuốn lệch ray. Đến tận nơi trong ngày, bảo hành sau sửa.",
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
      areaServed: { "@type": "City", name: "Cần Thơ" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dịch vụ sửa chữa cửa cuốn",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa motor cửa cuốn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa remote cửa cuốn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chỉnh cửa cuốn lệch ray" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thay lò xo cửa cuốn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thay bình lưu điện cửa cuốn" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/sua-chua-cua-cuon-can-tho#faq`,
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
          name: "Sửa Chữa Cửa Cuốn Cần Thơ",
          item: `${siteUrl}/sua-chua-cua-cuon-can-tho`,
        },
      ],
    },
  ],
};

export default function SuaChuaCuaCuonCanTho() {
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
              Dịch vụ sửa chữa — Cần Thơ
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Sửa Chữa Cửa Cuốn Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Đến Tận Nơi Trong Ngày
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Motor cháy, remote lỗi, cửa lệch ray, không lên xuống — Hưng Thành Phát Door có
              mặt trong ngày tại Cần Thơ, báo giá minh bạch trước khi sửa, bảo hành sau sửa từ
              3–12 tháng.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[0]}
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
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" />
              {SITE.workingHours} — Có mặt trong ngày
            </p>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Sự Cố Cửa Cuốn Phổ Biến
              </h2>
              <p className="mt-3 text-muted-foreground">
                Nhận diện triệu chứng — gọi đúng dịch vụ — sửa nhanh trong ngày
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {commonIssues.map((issue) => (
                <div key={issue.title} className="rounded-xl border bg-card p-6">
                  <div className="mb-3 text-3xl">{issue.icon}</div>
                  <h3 className="mb-2 font-semibold">{issue.title}</h3>
                  <p className="text-sm text-muted-foreground">{issue.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Quy Trình Sửa Chữa 4 Bước
              </h2>
              <p className="mt-3 text-muted-foreground">Minh bạch từ kiểm tra đến bàn giao</p>
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

        {/* Pricing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Tham Khảo Giá Sửa Chữa
              </h2>
              <p className="mt-3 text-muted-foreground">
                Giá dao động theo loại và mức độ hỏng hóc — báo giá chính xác tại nơi sau kiểm
                tra
              </p>
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
                  {pricingRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3">{row.label}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              * Giá chưa bao gồm phụ kiện thay thế nếu cần. Kỹ thuật viên báo giá đầy đủ trước
              khi tiến hành sửa chữa.
            </p>
          </div>
        </section>

        {/* Related service */}
        <section className="py-10 md:py-14">
          <div className="container max-w-3xl">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-brand/5 px-6 py-5 sm:flex-row">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">
                  Cần cửa cuốn mới?
                </p>
                <p className="mt-1 font-semibold text-brand">
                  Xem đầy đủ hệ thống cửa cuốn, cửa kéo & nhôm kính cao cấp
                </p>
              </div>
              <Link
                href="/#san-pham"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Xem Sản Phẩm
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Câu Hỏi Thường Gặp
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border bg-background p-6">
                  <h3 className="mb-2 font-semibold">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cửa Cuốn Bị Hỏng? Gọi Ngay
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Đội kỹ thuật Hưng Thành Phát Door sẵn sàng có mặt tại Cần Thơ — kiểm tra, báo giá
              minh bạch, sửa xong mới thanh toán.
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
