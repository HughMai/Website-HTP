import { getCongTrinh } from "./cong-trinh-data";
import type { GalleryItem } from "@/components/ProductGallery";

/*
 * The cửa nhôm kính gallery on /cua-nhom-kinh-can-tho (Hughie, 24/11/2026). The layout is the
 * gallery blueprint he chose: filter pills by where the door goes, a short code on every photo,
 * and "hỏi giá mẫu này" in the lightbox, so the lead names the door. The content is his old
 * site's two pages, hungthanhphatdoor.com/cua-nhom-xingfa and /lan-can-cau-thang-kinh (the
 * originals are archived in Enki/htp/old-site/hungthanhphatdoor-2026-11-24), plus HTP's own jobs.
 *
 * Three sources, labelled so a catalog photo never passes for a job:
 *  - X01–X12, badge "Mẫu": the old Xingfa page's product photos, in its order. Catalog shots of
 *    each door type, not HTP jobs.
 *  - NKxx / Pxx, badge "Công trình thật": HTP jobs from the công trình library; the code is the
 *    library folder's prefix. Place and date only where the job's Timemark stamp shows them.
 *  - LC01–LC12, badge "Công trình thật": the old lan can page's staircases, real HTP jobs. Their
 *    old titles added district names for SEO that nobody has confirmed, so the captions say
 *    only what the photo shows.
 * Server only (it reads the 95KB công trình library); the page passes the plain array down.
 */

export const NK_FILTERS = [
  "Cửa đi 4 cánh",
  "Cửa đi 1–2 cánh",
  "Cửa lùa, cửa xếp",
  "Cửa sổ",
  "Vách kính, mặt tiền",
  "Lan can, cầu thang kính",
] as const;
type Kind = (typeof NK_FILTERS)[number];

const DIR = "/thu-vien-nhom-kinh";

/** One of the old Xingfa page's product photos (x01.jpg … x12.jpg, in that page's order). */
const mau = (n: number, kind: Kind, label: string): GalleryItem => ({
  src: `${DIR}/x${String(n).padStart(2, "0")}.jpg`,
  code: `X${String(n).padStart(2, "0")}`,
  label,
  kind,
  badge: "mau",
  chips: ["Nhôm hệ Xingfa"],
});

/** One of the old lan can page's staircases (lc01.jpg … lc12.jpg). */
const lanCan = (n: number, label: string, chips: string[]): GalleryItem => ({
  src: `${DIR}/lc${String(n).padStart(2, "0")}.jpg`,
  code: `LC${String(n).padStart(2, "0")}`,
  label,
  kind: "Lan can, cầu thang kính",
  badge: "cong-trinh",
  chips,
});

/** A photo from the công trình library. Throws at build time if the folder or file is gone. */
function job(slug: string, file: string, kind: Kind, label: string, extra: Partial<GalleryItem> = {}): GalleryItem {
  const p = getCongTrinh(slug);
  const src = `/cong-trinh/${slug}/${file}`;
  if (!p?.images.includes(src)) throw new Error(`nhom-kinh-gallery: no photo ${src}`);
  return { src, code: slug.split("-")[0].toUpperCase(), label, kind, badge: "cong-trinh", href: `/cong-trinh/${slug}`, ...extra };
}

