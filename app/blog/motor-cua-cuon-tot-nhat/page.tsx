import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Motor Cửa Cuốn Nào Tốt Nhất 2026? So Sánh 5 Thương Hiệu Phổ Biến",
  description:
    "Motor cửa cuốn nào tốt nhất? So sánh Somfy, CAME, Nice, B&D và motor Đài Loan — độ bền, giá thành, độ ồn, bảo hành. Tư vấn từ 21 năm kinh nghiệm lắp đặt tại Cần Thơ.",
  alternates: { canonical: `${siteUrl}/blog/motor-cua-cuon-tot-nhat` },
  openGraph: {
    type: "article",
    locale: "vi_VN",
    url: `${siteUrl}/blog/motor-cua-cuon-tot-nhat`,
    title: "Motor Cửa Cuốn Nào Tốt Nhất 2026? So Sánh 5 Thương Hiệu Phổ Biến",
    description:
      "So sánh 5 thương hiệu motor cửa cuốn phổ biến nhất tại Việt Nam — giúp bạn chọn đúng loại cho nhà ở và nhà xưởng.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const motors = [
  {
    brand: "Somfy",
    origin: "Pháp",
    priceRange: "3.500.000 – 8.000.000đ",
    noiseLevel: "Cực kỳ êm",
    durability: "15–20 năm",
    warranty: "3–5 năm",
    bestFor: "Nhà phố, biệt thự, văn phòng cao cấp",
    pros: ["Êm nhất trên thị trường", "Độ bền cực cao", "Điều khiển thông minh (MyLink)", "Bảo hành dài"],
    cons: ["Giá cao nhất", "Cần kỹ thuật viên chính hãng để sửa chữa"],
    verdict: "premium",
  },
  {
    brand: "CAME",
    origin: "Ý",
    priceRange: "2.800.000 – 6.000.000đ",
    noiseLevel: "Rất êm",
    durability: "12–18 năm",
    warranty: "2–3 năm",
    bestFor: "Nhà phố, căn hộ, showroom",
    pros: ["Chất lượng châu Âu", "Nhiều model cho nhiều loại cửa", "Hệ sinh thái phụ kiện phong phú"],
    cons: ["Phụ tùng thay thế không phổ biến bằng Somfy", "Giá cao"],
    verdict: "premium",
  },
  {
    brand: "Nice",
    origin: "Ý",
    priceRange: "1.800.000 – 4.500.000đ",
    noiseLevel: "Êm",
    durability: "10–15 năm",
    warranty: "2 năm",
    bestFor: "Nhà phố, mặt tiền kinh doanh, garage",
    pros: ["Giá/chất lượng tốt nhất phân khúc", "Phổ biến tại Việt Nam — dễ tìm thợ sửa", "Nhiều lựa chọn công suất"],
    cons: ["Không êm bằng Somfy hay CAME", "Bảo hành ngắn hơn"],
    verdict: "midrange",
  },
  {
    brand: "B&D (Công Nghệ Úc)",
    origin: "Úc",
    priceRange: "2.200.000 – 5.000.000đ",
    noiseLevel: "Rất êm",
    durability: "12–15 năm",
    warranty: "3 năm",
    bestFor: "Garage nhà phố, khu dân cư cao cấp",
    pros: ["Nổi tiếng với dòng garage", "Công nghệ chống ồn tốt", "Bảo hành 3 năm"],
    cons: ["Ít phổ biến tại miền Tây", "Khó tìm thợ bảo trì ở tỉnh"],
    verdict: "midrange",
  },
  {
    brand: "Motor Đài Loan",
    origin: "Đài Loan",
    priceRange: "600.000 – 1.500.000đ",
    noiseLevel: "Có tiếng ồn nhẹ",
    durability: "5–8 năm",
    warranty: "1 năm",
    bestFor: "Kho hàng, nhà xưởng, mặt tiền bình dân",
    pros: ["Giá thấp nhất", "Phụ tùng dễ tìm", "Lắp đặt đơn giản"],
    cons: ["Độ bền thấp hơn", "Ồn hơn các dòng châu Âu", "Bảo hành ngắn"],
    verdict: "budget",
  },
];

