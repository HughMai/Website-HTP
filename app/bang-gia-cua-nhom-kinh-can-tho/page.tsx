import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClosingBand } from "@/components/bang-gia/ClosingBand";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { FaqCards } from "@/components/bang-gia/FaqCards";
import { ProductPicker } from "@/components/bang-gia/ProductPicker";
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
  RowPrice,
  type MenuGroup,
  type MenuRow,
} from "@/components/bang-gia/parts";
import { PriceGate } from "@/components/PriceGate";
import { APPLIED_FROM, NHOM_KINH, type Gia } from "@/lib/bang-gia-data";
import { KINH_CUONG_LUC, KINH_GOI_Y, NHOM_DAY_GOI_Y } from "@/lib/bang-gia-specs";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const PAGE = `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho`;

export const metadata: Metadata = {
  title: "Bảng Giá Cửa Nhôm Kính Cần Thơ 2026",
  description:
    "Bảng giá cửa nhôm kính Cần Thơ 2026: cửa đi, cửa sổ, vách kính nhôm Việt và nhôm nhập, Maxpro hệ 55/65/83, cửa kính bản lề sàn, lan can. Đã gồm kính 8 ly và công lắp, chưa VAT.",
  alternates: { canonical: PAGE },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: PAGE,
    title: "Bảng Giá Cửa Nhôm Kính Cần Thơ 2026",
    description: "Giá cửa nhôm kính Cần Thơ — nhôm Việt, nhập, Maxpro, kính bản lề sàn, lan can. Chưa VAT. Gọi: 0963 021 639.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

// ── Regroup the CRM rows by what the customer is buying ─────────────────────
// CRM: group "Nhôm Việt", row "Cửa đi 1.2ly". Page: group "Cửa đi", row "Nhôm Việt 1.2 ly", so
// nhôm Việt and nhôm nhập sit side by side at the same thickness.

const LOAI = ["Cửa đi", "Cửa sổ", "Vách kính"] as const;
type Loai = (typeof LOAI)[number];
const spaced = (s: string) => s.replace(/(\d)(ly|zem)\b/g, "$1 $2");
const group = (name: string) => NHOM_KINH.find((g) => g.group === name)?.rows ?? [];

/** Thickness advice, from NHOM_DAY_GOI_Y ("Nhôm 1.2 ly" → advice), shown on the cửa đi rows. */
const DAY_GOI_Y: Record<string, string> = Object.fromEntries(
  NHOM_DAY_GOI_Y.map((d) => [d.day.replace(/^Nhôm\s+/, ""), d.goiY])
);

const rowsOf = (loai: Loai): MenuRow[] =>
  NHOM_KINH.flatMap((g) =>
    g.rows.flatMap((r) => {
      const m = r.mau.match(/^(Cửa đi|Cửa sổ|Vách kính)\s+(.+)$/);
      if (!m || m[1] !== loai) return [];
      const day = spaced(m[2]);
      return [{ name: `${g.group} ${day}`, gia: r.gia, sub: loai === "Cửa đi" ? DAY_GOI_Y[day] : undefined }];
    })
  );

const KINH_GOI_Y_BY: Record<string, string> = Object.fromEntries(
  KINH_GOI_Y.map((k) => [k.day.replace(/^Kính\s+/, ""), k.goiY])
);

const NHOM_GROUPS: MenuGroup[] = [
  {
    id: "cua-di",
    name: "Cửa đi",
    unit: "đ/m²",
    rows: rowsOf("Cửa đi"),
    notes: ["Nhôm Việt: kính mờ tính thêm theo m²."],
  },
  { id: "cua-so", name: "Cửa sổ", unit: "đ/m²", rows: rowsOf("Cửa sổ"), notes: ["Nhôm Việt: kính mờ tính thêm theo m²."] },
  {
    id: "vach-kinh",
    name: "Vách kính",
    unit: "đ/m²",
    rows: rowsOf("Vách kính"),
    notes: ["Nhôm Việt: kính hộp nan đồng tính thêm theo m²."],
  },
  {
    id: "maxpro",
    name: "Nhôm Maxpro",
    unit: "đ/m²",
    desc: "Hệ cao cấp, cách âm, cách nhiệt. Số hệ là bề rộng khung nhôm tính bằng mm: hệ càng lớn, khung càng cứng.",
    rows: group("Nhôm Maxpro").map((r) => ({ name: r.mau, gia: r.gia })),
    image: { src: "/bang-gia/minh-hoa/nk_maxpro.webp", alt: "mặt cắt khung nhôm hệ cao cấp" },
  },
  {
    id: "kinh-ban-le-san",
    name: "Cửa kính bản lề sàn",
    unit: "đ/m²",
    desc: "Kính cường lực, không khung, hợp mặt tiền shop và văn phòng.",
    rows: group("Cửa kính bản lề sàn").map((r) => ({ name: `Kính ${r.mau}`, gia: r.gia, sub: KINH_GOI_Y_BY[r.mau] })),
    notes: [KINH_CUONG_LUC],
  },
];

const LAN_CAN = group("Lan can cầu thang").map((r) => ({ name: r.mau.replace(/\*/g, " × "), gia: r.gia }));

const tu = (rows: { gia: Gia }[]) => minGia(rows.map((r) => r.gia));

const faqItems = [
  {
    tab: "Việt hay Nhập",
    question: "Nhôm Việt và nhôm nhập khác nhau thế nào?",
    answer:
      "Nhôm nhập có hàm lượng nhôm nguyên chất cao hơn, bề mặt đồng đều hơn, chịu lực tốt hơn và ít co ngót theo nhiệt độ. Nhôm Việt chi phí thấp hơn và vẫn đáp ứng tốt cho công trình dân dụng thông thường.",
  },
  {
    tab: "Kính",
    question: "Muốn dùng loại kính khác thì tính sao?",
    answer:
      "Giá cửa nhôm đã gồm kính trắng 8 ly. Kính mờ (nhôm Việt) tính thêm theo m², ghi trong bảng giá gửi qua Zalo. Kính cường lực, kính hộp, kính phản quang báo giá riêng theo công trình.",
  },
  {
    tab: "Phụ phí",
    question: "Cửa nhôm kính có cộng phụ phí cửa nhỏ không?",
    answer:
      "Không. Phụ phí cửa nhỏ chỉ áp cho cửa cuốn và cửa kéo. Phụ kiện Candy theo yêu cầu thì báo giá riêng.",
  },
  {
    tab: "Khu vực",
    question: "Có thi công ở các quận huyện Cần Thơ không?",
    answer:
      "Có. Chúng tôi thi công khắp Cần Thơ: Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn, Thốt Nốt và các huyện ngoại thành, không tính phí đi lại. Khảo sát, đo đạc nội thành miễn phí.",
  },
  {
    tab: "Bảo hành",
    question: "Bảo hành cửa nhôm kính thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE}#service`,
      name: "Cửa Nhôm Kính Cần Thơ",
      description: "Cung cấp và thi công cửa nhôm kính tại Cần Thơ — nhôm Việt, nhôm nhập, Maxpro, kính bản lề sàn, lan can cầu thang.",
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
        { "@type": "ListItem", position: 2, name: "Bảng Giá Cửa Nhôm Kính Cần Thơ", item: PAGE },
      ],
    },
  ],
};

