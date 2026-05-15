"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site-data";

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

export function FloatingContact() {
  const zaloHref = "https://zalo.me/0945042345";
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
    <div
      className="fixed right-3 bottom-5 z-50 flex flex-col items-end gap-2 md:right-6 md:bottom-10 md:gap-3"
      aria-label="Liên hệ nhanh"
    >
      {/* ── MAP ── */}
      {/* Mobile: icon-only circle */}
      <a
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xem bản đồ showroom"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition active:scale-95 md:hidden"
      >
        <MapPin className="h-5 w-5" />
      </a>
      {/* Desktop: pill with pulse */}
      <div className="relative hidden md:block">
        {isDesktop && <PulseRings color="bg-emerald-500/20" />}
        <motion.a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          className="relative flex w-[200px] items-center gap-3 rounded-full bg-emerald-500 py-3 pl-3 pr-5 text-white shadow-[0_8px_28px_rgba(16,185,129,0.45)]"
          aria-label="Xem bản đồ showroom"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <MapPin className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Showroom
            </p>
            <p className="text-sm font-bold tracking-wide">Xem Bản Đồ</p>
          </div>
        </motion.a>
      </div>

      {/* ── ZALO ── */}
      {/* Mobile: icon-only circle */}
      <a
        href={zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin qua Zalo"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/40 transition active:scale-95 md:hidden"
      >
        <ZaloIcon />
      </a>
      {/* Desktop: pill with pulse */}
      <div className="relative hidden md:block">
        {isDesktop && <PulseRings color="bg-blue-500/20" />}
        <motion.a
          href={zaloHref}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          className="relative flex w-[200px] items-center gap-3 rounded-full bg-[#0068FF] py-3 pl-3 pr-5 text-white shadow-[0_8px_28px_rgba(0,104,255,0.45)]"
          aria-label="Nhắn tin qua Zalo"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <ZaloIcon />
          </span>
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Nhắn Tin
            </p>
            <p className="text-sm font-bold tracking-wide">Chat Zalo</p>
          </div>
        </motion.a>
      </div>

      {/* ── PHONE ── */}
      {/* Mobile: icon-only circle */}
      <a
        href={phoneHref}
        aria-label={`Gọi hotline ${SITE.hotlines[0]}`}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/40 transition active:scale-95 md:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
      {/* Desktop: pill with pulse */}
      <div className="relative hidden md:block">
        {isDesktop && <PulseRings color="bg-red-500/20" />}
        <motion.a
          href={phoneHref}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          className="relative flex w-[200px] items-center gap-3 rounded-full bg-gradient-to-br from-red-500 to-rose-500 py-3 pl-3 pr-5 text-white shadow-[0_8px_28px_rgba(239,68,68,0.45)]"
          aria-label={`Gọi hotline ${SITE.hotlines[0]}`}
        >
          <motion.span
            animate={isDesktop ? { rotate: [0, -14, 14, -9, 9, -4, 4, 0] } : false}
            transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 2.5 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20"
          >
            <Phone className="h-5 w-5" />
          </motion.span>
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Số Điện Thoại
            </p>
            <p className="text-sm font-bold tracking-wide">{SITE.hotlines[0]}</p>
          </div>
        </motion.a>
      </div>
    </div>
  );
}
