"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = React.useState<number | null>(null);
  const open = idx !== null;

  const step = React.useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIdx(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-brand/10 bg-brand-50"
            aria-label={`Xem ảnh ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — ảnh ${i + 1}`}
              fill
              sizes="(min-width:640px) 30vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {open && idx !== null && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-brand-900/95"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — thư viện ảnh`}
          onClick={() => setIdx(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="truncate pr-3 text-sm font-medium">{title}</span>
            <button
              type="button"
              onClick={() => setIdx(null)}
              aria-label="Đóng"
              className="rounded-md p-1 transition hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Ảnh trước"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="relative h-full max-h-[78vh] w-full max-w-4xl">
              <Image
                src={images[idx]}
                alt={`${title} — ảnh ${idx + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Ảnh sau"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="py-4 text-center text-sm tabular-nums text-white/70">
            {idx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
