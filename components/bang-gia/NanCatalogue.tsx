"use client";

import { useState } from "react";
import type { MauNan } from "@/lib/bang-gia-data";
import type { NanSpec, NhuCau } from "@/lib/bang-gia-specs";
import { cn } from "@/lib/utils";
import { NanCard } from "./NanCard";

type Need = { key: NhuCau; ten: string; goiY: string; mau: string[] };

/**
 * The specimen grid plus its one live control: "Chọn theo nhu cầu" narrows the 19 samples to
 * the ones that fit a situation. Without JavaScript the chips are hidden (noscript style on the
 * page) and all samples show — nothing is lost, the specs on each card say the same.
 */
export function NanCatalogue({
  models,
  specs,
  needs,
  after,
}: {
  models: MauNan[];
  specs: Record<string, NanSpec>;
  needs: Need[];
  /** Extra grid cell after the cards ("Mẫu khác"), spans the rest of the last row. */
  after?: React.ReactNode;
}) {
  const [need, setNeed] = useState<NhuCau | null>(null);
  const active = needs.find((n) => n.key === need) ?? null;
  const shown = active ? models.filter((m) => active.mau.includes(m.code)).length : models.length;

  const chip = (on: boolean) =>
    cn(
      "inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-base font-medium transition active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400",
      on ? "bg-brand text-white" : "bg-brand-50 text-brand hover:bg-brand-100"
    );

  return (
    <>
      <div className="js-only mt-10" data-rise>
        <p className="text-xl font-semibold text-brand" id="chon-nhu-cau">
          Chọn theo nhu cầu
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5" role="group" aria-labelledby="chon-nhu-cau">
          <button type="button" aria-pressed={need === null} onClick={() => setNeed(null)} className={chip(need === null)}>
            Tất cả <span className="tabular-nums opacity-80">{models.length}</span>
          </button>
          {needs.map((n) => (
            <button
              key={n.key}
              type="button"
              aria-pressed={need === n.key}
              onClick={() => setNeed(need === n.key ? null : n.key)}
              className={chip(need === n.key)}
            >
              {n.ten} <span className="tabular-nums opacity-80">{n.mau.length}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 min-h-[3.25rem] max-w-[62ch] text-base leading-relaxed text-brand" aria-live="polite">
          {active ? (
            <>
              <span className="font-semibold">{shown} mẫu hợp.</span> {active.goiY}
            </>
          ) : (
            "Bấm một nhu cầu để chỉ hiện những mẫu nan hợp với nó."
          )}
        </p>
      </div>

      <div
        key={need ?? "all"}
        className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
      >
        {models.map((m, i) => {
          const on = !active || active.mau.includes(m.code);
          return (
            // Hide via the wrapper's class, not the card's `hidden` attribute: the card's own
            // `grid` / `sm:block` utilities outrank [hidden] and kept filtered cards on screen.
            <div
              key={m.code}
              className={cn(on ? "contents" : "hidden", need && on && "[&>article]:bg-rise-in")}
              style={{ "--rise-delay": `${Math.min(i, 8) * 40}ms` } as React.CSSProperties}
            >
              <NanCard mau={m} spec={specs[m.code]} />
            </div>
          );
        })}
        {!active && after}
      </div>
    </>
  );
}
