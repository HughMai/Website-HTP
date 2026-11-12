import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site-data";

/**
 * Privacy policy (Chính sách bảo mật thông tin cá nhân).
 *
 * Written 2026-11-07 as the minimum disclosure before the Google Ads tag goes
 * live (Enki runbook htp/ads/SETUP-RUNBOOK.md, G5a). Wording is a DRAFT for the
 * lawyer's PDPL check (Law 91/2025, Decree 356/2025; runbook G6) — keep it in
 * step with what the site actually does: if a tag, a recipient or remarketing
 * changes, change this page the same day.
 *
 * Recipients listed are the real ones in app/api/contact/route.ts (Telegram,
 * Resend email, the CRM) plus the tags in components/Analytics.tsx.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";
const UPDATED = "07/11/2026";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật",
  description: `Cách ${SITE.brand} thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng khi liên hệ báo giá.`,
  alternates: { canonical: `${siteUrl}/chinh-sach-bao-mat` },
};

const sections: { h: string; p: (string | string[])[] }[] = [
  {
    h: "1. Ai chịu trách nhiệm về thông tin của bạn",
    p: [
      `${SITE.legalName} (${SITE.brand}), địa chỉ ${SITE.address}.`,
      `Liên hệ về thông tin cá nhân: ${SITE.hotlines.join(" hoặc ")}, email ${SITE.email}.`,
    ],
  },
  {
    h: "2. Thông tin chúng tôi thu thập",
    p: [
      [
        "Khi bạn gửi form báo giá: số điện thoại (số Zalo), và họ tên, email, nội dung yêu cầu nếu bạn ghi; với form chỉ ghi số Zalo, tên lấy từ hồ sơ Zalo của bạn.",
        "Khi bạn gọi điện hoặc nhắn Zalo: số điện thoại, tên Zalo và nội dung trao đổi.",
        "Khi bạn xem website: trang đã xem, thiết bị, trình duyệt, vị trí gần đúng (theo thành phố) và mã nhấp quảng cáo nếu bạn đến từ quảng cáo Google, qua cookie và công cụ đo lường của Google.",
      ],
    ],
  },
  {
    h: "3. Chúng tôi dùng thông tin để làm gì",
    p: [
      [
        "Gửi catalog và báo giá qua Zalo tới số bạn ghi, ngay khi bạn bấm Nhận báo giá.",
        "Liên hệ lại, khảo sát, báo giá và thực hiện đơn hàng bạn yêu cầu.",
        "Chăm sóc sau lắp đặt và bảo hành.",
        "Đo lường xem khách biết đến chúng tôi qua kênh nào (ví dụ quảng cáo Google) để chi tiêu quảng cáo hợp lý.",
      ],
      "Chúng tôi không bán thông tin của bạn, không dùng để gửi tin nhắn hàng loạt, và hiện không dùng quảng cáo bám đuổi (remarketing) hay cá nhân hóa quảng cáo.",
    ],
  },
  {
    h: "4. Ai có thể nhận thông tin",
    p: [
      [
        "Google (Google Analytics, Google Ads): số liệu truy cập và chuyển đổi, không gồm họ tên hay số điện thoại của bạn.",
        "Vercel: máy chủ lưu trữ website.",
        "Telegram và Resend: chuyển thông báo yêu cầu báo giá đến điện thoại và email của gia đình chủ cửa hàng.",
        "Hệ thống quản lý khách hàng nội bộ của Hưng Thành Phát.",
        "Zalo (VNG): khi bạn nhắn tin qua Zalo, và khi chúng tôi gửi catalog, báo giá qua Zalo tới số bạn ghi trên form.",
      ],
      "Một số nhà cung cấp trên đặt máy chủ ngoài Việt Nam, nên thông tin có thể được xử lý ở nước ngoài.",
    ],
  },
  {
    h: "5. Lưu trữ bao lâu",
    p: [
      "Thông tin khách hàng được giữ trong thời gian cần để báo giá, thực hiện đơn hàng và bảo hành, sau đó được xóa hoặc ẩn danh khi không còn cần thiết, trừ khi pháp luật yêu cầu lưu lâu hơn (ví dụ chứng từ kế toán).",
    ],
  },
  {
    h: "6. Quyền của bạn",
    p: [
      "Bạn có thể yêu cầu xem, sửa, xóa thông tin của mình, hoặc rút lại sự đồng ý cho chúng tôi liên hệ, bằng cách gọi hoặc nhắn Zalo các số ở mục 1. Chúng tôi phản hồi trong thời hạn pháp luật quy định.",
      "Bạn có thể chặn hoặc xóa cookie trong cài đặt trình duyệt; website vẫn hoạt động bình thường.",
    ],
  },
];

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="container max-w-3xl py-16 md:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-brand md:text-4xl">
          Chính Sách Bảo Mật Thông Tin Cá Nhân
        </h1>
        <p className="mt-3 text-sm text-brand/60">Cập nhật: {UPDATED}</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-semibold text-brand">{s.h}</h2>
            {s.p.map((para, i) =>
              Array.isArray(para) ? (
                <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-brand/80">
                  {para.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mt-3 leading-relaxed text-brand/80">
                  {para}
                </p>
              )
            )}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
