/**
 * Real Google Business reviews, copied verbatim from the Maps listing. Shared by the
 * homepage marquee (Testimonials) and the Google Ads landing pages (/lp/*), which are
 * server components and can't read data out of a "use client" module.
 */
export type Review = {
  name: string;
  initial: string;
  color: string;
  date: string;
  stars: number;
  body: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Nhiên Nguyễn",
    initial: "N",
    color: "bg-pink-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Cửa hàng buôn bán rất uy tín, chất lượng. Cửa sử dụng bền, đẹp lắm mọi người ơi. Đặt biệt là vợ chồng chị chủ rất nhiệt tình, tư vấn kỹ, giá lại rẻ nữa. Bạn mình dọ giá ở các nơi khác rất nhiều. Đặt mua tại Hưng Thành Phát vận chuyển về Sóc Trăng mà vẫn rẻ hơn chỗ khác gần 1 triệu luôn.",
  },
  {
    name: "Thắng Võ Minh",
    initial: "T",
    color: "bg-blue-600",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Biết đến Hưng Thành Phát Door qua người quen giới thiệu. Cửa hàng có tiếng ở Cần Thơ về cửa cuốn và cửa nhôm kính, làm việc uy tín và bảo hành rõ ràng. Đáng tin cậy cho ai đang tìm nơi lắp đặt cửa chất lượng tại khu vực!",
  },
  {
    name: "Cương Trương Kim",
    initial: "C",
    color: "bg-emerald-600",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Mình đã lắp cửa cuốn tại Hưng Thành Phát Door và rất hài lòng với chất lượng dịch vụ. Đội ngũ thi công chuyên nghiệp, đúng tiến độ, dọn dẹp sạch sẽ sau khi hoàn thành. Sản phẩm chắc chắn, vận hành êm. Chủ cửa hàng tư vấn thật tâm, không ép mua. Sẽ quay lại khi có nhu cầu.",
  },
  {
    name: "Tien My Vo",
    initial: "T",
    color: "bg-amber-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Năm ngoái mình đặt cửa ở đây, sài bền tới nay, nhân viên hỗ trợ nhiệt tình, cần sửa chữa cũng nhanh chóng.",
  },
  {
    name: "Phan Thị Hồng Nhung",
    initial: "P",
    color: "bg-violet-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Gia đình mình đã lắp cửa cuốn tại Hưng Thành Phát Door và rất hài lòng. Đội ngũ thi công chuyên nghiệp, đúng tiến độ, dọn dẹp sạch sẽ. Sản phẩm chắc chắn, vận hành êm và sử dụng được rất lâu dài. Chủ cửa hàng tư vấn tận tâm và chân thật.",
  },
  {
    name: "Mai Hugh",
    initial: "M",
    color: "bg-rose-500",
    date: "Tháng 5/2026",
    stars: 5,
    body: "Cửa hàng uy tín, sản phẩm chất lượng tốt, lắp đặt nhanh gọn và đúng hẹn. Nhân viên tư vấn nhiệt tình, giá cả hợp lý. Rất hài lòng.",
  },
];

/** The listing's reviews tab on Google Maps. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door/@10.0485097,105.7548479,17z/data=!4m8!3m7!1s0x31a08946f6a96a07:0xb1d3630ae8534a1b!8m2!3d10.0485044!4d105.7574228!9m1!1b1!16s%2Fg%2F11lwgjdghy?entry=ttu";

/**
 * As shown on the Maps listing, checked 10/11/2026. Update it when the listing
 * changes: the ad landing pages print it as a fact.
 */
export const GOOGLE_RATING = { score: "5.0", count: 23 } as const;
