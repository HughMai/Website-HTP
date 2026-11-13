import Image from "next/image";
import { ChevronDown, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { H2 } from "@/components/bang-gia/parts";
import { LeadForm } from "@/components/LeadForm";
import { Logo } from "@/components/Logo";
import { LpStickyBar } from "@/components/lp/LpStickyBar";
import { ZaloQuoteCard } from "@/components/ZaloQuoteCard";
import { Checks, ProofLine, Stars } from "@/components/lp/Proof";
import { QuoteButton } from "@/components/lp/QuoteSheet";
import type { AdLandingPage, LpPhoto, LpPriceTable } from "@/lib/lp-data";
import type { Review } from "@/lib/reviews";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/lib/reviews";
import { SITE, STATS, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/*
 * Google Ads landing page (/lp/<slug>). Content lives in lib/lp-data.ts. Built to
 * Enki/htp/ads/lp-hormozi-rebuild-2026-11-13.md, on top of the earlier plans
 * (conversion-plan-2026-11-11.md, sitelink-landing-plan-2026-11-12.md).
 *
 * Most of the effort goes above the fold, because that is the only part every visitor
 * sees. It carries Hormozi's Value Equation, one element per lever:
 *  - perceived likelihood: the Google rating and the job count before the headline;
 *  - dream outcome + time delay: the H1 is the search term, then the result and how long
 *    it takes ("Biết Giá Trước, Lắp Tại Nhà 3–5 Giờ");
 *  - effort: one sentence on what the visitor no longer has to do, and a one-field form
 *    that names the wait ("nhận báo giá trong 1–2 phút");
 *  - risk: the guarantees ticked directly under the button, every time it appears.
 *
 * One ask, repeated. Install pages: the Zalo-number form (hero card, bottom bar once it
 * scrolls away, a sheet from the mid-page rows on desktop, the closing form). Repair
 * pages: one big call button, because a stuck door calls.
 *
 * Below the fold, proof is stacked rather than rationed: every real review on screen at
 * once among the real job photos (a "wall", never a carousel). Section headings carry
 * the point on their own, for the visitor who reads only headings.
 *
 * Order: logo-only header → hero → [what the sitelink promised] → proof wall → 3 ĐÚNG →
 * 3 steps → prices → FAQ → final ask + showroom → NAP. No site menu, no footer link farm,
 * no map iframe, no floating rail: every link that isn't a way to reach the shop is a
 * paid click leaving.
 *
 * data-track on each CTA group tells GA4 which spot produced a call or Zalo tap
 * (LeadClickTracker reads the nearest data-track).
 */

const HOTLINE = SITE.hotlines[0];
const TEL = `tel:${HOTLINE.replace(/\s/g, "")}`;
const FORM_ID = "nhan-bao-gia";
const ADDRESS = SITE.address.replace(/,\s*Vietnam$/, "");
const JOBS = STATS.find((s) => s.label === "Dự Án Hoàn Thành")?.value ?? "500+";

function KeepCityTogether({ text }: { text: string }) {
  const m = text.match(/^(.*?)\s*(Cần Thơ)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]} <span className="whitespace-nowrap">{m[2]}</span>
    </>
  );
}

function CallButton({ className }: { className?: string }) {
  return (
    <a
      href={TEL}
      className={cn(
        "flex h-14 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-base font-bold text-brand shadow-sm transition-colors hover:bg-amber-300",
        className
      )}
    >
      <Phone className="h-5 w-5" aria-hidden />
      Gọi {HOTLINE}
    </a>
  );
}

function ZaloButton({ label, tone }: { label: string; tone: "dark" | "light" }) {
  return (
    <a
      href={ZALO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors",
        tone === "dark"
          ? "border-white/25 bg-white/5 text-white hover:bg-white/10"
          : "border-brand/15 bg-white text-brand hover:bg-brand-50"
      )}
    >
      <MessageCircle
        className={cn("h-5 w-5", tone === "dark" ? "text-sky-300" : "text-[#0068FF]")}
        aria-hidden
      />
      {label}
    </a>
  );
}

