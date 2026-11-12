import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClosingBand } from "@/components/bang-gia/ClosingBand";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { FaqCards } from "@/components/bang-gia/FaqCards";
import { NanCatalogue } from "@/components/bang-gia/NanCatalogue";
import { Rise } from "@/components/bang-gia/Rise";
import { SongNgangList } from "@/components/bang-gia/SongNgangList";
import { SpecimenMosaic, type Specimen } from "@/components/bang-gia/SpecimenMosaic";
import {
  FIELD,
  HeroActions,
  HeroIndex,
  NoScriptStyle,
  PriceHero,
  PriceMenu,
  SHOWROOM,
  ShowroomFigure,
  SlatHeading,
  WARRANTY,
  minGia,
  type MenuGroup,
} from "@/components/bang-gia/parts";
import {
  APPLIED_FROM,
  NAN_DUC,
  SONG_NGANG,
  TAM_LIEN,
  TOLE_THEM,
  UC_SWATCHES,
} from "@/lib/bang-gia-data";
import {
  NAN_SPECS,
  NHU_CAU,
  SONG_NGANG_DUNG_CHO,
  SONG_NGANG_SPECS,
  TAM_LIEN_SPECS,
  formatGia,
  nanAnchor,
} from "@/lib/bang-gia-specs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const PAGE = `${siteUrl}/bao-gia-cua-cuon-can-tho`;

