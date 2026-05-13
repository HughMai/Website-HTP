import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { QuoteAndContact } from "@/components/sections/QuoteAndContact";
import { Footer } from "@/components/sections/Footer";

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
