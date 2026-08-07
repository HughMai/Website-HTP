export const SITE = {
  brand: "Hưng Thành Phát Door",
  // Registered name as it appears on the Võ Văn Kiệt storefront signage. Emitted as
  // schema legalName so Google can tell this entity apart from the unrelated
  // "Công ty Nhôm Kính Hưng Thành Phát Door" (hungthanhphatdoor.com).
  legalName: "Công ty TNHH SX - TM - DV Hưng Thành Phát",
  tagline: "Giải Pháp Cửa Cao Cấp Cho Mọi Công Trình",
  hotlines: ["0945 042 345", "0913 574 077"] as const,
  // Landline on the storefront sign — a fixed-line number is a strong local NAP signal.
  landline: "02923 730 081",
  email: "hungthanhphat6688@gmail.com",
  address: "235 - 237 (281 Cũ) Võ Văn Kiệt, Bình Thủy, Cần Thơ, Vietnam",
  mapQuery:
    "Hưng Thành Phát Door, 235-237 Võ Văn Kiệt, Bình Thủy, Cần Thơ",
  mapCoords: { lat: 10.048473, lng: 105.7574147 },
  mapDirectionsUrl:
    "https://www.google.com/maps/place/H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door/@10.0484783,105.7548398,17z/data=!3m1!4b1!4m6!3m5!1s0x31a08946f6a96a07:0xb1d3630ae8534a1b!8m2!3d10.048473!4d105.7574147!16s%2Fg%2F11lwgjdghy",
  workingHours: "08:00 - 17:30 (Thứ 2 - Thứ 7)",
  foundedYear: 2005,
} as const;

export const NAV_LINKS = [
  { id: "trang-chu", label: "Trang Chủ" },
  { id: "gioi-thieu", label: "Giới Thiệu" },
  { id: "san-pham", label: "Sản Phẩm" },
  { id: "du-an", label: "Dự Án" },
  { id: "lien-he", label: "Liên Hệ" },
] as const;

export type NavId = (typeof NAV_LINKS)[number]["id"];

// Zalo chat target — the number customers already message the shop on.
export const ZALO_URL = "https://zalo.me/0945042345";

// Hotlines split by what the caller wants, so they reach the right person first
// try instead of being passed around. Rendered in the Footer and the /lien-he block.
export const HOTLINE_ROLES = [
  { role: "Báo giá & tư vấn", number: SITE.hotlines[0] },
  { role: "Kỹ thuật & bảo hành", number: SITE.hotlines[1] },
  { role: "Văn phòng (cố định)", number: SITE.landline },
] as const;

// Route-based navigation. `children` render as a dropdown on desktop and an
// expanded group in the mobile sheet. Every href is a real page — the old
// anchor-only nav could not reach the 21 landing pages at all.
export const MAIN_NAV = [
  { href: "/", label: "Trang Chủ" },
  {
    href: "/san-pham",
    label: "Sản Phẩm",
    children: [
      // The head-term hub goes first: it is the page that should rank for
      // "cửa cuốn", and the nhôm page below it is one of its variants.
      { href: "/cua-cuon-can-tho", label: "Cửa Cuốn" },
      { href: "/cua-cuon-nhom-can-tho", label: "Cửa Cuốn Nhôm" },
      { href: "/cua-nhom-kinh-can-tho", label: "Cửa Nhôm Kính" },
      { href: "/cua-keo-can-tho", label: "Cửa Kéo" },
      { href: "/cua-keo-thep-can-tho", label: "Cửa Kéo Thép" },
      { href: "/lan-can-nhom-kinh-can-tho", label: "Lan Can Nhôm Kính" },
      { href: "/cua-cuon-nha-xuong-can-tho", label: "Cửa Cuốn Nhà Xưởng" },
    ],
  },
  { href: "/cong-trinh", label: "Công Trình" },
  {
    href: "/bao-gia-cua-cuon-can-tho",
    label: "Bảng Giá",
    children: [
      { href: "/bao-gia-cua-cuon-can-tho", label: "Báo Giá Cửa Cuốn" },
      { href: "/bang-gia-cua-keo-can-tho", label: "Bảng Giá Cửa Kéo" },
      { href: "/bang-gia-cua-nhom-kinh-can-tho", label: "Bảng Giá Nhôm Kính" },
    ],
  },
  {
    href: "/lap-dat-cua-cuon-can-tho",
    label: "Dịch Vụ",
    children: [
      { href: "/lap-dat-cua-cuon-can-tho", label: "Lắp Đặt Cửa Cuốn" },
      { href: "/sua-chua-cua-cuon-can-tho", label: "Sửa Chữa Cửa Cuốn" },
      { href: "/blog", label: "Kinh Nghiệm & Tư Vấn" },
    ],
  },
  { href: "/#lien-he", label: "Liên Hệ" },
] as const;

