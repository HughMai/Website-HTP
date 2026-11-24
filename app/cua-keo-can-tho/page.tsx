import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { CUA_KEO_GALLERY } from "@/lib/cua-cuon-keo-gallery";
import { LP_FORM } from "@/lib/lp-data";
import { PRODUCT_CATEGORIES, SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

// The family's "từ" price, as on /san-pham and in the menu.
const PRICE_FROM = PRODUCT_CATEGORIES.find((c) => c.id === "cua-keo")!.priceFrom;

// Aligned 16/11/2026 with the 10/11 catalog, the 13/11 price gate and the 14/11 offer. Since
// 24/11/2026 the page is the hero, the product grid, then the footer, like /cua-cuon-can-tho
// (Hughie: "keep the sản phẩm page clean"): the types, advantages, price table, district and
// FAQ sections are gone.
export const metadata: Metadata = {
  title: "Cửa Kéo Cần Thơ — Thép, Nhôm, Inox",
  description: `Cửa kéo Cần Thơ — thép ${PRICE_FROM}, nhôm, inox SUS 304. Chống đột nhập, hợp mặt tiền kinh doanh, lắp 3–5 giờ, nhận lắp khắp miền Tây. Chỉ cọc 30%, lắp xong mới trả tiền. Gọi: ${SITE.hotlines[0]}.`,
  alternates: { canonical: `${siteUrl}/cua-keo-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/cua-keo-can-tho`,
    title: "Cửa Kéo Cần Thơ — Thép, Nhôm, Inox",
    description: `Cửa kéo thép, nhôm, inox tại Cần Thơ, lắp khắp miền Tây. Chống đột nhập, bền bỉ. Gọi: ${SITE.hotlines[0]}.`,
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/cua-keo-can-tho#service`,
      name: "Cửa Kéo Cần Thơ",
      description:
        "Cung cấp và lắp đặt cửa kéo thép, nhôm, inox tại Cần Thơ và miền Tây — bền bỉ, chống đột nhập, bảo hành chính hãng.",
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
        { "@type": "ListItem", position: 2, name: "Cửa Kéo Cần Thơ", item: `${siteUrl}/cua-keo-can-tho` },
      ],
    },
  ],
};

export default function CuaKeoCanTho() {
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
              Cửa kéo — Tư vấn đúng loại, không upsell
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:mt-6 md:text-5xl">
              Cửa Kéo Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Chọn Đúng Chất Liệu Theo Ngân Sách — Lắp Trong Ngày, Bồi Thường 100% Nếu Sai Vật Tư
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Thép hộp mạ kẽm giá thấp hơn 20–30% so với nhôm, bảo mật tương đương — phần lớn
              chủ kinh doanh Cần Thơ chọn thép. Tư vấn thật, không upsell loại đắt hơn nếu không cần thiết.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm font-semibold text-amber-200 md:text-base">
              Chỉ cọc 30%, lắp xong chạy thử mới trả phần còn lại.
            </p>
            <ZaloQuoteCard source="Cửa kéo Cần Thơ · đầu trang" form={LP_FORM} className="mx-auto mt-8 max-w-md" />
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/bang-gia-cua-keo-can-tho">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Xem bảng giá
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
            old hungthanhphatdoor.com/cua-keo page. A tap asks that product's price by Zalo.
            Content: lib/cua-cuon-keo-gallery.ts. */}
        <section id="mau-cua-keo" className="bg-white py-14 md:py-20" aria-labelledby="mau-cua-keo-title">
          <div className="container">
            <h2
              id="mau-cua-keo-title"
              className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wider text-brand md:mb-10 md:text-3xl"
            >
              Cửa kéo
            </h2>
            <ProductGallery items={CUA_KEO_GALLERY} ask={{ source: "Cửa kéo Cần Thơ · thư viện mẫu" }} cards />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
