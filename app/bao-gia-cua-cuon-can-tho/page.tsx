import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Báo Giá Cửa Cuốn Cần Thơ 2026 — Giá Gốc",
  description:
    "Bảng giá cửa cuốn Cần Thơ 2026 — tole Đài Loan, công nghệ Đức, Inox, CN Úc. Giá tính theo m², motor và phụ kiện riêng. Chưa bao gồm VAT. Gọi báo giá: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/bao-gia-cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/bao-gia-cua-cuon-can-tho`,
    title: "Báo Giá Cửa Cuốn Cần Thơ 2026 — Giá Gốc",
    description: "Bảng giá cửa cuốn tole, nhôm Đức, Inox tại Cần Thơ. Chưa VAT. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};


const WARRANTY = "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất";

const cuaCuonTables = [
  {
    title: "Cửa Cuốn Tole Màu",
    unit: "đ/m² (cửa từ 8m² trở lên)",
    rows: [
      { spec: "Tole 6 zem", price: "500.000" },
      { spec: "Tole 8 zem", price: "560.000" },
      { spec: "Tole 1 ly",  price: "780.000" },
    ],
    note: "Cửa dưới 8m² cộng thêm 20.000–50.000 đ/m²",
  },
  {
    title: "Cửa Cuốn Inox",
    unit: "đ/m² (cửa từ 8m² trở lên)",
    rows: [
      { spec: "Inox 6 zem", price: "1.700.000" },
      { spec: "Inox 8 zem", price: "1.900.000" },
    ],
    note: "Cửa dưới 8m² cộng thêm theo thực tế",
  },
  {
    title: "Cửa Cuốn Công Nghệ Đức",
    unit: "đ/m²",
    rows: [
      { spec: "Mã KV 380R", price: "1.450.000" },
      { spec: "Mã KV 422R", price: "1.750.000" },
      { spec: "Mã KV 468R", price: "2.150.000" },
      { spec: "Mã CT 5222R", price: "2.200.000" },
      { spec: "Mã MT 5222R", price: "2.300.000" },
    ],
    note: "Giá tính theo diện tích cửa thực tế sau khi khảo sát",
  },
  {
    title: "Cửa Cuốn Công Nghệ Úc",
    unit: "đ/m²",
    rows: [
      { spec: "Tole màu 5.2 zem",       price: "700.000" },
      { spec: "Tole màu 5.2 zem Blusc", price: "900.000" },
    ],
    note: "Cửa Úc cộng thêm 600đ/bộ phụ kiện",
  },
];

const motorTable = [
  { spec: "Motor + Remote 300kg", price: "3.300.000" },
  { spec: "Motor + Remote 400kg", price: "3.500.000" },
  { spec: "Motor + Remote 500kg", price: "4.000.000" },
  { spec: "Motor + Remote Cửa Úc", price: "4.500.000" },
];

const accessoryTable = [
  { spec: "Khóa ngang cửa cuốn tole",  price: "350.000" },
  { spec: "Khóa ngang cửa cuốn Úc",    price: "450.000" },
];

const faqItems = [
  {
    question: "Giá cửa cuốn Cần Thơ tính như thế nào?",
    answer: "Giá cửa cuốn tính theo m² diện tích cửa (chiều rộng × chiều cao). Motor, remote và phụ kiện tính riêng. Cửa dưới 8m² cộng thêm phụ phí. Giá trên chưa bao gồm VAT.",
  },
  {
    question: "Motor có bắt buộc phải mua kèm không?",
    answer: "Không bắt buộc nếu bạn muốn cửa vận hành thủ công. Tuy nhiên phần lớn khách hàng chọn lắp motor để tiện sử dụng. Motor được báo giá riêng theo tải trọng cửa.",
  },
  {
    question: "Giá đã bao gồm lắp đặt chưa?",
    answer: "Giá trên là giá vật tư. Chi phí lắp đặt được tính riêng và thông báo sau khi khảo sát thực tế. Liên hệ để được báo giá trọn gói.",
  },
  {
    question: "Bảo hành cửa cuốn như thế nào?",
    answer: `${WARRANTY}. Trong thời gian bảo hành, chúng tôi sửa chữa miễn phí tại nơi lắp đặt.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/bao-gia-cua-cuon-can-tho#faq`,
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
        { "@type": "ListItem", position: 2, name: "Báo Giá Cửa Cuốn Cần Thơ", item: `${siteUrl}/bao-gia-cua-cuon-can-tho` },
      ],
    },
  ],
};

