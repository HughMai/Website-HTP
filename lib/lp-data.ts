import {
  APPLIED_FROM,
  CUA_KEO,
  MOTOR,
  NAN_DUC,
  NHOM_KINH,
  SONG_NGANG,
  TAM_LIEN,
  TOLE_THEM,
  type Gia,
} from "@/lib/bang-gia-data";
import { KEO_NHOM_DAY, NAN_SPECS, PHU_KIEN_DUNG_CHO, TAM_LIEN_SPECS, formatGia } from "@/lib/bang-gia-specs";
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
 *
 * The ten sitelink pages (Enki/htp/ads/sitelink-landing-plan-2026-11-12.md) add one rule:
 * the H1 is the sitelink text the visitor tapped, and `lead` puts the section that
 * sitelink promised (prices or job photos) directly under the hero.
 *
 * The 13/11/2026 rebuild (Enki/htp/ads/lp-hormozi-rebuild-2026-11-13.md) maps Hormozi's
 * Value Equation onto every page: the H1's second half is the outcome with its time
 * (dream outcome, time delay), `sub` says what the visitor no longer has to do (effort),
 * `checks` sit under every ask (risk reversal), and the rating, job count and every real
 * review are stacked on the page instead of rationed (perceived likelihood).
 */

export type LpSlug =
  | "cua-cuon-can-tho"
  | "cua-keo-can-tho"
  | "cua-nhom-kinh-can-tho"
  | "sua-cua-cuon-can-tho"
  // Sitelink pages
  | "bang-gia-cua-cuon-can-tho"
  | "cua-cuon-nhom-khe-thoang-can-tho"
  | "cua-cuon-nha-xuong-can-tho"
  | "bang-gia-cua-keo-can-tho"
  | "cua-keo-thep-can-tho"
  | "lan-can-cau-thang-kinh-can-tho"
  | "bang-gia-nhom-kinh-can-tho"
  | "sua-cua-keo-can-tho"
  | "remote-binh-luu-dien-cua-cuon-can-tho"
  | "sua-motor-cua-cuon-can-tho";

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
  /** Second half of the H1, after the keyword: the outcome, with its time where the site states one. */
  promise: string;
  description: string;
  /** One sentence under the H1: how the outcome happens, and what the visitor doesn't have to do. */
  sub: string;
  priceTeaser: string;
  /** Risk reversals, shown as ticks directly under every ask. */
  checks: string[];
  zaloLabel: string;
  hero: LpPhoto;
  promises: { title: string; lead: string; items: { title: string; body: string }[] };
  /** Proof at the moment of commitment: the rating plus this quote sit under the form. */
  proof: LpProof;
  /** The proof wall's headline: what a customer actually said, not "khách nói gì". */
  wallQuote: LpProof;
  reviews: Review[];
  /** `title` labels the job photos (the proof wall's eyebrow). */
  photos: { title: string; items: LpPhoto[] };
  prices: { title: string; lead: string; tables: LpPriceTable[]; note: string };
  /** The Zalo-number form, top of the page and again at the end. Left off the repair
   *  page: a broken door is an emergency, and an emergency calls. */
  form?: LpForm;
  /** The section the sitelink promised, rendered directly under the hero. "prices" also
   *  hides the hero photo on phones, so the table is what the first scroll shows;
   *  "photos" pulls the prices up behind the photos. Unset: the default order. */
  lead?: "prices" | "photos";
  stepsTitle: string;
  /** Three steps: past four, the job starts to look like work. */
  steps: { title: string; body: string }[];
  /** States the answer the visitor most wants, rather than "Câu hỏi khách hay hỏi". */
  faqTitle: string;
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

/** Rows of a hand-mirrored table, by label. Throws at build time if a label is gone. */
function pick(table: string[][], ...labels: string[]): string[][] {
  return labels.map((label) => {
    const row = table.find((r) => r[0] === label);
    if (!row) throw new Error(`lp-data: no row "${label}"`);
    return row;
  });
}

/** "100.000 – 300.000 đ" → "100.000đ", the low end of a repair range. */
const rangeFrom = (row: string[]) => `${row[1].split(" – ")[0]}đ`;

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
// answers that, from a real customer. (A "we won't spam you" line was not used:
// Aagaard's tests found that word lowered sign-ups even as a reassurance.)
export const INSTALL_PROOF = quote("Cương Trương Kim", "Chủ cửa hàng tư vấn thật tâm, không ép mua.");

// The ad pages' form names the time the catalog takes to arrive (the Value Equation's
// time delay: "trong 1–2 phút", from the success message the visitor sees next), where the
// site-wide INSTALL_FORM above says "ngay lập tức". Both say why the number is wanted.
const LP_FORM: LpForm = {
  title: "Ghi số Zalo, nhận báo giá trong 1–2 phút",
  submitLabel: "Nhận báo giá ngay",
};

// Risk reversal directly under every ask ("put the guarantee under the button"). Each line
// is a promise the site already makes; nothing here is new.
// One line each inside the form card on a 360px phone (34 characters at most).
const INSTALL_CHECKS = [
  "Đo, báo giá miễn phí nội thành",
  "Cọc 30%, lắp xong mới thanh toán",
  "Sai vật tư, đền 100% hợp đồng",
];
const REPAIR_CHECKS = ["Báo giá trước khi sửa", "Sửa xong mới thanh toán", "Không tính phí đi lại trong Cần Thơ"];

// Every real review, on every page: stacked proof, nothing rationed or hidden in a
// carousel. Phan Thị Hồng Nhung's stays off, as before: it repeats Cương Trương Kim's
// sentences nearly word for word, and a sharp-eyed visitor would read both as one.
const INSTALL_REVIEWS: Review[] = [review("Cương Trương Kim"), review("Nhiên Nguyễn"), review("Thắng Võ Minh"), review("Tien My Vo")];
const REPAIR_REVIEWS: Review[] = [review("Tien My Vo"), review("Thắng Võ Minh"), review("Cương Trương Kim"), review("Nhiên Nguyễn")];

// "Đúng tiến độ" is ĐÚNG HẸN in a customer's own words.
const INSTALL_WALL = quote("Cương Trương Kim", "Đúng tiến độ, dọn dẹp sạch sẽ sau khi hoàn thành");
const REPAIR_WALL = quote("Tien My Vo", "Cần sửa chữa cũng nhanh chóng");

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

// The price sitelink pages (bảng giá cửa cuốn, cửa kéo, nhôm kính). The catalog the Zalo
// bot sends (Enki/htp/catalog/catalog-htp.pdf via zalo-bot /send-catalog) carries the
// retail price tables for cửa cuốn, motor, cửa kéo, nhôm kính and lan can, so "bảng giá
// đầy đủ" is what arrives. The button is "Nhận bảng giá", not the plan's "Nhận bảng giá qua
// Zalo": the longer label squeezed the field on desktop until its placeholder was cut off,
// and the title above it already says Zalo.
const PRICE_FORM: LpForm = {
  title: "Ghi số Zalo, nhận bảng giá đầy đủ trong 1–2 phút",
  submitLabel: "Nhận bảng giá",
};

const STEP_QUOTE = {
  title: "Thợ đến đo, báo giá",
  body: "Đo tận nơi, báo giá rõ từng mục, miễn phí nội thành Cần Thơ. Đồng ý thì đặt cọc 30%.",
};

/** Step 3 of an install: made at the xưởng, fitted, and only then paid for. */
const stepPaid = (how: string) => ({
  title: "Lắp xong mới trả tiền",
  body: `${how} Chạy thử, nghiệm thu xong mới thanh toán phần còn lại.`,
});