/** The page's ask, mid-page. Desktop and tablet only: on a phone the bottom bar has it. */
function CtaRow({ page, track }: { page: AdLandingPage; track: string }) {
  return (
    <div className="mt-8 hidden gap-3 md:flex md:items-center" data-track={track}>
      {page.form ? (
        <>
          <QuoteButton slug={page.slug} form={page.form} proof={page.proof} checks={page.checks} />
          <a
            href={TEL}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand/15 bg-white px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand-50"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Gọi {HOTLINE}
          </a>
        </>
      ) : (
        <>
          <CallButton className="h-12 sm:w-auto" />
          <ZaloButton label={page.zaloLabel} tone="light" />
        </>
      )}
    </div>
  );
}

function TopBar() {
  // Logo and phone, nothing else: the logo links nowhere. White, because the logo is
  // drawn on white (brown and gold) and turns muddy on the navy.
  return (
    <header className="border-b border-brand/10 bg-white" data-track="lp_topbar">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Logo height={52} />
        <a
          href={TEL}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-brand/20 px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand-50"
          aria-label={`Gọi ${HOTLINE}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
          <span className="hidden min-[420px]:inline">{HOTLINE}</span>
          <span className="min-[420px]:hidden">Gọi</span>
        </a>
      </div>
    </header>
  );
}

function HoursLine({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-1.5 text-sm text-white/60", className)}>
      <Clock className="h-4 w-4 shrink-0" aria-hidden />
      Nghe máy {SITE.workingHours}
    </p>
  );
}

/**
 * Third-party proof before the headline: the visitor's first glance lands on a Google
 * score and a job count, not on a claim. Plain text, not a link, so it never sends the
 * paid click off to Maps.
 */
function ProofChip() {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
      <span className="inline-flex items-center gap-2">
        <Stars className="h-3.5 w-3.5" />
        <span>
          <strong className="font-semibold text-white">{GOOGLE_RATING.score}</strong> · {GOOGLE_RATING.count} đánh giá
          Google
        </span>
      </span>
      <span>
        {JOBS} công trình từ {SITE.foundedYear}
      </span>
    </p>
  );
}

/** Call + Zalo under the form card: outlined, so the form's button stays the one amber block. */
function ReachRow() {
  return (
    <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
      <a
        href={TEL}
        className="flex h-12 items-center justify-center gap-2 rounded-full border border-amber-400/70 px-4 text-sm font-semibold text-amber-300 transition-colors hover:bg-white/5"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Gọi {HOTLINE}
      </a>
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        <MessageCircle className="h-4 w-4 text-sky-300" aria-hidden />
        Nhắn Zalo
      </a>
    </div>
  );
}

function Hero({ page }: { page: AdLandingPage }) {
  return (
    <section className="bg-brand text-white" aria-labelledby="lp-title">
      {/* Phones: proof, headline, price, the ask with its guarantees, then the photo, so a
          real door is the first thing the first scroll shows. Desktop: the text column on
          the left, the photo on the right. */}
      <div className="container grid pb-10 pt-4 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-14 lg:pb-16">
        <div>
          <ProofChip />
          {/* Keyword on its own line (message match with the search, the ad and the
              sitelink), then the outcome and how long it takes. "Cần Thơ" never splits.
              30px on phones keeps the outcome to two lines, so the ask fits the first screen. */}
          <h1
            id="lp-title"
            className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl"
          >
            {/* Plain wrapping here, not balance: "Sửa Cửa Cuốn / Cần Thơ", not "Sửa Cửa / Cuốn Cần Thơ". */}
            <span className="block text-wrap">
              <KeepCityTogether text={page.keyword} />
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-1 block text-amber-400">{page.promise}</span>
          </h1>
          <p className="mt-3 text-sm font-semibold text-amber-300">{page.priceTeaser}</p>
          <p className="mt-2 max-w-xl text-[0.9375rem] leading-snug text-white/80">{page.sub}</p>

          <div className="mt-4 sm:max-w-md" data-track="lp_hero">
            {page.form ? (
              <>
                <ZaloQuoteCard
                  id={FORM_ID}
                  track="lp_form"
                  source={`lp_${page.slug}`}
                  proof={page.proof}
                  form={page.form}
                  checks={page.checks}
                />
                <ReachRow />
              </>
            ) : (
              <div className="grid gap-3">
                <CallButton />
                <ZaloButton label={page.zaloLabel} tone="dark" />
              </div>
            )}
          </div>
          {!page.form && (
            <>
              <Checks items={page.checks} tone="dark" className="mt-4" />
              <HoursLine className="mt-3" />
              <ProofLine proof={page.proof} tone="dark" className="mt-4" />
            </>
          )}
        </div>
        {/* Price-led pages hide the photo below lg:, so the first scroll on a phone lands on
            the price table the visitor tapped for. */}
        <figure className={cn("mt-8 lg:mt-0", page.lead === "prices" && "hidden lg:block")}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 lg:aspect-[4/5]">
            {/* Install pages: lazy, because on phones the form fills the first screen and this
                photo sits below it, so it must not take bandwidth from the page's JS on slow
                4G (on desktop it is in view at first layout, so lazy still starts at once).
                Repair pages: eager, because their shorter hero puts the photo near the first
                phone screen. Price-led pages: lazy, so phones, where it is hidden, never
                download it. */}
            <Image
              src={page.hero.src}
              alt={page.hero.alt}
              fill
              loading={page.form || page.lead === "prices" ? "lazy" : "eager"}
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={85}
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-white/60">
            {page.hero.caption} — ảnh tại công trình, không phải ảnh mẫu
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Promises({ page }: { page: AdLandingPage }) {
  const { title, lead, items } = page.promises;
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="lp-cam-ket">
      <div className="container">
        <h2 id="lp-cam-ket" className={cn(H2, "max-w-3xl text-balance text-brand")}>
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">{lead}</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title} className="rounded-2xl border border-brand/10 bg-brand-50/60 p-5 md:p-6">
              <p className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-amber-400">
                  {i + 1}
                </span>
                <span className="text-xl font-semibold uppercase tracking-tight text-brand">{item.title}</span>
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhotoTile({ photo }: { photo: LpPhoto }) {
  return (
    <li>
      <figure>
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
        </div>
        <figcaption className="mt-2 text-sm leading-snug text-slate-600">{photo.caption}</figcaption>
      </figure>
    </li>
  );
}

function ReviewTile({ review }: { review: Review }) {
  return (
    // md:self-center: beside a pair of tall photos the card keeps its own height instead of
    // stretching into an empty box; the larger text reads as a pull quote there.
    <li className="col-span-2 flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/5 md:self-center md:p-7">
      <Stars />
      <blockquote className="mt-3 flex-1 text-base leading-relaxed text-slate-700 md:text-lg">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <p className="mt-4 flex items-center gap-3 text-sm">
        <span
          className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-white", review.color)}
          aria-hidden
        >
          {review.initial}
        </span>
        <span>
          <span className="block font-semibold text-brand">{review.name}</span>
          <span className="text-slate-500">Đánh giá Google · {review.date}</span>
        </span>
      </p>
    </li>
  );
}

/**
 * Stacked proof: every real review on screen at once, between pairs of real job photos,
 * so each pair of doors sits next to a real voice. No carousel: what a carousel hides
 * mostly goes unseen. The heading is what a customer said, not "Khách nói gì".
 * Reviews span two columns: on a phone that is a full row under each pair of photos; on
 * desktop a photo pair and a review share one row.
 */
function ProofWall({ page }: { page: AdLandingPage }) {
  const photos = page.photos.items;
  const reviews = [...page.reviews];
  const tiles: JSX.Element[] = [];
  for (let i = 0; i < photos.length; i += 2) {
    for (const p of photos.slice(i, i + 2)) tiles.push(<PhotoTile key={p.src} photo={p} />);
    const r = reviews.shift();
    if (r) tiles.push(<ReviewTile key={r.name} review={r} />);
  }
  for (const r of reviews) tiles.push(<ReviewTile key={r.name} review={r} />);

  return (
    <section className="bg-slate-50 py-12 md:py-16" aria-labelledby="lp-cong-trinh">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">{page.photos.title}</p>
        <h2 id="lp-cong-trinh" className={cn(H2, "mt-2 max-w-3xl text-balance text-brand")}>
          &ldquo;{page.wallQuote.quote.replace(/\.$/, "")}&rdquo;
        </h2>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-slate-600">
          <span>— {page.wallQuote.name}, khách của bên em.</span>
          <Stars />
          <span>
            <strong className="font-semibold text-brand">{GOOGLE_RATING.score}</strong> trên Google · {GOOGLE_RATING.count}{" "}
            đánh giá · {JOBS} công trình. Ảnh chụp tại công trình, không phải ảnh mẫu.
          </span>
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{tiles}</ul>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand/70"
        >
          Xem cả {GOOGLE_RATING.count} đánh giá trên Google Maps
        </a>
        <CtaRow page={page} track="lp_photos" />
      </div>
    </section>
  );
}

function PriceTable({ table }: { table: LpPriceTable }) {
  const grid = (
    <div className="overflow-hidden rounded-xl border border-brand/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand text-white">
          <tr>
            {table.head.map((h, i) => (
              <th key={h} scope="col" className={cn("px-4 py-3 font-semibold", i > 0 && "text-right")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-t border-brand/10 even:bg-brand-50/40">
              {row.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium text-brand">
                    {c}
                  </th>
                ) : (
                  <td key={i} className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums text-brand">
                    {c}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (!table.collapsed) return <div className="mt-4">{grid}</div>;

  // Secondary price groups stay one tap away instead of lengthening the page.
  return (
    <details className="group mt-3 rounded-xl border border-brand/10 bg-white">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-brand [&::-webkit-details-marker]:hidden">
        Xem giá {table.head[0].charAt(0).toLowerCase() + table.head[0].slice(1)}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="px-2 pb-2">{grid}</div>
    </details>
  );
}

function Prices({ page }: { page: AdLandingPage }) {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="lp-bang-gia">
      <div className="container max-w-3xl">
        <h2 id="lp-bang-gia" className={cn(H2, "text-brand")}>
          {page.prices.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{page.prices.lead}</p>
        {page.prices.tables.map((t) => (
          <PriceTable key={t.head[0]} table={t} />
        ))}
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{page.prices.note}</p>
        <CtaRow page={page} track="lp_prices" />
      </div>
    </section>
  );
}

function Steps({ page }: { page: AdLandingPage }) {
  return (
    <section className="bg-slate-50 py-12 md:py-16" aria-labelledby="lp-quy-trinh">
      <div className="container">
        <h2 id="lp-quy-trinh" className={cn(H2, "max-w-3xl text-balance text-brand")}>
          {page.stepsTitle}
        </h2>
        {/* A compact list on phones, three cards from md: up. */}
        <ol className="mt-6 grid gap-5 sm:mt-8 md:grid-cols-3 md:gap-4">
          {page.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 md:block md:rounded-2xl md:border md:border-brand/10 md:bg-white md:p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-amber-400">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-brand md:mt-3">{s.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <CtaRow page={page} track="lp_steps" />
      </div>
    </section>
  );
}

function Faq({ page }: { page: AdLandingPage }) {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="lp-hoi-dap">
      <div className="container max-w-3xl">
        <h2 id="lp-hoi-dap" className={cn(H2, "text-balance text-brand")}>
          {page.faqTitle}
        </h2>
        <div className="mt-6 divide-y divide-brand/10 rounded-2xl border border-brand/10 bg-white">
          {page.faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-base font-semibold text-brand [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing({ page }: { page: AdLandingPage }) {
  return (
    <section className="bg-brand py-12 text-white md:py-16" aria-labelledby="lp-goi-ngay">
      <div className="container grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <h2 id="lp-goi-ngay" className={cn(H2, "text-balance text-white")}>
            {page.closing}
          </h2>
          {page.form ? (
            // The same ask as the top of the page, so nobody scrolls 6,000px back up for it.
            <div className="mt-6 sm:max-w-md" data-track="lp_closing">
              <LeadForm source={`lp_${page.slug}`} tone="dark" submitLabel={page.form.submitLabel} />
              <Checks items={page.checks} tone="dark" className="mt-4" />
              <ProofLine proof={page.proof} tone="dark" className="mt-5 border-t border-white/10 pt-4" />
              <HoursLine className="mt-3" />
            </div>
          ) : (
            <>
              <HoursLine className="mt-3 text-base text-white/80" />
              <div className="mt-6 grid gap-3 sm:max-w-md" data-track="lp_closing">
                <CallButton />
                <ZaloButton label={page.zaloLabel} tone="dark" />
              </div>
              <Checks items={page.checks} tone="dark" className="mt-4" />
              <ProofLine proof={page.proof} tone="dark" className="mt-5" />
            </>
          )}
        </div>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
            <Image
              src="/showroom.jpg"
              alt={`Cửa hàng ${SITE.brand} trên đường Võ Văn Kiệt, Bình Thủy`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-start gap-2 text-sm text-white/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
            <span>
              Cửa hàng và xưởng: {ADDRESS}.{" "}
              <a
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline underline-offset-4"
              >
                Chỉ đường
              </a>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function MiniFooter() {
  // NAP on every page (CLAUDE.md SEO rule), without the site-wide link groups.
  return (
    <footer className="border-t border-white/10 bg-brand-800 py-6 text-xs text-white/60">
      <div className="container flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {SITE.legalName} · {ADDRESS}
        </p>
        <p className="flex flex-wrap gap-x-3 gap-y-1">
          {SITE.hotlines.map((h) => (
            <a key={h} href={`tel:${h.replace(/\s/g, "")}`} className="hover:text-white">
              {h}
            </a>
          ))}
          <a href="/chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-white">
            Chính sách bảo mật
          </a>
        </p>
      </div>
    </footer>
  );
}

/** Body sections in page order. `lead` moves the section the sitelink promised to the top;
 *  a photo-led page brings its prices up right behind the photos. Otherwise proof comes
 *  first: it is what makes every promise below believable. */
function bodySections(page: AdLandingPage) {
  const wall = <ProofWall key="wall" page={page} />;
  const promises = <Promises key="promises" page={page} />;
  const steps = <Steps key="steps" page={page} />;
  const prices = <Prices key="prices" page={page} />;
  if (page.lead === "prices") return [prices, wall, promises, steps];
  if (page.lead === "photos") return [wall, prices, promises, steps];
  return [wall, promises, steps, prices];
}

export function AdLanding({ page }: { page: AdLandingPage }) {
  return (
    <div className="bg-white text-brand">
      <TopBar />
      <main id="main">
        <Hero page={page} />
        {bodySections(page)}
        <Faq page={page} />
        <Closing page={page} />
      </main>
      <MiniFooter />
      {/* Room under the footer so a bottom bar never covers its last line. Install pages
          get the Zalo field bar from their hero card; repair pages get call + Zalo. */}
      <div className="h-[4.5rem] bg-brand-800 md:hidden" aria-hidden />
      {!page.form && <LpStickyBar />}
    </div>
  );
}
