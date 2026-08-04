import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProductCategoryRow } from "@/components/ProductCategoryRow";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Sản Phẩm Cửa",
  description: `Toàn bộ dòng cửa Hưng Thành Phát thi công tại Cần Thơ: cửa cuốn, cửa nhôm kính, cửa kéo, motor & phụ kiện. Giá tham khảo theo m² — gọi ${SITE.hotlines[0]} để được khảo sát miễn phí.`,
  alternates: { canonical: `${siteUrl}/san-pham` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/san-pham`,
    title: "Sản Phẩm Cửa — Hưng Thành Phát Door",
    description:
      "Cửa cuốn, cửa nhôm kính, cửa kéo, motor & phụ kiện — thi công tại Cần Thơ.",
    siteName: "Hưng Thành Phát Door",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Hưng Thành Phát Door",
      },
    ],
  },
};

// Service pages that aren't a product family but are what people actually search for.
const SERVICES = [
  {
    href: "/lap-dat-cua-cuon-can-tho",
    label: "Lắp đặt cửa cuốn",
    body: "Khảo sát, sản xuất theo số đo, lắp trọn gói.",
  },
  {
    href: "/sua-chua-cua-cuon-can-tho",
    label: "Sửa chữa cửa cuốn",
    body: "Cửa kẹt, motor lỗi, thay lá — thợ tới tận nơi.",
  },
  {
    href: "/cua-cuon-nha-xuong-can-tho",
    label: "Cửa cuốn nhà xưởng",
    body: "Khổ lớn, tải nặng, vận hành liên tục.",
  },
  {
    href: "/lan-can-nhom-kinh-can-tho",
    label: "Lan can & cầu thang kính",
    body: "Kính cường lực, tay vịn nhôm hoặc gỗ.",
  },
];

export default function SanPhamPage() {
  const primary = SITE.hotlines[0];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand pt-28 pb-16 text-white md:pt-36 md:pb-20">
          <div className="container">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              Dòng Sản Phẩm
            </span>
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Sản phẩm cửa Hưng Thành Phát
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">
              Bốn dòng chính, sản xuất và lắp đặt tại Cần Thơ từ{" "}
              {SITE.foundedYear}. Giá bên dưới là giá tham khảo theo m² — số
              cuối cùng phụ thuộc khổ cửa và vật tư bạn chọn, luôn báo trước khi
              làm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-amber-400 text-brand hover:bg-amber-300"
              >
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

        {/* Category blocks */}
        <section className="bg-white py-14 md:py-20">
          <div className="container space-y-14">
            {PRODUCT_CATEGORIES.map((cat) => (
              <ProductCategoryRow key={cat.id} category={cat} headingLevel="h2" />
            ))}
          </div>
        </section>

        <CtaBand source="Trang sản phẩm" />

        {/* Services */}
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Dịch Vụ
              </span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl">
                Không chỉ bán cửa — làm trọn gói
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl border border-brand/10 bg-white p-5 transition hover:border-amber-400 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-brand transition-colors group-hover:text-amber-600">
                    {s.label}
                  </h3>
                  <p className="mt-1 text-sm text-brand/70">{s.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                    Xem chi tiết
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
