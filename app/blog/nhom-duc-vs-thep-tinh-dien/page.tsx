import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Cửa Cuốn Nhôm Đức Hay Thép Tĩnh Điện? So Sánh Chi Tiết 2026",
  description:
    "Nên chọn cửa cuốn nhôm công nghệ Đức hay thép sơn tĩnh điện? So sánh 6 tiêu chí: độ bền, tiếng ồn, giá, thẩm mỹ, bảo trì và phù hợp mục đích sử dụng.",
  alternates: { canonical: `${siteUrl}/blog/nhom-duc-vs-thep-tinh-dien` },
  openGraph: {
    type: "article",
    locale: "vi_VN",
    url: `${siteUrl}/blog/nhom-duc-vs-thep-tinh-dien`,
    title: "Cửa Cuốn Nhôm Đức Hay Thép Tĩnh Điện? So Sánh Chi Tiết 2026",
    description:
      "So sánh 6 tiêu chí giúp bạn chọn đúng: cửa cuốn nhôm đức vs thép tĩnh điện.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const comparison = [
  {
    criteria: "Độ bền",
    nhom: "20–30 năm. Nhôm anod hóa không gỉ sét, không bị ăn mòn trong khí hậu ẩm nhiệt đới.",
    thep: "10–15 năm nếu bảo trì tốt. Dễ gỉ sét tại mối hàn và vết xước nếu không xử lý kịp thời.",
    winner: "nhom",
  },
  {
    criteria: "Tiếng ồn vận hành",
    nhom: "Gần như im lặng. Thanh nhôm định hình vận hành êm, phù hợp nhà ở và văn phòng.",
    thep: "Có tiếng rung khi vận hành. Chấp nhận được cho kho xưởng, không phù hợp nhà ở cao cấp.",
    winner: "nhom",
  },
  {
    criteria: "Giá thành",
    nhom: "Cao hơn thép 60–100%. Mã KV 380R từ 1.450.000đ/m², mã CT 5222R từ 2.200.000đ/m².",
    thep: "Thấp hơn nhôm đáng kể. Tole 6 zem từ 500.000đ/m², tole 1 ly từ 780.000đ/m².",
    winner: "thep",
  },
  {
    criteria: "Thẩm mỹ",
    nhom: "Bề mặt mịn, đường nét sắc sảo, màu sắc phong phú. Nâng tầm ngoại thất nhà phố.",
    thep: "Bề mặt sơn tĩnh điện tạm ổn. Hạn chế về màu sắc và kiểu dáng so với nhôm.",
    winner: "nhom",
  },
  {
    criteria: "Bảo trì",
    nhom: "Gần như không cần bảo trì đặc biệt. Không cần sơn lại, không gỉ. Lau chùi định kỳ là đủ.",
    thep: "Cần kiểm tra và xử lý gỉ sét tại mối hàn mỗi 2–3 năm. Chi phí bảo trì cao hơn.",
    winner: "nhom",
  },
  {
    criteria: "Phù hợp",
    nhom: "Nhà phố, biệt thự, văn phòng, showroom, garage — nơi yêu cầu thẩm mỹ và độ bền cao.",
    thep: "Kho hàng, nhà xưởng, mặt tiền kinh doanh cần chi phí thấp — không ưu tiên thẩm mỹ.",
    winner: "tùy",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Nên chọn cửa cuốn nhôm đức hay thép tĩnh điện?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chọn nhôm đức nếu ưu tiên độ bền (20–30 năm), tiếng ồn thấp, thẩm mỹ cao — phù hợp nhà phố, biệt thự, văn phòng. Chọn thép tĩnh điện nếu ngân sách hạn chế và dùng cho kho xưởng, mặt tiền kinh doanh không yêu cầu thẩm mỹ cao.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa cuốn nhôm đức bền hơn thép bao nhiêu năm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cửa cuốn nhôm đức bền 20–30 năm trong điều kiện bình thường. Cửa cuốn thép sơn tĩnh điện bền 10–15 năm nếu bảo trì tốt. Nhôm không gỉ sét trong khi thép có thể gỉ tại mối hàn và vết xước.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa cuốn nhôm đức có ồn không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Không. Cửa cuốn nhôm đức vận hành gần như im lặng — thanh nhôm định hình trượt mượt trên ray không tạo tiếng rung như cửa cuốn thép. Đây là lý do nhôm được ưa chuộng cho nhà ở và văn phòng.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cửa Cuốn Nhôm Đức Hay Thép Tĩnh Điện? So Sánh Chi Tiết 2026",
  author: { "@type": "Organization", name: SITE.brand },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
  },
  datePublished: "2026-05-14",
  dateModified: "2026-05-14",
  url: `${siteUrl}/blog/nhom-duc-vs-thep-tinh-dien`,
  description: "So sánh 6 tiêu chí: cửa cuốn nhôm đức vs thép sơn tĩnh điện.",
};

