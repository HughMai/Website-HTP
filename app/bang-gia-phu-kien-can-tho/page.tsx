import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClosingBand } from "@/components/bang-gia/ClosingBand";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { FaqCards } from "@/components/bang-gia/FaqCards";
import { MotorPicker } from "@/components/bang-gia/MotorPicker";
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
} from "@/components/bang-gia/parts";
import { APPLIED_FROM, BINH_TICH_DIEN, MOTOR, PHU_KIEN } from "@/lib/bang-gia-data";
import { PHU_KIEN_DUNG_CHO } from "@/lib/bang-gia-specs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const PAGE = `${siteUrl}/bang-gia-phu-kien-can-tho`;

export const metadata: Metadata = {
  title: "Giá Motor & Phụ Kiện Cửa Cuốn Cần Thơ",
  description:
    "Bảng giá motor cửa cuốn 300–500kg, motor cửa Úc, bình tích điện và khóa ngang tại Cần Thơ. Chưa VAT. Gọi 0963 021 639.",
  alternates: { canonical: PAGE },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: PAGE,
    title: "Giá Motor & Phụ Kiện Cửa Cuốn Cần Thơ",
    description: "Motor cửa cuốn theo sức nâng, bình tích điện, khóa ngang. Giá theo bộ, chưa VAT.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

/** AI renders from the print catalog — HTP has no photos of these parts yet (see Illustration). */
const MINH_HOA = "/bang-gia/minh-hoa";

const MOTOR_TAI = MOTOR.filter((m) => m.sucNang !== null);
const MOTOR_UC = MOTOR.find((m) => m.sucNang === null);
/** Two types (YH, SH) like the print catalog; null while their price is unlisted → "Liên hệ". */
const BINH_GIA = minGia(BINH_TICH_DIEN.map((b) => b.gia));
const KHOA = PHU_KIEN;

const MOTOR_GROUPS: MenuGroup[] = [
  {
    id: "motor-remote",
    name: "Motor + remote",
    unit: "đ/bộ",
    desc: "Chọn tải theo diện tích cửa.",
    rows: MOTOR_TAI.map((m) => ({ name: `Sức nâng ${m.sucNang}`, sub: m.dienTich, gia: m.gia })),
    image: { src: `${MINH_HOA}/motor.webp`, alt: "motor cửa cuốn và remote" },
  },
  ...(MOTOR_UC
    ? [
        {
          name: "Motor cửa cuốn công nghệ Úc",
          unit: "đ/bộ",
          rows: [{ name: "Motor + remote cửa Úc", sub: "Mọi kích thước cửa Úc", gia: MOTOR_UC.gia }],
          image: { src: `${MINH_HOA}/motor_uc.webp`, alt: "motor cửa cuốn Úc và remote" },
        },
      ]
    : []),
  {
    id: "binh-tich-dien",
    name: "Bình tích điện",
    unit: "đ/bộ",
    desc: PHU_KIEN_DUNG_CHO.binh,
    rows: BINH_TICH_DIEN.map((b) => ({ name: `Loại ${b.loai}`, gia: b.gia })),
    image: { src: `${MINH_HOA}/binh.webp`, alt: "bình tích điện cửa cuốn" },
  },
  {
    id: "khoa-ngang",
    name: "Khóa ngang",
    unit: "đ/cái",
    rows: KHOA.map((p) => ({ name: PHU_KIEN_DUNG_CHO[p.key], gia: p.gia })),
    notes: ["Tính theo cái, không nhân diện tích cửa."],
    image: { src: `${MINH_HOA}/khoa.webp`, alt: "khóa ngang cửa cuốn" },
  },
];

/** "Cửa dưới 12m²" → "dưới 12m²", for the FAQ sentence. */
const motorRule = MOTOR_TAI.map((m) => `${m.dienTich.replace(/^Cửa\s+/, "")} dùng ${m.sucNang}`).join("; ");

const faqItems = [
  {
    tab: "Motor gồm gì",
    question: "Giá motor đã gồm những gì?",
    answer: `Motor (tời) và remote điều khiển, tính theo bộ cho một cửa, chưa VAT. Tải motor chọn theo diện tích cửa: ${motorRule}. Cửa cuốn công nghệ Úc dùng motor riêng.`,
  },
  {
    tab: "Không motor",
    question: "Không lắp motor được không?",
    answer:
      "Được. Cửa cuốn vẫn kéo tay được, kèm khóa ngang để khóa cửa. Phần lớn khách chọn lắp motor cho tiện sử dụng.",
  },
  {
    tab: "Bảo hành",
    question: "Motor và phụ kiện bảo hành thế nào?",
    answer: `${WARRANTY} cho motor và phụ kiện chính hãng. Trong thời gian bảo hành, chúng tôi sửa chữa hoặc thay thế tại nơi lắp đặt.`,
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
        { "@type": "ListItem", position: 2, name: "Bảng Giá Motor & Phụ Kiện", item: PAGE },
      ],
    },
  ],
};

