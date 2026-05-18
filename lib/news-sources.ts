// Vietnamese holiday and seasonal context for GBP post generation

type Holiday = { date: string; name: string; angle: string };

// Major fixed-date Vietnamese holidays (lunar holidays handled separately)
const VN_FIXED_HOLIDAYS: Holiday[] = [
  { date: "01-01", name: "Tết Dương Lịch", angle: "Năm mới — nâng cấp nhà cửa" },
  { date: "03-08", name: "Quốc tế Phụ nữ", angle: "Tặng vợ căn nhà an toàn hơn" },
  { date: "04-30", name: "Ngày Giải Phóng Miền Nam", angle: "Nghỉ lễ dài — tranh thủ lắp cửa" },
  { date: "05-01", name: "Quốc Tế Lao Động", angle: "Đội ngũ thi công vẫn trực 24/7" },
  { date: "06-01", name: "Quốc Tế Thiếu Nhi", angle: "Cửa an toàn cho con trẻ" },
  { date: "09-02", name: "Quốc Khánh", angle: "Quà tặng cho gia đình dịp Quốc khánh" },
  { date: "10-20", name: "Ngày Phụ nữ Việt Nam", angle: "Tri ân các bà các mẹ" },
  { date: "11-20", name: "Ngày Nhà Giáo Việt Nam", angle: "—" },
  { date: "12-22", name: "Ngày Quân Đội", angle: "—" },
];

// Tết Nguyên Đán (Lunar New Year) — varies; hardcoded for 2026 & 2027
const LUNAR_NEW_YEAR: Holiday[] = [
  { date: "2026-02-17", name: "Tết Nguyên Đán 2026 (Bính Ngọ)", angle: "Sửa sang cửa nhà đón Tết" },
  { date: "2027-02-06", name: "Tết Nguyên Đán 2027 (Đinh Mùi)", angle: "Sửa sang cửa nhà đón Tết" },
];

export type UpcomingHoliday = Holiday & { daysAway: number };

export function getUpcomingHoliday(
  date: Date = new Date(),
  withinDays = 21
): UpcomingHoliday | null {
  const year = date.getFullYear();
  const candidates: { holiday: Holiday; when: Date }[] = [];

  for (const h of VN_FIXED_HOLIDAYS) {
    const [mm, dd] = h.date.split("-").map(Number);
    const thisYear = new Date(year, mm - 1, dd);
    const nextYear = new Date(year + 1, mm - 1, dd);
    candidates.push({ holiday: h, when: thisYear });
    candidates.push({ holiday: h, when: nextYear });
  }
  for (const h of LUNAR_NEW_YEAR) {
    candidates.push({ holiday: h, when: new Date(h.date) });
  }

  const upcoming = candidates
    .map((c) => ({
      holiday: c.holiday,
      daysAway: Math.ceil((c.when.getTime() - date.getTime()) / 86400000),
    }))
    .filter((c) => c.daysAway >= 0 && c.daysAway <= withinDays)
    .sort((a, b) => a.daysAway - b.daysAway);

  if (!upcoming.length) return null;
  return { ...upcoming[0].holiday, daysAway: upcoming[0].daysAway };
}

export type Season =
  | "mua-mua-dau"
  | "mua-mua-cao-diem"
  | "cuoi-mua-mua"
  | "mua-kho-mat"
  | "mua-kho-nong"
  | "can-tet";

export function getCanThoSeason(date: Date = new Date()): { id: Season; label: string; angle: string } {
  const month = date.getMonth() + 1;
  if (month === 1 || month === 2)
    return {
      id: "can-tet",
      label: "Cận Tết, thời tiết mát",
      angle: "Nhà nhà sửa sang cửa đón Tết — lắp sớm tránh kẹt đội thợ",
    };
  if (month === 3 || month === 4)
    return {
      id: "mua-kho-nong",
      label: "Mùa khô nắng nóng",
      angle: "Nắng nóng làm cửa giãn nở — chọn vật liệu chịu nhiệt tốt",
    };
  if (month === 5)
    return {
      id: "mua-mua-dau",
      label: "Đầu mùa mưa",
      angle: "Mưa giông bất chợt — kiểm tra cửa trước khi mùa mưa tới cao điểm",
    };
  if (month >= 6 && month <= 9)
    return {
      id: "mua-mua-cao-diem",
      label: "Mùa mưa cao điểm ĐBSCL",
      angle: "Mưa lớn kéo dài — cửa nhôm kính chống dột, ron cao su còn tốt?",
    };
  if (month === 10)
    return {
      id: "cuoi-mua-mua",
      label: "Cuối mùa mưa, lũ về",
      angle: "Mùa lũ Cần Thơ — gia cố cửa tầng trệt, chuẩn bị mùa khô",
    };
  return {
    id: "mua-kho-mat",
    label: "Mùa khô mát",
    angle: "Thời tiết đẹp — lý tưởng để thi công lắp đặt",
  };
}

export const CAN_THO_LOCAL_CONTEXT = {
  districts: [
    { name: "Bình Thủy", note: "Nơi đặt showroom Hưng Thành Phát" },
    { name: "Ninh Kiều", note: "Trung tâm thành phố, nhiều nhà phố mặt tiền" },
    { name: "Cái Răng", note: "Khu phát triển mới, nhiều kho xưởng" },
    { name: "Ô Môn", note: "Khu công nghiệp, nhiều nhà xưởng" },
    { name: "Thốt Nốt", note: "Phía Bắc, nhiều mặt tiền kinh doanh" },
  ],
  landmarks: [
    "Chợ Cái Khế",
    "Đại học Cần Thơ",
    "Bến Ninh Kiều",
    "Cầu Cần Thơ",
    "Vincom Hùng Vương",
    "Khu công nghiệp Trà Nóc",
  ],
  trends: [
    "Đô thị hóa nhanh — nhiều nhà phố mới xây cần cửa cao cấp",
    "Du lịch Cần Thơ phát triển — homestay, quán cà phê cần mặt tiền đẹp",
    "Khu công nghiệp mở rộng — nhu cầu cửa cuốn nhà xưởng tăng",
    "Mùa lũ ĐBSCL — cửa nhôm kính chống nước được ưa chuộng",
  ],
};
