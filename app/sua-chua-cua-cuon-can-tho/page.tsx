import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Sửa Chữa Cửa Cuốn, Cửa Kéo & Nhôm Kính Cần Thơ",
  description:
    "Sửa chữa cửa cuốn, cửa kéo, cửa nhôm kính tại Cần Thơ — motor cháy, lệch ray, kính vỡ, bản lề lỏng. Đến tận nơi trong ngày, báo giá minh bạch. Gọi: 0945 042 345.",
  alternates: { canonical: `${siteUrl}/sua-chua-cua-cuon-can-tho` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/sua-chua-cua-cuon-can-tho`,
    title: "Sửa Chữa Cửa Cuốn, Cửa Kéo & Nhôm Kính Cần Thơ",
    description:
      "Sửa cửa cuốn, cửa kéo, nhôm kính tại Cần Thơ. Đến tận nơi trong ngày. Gọi: 0945 042 345.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const issueGroups = [
  {
    id: "cua-cuon",
    label: "Cửa Cuốn",
    color: "bg-brand/5 border-brand/20",
    headingColor: "text-brand",
    issues: [
      {
        icon: "⚡",
        title: "Motor cháy / quá tải",
        desc: "Nhấn remote không phản hồi hoặc nghe tiếng kêu lạ từ hộp motor — cần kiểm tra cuộn dây, tụ điện và bo mạch điều khiển.",
      },
      {
        icon: "📡",
        title: "Remote mất tín hiệu",
        desc: "Nhấn remote không phản ứng dù đã thay pin — thường do lập trình bị xóa hoặc bo mạch thu phát lỗi.",
      },
      {
        icon: "🔄",
        title: "Cửa lệch ray / kẹt",
        desc: "Cửa bị cọ hoặc kẹt khi lên/xuống — cần chỉnh lại ray dẫn hướng, con lăn và gia cố khung.",
      },
      {
        icon: "🌀",
        title: "Lò xo gãy / giảm lực",
        desc: "Cửa nặng bất thường, motor quá tải sớm — lò xo cân bằng đã yếu hoặc gãy, cần thay mới đúng tải trọng.",
      },
      {
        icon: "🔋",
        title: "Bình lưu điện hỏng",
        desc: "Cửa không hoạt động khi mất điện — bình lưu cạn hoặc không nhận sạc, cần kiểm tra và thay thế.",
      },
      {
        icon: "🔩",
        title: "Dây cuốn mòn / đứt",
        desc: "Cửa cuốn không đều hoặc mép nhăn — cần thay dây cuốn kịp thời tránh đứt đột ngột nguy hiểm.",
      },
    ],
  },
  {
    id: "cua-keo",
    label: "Cửa Kéo",
    color: "bg-amber-50/60 border-amber-200",
    headingColor: "text-amber-700",
    issues: [
      {
        icon: "🛤️",
        title: "Ray cong / lệch",
        desc: "Cửa kéo bị kẹt hoặc nặng tay khi mở — ray bị cong do va đập hoặc hàn yếu, cần nắn chỉnh hoặc thay mới.",
      },
      {
        icon: "⚙️",
        title: "Con lăn mòn / kẹt",
        desc: "Cửa di chuyển khó khăn, nghe tiếng cọ kim loại — con lăn mòn hoặc bụi bẩn tích tụ, cần vệ sinh và thay mới.",
      },
      {
        icon: "🔐",
        title: "Khóa ngang lỏng / hỏng",
        desc: "Khóa ngang không chốt được hoặc bị rơ lỏng — ảnh hưởng an ninh trực tiếp, cần sửa hoặc thay khóa mới.",
      },
      {
        icon: "🔧",
        title: "Thanh U vặn / biến dạng",
        desc: "Cửa bị méo hoặc không đóng thẳng — thanh U bị uốn cong do lực tác động mạnh, cần gia cố hoặc thay khung.",
      },
      {
        icon: "🦀",
        title: "Phụ kiện rỉ sét",
        desc: "Bu-lông, ốc vít, bản lề bị rỉ sét sau thời gian dài — cần thay thế trước khi gây hỏng kết cấu lan rộng.",
      },
      {
        icon: "🔗",
        title: "Mối hàn gãy / nứt",
        desc: "Khung cửa bị tách mối hàn do rung động tích lũy hoặc va đập — cần hàn gia cố lại ngay để đảm bảo an toàn.",
      },
    ],
  },
  {
    id: "cua-nhom-kinh",
    label: "Cửa Nhôm Kính",
    color: "bg-sky-50/60 border-sky-200",
    headingColor: "text-sky-700",
    issues: [
      {
        icon: "🪟",
        title: "Kính vỡ / nứt",
        desc: "Kính bị vỡ do va đập hoặc nứt ứng suất nhiệt — cần thay kính cắt theo kích thước thực tế, đảm bảo đúng độ dày và loại kính.",
      },
      {
        icon: "🔩",
        title: "Bản lề lỏng / gãy",
        desc: "Cửa bị chảy xệ hoặc cạo sàn khi đóng mở — bản lề bị lỏng hoặc gãy, cần siết chặt hoặc thay mới đúng loại.",
      },
      {
        icon: "💧",
        title: "Gioăng cao su bong / rách",
        desc: "Gió lùa hoặc nước mưa thấm vào — gioăng cao su xung quanh kính bị lão hóa, cần thay toàn bộ để phục hồi khả năng cách âm, cách nhiệt.",
      },
      {
        icon: "🔑",
        title: "Khóa cửa nhôm kẹt / hỏng",
        desc: "Khóa không vào khớp hoặc tay khóa bị cứng — cần tra dầu, chỉnh vị trí khớp cài hoặc thay bộ khóa mới.",
      },
      {
        icon: "📐",
        title: "Thanh nhôm cong / trầy xước",
        desc: "Khung nhôm bị cong do va đập làm cửa không đóng kín — cần nắn chỉnh hoặc thay thanh nhôm mới đúng profile.",
      },
      {
        icon: "🌊",
        title: "Ron nước lão hóa / thấm dột",
        desc: "Nước mưa thấm vào khe cửa dù đã đóng kín — ron silicone và ron EPDM bị lão hóa sau 3–5 năm cần bơm lại hoặc thay mới.",
      },
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Gọi hoặc nhắn tin báo sự cố",
    desc: "Mô tả triệu chứng — kỹ thuật viên tư vấn sơ bộ qua điện thoại và ước tính chi phí ngay lập tức.",
  },
  {
    num: "02",
    title: "Kỹ thuật viên đến kiểm tra",
    desc: "Đội kỹ thuật có mặt trong ngày tại Cần Thơ, mang đủ phụ kiện phổ biến để xử lý ngay tại chỗ.",
  },
  {
    num: "03",
    title: "Báo giá minh bạch — xác nhận sửa",
    desc: "Kiểm tra xong báo giá rõ ràng trước khi tiến hành. Khách đồng ý mới sửa — không phát sinh ẩn.",
  },
  {
    num: "04",
    title: "Bàn giao & bảo hành",
    desc: "Chạy thử trước mặt khách, ký phiếu bảo hành. Nếu phát sinh lại trong thời gian bảo hành, chúng tôi đến sửa miễn phí.",
  },
];

const pricingGroups = [
  {
    label: "Cửa Cuốn",
    rows: [
      { item: "Sửa / lập trình lại remote", range: "100.000 – 300.000 đ" },
      { item: "Chỉnh ray, con lăn lệch", range: "200.000 – 500.000 đ" },
      { item: "Thay lò xo cân bằng", range: "300.000 – 700.000 đ" },
      { item: "Sửa motor (cuộn dây, tụ, bo mạch)", range: "300.000 – 1.500.000 đ" },
      { item: "Thay motor nhập khẩu mới", range: "1.500.000 – 4.000.000 đ" },
      { item: "Thay bình lưu điện", range: "400.000 – 900.000 đ" },
      { item: "Thay dây cuốn", range: "200.000 – 600.000 đ" },
    ],
  },
  {
    label: "Cửa Kéo",
    rows: [
      { item: "Chỉnh / nắn ray lệch", range: "150.000 – 400.000 đ" },
      { item: "Thay con lăn (1 bộ)", range: "100.000 – 300.000 đ" },
      { item: "Sửa / thay khóa ngang", range: "200.000 – 500.000 đ" },
      { item: "Hàn / gia cố khung kéo", range: "300.000 – 800.000 đ" },
      { item: "Thay phụ kiện rỉ sét", range: "200.000 – 600.000 đ" },
    ],
  },
  {
    label: "Cửa Nhôm Kính",
    rows: [
      { item: "Thay kính vỡ (kính đơn, cắt theo kích thước)", range: "300.000 – 1.200.000 đ/tấm" },
      { item: "Sửa / thay bản lề lỏng", range: "150.000 – 400.000 đ" },
      { item: "Thay gioăng cao su toàn bộ cửa", range: "200.000 – 500.000 đ" },
      { item: "Sửa / thay khóa cửa nhôm", range: "200.000 – 600.000 đ" },
      { item: "Bơm lại ron silicone chống thấm", range: "150.000 – 450.000 đ" },
      { item: "Thay tay nắm / tay gạt", range: "100.000 – 350.000 đ" },
    ],
  },
];

const commitments = [
  "Đến tận nơi trong ngày tại tất cả quận huyện Cần Thơ",
  "Báo giá minh bạch trước khi sửa — không phát sinh ẩn",
  "Mang đủ phụ kiện phổ biến — xử lý ngay tại chỗ 80% sự cố",
  "Bảo hành sau sửa — phát sinh lại đến miễn phí",
  "Kỹ thuật viên được đào tạo chuyên sâu từng loại cửa",
  "Không tính phí đi lại toàn bộ Cần Thơ",
];

const districts = [
  "Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn",
  "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền",
];

const faqItems = [
  {
    question: "Sửa cửa cuốn bị lỗi motor hết bao nhiêu tiền?",
    answer:
      "Chi phí sửa motor cửa cuốn tại Cần Thơ dao động từ 300.000 đến 1.500.000 đồng tùy loại motor và mức độ hỏng hóc. Nếu cần thay motor mới, chi phí từ 1.500.000 đến 4.000.000 đồng. Chúng tôi báo giá miễn phí trước khi sửa, không phát sinh thêm.",
  },
  {
    question: "Cửa cuốn không lên được — nguyên nhân là gì?",
    answer:
      "Cửa cuốn không lên thường do 4 nguyên nhân chính: (1) Motor cháy hoặc bị kẹt — nhấn nút không có phản hồi; (2) Remote mất lập trình — nhấn remote đèn không nháy; (3) Lò xo gãy — cửa nặng bất thường dù motor còn chạy; (4) Mất điện và bình lưu điện hết. Gọi 0945 042 345 để kỹ thuật viên chẩn đoán chính xác trong ngày.",
  },
  {
    question: "Sửa cửa kéo thép bị kẹt ray mất bao lâu?",
    answer:
      "Sự cố ray lệch hoặc con lăn kẹt thường được xử lý trong 30–60 phút. Kỹ thuật viên chỉnh ray tại chỗ, thay con lăn nếu cần. Nếu phải hàn gia cố khung thì thêm 1–2 giờ tùy mức độ.",
  },
  {
    question: "Thay kính cửa nhôm hết bao nhiêu tiền?",
    answer:
      "Chi phí thay kính cửa nhôm tại Cần Thơ dao động từ 300.000 đến 1.200.000 đồng mỗi tấm tùy kích thước và loại kính (đơn, hộp, cường lực). Chúng tôi đo và cắt kính theo kích thước thực tế tại showroom.",
  },
  {
    question: "Có bảo hành sau khi sửa không?",
    answer:
      "Có. Tất cả dịch vụ sửa chữa được bảo hành — nếu phát sinh lại cùng hạng mục trong thời gian bảo hành, chúng tôi đến sửa miễn phí. Thời hạn cụ thể tùy hạng mục và linh kiện thay thế.",
  },
  {
    question: "Hưng Thành Phát Door có sửa cửa các hãng khác không?",
    answer:
      "Có. Chúng tôi sửa tất cả loại cửa cuốn, cửa kéo, cửa nhôm kính — bất kể thương hiệu hay nơi mua. Kỹ thuật viên được đào tạo đa dạng hãng motor nhập khẩu và hệ cửa nhôm kính các loại.",
  },
  {
    question: "Sửa cửa tại Bình Thủy, Ninh Kiều, Cái Răng có mất thêm phí đi lại không?",
    answer:
      "Không. Hưng Thành Phát Door phục vụ toàn bộ quận huyện Cần Thơ — Bình Thủy, Ninh Kiều, Cái Răng, Ô Môn, Thốt Nốt và 3 huyện ngoại thành — không tính phí đi lại. Chi phí chỉ tính theo hạng mục sửa chữa thực tế.",
  },
  {
    question: "Cửa nhôm kính bị thấm nước mưa phải làm gì?",
    answer:
      "Nguyên nhân phổ biến là ron silicone hoặc gioăng EPDM xung quanh kính bị lão hóa, co ngót sau 3–5 năm. Giải pháp là bơm lại ron silicone kết hợp thay gioăng cao su — chi phí thấp, xử lý trong 1–2 giờ. Nếu để lâu sẽ ảnh hưởng đến khung nhôm bên trong.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/sua-chua-cua-cuon-can-tho#service`,
      name: "Sửa Chữa Cửa Cần Thơ",
      description:
        "Dịch vụ sửa chữa cửa cuốn, cửa kéo và cửa nhôm kính chuyên nghiệp tại Cần Thơ. Đến tận nơi trong ngày, báo giá minh bạch.",
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
      areaServed: [
        { "@type": "City", name: "Cần Thơ" },
        ...districts.map((d) => ({ "@type": "AdministrativeArea", name: `${d}, Cần Thơ` })),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dịch vụ sửa chữa cửa",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa motor cửa cuốn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa remote cửa cuốn" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa cửa kéo kẹt ray" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thay kính cửa nhôm" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sửa bản lề cửa nhôm kính" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thay gioăng chống thấm" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/sua-chua-cua-cuon-can-tho#faq`,
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
          name: "Sửa Chữa Cửa Cần Thơ",
          item: `${siteUrl}/sua-chua-cua-cuon-can-tho`,
        },
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Chi phí sửa chữa cửa cuốn tại Cần Thơ là bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chi phí phụ thuộc vào loại hỏng hóc. Thay tụ điện hoặc điều chỉnh lại ray dao động 200.000–500.000đ. Thay motor mới từ 1.500.000–4.500.000đ tùy loại. Hưng Thành Phát báo giá minh bạch trước khi thi công, không phát sinh chi phí ẩn.",
      },
    },
    {
      "@type": "Question",
      name: "Sửa cửa cuốn có đến tận nơi không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Đội ngũ kỹ thuật của Hưng Thành Phát đến tận công trình tại Cần Thơ và khu vực Đồng Bằng Sông Cửu Long. Liên hệ hotline 0945 042 345 để đặt lịch, thường có mặt trong ngày.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa cuốn bị hỏng motor có sửa được không hay phải thay mới?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tùy mức độ hư hỏng. Motor cháy cuộn dây hoặc lỗi bo mạch thường phải thay mới. Tụ điện yếu, remote mất lập trình, hoặc cơ cấu cơ học bị lệch có thể sửa chữa tiết kiệm hơn. Kỹ thuật viên sẽ kiểm tra và tư vấn phương án tối ưu.",
      },
    },
    {
      "@type": "Question",
      name: "Sau khi sửa có được bảo hành không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Linh kiện thay thế chính hãng được bảo hành theo tiêu chuẩn nhà sản xuất. Hưng Thành Phát cam kết bồi thường 200% giá trị hợp đồng nếu sử dụng sai chủng loại hoặc thương hiệu đã cam kết.",
      },
    },
    {
      "@type": "Question",
      name: "Cửa cuốn bị lệch ray có nguy hiểm không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có thể gây nguy hiểm nếu không xử lý kịp thời — cửa có thể rơi hoặc kẹt bất ngờ. Nên ngừng sử dụng và liên hệ sửa chữa ngay. Đội kỹ thuật Hưng Thành Phát hỗ trợ khẩn cấp trong ngày.",
      },
    },
  ],
};