export const NK_GALLERY: GalleryItem[] = [
  // Cửa đi 4 cánh: the front door, the costliest job, first.
  job("nk06-duong-1b-cai-rang", "01.jpg", "Cửa đi 4 cánh", "Cửa đi 4 cánh ra ban công", {
    place: "Hưng Thạnh, Cái Răng · 28/10/2025",
  }),
  job("nk04-nhom-gia-go-hau-giang", "01.jpg", "Cửa đi 4 cánh", "Cửa đi 4 cánh nhôm vân gỗ", {
    place: "Châu Thành A, Hậu Giang · 06/01/2026",
    chips: ["Vân gỗ"],
  }),
  mau(3, "Cửa đi 4 cánh", "Cửa đi mở quay 4 cánh"),
  job("nk30-cua-4-canh-kinh", "01.jpg", "Cửa đi 4 cánh", "Cửa chính 4 cánh, kính hoa văn", { chips: ["Kính hoa văn"] }),
  job("nk34-cua-kinh-hoa-van-den", "02.jpg", "Cửa đi 4 cánh", "Cửa 4 cánh khung đen, kính hoa văn", {
    chips: ["Kính hoa văn"],
  }),
  job("nk38-cua-nhom-4-canh-xam", "01.jpg", "Cửa đi 4 cánh", "Cửa đi 4 cánh khung xám"),
  job("nk35-cua-nhom-lua-hoa-van", "02.jpg", "Cửa đi 4 cánh", "Cửa 4 cánh khung trắng, kính hoa văn", {
    chips: ["Kính hoa văn"],
  }),
  // Cửa đi 1–2 cánh
  job("nk23-cua-nhom-kinh-doi-xam", "01.jpg", "Cửa đi 1–2 cánh", "Cửa đi 2 cánh, tay nắm dài"),
  job("nk05-nguyen-thi-tao-binh-thuy", "02.jpg", "Cửa đi 1–2 cánh", "Cửa đi 2 cánh, lúc đang lắp", {
    place: "Long Hòa, Bình Thủy · 28/10/2025",
  }),
  mau(5, "Cửa đi 1–2 cánh", "Cửa đi mở quay 2 cánh"),
  mau(6, "Cửa đi 1–2 cánh", "Cửa đi mở quay 1 cánh"),
  // Cửa lùa, cửa xếp
  mau(1, "Cửa lùa, cửa xếp", "Cửa đi mở trượt"),
  mau(2, "Cửa lùa, cửa xếp", "Cửa xếp trượt"),
  // Cửa sổ
  job("nk42-cua-so-nhom-can", "01.jpg", "Cửa sổ", "Cửa sổ kính hoa văn", { chips: ["Kính hoa văn"] }),
  job("nk22-dinh-hoi-truong-vang", "05.jpg", "Cửa sổ", "Cửa sổ nhôm vân gỗ, hội trường", { chips: ["Vân gỗ"] }),
  mau(7, "Cửa sổ", "Cửa sổ mở trượt 2 cánh"),
  mau(8, "Cửa sổ", "Cửa sổ mở quay 4 cánh"),
  mau(9, "Cửa sổ", "Cửa sổ mở quay 2 cánh"),
  mau(10, "Cửa sổ", "Cửa sổ mở quay 1 cánh"),
  mau(11, "Cửa sổ", "Cửa sổ mở hất 2 cánh"),
  mau(12, "Cửa sổ", "Cửa sổ mở hất 1 cánh"),
  // Vách kính, mặt tiền
  job("nk46-shopfront-kinh-lau", "01.jpg", "Vách kính, mặt tiền", "Cửa kính cường lực, tay nắm dài"),
  job("p26-shop-kinh-cai-tao", "01.jpg", "Vách kính, mặt tiền", "Mặt tiền kính cửa hàng"),
  job("nk27-nha-kinh-be-nuoc", "01.jpg", "Vách kính, mặt tiền", "Mặt tiền kính nhà phố 3 tầng"),
  mau(4, "Vách kính, mặt tiền", "Vách kính cố định"),
  // Lan can, cầu thang kính: the two with a place and date first, then the old page's twelve.
  job("nk10-369-nguyen-van-cu-thang-kinh", "03.jpg", "Lan can, cầu thang kính", "Cầu thang kính cong, tay vịn gỗ", {
    place: "An Hòa, Ninh Kiều · 29/11/2024",
  }),
  job("nk03-lan-can-cmt8-binh-thuy", "02.jpg", "Lan can, cầu thang kính", "Cầu thang kính, tay vịn gỗ", {
    place: "Bùi Hữu Nghĩa, Bình Thủy · 13/01/2026",
  }),
  lanCan(1, "Cầu thang kính, tay vịn gỗ", ["Kính cường lực", "Tay vịn gỗ"]),
  lanCan(2, "Lan can kính, nẹp đen", ["Kính cường lực"]),
  lanCan(3, "Lan can kính trụ inox, tay vịn gỗ", ["Kính cường lực", "Trụ inox"]),
  lanCan(4, "Kính kẹp trụ inox, tay vịn gỗ", ["Kính cường lực", "Trụ inox"]),
  lanCan(5, "Cầu thang xoắn, kính cong", ["Kính cường lực", "Tay vịn gỗ"]),
  lanCan(6, "Kính cong, tay vịn gỗ uốn", ["Kính cường lực", "Tay vịn gỗ"]),
  lanCan(7, "Cầu thang kính cong, tay vịn gỗ", ["Kính cường lực", "Tay vịn gỗ"]),
  lanCan(8, "Trụ inox, tay vịn gỗ", ["Kính cường lực", "Trụ inox"]),
  lanCan(9, "Cầu thang kính thẳng, tay vịn gỗ", ["Kính cường lực", "Tay vịn gỗ"]),
  lanCan(10, "Đang lắp kính cầu thang", ["Kính cường lực"]),
  lanCan(11, "Thi công lan can kính", ["Kính cường lực"]),
  lanCan(12, "Cầu thang kính, tay vịn gỗ", ["Kính cường lực", "Tay vịn gỗ"]),
];

// Codes are what the customer says on the phone, so two photos must never share one.
const codes = NK_GALLERY.map((i) => i.code);
if (new Set(codes).size !== codes.length) throw new Error("nhom-kinh-gallery: duplicate code");
