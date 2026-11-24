import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProductCategoryRow } from "@/components/ProductCategoryRow";
import { ProductGallery } from "@/components/ProductGallery";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { Button } from "@/components/ui/button";
import { LP_FORM } from "@/lib/lp-data";
import { SAN_PHAM_KINH } from "@/lib/nhom-kinh-gallery";
import { PRODUCT_CATEGORIES, SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

// The lowest "từ" anchor on the page, read from the row itself so the snippet can't drift.
const CUA_CUON = PRODUCT_CATEGORIES.find((c) => c.id === "cua-cuon")!;

// Lines shown as the old site's product grids below, so not as category rows too.
const KINH_IDS = new Set(SAN_PHAM_KINH.map((l) => l.id));
const ROWS = PRODUCT_CATEGORIES.filter((c) => !KINH_IDS.has(c.id));
// The nine blocks in page order, for the jump list at the foot of the hero.
const LINES = [...ROWS, ...SAN_PHAM_KINH];

export const metadata: Metadata = {
  title: "Sản Phẩm Cửa",
  // Since 13–14/11/2026: rows show only a "từ" price (the full list goes out by Zalo), HTP
  // installs across miền Tây, and free measuring is Cần Thơ only, so no "khảo sát miễn phí".
  description: `Cửa cuốn, cửa kéo, nhôm kính, lan can kính, motor & phụ kiện từ xưởng ở Cần Thơ, lắp khắp miền Tây. Cửa cuốn ${CUA_CUON.priceFrom}, chỉ cọc 30%, lắp xong mới trả tiền.`,
  alternates: { canonical: `${siteUrl}/san-pham` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/san-pham`,
    title: "Sản Phẩm Cửa — Hưng Thành Phát Door",
    description:
      "Cửa cuốn, cửa kéo, nhôm kính, lan can kính, motor & phụ kiện — xưởng ở Cần Thơ, lắp khắp miền Tây.",
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
    body: "Cắt theo số đo tại xưởng, lắp xong chạy thử mới thanh toán.",
  },
  {
    href: "/sua-chua-cua-cuon-can-tho",
    label: "Sửa chữa cửa cuốn",
    body: "Cửa kẹt, motor lỗi, thay lá — thợ đến tận nơi trong ngày ở Cần Thơ.",
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
      <main id="main">
        {/* Hero — the product pages' pattern (Zalo card under the intro), with the
            14/11/2026 offer: the 30-minute total, cọc 30%, pay after the install. */}
        <section className="relative overflow-hidden bg-brand pt-28 pb-16 text-white md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              Dòng Sản Phẩm
            </span>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Sản phẩm cửa Hưng Thành Phát
            </h1>
            {/* Rows show a starting price only; the full list goes out by Zalo (13/11/2026). */}
            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-white/75 md:text-lg">
              {PRODUCT_CATEGORIES.length} dòng chính, làm tại xưởng Bình Thủy từ{" "}
              {SITE.foundedYear}, nhận lắp {SITE.serviceArea}. Mỗi dòng chính
              ghi giá khởi điểm; bảng giá đầy đủ gửi qua Zalo trong 1–2 phút.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm font-semibold text-amber-200 md:text-base">
              Chỉ cọc 30%, lắp xong nghiệm thu mới trả phần còn lại.
            </p>
            <ZaloQuoteCard
              source="Trang sản phẩm · đầu trang"
              form={LP_FORM}
              className="mx-auto mt-8 max-w-md"
            />
            <div className="mt-5 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand hover:bg-white/90"
              >
                <a href={`tel:${primary.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" aria-hidden /> Gọi {primary}
                </a>
              </Button>
            </div>
            {/* One tap to any of the nine lines; one swipe row on a phone, like the homepage
                hero's quick links. */}
            <nav
              aria-label="Các dòng sản phẩm"
              className="-mx-4 mt-10 flex snap-x scroll-px-4 gap-2 overflow-x-auto border-t border-white/10 px-4 pt-6 md:mx-0 md:flex-wrap md:justify-center md:px-0"
            >
              {LINES.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="inline-flex min-h-[44px] shrink-0 snap-start items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 transition hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-white"
                >
                  {l.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Category blocks: cửa cuốn, cửa kéo, motor, then the old site's six glass lines as
            product grids (Hughie, 24/11/2026: "keep mục sản phẩm clean, no need added words"):
            the name, the "từ" price and page link where the line has them, and the products.
            A card asks that product's price by Zalo. Content: lib/nhom-kinh-gallery.ts. */}
        <section className="bg-white py-14 md:py-20">
          <div className="container space-y-14">
            {ROWS.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <ProductCategoryRow category={cat} headingLevel="h2" />
              </div>
            ))}
            {SAN_PHAM_KINH.map((line) => {
              const cat = PRODUCT_CATEGORIES.find((c) => c.id === line.id);
              // Lan can's page is this block (24/11/2026): no button linking to itself.
              const pageLink = cat && cat.pageLink.href !== `/san-pham#${line.id}` ? cat.pageLink : null;
              return (
                <div key={line.id} id={line.id} className="scroll-mt-24">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-brand/15 pb-3">
                    <div>
                      <div className="h-0.5 w-12 rounded-full bg-amber-400" />
                      <h2 className="mt-2 text-lg font-extrabold uppercase tracking-wider text-brand md:text-xl">
                        {line.name}
                      </h2>
                      {cat && <p className="mt-1 text-sm font-bold text-amber-600">{cat.priceFrom}</p>}
                    </div>
                    {pageLink && (
                      <Link
                        href={pageLink.href}
                        className="inline-flex min-h-[44px] items-center gap-1 rounded-full bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600"
                      >
                        {pageLink.label}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                  <ProductGallery
                    items={line.items}
                    ask={{ source: `Trang sản phẩm · ${line.name}` }}
                    cards
                    strip
                    className="mt-5"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* The default subtitle ("gửi số điện thoại, thợ gọi lại") predates the Zalo flow. */}
        <CtaBand
          source="Trang sản phẩm"
          title="Chưa biết chọn dòng cửa nào?"
          subtitle="Gọi hoặc nhắn Zalo, bên em tư vấn dòng hợp công trình và ngân sách — miễn phí, không ép chốt."
        />

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
