"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * Phone-only bottom bar for the repair ad page (the site-wide StickyCallBar stays off
 * /lp/*): a big call button + Zalo, because a stuck door calls. The install ad pages use
 * the Zalo field bar instead (ZaloStickyBar, rendered by their hero ZaloQuoteCard).
 * It waits until the hero's own buttons scroll away — one ask on screen at a time.
 */
export function LpStickyBar() {
  const hotline = SITE.hotlines[0];
  const tel = `tel:${hotline.replace(/\s/g, "")}`;

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const heroAsk = document.querySelector('[data-track="lp_hero"]');
    if (!heroAsk || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setRevealed(!entry.isIntersecting));
    io.observe(heroAsk);
    return () => io.disconnect();
  }, []);
  const tab = revealed ? undefined : -1;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden",
        revealed ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!revealed}
      data-track="sticky_bar"
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <a
          href={tel}
          tabIndex={tab}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 text-base font-bold text-brand active:bg-amber-300"
          aria-label={`Gọi hotline ${hotline}`}
        >
          <Phone className="h-5 w-5" aria-hidden />
          Gọi {hotline}
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tab}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand/15 px-5 text-sm font-bold text-brand active:bg-brand-50"
          aria-label="Nhắn tin qua Zalo"
        >
          <MessageCircle className="h-5 w-5 text-[#0068FF]" aria-hidden />
          Zalo
        </a>
      </div>
    </div>
  );
}
