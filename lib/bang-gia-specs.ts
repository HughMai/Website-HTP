/**
 * Thông số & gợi ý chọn cho các trang bảng giá — viết tay, có nguồn.
 *
 * Giá và danh sách mẫu KHÔNG nằm ở đây: chúng do CRM sinh ra (lib/bang-gia-data.ts,
 * chạy Enki/htp/catalog/export_web.py). File này chỉ thêm phần nghiên cứu: độ dày,
 * kiểu lỗ thoáng, nên dùng cho đâu.
 *
 * Quy tắc: chỉ ghi điều nhà sản xuất công bố hoặc chữ in trên nan. Mẫu chưa có nguồn
 * thì để trống — không đoán. Tra cứu ngày 04/11/2026:
 *   Mitadoor  mitadoor.com.vn — trang từng mẫu (/san-pham/cua-cuon-nhom-…-i<id>.html),
 *             3 dòng nan + gợi ý chọn: /bang-gia/bang-gia-cua-cuon-nhom-i6.html,
 *             tole Đài Loan, Inox, tấm liền, cửa kéo, kính cường lực, cửa đi nhôm, bình lưu điện
 *   Alumdoor  alumdoor.vn/san-pham/{al503,al75,alvip50}/
 *   OneDoor   onedoor.com.vn/san-pham/cua-cuon-nhom-onedoor-b5-nan-cao-cap-1-2mm,
 *             …-b7-nan-thoi-kep-giam-am-day-1-3mm, /san-pham/nan-cua-cuon-b7
 *   Kovidoor  (dòng Đức của Mitadoor) trang hãng không truy cập được → bảng kỹ thuật của đại lý,
 *             3 nguồn khớp nhau: honghuyphat.com/san-pham/kovidoor-*, cuacuonsg.com, mitadoordanang.com
 *   DNC Door  bảng giá nguồn của tole mạ màu / sơn tĩnh điện / siêu trường, song ngang, DNC Series
 *             (Enki/htp/gia_them.py) — đặc điểm chép đúng, không thêm ý
 * Không bao giờ ghi số năm bảo hành ở đây (luật cứng trong CLAUDE.md).
 */

