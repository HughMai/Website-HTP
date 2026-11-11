import type { ReactNode } from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import type { Gia } from "@/lib/bang-gia-data";
import { formatGia } from "@/lib/bang-gia-specs";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/*
 * Shared pieces of the three bảng giá pages (cửa cuốn, nhôm kính, motor & phụ kiện).
 *
 * Type steps, five in all: display (h1) · section (h2, clamp 28–36px) · 20px item names and
 * prices · 16px running text · 14px notes. Ink is navy, notes are slate-600, the amber is
 * kept for the call button and the slat edge.
 */

export const TEL = `tel:${SITE.hotlines[0].replace(/\s/g, "")}`;

/** "235 - 237 (281 Cũ) Võ Văn Kiệt" — the street part of SITE.address. */
export const SHOWROOM = SITE.address.split(",")[0];

export const WARRANTY = "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất";

/** Lowest listed price of a set, null when none is priced yet. */
export function minGia(xs: Gia[]): number | null {
  const v = xs.filter((x): x is number => x !== null);
  return v.length ? Math.min(...v) : null;
}

/**
 * AI-rendered product illustration from the print catalog (Enki/htp/catalog/anh-ai → public/bang-gia/minh-hoa).
 * Only for products HTP has no photo of yet, and always labelled "Minh họa" — never in the công trình
 * galleries or product photo rows, which promise "ảnh thực tế". Replace with a real shot when one exists.
 */
export function Illustration({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={cn("w-20 shrink-0", className)}>
      <div className="relative aspect-square bg-brand-50">
        <Image
          src={src}
          alt={`Ảnh minh họa: ${alt}`}
          fill
          sizes="160px"
          className="object-contain p-[8%] mix-blend-multiply"
        />
      </div>
      <figcaption className="mt-1 text-center text-sm text-slate-600">Minh họa</figcaption>
    </figure>
  );
}

/** HTP's own shopfront — where the samples on these pages can be seen and touched. */
export function ShowroomFigure() {
  return (
    <figure>
      <div className="relative aspect-[4/3]">
        <Image
          src="/showroom.jpg"
          alt={`Showroom Hưng Thành Phát, ${SHOWROOM}, Bình Thủy, Cần Thơ`}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4 text-base leading-relaxed text-brand">
        Showroom {SHOWROOM}, Bình Thủy: mẫu nan và mẫu cửa thật để xem trước khi chọn. {SITE.workingHours}.
      </figcaption>
    </figure>
  );
}

/** Hides controls that need JavaScript when it is off — drop once per page. */
export function NoScriptStyle() {
  return (
    <noscript>
      <style dangerouslySetInnerHTML={{ __html: ".js-only{display:none!important}" }} />
    </noscript>
  );
}

export const H2 = "text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em]";

/** Tile fields — flat tones from the brand scale, one per slat brand so like sits with like. */
export const FIELD: Record<string, string> = {
  Kovidoor: "bg-brand-50",
  Mitadoor: "bg-stone-200",
  Alumdoor: "bg-slate-200",
  OneDoor: "bg-[#EEF1F4]",
};

export function priceText(g: Gia): string {
  return g !== null ? formatGia(g) : "Liên hệ";
}

/**
 * The printed catalog opens every section with a navy slat that has an amber edge. The web
 * page does the same: the section heading sits on the slat, the count or unit on its right.
 */
export function SlatHeading({ id, title, meta }: { id: string; title: string; meta?: ReactNode }) {
  return (
    <div className="bg-brand text-white" data-rise>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-5 md:px-8 md:py-6">
        <h2 id={id} className={H2}>
          {title}
        </h2>
        {meta && <p className="text-base text-white/85">{meta}</p>}
      </div>
      <div aria-hidden className="h-1.5 bg-amber-400" />
    </div>
  );
}

/** Navy first screen — the site's navbar is translucent navy until scrolled, so every hero is. */
export function PriceHero({
  title,
  lead,
  children,
  aside,
}: {
  title: string;
  lead: ReactNode;
  children?: ReactNode;
  aside: ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-brand pb-16 pt-28 text-white md:pb-24 md:pt-36">
      <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h1 className="text-balance text-[clamp(2.125rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {title}
          </h1>
          <p className="mt-6 max-w-[36rem] text-xl leading-relaxed text-white/90">{lead}</p>
          {children}
        </div>
        <div className="lg:col-span-6">{aside}</div>
      </div>
    </section>
  );
}

export function HeroActions({ className }: { className?: string }) {
  return (
    <div className={cn("mt-8 flex flex-wrap items-center gap-x-7 gap-y-4", className)}>
      <a
        href={TEL}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-amber-400 px-6 text-base font-semibold text-brand transition hover:bg-amber-300 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Gọi {SITE.hotlines[0]}
      </a>
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-[6px] transition hover:decoration-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Nhắn Zalo
      </a>
    </div>
  );
}

