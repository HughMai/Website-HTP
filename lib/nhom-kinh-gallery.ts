import type { GalleryItem } from "@/components/ProductGallery";

/*
 * The old site's glass catalog (hungthanhphatdoor.com, Hughie, 24/11/2026), one card per
 * product, in each old category page's order (newest first). The originals and the old lists
 * are archived in Enki/htp/old-site/hungthanhphatdoor-2026-11-24.
 *
 * Names are the old names, cleaned (Hughie: "keep mục sản phẩm clean, no need added words"):
 * the SEO add-ons are gone ("Thi công … tại Cái Răng", "Cần Thơ", district names nobody
 * checked, several on stock photos), and so are "hiện đại" and "cao cấp". Same-named cards are
 * the same product photographed twice; the lead carries the photo path, so the family still
 * knows which one.
 *
 * NK_GALLERY is the cửa nhôm kính design grid on /cua-nhom-kinh-can-tho: the 13 designs of the
 * old Cửa nhôm kính page (x01–x12 the Xingfa photos, x13 the Slim one, the only real job photo
 * there). His first version mixed in 27 job photos; he sent the old page's layout back as the
 * example. SAN_PHAM_KINH is all six old glass lines, for /san-pham.
 */

const photo = (file: string, label: string): GalleryItem => ({ src: `/thu-vien-nhom-kinh/${file}.jpg`, label });

export const NK_GALLERY: GalleryItem[] = [
  photo("x13", "Cửa nhôm hệ Slim"),
  photo("x01", "Cửa đi mở trượt nhôm Xingfa"),
  photo("x02", "Cửa xếp trượt nhôm Xingfa"),
  photo("x03", "Cửa đi mở quay nhôm Xingfa 4 cánh"),
  photo("x04", "Vách kính cố định nhôm Xingfa"),
  photo("x05", "Cửa đi mở quay nhôm Xingfa 2 cánh"),
  photo("x06", "Cửa đi mở quay nhôm Xingfa 1 cánh"),
  photo("x07", "Cửa sổ nhôm Xingfa mở trượt 2 cánh"),
  photo("x08", "Cửa sổ nhôm Xingfa mở quay 4 cánh"),
  photo("x09", "Cửa sổ nhôm Xingfa mở quay 2 cánh"),
  photo("x10", "Cửa sổ nhôm Xingfa mở quay 1 cánh"),
  photo("x11", "Cửa sổ nhôm Xingfa mở hất 2 cánh"),
  photo("x12", "Cửa sổ nhôm Xingfa mở hất 1 cánh"),
];

const TU_BEP = "Tủ bếp nhôm cánh kính";
const CAU_THANG = "Cầu thang kính cường lực";
const VACH_VP = "Vách kính văn phòng";

/** One block per old category page. `id` matches PRODUCT_CATEGORIES where the line has one. */
export const SAN_PHAM_KINH: { id: string; name: string; items: GalleryItem[] }[] = [
  { id: "cua-nhom-kinh", name: "Cửa Nhôm Kính", items: NK_GALLERY },
  {
    id: "tu-nhom-canh-kinh",
    name: "Tủ Nhôm Cánh Kính",
    items: [
      photo("tu01", TU_BEP),
      photo("tu02", "Nhôm kính nội thất tối giản"),
      photo("tu03", "Tủ bếp nhôm kính"),
      photo("tu04", "Tủ bếp nhôm kính"),
      photo("tu05", TU_BEP),
      photo("tu06", TU_BEP),
      photo("tu07", "Tủ nhôm nội thất"),
      photo("tu08", "Tủ kính"),
      photo("tu09", "Tủ nhôm kính chống bụi"),
      photo("tu10", "Tủ nhôm kính đựng đồ"),
      photo("tu11", "Tủ nhôm kính phòng khách"),
      photo("tu12", "Tủ trưng bày nhôm kính"),
      photo("tu13", "Tủ kính nhà bếp"),
      photo("tu14", "Tủ nhôm kính gia đình"),
      photo("tu15", "Tủ kính cường lực"),
      photo("tu16", "Tủ nhôm kính"),
      photo("tu17", TU_BEP),
    ],
  },
  {
    id: "lan-can-cau-thang",
    name: "Lan Can – Cầu Thang Kính",
    items: Array.from({ length: 12 }, (_, i) => photo(`lc${String(i + 1).padStart(2, "0")}`, CAU_THANG)),
  },
  {
    id: "vach-kinh-cuong-luc",
    name: "Vách Kính Cường Lực",
    items: [
      photo("vk01", "Vách kính cường lực"),
      ...["vk02", "vk03", "vk04", "vk05", "vk06"].map((f) => photo(f, VACH_VP)),
    ],
  },
  {
    id: "cua-kinh-cuong-luc",
    name: "Cửa Kính Cường Lực",
    items: [
      photo("ck01", "Cửa kính cường lực 2 cánh"),
      photo("ck02", "Cửa kính cường lực 3 cánh cùng lùa"),
      photo("ck03", "Cửa kính cường lực 10 ly mở 1 cánh"),
      photo("ck04", "Cửa kính cường lực 1 cánh mở trượt"),
      photo("ck05", "Cửa kính cường lực mở 2 cánh 10 ly"),
      photo("ck06", "Cửa kính cường lực 2 cánh lùa"),
    ],
  },
  {
    id: "phong-tam-kinh",
    name: "Phòng Tắm Kính",
    items: [
      photo("pt01", "Phòng tắm kính Gymek"),
      photo("pt02", "Phòng tắm kính Gymek mở quay 90 độ, bản lề kính – tường"),
      photo("pt03", "Phòng tắm kính Fendi FIU-1X4 góc vuông inox bóng"),
      photo("pt04", "Phòng tắm kính kim cương lùa 135 độ"),
      photo("pt05", "Phòng tắm kính cánh mở trượt 90 độ"),
      photo("pt06", "Phòng tắm kính cường lực cửa lùa"),
      photo("pt07", "Phòng tắm kính cường lực cửa quay 90 độ"),
    ],
  },
];