const cuonSteps = (detail: string) => [
  stepOne(detail),
  STEP_QUOTE,
  stepPaid("Cửa cắt đúng kích thước tại xưởng Bình Thủy, lắp tại nhà khoảng 3–5 giờ."),
];

const keoSteps = (detail: string) => [
  stepOne(detail),
  STEP_QUOTE,
  stepPaid("Cửa gia công tại xưởng Bình Thủy, lắp tiêu chuẩn mất 3–5 giờ."),
];

const nkSteps = (detail: string) => [
  stepOne(detail),
  STEP_QUOTE,
  stepPaid("Gia công tại xưởng khoảng 3–5 ngày làm việc; cửa đi, cửa sổ tiêu chuẩn lắp trong 1–2 ngày."),
];

/** What every install page shares: the guarantees, the proof and the frame around the steps. */
const INSTALL = {
  promises: THREE_DUNG,
  proof: INSTALL_PROOF,
  wallQuote: INSTALL_WALL,
  reviews: INSTALL_REVIEWS,
  checks: INSTALL_CHECKS,
  stepsTitle: "3 bước, phần của anh/chị chỉ là ghi số Zalo",
  faqTitle: "Không phải trả hết tiền trước, và những câu khách hay hỏi",
};

// Repair: the promises, steps and shared FAQ of /lp/sua-cua-cuon-can-tho, used by every
// repair page (sửa cửa cuốn, sửa cửa kéo, remote & bình lưu điện, sửa motor).
const REPAIR_PROMISES = {
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
};

const REPAIR_STEPS_TITLE = "3 bước, từ cuộc gọi đến khi cửa chạy lại";
const REPAIR_STEPS = [
  { title: "Gọi hoặc nhắn Zalo", body: "Tả lỗi, gửi video cửa nếu được để kỹ thuật viên mang đúng phụ tùng." },
  { title: "Thợ đến, báo giá trước", body: "Có mặt trong ngày, kiểm tra và báo giá từng hạng mục rồi mới sửa." },
  {
    title: "Cửa chạy rồi mới trả tiền",
    body: "Mang theo phụ tùng phổ biến, phần lớn sự cố xử lý xong ngay lần đến. Cửa chạy bình thường rồi anh/chị mới thanh toán.",
  },
];

const REPAIR_PROOF = quote("Tien My Vo", "Nhân viên hỗ trợ nhiệt tình, cần sửa chữa cũng nhanh chóng.");

const REPAIR_PRICE_LEAD =
  "Giá tại Cần Thơ. Kỹ thuật viên kiểm tra và báo giá chính xác trước khi sửa — không phát sinh thêm.";
const REPAIR_PRICE_NOTE = "Không tính phí đi lại trong Cần Thơ.";

const FAQ_MOTOR_REPAIR = {
  q: "Sửa motor cửa cuốn hết bao nhiêu?",
  a: "Sửa motor từ 300.000 đến 1.500.000 đồng tùy loại motor và mức độ hỏng. Nếu phải thay motor mới (kèm remote), từ 3.300.000 đến 5.500.000 đồng theo bảng giá. Báo giá miễn phí trước khi sửa, không phát sinh thêm.",
};

const FAQ_WONT_OPEN = {
  q: "Cửa cuốn không lên được — do đâu?",
  a: "Thường do 4 nguyên nhân: (1) motor cháy hoặc kẹt — nhấn nút không phản hồi; (2) remote mất lập trình — nhấn remote đèn không nháy; (3) lò xo gãy — cửa nặng bất thường dù motor còn chạy; (4) mất điện và bình lưu điện hết. Gọi để kỹ thuật viên chẩn đoán trong ngày.",
};

const REPAIR_FAQ = [
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
];

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
  ["Thay motor mới (kèm remote)", "3.300.000 – 5.500.000 đ"],
  ["Thay bình lưu điện", "Liên hệ"],
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

// ── price tables and FAQ shared by more than one page ────────────────────────

const CUON_TABLE: LpPriceTable = {
  head: ["Loại cửa cuốn", "Giá từ (đ/m²)"],
  rows: [
    ["Tole Đài Loan (tấm liền)", formatGia(CUON.daiLoan)],
    ["Cửa cuốn công nghệ Úc", formatGia(CUON.uc)],
    ["Tole siêu trường", formatGia(CUON.sieuTruong)],
    ["Song ngang, mắc võng thép", formatGia(CUON.songNgang)],
    ["Nhôm công nghệ Đức", formatGia(CUON.nhomDuc)],
    ["Inox SUS 304", formatGia(CUON.inox)],
  ],
};

const MOTOR_FROM = Math.min(...MOTOR.map((m) => m.gia));

/** "300kg · cửa dưới 12m²", "Cửa Úc · cửa cuốn công nghệ Úc, mọi kích thước". */
const MOTOR_TABLE: LpPriceTable = {
  head: ["Motor + remote", "đ/bộ"],
  rows: MOTOR.map((m) => [
    `${m.sucNang ?? "Cửa Úc"} · ${m.dienTich.charAt(0).toLowerCase()}${m.dienTich.slice(1)}`,
    formatGia(m.gia),
  ]),
};

/** "cửa dưới 12m² dùng motor 300kg, …" — the CRM's rule, as on /phu-kien-cua-cuon-can-tho. */
const MOTOR_TIERS = MOTOR.filter((m) => m.sucNang !== null)
  .map((m) => `${m.dienTich.charAt(0).toLowerCase()}${m.dienTich.slice(1)} dùng motor ${m.sucNang}`)
  .join(", ");

const KEO_TABLE: LpPriceTable = {
  head: ["Độ dày thép", "Không lá", "Có lá"],
  rows: CUA_KEO.map((r) => [`${r.label} (${r.mm})`, cell(r.khongLa), cell(r.coLa)]),
};
const KEO_NOTE =
  "Cửa từ 5 đến dưới 8 m² cộng 20.000đ/m²; dưới 5 m² cộng 40.000đ/m². Cửa kéo nhôm và inox báo giá theo mẫu.";

const NK_TABLES: LpPriceTable[] = NHOM_KINH.map((g, i) => ({
  head: [g.group, "đ/m²"],
  rows: g.rows.map((r) => [r.mau, cell(r.gia)]),
  collapsed: i >= 2,
}));

/** Lan can rows of the catalog, named as on /bang-gia-cua-nhom-kinh-can-tho ("Tay nhôm 3D 2 × 2"). */
const LAN_CAN = (NHOM_KINH.find((g) => g.group === "Lan can cầu thang")?.rows ?? []).map((r) => [
  r.mau.replace(/\*/g, " × "),
  cell(r.gia),
]);
const LAN_CAN_TU = lowest(
  NHOM_KINH.find((g) => g.group === "Lan can cầu thang")?.rows.map((r) => r.gia) ?? [],
  "lan can cầu thang"
);

// Cửa cuốn nhôm khe thoáng: every nan in the catalog except the closed ones (OT70, AL70),
// grouped by brand. The slot type comes from NAN_SPECS (printed on the nan or the maker's page).
const KHE_THOANG = NAN_DUC.filter((n) => {
  const s = NAN_SPECS[n.code];
  if (!s) throw new Error(`lp-data: no NAN_SPECS for ${n.code}`);
  return !/kín/i.test(s.kieu);
});
const KHE_THOANG_TU = lowest(KHE_THOANG.map((n) => n.gia), "nan khe thoáng");
const KHE_THOANG_TABLES: LpPriceTable[] = ["Kovidoor", "Mitadoor", "Alumdoor", "OneDoor"].map((brand, i) => ({
  head: [`Nan ${brand}`, "đ/m²"],
  rows: KHE_THOANG.filter((n) => n.brand === brand)
    .sort((a, b) => (a.gia ?? Infinity) - (b.gia ?? Infinity))
    .map((n) => [`${n.code} · ${NAN_SPECS[n.code].kieu.toLowerCase()}`, cell(n.gia)]),
  collapsed: i > 0,
}));