export default function BangGiaCuaNhomKinhCanTho() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NoScriptStyle />
        <Rise />

        <PriceHero
          title="Bảng giá cửa nhôm kính Cần Thơ"
          lead={`Giá theo m², đã gồm công lắp đặt; cửa nhôm đã gồm kính trắng 8 ly. Chưa VAT, áp dụng từ ${APPLIED_FROM}. Giá từng mẫu gửi qua Zalo trong 1–2 phút.`}
          aside={
            <ProductPicker
              items={[
                {
                  name: "Cửa đi nhôm kính",
                  href: "#cua-di",
                  tu: tu(rowsOf("Cửa đi")),
                  unit: "đ/m²",
                  photo: { src: "/cong-trinh/nk23-cua-nhom-kinh-doi-xam/01.jpg", alt: "Cửa đi nhôm kính 2 cánh khung xám, vách kính hai bên, do Hưng Thành Phát lắp", caption: "Cửa đi nhôm kính, công trình HTP." },
                },
                {
                  name: "Cửa sổ nhôm kính",
                  href: "#cua-so",
                  tu: tu(rowsOf("Cửa sổ")),
                  unit: "đ/m²",
                  photo: { src: "/cong-trinh/nk42-cua-so-nhom-can/01.jpg", alt: "Cửa sổ nhôm kính khung xám do Hưng Thành Phát lắp", caption: "Cửa sổ nhôm kính, công trình HTP." },
                },
                {
                  name: "Vách kính",
                  href: "#vach-kinh",
                  tu: tu(rowsOf("Vách kính")),
                  unit: "đ/m²",
                  photo: { src: "/cong-trinh/nk18-shopfront-kinh-ladder/01.jpg", alt: "Vách kính mặt tiền cửa hàng đang hoàn thiện", caption: "Vách kính mặt tiền, công trình HTP." },
                },
                {
                  name: "Cửa kính bản lề sàn",
                  href: "#kinh-ban-le-san",
                  tu: tu(group("Cửa kính bản lề sàn")),
                  unit: "đ/m²",
                  photo: { src: "/cong-trinh/nk46-shopfront-kinh-lau/02.jpg", alt: "Mặt tiền kính cường lực không khung sau khi lắp", caption: "Kính cường lực mặt tiền shop, công trình HTP." },
                },
                {
                  name: "Lan can cầu thang",
                  href: "#lan-can",
                  tu: tu(group("Lan can cầu thang")),
                  unit: "đ/m²",
                  photo: { src: "/cong-trinh/nk10-369-nguyen-van-cu-thang-kinh/03.jpg", alt: "Cầu thang xoắn lan can kính tay vịn gỗ do Hưng Thành Phát lắp", caption: "Lan can kính cầu thang xoắn, công trình HTP." },
                },
              ]}
            />
          }
        >
          <HeroIndex
            label="Dòng cao cấp, đ/m²"
            items={[{ href: "#maxpro", name: "Nhôm Maxpro hệ 55, 65, 83", gia: tu(group("Nhôm Maxpro")) }]}
            others={[
              { href: "/bao-gia-cua-cuon-can-tho", label: "Cửa cuốn" },
              { href: "/bang-gia-cua-keo-can-tho", label: "Cửa kéo" },
              { href: "/bang-gia-phu-kien-can-tho", label: "Motor & phụ kiện" },
            ]}
          />
          <ZaloQuoteCard source="Bảng giá cửa nhôm kính · đầu trang" className="mt-8 max-w-md" />
          <HeroActions className="mt-5" />
        </PriceHero>

        {/* Cửa nhôm kính — prices like a menu, grouped by what is being bought */}
        <section id="nhom-kinh" aria-labelledby="nhom-kinh-title" className="scroll-mt-20 py-20 md:py-28">
          <div className="container">
            <SlatHeading id="nhom-kinh-title" title="Cửa nhôm kính" meta="Nhôm Việt · Nhôm Nhập · Maxpro · đ/m²" />
            <PriceMenu
              intro={
                <>
                  <p>Nhôm Việt phổ thông, bền, giá hợp lý. Nhôm Nhập là profile nhập khẩu, dày và chắc hơn.</p>
                  <p className="mt-4">Giá đã gồm kính trắng 8 ly; cửa nhôm kính không cộng phụ phí cửa nhỏ.</p>
                </>
              }
              photo={{
                src: "/cong-trinh/nk30-cua-4-canh-kinh/01.jpg",
                alt: "Cửa đi nhôm kính 4 cánh kính hoa văn trên bậc tam cấp",
                caption: "Cửa đi 4 cánh, công trình HTP.",
              }}
              groups={NHOM_GROUPS}
            />
            <PriceGate source="Bảng giá cửa nhôm kính · dưới bảng" className="mt-14 max-w-3xl" />
          </div>
        </section>

        {/* Lan can — one large photograph beside its prices */}
        <section id="lan-can" aria-labelledby="lan-can-title" className="scroll-mt-20 bg-slate-50 py-20 md:py-28">
          <div className="container">
            <SlatHeading id="lan-can-title" title="Lan can cầu thang" meta="đ/m² mặt lan can" />
            <div className="mt-10 grid items-start gap-10 md:grid-cols-12">
              <figure className="md:col-span-5" data-rise>
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/cong-trinh/nk47-lan-can-thang-kinh/01.jpg"
                    alt="Lan can kính tay vịn gỗ cầu thang nhà phố do Hưng Thành Phát lắp"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-slate-600">Lan can kính tay vịn gỗ, công trình HTP.</figcaption>
              </figure>
              <div className="md:col-span-7 md:pl-6" data-rise>
                <p className="max-w-[40ch] text-xl leading-relaxed text-brand">
                  Kính cầu thang và ban công, chọn theo kiểu tay vịn. Tính theo m² mặt lan can.
                </p>
                <ul className="mt-8 space-y-5">
                  {LAN_CAN.map((r) => (
                    <li key={r.name} className="flex items-baseline justify-between gap-4">
                      <span className="text-base font-semibold text-brand">{r.name}</span>
                      <span className="whitespace-nowrap text-xl font-semibold tabular-nums text-brand">
                        <RowPrice gia={r.gia} />
                      </span>
                    </li>
                  ))}
                </ul>
                <PriceGate source="Bảng giá cửa nhôm kính · lan can" className="mt-10" />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="hoi-dap-title" className="py-20 md:py-28">
          <div className="container">
            <SlatHeading id="hoi-dap-title" title="Câu hỏi thường gặp" />
            <FaqCards group="faq-nhom-kinh" items={faqItems} aside={<ShowroomFigure />} />
          </div>
        </section>

        <ClosingBand
          source="Bảng giá cửa nhôm kính"
          photos={[
            { src: "/cong-trinh/nk38-cua-nhom-4-canh-xam/01.jpg", alt: "Cửa nhôm kính 4 cánh xám do Hưng Thành Phát lắp" },
            { src: "/cong-trinh/nk36-lan-can-ban-cong-go/01.jpg", alt: "Lan can kính ban công tay vịn gỗ do Hưng Thành Phát lắp" },
            { src: "/cong-trinh/p26-shop-kinh-cai-tao/01.jpg", alt: "Mặt tiền kính cửa hàng cải tạo do Hưng Thành Phát lắp" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
