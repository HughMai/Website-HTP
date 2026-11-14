import { Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CompactBar } from "@/components/lp/CompactBar";
import { Stars } from "@/components/lp/Proof";
import { GOOGLE_RATING } from "@/lib/reviews";
import { SITE } from "@/lib/site-data";

const HOTLINE = SITE.hotlines[0];
const TEL = `tel:${HOTLINE.replace(/\s/g, "")}`;

/**
 * The top of every ad page (Hughie, 14/11/2026): the logo big enough that "Hưng Thành Phát"
 * reads on a phone, the shop's trust line, and the Google score anyone can check. Who the
 * shop is comes before what it sells. White, because the logo is drawn on white.
 *
 * Phones: logo plus a round call button, the line and the score underneath. md and up: one
 * row with the number on the button.
 *
 * Not sticky. Once it scrolls away, CompactBar slides in with a small logo and the call
 * button, so a call is one tap away the whole way down (Hughie, 13/11/2026).
 */
export function BrandBar() {
  return (
    <>
      <header data-brand-bar="" data-track="lp_topbar" className="border-b border-brand/10 bg-white">
        <div className="container grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-3 md:flex md:gap-x-6 md:py-4">
          {/* 116px tall on a phone (~256px wide): the smallest size where the name line
              under "HT DOOR" stays legible. */}
          <Logo
            height={116}
            sizes="(min-width: 1024px) 229px, (min-width: 768px) 194px, 256px"
            className="h-[116px] w-auto md:h-[88px] lg:h-[104px]"
          />
          <a
            href={TEL}
            aria-label={`Gọi ${HOTLINE}`}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-amber-400 text-brand shadow-[0_2px_8px_rgba(10,37,64,0.18)] transition-colors hover:bg-amber-300 md:order-last md:ml-auto md:h-12 md:w-auto md:px-5"
          >
            <Phone className="h-6 w-6 md:h-5 md:w-5" aria-hidden />
            <span className="hidden text-base font-bold md:inline">{HOTLINE}</span>
          </a>
          <div className="col-span-2 md:border-l md:border-brand/15 md:pl-6">
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
      </header>
      <CompactBar />
    </>
  );
}