const FAQ_CUON_PRICE = {
  q: "Cửa cuốn giá bao nhiêu một mét vuông?",
  a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}: tole Đài Loan từ ${perM2(CUON.daiLoan)}, nhôm công nghệ Đức từ ${perM2(CUON.nhomDuc)}, inox SUS 304 từ ${perM2(CUON.inox)}. Giá đã gồm vật tư và công lắp đặt, chưa VAT; motor và bình tích điện tính riêng. Thợ đo tận nơi và báo giá đúng kích thước, miễn phí nội thành Cần Thơ.`,
};

const FAQ_MOTOR_TIER = {
  q: "Cửa nhà tôi dùng motor loại nào?",
  a: `Tải motor chọn theo diện tích cửa, vì cửa càng rộng, càng cao thì cánh càng nặng: ${MOTOR_TIERS}. Cửa cuốn công nghệ Úc dùng motor riêng. Motor kèm remote, tính theo bộ, chưa VAT.`,
};

const FAQ_KEO_PRICE = {
  q: "Cửa kéo giá bao nhiêu?",
  a: `Cửa kéo thép tính theo m² diện tích cửa (rộng × cao): từ ${perM2(KEO_TU)} đến ${perM2(KEO_DEN)} tùy độ dày và loại có lá hay không lá, đã gồm vật tư và công lắp đặt, chưa VAT. Cửa kéo nhôm và inox báo giá theo mẫu.`,
};

const FAQ_KEO_TIME = {
  q: "Lắp cửa kéo mất bao lâu?",
  a: "Lắp đặt cửa kéo tiêu chuẩn mất 3–5 giờ. Đội kỹ thuật có mặt trong ngày tại tất cả quận, huyện Cần Thơ.",
};

const FAQ_KEO_LA = {
  q: "Cửa kéo có lá và không lá khác nhau thế nào?",
  a: "Cửa có lá có thêm lá tole phủ kín giữa các thanh U: cửa đóng là che được tầm nhìn, chặn chuột và bụi. Cửa không lá chỉ có khung U và nhíp, nên khóa cửa rồi gió và ánh sáng vẫn vào nhà; giá thấp hơn cửa có lá.",
};

const FAQ_KEO_DAY = {
  q: "Nên chọn thanh U dày bao nhiêu?",
  a: KEO_NHOM_DAY.map((b) => `${b.tieuDe}: ${b.goiY.charAt(0).toLowerCase()}${b.goiY.slice(1)}.`).join(" "),
};

const FAQ_NK_PRICE = {
  q: "Cửa nhôm kính giá bao nhiêu?",
  a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}, nhôm Việt: vách kính từ ${perM2(NK.vach)}, cửa sổ từ ${perM2(NK.so)}, cửa đi từ ${perM2(NK.di)}. Nhôm nhập và Maxpro cao hơn — xem bảng giá phía trên. Giá đã gồm công lắp đặt, cửa nhôm đã gồm kính trắng 8 ly, chưa VAT.`,
};

const FAQ_NK_VIET_NHAP = {
  q: "Nhôm Việt và nhôm nhập khác nhau thế nào?",
  a: "Nhôm nhập có bề mặt xử lý tốt hơn, ít cong vênh hơn. Nhôm Việt giá thấp hơn, hợp công trình không đòi hỏi cao. Cả hai đều có nhiều độ dày — xem bảng giá phía trên; thợ tư vấn loại hợp ngân sách khi đến đo.",
};

const FAQ_NK_TIME = {
  q: "Bao lâu thì lắp xong?",
  a: "Gia công tại xưởng khoảng 3–5 ngày làm việc sau khi chốt đơn. Cửa đi và cửa sổ tiêu chuẩn lắp trong 1–2 ngày; mặt dựng lớn hoặc lan can nhiều tầng 3–7 ngày.",
};

const FAQ_CUON_EXTRA = {
  q: "Ngoài giá theo m², còn tính thêm gì?",
  a: "Đơn giá đã gồm vật tư và công lắp đặt. Tính thêm: VAT 10%; motor, bình tích điện, khóa ngang nếu anh/chị chọn. Khảo sát, đo đạc nội thành Cần Thơ miễn phí.",
};

const FAQ_KEO_CALC = {
  q: "Giá cửa kéo tính như thế nào?",
  a: `Giá tính theo m² diện tích cửa (chiều rộng × chiều cao), đã gồm vật tư và công lắp đặt, chưa VAT 10%. ${KEO_NOTE}`,
};