const selectionGuide = [
  {
    useCase: "Nhà phố, garage, cần yên tĩnh",
    recommendation: "Somfy hoặc CAME",
    reason: "Êm nhất, bền nhất — xứng đáng với chi phí đầu tư cao vì dùng 15–20 năm không lo.",
  },
  {
    useCase: "Mặt tiền kinh doanh, vận hành nhiều lần/ngày",
    recommendation: "Nice hoặc CAME",
    reason: "Tỷ lệ giá/chất lượng cao nhất, phụ tùng dễ tìm, phù hợp vận hành 30–50 lần/ngày.",
  },
  {
    useCase: "Kho hàng, nhà xưởng (vận hành ít)",
    recommendation: "Motor Đài Loan",
    reason: "Tiết kiệm chi phí, đủ bền cho kho vận hành 5–10 lần/ngày. Khi hỏng thay mới cũng không tốn nhiều.",
  },
  {
    useCase: "Nhà xưởng vận hành liên tục (3 ca)",
    recommendation: "Somfy hoặc CAME 3 pha",
    reason: "Motor dân dụng không chịu được tải liên tục. Cần motor công nghiệp 3 pha công suất từ 1HP trở lên.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Motor cửa cuốn nào tốt nhất hiện nay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Somfy (Pháp) là motor cửa cuốn tốt nhất về độ êm và độ bền — phù hợp nhà phố và biệt thự. CAME và Nice (Ý) là lựa chọn tốt ở phân khúc trung-cao, phổ biến tại Việt Nam. Motor Đài Loan phù hợp kho xưởng cần tiết kiệm chi phí. Lựa chọn phụ thuộc vào loại cửa, tần suất vận hành và ngân sách.",
      },
    },
    {
      "@type": "Question",
      name: "Motor cửa cuốn bao nhiêu tiền?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Motor cửa cuốn có giá từ 600.000đ (Đài Loan) đến 8.000.000đ (Somfy cao cấp). Motor Nice phổ biến nhất trong khoảng 1.800.000–3.000.000đ. Giá chưa bao gồm công lắp đặt và phụ kiện.",
      },
    },
    {
      "@type": "Question",
      name: "Motor cửa cuốn bền bao nhiêu năm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Motor Somfy và CAME bền 15–20 năm nếu bảo trì đúng cách. Motor Nice bền 10–15 năm. Motor Đài Loan bền 5–8 năm. Tuổi thọ thực tế phụ thuộc vào tần suất vận hành — nhà xưởng vận hành nhiều lần sẽ hao mòn motor nhanh hơn nhà ở.",
      },
    },
    {
      "@type": "Question",
      name: "Motor cửa cuốn 1 pha hay 3 pha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Motor 1 pha (dân dụng) phù hợp nhà ở và mặt tiền kinh doanh vận hành dưới 30–50 lần/ngày. Motor 3 pha (công nghiệp) dành cho nhà xưởng vận hành liên tục hoặc cửa khổ lớn từ 5m trở lên. Motor 3 pha mạnh hơn, bền hơn trong môi trường công nghiệp nhưng cần có điện 3 pha tại công trình.",
      },
    },
    {
      "@type": "Question",
      name: "Motor cửa cuốn có cần bảo trì không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Motor cửa cuốn cần kiểm tra định kỳ 6–12 tháng/lần: vệ sinh bộ lọc bụi, kiểm tra dây điện và bo mạch, bôi trơn bộ truyền động, kiểm tra bình lưu điện (nếu có). Bảo trì đúng cách giúp motor bền gấp đôi so với không bảo trì.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Motor Cửa Cuốn Nào Tốt Nhất 2026? So Sánh 5 Thương Hiệu Phổ Biến",
  author: { "@type": "Organization", name: SITE.brand },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
  },
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  url: `${siteUrl}/blog/motor-cua-cuon-tot-nhat`,
  description: "So sánh 5 thương hiệu motor cửa cuốn phổ biến nhất tại Việt Nam.",
};

const verdictColor: Record<string, string> = {
  premium: "text-emerald-600 bg-emerald-50 border-emerald-100",
  midrange: "text-brand bg-brand/10 border-brand/20",
  budget: "text-amber-600 bg-amber-50 border-amber-100",
};

const verdictLabel: Record<string, string> = {
  premium: "Cao cấp",
  midrange: "Tầm trung",
  budget: "Tiết kiệm",
};

