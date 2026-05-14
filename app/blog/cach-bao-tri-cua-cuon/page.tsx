import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Hướng Dẫn Bảo Trì Cửa Cuốn Đúng Cách — 5 Bước Đơn Giản",
  description:
    "Cách bảo trì cửa cuốn đúng cách tại nhà — 5 bước đơn giản giúp tăng tuổi thọ từ 5 lên 15 năm, giảm 80% sự cố hỏng hóc. Hướng dẫn từ chuyên gia Hưng Thành Phát Door.",
  alternates: { canonical: `${siteUrl}/blog/cach-bao-tri-cua-cuon` },
  openGraph: {
    type: "article",
    locale: "vi_VN",
    url: `${siteUrl}/blog/cach-bao-tri-cua-cuon`,
    title: "Hướng Dẫn Bảo Trì Cửa Cuốn Đúng Cách — 5 Bước Đơn Giản",
    description:
      "5 bước bảo trì cửa cuốn tại nhà giúp tăng tuổi thọ và giảm sự cố hỏng hóc.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const steps = [
  {
    num: "01",
    title: "Vệ sinh ray và thanh cuốn",
    freq: "Mỗi 3 tháng",
    desc: "Dùng vải mềm hoặc bàn chải lông mềm lau sạch bụi bẩn, dầu mỡ tích tụ trong rãnh ray và trên bề mặt thanh cuốn. Dùng nước xà phòng loãng cho vết bẩn cứng đầu. Tránh dùng hóa chất ăn mòn hoặc bàn chải kim loại làm trầy bề mặt.",
    tip: "Đừng bỏ qua phần cuối ray gần sàn — nơi bụi tích tụ nhiều nhất.",
  },
  {
    num: "02",
    title: "Tra dầu bôi trơn ray và ổ trục",
    freq: "Mỗi 6 tháng",
    desc: "Tra dầu bôi trơn chuyên dụng (loại không chứa dung môi) vào rãnh ray, ổ trục lò xo và khớp nối motor. Không dùng dầu nhớt thô thông thường vì thu hút bụi và làm nghẹt ray theo thời gian.",
    tip: "Dầu WD-40 chỉ dùng để tẩy gỉ — không thay thế được dầu bôi trơn chuyên dụng.",
  },
  {
    num: "03",
    title: "Kiểm tra lò xo cân bằng",
    freq: "Mỗi 6 tháng",
    desc: "Ngắt motor, nâng cửa lên nửa chừng rồi buông tay — cửa nên giữ nguyên vị trí, không tự đóng lại. Nếu cửa rơi xuống, lò xo đã yếu và cần thay. Lò xo yếu làm motor phải chịu tải nặng hơn, gây hỏng motor sớm.",
    tip: "Không tự thay lò xo tại nhà — lò xo chịu lực lớn, nguy hiểm nếu không có dụng cụ chuyên dụng.",
  },
  {
    num: "04",
    title: "Kiểm tra remote và hệ điện",
    freq: "Mỗi 6 tháng",
    desc: "Thay pin remote định kỳ trước khi hết. Kiểm tra dây điện nối vào motor không bị bong tróc vỏ cách điện. Kiểm tra bình lưu điện có còn sạc và xả đúng cách bằng cách ngắt điện lưới và thử vận hành.",
    tip: "Pin remote yếu khiến tín hiệu không ổn định — dễ nhầm với hỏng motor.",
  },
  {
    num: "05",
    title: "Kiểm tra tổng quan và gọi bảo trì chuyên nghiệp",
    freq: "Mỗi 12 tháng",
    desc: "Kiểm tra toàn bộ: cửa đóng/mở có thẳng không, có tiếng kêu lạ không, motor có nóng bất thường không. Gọi kỹ thuật viên bảo trì chuyên nghiệp mỗi năm một lần để kiểm tra sâu các chi tiết bên trong — phát hiện sớm trước khi hỏng hóc lớn xảy ra.",
    tip: "Chi phí bảo trì định kỳ thấp hơn nhiều so với sửa chữa khi đã hỏng nặng.",
  },
];