export const metadata: Metadata = {
  title: "Báo Giá Cửa Cuốn Cần Thơ 2026 — Giá Gốc",
  description: `Giá cửa cuốn Cần Thơ 2026: ${NAN_DUC.length} mẫu nan nhôm Đức chụp mẫu thật, tole Đài Loan, siêu trường, Inox 304, song ngang, cửa Úc. Đã gồm công lắp, chưa VAT.`,
  alternates: { canonical: PAGE },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: PAGE,
    title: "Báo Giá Cửa Cuốn Cần Thơ 2026 — Giá Gốc",
    description: "Giá từng mẫu cửa cuốn nan nhôm Đức, tole, song ngang, Inox, cửa Úc tại Cần Thơ. Ảnh mẫu nan thật. Chưa VAT.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

// ── Derived from the CRM data ────────────────────────────────────────────────

const vnd = (n: number) => `${formatGia(n)}đ`;
/** "Cửa cuốn tole Đài Loan" → "Tole Đài Loan" — the section heading already says cửa cuốn. */
const short = (name: string) => {
  const s = name.replace(/^Cửa cuốn\s+/i, "");
  return s.charAt(0).toUpperCase() + s.slice(1);
};
/** "0.6mm (6 dem)" → "6 zem · 0.6mm", the same order the CRM rows use. */
const doDay = (mau: string) => {
  const m = mau.match(/^([\d.]+mm)\s*\((.+)\)$/);
  return m ? `${m[2].replace(/\bdem\b/, "zem")} · ${m[1]}` : mau;
};

const TU = {
  nan: minGia(NAN_DUC.map((m) => m.gia)),
  tamLien: minGia([...TAM_LIEN, ...TOLE_THEM].flatMap((t) => t.rows.map((r) => r.gia))),
  songNgang: minGia(SONG_NGANG.flatMap((t) => t.rows.map((r) => r.gia))),
};

const TAM_LIEN_GROUPS: MenuGroup[] = [
  ...TAM_LIEN.map((t) => {
    const s = TAM_LIEN_SPECS[t.key];
    return {
      id: `tam-lien-${t.key}`,
      name: short(t.name),
      unit: "đ/m²",
      desc: s?.moTa,
      dungCho: s?.goiYChung,
      rows: t.rows.map((r) => ({ name: t.key === "uc" ? r.label : `${r.label} · ${r.mm}`, sub: s?.goiY[r.mau], gia: r.gia })),
      swatches:
        t.key === "uc" && UC_SWATCHES.length > 0
          ? {
              caption: "Ảnh chụp mẫu tole Úc thật",
              photos: UC_SWATCHES.map((src, i) => ({ src, alt: `Mẫu tole cửa cuốn Úc chụp thật, màu ${i + 1}` })),
            }
          : undefined,
    };
  }),
  ...TOLE_THEM.map((t) => {
    const s = TAM_LIEN_SPECS[t.key];
    return {
      id: `tam-lien-${t.key}`,
      name: short(t.name),
      unit: "đ/m²",
      desc: s?.moTa,
      dungCho: s?.goiYChung,
      rows: t.rows.map((r) => ({ name: doDay(r.mau), sub: s?.goiY[r.mau], gia: r.gia })),
    };
  }),
];

const SONG_NGANG_GROUPS = SONG_NGANG.map((g) => {
  const s = SONG_NGANG_SPECS[g.key];
  return {
    key: g.key,
    vatLieu: s?.vatLieu ?? short(g.name),
    rows: g.rows.map((r) => ({ mau: r.mau, gia: r.gia, sub: s?.goiY[r.mau] })),
    // No photo of a song ngang door yet: the catalog's AI render, labelled "Minh họa".
    image: { src: `/bang-gia/minh-hoa/${g.key}.webp`, alt: `cửa cuốn song ngang ${(s?.vatLieu ?? "").toLowerCase()}` },
  };
});

const specimen = (code: string): Specimen => {
  const m = NAN_DUC.find((n) => n.code === code);
  if (!m) throw new Error(`Không có mẫu nan ${code} trong bang-gia-data.ts`);
  return { code, brand: m.brand, src: (m.goc ?? m.mat) as string, href: `#${nanAnchor(code)}`, field: FIELD[m.brand] ?? "bg-brand-50" };
};

const faqItems = [
  {
    tab: "Cộng thêm",
    question: "Ngoài đơn giá trong bảng, còn tính thêm gì?",
    answer:
      "Đơn giá đã gồm vật tư và công lắp đặt. Tính thêm: VAT 10%; motor, bình tích điện, khóa ngang nếu bạn chọn (xem bảng giá motor & phụ kiện). Khảo sát, đo đạc nội thành Cần Thơ miễn phí.",
  },
  {
    tab: "Nan hay tole",
    question: "Nên chọn nan nhôm hay tole tấm liền?",
    answer: `Nan nhôm có khe thoáng (trừ mẫu kín như OT70, AL70), nhiều mẫu và độ dày, giá từ ${vnd(TU.nan ?? 0)}/m². Tole tấm liền kín, giá từ ${vnd(TU.tamLien ?? 0)}/m², hợp nhà kho, ki-ốt, cửa phụ. Cửa Úc là tấm tole liền khối chạy êm, motor giấu trong trục cuốn.`,
  },
  {
    tab: "Ký hiệu",
    question: "Gioong, lông nheo và khe thoáng là gì?",
    answer:
      "Gioong (ron) và lông nheo là dải cao su hoặc lông nằm giữa các nan, giúp cửa chạy êm và bớt ồn; mẫu có chữ R cuối mã thường có. Khe thoáng là lỗ dập trên nan để gió và ánh sáng vào khi cửa đóng; mẫu kín không có lỗ nên riêng tư hơn.",
  },
  {
    tab: "Song ngang",
    question: "Cửa song ngang khác cửa cuốn kín thế nào?",
    answer:
      "Song ngang là các thanh thép sơn tĩnh điện (mắc võng, song vuông) cuốn lên như cửa cuốn. Đóng lại vẫn nhìn xuyên qua và thông gió, nên hợp trung tâm thương mại, ngân hàng.",
  },
  {
    tab: "Liên hệ",
    question: "Dòng ghi “Liên hệ” là sao?",
    answer: `Là dòng chưa niêm yết giá trên web. Nhắn Zalo hoặc gọi để có giá theo khổ cửa của bạn; mẫu thật có ở showroom ${SHOWROOM} để xem trước.`,
  },
  {
    tab: "Bảo hành",
    question: "Bảo hành cửa cuốn thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
        { "@type": "ListItem", position: 2, name: "Báo Giá Cửa Cuốn Cần Thơ", item: PAGE },
      ],
    },
  ],
};

