import { Logo } from "@/components/Logo";
import { Stars } from "@/components/lp/Proof";
import { GOOGLE_RATING } from "@/lib/reviews";
import { SITE } from "@/lib/site-data";

/**
 * The ad pages' brand band (components/lp/BrandBar.tsx) at the top of the homepage (Hughie,
 * 14/11/2026): the logo big enough that "Hưng Thành Phát" reads on a phone, the trust line and
 * the Google score. White, because the logo is drawn on white.
 *
 * The site navbar stays on top of it. While this band is on screen the navbar is clear, with dark
 * text, and its own small logo steps aside (Navbar `overBrandBand`), so the page never shows two
 * logos at once. Phones: the band starts right under the navbar's menu button, the logo beside
 * it. md and up: below the navbar row, logo and trust line in one line.
 *
 * No call button here, unlike the ad pages: the navbar has one, and on phones the bottom bar.
 * Not a <header>: the navbar is the page's banner landmark.
 */
export function HomeBrandBand() {
  return (
    <div data-brand-bar="" className="border-b border-brand/10 bg-white pt-2 md:pt-20">
      <div className="container flex flex-col gap-2 pb-4 md:flex-row md:items-center md:gap-x-6 md:pb-5">
        {/* 116px tall on a phone (~256px wide): the smallest size where the name line under
            "HT DOOR" stays legible. */}
        <Logo
          height={116}
          sizes="(min-width: 1024px) 229px, (min-width: 768px) 194px, 256px"
          className="h-[116px] w-auto self-start md:h-[88px] lg:h-[104px]"
        />
        <div className="md:border-l md:border-brand/15 md:pl-6">
          <p className="text-balance text-xl font-semibold leading-tight tracking-tight text-brand lg:text-4xl">
            {SITE.trustLine}
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-600">
            <Stars className="h-3.5 w-3.5" />
            <span>
              <strong className="font-semibold text-brand">{GOOGLE_RATING.score}</strong> · {GOOGLE_RATING.count}{" "}
              đánh giá Google
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