export default function BaoGiaCuaCuonCanTho() {
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Giá thật — không phụ phí ẩn — 2025
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Bảng Giá Cửa Cuốn Cần Thơ 2025 —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Giá Thật, Không Phụ Phí Ẩn
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Giá niêm yết rõ từng hạng mục — vật tư, motor, phụ kiện tính riêng, VAT ghi rõ.
              Không có "giá bẫy" rồi cộng thêm sau khi ký hợp đồng.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Gọi báo giá: {SITE.hotlines[0]}
                </Button>
              </a>
              <Link href="/#bao-gia">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  Công cụ ước tính giá
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" /> {SITE.workingHours}
            </p>
          </div>
        </section>

        {/* Price tables */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bảng Giá Cửa Cuốn</h2>
              <p className="mt-3 text-sm text-muted-foreground">Giá tính theo m² — chưa bao gồm motor, phụ kiện và VAT</p>
            </div>

            {cuaCuonTables.map((table) => (
              <div key={table.title}>
                <h3 className="mb-1 font-semibold text-brand">{table.title}</h3>
                <p className="mb-3 text-xs text-muted-foreground">Đơn vị: {table.unit}</p>
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Loại</th>
                        <th className="px-4 py-3 text-right font-semibold">Đơn giá (đ/m²)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {table.rows.map((row) => (
                        <tr key={row.spec}>
                          <td className="px-4 py-3">{row.spec}</td>
                          <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">* {table.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motor & accessories */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Motor & Phụ Kiện</h2>
              <p className="mt-3 text-sm text-muted-foreground">Giá tính theo bộ — chọn motor phù hợp tải trọng cửa</p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-brand">Motor + Remote</h3>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Loại motor</th>
                      <th className="px-4 py-3 text-right font-semibold">Giá (đ/bộ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {motorTable.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3">{row.spec}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-brand">Phụ Kiện</h3>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Phụ kiện</th>
                      <th className="px-4 py-3 text-right font-semibold">Giá (đ/bộ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {accessoryTable.map((row) => (
                      <tr key={row.spec}>
                        <td className="px-4 py-3">{row.spec}</td>
                        <td className="px-4 py-3 text-right font-medium">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <p className="font-semibold mb-1">Lưu ý quan trọng</p>
              <ul className="space-y-1 list-disc list-inside text-amber-800">
                <li>Giá trên chưa bao gồm VAT</li>
                <li>Cửa dưới 8m² cộng thêm 20.000–50.000 đ/m²</li>
                <li>Chi phí lắp đặt và vận chuyển tính riêng</li>
                <li>{WARRANTY}</li>
                <li>Giá có thể thay đổi theo thời điểm — liên hệ để nhận giá cập nhật nhất</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Câu Hỏi Thường Gặp</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-2 font-semibold">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other price pages */}
        <section className="bg-muted/30 py-12">
          <div className="container max-w-3xl">
            <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-brand/60">Xem thêm bảng giá</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/bang-gia-cua-keo-can-tho" className="flex items-center justify-between rounded-xl border bg-background p-5 hover:bg-brand/5">
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Cửa Kéo</p>
                  <p className="text-sm text-muted-foreground">Cửa kéo có láu & không láu</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
              <Link href="/bang-gia-cua-nhom-kinh-can-tho" className="flex items-center justify-between rounded-xl border bg-background p-5 hover:bg-brand/5">
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Cửa Nhôm Kính</p>
                  <p className="text-sm text-muted-foreground">Nhôm Việt, nhôm nhập, Maxpro, lan can</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-20">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Nhận Báo Giá Trọn Gói — Không Phụ Phí Ẩn</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Kỹ thuật viên đến đo đạc tại nhà miễn phí, báo giá chi tiết từng hạng mục. Lắp xong mới thanh toán.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" /> {SITE.hotlines[0]}
                </Button>
              </a>
              <a href={`tel:${SITE.hotlines[1].replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand">
                  <Phone className="h-4 w-4" /> {SITE.hotlines[1]}
                </Button>
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" />{SITE.address}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
