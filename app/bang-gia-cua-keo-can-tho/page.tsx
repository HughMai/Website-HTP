import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClosingBand } from "@/components/bang-gia/ClosingBand";
import { FaqCards } from "@/components/bang-gia/FaqCards";
import { Rise } from "@/components/bang-gia/Rise";
import {
  HeroActions,
  HeroIndex,
  NoScriptStyle,
  PriceHero,
  PriceMenu,
  ShowroomFigure,
  SlatHeading,
  WARRANTY,
  minGia,
  type MenuGroup,
  type MenuRow,
} from "@/components/bang-gia/parts";
import { APPLIED_FROM, CUA_KEO } from "@/lib/bang-gia-data";
import { KEO_LOAI, KEO_NHOM_DAY } from "@/lib/bang-gia-specs";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const PAGE = `${siteUrl}/bang-gia-cua-keo-can-tho`;

const dayU = `${CUA_KEO[0].label} đến ${CUA_KEO[CUA_KEO.length - 1].label}`;

export const metadata: Metadata = {
  title: "Bảng Giá Cửa Kéo Cần Thơ 2026 — Giá m²",
  description: `Bảng giá cửa kéo Cần Thơ 2026 — cửa có lá và không lá, ${dayU}. Giá vật tư + công lắp theo m², chưa VAT. Báo giá miễn phí: ${SITE.hotlines[0]}.`,
  alternates: { canonical: PAGE },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: PAGE,
    title: "Bảng Giá Cửa Kéo Cần Thơ 2026 — Giá m²",
    description: `Giá cửa kéo tính theo m² tại Cần Thơ. Chưa VAT. Gọi: ${SITE.hotlines[0]}.`,
    siteName: SITE.brand,
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

// ── Derived from the CRM data ────────────────────────────────────────────────

const TU = {
  coLa: minGia(CUA_KEO.map((r) => r.coLa)),
  khongLa: minGia(CUA_KEO.map((r) => r.khongLa)),
};

const moTa = (ten: string) => KEO_LOAI.find((l) => l.ten === ten)?.moTa;

/**
 * One row per thickness, in the CRM's order. The band advice (KEO_NHOM_DAY) is shown once, under the
 * lists, so the two columns keep identical rows. A thickness the CRM adds later still appears here,
 * flagged "Độ dày khác", even before a band is written for it.
 */
const rowsFor = (pick: "coLa" | "khongLa"): MenuRow[] =>
  CUA_KEO.map((r) => ({
    name: `${r.label} · ${r.mm}`,
    sub: KEO_NHOM_DAY.some((b) => b.mau.includes(r.mau)) ? undefined : "Độ dày khác",
    gia: r[pick],
  }));

const KEO_GROUPS: MenuGroup[] = [
  {
    id: "co-la",
    name: "Cửa kéo có lá",
    unit: "đ/m²",
    desc: moTa("Có lá"),
    rows: rowsFor("coLa"),
    // No labelled photo of either type yet: the print catalog's AI renders, marked "Minh họa".
    image: { src: "/bang-gia/minh-hoa/keo_co_la.webp", alt: "cửa kéo có lá" },
  },
  {
    id: "khong-la",
    name: "Cửa kéo không lá",
    unit: "đ/m²",
    desc: moTa("Không lá"),
    rows: rowsFor("khongLa"),
    image: { src: "/bang-gia/minh-hoa/keo_khong_la.webp", alt: "cửa kéo không lá" },
  },
];

const faqItems = [
  {
    tab: "Phân biệt",
    question: "Cửa kéo có lá và không lá khác nhau như thế nào?",
    answer: "Cửa có lá có thêm lá tole phủ kín giữa các thanh U: cửa đóng là che được tầm nhìn, chặn chuột và bụi. Cửa không lá chỉ có khung U và nhíp, nên khóa cửa rồi gió và ánh sáng vẫn vào nhà; giá thấp hơn cửa có lá.",
  },
  {
    tab: "Cách tính",
    question: "Giá cửa kéo tính như thế nào?",
    answer: "Giá tính theo m² diện tích cửa (chiều rộng × chiều cao), đã gồm vật tư và công lắp đặt. Chưa bao gồm VAT 10%.",
  },
  {
    tab: "Độ dày",
    question: "Nên chọn thanh U dày bao nhiêu?",
    answer: "U 6–8 zem đủ cho cửa nhỏ, nhà ở, cửa đến khoảng 12–16m². Nhà ở và cửa hàng đóng mở hằng ngày nên chọn U 1–1.2 ly. Cửa lớn, kho bãi đến khoảng 24m² (6m × 4m) nên chọn U 1.4–1.6 ly.",
  },
  {
    tab: "Zem & ly",
    question: "Zem là gì trong báo giá cửa kéo?",
    answer: "Zem (hay mm) là độ dày của thanh U cửa kéo. Thanh U dày hơn (1 ly = 1mm) thì cứng và bền hơn nhưng nặng hơn và giá cao hơn. U 6 zem = 0.6mm, U 8 zem = 0.8mm, U 1 ly = 1.0mm.",
  },
  {
    tab: "Bảo hành",
    question: "Bảo hành cửa kéo như thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
  {
    tab: "Khu vực",
    question: "Có thi công cửa kéo tại các quận huyện Cần Thơ không?",
    answer: "Có. Chúng tôi thi công tại toàn bộ quận huyện Cần Thơ: Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và các huyện ngoại thành. Không tính phí đi lại.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE}#service`,
      name: "Cửa Kéo Cần Thơ",
      description: `Cung cấp và lắp đặt cửa kéo tại Cần Thơ — có lá và không lá, ${dayU}.`,
      provider: { "@type": "HomeAndConstructionBusiness", "@id": siteUrl, name: SITE.brand },
      areaServed: { "@type": "City", name: "Cần Thơ" },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE}#faq`,
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
        { "@type": "ListItem", position: 2, name: "Bảng Giá Cửa Kéo Cần Thơ", item: PAGE },
      ],
    },
  ],
};