export default function NhomDucVsThepTinhDien() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                So sánh & tư vấn
              </span>
              <span className="text-xs text-white/50">5 phút đọc</span>
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-4xl">
              Cửa Cuốn Nhôm Đức Hay Thép Tĩnh Điện?{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                So Sánh Chi Tiết 2026
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75 text-sm md:text-base">
              Câu hỏi phổ biến nhất khi chọn cửa cuốn — phân tích thực tế từ 15+ năm thi công tại Cần Thơ.
            </p>
          </div>
        </section>

        {/* Article content */}
        <article className="py-16 md:py-24">
          <div className="container max-w-3xl">

            {/* Intro */}
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Khi lắp cửa cuốn, hai lựa chọn phổ biến nhất tại Cần Thơ là <strong>cửa cuốn nhôm công nghệ Đức</strong> và <strong>cửa cuốn thép sơn tĩnh điện</strong>. Cả hai đều phổ biến, nhưng phù hợp với những nhu cầu khác nhau. Bài viết này so sánh 6 tiêu chí thực tế để bạn ra quyết định đúng.
              </p>
            </div>

            {/* Comparison table */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6">So Sánh 6 Tiêu Chí Quan Trọng</h2>
              <div className="space-y-4">
                {comparison.map((row) => (
                  <div key={row.criteria} className="rounded-xl border overflow-hidden">
                    <div className="bg-muted px-4 py-2.5 flex items-center justify-between">
                      <span className="font-semibold text-sm">{row.criteria}</span>
                      {row.winner === "nhom" && (
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Nhôm tốt hơn</span>
                      )}
                      {row.winner === "thep" && (
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Thép tốt hơn</span>
                      )}
                      {row.winner === "tùy" && (
                        <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">Tùy mục đích</span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                      <div className="p-4">
                        <p className="text-xs font-semibold text-brand mb-1.5">Nhôm Công Nghệ Đức</p>
                        <p className="text-sm text-muted-foreground">{row.nhom}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-amber-600 mb-1.5">Thép Sơn Tĩnh Điện</p>
                        <p className="text-sm text-muted-foreground">{row.thep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="mb-16 space-y-6">
              <h2 className="text-xl font-semibold">Kết Luận — Chọn Loại Nào?</h2>

              <div className="rounded-xl border border-brand/20 bg-brand/5 p-6">
                <h3 className="font-semibold text-brand mb-2">Chọn Cửa Cuốn Nhôm Đức nếu:</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>✓ Nhà phố, biệt thự, garage cần thẩm mỹ cao</li>
                  <li>✓ Văn phòng, showroom yêu cầu vận hành im lặng</li>
                  <li>✓ Muốn cửa bền 20–30 năm, không cần bảo trì nhiều</li>
                  <li>✓ Ngân sách từ 1.450.000đ/m² trở lên</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="font-semibold text-amber-700 mb-2">Chọn Cửa Cuốn Thép Tĩnh Điện nếu:</h3>
                <ul className="space-y-1.5 text-sm text-amber-800">
                  <li>✓ Kho hàng, nhà xưởng không ưu tiên thẩm mỹ</li>
                  <li>✓ Mặt tiền kinh doanh cần chi phí thấp</li>
                  <li>✓ Ngân sách hạn chế, từ 500.000đ/m²</li>
                  <li>✓ Sẵn sàng bảo trì chống gỉ định kỳ 2–3 năm/lần</li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6">Câu Hỏi Thường Gặp</h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((item) => (
                  <div key={item.name} className="rounded-xl border bg-card p-6">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div className="border-t pt-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand/60 mb-5">Xem thêm</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/bao-gia-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Báo Giá Cửa Cuốn Cần Thơ</p>
                    <p className="text-sm text-muted-foreground">Bảng giá nhôm đức và tole</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </Link>
                <Link href="/blog/cach-bao-tri-cua-cuon" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Cách Bảo Trì Cửa Cuốn</p>
                    <p className="text-sm text-muted-foreground">5 bước đơn giản, tăng tuổi thọ</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-brand py-14">
          <div className="container max-w-2xl text-center">
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Vẫn Chưa Chắc Chọn Loại Nào?
            </h2>
            <p className="mt-3 text-white/80 text-sm">
              Gọi cho Hưng Thành Phát Door — tư vấn viên sẽ đến khảo sát và đề xuất phương án phù hợp nhất với công trình và ngân sách của bạn.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
