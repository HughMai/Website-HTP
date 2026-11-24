import type { GalleryItem } from "@/components/ProductGallery";
import { NAN_DUC } from "./bang-gia-data";

/*
 * The product grids of /cua-cuon-can-tho and /cua-keo-can-tho (Hughie, 24/11/2026): his old
 * site's category pages, hungthanhphatdoor.com/cua-cuon (pages 1–3) and /cua-keo, one card per
 * product in the old order. Cửa cuốn then adds the catalog's nan Đức with their real sample
 * photos. The catalog's other cửa cuốn lines only have AI pictures, and those never go on a
 * product page (htp/catalog/README.md).
 *
 * Originals and the old lists are archived in Enki/htp/old-site/hungthanhphatdoor-2026-11-24
 * (list-cua-cuon.tsv, list-cua-keo.tsv); the photo files keep the old slugs. Names are the old
 * names cleaned like the nhôm kính grid: sentence case, without "bền đẹp", "của" and "đa dạng
 * về màu sắc". The two "Cửa kéo inox Mitadoor" cards are two old products with two photos.
 */

const cuon = (slug: string, label: string): GalleryItem => ({ src: `/thu-vien-cua-cuon/${slug}.jpg`, label });
const keo = (slug: string, label: string): GalleryItem => ({ src: `/thu-vien-cua-keo/${slug}.jpg`, label });

const TAM_LIEN_UC = "Cửa cuốn tấm liền công nghệ Úc Titadoor";

export const CUA_CUON_GALLERY: GalleryItem[] = [
  cuon("cua-cuon-song-ngang-tinh-dien", "Cửa cuốn song ngang tĩnh điện"),
  cuon("cua-cuon-inox-luoi-mac-vong", "Cửa cuốn inox lưới mắc võng"),
  cuon("cua-cuon-son-tinh-dien-luoi-mac-vong", "Cửa cuốn sơn tĩnh điện lưới mắc võng"),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-vn", `${TAM_LIEN_UC} VN`),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-ap", `${TAM_LIEN_UC} AP`),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-cb", `${TAM_LIEN_UC} CB`),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-qn220vac", `${TAM_LIEN_UC} QN220VAC`),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-al-6063", `${TAM_LIEN_UC} AL 6063`),
  cuon("cua-cuon-tam-lien-cong-nghe-uc-titadoor-polycacbonate", `${TAM_LIEN_UC} Polycarbonate`),
  cuon("cua-cuon-titadoor-pm-2029s", "Cửa cuốn Titadoor PM 2029S"),
  cuon("cua-cuon-titadoor-pm-2059-sr", "Cửa cuốn Titadoor PM 2059 SR"),
  cuon("cua-cuon-titadoor-pm1060s", "Cửa cuốn Titadoor PM1060S"),
  cuon("cua-cuon-titadoor-pm79s", "Cửa cuốn Titadoor PM79S"),
  cuon("cua-cuon-titadoor-pm52sr", "Cửa cuốn Titadoor PM52SR"),
  cuon("cua-cuon-titadoor-pm-50sr", "Cửa cuốn Titadoor PM-50SR"),
  cuon("cua-cuon-titadoor-pm-50s", "Cửa cuốn Titadoor PM-50S"),
  cuon("cua-cuon-titadoor-pm-49s", "Cửa cuốn Titadoor PM-49S"),
  cuon("cua-cuon-titadoor-pm600se", "Cửa cuốn Titadoor PM600SE"),
  cuon("cua-cuon-titadoor-pm1020s", "Cửa cuốn Titadoor PM1020S"),
  cuon("cua-cuon-titadoor-pm-525s", "Cửa cuốn Titadoor PM 525S"),
  cuon("cua-cuon-titadoor-pm482", "Cửa cuốn Titadoor PM482"),
  cuon("cua-cuon-titadoor-pm-481sr", "Cửa cuốn Titadoor PM 481SR"),
  cuon("cua-cuon-titadoor-pm503", "Cửa cuốn Titadoor PM503"),
  cuon("cua-cuon-titadoor-pm-2014sr", "Cửa cuốn Titadoor PM 2014SR"),
  cuon("cua-cuon-titadoor-lg-15", "Cửa cuốn Titadoor LG 15"),
  cuon("cua-cuon-titadoor-lg-12", "Cửa cuốn Titadoor LG 12"),
  cuon("cua-cuon-titadoor-pm492", "Cửa cuốn Titadoor PM492"),
  cuon("cua-cuon-duc-titadoor-pm492a", "Cửa cuốn Đức Titadoor PM492A"),
  cuon("cua-cuon-duc-titadoor-pm535sr", "Cửa cuốn Đức Titadoor PM535SR"),
  cuon("cua-cuon-titadoor-pm71sr", "Cửa cuốn Titadoor PM71SR"),
  cuon("cua-cuon-duc-titadoor-pm76x", "Cửa cuốn Đức Titadoor PM76x"),
  cuon("cua-cuon-duc-khe-thoang-titadoor-pm52a", "Cửa cuốn Đức khe thoáng Titadoor PM52A"),
  cuon("cua-cuon-duc-khe-thoang-titadoor-pm55sr", "Cửa cuốn Đức khe thoáng Titadoor PM55SR"),
  cuon("cua-cuon-duc-titadoor-pm2049sr", "Cửa cuốn Đức Titadoor PM2049SR"),
  cuon("cua-cuon-duc-khe-thoang-titadoor-pm2022s", "Cửa cuốn Đức khe thoáng Titadoor PM2022S"),
  cuon("cua-cuon-duc-khe-thoang-titadoor-pm2095i", "Cửa cuốn Đức khe thoáng Titadoor PM2095i"),
  // The catalog's angled sample photo (export_web.py), cut out on white, so shown whole.
  ...NAN_DUC.flatMap((n) => (n.goc ? [{ src: n.goc, label: `Cửa cuốn Đức ${n.brand} ${n.code}`, contain: true }] : [])),
];

