import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCongTrinh } from "@/lib/cong-trinh-data";
import type { PRODUCT_CATEGORIES } from "@/lib/site-data";

type Category = (typeof PRODUCT_CATEGORIES)[number];

type Card = {
  key: string;
  href: string;
  image: string;
  label: string;
  /** Only real installs carry this — it's what makes the card worth clicking. */
  isRealInstall: boolean;
  contain: boolean;
};

/**
 * Turns a category into cards. Every category that has real installs on file
 * shows those; only accessories (motor, phụ kiện) fall back to product shots,
 * because there is no "công trình" for a remote control.
 */
function toCards(cat: Category): Card[] {
  const contain = "contain" in cat && !!cat.contain;

  const cards: Card[] = [];

  if ("showcase" in cat && cat.showcase) {
    for (const s of cat.showcase) {
      const project = getCongTrinh(s.slug);
      if (!project) continue; // slug renamed in the export — skip, don't crash
      cards.push({
        key: s.slug,
        href: `/cong-trinh/${s.slug}`,
        image: project.cover,
        label: s.label,
        isRealInstall: true,
        contain: false,
      });
    }
    return cards;
  }

  for (const s of cat.subtypes) {
    if (!s.image) continue;
    cards.push({
      key: s.name,
      href: cat.pageLink.href,
      image: s.image,
      label: s.name,
      isRealInstall: false,
      contain,
    });
  }
  return cards;
}

export function ProductCategoryRow({
  category,
  headingLevel = "h3",
}: {
  category: Category;
  /** h3 under the homepage's h2; h2 on /san-pham where it's the page's own level. */
  headingLevel?: "h2" | "h3";
}) {
  const cards = toCards(category);
  const Heading = headingLevel;

  return (
    <div>
      {/* Header — title left, "xem tất cả" right */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-brand/15 pb-3">
        <div>
          <div className="h-0.5 w-12 rounded-full bg-amber-400" />
          <Heading className="mt-2 text-lg font-extrabold uppercase tracking-wider text-brand md:text-xl">
            {category.name}
          </Heading>
          <p className="mt-1 text-sm text-brand/65">{category.tagline}</p>
          {/* Price anchor so a visitor can self-qualify before calling */}
          <p className="mt-1 text-sm font-bold text-amber-600">
            {category.priceFrom}
          </p>
        </div>
        <Link
          href={category.pageLink.href}
          className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          {category.pageLink.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {/* Cards — horizontal scroll on mobile, grid from lg */}
      {cards.length > 0 && (
      <ul className="mt-5 -mx-4 flex gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {cards.map((card) => (
          <li
            key={card.key}
            className="w-[44vw] max-w-[220px] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <Link
              href={card.href}
              className="group block h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-brand/10 transition-shadow hover:shadow-lg"
            >
              <div
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden",
                  card.contain ? "bg-white p-4" : "bg-brand-50"
                )}
              >
                <Image
                  src={card.image}
                  alt={`${card.label} — Hưng Thành Phát thi công tại Cần Thơ`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-[1.04]",
                    card.contain ? "object-contain" : "object-cover"
                  )}
                />
                {card.isRealInstall && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand/85 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    <Camera className="h-3 w-3" aria-hidden />
                    Ảnh thực tế
                  </span>
                )}
              </div>
              <div className="border-t border-brand/10 bg-gray-50 px-3 py-3">
                <p className="text-[11px] font-bold uppercase leading-snug tracking-wider text-brand transition-colors group-hover:text-amber-600 md:text-xs">
                  {card.label}
                </p>
                {card.isRealInstall && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                    Xem công trình
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      )}

      {/* Subtype list — keeps the product taxonomy (and its keywords) on the
          page without needing a studio photo for every single variant. When a
          category has no photos at all it carries the block on its own, so it
          renders as tiles rather than a thin strip of chips. */}
      {cards.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {category.subtypes.map((s) => (
            <li key={s.name}>
              <Link
                href={category.pageLink.href}
                className="inline-block rounded-full border border-brand/15 bg-white px-3 py-1.5 text-xs font-medium text-brand/75 transition hover:border-amber-400 hover:bg-amber-50 hover:text-brand"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {category.subtypes.map((s) => (
            <li key={s.name}>
              <Link
                href={category.pageLink.href}
                className="group flex h-full items-start gap-3 rounded-xl border border-brand/10 bg-white p-4 transition hover:border-amber-400 hover:shadow-md"
              >
                <span
                  className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400"
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-semibold text-brand transition-colors group-hover:text-amber-600">
                    {s.name}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                    Hỏi giá &amp; tình trạng hàng
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
