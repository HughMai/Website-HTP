import {
  APPLIED_FROM,
  CUA_KEO,
  NAN_DUC,
  NHOM_KINH,
  SONG_NGANG,
  TAM_LIEN,
  TOLE_THEM,
  type Gia,
} from "@/lib/bang-gia-data";
import { formatGia } from "@/lib/bang-gia-specs";
import { CONG_TRINH } from "@/lib/cong-trinh-data";
import { REVIEWS, type Review } from "@/lib/reviews";

/*
 * Google Ads landing pages: one per ad group, served at /lp/<slug>, noindex (the SEO
 * pages own organic search). Plan and sources: Enki/htp/ads/conversion-plan-2026-11-11.md.
 *
 * Every entry follows four rules:
 *  - The H1 starts with the ad group's search term, so the search, the ad and the page
 *    say the same thing (also the "landing page relevance" part of Quality Score).
 *  - Every promise is one the live site already makes. Nothing here commits the family
 *    to something new (Enki/htp/copy-rubric.md). Warranty text is only the CLAUDE.md phrase.
 *  - Prices are computed from bang-gia-data.ts, so a catalog update reaches these pages.
 *  - Reviews are real Google reviews. The family's own ("Mai Hugh") never runs on a page
 *    that paid traffic lands on.
 */

export type LpSlug =
  | "cua-cuon-can-tho"
  | "cua-keo-can-tho"
  | "cua-nhom-kinh-can-tho"
  | "sua-cua-cuon-can-tho";

export type LpPhoto = { src: string; alt: string; caption: string };

/** First column is the row label; the rest are right-aligned prices. */
export type LpPriceTable = { head: string[]; rows: string[][]; collapsed?: boolean };

export type LpForm = { title: string; submitLabel: string };

/** One sentence from a real Google review, shown right under the ask. */
export type LpProof = { quote: string; name: string };

export type AdLandingPage = {
  slug: LpSlug;
  /** The ad group's search term. Opens the H1 and the <title>. */
  keyword: string;
  /** Second half of the H1, after the keyword. */
  promise: string;
  description: string;
  intro: string;
  priceTeaser: string;
  zaloLabel: string;
  hero: LpPhoto;
  promises: { title: string; lead: string; items: { title: string; body: string }[] };
  /** Proof at the moment of commitment: the rating plus this quote sit under the form. */
  proof: LpProof;
  reviews: Review[];
  photos: { title: string; items: LpPhoto[] };
  prices: { title: string; lead: string; tables: LpPriceTable[]; note: string };
  /** The Zalo-number form, top of the page and again at the end. Left off the repair
   *  page: a broken door is an emergency, and an emergency calls. */
  form?: LpForm;
  stepsTitle: string;
  steps: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  closing: string;
};

// ── helpers ──────────────────────────────────────────────────────────────────

const perM2 = (n: number) => `${formatGia(n)}đ/m²`;
const cell = (g: Gia) => (g === null ? "Liên hệ" : formatGia(g));

/** Lowest listed price. Throws at build time if a group lost all its prices. */
function lowest(xs: Gia[], what: string): number {
  const v = xs.filter((x): x is number => x !== null);
  if (!v.length) throw new Error(`lp-data: no listed price for ${what}`);
  return Math.min(...v);
}

function review(name: string): Review {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`lp-data: no review by "${name}"`);
  return r;
}

/** A sentence lifted from a real review. Throws at build time if the review no longer says it. */
function quote(name: string, sentence: string): LpProof {
  if (!review(name).body.toLowerCase().includes(sentence.toLowerCase())) {
    throw new Error(`lp-data: review by "${name}" does not contain "${sentence}"`);
  }
  return { quote: sentence, name };
}

/** A photo from the công trình library. Throws at build time if the folder was renamed. */
function job(slug: string, caption: string, alt?: string): LpPhoto {
  const p = CONG_TRINH.find((x) => x.slug === slug);
  if (!p) throw new Error(`lp-data: no công trình "${slug}"`);
  return { src: p.cover, caption, alt: alt ?? caption };
}

