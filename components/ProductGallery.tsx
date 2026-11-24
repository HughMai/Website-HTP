"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, MapPin, X, ZoomIn } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  label: string;
  /** Link to the full công trình page, shown under the enlarged photo. */
  href?: string;
  // The fields below serve a gallery that asks for a price per photo (nhôm kính, 24/11/2026).
  /** Short reference a customer can say on the phone, e.g. "X03" or "NK06". */
  code?: string;
  /** The filter pill the photo sits under. */
  kind?: string;
  /** "mau": a photo of a door type, not an HTP job. "cong-trinh": a real HTP job. */
  badge?: "mau" | "cong-trinh";
  /** Where and when, only where the job's record or stamp says so. */
  place?: string;
  chips?: string[];
};

const BADGE = { mau: "Mẫu", "cong-trinh": "Công trình thật" } as const;

/**
 * Product photo grid with click-to-enlarge.
 *
 *   [filter pills] ──► grid tile (button) ──click──► Radix Dialog
 *                                                     ├── ← / → or arrow keys walk the shown set
 *                                                     ├── Esc or the X closes
 *                                                     ├── caption + "xem công trình" link
 *                                                     └── with `ask`: the Zalo form, the lead naming the code
 *
 * Without `filters`, `ask` or `badge` it is the plain gallery of real HTP installs the product
 * pages use. The parent resolves photos server-side, which keeps the 95KB công trình library
 * out of this client bundle.
 */
export function ProductGallery({
  items,
  className,
  filters,
  ask,
  square = false,
}: {
  items: GalleryItem[];
  className?: string;
  /** Filter pills by `kind`, after "Tất cả". */
  filters?: readonly string[];
  /** Puts the one-field Zalo form in the lightbox; the lead's need names the photo's code. */
  ask?: { source: string };
  /** Square tiles, for square photos a 4:3 crop would cut into. */
  square?: boolean;
}) {
  const [filter, setFilter] = React.useState<string | null>(null);
  const shown = React.useMemo(() => (filter ? items.filter((i) => i.kind === filter) : items), [items, filter]);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const open = openIndex !== null;
  const current = open ? shown[openIndex] : null;

  const go = React.useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + shown.length) % shown.length));
    },
    [shown.length]
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
      {filters && (
        // Phones: one scrolling row of pills; wider screens: they wrap.
        <div
          role="group"
          aria-label="Lọc theo loại cửa"
          className="-mx-4 mb-5 flex snap-x gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
        >
          {[null, ...filters].map((f) => (
            <button
              key={f ?? "tat-ca"}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "h-11 shrink-0 snap-start whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                filter === f ? "border-brand bg-brand text-white" : "border-brand/20 bg-white text-brand hover:bg-brand-50"
              )}
            >
              {f ?? "Tất cả"}
            </button>
          ))}
        </div>
      )}

      <ul
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
          className
        )}
      >
        {shown.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              // 44px floor is inherited from the aspect-ratio tile, which is
              // always far taller than that at every breakpoint.
              className="group relative block w-full overflow-hidden rounded-xl border border-brand/10 bg-brand-50 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              aria-label={`Xem ảnh lớn: ${item.code ? `${item.code} · ` : ""}${item.label}`}
            >
              <span className={cn("relative block", square ? "aspect-square" : "aspect-[4/3]")}>
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
                {item.badge && (
                  <span
                    className={cn(
                      "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-sm",
                      item.badge === "cong-trinh" ? "bg-amber-400 text-brand" : "bg-white/90 text-brand"
                    )}
                  >
                    {BADGE[item.badge]}
                  </span>
                )}
              </span>
              <span className="block px-3 py-2 text-xs font-medium leading-snug text-brand/75">
                {item.code && <span className="mr-1 font-bold text-brand">{item.code}</span>}
                {item.label}
                {item.place && <span className="mt-0.5 block font-normal text-brand/60">{item.place}</span>}
              </span>
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
                    {shown.length > 1 && (
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
                      {current.code && <span className="mr-1.5 font-bold text-amber-300">{current.code}</span>}
                      {current.label}
                      <span className="ml-2 text-white/55">
                        {(openIndex ?? 0) + 1}/{shown.length}
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

                  {(current.badge || current.place || current.chips?.length) && (
                    <ul className="mt-2 flex flex-wrap gap-1.5 text-xs text-white/85">
                      {current.badge && <li className="rounded-full bg-white/10 px-2.5 py-1">{BADGE[current.badge]}</li>}
                      {current.place && (
                        <li className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
                          <MapPin className="h-3 w-3" aria-hidden />
                          {current.place}
                        </li>
                      )}
                      {current.chips?.map((c) => (
                        <li key={c} className="rounded-full bg-white/10 px-2.5 py-1">
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  {ask && current.code && (
                    <div className="mt-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10" data-track="nk_gallery">
                      <p className="text-base font-semibold text-white">Hỏi giá mẫu {current.code} qua Zalo</p>
                      <LeadForm
                        source={ask.source}
                        tone="dark"
                        submitLabel="Hỏi giá mẫu này"
                        className="mt-3"
                        message={`Hỏi giá mẫu ${current.code}: ${current.label}${current.place ? ` (${current.place})` : ""} · ảnh ${current.src}`}
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