export default function MotorCuaCuonTotNhat() {
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
              <span className="text-xs text-white/50">7 phút đọc</span>
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-4xl">
              Motor Cửa Cuốn Nào Tốt Nhất 2026?{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                So Sánh 5 Thương Hiệu Phổ Biến
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75 text-sm md:text-base">
              Motor là bộ phận đắt tiền nhất và quan trọng nhất của cửa cuốn. Chọn sai thương hiệu
              có thể tốn thêm tiền sửa chữa hoặc phải thay mới chỉ sau vài năm.
            </p>
          </div>
        </section>

        <article className="py-16 md:py-24">
          <div className="container max-w-3xl">

            {/* Intro */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sau 21 năm lắp đặt và sửa chữa cửa cuốn tại Cần Thơ, chúng tôi đã làm việc với hầu hết
                các thương hiệu motor phổ biến trên thị trường. Bài viết này tổng hợp đánh giá thực tế —
                không phải quảng cáo — để giúp bạn chọn đúng motor cho nhu cầu cụ thể của mình.
              </p>
            </div>

            {/* Motor comparison */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-8">So Sánh 5 Thương Hiệu Motor Cửa Cuốn</h2>
              <div className="space-y-5">
                {motors.map((m) => (
                  <div key={m.brand} className="rounded-xl border bg-card overflow-hidden">
                    <div className="bg-muted px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{m.brand}</h3>
                        <span className="text-xs text-muted-foreground">({m.origin})</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${verdictColor[m.verdict]}`}>
                        {verdictLabel[m.verdict]}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Giá</p>
                          <p className="text-sm font-semibold">{m.priceRange}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Độ ồn</p>
                          <p className="text-sm font-semibold">{m.noiseLevel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Độ bền</p>
                          <p className="text-sm font-semibold">{m.durability}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Bảo hành</p>
                          <p className="text-sm font-semibold">{m.warranty}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        <span className="font-semibold text-foreground">Phù hợp:</span> {m.bestFor}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                          <p className="text-xs font-semibold text-emerald-700 mb-1.5">Ưu điểm</p>
                          <ul className="space-y-1">
                            {m.pros.map((p) => (
                              <li key={p} className="text-xs text-emerald-800">✓ {p}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Nhược điểm</p>
                          <ul className="space-y-1">
                            {m.cons.map((c) => (
                              <li key={c} className="text-xs text-muted-foreground">✗ {c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection guide */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6">Chọn Motor Theo Nhu Cầu Thực Tế</h2>
              <div className="space-y-4">
                {selectionGuide.map((g) => (
                  <div key={g.useCase} className="rounded-xl border bg-card p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">{g.useCase}</p>
                        <p className="text-xs text-brand font-semibold mb-1.5">→ {g.recommendation}</p>
                        <p className="text-xs text-muted-foreground">{g.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key insight box */}
            <div className="mb-16 rounded-xl border border-brand/20 bg-brand/5 p-6">
              <h3 className="font-semibold text-brand mb-3">Lưu Ý Quan Trọng Khi Chọn Motor</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">Công suất phải phù hợp với diện tích cửa:</span> Cửa rộng trên 4m hoặc cao trên 3m cần motor công suất lớn hơn (≥800W). Motor yếu kéo cửa nặng sẽ chết sớm.</li>
                <li><span className="font-semibold text-foreground">Mua kèm bình lưu điện:</span> Bình lưu điện (UPS) đảm bảo cửa vẫn hoạt động khi mất điện — đặc biệt quan trọng với nhà ở và cửa hàng.</li>
                <li><span className="font-semibold text-foreground">Không nên mua motor rẻ cho cửa đắt:</span> Cửa cuốn nhôm đức 30 triệu lắp motor 600.000đ là lãng phí — motor rẻ hỏng kéo theo hỏng cả hệ thống.</li>
                <li><span className="font-semibold text-foreground">Chọn thương hiệu có thợ sửa tại địa phương:</span> Motor Somfy đẹp nhưng nếu vùng bạn không có thợ chính hãng, lúc hỏng rất khó xử lý. Nice và motor Đài Loan phổ biến hơn ở tỉnh.</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6">Câu Hỏi Thường Gặp Về Motor Cửa Cuốn</h2>
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
                <Link href="/cua-cuon-nhom-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Cửa Cuốn Nhôm Đức Cần Thơ</p>
                    <p className="text-sm text-muted-foreground">Dòng cửa dùng motor cao cấp nhất</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </Link>
                <Link href="/blog/cach-bao-tri-cua-cuon" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Cách Bảo Trì Cửa Cuốn</p>
                    <p className="text-sm text-muted-foreground">Bao gồm bảo trì motor định kỳ</p>
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
              Cần Tư Vấn Chọn Motor Cửa Cuốn?
            </h2>
            <p className="mt-3 text-white/80 text-sm">
              Gọi cho Hưng Thành Phát Door — tư vấn đúng loại motor theo kích thước cửa, tần suất sử dụng
              và ngân sách. Khảo sát miễn phí tại Cần Thơ.
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