/** A specific photo of a công trình, when its cover isn't the sharpest shot. */
function jobImage(slug: string, file: string, caption: string, alt?: string): LpPhoto {
  const p = CONG_TRINH.find((x) => x.slug === slug);
  const src = `/cong-trinh/${slug}/${file}`;
  if (!p?.images.includes(src)) throw new Error(`lp-data: no photo ${src}`);
  return { src, caption, alt: alt ?? caption };
}

function tamLien(key: "dai_loan" | "uc" | "inox") {
  const g = TAM_LIEN.find((x) => x.key === key);
  if (!g) throw new Error(`lp-data: no TAM_LIEN group "${key}"`);
  return g.rows.map((r) => r.gia);
}

function nhomKinh(group: string, prefix?: string): number {
  const g = NHOM_KINH.find((x) => x.group === group);
  if (!g) throw new Error(`lp-data: no NHOM_KINH group "${group}"`);
  const rows = prefix ? g.rows.filter((r) => r.mau.startsWith(prefix)) : g.rows;
  return lowest(rows.map((r) => r.gia), `${group} ${prefix ?? ""}`);
}

// ── shared copy ──────────────────────────────────────────────────────────────

// The three fears the customer research names (.agents/product-marketing.md): being
// overcharged, having materials swapped, the install running late. One guarantee per
// fear, each with a consequence ($100M Offers, Guarantees: "If you don't achieve X in Y
// time we will…"), named as one offer, and given its reason why: HTP owns the xưởng,
// so it controls its own price, materials and schedule.
// ĐÚNG HẸN (1%/day late, capped at 10%) was decided by Hughie on 11/11/2026 — the
// hợp đồng template must carry the same clause before these pages go live.
const THREE_DUNG = {
  title: "3 ĐÚNG — đúng giá, đúng vật tư, đúng hẹn",
  lead: "Ba nỗi lo khi làm cửa: bị đội giá, bị tráo vật tư, bị trễ hẹn. Cửa làm tại xưởng của bên em ở Bình Thủy, nên bên em cam kết được cả ba — sai điều nào, bên em chịu.",
  items: [
    {
      title: "Đúng giá",
      body: "Thợ đo tận nơi, báo giá rõ từng mục trước khi làm. Giá đã chốt thì không phát sinh. Đặt cọc 30%, lắp xong nghiệm thu mới thanh toán phần còn lại.",
    },
    {
      title: "Đúng vật tư",
      body: "Mỗi bộ cửa có CO/CQ chứng nhận xuất xứ. Sai vật tư đã cam kết, Hưng Thành Phát bồi thường 100% giá trị hợp đồng.",
    },
    {
      title: "Đúng hẹn",
      body: "Ngày lắp ghi trong hợp đồng. Trễ hẹn, Hưng Thành Phát giảm 1% giá trị hợp đồng cho mỗi ngày trễ, tối đa 10% (trừ ngày mưa bão, thiên tai).",
    },
  ],
};

const FAQ_LATE = {
  q: "Lỡ lắp trễ ngày đã hẹn thì sao?",
  a: "Ngày lắp được ghi trong hợp đồng. Nếu bên em lắp trễ so với ngày đó, Hưng Thành Phát giảm 1% giá trị hợp đồng cho mỗi ngày trễ, tối đa 10%. Không tính những ngày mưa bão, thiên tai.",
};

// Every form on the site is now the one-field Zalo form (components/LeadForm.tsx):
// the CRM's Zalo bot sends the catalog the moment the number arrives. Title and button
// only (Hughie, 12/11/2026): the card is the first thing under the headline, and the
// headline already says what happens. Also used by components/ZaloQuoteCard.tsx.
export const INSTALL_FORM: LpForm = {
  title: "Ghi số Zalo để nhận báo giá ngay lập tức",
  submitLabel: "Nhận báo giá ngay",
};

// Under the form the fear is "leave my number and they'll hound me", so the quote
// answers that, from a real customer.
export const INSTALL_PROOF = quote("Cương Trương Kim", "Chủ cửa hàng tư vấn thật tâm, không ép mua.");

