export const SITE = {
  brand: "Hưng Thành Phát Door",
  tagline: "Giải Pháp Cửa Cao Cấp Cho Mọi Công Trình",
  hotlines: ["0945 042 345", "0913 574 077"] as const,
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
    value: "5–10",
    label: "Năm Bảo Hành",
    description:
      "Cam kết bảo hành dài hạn cùng dịch vụ bảo trì tận nơi 24/7.",
  },
] as const;

// Product categories with subtypes — each subtype has its own photo + label
export const PRODUCT_CATEGORIES = [
  {
    id: "cua-cuon",
    name: "Cửa Cuốn",
    tagline: "Vận hành êm – Bảo mật cao – Tiết kiệm không gian",
    subtypes: [
      { name: "Cửa Cuốn Nhôm Công Nghệ Đức", image: "/products/cua-cuon/nhom-duc.jpg" },
      { name: "Cửa Cuốn Thép Sơn Tĩnh Điện", image: "/products/cua-cuon/thep-tinh-dien.jpg" },
      { name: "Cửa Cuốn Tấm Liền", image: "/products/cua-cuon/tam-lien.jpg" },
      { name: "Cửa Cuốn Song Ngang, Mắt Võng", image: "/products/cua-cuon/song-ngang-mat-vong.jpg" },
      { name: "Cửa Cuốn Inox SUS 304", image: "/products/cua-cuon/inox-sus-304.jpg" },
      { name: "Cửa Cuốn Tole Công Nghệ Đài Loan", image: "/products/cua-cuon/tole-dai-loan.jpg" },
      { name: "Cửa Trượt Trần", image: "/products/cua-cuon/truot-tran.jpg" },
      { name: "Cửa Cuốn Đóng Đặc Biệt", image: "/products/cua-cuon/dong-dac-biet.jpg" },
    ],
  },
  {
    id: "cua-nhom-kinh",
    name: "Cửa Nhôm Kính",
    tagline: "Sang trọng – Cách âm – Cách nhiệt vượt trội",
    subtypes: [
      { name: "Hệ Cửa Đi", image: "/products/cua-nhom-kinh/he-cua-di.jpg" },
      { name: "Hệ Cửa Sổ", image: "/products/cua-nhom-kinh/he-cua-so.jpg" },
      { name: "Hệ Mặt Dựng", image: "/products/cua-nhom-kinh/he-mat-dung.jpg" },
      { name: "Hệ Lan Can – Cầu Thang Nhôm Kính", image: "/products/cua-nhom-kinh/lan-can-cau-thang.jpg" },
    ],
  },
  {
    id: "cua-keo",
    name: "Cửa Kéo",
    tagline: "Bền bỉ – Chống đột nhập – Phù hợp mặt tiền kinh doanh",
    subtypes: [
      { name: "Cửa Kéo Thép Công Nghệ Đức", image: "/products/cua-keo/thep-duc.jpg" },
      { name: "Cửa Kéo Nhôm Công Nghệ Đức", image: "/products/cua-keo/nhom-duc.jpg" },
      { name: "Cửa Kéo Hoa Văn Cổ S9", image: "/products/cua-keo/hoa-van-co.jpg" },
      { name: "Cửa Kéo Inox", image: "/products/cua-keo/inox.jpg" },
    ],
  },
  {
    id: "motor-binh-luu-dien",
    name: "Motor – Bình Lưu Điện",
    tagline: "Vận hành ổn định – Dự phòng điện – Phụ kiện chính hãng",
    contain: true,
    subtypes: [
      { name: "Motor Cửa Cuốn Nhập Khẩu Chính Hãng", image: "/products/motor-binh-luu-dien/motor-cua-cuon.jpg" },
      { name: "Bình Lưu Điện Cửa Cuốn", image: "/products/motor-binh-luu-dien/binh-luu-dien.jpg" },
      { name: "Remote Cửa Cuốn", image: "/products/motor-binh-luu-dien/remote-cua-cuon.jpg" },
      { name: "Hệ Thống Dừng & Còi Báo Động", image: "/products/motor-binh-luu-dien/he-thong-bao-dong.jpg" },
    ],
  },
] as const;

export const GALLERY_IMAGES = [
  {
    label: "Lắp đặt cửa cuốn tôle tại mặt tiền thương mại ở Cần Thơ",
    image: "/products/Real cases/Cửa cuốn/3-1765895951.jpg",
  },
  {
    label: "Hoàn thiện cửa kéo thép tại mặt tiền kinh doanh Cần Thơ",
    image: "/products/Real cases/Cửa kéo/473695893_122139902930383303_6257649342661743951_n.jpg",
  },
  {
    label: "Cửa nhôm kính vân gỗ cao cấp hoàn thiện tại biệt thự Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/5-1765895974.jpg",
  },
  {
    label: "Hệ cửa đi nhôm kính 4 cánh lắp đặt tại nhà ở mới xây Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473672719_122139902384383303_5867355544384530872_n.jpg",
  },
  {
    label: "Cửa nhôm kính 4 cánh kiểu Pháp hoàn thiện tại biệt thự Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473696933_122139902228383303_2083624855929093554_n.jpg",
  },
  {
    label: "Cửa nhôm kính trang trí hoa văn vàng cổ điển tại biệt thự Bình Thủy",
    image: "/products/Real cases/Cửa nhôm kính/473709611_122139902666383303_5356222783742316859_n.jpg",
  },
  {
    label: "Bàn giao nhà phố Cần Thơ — cửa cuốn & cửa nhôm kính đồng bộ",
    image: "/products/Real cases/Cửa nhôm kính/473835164_122139902996383303_2565169139323727501_n.jpg",
  },
  {
    label: "Hệ cửa gấp nhôm kính đồng bộ tại nhà phố mới xây Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/473755384_122139902672383303_419115667892905033_n.jpg",
  },
  {
    label: "Lan can kính cầu thang nhôm vân gỗ tại nhà ở Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/480700842_122143773704383303_3629582498489512503_n.jpg",
  },
  {
    label: "Lắp đặt cửa sổ nhôm kính tại nhà xưởng công nghiệp Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/9-1765896082.jpg",
  },
  {
    label: "Đội kỹ thuật lắp đặt hệ cửa trượt nhôm tại nhà phố Bình Thủy, Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/4-1765895963.jpg",
  },
  {
    label: "Thi công hệ cửa nhôm kính tại nhà phố khu đô thị Cần Thơ",
    image: "/products/Real cases/Cửa nhôm kính/7-1765896007.jpg",
  },
] as const;
