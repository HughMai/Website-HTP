"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SHOWROOM } from "./parts";

export type Specimen = { code: string; brand: string; src: string; href: string; field: string };

const HOLD_MS = 5600;

/**
 * Hero mosaic for the cửa cuốn price page: real slat samples on flat tiles, running off the
 * right edge. The tall tile slowly crossfades between four samples (the page's one loud
 * move); it holds still when the tab is hidden or the visitor asks for reduced motion.
 */
export function SpecimenMosaic({ cycle, tiles }: { cycle: Specimen[]; tiles: Specimen[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || cycle.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % cycle.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [cycle.length]);

  const now = cycle[i];

  return (
    <figure className="lg:-mr-[12vw]">
      <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-2.5">
        <a
          href={now.href}
          aria-label={`Xem mẫu ${now.code}`}
          className={cn(
            "bg-rise-in relative row-span-2 block overflow-hidden transition-[filter,background-color] duration-[1600ms] hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
            now.field
          )}
        >
          {cycle.map((s, k) => (
            <Image
              key={s.code}
              src={s.src}
              alt={`Mẫu nan ${s.code} ${s.brand}`}
              fill
              priority={k === 0}
              sizes="(min-width: 1024px) 340px, 40vw"
              className={cn(
                "object-contain p-[6%] mix-blend-multiply transition-opacity duration-[1600ms] ease-in-out",
                k === i ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </a>
        {tiles.map((t, k) => (
          <a
            key={t.code}
            href={t.href}
            aria-label={`Xem mẫu ${t.code}`}
            style={{ "--rise-delay": `${120 + k * 90}ms` } as React.CSSProperties}
            className={cn(
              "bg-rise-in relative block aspect-[4/5] overflow-hidden transition-[filter] hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
              t.field
            )}
          >
            <Image
              src={t.src}
              alt={`Mẫu nan ${t.code} ${t.brand}`}
              fill
              sizes="(min-width: 1024px) 260px, 30vw"
              className="object-contain p-[11%] mix-blend-multiply"
            />
          </a>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-white/85">
        Mẫu nan thật ở showroom {SHOWROOM} · đang xem{" "}
        <span className="font-semibold text-white">
          {now.code} · {now.brand}
        </span>
      </figcaption>
    </figure>
  );
}
