import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/cong-trinh/PortfolioGrid";
import { CONG_TRINH, type CongTrinhCategory } from "@/lib/cong-trinh-data";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const total = CONG_TRINH.length;
const photos = CONG_TRINH.reduce((n, p) => n + p.images.length, 0);
const years = Math.max(1, new Date().getFullYear() - SITE.foundedYear);

export const metadata: Metadata = {
  title: "Công Trình Tiêu Biểu",
  description: `${total} công trình cửa cuốn, cửa kéo, cửa nhôm kính, lan can kính do Hưng Thành Phát thi công thực tế tại Cần Thơ & ĐBSCL. Xem hình thực tế — gọi ${SITE.hotlines[0]} để được báo giá.`,
  alternates: { canonical: `${siteUrl}/cong-trinh` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cong-trinh`,
    title: "Công Trình Tiêu Biểu — Hưng Thành Phát Door",
    description: `${total} công trình thực tế tại Cần Thơ & Đồng Bằng Sông Cửu Long.`,
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

export default function CongTrinhPage({
  searchParams,
}: {
  searchParams: { loai?: string };
}) {
  const initialFilter = (
    CONG_TRINH.some((p) => p.category === searchParams.loai) ? searchParams.loai : "all"
  ) as CongTrinhCategory | "all";
  const primary = SITE.hotlines[0];

  const stats: { n: React.ReactNode; l: string }[] = [
    { n: total, l: "công trình" },
    { n: photos, l: "hình thực tế" },
    { n: `${years}+`, l: "năm kinh nghiệm" },
  ];

  return (
    <>
      <Navbar />
      <main id="main">
        <section className="relative overflow-hidden bg-brand pt-28 pb-16 text-white md:pt-36 md:pb-20">
          <div className="container">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              Hoạt Động &amp; Dự Án
            </span>
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Công trình tiêu biểu
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">
              Hơn {total} công trình cửa cuốn, cửa kéo, cửa nhôm kính, lan can &amp; cầu thang kính do
              đội ngũ Hưng Thành Phát thi công thực tế khắp Đồng Bằng Sông Cửu Long. Bấm vào từng công
              trình để xem chi tiết &amp; hình thực tế.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold">{s.n}</div>
                  <div className="text-xs uppercase tracking-wide text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90">
                <a href={`tel:${primary.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" aria-hidden /> Gọi {primary}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white hover:text-brand"
              >
                <Link href="/#lien-he">Nhận báo giá miễn phí</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="container">
            <PortfolioGrid items={CONG_TRINH} initialFilter={initialFilter} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
