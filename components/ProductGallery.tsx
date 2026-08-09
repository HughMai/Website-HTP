"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  label: string;
  /** Link to the full công trình page, shown under the enlarged photo. */
  href?: string;
};

/**
 * Product photo grid with click-to-enlarge.
 *
 *   grid tile (button) ──click──► Radix Dialog
 *                                   ├── ← / → or arrow keys walk the set
 *                                   ├── Esc or the X closes
 *                                   └── caption + "xem công trình" link
 *
 * Every photo is a real HTP install passed in from the server, so the
 * "ảnh thực tế, không phải ảnh mẫu" promise holds. The parent resolves slugs
 * against cong-trinh-data server-side, which keeps that 95KB library out of
 * this client bundle.
 */
export function ProductGallery({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
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
          "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
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
              className="group relative block w-full overflow-hidden rounded-xl border border-brand/10 bg-brand-50 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              aria-label={`Xem ảnh lớn: ${item.label}`}
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/20" />
                <span className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/85 opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4 text-brand" aria-hidden />
                </span>
              </span>
              <span className="block px-3 py-2 text-xs font-medium leading-snug text-brand/75">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-brand/85 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">
              {current ? current.label : "Ảnh công trình"}
            </Dialog.Title>

            {current && (
              <div className="relative w-full max-w-4xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/30">
                  <Image
                    src={current.src}
                    alt={current.label}
                    fill
                    sizes="(max-width: 1024px) 92vw, 900px"
                    className="object-contain"
                    priority
                  />
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
              </div>
            )}

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 md:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Ảnh kế tiếp"
                  className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 md:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}

            <Dialog.Close
              aria-label="Đóng"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            >
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
