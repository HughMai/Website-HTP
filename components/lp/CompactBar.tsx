"use client";

import * as React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const HOTLINE = SITE.hotlines[0];
const TEL = `tel:${HOTLINE.replace(/\s/g, "")}`;

/**
 * The slim header that takes over once the brand bar ([data-brand-bar]) has scrolled out of
 * view, so the call button stays on screen the whole way down (Hughie, 13/11/2026).
 *
 * Fixed and moved by a transform, so showing it never shifts the page. Until then it is
 * `invisible`, which also keeps its links out of the tab order and the accessibility tree.
 * Visibility is transitioned with the transform, so it stays visible while sliding away.
 */
export function CompactBar() {
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const brand = document.querySelector("[data-brand-bar]");
    if (!brand) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(brand);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-track="lp_topbar"
      data-compact-bar=""
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b border-brand/10 bg-white/95 shadow-[0_4px_16px_rgba(10,37,64,0.08)] backdrop-blur",
        "transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        shown ? "visible translate-y-0" : "invisible -translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-4">
          <Link href="/" aria-label="Về trang chủ Hưng Thành Phát Door" className="shrink-0">
            <Logo height={48} />
          </Link>
          <span className="hidden truncate text-base font-semibold text-brand md:block">{SITE.trustLine}</span>
        </span>
        <a
          href={TEL}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-brand transition-colors hover:bg-amber-300"
          aria-label={`Gọi ${HOTLINE}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
          {HOTLINE}
        </a>
      </div>
    </div>
  );
}