// Districts HTP installs in — doubles as the internal-link block for the five
// district landing pages.
export const SERVICE_AREAS = [
  { href: "/cua-cuon-ninh-kieu", label: "Ninh Kiều" },
  { href: "/cua-cuon-binh-thuy", label: "Bình Thủy" },
  { href: "/cua-cuon-cai-rang", label: "Cái Răng" },
  { href: "/cua-cuon-o-mon", label: "Ô Môn" },
  { href: "/cua-cuon-thot-not", label: "Thốt Nốt" },
] as const;

// Internal-link clusters rendered in the Footer on every page. Landing pages that
// are only reachable from sitemap.xml get deprioritised by crawlers ("Discovered —
// currently not indexed"); these links are what make them crawlable.
// The 3 blog posts are reached via the /blog index, which links them itself.
export const FOOTER_LINK_GROUPS = [
  {
    title: "Sản Phẩm",
    links: [
      { href: "/cua-cuon-can-tho", label: "Cửa Cuốn" },
      { href: "/cua-cuon-nhom-can-tho", label: "Cửa Cuốn Nhôm" },
      { href: "/cua-nhom-kinh-can-tho", label: "Cửa Nhôm Kính" },
      { href: "/cua-keo-can-tho", label: "Cửa Kéo" },
      { href: "/cua-keo-thep-can-tho", label: "Cửa Kéo Thép" },
      { href: "/lan-can-nhom-kinh-can-tho", label: "Lan Can Nhôm Kính" },
    ],
  },
  {
    title: "Dịch Vụ",
    links: [
      { href: "/lap-dat-cua-cuon-can-tho", label: "Lắp Đặt Cửa Cuốn" },
      { href: "/sua-chua-cua-cuon-can-tho", label: "Sửa Chữa Cửa Cuốn" },
      { href: "/cua-cuon-nha-xuong-can-tho", label: "Cửa Cuốn Nhà Xưởng" },
      { href: "/blog", label: "Kinh Nghiệm & Tư Vấn" },
    ],
  },
  {
    title: "Bảng Giá",
    links: [
      { href: "/bao-gia-cua-cuon-can-tho", label: "Báo Giá Cửa Cuốn" },
      { href: "/bang-gia-cua-keo-can-tho", label: "Bảng Giá Cửa Kéo" },
      { href: "/bang-gia-cua-nhom-kinh-can-tho", label: "Bảng Giá Nhôm Kính" },
    ],
  },
  {
    title: "Khu Vực Phục Vụ",
    links: [
      { href: "/cua-cuon-ninh-kieu", label: "Cửa Cuốn Ninh Kiều" },
      { href: "/cua-cuon-binh-thuy", label: "Cửa Cuốn Bình Thủy" },
      { href: "/cua-cuon-cai-rang", label: "Cửa Cuốn Cái Răng" },
      { href: "/cua-cuon-o-mon", label: "Cửa Cuốn Ô Môn" },
      { href: "/cua-cuon-thot-not", label: "Cửa Cuốn Thốt Nốt" },
    ],
  },
] as const;

export const STATS = [
  {
    value: "21+",
    label: "Năm Kinh Nghiệm",
    description: "Tích lũy chuyên môn vững vàng trong ngành cửa kỹ thuật cao.",
  },
  {
    value: "500+",
    label: "Dự Án Hoàn Thành",
    description:
      "Từ nhà phố, biệt thự đến cao ốc văn phòng và nhà xưởng công nghiệp.",
  },
  {
    value: "1000+",
    label: "Khách Hàng Tin Dùng",
    description:
      "Đối tác lâu dài cùng chủ đầu tư, nhà thầu và gia chủ trên toàn quốc.",
  },
  {
    value: "24/7",
    label: "Bảo Hành & Bảo Trì",
    description:
      "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất, bảo trì tận nơi khi cần.",
  },
] as const;