const keoPrices = (title: string) => ({
  title,
  lead: `Giá theo m² diện tích cửa (rộng × cao), đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
  tables: [KEO_TABLE],
  note: `${KEO_NOTE} Dòng ghi “Liên hệ” là hàng đặt riêng.`,
});

/** "1.0mm (1 ly)" → "1 ly · 1.0mm", the order the CRM rows use. */
const doDay = (mau: string) => mau.replace(/^([\d.]+mm)\s*\((.+)\)$/, "$2 · $1");
const SIEU_TRUONG = TOLE_THEM.find((x) => x.key === "tole_sieu_truong")?.rows ?? [];
const DAI_LOAN = TAM_LIEN.find((x) => x.key === "dai_loan")?.rows ?? [];
const MOTOR_500 = MOTOR.find((m) => m.sucNang === "500kg");
if (!MOTOR_500) throw new Error("lp-data: no 500kg motor");

const REMOTE_ROWS = pick(SUA_CUON, "Sửa / lập trình lại remote", "Thay bình lưu điện");
const MOTOR_REPAIR_ROWS = pick(SUA_CUON, "Sửa motor (cuộn dây, tụ, bo mạch)", "Thay motor mới (kèm remote)");
const KEO_REPAIR_ROWS = pick(SUA_KEO, "Chỉnh / nắn ray lệch", "Thay con lăn (1 bộ)");

/** The rest of the cửa cuốn repair list, folded, under a repair page's own rows. */
const otherCuonRepairs = (shown: string[][]): LpPriceTable => ({
  head: ["Sửa cửa cuốn khác", "Giá tham khảo"],
  rows: SUA_CUON.filter((r) => !shown.includes(r)),
  collapsed: true,
});

/** What every repair page shares: one call button, the repair promises, proof and steps. */
const REPAIR = {
  promises: REPAIR_PROMISES,
  proof: REPAIR_PROOF,
  wallQuote: REPAIR_WALL,
  reviews: REPAIR_REVIEWS,
  checks: REPAIR_CHECKS,
  stepsTitle: REPAIR_STEPS_TITLE,
  steps: REPAIR_STEPS,
  faqTitle: "Sửa cả cửa không do bên em lắp, và những câu khách hay hỏi",
};

// ── the ten sitelink pages ───────────────────────────────────────────────────
// H1 = the sitelink text + its description line. First section = what the sitelink promised.

const SITELINK_PAGES: AdLandingPage[] = [
  {
    slug: "bang-gia-cua-cuon-can-tho",
    keyword: "Bảng Giá Cửa Cuốn Cần Thơ",
    promise: "Niêm Yết Theo m², Đã Gồm Công Lắp",
    description: `Giá cửa cuốn niêm yết theo m², áp dụng từ ${APPLIED_FROM}: tole Đài Loan từ ${perM2(CUON.daiLoan)}, nhôm công nghệ Đức từ ${perM2(CUON.nhomDuc)}. Đã gồm vật tư và công lắp, chưa VAT. Motor + remote tính riêng, từ ${formatGia(MOTOR_FROM)}đ/bộ.`,
    sub: "Đã gồm vật tư và công lắp, chưa VAT. Motor tính riêng theo bộ, giá ghi ngay bên dưới.",
    priceTeaser: `Từ ${perM2(CUON.daiLoan)} · motor + remote từ ${formatGia(MOTOR_FROM)}đ/bộ`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: jobImage(
      "project-01-cua-cuon-kem-so-534",
      "03.jpg",
      "Cửa cuốn kem mặt tiền",
      "Cửa cuốn màu kem lắp cho mặt tiền nhà phố"
    ),
    lead: "prices",
    ...INSTALL,
    photos: {
      title: "Cửa cuốn bên em đã lắp",
      items: [
        job("p29-shop-vang-khai-truong-28-1", "Cửa cuốn shop — ngày khai trương 28/1/2026"),
        job("p01-cc-nan-bac", "Cửa cuốn nan nhôm bạc"),
        job("p59-service-cc-xanh", "Cửa cuốn tấm liền xanh"),
        job("p31-xuong-cc-xanh", "Cửa cuốn nhà xưởng khổ lớn"),
      ],
    },
    prices: {
      title: "Bảng giá cửa cuốn",
      lead: `Giá theo m², đã gồm vật tư và công lắp đặt, chưa VAT 10%. Áp dụng từ ${APPLIED_FROM}.`,
      tables: [CUON_TABLE, MOTOR_TABLE],
      note: "Motor + remote tính theo bộ, chưa VAT. Bình tích điện và khóa ngang tính riêng. Giá đúng kích thước nhà anh/chị: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.",
    },
    form: PRICE_FORM,
    steps: cuonSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn loại cửa hợp ngân sách."),
    faq: [FAQ_CUON_PRICE, FAQ_CUON_EXTRA, FAQ_MOTOR_TIER, FAQ_DEPOSIT, FAQ_MATERIALS, FAQ_LATE, faqWarranty("cả cửa và motor")],
    closing: "Bảng giá cửa cuốn Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "cua-cuon-nhom-khe-thoang-can-tho",
    keyword: "Cửa Cuốn Nhôm Khe Thoáng Cần Thơ",
    promise: "Đóng Cửa Vẫn Thoáng Gió, Chạy Êm",
    description: `${KHE_THOANG.length} mẫu nan nhôm công nghệ Đức có khe thoáng — Kovidoor, Mitadoor, Alumdoor, OneDoor — giá từ ${perM2(KHE_THOANG_TU)}, đã gồm vật tư và công lắp. Thợ đo tận nơi, báo giá miễn phí nội thành Cần Thơ.`,
    sub: "Khe thoáng là lỗ dập trên nan nhôm công nghệ Đức. Mẫu có gioong, lông nheo giữa các nan chạy êm, bớt ồn.",
    priceTeaser: `${KHE_THOANG.length} mẫu nan khe thoáng · từ ${perM2(KHE_THOANG_TU)}`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: job("p01-cc-nan-bac", "Cửa cuốn nan nhôm khe thoáng", "Cửa cuốn nan nhôm màu bạc có khe thoáng oval"),
    lead: "photos",
    ...INSTALL,
    photos: {
      title: "Cửa cuốn khe thoáng bên em đã lắp",
      items: [
        job("p24-cc-xam-duc-lo", "Nan khe thoáng màu xám"),
        job("p28-cc-kem-duc-lo-nt", "Nan khe thoáng màu kem"),
        job("p60-garage-cc-tan", "Cửa garage — thợ đang lắp"),
        job("p02-cc-kem-tiled", "Shophouse — thợ đang lắp"),
      ],
    },
    prices: {
      title: "Giá cửa cuốn nhôm khe thoáng",
      lead: `Giá theo m² từng mẫu nan, đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
      tables: KHE_THOANG_TABLES,
      note: `Motor + remote tính riêng, từ ${formatGia(MOTOR_FROM)}đ/bộ. Giá đúng kích thước: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.`,
    },
    form: LP_FORM,
    steps: cuonSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn mẫu nan hợp ngân sách."),
    faq: [
      {
        q: "Khe thoáng, gioong, lông nheo là gì?",
        a: "Khe thoáng là lỗ dập trên nan để gió và ánh sáng vào khi cửa đóng; mẫu kín không có lỗ nên riêng tư hơn. Gioong (ron) và lông nheo là dải cao su hoặc lông nằm giữa các nan, giúp cửa chạy êm và bớt ồn; mẫu có chữ R cuối mã thường có.",
      },
      {
        q: "Nên chọn nan dày bao nhiêu?",
        a: "Nhà ở, garage: nan dày 1.0–1.5mm là đủ cho cửa đến khoảng 16m² (rộng 4m × cao 4m). Nhà sát đường lớn chọn mẫu có lông nheo hoặc gioong chống ồn. Cửa rộng trên 6m chọn nan dày, chân dày để thân cửa không võng.",
      },
      FAQ_DEPOSIT,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cả cửa và motor"),
    ],
    closing: "Cửa cuốn nhôm khe thoáng Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "cua-cuon-nha-xuong-can-tho",
    keyword: "Cửa Cuốn Nhà Xưởng Cần Thơ",
    // "Khổ 3–12m": the range /cua-cuon-nha-xuong-can-tho states.
    promise: "Khổ 3–12m, Lắp Trong 1–2 Ngày",
    description: `Cửa cuốn khổ lớn cho nhà xưởng, kho hàng, làm tại xưởng Bình Thủy từ 2005. Tole siêu trường từ ${perM2(CUON.sieuTruong)}, tole Đài Loan từ ${perM2(CUON.daiLoan)}, đã gồm vật tư và công lắp. Thợ đo tận nơi, báo giá miễn phí nội thành Cần Thơ.`,
    sub: "Cho nhà xưởng, kho hàng, garage xe tải, làm tại xưởng Bình Thủy từ 2005. Thi công ngoài giờ sản xuất nếu cần.",
    priceTeaser: `Tole siêu trường từ ${perM2(CUON.sieuTruong)} · tole Đài Loan từ ${perM2(CUON.daiLoan)}`,
    zaloLabel: "Nhắn Zalo — gửi ảnh, kích thước cửa",
    hero: job("p31-xuong-cc-xanh", "Cửa cuốn xanh nhà xưởng", "Cửa cuốn tole xanh khổ lớn lắp cho nhà xưởng"),
    lead: "photos",
    ...INSTALL,
    photos: {
      title: "Cửa cuốn nhà xưởng bên em đã lắp",
      items: [
        job("p67-xuong-cc-xanh-lon", "Hai cửa cuốn xanh khổ lớn"),
        job("p12-xuong-cc-trang-gach", "Nhà xưởng cửa cuốn trắng"),
        jobImage("p14-xuong-cc-trang-xe452", "02.jpg", "Nhà xưởng — thợ đang lắp"),
        job("p40-xuong-cc-xanh-toys", "Nhà xưởng cửa cuốn xanh"),
      ],
    },
    prices: {
      title: "Giá cửa cuốn nhà xưởng",
      lead: `Giá theo m², đã gồm vật tư và công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
      tables: [
        { head: ["Tole siêu trường", "đ/m²"], rows: SIEU_TRUONG.map((r) => [doDay(r.mau), cell(r.gia)]) },
        { head: ["Tole Đài Loan", "đ/m²"], rows: DAI_LOAN.map((r) => [`${r.label} · ${r.mm}`, cell(r.gia)]) },
        { ...MOTOR_TABLE, collapsed: true },
      ],
      note: `Tole Đài Loan 8 zem dùng cho ${TAM_LIEN_SPECS.dai_loan.goiY["8zem"].toLowerCase().replace(": ", ", hợp ")}. Motor và bình tích điện tính riêng. Giá đúng kích thước: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.`,
    },
    form: LP_FORM,
    steps: [
      stepOne("Gửi thêm ảnh và kích thước ô cửa nếu có, bên em tư vấn loại tole và motor."),
      STEP_QUOTE,
      stepPaid("Gia công tại xưởng Bình Thủy khoảng 3–5 ngày; cửa dưới 6m lắp trong 1 ngày, cửa khổ lớn 1–2 ngày."),
    ],
    faq: [
      {
        q: "Cửa cuốn nhà xưởng giá bao nhiêu?",
        a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}: tole Đài Loan từ ${perM2(CUON.daiLoan)}, tole siêu trường từ ${perM2(CUON.sieuTruong)}, đã gồm vật tư và công lắp đặt, chưa VAT. Motor + remote ${MOTOR_500.sucNang} cho ${MOTOR_500.dienTich.toLowerCase()}: ${formatGia(MOTOR_500.gia)}đ/bộ. Thợ đo tận nơi và báo giá trọn gói, miễn phí nội thành Cần Thơ.`,
      },
      FAQ_MOTOR_TIER,
      {
        q: "Mất điện thì cửa có mở được không?",
        a: `Có, nếu lắp bình tích điện: ${PHU_KIEN_DUNG_CHO.binh.charAt(0).toLowerCase()}${PHU_KIEN_DUNG_CHO.binh.slice(1)}. Bên em khuyên lắp bình cho nhà xưởng sản xuất liên tục.`,
      },
      {
        q: "Bao lâu thì lắp xong?",
        a: "Gia công tại xưởng khoảng 3–5 ngày. Cửa dưới 6m thi công 1 ngày, cửa khổ lớn 1–2 ngày. Có thể thi công ngoài giờ sản xuất theo yêu cầu.",
      },
      FAQ_DEPOSIT,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cả cửa và motor"),
    ],
    closing: "Cửa cuốn nhà xưởng Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "bang-gia-cua-keo-can-tho",
    keyword: "Bảng Giá Cửa Kéo Cần Thơ",
    // Non-breaking spaces keep the two-syllable words whole on a 360px phone.
    promise: "Đã Gồm Vật Tư Và Lắp Đặt",
    description: `Giá cửa kéo thép niêm yết theo m², từ ${perM2(KEO_TU)} đến ${perM2(KEO_DEN)}, đã gồm vật tư và công lắp đặt, chưa VAT. Báo giá rõ từng mục trước khi làm; đặt cọc 30%, lắp xong mới thanh toán.`,
    sub: "Giá theo m² diện tích cửa (rộng × cao), chưa VAT. Thợ đo tận nơi, báo giá rõ từng mục trước khi làm.",
    priceTeaser: `Từ ${perM2(KEO_TU)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: job("p23-keo-xanh-vlxd-linh", "Cửa kéo xanh mặt tiền", "Cửa kéo thép màu xanh lắp cho mặt tiền cửa hàng"),
    lead: "prices",
    ...INSTALL,
    photos: {
      title: "Cửa kéo bên em đã lắp",
      items: [
        job("p55-keo-trang-chau-cay", "Cửa kéo trắng nhà phố"),
        job("p39-shop-keo-kem-oto", "Cửa kéo kem mặt tiền shop"),
        job("p69-day-keo-xanh-xuong", "Dãy cửa kéo nhà xưởng"),
        job("p50-vinh-long-binh-minh-keo-vang", "Cửa kéo vàng — Bình Minh, Vĩnh Long"),
      ],
    },
    prices: keoPrices("Bảng giá cửa kéo thép"),
    form: PRICE_FORM,
    steps: keoSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn có lá hay không lá, độ dày nào hợp."),
    faq: [FAQ_KEO_CALC, FAQ_KEO_LA, FAQ_KEO_DAY, FAQ_KEO_TIME, FAQ_DEPOSIT, FAQ_LATE, faqWarranty("cửa kéo")],
    closing: "Bảng giá cửa kéo Cần Thơ — biết giá trước khi làm",
  },
  {
    // The sitelink says "Cửa kéo thép Đài Loan"; nothing the site shows calls its cửa kéo
    // "Đài Loan" (only a code comment in bang-gia-specs.ts), so the H1 leaves the word out.
    slug: "cua-keo-thep-can-tho",
    keyword: "Cửa Kéo Thép Cần Thơ",
    promise: "Không Cần Motor, Mất Điện Vẫn Mở",
    description: `Cửa kéo thép cho mặt tiền nhà phố và tiệm, đóng mở bằng tay, không cần motor. Giá từ ${perM2(KEO_TU)}, đã gồm vật tư và công lắp; lắp tiêu chuẩn 3–5 giờ.`,
    sub: "Đóng mở bằng tay, không motor, không mạch điện. Làm tại xưởng Bình Thủy từ 2005, lắp tiêu chuẩn 3–5 giờ.",
    priceTeaser: `Từ ${perM2(KEO_TU)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: job("p56-keo-xanh-via-he", "Cửa kéo thép mặt tiền", "Hai bộ cửa kéo thép lắp cho mặt tiền nhà phố"),
    lead: "photos",
    ...INSTALL,
    photos: {
      title: "Cửa kéo thép bên em đã lắp",
      items: [
        job("p06-shop-vang-0966653334", "Cửa kéo vàng — mặt tiền tiệm"),
        job("p54-nha-xanh-keo-xanh", "Cửa kéo xanh — nhà phố"),
        job("p66-nha-keo-xanh-soi", "Dãy cửa kéo xanh"),
        job("p57-keo-kem-cong-do", "Cửa kéo kem — thợ đang lắp"),
      ],
    },
    prices: keoPrices("Giá cửa kéo thép"),
    form: LP_FORM,
    steps: keoSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn có lá hay không lá, độ dày nào hợp."),
    faq: [
      {
        q: "Cửa kéo thép có cần motor không?",
        a: "Không. Cửa kéo thép thường vận hành bằng tay: không motor, không mạch điện, nên mất điện vẫn đóng mở bình thường.",
      },
      FAQ_KEO_PRICE,
      FAQ_KEO_LA,
      FAQ_KEO_DAY,
      FAQ_KEO_TIME,
      FAQ_DEPOSIT,
      FAQ_LATE,
      faqWarranty("cửa kéo"),
    ],
    closing: "Cửa kéo thép Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "lan-can-cau-thang-kinh-can-tho",
    keyword: "Lan Can, Cầu Thang Kính Cần Thơ",
    promise: "Kính Cường Lực, Trọn Gói 3–5 Ngày",
    description: `Lan can kính cầu thang, ban công: kính cường lực 8–12mm, gia công theo số đo thực tế, lắp trọn gói tại Cần Thơ. Từ ${formatGia(LAN_CAN_TU)}đ/m² mặt lan can. Đặt cọc 30%, lắp xong mới thanh toán.`,
    sub: "Cầu thang, ban công: kính cường lực 8–12mm, tay vịn gỗ hoặc nhôm, gia công theo số đo thực tế tại xưởng.",
    priceTeaser: `Từ ${formatGia(LAN_CAN_TU)}đ/m² mặt lan can · kính cường lực 8–12mm`,
    zaloLabel: "Nhắn Zalo — gửi ảnh cầu thang",
    hero: jobImage(
      "nk10-369-nguyen-van-cu-thang-kinh",
      "03.jpg",
      "Cầu thang kính cong — An Hòa, Ninh Kiều · 29/11/2024",
      "Cầu thang xoắn lan can kính tay vịn gỗ do Hưng Thành Phát lắp"
    ),
    lead: "photos",
    ...INSTALL,
    photos: {
      title: "Lan can kính bên em đã lắp",
      items: [
        jobImage("nk03-lan-can-cmt8-binh-thuy", "02.jpg", "Cầu thang kính — Bùi Hữu Nghĩa, Bình Thủy · 13/01/2026"),
        job("nk47-lan-can-thang-kinh", "Lan can kính cầu thang, tay vịn gỗ"),
        job("nk21-lan-can-cong-decor-vang", "Lan can kính cong"),
        job("nk36-lan-can-ban-cong-go", "Lan can kính ban công"),
      ],
    },
    prices: {
      title: "Giá lan can kính cầu thang",
      lead: `Giá theo m² mặt lan can, đã gồm công lắp đặt, chưa VAT. Áp dụng từ ${APPLIED_FROM}.`,
      tables: [{ head: ["Kiểu tay vịn", "đ/m²"], rows: LAN_CAN }],
      note: "Giá đúng kích thước: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.",
    },
    form: LP_FORM,
    steps: [
      stepOne("Gửi thêm ảnh cầu thang hoặc ban công nếu có."),
      STEP_QUOTE,
      stepPaid("Gia công 2–3 ngày theo số đo thực tế, lắp tại công trình trong 1 ngày."),
    ],
    faq: [
      {
        q: "Lan can kính giá bao nhiêu?",
        a: `Theo bảng giá áp dụng từ ${APPLIED_FROM}, lan can cầu thang tính theo m² mặt lan can: ${LAN_CAN.map(([k, v]) => `${k.charAt(0).toLowerCase()}${k.slice(1)} ${v}đ`).join("; ")}. Đã gồm công lắp đặt, chưa VAT. Thợ đo tận nơi và báo giá đúng kích thước, miễn phí nội thành Cần Thơ.`,
      },
      {
        q: "Kính lan can có an toàn không?",
        a: "Bên em dùng kính cường lực 8–12mm. Khi vỡ, kính cường lực vỡ thành hạt nhỏ, không thành mảnh sắc.",
      },
      {
        q: "Bao lâu thì làm xong?",
        a: "Thường 3–5 ngày làm việc từ khi đo đến khi lắp xong: 1 ngày khảo sát và đo, 2–3 ngày gia công tại xưởng, 1 ngày lắp tại công trình.",
      },
      {
        q: "Có làm lan can theo thiết kế riêng không?",
        a: "Có. Bên em gia công theo bản vẽ hoặc yêu cầu riêng: tay vịn đơn, có thanh đứng, kính ốp toàn phần, hoặc kết hợp nhôm và kính.",
      },
      FAQ_DEPOSIT,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("lan can kính"),
    ],
    closing: "Lan can, cầu thang kính Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "bang-gia-nhom-kinh-can-tho",
    keyword: "Bảng Giá Nhôm Kính Cần Thơ",
    promise: "Niêm Yết Theo m², Đã Gồm Công Lắp",
    description: `Giá cửa nhôm kính niêm yết theo m², áp dụng từ ${APPLIED_FROM}: vách kính từ ${perM2(NK.vach)}, cửa sổ từ ${perM2(NK.so)}, cửa đi từ ${perM2(NK.di)}. Đã gồm công lắp và kính trắng 8 ly, chưa VAT. Thợ đo và báo giá tận nơi, miễn phí nội thành Cần Thơ.`,
    sub: "Cửa nhôm đã gồm kính trắng 8 ly, chưa VAT. Thợ đo và báo giá tận nơi, miễn phí nội thành Cần Thơ.",
    priceTeaser: `Vách kính từ ${perM2(NK.vach)} · cửa sổ từ ${perM2(NK.so)}`,
    zaloLabel: "Nhắn Zalo — gửi ảnh, kích thước",
    hero: job("nk23-cua-nhom-kinh-doi-xam", "Cửa đi nhôm kính 2 cánh", "Cửa đi nhôm kính 2 cánh khung xám, tay nắm vàng"),
    lead: "prices",
    ...INSTALL,
    photos: {
      title: "Cửa nhôm kính bên em đã lắp",
      items: [
        job("nk30-cua-4-canh-kinh", "Cửa đi nhôm kính 4 cánh"),
        job("nk42-cua-so-nhom-can", "Cửa sổ nhôm kính"),
        job("nk18-shopfront-kinh-ladder", "Vách kính mặt tiền cửa hàng"),
        job("nk13-lap-cua-nha-gach", "Thợ đang lắp cửa nhôm kính"),
      ],
    },
    prices: {
      title: "Bảng giá nhôm kính",
      lead: `Giá theo m², đã gồm công lắp đặt; cửa nhôm đã gồm kính trắng 8 ly. Chưa VAT, áp dụng từ ${APPLIED_FROM}.`,
      tables: NK_TABLES,
      note: "Nhôm Việt: kính mờ cộng 70.000đ/m². Cửa nhôm kính không cộng phụ phí cửa nhỏ. Thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.",
    },
    form: PRICE_FORM,
    steps: nkSteps("Gửi thêm ảnh và kích thước ô cửa nếu có, bên em tư vấn nhôm Việt hay nhôm nhập hợp ngân sách."),
    faq: [
      FAQ_NK_PRICE,
      {
        q: "Muốn dùng loại kính khác thì tính sao?",
        a: "Giá cửa nhôm đã gồm kính trắng 8 ly. Kính mờ cộng 70.000đ/m² (nhôm Việt). Kính cường lực, kính hộp, kính phản quang báo giá riêng theo công trình.",
      },
      FAQ_NK_VIET_NHAP,
      FAQ_NK_TIME,
      FAQ_DEPOSIT,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cửa nhôm kính"),
    ],
    closing: "Bảng giá nhôm kính Cần Thơ — biết giá trước khi làm",
  },
  {
    ...REPAIR,
    lead: "prices",
    slug: "sua-cua-keo-can-tho",
    keyword: "Sửa Cửa Kéo Cần Thơ",
    promise: "Chỉnh Ray, Thay Bánh Xe Tại Chỗ",
    description:
      "Cửa kéo kẹt ray, lệch bánh xe, khóa ngang lỏng — kỹ thuật viên chỉnh ray, thay con lăn tại chỗ, thường xong trong 30–60 phút. Báo giá trước khi sửa, sửa xong mới thanh toán.",
    sub: "Kẹt ray, nặng tay, lệch bánh xe, khóa ngang không chốt được: thường xong trong 30–60 phút.",
    priceTeaser: `Chỉnh ray từ ${rangeFrom(KEO_REPAIR_ROWS[0])} · thay con lăn từ ${rangeFrom(KEO_REPAIR_ROWS[1])}`,
    zaloLabel: "Nhắn Zalo — gửi video cửa",
    hero: job("p57-keo-kem-cong-do", "Cửa kéo kem — thợ Hưng Thành Phát tại công trình", "Thợ Hưng Thành Phát bên bộ cửa kéo màu kem"),
    photos: {
      title: "Thợ và cửa kéo của Hưng Thành Phát",
      items: [
        job("p23-keo-xanh-vlxd-linh", "Cửa kéo xanh mặt tiền"),
        job("p55-keo-trang-chau-cay", "Cửa kéo trắng nhà phố"),
        job("p39-shop-keo-kem-oto", "Cửa kéo kem mặt tiền shop"),
        job("p53-keo-xanh-kinh", "Cửa kéo xanh cạnh cửa kính"),
      ],
    },
    prices: {
      title: "Giá sửa cửa kéo",
      lead: REPAIR_PRICE_LEAD,
      tables: [{ head: ["Sửa cửa kéo", "Giá tham khảo"], rows: SUA_KEO }],
      note: REPAIR_PRICE_NOTE,
    },
    faq: [
      {
        q: "Sửa cửa kéo kẹt ray mất bao lâu?",
        a: "Ray lệch hoặc con lăn kẹt thường xử lý trong 30–60 phút. Kỹ thuật viên chỉnh ray tại chỗ, thay con lăn nếu cần. Nếu phải hàn gia cố khung thì thêm 1–2 giờ tùy mức độ.",
      },
      {
        q: "Cửa kéo kẹt, nặng tay — do đâu?",
        a: "Thường do ray cong vì va đập hoặc mối hàn yếu, con lăn mòn hoặc bụi bẩn tích tụ, hoặc thanh U bị uốn cong làm cửa không đóng thẳng. Kỹ thuật viên kiểm tra và báo giá từng hạng mục trước khi sửa.",
      },
      ...REPAIR_FAQ,
    ],
    closing: "Sửa cửa kéo Cần Thơ — báo giá trước, sửa xong mới trả tiền",
  },
  {
    ...REPAIR,
    lead: "prices",
    slug: "remote-binh-luu-dien-cua-cuon-can-tho",
    keyword: "Remote, Bình Lưu Điện Cửa Cuốn Cần Thơ",
    promise: "Cài Lại Remote Tận Nhà, Thay Bình Bị Chai",
    description:
      "Remote không ăn, mất điện là cửa đứng im — bên em cài lại remote và thay bình lưu điện tận nhà, cả cửa không do bên em lắp. Báo giá trước, sửa xong mới thanh toán.",
    sub: "Remote bấm không ăn, mất điện là cửa đứng im vì bình đã chai: đến tận nhà, cả cửa không do bên em lắp.",
    priceTeaser: `Cài lại remote từ ${rangeFrom(REMOTE_ROWS[0])} · bình lưu điện báo giá theo loại`,
    zaloLabel: "Nhắn Zalo — gửi ảnh remote",
    hero: jobImage(
      "p19-cc-trang-san-da",
      "02.jpg",
      "Cửa cuốn kem lắp trong nhà",
      "Cửa cuốn màu kem lắp trong nhà, motor gắn ở đầu trục cuốn"
    ),
    photos: {
      title: "Thợ và công trình của Hưng Thành Phát",
      items: [
        job("p05-cc-kem-tuong-xam", "Thợ Hưng Thành Phát tại công trình"),
        jobImage("p20-cc-kem-dap-pha", "04.jpg", "Thợ lắp cửa cuốn mặt tiền"),
        job("p60-garage-cc-tan", "Cửa cuốn garage — thợ đang lắp"),
        job("p28-cc-kem-duc-lo-nt", "Cửa cuốn khe thoáng kem"),
      ],
    },
    prices: {
      title: "Giá cài remote, thay bình lưu điện",
      lead: REPAIR_PRICE_LEAD,
      tables: [{ head: ["Remote, bình lưu điện", "Giá tham khảo"], rows: REMOTE_ROWS }, otherCuonRepairs(REMOTE_ROWS)],
      note: REPAIR_PRICE_NOTE,
    },
    faq: [
      {
        q: "Mất remote cửa cuốn thì làm sao?",
        a: "Bên em cài mã remote mới cho phần lớn dòng motor phổ biến tại Cần Thơ. Nếu remote cũ bị mất chứ không phải hỏng, nên xóa mã cũ khi cài remote mới để người nhặt được không mở được cửa.",
      },
      {
        q: "Sao biết bình lưu điện đã chai?",
        a: "Bình còn tốt cho cửa đóng mở được nhiều lượt khi cúp điện (thường 5–10 lần, tùy dung lượng bình). Bình đã chai thường chỉ còn một hai lượt, hoặc mất điện là cửa đứng im — đó là lúc cần thay.",
      },
      FAQ_WONT_OPEN,
      ...REPAIR_FAQ,
    ],
    closing: "Remote, bình lưu điện cửa cuốn Cần Thơ — báo giá trước khi làm",
  },
  {
    ...REPAIR,
    lead: "prices",
    slug: "sua-motor-cua-cuon-can-tho",
    keyword: "Sửa Motor Cửa Cuốn Cần Thơ",
    promise: "Thợ Đến Trong Ngày, Báo Giá Trước",
    description:
      "Motor cháy, yếu, kêu to hoặc cửa chạy khựng — kỹ thuật viên đến tận nơi trong ngày, kiểm tra cuộn dây, tụ, bo mạch và báo giá trước khi sửa. Sửa xong mới thanh toán.",
    sub: "Motor cháy, nóng, kêu to, cửa chạy chậm hoặc khựng: kiểm tra cuộn dây, tụ điện, bo mạch ngay tại chỗ.",
    priceTeaser: `Sửa motor từ ${rangeFrom(MOTOR_REPAIR_ROWS[0])} · thay motor mới từ ${rangeFrom(MOTOR_REPAIR_ROWS[1])}`,
    zaloLabel: "Nhắn Zalo — gửi video cửa",
    hero: jobImage(
      "p19-cc-trang-san-da",
      "03.jpg",
      "Thợ Hưng Thành Phát hoàn thiện cửa cuốn",
      "Hai thợ Hưng Thành Phát trên thang, hoàn thiện cửa cuốn màu kem trong nhà"
    ),
    photos: {
      title: "Thợ và công trình của Hưng Thành Phát",
      items: [
        job("p05-cc-kem-tuong-xam", "Thợ Hưng Thành Phát tại công trình"),
        jobImage("p20-cc-kem-dap-pha", "04.jpg", "Thợ lắp cửa cuốn mặt tiền"),
        jobImage("p14-xuong-cc-trang-xe452", "02.jpg", "Nhà xưởng — thợ đang lắp"),
        job("p01-cc-nan-bac", "Cửa cuốn nan nhôm bạc"),
      ],
    },
    prices: {
      title: "Giá sửa, thay motor cửa cuốn",
      lead: REPAIR_PRICE_LEAD,
      tables: [{ head: ["Sửa, thay motor", "Giá tham khảo"], rows: MOTOR_REPAIR_ROWS }, otherCuonRepairs(MOTOR_REPAIR_ROWS)],
      note: REPAIR_PRICE_NOTE,
    },
    faq: [
      FAQ_MOTOR_REPAIR,
      {
        q: "Motor kêu to, nóng, cửa chạy chậm — do đâu?",
        a: "Thường do motor thiếu tải so với cánh cửa (chạy nóng, mòn nhông, hỏng sớm), hoặc lò xo cân bằng đã yếu làm cửa nặng bất thường, motor quá tải. Kỹ thuật viên kiểm tra cuộn dây, tụ điện, bo mạch và báo giá trước khi sửa.",
      },
      FAQ_WONT_OPEN,
      ...REPAIR_FAQ,
    ],
    closing: "Sửa motor cửa cuốn Cần Thơ — báo giá trước khi sửa",
  },
];