export default function SuaChuaCuaCanTho() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Dịch vụ sửa chữa — Cần Thơ
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Sửa Chữa Cửa Cuốn, Cửa Kéo &amp; Nhôm Kính{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Cần Thơ — Đến Tận Nơi
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/80 md:text-lg">
              Motor cháy, lệch ray, kính vỡ, bản lề lỏng, thấm dột — Hưng Thành Phát Door có
              mặt trong ngày tại Cần Thơ. Báo giá minh bạch trước khi sửa, bảo hành sau sửa.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[0]}
                </Button>
              </a>
              <a href={`tel:${SITE.hotlines[1].replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
                >
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[1]}
                </Button>
              </a>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5" />
              {SITE.workingHours} — Có mặt trong ngày
            </p>
          </div>
        </section>

        {/* Cam kết */}
        <section className="border-b py-10 md:py-12">
          <div className="container max-w-4xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commitments.map((c) => (
                <div key={c} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Issues by door type */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Các Sự Cố Phổ Biến Theo Loại Cửa
              </h2>
              <p className="mt-3 text-muted-foreground">
                Nhận diện đúng triệu chứng — gọi đúng dịch vụ — sửa nhanh trong ngày
              </p>
            </div>

            <div className="space-y-12">
              {issueGroups.map((group) => (
                <div key={group.id}>
                  <div className="mb-5 flex items-center gap-3">
                    <Wrench className="h-5 w-5 text-brand" />
                    <h3 className={`text-xl font-semibold ${group.headingColor}`}>
                      {group.label}
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.issues.map((issue) => (
                      <div
                        key={issue.title}
                        className={`rounded-xl border p-5 ${group.color}`}
                      >
                        <div className="mb-2 text-2xl">{issue.icon}</div>
                        <h4 className="mb-1.5 font-semibold">{issue.title}</h4>
                        <p className="text-sm text-muted-foreground">{issue.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Quy Trình Sửa Chữa 4 Bước
              </h2>
              <p className="mt-3 text-muted-foreground">Minh bạch từ kiểm tra đến bàn giao</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.num} className="rounded-xl border bg-background p-6">
                  <div className="mb-3 text-4xl font-bold text-brand/15">{step.num}</div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Tham Khảo Giá Sửa Chữa
              </h2>
              <p className="mt-3 text-muted-foreground">
                Giá dao động theo loại và mức độ hỏng hóc — báo giá chính xác tại nơi sau kiểm tra
              </p>
            </div>

            {pricingGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 font-semibold text-brand">{group.label}</h3>
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Hạng mục</th>
                        <th className="px-4 py-3 text-right font-semibold">Chi phí tham khảo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {group.rows.map((row) => (
                        <tr key={row.item}>
                          <td className="px-4 py-3">{row.item}</td>
                          <td className="px-4 py-3 text-right text-muted-foreground">{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <p className="text-center text-xs text-muted-foreground">
              * Giá chưa bao gồm phụ kiện thay thế nếu cần. Kỹ thuật viên báo giá đầy đủ trước khi tiến hành.
            </p>
          </div>
        </section>

        {/* Districts */}
        <section className="bg-muted/30 py-14">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Phục Vụ Toàn Bộ Cần Thơ
            </h2>
            <p className="mt-3 text-muted-foreground">Không tính phí đi lại tất cả quận huyện</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {districts.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand"
                >
                  Sửa cửa {d}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Câu Hỏi Thường Gặp
              </h2>
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

        {/* Cross-links */}
        <section className="py-10">
          <div className="container max-w-3xl">
            <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-brand/60">
              Xem thêm dịch vụ
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/lap-dat-cua-cuon-can-tho"
                className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5"
              >
                <div>
                  <p className="font-semibold text-brand">Lắp Đặt Cửa Cuốn</p>
                  <p className="text-sm text-muted-foreground">Trọn gói, trong ngày</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
              <Link
                href="/cua-keo-thep-can-tho"
                className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5"
              >
                <div>
                  <p className="font-semibold text-brand">Cửa Kéo Thép</p>
                  <p className="text-sm text-muted-foreground">Bền, chống đột nhập</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
              <Link
                href="/bang-gia-cua-nhom-kinh-can-tho"
                className="flex items-center justify-between rounded-xl border bg-card p-5 hover:bg-brand/5"
              >
                <div>
                  <p className="font-semibold text-brand">Bảng Giá Nhôm Kính</p>
                  <p className="text-sm text-muted-foreground">Giá chính thức 2025</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cửa Bị Hỏng? Gọi Ngay — Có Mặt Trong Ngày
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Đội kỹ thuật Hưng Thành Phát Door sửa chữa tất cả loại cửa tại Cần Thơ — kiểm tra, báo giá minh bạch, sửa xong mới thanh toán.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}>
                <Button size="lg" className="bg-white text-brand hover:bg-white/90">
                  <Phone className="h-4 w-4" />
                  {SITE.hotlines[0]}
                </Button>
              </a>
              <a href={`tel:${SITE.hotlines[1].replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand"
                >
                  <Phone className="h-4 w-4" />
                  Gọi {SITE.hotlines[1]}
                </Button>
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" />
              {SITE.address}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
