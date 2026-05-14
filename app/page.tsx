import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

// Dynamically import below-fold sections to split JS bundle and speed up initial load
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Products = dynamic(() => import("@/components/sections/Products").then((m) => m.Products));
const Process = dynamic(() => import("@/components/sections/Process").then((m) => m.Process));
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((m) => m.Gallery));
const QuoteAndContact = dynamic(() =>
  import("@/components/sections/QuoteAndContact").then((m) => m.QuoteAndContact)
);
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <Process />
        <Gallery />
        <QuoteAndContact />
      </main>
      <Footer />
    </>
  );
}
