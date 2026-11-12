import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdLanding } from "@/components/lp/AdLanding";
import { AD_LANDING_PAGES, getAdLanding } from "@/lib/lp-data";

// Google Ads landing pages: one per ad group, plus one per sitelink. Content: lib/lp-data.ts.
// Only the slugs listed there exist; anything else under /lp is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return AD_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getAdLanding(params.slug);
  if (!page) return {};
  return {
    title: `${page.keyword} — ${page.promise}`,
    description: page.description,
    // Paid traffic only. The SEO pages own organic search for these keywords, so these
    // stay out of the index (and out of sitemap.ts) rather than competing with them.
    robots: { index: false, follow: false },
  };
}

export default function AdLandingRoute({ params }: { params: { slug: string } }) {
  const page = getAdLanding(params.slug);
  if (!page) notFound();
  return <AdLanding page={page} />;
}
