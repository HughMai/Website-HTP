import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "Hưng Thành Phát Door — Giải Pháp Cửa Cao Cấp Cho Mọi Công Trình",
    template: "%s | Hưng Thành Phát Door",
  },
  description:
    "Chuyên thi công cửa cuốn, cửa nhôm kính và cửa kéo cao cấp. 15+ năm kinh nghiệm, 500+ dự án, bảo hành đến 10 năm. Tư vấn báo giá miễn phí trong 24 giờ.",
  keywords: [
    "cửa cuốn",
    "cửa nhôm kính",
    "cửa kéo",
    "Hưng Thành Phát Door",
    "cửa cao cấp",
    "lắp đặt cửa TP HCM",
  ],
  authors: [{ name: "Hưng Thành Phát Door" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Hưng Thành Phát Door — Giải Pháp Cửa Cao Cấp",
    description:
      "Bảo vệ tổ ấm của bạn với hệ thống cửa cuốn, cửa nhôm kính và cửa kéo cao cấp — bảo hành đến 10 năm.",
    siteName: "Hưng Thành Phát Door",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A2540",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
