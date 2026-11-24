import type { GalleryItem } from "@/components/ProductGallery";

/*
 * The cửa nhôm kính design grid on /cua-nhom-kinh-can-tho (Hughie, 24/11/2026): the 13 designs
 * on his old site's "Cửa nhôm kính" page, hungthanhphatdoor.com/cua-nhom-kinh, one card each, in
 * that page's order (newest first) with its names. A design is a kind of door or window, not a
 * job, so no công trình photos go in this grid (they live under /cong-trinh) and no lan can,
 * which has its own page. His first version mixed in 27 job photos and he sent the old page's
 * layout back as the example.
 *
 * x01–x12 are the old Xingfa photos at 1000px; x13 is the Slim photo, the one real job photo
 * the old page used for a design. The originals are archived in
 * Enki/htp/old-site/hungthanhphatdoor-2026-11-24.
 */

const design = (file: string, label: string): GalleryItem => ({ src: `/thu-vien-nhom-kinh/${file}.jpg`, label });

export const NK_GALLERY: GalleryItem[] = [
  design("x13", "Cửa nhôm hệ Slim"),
  design("x01", "Cửa đi mở trượt nhôm Xingfa"),
  design("x02", "Cửa xếp trượt nhôm Xingfa"),
  design("x03", "Cửa đi mở quay nhôm Xingfa 4 cánh"),
  design("x04", "Vách kính cố định nhôm Xingfa"),
  design("x05", "Cửa đi mở quay nhôm Xingfa 2 cánh"),
  design("x06", "Cửa đi mở quay nhôm Xingfa 1 cánh"),
  design("x07", "Cửa sổ nhôm Xingfa mở trượt 2 cánh"),
  design("x08", "Cửa sổ nhôm Xingfa mở quay 4 cánh"),
  design("x09", "Cửa sổ nhôm Xingfa mở quay 2 cánh"),
  design("x10", "Cửa sổ nhôm Xingfa mở quay 1 cánh"),
  design("x11", "Cửa sổ nhôm Xingfa mở hất 2 cánh"),
  design("x12", "Cửa sổ nhôm Xingfa mở hất 1 cánh"),
];