const warningSigns = [
  { icon: "⚡", sign: "Nhấn remote nhiều lần mới phản hồi", action: "Thay pin remote hoặc kiểm tra bo mạch thu" },
  { icon: "🔊", sign: "Tiếng kêu lạ khi lên/xuống", action: "Kiểm tra ray, con lăn và lò xo ngay" },
  { icon: "🐢", sign: "Cửa lên/xuống chậm hơn bình thường", action: "Tra dầu ray, kiểm tra lò xo và tải motor" },
  { icon: "🔥", sign: "Motor nóng sau khi vận hành ngắn", action: "Kiểm tra cân bằng lò xo — có thể lò xo đã yếu" },
  { icon: "📉", sign: "Cửa không giữ được ở nửa chừng", action: "Lò xo cân bằng yếu — cần thay sớm" },
  { icon: "💡", sign: "Cửa không vận hành khi mất điện", action: "Bình lưu điện hỏng hoặc hết tuổi thọ" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cách bảo trì cửa cuốn đúng cách",
  description: "Hướng dẫn bảo trì cửa cuốn 5 bước đơn giản giúp tăng tuổi thọ và giảm hỏng hóc.",
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.desc,
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hướng Dẫn Bảo Trì Cửa Cuốn Đúng Cách — 5 Bước Đơn Giản",
  author: { "@type": "Organization", name: SITE.brand },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
  },
  datePublished: "2026-05-14",
  dateModified: "2026-05-14",
  url: `${siteUrl}/blog/cach-bao-tri-cua-cuon`,
};

export default function CachBaoTriCuaCuon() {
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
                Hướng dẫn bảo trì
              </span>
              <span className="text-xs text-white/50">6 phút đọc</span>
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-4xl">
              Hướng Dẫn Bảo Trì Cửa Cuốn Đúng Cách —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                5 Bước Đơn Giản
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75 text-sm md:text-base">
              Bảo trì đúng cách giúp cửa cuốn bền từ 5 lên 15 năm và giảm 80% sự cố hỏng hóc đột xuất.
            </p>
          </div>
        </section>

        <article className="py-16 md:py-24">
          <div className="container max-w-3xl">

            {/* Intro */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cửa cuốn là thiết bị cơ-điện vận hành hàng trăm lần mỗi tháng. Phần lớn sự cố hỏng hóc có thể phòng ngừa nếu bảo trì đúng lịch. Dưới đây là 5 bước chúng tôi khuyến nghị sau 15 năm sửa chữa và bảo trì cửa cuốn tại Cần Thơ.
              </p>
            </div>

            {/* Steps */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-8">5 Bước Bảo Trì Cửa Cuốn</h2>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.num} className="rounded-xl border bg-card overflow-hidden">
                    <div className="bg-muted px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-brand/20">{step.num}</span>
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full">
                        {step.freq}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                      <div className="mt-3 rounded-lg bg-amber-50 border border-amber-100 px-4 py-2.5">
                        <p className="text-xs text-amber-700"><span className="font-semibold">Lưu ý:</span> {step.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning signs */}
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6">Dấu Hiệu Cần Gọi Kỹ Thuật Viên Ngay</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {warningSigns.map((w) => (
                  <div key={w.sign} className="rounded-xl border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{w.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{w.sign}</p>
                        <p className="text-xs text-muted-foreground mt-1">→ {w.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary box */}
            <div className="mb-12 rounded-xl border border-brand/20 bg-brand/5 p-6">
              <h3 className="font-semibold text-brand mb-3">Tóm Tắt Lịch Bảo Trì</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vệ sinh ray và thanh cuốn</span>
                  <span className="font-semibold">Mỗi 3 tháng</span>
                </div>
                <div className="flex justify-between">
                  <span>Tra dầu bôi trơn</span>
                  <span className="font-semibold">Mỗi 6 tháng</span>
                </div>
                <div className="flex justify-between">
                  <span>Kiểm tra lò xo cân bằng</span>
                  <span className="font-semibold">Mỗi 6 tháng</span>
                </div>
                <div className="flex justify-between">
                  <span>Kiểm tra remote & bình lưu điện</span>
                  <span className="font-semibold">Mỗi 6 tháng</span>
                </div>
                <div className="flex justify-between">
                  <span>Bảo trì chuyên nghiệp toàn diện</span>
                  <span className="font-semibold">Mỗi 12 tháng</span>
                </div>
              </div>
            </div>

            {/* Related */}
            <div className="border-t pt-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand/60 mb-5">Xem thêm</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link href="/sua-chua-cua-cuon-can-tho" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Sửa Chữa Cửa Cuốn Cần Thơ</p>
                    <p className="text-sm text-muted-foreground">Đến tận nơi trong ngày</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </Link>
                <Link href="/blog/nhom-duc-vs-thep-tinh-dien" className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5">
                  <div>
                    <p className="font-semibold text-brand">Nhôm Đức Vs Thép Tĩnh Điện</p>
                    <p className="text-sm text-muted-foreground">So sánh chi tiết</p>
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
              Cần Bảo Trì Hoặc Sửa Cửa Cuốn Tại Cần Thơ?
            </h2>
            <p className="mt-3 text-white/80 text-sm">
              Đội kỹ thuật Hưng Thành Phát Door đến tận nơi trong ngày — kiểm tra, bảo trì, sửa chữa minh bạch từ A đến Z.
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