// ── the pages ────────────────────────────────────────────────────────────────

export const AD_LANDING_PAGES: AdLandingPage[] = [
  {
    slug: "cua-cuon-can-tho",
    keyword: "Cửa Cuốn Cần Thơ",
    //  : the outcome breaks at the comma on a 360px phone, never inside "Lắp Tại Nhà".
    promise: "Biết Giá Trước, Lắp Tại Nhà 3–5 Giờ",
    description: `Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ, từ 2005. Giá niêm yết từ ${perM2(CUON.daiLoan)}, báo giá rõ từng mục trước khi làm. Đặt cọc 30%, lắp xong mới thanh toán.`,
    sub: "Đơn vị đầu tiên làm cửa cuốn tại Cần Thơ, từ 2005. Cửa cắt tại xưởng Bình Thủy, nên giá báo trước là giá chốt.",
    priceTeaser: `Giá niêm yết từ ${perM2(CUON.daiLoan)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    // 1108×1477 and sharp; the old p07 cover was soft at hero size (Hughie, 12/11/2026).
    hero: jobImage(
      "project-01-cua-cuon-kem-so-534",
      "03.jpg",
      "Cửa cuốn kem mặt tiền",
      "Cửa cuốn màu kem lắp cho mặt tiền nhà phố"
    ),
    ...INSTALL,
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
      tables: [CUON_TABLE],
      note: "Motor và bình tích điện tính riêng. Giá đúng kích thước nhà anh/chị: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.",
    },
    form: LP_FORM,
    steps: cuonSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn loại cửa hợp ngân sách."),
    faq: [
      FAQ_CUON_PRICE,
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
    promise: "Biết Giá Trước, Lắp Tại Nhà 3–5 Giờ",
    description: `Cửa kéo thép, nhôm, inox làm tại xưởng Bình Thủy từ 2005. Giá niêm yết từ ${perM2(KEO_TU)}, lắp tiêu chuẩn 3–5 giờ. Đặt cọc 30%, lắp xong mới thanh toán.`,
    sub: "Cửa kéo thép, nhôm, inox làm tại xưởng Bình Thủy từ 2005, nên giá báo trước là giá chốt.",
    priceTeaser: `Giá niêm yết từ ${perM2(KEO_TU)} — đã gồm vật tư và công lắp`,
    zaloLabel: "Nhắn Zalo — gửi ảnh mặt tiền",
    hero: job("p23-keo-xanh-vlxd-linh", "Cửa kéo xanh mặt tiền", "Cửa kéo thép màu xanh lắp cho mặt tiền cửa hàng"),
    ...INSTALL,
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
      tables: [KEO_TABLE],
      note: KEO_NOTE,
    },
    form: LP_FORM,
    steps: keoSteps("Gửi thêm ảnh mặt tiền nếu có, bên em tư vấn thép, nhôm hay inox hợp ngân sách."),
    faq: [
      FAQ_KEO_PRICE,
      FAQ_DEPOSIT,
      {
        q: "Cửa kéo thép hay cửa kéo nhôm?",
        a: "Cửa kéo nhôm nhẹ hơn, không gỉ sét nhưng giá cao hơn 20–30%. Cửa kéo thép bền hơn về cơ học, giá thấp hơn, phụ kiện phổ biến dễ thay. Cả hai đều hợp mặt tiền kinh doanh.",
      },
      FAQ_KEO_TIME,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cửa kéo"),
    ],
    closing: "Cửa kéo Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "cua-nhom-kinh-can-tho",
    keyword: "Cửa Nhôm Kính Cần Thơ",
    promise: "Biết Giá Trước, Lắp Trong 1–2 Ngày",
    description: `Cửa đi, cửa sổ, vách kính, lan can — đo tận nơi, gia công tại xưởng Bình Thủy. Vách kính từ ${perM2(NK.vach)}, cửa sổ từ ${perM2(NK.so)}. Đặt cọc 30%, lắp xong mới thanh toán.`,
    sub: "Cửa đi, cửa sổ, vách kính, lan can: đo tận nơi, gia công tại xưởng Bình Thủy, nên giá báo trước là giá chốt.",
    priceTeaser: `Vách kính từ ${perM2(NK.vach)} · cửa sổ từ ${perM2(NK.so)}`,
    zaloLabel: "Nhắn Zalo — gửi ảnh, kích thước",
    hero: job("nk23-cua-nhom-kinh-doi-xam", "Cửa đi nhôm kính 2 cánh", "Cửa đi nhôm kính 2 cánh khung xám, tay nắm vàng"),
    ...INSTALL,
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
      tables: NK_TABLES,
      note: "Giá đúng kích thước nhà anh/chị: thợ đo tận nơi và báo giá miễn phí nội thành Cần Thơ.",
    },
    form: LP_FORM,
    steps: nkSteps("Gửi thêm ảnh và kích thước ô cửa nếu có, bên em tư vấn nhôm Việt hay nhôm nhập hợp ngân sách."),
    faq: [
      FAQ_NK_PRICE,
      FAQ_DEPOSIT,
      FAQ_NK_VIET_NHAP,
      FAQ_NK_TIME,
      FAQ_MATERIALS,
      FAQ_LATE,
      faqWarranty("cửa nhôm kính"),
    ],
    closing: "Cửa nhôm kính Cần Thơ — biết giá trước khi làm",
  },
  {
    slug: "sua-cua-cuon-can-tho",
    keyword: "Sửa Cửa Cuốn Cần Thơ",
    promise: "Có Mặt Trong Ngày, Báo Giá Trước",
    description:
      "Motor cháy, cửa kẹt, remote không ăn — kỹ thuật viên có mặt trong ngày, báo giá trước khi sửa, sửa xong mới thanh toán. Không tính phí đi lại trong Cần Thơ.",
    sub: "Motor cháy, cửa kẹt giữa chừng, remote không ăn, lò xo yếu: sửa tại chỗ, cả cửa không do bên em lắp.",
    priceTeaser: `Sửa remote từ ${SUA_CUON[0][1].split(" – ")[0]}đ · sửa motor từ ${SUA_CUON[3][1].split(" – ")[0]}đ`,
    zaloLabel: "Nhắn Zalo — gửi video cửa đang lỗi",
    hero: job("p19-cc-trang-san-da", "Cửa cuốn trắng — thợ đang hoàn thiện", "Thợ đứng thang hoàn thiện cửa cuốn trắng trong nhà"),
    ...REPAIR,
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
      lead: REPAIR_PRICE_LEAD,
      tables: [
        { head: ["Sửa cửa cuốn", "Giá tham khảo"], rows: SUA_CUON },
        { head: ["Sửa cửa kéo", "Giá tham khảo"], rows: SUA_KEO, collapsed: true },
        { head: ["Sửa cửa nhôm kính", "Giá tham khảo"], rows: SUA_NHOM_KINH, collapsed: true },
      ],
      note: REPAIR_PRICE_NOTE,
    },
    // No form: someone whose door is stuck calls. The page is one big call button.
    faq: [FAQ_MOTOR_REPAIR, FAQ_WONT_OPEN, ...REPAIR_FAQ],
    closing: "Cửa hỏng không chờ được — gọi ngay",
  },
  ...SITELINK_PAGES,
];

export function getAdLanding(slug: string): AdLandingPage | undefined {
  return AD_LANDING_PAGES.find((p) => p.slug === slug);
}