export const CUA_KEO_GALLERY: GalleryItem[] = [
  keo("cua-keo-thep-mitadoor-son-tinh-dien-cong-nghe-duc-mau-cafe-chay", "Cửa kéo thép Mitadoor sơn tĩnh điện công nghệ Đức, màu café cháy"),
  keo("cua-keo-mitadoor-thep-son-tinh-dien-cong-nghe-duc-mau-ghi-san", "Cửa kéo thép Mitadoor sơn tĩnh điện công nghệ Đức, màu ghi sần"),
  keo("cua-keo-thep-son-tinh-dien-cong-nghe-duc-cua-mitadoor-mau-kem-san", "Cửa kéo thép Mitadoor sơn tĩnh điện công nghệ Đức, màu kem sần"),
  keo("cua-keo-inox-mitadoor", "Cửa kéo inox Mitadoor"),
  keo("cua-keo-inox-mitadoor-ben-dep", "Cửa kéo inox Mitadoor"),
  keo("cua-keo-hoa-van-co-s9-cua-mitadoor", "Cửa kéo hoa văn cổ S9 Mitadoor"),
  keo("cua-keo-nhom-mitadoor-da-dang-ve-mau-sac-son-tinh-dien", "Cửa kéo nhôm Mitadoor sơn tĩnh điện"),
  keo("cua-keo-nhom-mitadoor-cong-nghe-duc-mau-cafe-chay", "Cửa kéo nhôm Mitadoor công nghệ Đức, màu café cháy"),
  keo("cua-keo-thep-cong-nghe-duc-mau-van-dong", "Cửa kéo thép công nghệ Đức, màu vân đồng"),
  keo("cua-keo-thep-cong-nghe-duc-mau-ghi-san", "Cửa kéo thép công nghệ Đức, màu ghi sần"),
  keo("cua-keo-thep-son-tinh-dien-cong-nghe-duc", "Cửa kéo thép sơn tĩnh điện công nghệ Đức"),
];
