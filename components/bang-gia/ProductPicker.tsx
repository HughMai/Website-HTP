"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { formatGia } from "@/lib/bang-gia-specs";
import { cn } from "@/lib/utils";

export type PickItem = {
  name: string;
  href: string;
  tu: number | null;
  unit: string;
  photo: { src: string; alt: string; caption: string };
};

/**
 * Nhôm kính hero: a list of what HTP makes, each with its lowest price; choosing one swaps the
 * tile to a real HTP job of that kind (300ms crossfade). The link under the tile jumps to its
 * prices. Without JavaScript the first item shows and every price is still in the list.
 */
export function ProductPicker({ items }: { items: PickItem[] }) {
  const [sel, setSel] = useState(0);
  const now = items[sel];

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] sm:items-start lg:gap-8">
      <ul aria-label="Chọn loại cửa để xem ảnh công trình">
        {items.map((it, k) => (
          <li key={it.name}>
            <button
              type="button"
              aria-pressed={k === sel}
              onClick={() => setSel(k)}
              className="group flex min-h-[48px] w-full items-baseline justify-between gap-4 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors",
                  k === sel ? "text-amber-300" : "text-white group-hover:text-amber-300"
                )}
              >
                {it.name}
              </span>
              <span className="whitespace-nowrap text-xl font-semibold tabular-nums text-white">
                {it.tu !== null ? (
                  <>
                    <span className="text-base font-normal text-white/80">từ </span>
                    {formatGia(it.tu)}
                  </>
                ) : (
                  "Liên hệ"
                )}
              </span>
            </button>
          </li>
        ))}
        <li className="pt-2 text-sm text-white/80">Đơn giá {items[0]?.unit}, đã gồm công lắp đặt.</li>
      </ul>

      <figure>
        {/* The load rise sits on the frame, never on the stacked photos: its fill-mode would pin them all visible. */}
        <div className="bg-rise-in relative aspect-[4/5] overflow-hidden bg-brand-50">
          {items.map((it, k) => (
            <Image
              key={it.name}
              src={it.photo.src}
              alt={it.photo.alt}
              fill
              priority={k === 0}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className={cn("object-cover transition-opacity duration-300", k === sel ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-white/85">
          <span>{now.photo.caption}</span>
          <a
            href={now.href}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-white underline decoration-amber-400 decoration-2 underline-offset-4 transition hover:decoration-4"
          >
            Xem giá {now.name.toLowerCase()} <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