/** "Giá khởi điểm" list in the hero: every family with its lowest price, each a jump link. */
export function HeroIndex({
  label,
  items,
  others,
}: {
  label: string;
  /** `exact`: one fixed price, so no "từ" in front of it. */
  items: { href: string; name: string; gia: number | null; exact?: boolean }[];
  others?: { href: string; label: string }[];
}) {
  return (
    <div className="mt-10 max-w-[36rem]">
      <p className="text-sm text-white/80">{label}</p>
      <ul className="mt-1">
        {items.map((it) => (
          <li key={it.name}>
            <a
              href={it.href}
              className="group flex min-h-[48px] items-baseline justify-between gap-6 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <span className="text-base font-medium text-white transition-colors group-hover:text-amber-300">
                {it.name}
              </span>
              <span className="whitespace-nowrap text-xl font-semibold tabular-nums">
                {it.gia !== null ? (
                  <>
                    {!it.exact && <span className="text-base font-normal text-white/80">từ </span>}
                    {formatGia(it.gia)}
                  </>
                ) : (
                  "Liên hệ"
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {others && (
        <p className="mt-5 text-base text-white/85">
          Bảng giá khác:{" "}
          {others.map((o, i) => (
            <span key={o.href}>
              {i > 0 && " · "}
              <a
                href={o.href}
                className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-amber-400"
              >
                {o.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

// ── Prices like a menu ─────────────────────────────────────────────────────

export type MenuRow = { name: string; sub?: string; gia: Gia };
export type MenuGroup = {
  id?: string;
  name: string;
  unit: string;
  desc?: string;
  dungCho?: string;
  rows: MenuRow[];
  notes?: string[];
  /** AI illustration for a product with no photo (see Illustration). */
  image?: { src: string; alt: string };
  /** Small real photos (not illustrations) shown above the rows, with the page's own caption. */
  swatches?: { caption: string; photos: { src: string; alt: string }[] };
};

/**
 * Heading zone with one real photograph on the left, the price list in two text columns on the
 * right. Name and price share a baseline; nothing but space between them.
 */
export function PriceMenu({
  intro,
  photo,
  groups,
}: {
  intro?: ReactNode;
  photo?: { src: string; alt: string; caption: string };
  groups: MenuGroup[];
}) {
  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* Sticky on wide screens: the intro and photo stay beside the list as it scrolls. */}
      <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        {intro && (
          <div className="max-w-[38ch] text-xl leading-relaxed text-brand" data-rise>
            {intro}
          </div>
        )}
        {photo && (
          <figure className="mt-8" data-rise>
            <div className="relative aspect-[4/3] w-full max-w-md lg:aspect-[4/5] lg:max-w-none">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 448px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-slate-600">{photo.caption}</figcaption>
          </figure>
        )}
      </div>
      <div className="lg:col-span-8 md:columns-2 md:gap-14">
        {groups.map((g) => (
          <section
            key={g.name}
            id={g.id}
            aria-label={g.name}
            className="mb-14 scroll-mt-28 break-inside-avoid last:mb-0 md:last:mb-14"
            data-rise
          >
            <div className="flex items-start gap-4">
              {g.image && <Illustration src={g.image.src} alt={g.image.alt} />}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold text-brand">{g.name}</h3>
                  <span className="whitespace-nowrap text-sm text-slate-600">{g.unit}</span>
                </div>
                {g.desc && <p className="mt-2 text-base leading-relaxed text-brand">{g.desc}</p>}
                {g.dungCho && (
                  <p className="mt-1 text-base leading-relaxed text-brand">
                    <span className="font-semibold">Nên dùng cho:</span> {g.dungCho}
                  </p>
                )}
              </div>
            </div>
            {g.swatches && g.swatches.photos.length > 0 && (
              <figure className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {g.swatches.photos.map((p) => (
                    <div key={p.src} className="relative h-10 w-14 overflow-hidden border border-brand-100">
                      <Image src={p.src} alt={p.alt} fill sizes="56px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <figcaption className="mt-1.5 text-sm text-slate-600">{g.swatches.caption}</figcaption>
              </figure>
            )}
            <ul className="mt-5 space-y-4">
              {g.rows.map((r) => (
                <li key={r.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-semibold text-brand">{r.name}</span>
                    <span className="whitespace-nowrap text-xl font-semibold tabular-nums text-brand">
                      {priceText(r.gia)}
                    </span>
                  </div>
                  {r.sub && <p className="mt-0.5 max-w-[40ch] text-base leading-snug text-slate-600">{r.sub}</p>}
                </li>
              ))}
            </ul>
            {g.notes?.map((n) => (
              <p key={n} className="mt-4 text-sm leading-relaxed text-slate-600">
                {n}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
