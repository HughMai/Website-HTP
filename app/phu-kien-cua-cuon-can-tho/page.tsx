import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Bell,
  Clock,
  KeyRound,
  Phone,
  RadioTower,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { CallForPrice, PriceGate } from "@/components/PriceGate";
import { Button } from "@/components/ui/button";
import { BINH_TICH_DIEN, MOTOR, PHU_KIEN } from "@/lib/bang-gia-data";
import { formatGia } from "@/lib/bang-gia-specs";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

// CLAUDE.md hard rule: this is the ONLY permitted warranty phrasing. Never a
// year count, anywhere, including inside JSON-LD strings.
const WARRANTY = "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất";

export const metadata: Metadata = {
  title: "Phụ Kiện Cửa Cuốn Cần Thơ — Motor, Remote",
  description:
    "Phụ kiện cửa cuốn Cần Thơ — motor 300–500kg, bình lưu điện, remote, khóa ngang, còi báo động. Hàng chính hãng, lắp và thay tận nơi cho mọi thương hiệu cửa. Gọi: 0963 021 639.",
  alternates: { canonical: `${siteUrl}/phu-kien-cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/phu-kien-cua-cuon-can-tho`,
    title: "Phụ Kiện Cửa Cuốn Cần Thơ — Motor, Bình Lưu Điện, Remote, Khóa",
    description:
      "Motor, bình lưu điện, remote và khóa cửa cuốn chính hãng tại Cần Thơ. Thay tận nơi cho mọi thương hiệu. Gọi: 0963 021 639.",
    siteName: "Hưng Thành Phát Door",
    images: [
      { url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" },
    ],
  },
};

// Rows come from the CRM export (lib/bang-gia-data.ts) — the same rows as the price page
// /bang-gia-phu-kien-can-tho, so the two pages cannot drift apart. Each row's price is gated
// (components/PriceGate.tsx: "Liên hệ" calls); only the "từ" price in the FAQ is printed.
const motorTable = MOTOR.map((m) => ({ spec: m.name, use: m.dienTich }));

const accessoryTable = [
  ...BINH_TICH_DIEN.map((b) => `Bình tích điện ${b.loai}`),
  ...PHU_KIEN.map((p) => `${p.name} ${p.key === "khoa_uc" ? "cửa cuốn Úc" : "cửa cuốn tole"}`),
];

/** "cửa dưới 12m² dùng motor 300kg, cửa 12m² đến dưới 14,5m² dùng motor 400kg, …" */
const motorTiers = MOTOR.filter((m) => m.sucNang !== null)
  .map((m) => `${m.dienTich.charAt(0).toLowerCase()}${m.dienTich.slice(1)} dùng motor ${m.sucNang}`)
  .join(", ");

const motorFrom = formatGia(Math.min(...MOTOR.map((m) => m.gia)));

const parts = [
  {
    icon: Settings,
    title: "Motor cửa cuốn",
    desc: "Chọn theo tải trọng thực tế của cánh cửa, không chọn theo giá. Motor thiếu tải chạy nóng, mòn nhông và hỏng sớm — đây là lỗi thường gặp nhất khi cửa được lắp bởi thợ không đo trọng lượng cánh.",
  },
  {
    icon: BatteryCharging,
    title: "Bình lưu điện",
    desc: "Mất điện lưới thì bình tự chuyển nguồn, cửa vẫn lên xuống bình thường. Với mặt bằng kinh doanh, đây là thứ quyết định bạn có mở được cửa buổi sáng hay không.",
  },
  {
    icon: RadioTower,
    title: "Remote điều khiển",
    desc: "Thêm remote cho từng thành viên trong nhà, hoặc thay remote đã mất. Chúng tôi cài mã cho phần lớn dòng motor phổ biến, kể cả cửa không do bên mình lắp.",
  },
  {
    icon: KeyRound,
    title: "Khóa ngang",
    desc: "Chốt cơ khí khóa cánh cửa vào ray. Lớp bảo vệ độc lập với motor — vẫn giữ được cửa khi mất điện hoàn toàn hoặc khi motor bị vô hiệu hóa.",
  },
  {
    icon: Bell,
    title: "Hệ thống dừng & còi báo động",
    desc: "Cảm biến dừng khi có vật cản dưới cánh cửa, và còi báo khi cửa bị cạy. Nên lắp cho nhà có trẻ nhỏ hoặc mặt bằng để hàng hóa qua đêm.",
  },
  {
    icon: ShieldCheck,
    title: "Lắp cho mọi thương hiệu cửa",
    desc: "Chúng tôi thay motor và phụ kiện cho cả cửa không phải do Hưng Thành Phát lắp. Mang theo hoặc chụp ảnh cụm motor cũ, bên mình tư vấn loại thay phù hợp.",
  },
];

const signs = [
  "Cửa lên xuống chậm hơn trước, hoặc khựng giữa chừng",
  "Motor kêu to, nóng bất thường sau vài lần đóng mở",
  "Remote phải bấm nhiều lần, hoặc chỉ ăn ở khoảng cách rất gần",
  "Mất điện là cửa đứng im — bình lưu điện đã chai hoặc chưa từng có",
  "Cửa tự trôi xuống vài phân sau khi dừng",
];

const faqItems = [
  {
    question: "Thay motor cửa cuốn ở Cần Thơ giá bao nhiêu?",
    answer:
      `Motor kèm remote từ ${motorFrom}đ (loại 300kg), chưa bao gồm VAT và công lắp đặt. Giá phụ thuộc tải trọng cánh cửa, nên chúng tôi đo trọng lượng thực tế trước khi báo giá. Ghi số Zalo để nhận bảng giá motor & phụ kiện đầy đủ, hoặc gọi ${SITE.hotlines[0]}.`,
  },
  {
    question: "Motor cửa cuốn loại nào phù hợp với nhà tôi?",
    // Same rule the CRM uses to pick the tier (pricing.resolve_motor_label) — by area, because a
    // bigger door is a heavier door. The old copy said "not by area", contradicting the price page.
    answer: `Tải motor chọn theo diện tích cửa, vì cửa càng rộng, càng cao thì cánh càng nặng: ${motorTiers}. Cửa nan dày hoặc tấm liền nặng hơn thường thì chúng tôi kiểm tra trọng lượng thực tế trước khi chốt. Lắp motor thiếu tải là nguyên nhân phổ biến nhất khiến cửa hỏng sớm.`,
  },
  {
    question: "Cửa cuốn không phải do Hưng Thành Phát lắp có thay phụ kiện được không?",
    answer:
      "Được. Chúng tôi thay motor, bình lưu điện, remote và khóa ngang cho mọi thương hiệu cửa cuốn tại Cần Thơ. Bạn chụp ảnh cụm motor và ray cửa gửi qua Zalo, bên mình xác định loại thay phù hợp trước khi tới.",
  },
  {
    question: "Bình lưu điện cửa cuốn dùng được bao lâu khi mất điện?",
    answer:
      "Tùy dung lượng bình và trọng lượng cửa, nhưng bình còn tốt thường đủ cho nhiều lượt đóng mở trong một lần mất điện — đủ dùng cho một ngày kinh doanh bình thường. Bình đã chai thường chỉ còn một hai lượt, đó là dấu hiệu cần thay.",
  },
  {
    question: "Mất remote cửa cuốn thì làm sao?",
    answer:
      "Chúng tôi cài mã remote mới cho phần lớn dòng motor phổ biến tại Cần Thơ. Nếu remote cũ bị mất chứ không phải hỏng, nên xóa mã cũ khi cài remote mới để người nhặt được không mở được cửa.",
  },
  {
    question: "Phụ kiện cửa cuốn có bảo hành không?",
    answer: `${WARRANTY} cho motor và phụ kiện chính hãng. Trong thời gian bảo hành, chúng tôi sửa chữa hoặc thay thế tại nơi lắp đặt.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/phu-kien-cua-cuon-can-tho#service`,
      name: "Phụ Kiện Cửa Cuốn Cần Thơ",
      serviceType: "Cung cấp và lắp đặt phụ kiện cửa cuốn",
      description:
        "Cung cấp, lắp đặt và thay thế motor, bình lưu điện, remote, khóa ngang và hệ thống báo động cho cửa cuốn tại Cần Thơ. Nhận thay cho mọi thương hiệu cửa.",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": siteUrl,
        name: SITE.brand,
        telephone: SITE.hotlines[0].replace(/\s/g, ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: "235-237 Võ Văn Kiệt",
          addressLocality: "Bình Thủy",
          addressRegion: "Cần Thơ",
          addressCountry: "VN",
        },
      },
      areaServed: [{ "@type": "City", name: "Cần Thơ" }],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/phu-kien-cua-cuon-can-tho#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang Chủ", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Phụ Kiện Cửa Cuốn Cần Thơ",
          item: `${siteUrl}/phu-kien-cua-cuon-can-tho`,
        },
      ],
    },
  ],
};