// Product categories with subtypes — each subtype has its own photo + label.
// pageLink: the pillar page this category links to from the homepage — a body-level
// keyword-anchored link from the homepage to each money page (SEO Rules: topic clusters).
export const PRODUCT_CATEGORIES = [
  {
    id: "cua-cuon",
    name: "Cửa Cuốn",
    tagline: "Vận hành êm – Bảo mật cao – Tiết kiệm không gian",
    // Lowest per-m² rate in the quote engine below — shown so a visitor can
    // self-qualify before calling. Same source as QuoteAndContact's PRICE_PER_SQM.
    priceFrom: "từ 500.000đ/m²",
    // "Xem Cửa Cuốn Cần Thơ" is head-term anchor text, so it has to point at the
    // head-term hub. It used to point at the nhôm variant, which taught Google
    // that the variant was the cửa cuốn page and left the hub with no links.
    pageLink: { href: "/cua-cuon-can-tho", label: "Xem Cửa Cuốn Cần Thơ" },
    // Real installs from the công trình library, hand-picked per category.
    // `label` describes only what the photo actually shows — colour, form and
    // setting. It never claims a material or brand that can't be seen, so the
    // "ảnh thực tế, không phải ảnh mẫu" promise holds everywhere on the site.
    showcase: [
      { slug: "p01-cc-nan-bac", label: "Cửa cuốn nan nhôm bạc" },
      { slug: "p24-cc-xam-duc-lo", label: "Cửa cuốn khe thoáng xám" },
      { slug: "p07-cc-kem-san-gach", label: "Cửa cuốn kem nhà phố" },
      { slug: "p31-xuong-cc-xanh", label: "Cửa cuốn nhà xưởng khổ lớn" },
    ],
    // `image: ""` = render as a text chip, not a card. The supplier catalogue
    // photos that used to sit here carried a competitor's watermark; the cards
    // above come from `showcase` (real HTP installs) instead.
    subtypes: [
      { name: "Cửa Cuốn Nhôm Công Nghệ Đức", image: "" },
      { name: "Cửa Cuốn Thép Sơn Tĩnh Điện", image: "" },
      { name: "Cửa Cuốn Tấm Liền", image: "" },
      { name: "Cửa Cuốn Song Ngang, Mắt Võng", image: "" },
      { name: "Cửa Cuốn Inox SUS 304", image: "" },
      { name: "Cửa Cuốn Tole Công Nghệ Đài Loan", image: "" },
      { name: "Cửa Trượt Trần", image: "" },
      { name: "Cửa Cuốn Đóng Đặc Biệt", image: "" },
    ],
  },
  {
    id: "cua-nhom-kinh",
    name: "Cửa Nhôm Kính",
    tagline: "Sang trọng – Cách âm – Cách nhiệt vượt trội",
    priceFrom: "từ 1.400.000đ/m²",
    pageLink: { href: "/cua-nhom-kinh-can-tho", label: "Xem Cửa Nhôm Kính Cần Thơ" },
    showcase: [
      { slug: "nk23-cua-nhom-kinh-doi-xam", label: "Cửa đi nhôm kính 2 cánh" },
      { slug: "nk38-cua-nhom-4-canh-xam", label: "Cửa đi nhôm kính 4 cánh" },
      { slug: "nk42-cua-so-nhom-can", label: "Cửa sổ nhôm kính" },
      { slug: "nk27-nha-kinh-be-nuoc", label: "Mặt dựng kính nhà phố" },
    ],
    subtypes: [
      { name: "Hệ Cửa Đi", image: "" },
      { name: "Hệ Cửa Sổ", image: "" },
      { name: "Hệ Mặt Dựng", image: "" },
    ],
  },
  {
    id: "lan-can-cau-thang",
    name: "Lan Can – Cầu Thang Kính",
    tagline: "Kính cường lực – Tay vịn gỗ hoặc nhôm – Thoáng và an toàn",
    priceFrom: "từ 1.950.000đ/m²",
    pageLink: {
      href: "/lan-can-nhom-kinh-can-tho",
      label: "Xem Lan Can Nhôm Kính Cần Thơ",
    },
    showcase: [
      { slug: "nk36-lan-can-ban-cong-go", label: "Lan can kính ban công" },
      { slug: "nk47-lan-can-thang-kinh", label: "Lan can kính cầu thang" },
      { slug: "nk10-369-nguyen-van-cu-thang-kinh", label: "Cầu thang kính cong" },
      { slug: "nk21-lan-can-cong-decor-vang", label: "Lan can kính cong" },
    ],
    subtypes: [
      { name: "Lan Can Kính Ban Công", image: "" },
      { name: "Lan Can – Cầu Thang Kính", image: "" },
      { name: "Tay Vịn Gỗ / Nhôm 3D", image: "" },
      { name: "Vách Kính Cường Lực", image: "" },
    ],
  },
  {
    id: "cua-keo",
    name: "Cửa Kéo",
    tagline: "Bền bỉ – Chống đột nhập – Phù hợp mặt tiền kinh doanh",
    priceFrom: "từ 540.000đ/m²",
    pageLink: { href: "/cua-keo-can-tho", label: "Xem Cửa Kéo Cần Thơ" },
    showcase: [
      { slug: "p23-keo-xanh-vlxd-linh", label: "Cửa kéo xanh mặt tiền" },
      { slug: "p55-keo-trang-chau-cay", label: "Cửa kéo trắng nhà phố" },
      { slug: "p39-shop-keo-kem-oto", label: "Cửa kéo kem mặt tiền shop" },
      { slug: "p69-day-keo-xanh-xuong", label: "Dãy cửa kéo nhà xưởng" },
    ],
    subtypes: [
      { name: "Cửa Kéo Thép Công Nghệ Đức", image: "" },
      { name: "Cửa Kéo Nhôm Công Nghệ Đức", image: "" },
      { name: "Cửa Kéo Hoa Văn Cổ S9", image: "" },
      { name: "Cửa Kéo Inox", image: "" },
    ],
  },
  {
    id: "motor-binh-luu-dien",
    name: "Motor – Bình Lưu Điện",
    tagline: "Vận hành ổn định – Dự phòng điện – Phụ kiện chính hãng",
    priceFrom: "từ 3.300.000đ/bộ",
    pageLink: { href: "/sua-chua-cua-cuon-can-tho", label: "Sửa Chữa & Thay Motor" },
    // No photos: there is no "công trình" for a remote control, and the supplier
    // shots that used to sit here were a competitor's catalogue images. Renders
    // as tiles until the xưởng photographs the units it actually stocks.
    subtypes: [
      { name: "Motor Cửa Cuốn Nhập Khẩu Chính Hãng", image: "" },
      { name: "Bình Lưu Điện Cửa Cuốn", image: "" },
      { name: "Remote Cửa Cuốn", image: "" },
      { name: "Hệ Thống Dừng & Còi Báo Động", image: "" },
    ],
  },
] as const;