export default function BangGiaCuaKeoCanTho() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NoScriptStyle />
        <Rise />

        <PriceHero
          title="Bảng giá cửa kéo Cần Thơ"
          lead={`Giá theo m², đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`}
          aside={
            <figure>
              {/* Two portrait shots, same size, so the whole door shows. Captions say nothing about the type. */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-rise-in relative aspect-[3/4] overflow-hidden bg-brand-50">
                  <Image
                    src="/cong-trinh/p23-keo-xanh-vlxd-linh/01.jpg"
                    alt="Cửa kéo xanh mặt tiền do Hưng Thành Phát lắp"
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 46vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="bg-rise-in relative aspect-[3/4] overflow-hidden bg-brand-50"
                  style={{ "--rise-delay": "120ms" } as React.CSSProperties}
                >
                  <Image
                    src="/cong-trinh/p55-keo-trang-chau-cay/01.jpg"
                    alt="Cửa kéo trắng nhà phố do Hưng Thành Phát lắp"
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 46vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-sm text-white/85">Cửa kéo, công trình HTP.</figcaption>
            </figure>
          }
        >
          <HeroIndex
            label="Giá khởi điểm, đ/m²"
            items={[
              { href: "#co-la", name: "Cửa kéo có lá", gia: TU.coLa },
              { href: "#khong-la", name: "Cửa kéo không lá", gia: TU.khongLa },
            ]}
            others={[
              { href: "/bao-gia-cua-cuon-can-tho", label: "Cửa cuốn" },
              { href: "/bang-gia-cua-nhom-kinh-can-tho", label: "Nhôm kính" },
              { href: "/bang-gia-phu-kien-can-tho", label: "Motor & phụ kiện" },
            ]}
          />
          <HeroActions />
        </PriceHero>

        {/* Cửa kéo — prices like a menu: one column per type, one row per thickness */}
        <section id="bang-gia" aria-labelledby="bang-gia-title" className="scroll-mt-20 py-20 md:py-28">
          <div className="container">
            <SlatHeading id="bang-gia-title" title="Cửa kéo có lá & không lá" meta={`${dayU} · đ/m²`} />
            <PriceMenu
              intro="Giá tính theo độ dày thanh U (zem, ly). Khoảng cách tiêu chuẩn giữa các thanh U khoảng 1 tấc (10–12cm)."
              photo={{
                src: "/cong-trinh/p56-keo-xanh-via-he/01.jpg",
                alt: "Cửa kéo mặt tiền do Hưng Thành Phát lắp",
                caption: "Cửa kéo mặt tiền, công trình HTP.",
              }}
              groups={KEO_GROUPS}
            />

            {/* Which thickness — said once, for both types */}
            <div className="mt-16" data-rise>
              <h3 className="text-xl font-semibold text-brand">Chọn độ dày thanh U</h3>
              <ul className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-3">
                {KEO_NHOM_DAY.map((b) => (
                  <li key={b.tieuDe} className="border-t-2 border-brand pt-4">
                    <p className="text-base font-semibold text-brand">{b.tieuDe}</p>
                    <p className="mt-1.5 max-w-[34ch] text-base leading-relaxed text-slate-600">{b.goiY}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 max-w-[72ch] space-y-1.5 text-sm leading-relaxed text-slate-600" data-rise>
              <p>Đơn giá đã gồm vật tư và công lắp đặt, chưa gồm VAT 10%. {WARRANTY}.</p>
              {CUA_KEO.some((r) => r.coLa === null || r.khongLa === null) && (
                <p>Dòng ghi “Liên hệ” là hàng đặt riêng: nhắn Zalo hoặc gọi để báo giá theo đơn.</p>
              )}
            </div>
          </div>
        </section>

        {/* FAQ — index cards */}
        <section aria-labelledby="hoi-dap-title" className="py-20 md:py-28">
          <div className="container">
            <SlatHeading id="hoi-dap-title" title="Câu hỏi thường gặp" />
            <FaqCards group="faq-cua-keo" items={faqItems} aside={<ShowroomFigure />} />
          </div>
        </section>

        <ClosingBand
          source="Bảng giá cửa kéo"
          photos={[
            { src: "/cong-trinh/p54-nha-xanh-keo-xanh/01.jpg", alt: "Cửa kéo xanh Hưng Thành Phát lắp cho ngôi nhà sơn xanh" },
            { src: "/cong-trinh/p39-shop-keo-kem-oto/01.jpg", alt: "Cửa kéo màu kem Hưng Thành Phát lắp cho mặt tiền cửa hàng" },
            { src: "/cong-trinh/p69-day-keo-xanh-xuong/01.jpg", alt: "Dãy cửa kéo xanh Hưng Thành Phát lắp cho nhà xưởng" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
