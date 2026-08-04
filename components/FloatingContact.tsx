"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, ZALO_URL } from "@/lib/site-data";

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8.25 8.5v1.5h4.5l-4.75 5.5V17H16v-1.5h-4.75l4.75-5.5V8.5H8.25z" />
    </svg>
  );
}

function PulseRings({ color }: { color: string }) {
  return (
    <>
      {[0, 0.55, 1.1].map((delay, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute inset-0 rounded-full ${color}`}
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/**
 * One rail item: a 52px circle that slides its label out on hover. Circles keep
 * the rail out of the way of page content — the previous 200px pills sat on top
 * of the bottom-right of every section, covering "Xem tất cả" links.
 */
function RailButton({
  href,
  label,
  sublabel,
  color,
  shadow,
  pulse,
  showPulse,
  external,
  children,
}: {
  href: string;
  label: string;
  sublabel: string;
  color: string;
  shadow: string;
  pulse: string;
  showPulse: boolean;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      {showPulse && <PulseRings color={pulse} />}
      <motion.a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className={`relative flex h-[52px] items-center gap-3 overflow-hidden rounded-full ${color} ${shadow} pl-[10px] pr-[10px] text-white transition-[padding] duration-300 group-hover:pr-5`}
        aria-label={`${sublabel} — ${label}`}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
          {children}
        </span>
        {/* Label expands on hover only — collapsed by default so the rail is
            just three circles, like the reference site's. */}
        <span className="grid max-w-0 grid-rows-[auto_auto] overflow-hidden text-left transition-[max-width] duration-300 group-hover:max-w-[160px]">
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {sublabel}
          </span>
          <span className="whitespace-nowrap text-sm font-bold tracking-wide">
            {label}
          </span>
        </span>
      </motion.a>
    </div>
  );
}

export function FloatingContact() {
  const mapHref = SITE.mapDirectionsUrl;
  const phoneHref = `tel:${SITE.hotlines[0].replace(/\s/g, "")}`;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    // Desktop only — on mobile the same three actions live in StickyCallBar,
    // which sits in the thumb zone instead of over the content.
    <div
      className="fixed bottom-10 right-6 z-50 hidden flex-col items-end gap-3 md:flex"
      aria-label="Liên hệ nhanh"
    >
      <RailButton
        href={mapHref}
        external
        label="Xem Bản Đồ"
        sublabel="Showroom"
        color="bg-emerald-500"
        shadow="shadow-[0_8px_28px_rgba(16,185,129,0.45)]"
        pulse="bg-emerald-500/20"
        showPulse={isDesktop}
      >
        <MapPin className="h-5 w-5" />
      </RailButton>

      <RailButton
        href={ZALO_URL}
        external
        label="Chat Zalo"
        sublabel="Nhắn Tin"
        color="bg-[#0068FF]"
        shadow="shadow-[0_8px_28px_rgba(0,104,255,0.45)]"
        pulse="bg-blue-500/20"
        showPulse={isDesktop}
      >
        <ZaloIcon />
      </RailButton>

      <RailButton
        href={phoneHref}
        label={SITE.hotlines[0]}
        sublabel="Số Điện Thoại"
        color="bg-gradient-to-br from-red-500 to-rose-500"
        shadow="shadow-[0_8px_28px_rgba(239,68,68,0.45)]"
        pulse="bg-red-500/20"
        showPulse={isDesktop}
      >
        <motion.span
          animate={isDesktop ? { rotate: [0, -14, 14, -9, 9, -4, 4, 0] } : false}
          transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 2.5 }}
          className="flex items-center justify-center"
        >
          <Phone className="h-5 w-5" />
        </motion.span>
      </RailButton>
    </div>
  );
}
