// GBP weekly post: service pages, post types, rotation logic

export const SERVICE_PAGES = {
  homepage: { url: "/", label: "Trang chủ Hưng Thành Phát Door" },
  cuaCuonNhom: { url: "/cua-cuon-nhom-can-tho", label: "Cửa cuốn nhôm Cần Thơ" },
  cuaCuonNhaXuong: { url: "/cua-cuon-nha-xuong-can-tho", label: "Cửa cuốn nhà xưởng" },
  cuaKeo: { url: "/cua-keo-can-tho", label: "Cửa kéo Cần Thơ" },
  cuaKeoThep: { url: "/cua-keo-thep-can-tho", label: "Cửa kéo thép Cần Thơ" },
  cuaNhomKinh: { url: "/cua-nhom-kinh-can-tho", label: "Cửa nhôm kính Cần Thơ" },
  lanCan: { url: "/lan-can-nhom-kinh-can-tho", label: "Lan can nhôm kính" },
  lapDat: { url: "/lap-dat-cua-cuon-can-tho", label: "Lắp đặt cửa cuốn" },
  suaChua: { url: "/sua-chua-cua-cuon-can-tho", label: "Sửa chữa cửa cuốn" },
  baoGiaCuon: { url: "/bao-gia-cua-cuon-can-tho", label: "Báo giá cửa cuốn" },
  bangGiaKeo: { url: "/bang-gia-cua-keo-can-tho", label: "Bảng giá cửa kéo" },
  bangGiaNhomKinh: { url: "/bang-gia-cua-nhom-kinh-can-tho", label: "Bảng giá nhôm kính" },
  binhThuy: { url: "/cua-cuon-binh-thuy", label: "Cửa cuốn Bình Thủy" },
  ninhKieu: { url: "/cua-cuon-ninh-kieu", label: "Cửa cuốn Ninh Kiều" },
  caiRang: { url: "/cua-cuon-cai-rang", label: "Cửa cuốn Cái Răng" },
  oMon: { url: "/cua-cuon-o-mon", label: "Cửa cuốn Ô Môn" },
  thotNot: { url: "/cua-cuon-thot-not", label: "Cửa cuốn Thốt Nốt" },
  blogNhomDuc: { url: "/blog/nhom-duc-vs-thep-tinh-dien", label: "Nhôm Đức vs Thép tĩnh điện" },
  blogBaoTri: { url: "/blog/cach-bao-tri-cua-cuon", label: "Bảo trì cửa cuốn" },
  blogMotor: { url: "/blog/motor-cua-cuon-tot-nhat", label: "Motor cửa cuốn tốt nhất" },
} as const;

export type ServicePageKey = keyof typeof SERVICE_PAGES;

export const POST_TYPES = [
  "project_showcase",
  "educational_tip",
  "seasonal_hook",
  "comparison",
  "local_news_angle",
  "holiday_or_promo",
] as const;

export type PostType = (typeof POST_TYPES)[number];

export const POST_TYPE_DESCRIPTIONS: Record<PostType, string> = {
  project_showcase:
    "Khoe một công trình thực tế ở một khu vực cụ thể của Cần Thơ. Giọng văn tự hào, có chi tiết kỹ thuật nhẹ (loại cửa, vật liệu).",
  educational_tip:
    "Chia sẻ mẹo bảo trì / cách dùng cửa cuốn. Liệt kê 3–5 điểm ngắn gọn. Giọng văn chuyên nghiệp, hữu ích.",
  seasonal_hook:
    "Kết nối sản phẩm với thời tiết / mùa hiện tại tại Cần Thơ. Ví dụ: mùa mưa, mùa nắng nóng, gió mạnh ven sông.",
  comparison:
    "So sánh 2 lựa chọn vật liệu / sản phẩm. Đưa ra ưu nhược điểm và gợi ý ai nên chọn loại nào.",
  local_news_angle:
    "Liên hệ ngành cửa với một xu hướng / hoạt động đang diễn ra ở Cần Thơ hoặc ĐBSCL (đô thị hóa, du lịch, kinh doanh mặt tiền).",
  holiday_or_promo:
    "Chào dịp lễ sắp tới và gợi ý nâng cấp cửa nhà trước dịp. Giọng thân thiện, không hard-sell.",
};

export const POST_TYPE_LINKS: Record<PostType, ServicePageKey[]> = {
  project_showcase: ["binhThuy", "ninhKieu", "caiRang", "oMon", "thotNot", "cuaCuonNhom"],
  educational_tip: ["suaChua", "blogBaoTri", "blogMotor"],
  seasonal_hook: ["cuaNhomKinh", "cuaCuonNhom", "lapDat"],
  comparison: ["blogNhomDuc", "cuaCuonNhom", "cuaKeoThep"],
  local_news_angle: ["cuaKeo", "cuaCuonNhaXuong", "binhThuy", "lanCan"],
  holiday_or_promo: ["homepage", "baoGiaCuon", "bangGiaKeo", "bangGiaNhomKinh"],
};

// Deterministic rotation: ISO week number modulo number of post types
export function getIsoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getWeekPostType(date: Date = new Date()): PostType {
  const week = getIsoWeek(date);
  return POST_TYPES[week % POST_TYPES.length];
}

export function pickLinkForPostType(postType: PostType, date: Date = new Date()): ServicePageKey {
  const candidates = POST_TYPE_LINKS[postType];
  const week = getIsoWeek(date);
  return candidates[week % candidates.length];
}