/** 1450000 → "1.450.000" (không phụ thuộc ICU của máy chủ). */
export function formatGia(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** "CT5122" → "nan-ct5122", "VIS 46R" → "nan-vis-46r" — id để nhảy tới thẻ mẫu. */
export function nanAnchor(code: string): string {
  return `nan-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

// ── Cửa cuốn nhôm công nghệ Đức ────────────────────────────────────────────

export interface NanSpec {
  kieu: string;
  day?: string;
  ketCau?: string;
  phuHop?: string;
  khoToiDa?: string;
}

export const NAN_SPECS: Record<string, NanSpec> = {
  // Kovidoor — dòng công nghệ Đức của Mitadoor. Trang hãng không truy cập được; thông số lấy từ
  // bảng kỹ thuật mà 3 đại lý đăng trùng khớp từng con số: honghuyphat.com (nhà phân phối
  // Mitadoor), cuacuonsg.com, mitadoordanang.com. Chung: nhôm 6063, sơn Akzo Nobel, bản lá 50mm.
  // Đuôi "R" = có gioong chống ồn (KV412 không ghi gioong). Nguồn không ghi công dụng từng mẫu →
  // "Phù hợp" suy từ độ dày theo thước 3 dòng của Mitadoor (xem NHU_CAU bên dưới).
  KV380R: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.0mm · thân 1.2mm",
    ketCau: "Bản lá 50mm · gioong chống ồn · sơn Akzo Nobel",
    phuHop: "Nhà ở, garage gia đình",
  },
  KV412: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.0mm · thân 1.2mm",
    ketCau: "Bản lá 50mm · sơn Akzo Nobel",
    phuHop: "Nhà ở, garage gia đình",
  },
  KV422R: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.1mm · thân 1.3mm",
    ketCau: "Bản lá 50mm · gioong chống ồn · sơn Akzo Nobel",
    phuHop: "Nhà phố, nhà ở cần cửa chạy êm",
  },
  KV432R: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.5mm · thân 2.6mm",
    ketCau: "Bản lá 50mm · gioong chống ồn · sơn Akzo Nobel",
    phuHop: "Mặt tiền nhà phố, cửa khổ lớn cần nan dày",
  },
  KV468R: {
    kieu: "Khe thoáng hình thang",
    day: "Móc 1.7mm · thân 2.8mm",
    ketCau: "Bản lá 50mm · gioong chống ồn · sơn Akzo Nobel",
    phuHop: "Cửa khổ lớn, mặt tiền cần chống va đập",
  },
  // "High class" in trên nan, nhưng mitadoor.com.vn không có mã MT5222R. Một đại lý (cuacuonsg.com)
  // ghi móc 1.1mm, chân 1.3mm — chỉ một nguồn, chưa dùng. Đo mẫu thật rồi điền.
  MT5222R: { kieu: "Khe thoáng" },

  // Mitadoor — trang từng mẫu trên mitadoor.com.vn.
  "VIS 46R": {
    kieu: "Khe thoáng oval 5mm",
    day: "Móc và chân dày 1.5mm",
    ketCau: "Bản lá cao 46mm · 2 chân 2 vít · lông nheo chống ồn",
    phuHop: "Showroom, cửa hàng, shophouse — mặt tiền cần đẹp và thoáng",
  },
  "VIS 50R": {
    kieu: "Siêu thoáng, khe hình thang 10mm",
    day: "Thân 3.0mm · móc 1.8mm · chân 2.1mm",
    ketCau: "2 chân 2 vít · lông nheo chống ồn",
    phuHop: "Cửa rộng 7–8m, nhà phố cần chống va đập",
  },
  X205R: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.3mm · chân 1.2mm",
    ketCau: "Lông nheo kép giảm ồn · thanh chịu lực dày",
    phuHop: "Cửa khổ lớn ở nhà phố, biệt thự, văn phòng, showroom — mở sớm, đóng khuya không ồn",
  },
  SD5231: {
    kieu: "Khe thoáng",
    day: "Móc 1.6mm · chân 3.0mm",
    ketCau: "Nan 3 lớp · 2 chân đặc chịu lực · 2 vít",
    phuHop: "Cửa rộng 7–8m, công trình cao cấp",
  },
  MT502R: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.3mm · chân 1.2mm",
    ketCau: "2 chân 2 vít · lông nheo kép, êm cả khi lên lẫn xuống",
    phuHop: "Nhà phố, căn hộ cần cửa êm và thoáng",
  },
  CT5122: {
    kieu: "Khe thoáng oval",
    day: "Móc 1.1mm · chân 1.1mm",
    ketCau: "2 chân 1 vít",
    phuHop: "Nhà phố, cửa hàng, công trình vừa và nhỏ",
  },
  OT70: {
    kieu: "Siêu kín — không lỗ thoáng",
    day: "Móc 1.0mm",
    ketCau: "Nhôm 6063-T5 · kín hoàn toàn, che tầm nhìn từ ngoài",
    phuHop: "Nhà phố, garage, mặt tiền cần riêng tư và an ninh",
  },

  // Alumdoor — độ dày in trên nan; kết cấu + khổ tối đa từ alumdoor.vn.
  // AL70: trang hãng ghi 0.6–1.4mm cho bản 2 lớp, khác số in trên nan → chỉ dùng số in trên nan.
  AL70: { kieu: "Kín — không lỗ thoáng", day: "0.7 – 0.8mm" },
  AL503: {
    kieu: "Khe thoáng oval + ngôi sao",
    day: "1.0 – 1.1mm",
    ketCau: "2 chân 1 vít",
    khoToiDa: "Ngang 4m × cao 6m",
  },
  AL75: {
    kieu: "Siêu thoáng",
    day: "1.2 – 1.4mm",
    ketCau: "2 chân 1 vít",
    khoToiDa: "Ngang 7.2m × cao 5m",
  },
  "AL-VIP50": {
    kieu: "Khe thoáng oval",
    day: "1.5 – 1.8mm (chân 2.35mm)",
    ketCau: "2 chân 2 vít",
    khoToiDa: "Ngang 7.6m × cao 6m",
  },

  // OneDoor — in trên nan: 6063-T5, dày tối đa 1.3mm ±8%; công dụng từ onedoor.com.vn.
  B5: {
    kieu: "Khe thoáng",
    day: "Tối đa 1.3mm",
    ketCau: "Nhôm 6063-T5 · giảm âm 2 chiều",
    phuHop: "Nhà phố, shophouse, gara ô tô, cửa hàng",
  },
  B7: {
    kieu: "Khe thoáng hình thoi kép",
    day: "Tối đa 1.3mm",
    ketCau: "Nhôm 6063-T5 · giảm chấn, chạy êm",
    phuHop: "Nhà phố, biệt thự, cửa hàng — cửa dưới 5.5m × 5.5m",
  },
};

/** Mẫu có trong CRM nhưng chưa có ảnh mẫu nan. */
// Không hiện trên web từ 10/11/2026 (catalog bỏ ô "Mẫu khác"); giữ phần nghiên cứu phòng khi đưa lại.
export const NAN_KHAC_SPECS: Record<string, string> = {
  "CT 5222 R": "Mitadoor, dòng cao cấp — móc 1.2mm, chân 1.6mm, lông nheo chống ồn",
};

export type NhuCau = "nha-o" | "nha-pho" | "kho-lon" | "kin";

/**
 * Lọc "Chọn theo nhu cầu" trên trang báo giá cửa cuốn. Gộp thước 3 dòng nan và mẹo chọn của
 * Mitadoor (mitadoor.com.vn/bang-gia/bang-gia-cua-cuon-nhom-i6.html: tiêu chuẩn 1.0–1.5mm cho nhà ở,
 * cao cấp 1.1–1.5mm cho nhà phố, đặc biệt 1.3–3.0mm cho cửa 7–8m) với "Phù hợp" / "Khổ tối đa"
 * từng mẫu ở trên. Mẫu chưa có nguồn công dụng (MT5222R) không vào nhóm nào — chỉ hiện ở "Tất cả".
 */
export const NHU_CAU: { key: NhuCau; ten: string; goiY: string; mau: string[] }[] = [
  {
    key: "nha-o",
    ten: "Nhà ở, garage",
    goiY: "Nan dày 1.0–1.5mm là đủ cho cửa đến khoảng 16m² (rộng 4m × cao 4m).",
    mau: ["KV380R", "KV412", "KV422R", "CT5122", "OT70", "AL503", "B5"],
  },
  {
    key: "nha-pho",
    ten: "Nhà phố, mặt tiền",
    goiY: "Cần đẹp và thoáng. Nhà sát đường lớn chọn mẫu có lông nheo hoặc gioong chống ồn: mở sớm, đóng khuya không phiền hàng xóm.",
    mau: ["KV422R", "KV432R", "VIS 46R", "VIS 50R", "X205R", "MT502R", "CT5122", "OT70", "B5", "B7"],
  },
  {
    key: "kho-lon",
    ten: "Cửa rộng trên 6m",
    goiY: "Chọn nan dày, chân dày để thân cửa không võng.",
    mau: ["KV432R", "KV468R", "VIS 50R", "X205R", "SD5231", "AL75", "AL-VIP50"],
  },
  {
    key: "kin",
    ten: "Cần kín, che tầm nhìn",
    goiY: "Nan không lỗ thoáng: riêng tư, an ninh hơn, đổi lại không đón gió.",
    mau: ["OT70", "AL70"],
  },
];

// ── Cửa cuốn tấm liền ───────────────────────────────────────────────────────
// Tole Đài Loan · Úc · Inox: khổ cửa theo thông số Mitadoor (tole 6 dem 4×4m, 8 dem 6×4m;
// Inox 6 dem 5×5m, 8 dem 7×6m). Tole mạ màu / sơn tĩnh điện / siêu trường: đặc điểm chép đúng
// bảng giá DNC Door (Enki/htp/gia_them.py), không thêm ý.

export const TAM_LIEN_SPECS: Record<string, { moTa: string; goiY: Record<string, string>; goiYChung?: string }> = {
  dai_loan: {
    moTa: "Thép cán nguội mạ kẽm, sơn tĩnh điện. Giá mềm nhất trong các dòng cửa cuốn; kéo tay kèm khóa ngang hoặc gắn motor.",
    goiY: {
      "6zem": "Cửa đến khoảng 16m² (4m × 4m): ki-ốt, cửa phụ, nhà cho thuê",
      "8zem": "Cửa đến khoảng 24m² (6m × 4m): nhà kho, nhà xưởng",
      "1ly": "Dày, cứng nhất dòng tole: cửa khổ lớn, đóng mở nhiều",
    },
  },
  uc: {
    moTa: "Tấm tole màu liền khối, chạy êm, ít ồn. Motor giấu trong trục cuốn nên mặt tiền gọn.",
    goiY: {},
    goiYChung: "Nhà phố, gara ô tô, mặt bằng kinh doanh vừa",
  },
  inox: {
    moTa: "Inox SUS 304 bề mặt sáng, hạn chế gỉ sét và oxy hóa — hợp nhà gần sông, gần biển, nơi ẩm.",
    goiY: {
      "6zem": "Nhà phố, cửa hàng — cửa đến khoảng 25m² (5m × 5m)",
      "8zem": "Mặt tiền kinh doanh cần an toàn cao — cửa đến khoảng 42m² (7m × 6m)",
    },
  },
  tole_ma_mau: {
    moTa: "Tole mạ màu, độ bền cao. Kéo tay hoặc gắn motor.",
    goiY: { "0.6mm (6 dem)": "Cửa tối đa 4m × 4m", "0.8mm (8 dem)": "Cửa tối đa 6m × 4m" },
    goiYChung: "Nhà kho, ki-ốt",
  },
  tole_son_tinh_dien: {
    moTa: "Sơn tĩnh điện bền màu, hạn chế tối đa trầy xước.",
    goiY: { "0.6mm (6 dem)": "Cửa tối đa 4m × 4m", "0.8mm (8 dem)": "Cửa tối đa 6m × 4m" },
    goiYChung: "Nhà kho, ki-ốt, garage ô tô",
  },
  tole_sieu_truong: {
    moTa: "Bền màu, hạn chế tối đa trầy xước, bảo vệ công trình cao.",
    goiY: {},
    goiYChung: "Nhà xưởng, kho bãi, khu công nghiệp",
  },
};

// ── Cửa cuốn song ngang ─────────────────────────────────────────────────────
// Bảng giá DNC Door (Enki/htp/gia_them.py): quy cách và khổ tối đa chép đúng nguồn.

export const SONG_NGANG_SPECS: Record<string, { vatLieu: string; goiY: Record<string, string> }> = {
  song_ngang_thep: {
    vatLieu: "Thép sơn tĩnh điện",
    goiY: {
      "Mắc võng": "Ø14, dày 1.2mm · cửa tối đa 6m × 5m",
      "Song tròn": "Ø19, dày 1.2mm · cửa tối đa 6m × 5m",
      "Song vuông": "13 × 26, dày 1.2mm · cửa tối đa 7m × 5m",
    },
  },
  song_ngang_inox: {
    vatLieu: "Inox 304",
    goiY: {
      "Mắc võng": "Ø14, dày 1mm · cửa tối đa 6m × 5m",
      "Song tròn": "Ø19, dày 0.9mm · cửa tối đa 6m × 5m",
      "Song vuông 13 × 26": "Dày 0.9mm · cửa tối đa 7m × 5m",
      "Song vuông 20 × 20": "Dày 0.9mm · cửa tối đa 7m × 5m",
    },
  },
};

export const SONG_NGANG_DUNG_CHO = "Trung tâm thương mại, ngân hàng";

// ── Motor & phụ kiện ──────────────────────────────────────────────────────

export const PHU_KIEN_DUNG_CHO: Record<"binh" | "khoa_tole" | "khoa_uc", string> = {
  // Mitadoor: bình lưu điện giữ điện 12–48 giờ, đóng mở 5–10 lần khi cúp điện tùy công suất.
  binh: "Lưu điện cho motor — cúp điện cửa vẫn đóng mở được (thường 5–10 lần, tùy dung lượng bình)",
  khoa_tole: "Cửa cuốn tole",
  khoa_uc: "Cửa cuốn công nghệ Úc",
};

// ── Cửa kéo ───────────────────────────────────────────────────────────────
// Mitadoor: cửa kéo tole Đài Loan U 6–8 dem, khổ 12m² (4×3m) – 16m² (5×3.2m);
// cửa kéo thép U 8 dem – 2.1 ly, đến 24m² (6×4m), cho nhà ở, cửa hàng, kho bãi.
// Thanh U cách nhau 100–120mm. "Lá" là lá tole phủ giữa các thanh U.

export const KEO_LOAI: { ten: string; moTa: string }[] = [
  {
    ten: "Có lá",
    moTa: "Giữa các thanh U có lá tole phủ kín. Cửa đóng là che được tầm nhìn, chặn chuột và bụi.",
  },
  {
    ten: "Không lá",
    moTa: "Chỉ có khung U và nhíp. Khóa cửa rồi gió và ánh sáng vẫn vào nhà. Giá thấp hơn cửa có lá.",
  },
];

export const KEO_NHOM_DAY: { mau: string[]; tieuDe: string; goiY: string }[] = [
  { mau: ["6zem", "8zem"], tieuDe: "U 6 – 8 zem", goiY: "Cửa nhỏ, nhà ở, ngân sách tiết kiệm — cửa đến khoảng 12–16m²" },
  { mau: ["1ly", "1.2ly"], tieuDe: "U 1 – 1.2 ly", goiY: "Nhà ở, cửa hàng đóng mở hằng ngày" },
  { mau: ["1.4ly", "1.6ly"], tieuDe: "U 1.4 – 1.6 ly", goiY: "Cửa lớn, cửa hàng, kho bãi — cửa đến khoảng 24m² (6m × 4m)" },
];

// ── Nhôm kính ─────────────────────────────────────────────────────────────
// Mitadoor: hệ nhôm phổ thông dày 0.8–1.2mm; nhôm 2.0mm chịu va đập, chống cong vênh.
// Kính cường lực chịu lực gấp 4–5 lần kính thường cùng độ dày, vỡ thành hạt nhỏ.

/** Shown under the cửa đi rows of the nhôm kính page (cửa sổ and vách kính come in 1.2 / 1.4 ly). */
export const NHOM_DAY_GOI_Y: { day: string; goiY: string }[] = [
  { day: "Nhôm 1.2 ly", goiY: "Cửa đi trong nhà, ít va chạm" },
  { day: "Nhôm 1.4 ly", goiY: "Cửa đi chính, đóng mở hằng ngày" },
  { day: "Nhôm 2.0 ly", goiY: "Cửa đi mặt tiền, cánh lớn — cứng, chịu va đập, ít cong vênh" },
];

export const KINH_GOI_Y: { day: string; goiY: string }[] = [
  { day: "Kính 10 ly", goiY: "Cửa bản lề sàn thông dụng: shop, văn phòng" },
  { day: "Kính 12 ly", goiY: "Cánh lớn, nặng — cứng và đứng vững hơn" },
];

export const KINH_CUONG_LUC =
  "Kính cường lực chịu lực gấp 4–5 lần kính thường cùng độ dày; khi vỡ thành hạt nhỏ, không sắc cạnh.";