/** Step 1 on the install pages is the same ask as the form at the top. */
const stepOne = (detail: string) => ({
  title: "Ghi số Zalo hoặc gọi",
  body: `Catalog và bảng giá đến Zalo trong 1–2 phút. ${detail}`,
});

const FAQ_DEPOSIT = {
  q: "Có phải trả hết tiền trước không?",
  a: "Không. Anh/chị đặt cọc 30% khi chốt hợp đồng. Phần còn lại thanh toán sau khi lắp xong, chạy thử và nghiệm thu.",
};

const FAQ_MATERIALS = {
  q: "Làm sao biết bên em dùng đúng vật tư như báo giá?",
  a: "Mỗi bộ cửa có CO/CQ chứng nhận xuất xứ để anh/chị đối chiếu. Sai vật tư đã cam kết, Hưng Thành Phát bồi thường 100% giá trị hợp đồng.",
};

const faqWarranty = (what: string) => ({
  q: "Bảo hành thế nào?",
  a: `Hưng Thành Phát Door bảo hành ${what} theo kỳ hạn tiêu chuẩn của nhà sản xuất. Trong thời gian bảo hành, bên em sửa chữa hoặc thay thế miễn phí tại nơi lắp đặt.`,
});

// ── prices, all from bang-gia-data.ts ────────────────────────────────────────

const CUON = {
  daiLoan: lowest(tamLien("dai_loan"), "tole Đài Loan"),
  uc: lowest(tamLien("uc"), "cửa cuốn Úc"),
  sieuTruong: lowest(
    TOLE_THEM.find((x) => x.key === "tole_sieu_truong")?.rows.map((r) => r.gia) ?? [],
    "tole siêu trường"
  ),
  songNgang: lowest(SONG_NGANG.flatMap((g) => g.rows.map((r) => r.gia)), "song ngang"),
  nhomDuc: lowest(
    NAN_DUC.map((n) => n.gia),
    "nhôm công nghệ Đức"
  ),
  inox: lowest(tamLien("inox"), "inox"),
};

const KEO_TU = lowest(
  CUA_KEO.map((r) => r.khongLa),
  "cửa kéo"
);
const KEO_DEN = Math.max(...CUA_KEO.flatMap((r) => [r.coLa, r.khongLa]).filter((x): x is number => x !== null));

const NK = {
  vach: nhomKinh("Nhôm Việt", "Vách kính"),
  so: nhomKinh("Nhôm Việt", "Cửa sổ"),
  di: nhomKinh("Nhôm Việt", "Cửa đi"),
};

// Mirror of the price tables on /sua-chua-cua-cuon-can-tho. e2e/ads-landing.spec.ts fails
// if a row here stops matching that page, so change both together.
const SUA_CUON: string[][] = [
  ["Sửa / lập trình lại remote", "100.000 – 300.000 đ"],
  ["Chỉnh ray, con lăn lệch", "200.000 – 500.000 đ"],
  ["Thay lò xo cân bằng", "300.000 – 700.000 đ"],
  ["Sửa motor (cuộn dây, tụ, bo mạch)", "300.000 – 1.500.000 đ"],
  ["Thay motor nhập khẩu mới", "1.500.000 – 4.000.000 đ"],
  ["Thay bình lưu điện", "400.000 – 900.000 đ"],
  ["Thay dây cuốn", "200.000 – 600.000 đ"],
];
const SUA_KEO: string[][] = [
  ["Chỉnh / nắn ray lệch", "150.000 – 400.000 đ"],
  ["Thay con lăn (1 bộ)", "100.000 – 300.000 đ"],
  ["Sửa / thay khóa ngang", "200.000 – 500.000 đ"],
  ["Hàn / gia cố khung kéo", "300.000 – 800.000 đ"],
  ["Thay phụ kiện rỉ sét", "200.000 – 600.000 đ"],
];
const SUA_NHOM_KINH: string[][] = [
  ["Thay kính vỡ (kính đơn, cắt theo kích thước)", "300.000 – 1.200.000 đ/tấm"],
  ["Sửa / thay bản lề lỏng", "150.000 – 400.000 đ"],
  ["Thay gioăng cao su toàn bộ cửa", "200.000 – 500.000 đ"],
  ["Sửa / thay khóa cửa nhôm", "200.000 – 600.000 đ"],
  ["Bơm lại ron silicone chống thấm", "150.000 – 450.000 đ"],
  ["Thay tay nắm / tay gạt", "100.000 – 350.000 đ"],
];