export default function BaoGiaCuaCuonCanTho() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NoScriptStyle />
        <Rise />

        <PriceHero
          title="Bảng giá cửa cuốn Cần Thơ"
          lead={`Giá từng mẫu theo m², đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`}
          aside={
            <SpecimenMosaic
              cycle={["VIS 50R", "KV468R", "X205R", "AL-VIP50"].map(specimen)}
              tiles={["KV380R", "B7", "MT502R", "AL75"].map(specimen)}
            />
          }
        >
          <HeroIndex
            label="Giá khởi điểm, đ/m²"
            items={[
              { href: "#nan-nhom-duc", name: "Nan nhôm công nghệ Đức", gia: TU.nan },
              { href: "#tam-lien", name: "Tấm liền: tole, Úc, Inox", gia: TU.tamLien },
              { href: "#song-ngang", name: "Song ngang thép", gia: TU.songNgang },
            ]}
            others={[
              { href: "/bang-gia-phu-kien-can-tho", label: "Motor & phụ kiện" },
              { href: "/bang-gia-cua-keo-can-tho", label: "Cửa kéo" },
              { href: "/bang-gia-cua-nhom-kinh-can-tho", label: "Nhôm kính" },
            ]}
          />
          <ZaloQuoteCard source="Báo giá cửa cuốn · đầu trang" className="mt-8 max-w-md" />
          <HeroActions className="mt-5" />
        </PriceHero>

        {/* Nan nhôm công nghệ Đức — the specimen catalogue */}
        <section id="nan-nhom-duc" aria-labelledby="nan-nhom-duc-title" className="scroll-mt-20 py-20 md:py-28">
          <div className="container">
            <SlatHeading id="nan-nhom-duc-title" title="Nan nhôm công nghệ Đức" meta={`${NAN_DUC.length} mẫu · đ/m²`} />
            <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-brand" data-rise>
              Mẫu nan thật ở showroom, chụp cùng một góc: ô trên là biên dạng nan, dải dưới là mặt nan với chữ in
              và lỗ thoáng.
            </p>
            <NanCatalogue models={NAN_DUC} specs={NAN_SPECS} needs={NHU_CAU} />
            <div className="mt-12 max-w-[72ch] space-y-1.5 text-sm leading-relaxed text-slate-600" data-rise>
              {NAN_DUC.some((m) => m.gia === null) && (
                <p>Mẫu ghi “Liên hệ báo giá” là hàng đặt riêng: nhắn Zalo hoặc gọi để báo giá theo đơn.</p>
              )}
              <p>
                Kovidoor là dòng cửa cuốn công nghệ Đức của Mitadoor. Thông số theo công bố của nhà sản xuất và chữ in
                trên nan; độ dày có dung sai khoảng ±8%.
              </p>
            </div>
          </div>
        </section>

        {/* Tấm liền — prices like a menu */}
        <section id="tam-lien" aria-labelledby="tam-lien-title" className="scroll-mt-20 py-20 md:py-28">
          <div className="container">
            <SlatHeading
              id="tam-lien-title"
              title="Cửa cuốn tấm liền"
              meta={`${TAM_LIEN.length + TOLE_THEM.length} dòng · đ/m²`}
            />
            <PriceMenu
              intro="Một tấm tole liền khối, kín gió, giá theo độ dày. Dày hơn thì làm được cửa rộng hơn."
              photo={{
                src: "/cong-trinh/p31-xuong-cc-xanh/01.jpg",
                alt: "Cửa cuốn xanh khổ lớn do Hưng Thành Phát lắp cho nhà xưởng",
                caption: "Cửa cuốn nhà xưởng, công trình HTP.",
              }}
              groups={TAM_LIEN_GROUPS}
            />
          </div>
        </section>

        {/* Song ngang — list with drawn profiles */}
        <section id="song-ngang" aria-labelledby="song-ngang-title" className="scroll-mt-20 bg-slate-50 py-20 md:py-28">
          <div className="container">
            <SlatHeading
              id="song-ngang-title"
              title="Cửa cuốn song ngang"
              meta={`${SONG_NGANG.reduce((n, g) => n + g.rows.length, 0)} kiểu`}
            />
            <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-brand" data-rise>
              Thanh thép sơn tĩnh điện cuốn lên như cửa cuốn; đóng lại vẫn thông gió và nhìn xuyên qua. Nên dùng cho:{" "}
              {SONG_NGANG_DUNG_CHO.toLowerCase()}.
            </p>
            <SongNgangList groups={SONG_NGANG_GROUPS} />
          </div>
        </section>

        {/* FAQ — index cards */}
        <section aria-labelledby="hoi-dap-title" className="py-20 md:py-28">
          <div className="container">
            <SlatHeading id="hoi-dap-title" title="Câu hỏi thường gặp" />
            <FaqCards group="faq-cua-cuon" items={faqItems} aside={<ShowroomFigure />} />
          </div>
        </section>

        <ClosingBand
          source="Báo giá cửa cuốn"
          photos={[
            { src: "/cong-trinh/p22-cc-kem-xe-hong/01.jpg", alt: "Cửa cuốn màu kem Hưng Thành Phát lắp cho nhà phố" },
            { src: "/cong-trinh/p67-xuong-cc-xanh-lon/01.jpg", alt: "Cửa cuốn khổ lớn Hưng Thành Phát lắp cho nhà xưởng" },
            { src: "/cong-trinh/p24-cc-xam-duc-lo/01.jpg", alt: "Cửa cuốn nan xám có lỗ thoáng do Hưng Thành Phát lắp" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