export default function BangGiaPhuKienCanTho() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NoScriptStyle />
        <Rise />

        <PriceHero
          title="Bảng giá motor và phụ kiện"
          lead={`Motor cửa cuốn theo sức nâng, bình tích điện và khóa ngang. Chưa VAT, áp dụng từ ${APPLIED_FROM}.`}
          aside={<MotorPicker motors={MOTOR} binh={BINH_GIA} />}
        >
          <HeroIndex
            label="Giá"
            items={[
              { href: "#motor-remote", name: "Motor + remote, đ/bộ", gia: minGia(MOTOR.map((m) => m.gia)) },
              { href: "#binh-tich-dien", name: "Bình tích điện, đ/bộ", gia: BINH_GIA },
              { href: "#khoa-ngang", name: "Khóa ngang, đ/cái", gia: minGia(KHOA.map((p) => p.gia)) },
            ]}
            others={[
              { href: "/bao-gia-cua-cuon-can-tho", label: "Cửa cuốn" },
              { href: "/bang-gia-cua-keo-can-tho", label: "Cửa kéo" },
              { href: "/bang-gia-cua-nhom-kinh-can-tho", label: "Nhôm kính" },
            ]}
          />
          <ZaloQuoteCard source="Bảng giá motor & phụ kiện · đầu trang" className="mt-8 max-w-md" />
          <HeroActions className="mt-5" />
        </PriceHero>

        <section id="motor" aria-labelledby="motor-title" className="scroll-mt-20 py-20 md:py-28">
          <div className="container">
            <SlatHeading id="motor-title" title="Motor & phụ kiện cửa cuốn" meta="Tính theo bộ, theo cái" />
            <PriceMenu
              intro={
                <>
                  <p>Cửa càng rộng, càng cao, nan càng dày thì càng cần motor tải lớn.</p>
                  <p className="mt-4 text-base">
                    Khi nào nên thay motor, thay cho cửa không do HTP lắp:{" "}
                    <Link
                      href="/phu-kien-cua-cuon-can-tho"
                      className="font-semibold underline decoration-amber-400 decoration-2 underline-offset-4 transition hover:decoration-4"
                    >
                      xem phụ kiện cửa cuốn
                    </Link>
                    .
                  </p>
                </>
              }
              photo={{
                src: "/cong-trinh/p19-cc-trang-san-da/03.jpg",
                alt: "Thợ Hưng Thành Phát lắp cửa cuốn trên thang",
                caption: "Thợ HTP đang lắp cửa cuốn.",
              }}
              groups={MOTOR_GROUPS}
            />
          </div>
        </section>

        <section aria-labelledby="hoi-dap-title" className="py-20 md:py-28">
          <div className="container">
            <SlatHeading id="hoi-dap-title" title="Câu hỏi thường gặp" />
            <FaqCards group="faq-phu-kien" items={faqItems} aside={<ShowroomFigure />} />
          </div>
        </section>

        <ClosingBand
          source="Bảng giá motor & phụ kiện"
          photos={[
            { src: "/cong-trinh/p23-keo-xanh-vlxd-linh/01.jpg", alt: "Cửa kéo xanh Hưng Thành Phát lắp cho cửa hàng vật liệu" },
            { src: "/cong-trinh/p19-cc-trang-san-da/01.jpg", alt: "Cửa cuốn trắng Hưng Thành Phát lắp cho mặt bằng kinh doanh" },
            { src: "/cong-trinh/p69-day-keo-xanh-xuong/01.jpg", alt: "Dãy cửa kéo xanh Hưng Thành Phát lắp cho nhà xưởng" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