export const GALLERY_IMAGES = [
  {
    label: "Lắp đặt cửa cuốn tôle tại mặt tiền thương mại ở Cần Thơ",
    image: "/products/Real cases/Cửa cuốn/3-1765895951.webp",
  },
  {
    label: "Hoàn thiện cửa kéo thép tại mặt tiền kinh doanh Cần Thơ",
    image: "/products/Real cases/Cửa kéo/473695893_122139902930383303_6257649342661743951_n.webp",
  },
  {
    label: "Cửa nhôm kính vân gỗ cao cấp hoàn thiện tại biệt thự Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/5-1765895974.webp",
  },
  {
    label: "Hệ cửa đi nhôm kính 4 cánh lắp đặt tại nhà ở mới xây Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473672719_122139902384383303_5867355544384530872_n.webp",
  },
  {
    label: "Cửa nhôm kính 4 cánh kiểu Pháp hoàn thiện tại biệt thự Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473696933_122139902228383303_2083624855929093554_n.webp",
  },
  {
    label: "Cửa nhôm kính trang trí hoa văn vàng cổ điển tại biệt thự Bình Thủy",
    image: "/products/Real cases/Cửa nhôm kính/473709611_122139902666383303_5356222783742316859_n.webp",
  },
  {
    label: "Bàn giao nhà phố Cần Thơ — cửa cuốn & cửa nhôm kính đồng bộ",
    image: "/products/Real cases/Cửa nhôm kính/473835164_122139902996383303_2565169139323727501_n.webp",
  },
  {
    label: "Hệ cửa gấp nhôm kính đồng bộ tại nhà phố mới xây Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473755384_122139902672383303_419115667892905033_n.webp",
  },
  {
    label: "Lan can kính cầu thang nhôm vân gỗ tại nhà ở Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/480700842_122143773704383303_3629582498489512503_n.webp",
  },
  {
    label: "Lắp đặt cửa sổ nhôm kính tại nhà xưởng công nghiệp Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/9-1765896082.webp",
  },
  {
    label: "Đội kỹ thuật lắp đặt hệ cửa trượt nhôm tại nhà phố Bình Thủy, Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/4-1765895963.webp",
  },
  {
    label: "Thi công hệ cửa nhôm kính tại nhà phố khu đô thị Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/7-1765896007.webp",
  },
] as const;
