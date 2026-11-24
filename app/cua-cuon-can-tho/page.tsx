import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { CUA_CUON_GALLERY } from "@/lib/cua-cuon-keo-gallery";
import { LP_FORM } from "@/lib/lp-data";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

// Aligned 16/11/2026 with the 10/11 catalog, the 13/11 price gate and the 14/11 offer: the
// 30-minute form, cọc 30% + pay after the test run, miền Tây, free measuring in Cần Thơ only.
// Since 24/11/2026 the page is the hero, the product grid, then the footer (Hughie: "keep the
// sản phẩm page clean"): the types, why-HTP, price, process, district and FAQ sections are gone.
export const metadata: Metadata = {
  title: "Cửa Cuốn Cần Thơ — Xưởng Sản Xuất Từ 2005",
  description: `Cửa cuốn Cần Thơ — xưởng sản xuất tại Bình Thủy từ 2005, hơn 500 công trình, lắp khắp miền Tây. Nhôm công nghệ Đức, công nghệ Úc, tấm liền, song ngang, inox. Chỉ cọc 30%, lắp xong chạy thử mới trả tiền. Gọi: ${SITE.hotlines[0]}.`,
  alternates: { canonical: `${siteUrl}/cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-cuon-can-tho`,
    title: "Cửa Cuốn Cần Thơ — Xưởng Sản Xuất Từ 2005",
    description: `Xưởng cửa cuốn tại Cần Thơ từ 2005, lắp khắp miền Tây. Chỉ cọc 30%, lắp xong chạy thử mới trả tiền. Gọi: ${SITE.hotlines[0]}.`,
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const districts = ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền", "Thới Lai"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-cuon-can-tho#service`,
      name: "Cửa Cuốn Cần Thơ",
      serviceType: "Sản xuất và lắp đặt cửa cuốn",
      description:
        "Sản xuất, cung cấp và lắp đặt cửa cuốn tại Cần Thơ — cửa cuốn nhôm công nghệ Đức, công nghệ Úc, thép sơn tĩnh điện, tấm liền, song ngang, khe thoáng và khổ lớn nhà xưởng. Xưởng tại Bình Thủy từ 2005, lắp khắp miền Tây.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
      },
      areaServed: [
        { "@type": "City", name: "Cần Thơ" },
        // The service area since 14/11/2026, as in the site-wide schema (app/layout.tsx).
        { "@type": "AdministrativeArea", name: "Đồng bằng sông Cửu Long" },
        ...districts.map((d) => ({ "@type": "AdministrativeArea", name: `${d}, Cần Thơ` })),
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang Chủ", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Cửa Cuốn Cần Thơ", item: `${siteUrl}/cua-cuon-can-tho` },
      ],
    },
  ],
};

export default function CuaCuonCanTho() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            {/* md and up only: on a phone its room keeps the Zalo button above the bottom bar (as on the homepage). */}
            <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Xưởng sản xuất tại Bình Thủy — từ 2005
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:mt-6 md:text-5xl">
              Cửa Cuốn Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Xưởng Thật, Giá Báo Trước, Trả Đủ Vào Ngày Lắp Đặt
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ. 21+ năm, hơn 500 công trình.
              Cửa cắt đúng kích thước ngay tại xưởng Bình Thủy — không chờ hàng chuyển từ TP.HCM.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm font-semibold text-amber-200 md:text-base">
              Chỉ cọc 30%, lắp xong chạy thử mới trả phần còn lại.
            </p>
            <ZaloQuoteCard source="Cửa cuốn Cần Thơ · đầu trang" form={LP_FORM} className="mx-auto mt-8 max-w-md" />
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/bao-gia-cua-cuon-can-tho">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Xem bảng giá cửa cuốn
                </Button>
              </Link>
            </div>
            {/* When the phones are answered (14/11/2026), not the shop's opening hours. */}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> Nghe máy {SITE.phoneHours}
            </p>
          </div>
        </section>

        {/* The product grid, laid out like his old site's category page (Hughie, 24/11/2026): the
            old hungthanhphatdoor.com/cua-cuon pages 1–3, then the catalog's nan Đức. A tap asks
            that product's price by Zalo. Content: lib/cua-cuon-keo-gallery.ts. */}
        <section id="mau-cua-cuon" className="bg-white py-14 md:py-20" aria-labelledby="mau-cua-cuon-title">
          <div className="container">
            <h2
              id="mau-cua-cuon-title"
              className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wider text-brand md:mb-10 md:text-3xl"
            >
              Cửa cuốn
            </h2>
            <ProductGallery items={CUA_CUON_GALLERY} ask={{ source: "Cửa cuốn Cần Thơ · thư viện mẫu" }} cards />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