export default function PhuKienCuaCuonCanTho() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Thay tận nơi — kể cả cửa không do bên mình lắp
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Phụ Kiện Cửa Cuốn Cần Thơ —{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                Motor, Bình Lưu Điện, Remote, Khóa
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Hàng chính hãng, chọn đúng tải trọng cửa, lắp và thay tận nơi trong
              ngày. Khảo sát miễn phí trước khi báo giá.
            </p>
            <ZaloQuoteCard source="Phụ kiện cửa cuốn Cần Thơ · đầu trang" className="mx-auto mt-8 max-w-md" />
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90">
                <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  Gọi {SITE.hotlines[0]}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
              >
                <Link href="/bang-gia-phu-kien-can-tho">
                  Xem bảng giá đầy đủ
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4" aria-hidden />
              {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* What we supply */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-brand md:text-3xl">
                Phụ kiện cửa cuốn chúng tôi cung cấp và thay
              </h2>
              <p className="mt-3 text-base text-brand/70">
                Phần lớn sự cố cửa cuốn không nằm ở cánh cửa mà ở cụm motor và
                phụ kiện. Thay đúng loại thì cửa chạy lại như mới.
              </p>
            </div>

            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {parts.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-7 w-7 text-brand" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-brand">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand/70">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-brand md:text-3xl">
                Giá motor và phụ kiện
              </h2>
              <p className="mt-3 text-sm text-brand/60">
                Giá theo bộ, chưa bao gồm VAT và công lắp đặt
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-brand">Motor + Remote</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Loại motor</th>
                      <th className="px-4 py-3 text-left font-semibold">Phù hợp với</th>
                      <th className="px-4 py-3 text-right font-semibold">Giá (đ/bộ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-white">
                    {motorTable.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3 font-medium text-brand">{row.spec}</td>
                        <td className="px-4 py-3 text-brand/70">{row.use}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          <CallForPrice />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-brand">Bình tích điện &amp; khóa ngang</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[320px] text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Phụ kiện</th>
                      <th className="px-4 py-3 text-right font-semibold">Giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-white">
                    {accessoryTable.map((spec) => (
                      <tr key={spec}>
                        <td className="px-4 py-3 font-medium text-brand">{spec}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          <CallForPrice />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <PriceGate source="Phụ kiện cửa cuốn Cần Thơ · bảng giá" />

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <p className="mb-1 font-semibold">Lưu ý</p>
              <ul className="list-inside list-disc space-y-1 text-amber-800">
                <li>Giá chưa bao gồm VAT và công lắp đặt</li>
                <li>{WARRANTY}</li>
                <li>
                  Giá có thể thay đổi theo thời điểm — xem{" "}
                  <Link
                    href="/bang-gia-phu-kien-can-tho"
                    className="font-semibold underline underline-offset-2"
                  >
                    bảng giá motor &amp; phụ kiện đầy đủ
                  </Link>{" "}
                  hoặc gọi để nhận giá cập nhật
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* When to replace */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-brand md:text-3xl">
              Khi nào nên thay motor hoặc phụ kiện?
            </h2>
            <p className="mt-3 text-base text-brand/70">
              Nếu cửa nhà bạn có một trong các dấu hiệu dưới đây, nên kiểm tra
              sớm — thay một cụm rẻ hơn nhiều so với thay cả cánh cửa.
            </p>
            <ul className="mt-6 space-y-3">
              {signs.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl border border-brand/10 bg-white p-4 text-sm text-brand/80"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                  />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brand/70">
              Cần sửa chữa chứ không chỉ thay phụ kiện?{" "}
              <Link
                href="/sua-chua-cua-cuon-can-tho"
                className="font-semibold text-brand underline underline-offset-4"
              >
                Xem dịch vụ sửa chữa cửa cuốn Cần Thơ
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-brand md:text-3xl">
              Câu Hỏi Thường Gặp
            </h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-brand/10 bg-white p-6"
                >
                  <h3 className="font-semibold text-brand">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand/70">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand source="Phụ kiện cửa cuốn Cần Thơ" />
      </main>
      <Footer />
    </>
  );
}
