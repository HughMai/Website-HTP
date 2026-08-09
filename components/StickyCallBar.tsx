"use client";

import { MessageCircle, Phone, Ruler } from "lucide-react";
import { SITE, ZALO_URL } from "@/lib/site-data";

/**
 * Mobile-only bottom action bar. Mobile is the majority of this site's traffic
 * and a missed call is a lost job, so the three ways to reach the shop stay
 * one tap away at every scroll depth. Hidden at `md:` where the floating rail
 * (FloatingContact) already does this job.
 */
export function StickyCallBar() {
  const primaryHotline = SITE.hotlines[0];

  return (
    <>
      {/* Spacer so the bar never covers the end of the page content */}
      <div className="h-16 md:hidden" aria-hidden />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-white/95 backdrop-blur md:hidden">
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
          <a
            href="/bao-gia-cua-cuon-can-tho"
            className="flex flex-col items-center gap-0.5 py-2.5 text-brand active:bg-brand-50"
            aria-label="Nhận báo giá"
          >
            <Ruler className="h-5 w-5 text-amber-500" aria-hidden />
            <span className="text-xs font-bold">Báo giá</span>
          </a>
        </div>
      </div>
    </>
  );
}
