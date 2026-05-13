import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { FloatingContact } from "@/components/FloatingContact";
import { SITE } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: {
    default:
      "Cửa Cuốn, Nhôm Kính, Cửa Kéo Cần Thơ | Hưng Thành Phát Door",
    template: "%s | Hưng Thành Phát Door",
  },
  description:
    "Thi công cửa cuốn, cửa nhôm kính & cửa kéo tại Cần Thơ. 15+ năm, 500+ dự án, bảo hành 10 năm. Gọi: 0945 042 345.",
  keywords: [
    "cửa cuốn Cần Thơ",
    "cửa nhôm kính Cần Thơ",
    "cửa kéo Cần Thơ",
    "cửa cuốn gần đây",
    "cửa kéo gần đây",
    "lắp đặt cửa cuốn Cần Thơ",
    "lắp đặt cửa nhôm kính Cần Thơ",
    "cửa cuốn Bình Thủy",
    "cửa nhôm kính Bình Thủy Cần Thơ",
    "sửa cửa cuốn Cần Thơ",
    "báo giá cửa cuốn Cần Thơ",
    "cửa cuốn giá rẻ Cần Thơ",
    "Hưng Thành Phát Door",
    "cửa cao cấp Cần Thơ",
  ],
  authors: [{ name: "Hưng Thành Phát Door" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    title:
      "Hưng Thành Phát Door — Cửa Cuốn, Cửa Nhôm Kính, Cửa Kéo Cần Thơ",
    description:
      "Bảo vệ tổ ấm của bạn với hệ thống cửa cuốn, cửa nhôm kính và cửa kéo cao cấp tại Cần Thơ — bảo hành đến 10 năm. Hotline: 0913 574 077.",
    siteName: "Hưng Thành Phát Door",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Hưng Thành Phát Door — Cửa Cuốn, Cửa Nhôm Kính, Cửa Kéo Cần Thơ",
    description:
      "Chuyên thi công cửa cuốn, cửa nhôm kính và cửa kéo cao cấp tại Cần Thơ. Bảo hành 10 năm. Hotline: 0913 574 077.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A2540",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": siteUrl,
  name: SITE.brand,
  description:
    "Chuyên thi công cửa cuốn, cửa nhôm kính và cửa kéo cao cấp tại Cần Thơ. 15+ năm kinh nghiệm, bảo hành đến 10 năm.",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  sameAs: [
    "https://www.facebook.com/profile.php?id=100041851129169",
    "https://zalo.me/0945042345",
  ],
  telephone: SITE.hotlines[0].replace(/\s/g, ""),
  email: SITE.email,
  foundingDate: String(SITE.foundedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: "235-237 Võ Văn Kiệt",
    addressLocality: "Bình Thủy",
    addressRegion: "Cần Thơ",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.mapCoords.lat,
    longitude: SITE.mapCoords.lng,
  },
  hasMap: SITE.mapDirectionsUrl,
  areaServed: [
    { "@type": "City", name: "Cần Thơ" },
    { "@type": "AdministrativeArea", name: "Đồng bằng sông Cửu Long" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "1",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "17:30",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.hotlines[0].replace(/\s/g, ""),
      contactType: "customer service",
      availableLanguage: "Vietnamese",
      areaServed: "VN",
    },
    {
      "@type": "ContactPoint",
      telephone: SITE.hotlines[1].replace(/\s/g, ""),
      contactType: "customer service",
      availableLanguage: "Vietnamese",
      areaServed: "VN",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sản phẩm cửa cao cấp",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cửa cuốn Cần Thơ",
          description:
            "Lắp đặt và sửa chữa cửa cuốn tại Cần Thơ — nhôm đức, thép tĩnh điện, inox, tấm liền.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cửa nhôm kính Cần Thơ",
          description:
            "Thi công cửa nhôm kính, hệ mặt dựng, lan can cầu thang tại Cần Thơ.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cửa kéo Cần Thơ",
          description:
            "Lắp đặt cửa kéo thép, nhôm, inox cho mặt tiền kinh doanh tại Cần Thơ.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: SITE.brand,
  url: siteUrl,
  inLanguage: "vi",
  publisher: { "@id": siteUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <FloatingContact />
        <Toaster />
      </body>
    </html>
  );
}
