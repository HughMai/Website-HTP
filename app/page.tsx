import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
// Server-side only — reading the length here keeps the 95KB project library
// out of Gallery's client bundle.
import { CONG_TRINH } from "@/lib/cong-trinh-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

const IntroAnimation = dynamic(
  () => import("@/components/IntroAnimation").then((m) => m.IntroAnimation),
  { ssr: false }
);

// Dynamically import below-fold sections to split JS bundle and speed up initial load
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Products = dynamic(() => import("@/components/sections/Products").then((m) => m.Products));
const Process = dynamic(() => import("@/components/sections/Process").then((m) => m.Process));
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials)
);
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((m) => m.Gallery));
const CtaBand = dynamic(() => import("@/components/sections/CtaBand").then((m) => m.CtaBand));
const ServiceAreas = dynamic(() =>
  import("@/components/sections/ServiceAreas").then((m) => m.ServiceAreas)
);
const QuoteAndContact = dynamic(() =>
  import("@/components/sections/QuoteAndContact").then((m) => m.QuoteAndContact)
);
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function HomePage() {
  return (
    <>
      <IntroAnimation />
      <div id="page-root">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <CtaBand source="Sau mục sản phẩm" />
        <Process />
        <Gallery projectCount={CONG_TRINH.length} />
        <Testimonials />
        <CtaBand
          title="Xem xong rồi — giờ cần con số cụ thể?"
          subtitle="Nhập kích thước để tự ước tính, hoặc để lại số để thợ báo giá chính xác theo công trình."
          source="Trước mục báo giá"
        />
        <ServiceAreas />
        <QuoteAndContact />
      </main>
      <Footer />
      </div>
    </>
  );
}
