"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CallForPrice } from "@/components/PriceGate";
import type { Motor } from "@/lib/bang-gia-data";

const vn = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
const clamp = (n: number) => Math.min(12, Math.max(0.5, Math.round(n * 10) / 10));

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const id = `motor-${label}`;
  // Free typing (clear the field, type "0,8") — clamp only when the visitor leaves the field.
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = parseFloat(draft.replace(",", "."));
    if (!Number.isNaN(n)) onChange(clamp(n));
    setDraft(null);
  };
  const btn =
    "flex h-12 w-12 shrink-0 items-center justify-center bg-brand-50 text-brand transition hover:bg-brand-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400";
  return (
    <div>
      <label htmlFor={id} className="text-sm text-slate-600">
        {label} (mét)
      </label>
      <div className="mt-1.5 flex items-stretch">
        <button
          type="button"
          className={btn}
          onClick={() => {
            setDraft(null);
            onChange(clamp(value - 0.1));
          }}
          aria-label={`Giảm ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={draft ?? vn(value)}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
          }}
          className="h-12 w-full min-w-0 bg-slate-100 text-center text-base font-semibold tabular-nums text-brand focus:outline focus:outline-2 focus:outline-amber-400"
        />
        <button
          type="button"
          className={btn}
          onClick={() => {
            setDraft(null);
            onChange(clamp(value + 0.1));
          }}
          aria-label={`Tăng ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/**
 * The phụ kiện page's one live thing: door width × height → area → the motor tier the CRM
 * itself would pick (thresholds exported from pricing.resolve_motor_label). Its price is gated
 * like every row's (components/PriceGate.tsx), so the tiers come in without one.
 * Hidden without JavaScript; the full tier list sits right below it on the page.
 */
/** A motor tier without its price: this is a client component, so its props are written
 *  into the page's HTML (see components/PriceGate.tsx). */
export type MotorTier = Omit<Motor, "gia">;

export function MotorPicker({ motors }: { motors: MotorTier[] }) {
  const [w, setW] = useState(3.5);
  const [h, setH] = useState(3);
  const [uc, setUc] = useState(false);

  const area = w * h;
  const tier = uc
    ? motors.find((m) => m.sucNang === null)
    : motors.find((m) => m.tuM2 !== null && area >= m.tuM2 && (m.denM2 === null || area < m.denM2));

  return (
    <div className="js-only bg-white p-6 text-brand md:p-8">
      <h2 className="text-xl font-semibold">Cửa nhà bạn cần motor nào?</h2>
      <p className="mt-1 text-base text-slate-600">Nhập khổ cửa, máy chọn tải motor theo diện tích như khi báo giá.</p>
      <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-base">
        <input
          type="checkbox"
          checked={uc}
          onChange={(e) => setUc(e.target.checked)}
          className="h-5 w-5 accent-[#0A2540]"
        />
        Cửa cuốn công nghệ Úc
      </label>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <Stepper label="Rộng" value={w} onChange={setW} />
        <Stepper label="Cao" value={h} onChange={setH} />
      </div>
      {tier && (
        <div className="mt-5 bg-brand-50 p-5" aria-live="polite">
          <p className="text-xl font-semibold">{tier.name}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
            <CallForPrice />
            Giá theo bộ, gọi để hỏi.
          </p>
          <p className="mt-3 text-base">
            Cửa {vn(w)} × {vn(h)} m = <span className="font-semibold tabular-nums">{vn(area)} m²</span>.{" "}
            {uc ? "Cửa Úc dùng motor riêng, mọi kích thước." : `${tier.dienTich}.`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Cần mở cửa khi cúp điện: thêm bình tích điện (loại YH hoặc SH), tính riêng theo bộ.
          </p>
        </div>
      )}
    </div>
  );
}