// ── the four pages ───────────────────────────────────────────────────────────

export const AD_LANDING_PAGES: AdLandingPage[] = [
  {
    slug: "cua-cuon-can-tho",
    keyword: "Cửa Cuốn Cần Thơ",
    promise: "Đặt Cọc 30%, Lắp Xong Mới Thanh Toán",
    description: `Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ, từ 2005. Giá niêm yết từ ${perM2(CUON.daiLoan)}, báo giá rõ từng mục trước khi làm. Đặt cọc 30%, lắp xong mới thanh toán.`,
    intro:
      "Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ, từ 2005. Cửa cắt đúng kích thước tại xưởng Bình Thủy; thợ đến đo tận nơi, báo giá rõ từng mục — chốt giá rồi không phát sinh.",
    priceTeaser: `Giá niêm yết từ ${perM2(CUON.daiLoan)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    // 1108×1477 and sharp; the old p07 cover was soft at hero size (Hughie, 12/11/2026).
    hero: jobImage(
      "project-01-cua-cuon-kem-so-534",
      "03.jpg",
      "Cửa cuốn kem mặt tiền",
      "Cửa cuốn màu kem lắp cho mặt tiền nhà phố"
    ),
    promises: THREE_DUNG,
    proof: INSTALL_PROOF,
    reviews: [review("Cương Trương Kim"), review("Nhiên Nguyễn"), review("Thắng Võ Minh")],
    photos: {
      title: "Cửa cuốn bên em đã lắp",
      items: [
        job("p29-shop-vang-khai-truong-28-1", "Cửa cuốn shop — ngày khai trương 28/1/2026"),
        job("p24-cc-xam-duc-lo", "Cửa cuốn khe thoáng xám"),
        job("p01-cc-nan-bac", "Cửa cuốn nan nhôm bạc"),
        job("p31-xuong-cc-xanh", "Cửa cuốn nhà xưởng khổ lớn"),
      ],
    },
    prices: {
      title: "Giá cửa cuốn niêm yết",
      lead: `Giá theo m², đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
      tables: [
        {
          head: ["Loại cửa cuốn", "Giá từ (đ/m²)"],
          rows: [
            ["Tole Đài Loan (tấm liền)", formatGia(CUON.daiLoan)],
            ["Cửa cuốn công nghệ Úc", formatGia(CUON.uc)],
            ["Tole siêu trường", formatGia(CUON.sieuTruong)],
            ["Song ngang, mắc võng thép", formatGia(CUON.songNgang)],
            ["Nhôm công nghệ Đức", formatGia(CUON.nhomDuc)],
            ["Inox SUS 304", formatGia(CUON.inox)],
          ],
        },
      ],
      note: "Motor và bình tích điện tính riêng. Giá đúng kích thước nhà anh/chị: thợ đo tận nơi và báo giá miễn phí.",
    },
    form: INSTALL_FORM,
    stepsTitle: "4 bước, từ báo giá đến lúc thanh toán",
    steps: [
      stepOne("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn loại cửa hợp ngân sách."),
      { title: "Đo tận nơi, báo giá", body: "Thợ đến đo, báo giá rõ từng mục. Đồng ý thì đặt cọc 30%." },
      { title: "Làm tại xưởng Bình Thủy", body: "Cửa cắt đúng kích thước tại xưởng, không phải chờ hàng từ TP.HCM." },
      { title: "Lắp, chạy thử, nghiệm thu", body: "Lắp tại chỗ khoảng 3–5 giờ. Nghiệm thu xong mới thanh toán phần còn lại." },
    ],
    faq: [
      {
        q: "Cửa cuốn giá bao nhiêu một mét vuông?",
        a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}: tole Đài Loan từ ${perM2(CUON.daiLoan)}, nhôm công nghệ Đức từ ${perM2(CUON.nhomDuc)}, inox SUS 304 từ ${perM2(CUON.inox)}. Giá đã gồm vật tư và công lắp đặt, chưa VAT; motor và bình tích điện tính riêng. Thợ đo tận nơi và báo giá đúng kích thước, miễn phí.`,
      },
      FAQ_DEPOSIT,
      FAQ_MATERIALS,
      FAQ_LATE,
      {
        q: "Nên chọn cửa cuốn nhôm hay thép?",
        a: "Cửa cuốn nhôm công nghệ Đức nhẹ hơn, không gỉ sét, vận hành êm — hợp nhà phố và garage. Cửa cuốn thép sơn tĩnh điện chịu va đập tốt hơn với chi phí thấp hơn — hợp nhà kinh doanh và kho hàng. Với khí hậu ẩm ở Cần Thơ, nhôm thường bền hơn về lâu dài.",
      },
      faqWarranty("cả cửa và motor"),
      {
        q: "Có lắp ở huyện và tỉnh lân cận không?",
        a: "Có. Bên em nhận lắp tại tất cả quận, huyện Cần Thơ và đã làm công trình ở Hậu Giang, Vĩnh Long. Ở tỉnh khác, anh/chị gọi để hỏi lịch đo và chi phí đi lại.",
      },
    ],
    closing: "Cửa cuốn Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "cua-keo-can-tho",
    keyword: "Cửa Kéo Cần Thơ",
    promise: "Đặt Cọc 30%, Lắp Xong Mới Thanh Toán",
    description: `Cửa kéo thép, nhôm, inox làm tại xưởng Bình Thủy từ 2005. Giá niêm yết từ ${perM2(KEO_TU)}, lắp tiêu chuẩn 3–5 giờ. Đặt cọc 30%, lắp xong mới thanh toán.`,
    intro:
      "Cửa kéo thép, nhôm, inox cho mặt tiền nhà phố và cửa hàng — làm tại xưởng Hưng Thành Phát ở Bình Thủy từ 2005. Thợ đo tận nơi, báo giá rõ từng mục; lắp tiêu chuẩn mất 3–5 giờ.",
    priceTeaser: `Giá niêm yết từ ${perM2(KEO_TU)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: job("p23-keo-xanh-vlxd-linh", "Cửa kéo xanh mặt tiền", "Cửa kéo thép màu xanh lắp cho mặt tiền cửa hàng"),
    promises: THREE_DUNG,
    proof: INSTALL_PROOF,
    reviews: [review("Nhiên Nguyễn"), review("Thắng Võ Minh"), review("Tien My Vo")],
    photos: {
      title: "Cửa kéo bên em đã lắp",
      items: [
        job("p55-keo-trang-chau-cay", "Cửa kéo trắng nhà phố"),
        job("p39-shop-keo-kem-oto", "Cửa kéo kem mặt tiền shop"),
        job("p69-day-keo-xanh-xuong", "Dãy cửa kéo nhà xưởng"),
        job("p50-vinh-long-binh-minh-keo-vang", "Cửa kéo vàng — Bình Minh, Vĩnh Long"),
      ],
    },
    prices: {
      title: "Giá cửa kéo thép niêm yết",
      lead: `Giá theo m² diện tích cửa (rộng × cao), đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
      tables: [
        {
          head: ["Độ dày thép", "Không lá", "Có lá"],
          rows: CUA_KEO.map((r) => [`${r.label} (${r.mm})`, cell(r.khongLa), cell(r.coLa)]),
        },
      ],
      note: "Cửa từ 5 đến dưới 8 m² cộng 20.000đ/m²; dưới 5 m² cộng 40.000đ/m². Cửa kéo nhôm và inox báo giá theo mẫu.",
    },
    form: INSTALL_FORM,
    stepsTitle: "4 bước, từ báo giá đến lúc thanh toán",
    steps: [
      stepOne("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn thép, nhôm hay inox hợp ngân sách."),
      { title: "Đo tận nơi, báo giá", body: "Thợ đến đo, báo giá rõ từng mục. Đồng ý thì đặt cọc 30%." },
      { title: "Làm tại xưởng Bình Thủy", body: "Cửa gia công đúng kích thước tại xưởng của Hưng Thành Phát." },
      { title: "Lắp, chạy thử, nghiệm thu", body: "Lắp tiêu chuẩn mất 3–5 giờ. Nghiệm thu xong mới thanh toán phần còn lại." },
    ],
    faq: [
      {
        q: "Cửa kéo giá bao nhiêu?",
        a: `Cửa kéo thép tính theo m² diện tích cửa (rộng × cao): từ ${perM2(KEO_TU)} đến ${perM2(KEO_DEN)} tùy độ dày và loại có lá hay không lá, đã gồm vật tư và công lắp đặt, chưa VAT. Cửa kéo nhôm và inox báo giá theo mẫu.`,
      },
      FAQ_DEPOSIT,
      {
        q: "Cửa kéo thép hay cửa kéo nhôm?",
        a: "Cửa kéo nhôm nhẹ hơn, không gỉ sét nhưng giá cao hơn 20–30%. Cửa kéo thép bền hơn về cơ học, giá thấp hơn, phụ kiện phổ biến dễ thay. Cả hai đều hợp mặt tiền kinh doanh.",
      },
      {
        q: "Lắp cửa kéo mất bao lâu?",
        a: "Lắp đặt cửa kéo tiêu chuẩn mất 3–5 giờ. Đội kỹ thuật có mặt trong ngày tại tất cả quận, huyện Cần Thơ.",
      },
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cửa kéo"),
    ],
    closing: "Cửa kéo Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "cua-nhom-kinh-can-tho",
    keyword: "Cửa Nhôm Kính Cần Thơ",
    promise: "Đặt Cọc 30%, Lắp Xong Mới Thanh Toán",
    description: `Cửa đi, cửa sổ, vách kính, lan can — đo tận nơi, gia công tại xưởng Bình Thủy. Vách kính từ ${perM2(NK.vach)}, cửa sổ từ ${perM2(NK.so)}. Đặt cọc 30%, lắp xong mới thanh toán.`,
    intro:
      "Cửa đi, cửa sổ, vách kính, lan can — Hưng Thành Phát đo tận nơi, gia công tại xưởng Bình Thủy và lắp hoàn thiện. Chạy thử, ký nghiệm thu rồi anh/chị mới thanh toán phần còn lại.",
    priceTeaser: `Vách kính từ ${perM2(NK.vach)} · cửa sổ từ ${perM2(NK.so)}`,
    zaloLabel: "Nhắn Zalo — gửi ảnh, kích thước",
    hero: job("nk23-cua-nhom-kinh-doi-xam", "Cửa đi nhôm kính 2 cánh", "Cửa đi nhôm kính 2 cánh khung xám, tay nắm vàng"),
    promises: THREE_DUNG,
    proof: INSTALL_PROOF,
    reviews: [review("Thắng Võ Minh"), review("Nhiên Nguyễn"), review("Tien My Vo")],
    photos: {
      title: "Cửa nhôm kính bên em đã lắp",
      items: [
        job("nk05-nguyen-thi-tao-binh-thuy", "Cửa nhôm — Long Hòa, Bình Thủy · 28/10/2025"),
        job("nk06-duong-1b-cai-rang", "Cửa sổ nhôm — Hưng Thạnh, Cái Răng · 28/10/2025"),
        job("nk04-nhom-gia-go-hau-giang", "Cửa nhôm giả gỗ — Châu Thành A, Hậu Giang · 06/01/2026"),
        job("nk38-cua-nhom-4-canh-xam", "Cửa đi nhôm kính 4 cánh"),
      ],
    },
    prices: {
      title: "Giá nhôm kính niêm yết",
      lead: `Giá theo m², đã gồm công lắp đặt; cửa nhôm đã gồm kính trắng 8 ly. Chưa VAT, áp dụng từ ${APPLIED_FROM}.`,
      tables: NHOM_KINH.map((g, i) => ({
        head: [g.group, "đ/m²"],
        rows: g.rows.map((r) => [r.mau, cell(r.gia)]),
        collapsed: i >= 2,
      })),
      note: "Giá đúng kích thước nhà anh/chị: thợ đo tận nơi và báo giá miễn phí.",
    },
    form: INSTALL_FORM,
    stepsTitle: "4 bước, từ báo giá đến lúc thanh toán",
    steps: [
      stepOne("Gửi thêm ảnh và kích thước ô cửa nếu có, bên em tư vấn nhôm Việt hay nhôm nhập hợp ngân sách."),
      { title: "Đo tận nơi, báo giá", body: "Thợ đến đo, báo giá rõ từng mục. Đồng ý thì đặt cọc 30%." },
      { title: "Gia công tại xưởng", body: "Khoảng 3–5 ngày làm việc sau khi chốt đơn." },
      { title: "Lắp, chạy thử, nghiệm thu", body: "Cửa đi, cửa sổ tiêu chuẩn lắp trong 1–2 ngày. Nghiệm thu xong mới thanh toán phần còn lại." },
    ],
    faq: [
      {
        q: "Cửa nhôm kính giá bao nhiêu?",
        a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}, nhôm Việt: vách kính từ ${perM2(NK.vach)}, cửa sổ từ ${perM2(NK.so)}, cửa đi từ ${perM2(NK.di)}. Nhôm nhập và Maxpro cao hơn — xem bảng giá phía trên. Giá đã gồm công lắp đặt, cửa nhôm đã gồm kính trắng 8 ly, chưa VAT.`,
      },
      FAQ_DEPOSIT,
      {
        q: "Nhôm Việt và nhôm nhập khác nhau thế nào?",
        a: "Nhôm nhập có bề mặt xử lý tốt hơn, ít cong vênh hơn. Nhôm Việt giá thấp hơn, hợp công trình không đòi hỏi cao. Cả hai đều có nhiều độ dày — xem bảng giá phía trên; thợ tư vấn loại hợp ngân sách khi đến đo.",
      },
      {
        q: "Bao lâu thì lắp xong?",
        a: "Gia công tại xưởng khoảng 3–5 ngày làm việc sau khi chốt đơn. Cửa đi và cửa sổ tiêu chuẩn lắp trong 1–2 ngày; mặt dựng lớn hoặc lan can nhiều tầng 3–7 ngày.",
      },
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cửa nhôm kính"),
    ],
    closing: "Cửa nhôm kính Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "sua-cua-cuon-can-tho",
    keyword: "Sửa Cửa Cuốn Cần Thơ",
    promise: "Báo Giá Trước, Sửa Xong Mới Thanh Toán",
    description:
      "Motor cháy, cửa kẹt, remote không ăn — kỹ thuật viên có mặt trong ngày, báo giá trước khi sửa, sửa xong mới thanh toán. Không tính phí đi lại trong Cần Thơ.",
    intro:
      "Motor cháy, cửa kẹt giữa chừng, remote không ăn, lò xo yếu — kỹ thuật viên Hưng Thành Phát có mặt trong ngày, kiểm tra và báo giá trước khi sửa. Sửa cả cửa không do bên em lắp.",
    priceTeaser: `Sửa remote từ ${SUA_CUON[0][1].split(" – ")[0]}đ · sửa motor từ ${SUA_CUON[3][1].split(" – ")[0]}đ`,
    zaloLabel: "Nhắn Zalo — gửi video cửa đang lỗi",
    hero: job("p19-cc-trang-san-da", "Cửa cuốn trắng — thợ đang hoàn thiện", "Thợ đứng thang hoàn thiện cửa cuốn trắng trong nhà"),
    promises: {
      title: "Biết giá trước khi thợ đụng vào cửa",
      lead: "Ba điều bên em giữ với mọi lần sửa.",
      items: [
        {
          title: "Báo giá trước",
          body: "Kỹ thuật viên kiểm tra, báo giá từng hạng mục rồi mới sửa. Không phát sinh ẩn.",
        },
        {
          title: "Sửa xong mới thanh toán",
          body: "Cửa chạy lại bình thường rồi anh/chị mới trả tiền.",
        },
        {
          title: "Không tính phí đi lại",
          body: "Ở tất cả quận, huyện Cần Thơ. Chỉ tính tiền theo hạng mục sửa thực tế.",
        },
      ],
    },
    proof: quote("Tien My Vo", "Nhân viên hỗ trợ nhiệt tình, cần sửa chữa cũng nhanh chóng."),
    reviews: [review("Tien My Vo"), review("Thắng Võ Minh"), review("Cương Trương Kim")],
    photos: {
      title: "Thợ và công trình của Hưng Thành Phát",
      items: [
        job("p05-cc-kem-tuong-xam", "Thợ Hưng Thành Phát tại công trình"),
        job("p07-cc-kem-san-gach", "Cửa cuốn kem nhà phố"),
        job("p01-cc-nan-bac", "Cửa cuốn nan nhôm bạc"),
        job("p24-cc-xam-duc-lo", "Cửa cuốn khe thoáng xám"),
      ],
    },
    prices: {
      title: "Giá sửa tham khảo",
      lead: "Giá tại Cần Thơ. Kỹ thuật viên kiểm tra và báo giá chính xác trước khi sửa — không phát sinh thêm.",
      tables: [
        { head: ["Sửa cửa cuốn", "Giá tham khảo"], rows: SUA_CUON },
        { head: ["Sửa cửa kéo", "Giá tham khảo"], rows: SUA_KEO, collapsed: true },
        { head: ["Sửa cửa nhôm kính", "Giá tham khảo"], rows: SUA_NHOM_KINH, collapsed: true },
      ],
      note: "Không tính phí đi lại trong Cần Thơ.",
    },
    // No form: someone whose door is stuck calls. The page is one big call button.
    stepsTitle: "4 bước, từ cuộc gọi đến khi cửa chạy lại",
    steps: [
      { title: "Gọi hoặc nhắn Zalo", body: "Tả lỗi, gửi video cửa nếu được để kỹ thuật viên mang đúng phụ tùng." },
      { title: "Có mặt trong ngày", body: "Kỹ thuật viên kiểm tra và báo giá từng hạng mục trước khi sửa." },
      { title: "Sửa tại chỗ", body: "Mang theo phụ tùng phổ biến, phần lớn sự cố xử lý xong ngay lần đến." },
      { title: "Cửa chạy rồi mới trả tiền", body: "Anh/chị kiểm tra cửa chạy bình thường rồi mới thanh toán." },
    ],
    faq: [
      {
        q: "Sửa motor cửa cuốn hết bao nhiêu?",
        a: "Sửa motor từ 300.000 đến 1.500.000 đồng tùy loại motor và mức độ hỏng. Nếu phải thay motor mới, từ 1.500.000 đến 4.000.000 đồng. Báo giá miễn phí trước khi sửa, không phát sinh thêm.",
      },
      {
        q: "Cửa cuốn không lên được — do đâu?",
        a: "Thường do 4 nguyên nhân: (1) motor cháy hoặc kẹt — nhấn nút không phản hồi; (2) remote mất lập trình — nhấn remote đèn không nháy; (3) lò xo gãy — cửa nặng bất thường dù motor còn chạy; (4) mất điện và bình lưu điện hết. Gọi để kỹ thuật viên chẩn đoán trong ngày.",
      },
      {
        q: "Có sửa cửa không do Hưng Thành Phát lắp không?",
        a: "Có. Bên em sửa tất cả loại cửa cuốn, cửa kéo, cửa nhôm kính — bất kể thương hiệu hay nơi mua.",
      },
      {
        q: "Có tính phí đi lại không?",
        a: "Không. Bên em phục vụ toàn bộ quận, huyện Cần Thơ — Bình Thủy, Ninh Kiều, Cái Răng, Ô Môn, Thốt Nốt và các huyện ngoại thành — không tính phí đi lại. Chi phí chỉ tính theo hạng mục sửa thực tế.",
      },
      {
        q: "Linh kiện thay mới có bảo hành không?",
        a: "Có. Linh kiện thay mới được bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất.",
      },
    ],
    closing: "Cửa hỏng không chờ được — gọi ngay",
  },
];

export function getAdLanding(slug: string): AdLandingPage | undefined {
  return AD_LANDING_PAGES.find((p) => p.slug === slug);
}
