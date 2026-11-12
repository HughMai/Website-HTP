"use client";

import { usePathname } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, ZALO_URL } from "@/lib/site-data";

/**
 * Mobile-only bottom action bar. Mobile is the majority of this site's traffic
 * and a missed call is a lost job, so the three ways to reach the shop stay
 * one tap away at every scroll depth. Hidden at `md:` where the floating rail
 * (FloatingContact) already does this job.
 */
export function StickyCallBar() {
  const primaryHotline = SITE.hotlines[0];
  // Google Ads landing pages (/lp/*) render their own bar (components/lp/LpStickyBar),
  // which repeats that page's one ask and has no map button sending a paid visitor away.
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return null;

  return (
    <>
      {/* Spacer so the bar never covers the end of the page content */}
      <div className="h-16 md:hidden" aria-hidden />

      {/* data-track: LeadClickTracker reports the call/Zalo taps below. */}
      <div
        // Steps aside while the Zalo field bar (ZaloStickyBar) is up; that bar has its own call button.
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-white/95 backdrop-blur md:hidden [[data-zalo-bar=on]_&]:hidden"
        data-track="sticky_bar"
      >
        <div className="grid grid-cols-3 divide-x divide-brand/10">
          <a
            href={`tel:${primaryHotline.replace(/\s/g, "")}`}
            className="flex flex-col items-center gap-0.5 py-2.5 text-brand active:bg-brand-50"
            aria-label={`Gọi hotline ${primaryHotline}`}
          >
            <Phone className="h-5 w-5 text-red-500" aria-hidden />
            <span className="text-xs font-bold">Gọi ngay</span>
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 py-2.5 text-brand active:bg-brand-50"
            aria-label="Nhắn tin qua Zalo"
          >
            <MessageCircle className="h-5 w-5 text-[#0068FF]" aria-hidden />
            <span className="text-xs font-bold">Chat Zalo</span>
          </a>
          {/* Google Maps listing, not a directions deep link — it opens the
              shop's place page, where the customer can tap Chỉ đường, see the
              photos, or check the reviews. Same destination and colour as the
              desktop rail's map button. */}
          <a
            href={SITE.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 py-2.5 text-brand active:bg-brand-50"
            aria-label="Xem showroom trên Google Maps"
          >
            <MapPin className="h-5 w-5 text-emerald-500" aria-hidden />
            <span className="text-xs font-bold">Bản đồ</span>
          </a>
        </div>
      </div>
    </>
  );
}
