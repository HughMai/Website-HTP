"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  label: string;
  /** Link to the full công trình page, shown under the enlarged photo. */
  href?: string;
  /** Show the whole photo on white instead of filling the tile: the catalog's tall slat cutouts. */
  contain?: boolean;
};

/**
 * Product photo grid with click-to-enlarge.
 *
 *   grid tile (button) ──click──► Radix Dialog
 *                                   ├── ← / → or arrow keys walk the set
 *                                   ├── Esc or the X closes
 *                                   ├── caption + "xem công trình" link
 *                                   └── with `ask`: the Zalo form, the lead naming the photo
 *
 * Plain, it is the gallery of real HTP installs the product pages use. With `cards` it is a
 * design grid like the old site's category page (nhôm kính, 24/11/2026): square photos with the
 * design's name under each and a line saying a tap asks its price. The parent resolves photos
 * server-side, which keeps the 95KB công trình library out of this client bundle.
 */
export function ProductGallery({
  items,
  className,
  ask,
  cards = false,
}: {
  items: GalleryItem[];
  className?: string;
  /** Puts the one-field Zalo form in the lightbox; the lead's need names the photo. */
  ask?: { source: string };
  /** Design cards: square photo, the name centred under it, and "Hỏi giá qua Zalo". */
  cards?: boolean;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const open = openIndex !== null;
  const current = open ? items[openIndex] : null;

  const go = React.useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
    },
    [items.length]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Arrow keys inside the phone field move the caret, not the photo.
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (items.length === 0) return null;

  return (
    <>
      <ul
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          cards ? "gap-x-3 gap-y-7 md:gap-x-5" : "gap-3",
          className
        )}
      >
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              // 44px floor is inherited from the aspect-ratio tile, which is
              // always far taller than that at every breakpoint.
              className={cn(
                "group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                cards ? "rounded-xl" : "overflow-hidden rounded-xl border border-brand/10 bg-brand-50"
              )}
              aria-label={`Xem ảnh lớn: ${item.label}`}
            >
              <span
                className={cn(
                  "relative block",
                  cards ? "aspect-square overflow-hidden rounded-xl border border-brand/10" : "aspect-[4/3]",
                  cards && (item.contain ? "bg-white" : "bg-brand-50")
                )}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-105",
                    item.contain ? "object-contain p-3" : "object-cover"
                  )}
                />
                <span className="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/20" />
                <span className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/85 opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4 text-brand" aria-hidden />
                </span>
              </span>
              {cards ? (
                <span className="block px-1 pt-3 text-center">
                  <span className="block text-xs font-semibold uppercase leading-snug text-brand sm:text-sm">
                    {item.label}
                  </span>
                  <span className="mt-1.5 block text-xs font-semibold text-amber-700 group-hover:underline sm:text-sm">
                    Hỏi giá qua Zalo
                  </span>
                </span>
              ) : (
                <span className="block px-3 py-2 text-xs font-medium leading-snug text-brand/75">{item.label}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-brand/85 backdrop-blur-sm" />
          {/* Scrolls when the photo plus the form are taller than a phone screen; centred otherwise. */}
          <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto focus:outline-none" aria-describedby={undefined}>
            <Dialog.Title className="sr-only">
              {current ? current.label : "Ảnh công trình"}
            </Dialog.Title>

            <div className="flex min-h-full items-center justify-center p-4 pt-16 md:pt-4">
              {current && (
                <div className={cn("relative w-full", ask ? "max-w-2xl" : "max-w-4xl")}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/30">
                    <Image
                      src={current.src}
                      alt={current.label}
                      fill
                      sizes="(max-width: 1024px) 92vw, 900px"
                      className="object-contain"
                      priority
                    />
                    {items.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          aria-label="Ảnh trước"
                          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                        >
                          <ChevronLeft className="h-6 w-6" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          aria-label="Ảnh kế tiếp"
                          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                        >
                          <ChevronRight className="h-6 w-6" aria-hidden />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">
                      {current.label}
                      <span className="ml-2 text-white/55">
                        {(openIndex ?? 0) + 1}/{items.length}
                      </span>
                    </p>
                    {current.href && (
                      <a
                        href={current.href}
                        className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-amber-300 underline underline-offset-4"
                      >
                        Xem công trình này
                      </a>
                    )}
                  </div>

                  {ask && (
                    <div className="mt-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10" data-track="nk_gallery">
                      <p className="text-base font-semibold text-white">Hỏi giá mẫu này qua Zalo</p>
                      <LeadForm
                        source={ask.source}
                        tone="dark"
                        submitLabel="Hỏi giá mẫu này"
                        className="mt-3"
                        message={`Hỏi giá mẫu: ${current.label} · ảnh ${current.src}`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <Dialog.Close
              aria-label="Đóng"
              className="fixed right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            >
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
