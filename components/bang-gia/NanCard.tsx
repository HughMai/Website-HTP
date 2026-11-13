import Image from "next/image";
import type { MauNan } from "@/lib/bang-gia-data";
import { HiddenPrice } from "@/components/PriceGate";
import { nanAnchor, type NanSpec } from "@/lib/bang-gia-specs";
import { ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { FIELD } from "./parts";

/**
 * One slat model as a specimen: the sample alone on a flat tile (profile shot, white studio
 * ground multiplied away), the face strip beneath it (printed code, vents), then the code,
 * price and specs outside the tile. Every card has the same width and the same tile and face
 * ratios, so the tiles line up across each row; specs are a label column beside a value column.
 *
 *   phone                     ≥ sm
 *   ┌────────┬───────────┐    ┌──────────┐
 *   │ tile   │ code      │    │  tile    │
 *   │        │ price     │    ├──────────┤ face
 *   ├────────┤ specs     │    code · brand
 *   │ face   │           │    price
 *   └────────┴───────────┘    specs
 *
 * Photos are HTP's own shots of the samples in the showroom (Enki/htp/catalog/anh-mau).
 */
/** A slat model without its price: the card renders inside a client component, whose props
 *  are written into the page's HTML, so the figure is dropped before it gets there. */
export type NanCardModel = Omit<MauNan, "gia"> & { priced: boolean };

export function toNanCardModel(m: MauNan): NanCardModel {
  const { gia, ...rest } = m;
  return { ...rest, priced: gia !== null };
}

export function NanCard({ mau, spec }: { mau: NanCardModel; spec?: NanSpec }) {
  const hero = mau.goc ?? mau.mat;
  const face = mau.goc ? mau.mat : null;
  const all: [string, string | undefined][] = [
    ["Kiểu nan", spec?.kieu],
    ["Độ dày", spec?.day ?? (mau.printed || undefined)],
    ["Kết cấu", spec?.ketCau],
    ["Phù hợp", spec?.phuHop],
    ["Khổ tối đa", spec?.khoToiDa],
  ];
  const rows = all.filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <article
      id={nanAnchor(mau.code)}
      className="grid scroll-mt-28 grid-cols-[minmax(0,42%)_minmax(0,1fr)] items-start gap-x-4 sm:block"
    >
      <div>
        <div className={cn("relative aspect-square", FIELD[mau.brand] ?? "bg-brand-50")}>
          {hero && (
            <Image
              src={hero}
              alt={`Mẫu nan cửa cuốn ${mau.code} ${mau.brand}, ảnh chụp mẫu thật ở showroom`}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 42vw"
              className="object-contain p-[9%] mix-blend-multiply"
            />
          )}
        </div>
        {face && (
          <div className="relative aspect-[4/1]">
            <Image
              src={face}
              alt={`Mặt nan ${mau.code}: chữ in và lỗ thoáng`}
              fill
              sizes="(min-width: 1024px) 400px, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="sm:mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-xl font-semibold leading-tight text-brand">{mau.code}</h3>
          <p className="text-sm text-slate-600">
            {mau.brand}
            {mau.line && ` · ${mau.line}`}
          </p>
        </div>
        {/* The rule under the price closes the heading block; the specs below it read as one list. */}
        {mau.priced ? (
          <p className="mt-1 border-b border-brand-100 pb-3 text-xl font-semibold tabular-nums text-brand">
            <HiddenPrice /> <span className="text-base font-normal text-slate-600">đ/m²</span>
          </p>
        ) : (
          <div className="mt-0.5 border-b border-brand-100 pb-1.5">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-brand underline decoration-amber-400 decoration-2 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              Liên hệ báo giá
            </a>
          </div>
        )}
        {/* Label above value on a phone (the text column is ~190px); a fixed label column from sm up. */}
        <dl className="mt-3 space-y-2.5 leading-snug sm:space-y-2">
          {rows.map(([k, v]) => (
            <div key={k} className="sm:grid sm:grid-cols-[5.75rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-3">
              <dt className="text-sm text-slate-600 sm:text-base">{k}</dt>
              <dd className="mt-0.5 text-base text-brand sm:mt-0">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
