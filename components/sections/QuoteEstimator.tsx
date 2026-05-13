"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── Pricing engine ─────────────────────────────────────────────────────────

const PRICE_PER_SQM: Record<string, number> = {
  "Cửa cuốn công nghệ Đức|KV 380":    1_450_000,
  "Cửa cuốn công nghệ Đức|KV 422 R":  1_750_000,
  "Cửa cuốn công nghệ Đức|KV 432 R":  1_950_000,
  "Cửa cuốn công nghệ Đức|KV 468 R":  2_150_000,
  "Cửa cuốn công nghệ Đức|CT 5222 R": 2_200_000,
  "Cửa cuốn công nghệ Đức|MT 5222 R": 2_300_000,
  "Inox|6zem": 1_700_000,
  "Inox|8zem": 1_900_000,
  "Cửa cuốn công nghệ Đài Loan|6zem": 500_000,
  "Cửa cuốn công nghệ Đài Loan|8zem": 560_000,
  "Cửa cuốn công nghệ Đài Loan|1ly":  780_000,
  "Cửa cuốn công nghệ Úc|Tole màu 5.2 zem":       700_000,
  "Cửa cuốn công nghệ Úc|Tole màu 5.2 zem blusc": 900_000,
  "Cửa Kéo|Có lá - 6zem":   640_000,  "Cửa Kéo|Có lá - 8zem":   700_000,
  "Cửa Kéo|Có lá - 1ly":    760_000,  "Cửa Kéo|Có lá - 1.2ly":  820_000,
  "Cửa Kéo|Có lá - 1.4ly":  900_000,
  "Cửa Kéo|Không lá - 6zem":  540_000, "Cửa Kéo|Không lá - 8zem":  600_000,
  "Cửa Kéo|Không lá - 1ly":   660_000, "Cửa Kéo|Không lá - 1.2ly": 720_000,
  "Cửa Kéo|Không lá - 1.4ly": 800_000,
  "Nhôm Việt|Cửa đi 1.2ly":    2_200_000, "Nhôm Việt|Cửa đi 1.4ly":    2_400_000,
  "Nhôm Việt|Cửa đi 2.0ly":    2_600_000, "Nhôm Việt|Cửa sổ 1.2ly":    2_100_000,
  "Nhôm Việt|Cửa sổ 1.4ly":    2_300_000, "Nhôm Việt|Vách kính 1.2ly": 1_400_000,
  "Nhôm Việt|Vách kính 1.4ly": 1_500_000,
  "Nhôm Nhập|Cửa đi 1.4ly":    2_600_000, "Nhôm Nhập|Cửa đi 2.0ly":    2_800_000,
  "Nhôm Nhập|Cửa sổ 1.4ly":    2_500_000, "Nhôm Nhập|Vách kính 1.4ly": 1_700_000,
  "Nhôm Maxpro|Hệ 55": 4_000_000, "Nhôm Maxpro|Hệ 65": 4_600_000,
  "Nhôm Maxpro|Hệ 83": 5_800_000,
  "Cửa kính bản lề sàn|10 ly": 1_500_000, "Cửa kính bản lề sàn|12 ly": 1_650_000,
  "Lan can cầu thang|Tay gỗ":           1_950_000,
  "Lan can cầu thang|Tay nhôm 3D 2*2":  2_050_000,
  "Lan can cầu thang|Tay nhôm 3D 3*3":  2_300_000,
  "Lan can cầu thang|Tay nhôm 3D 4*4":  2_600_000,
  "Lan can cầu thang|Máng cover":        5_800_000,
};

function lookupPrice(doorType: string, tech: string, model: string): number {
  const key = doorType === "Cửa Kéo" ? `Cửa Kéo|${tech} - ${model}` : `${tech}|${model}`;
  return PRICE_PER_SQM[key] ?? 0;
}

function smallDoorSurcharge(doorType: string, area: number): number {
  if (doorType === "Cửa Nhôm Kính") return 0;
  if (area < 5) return 40_000;
  if (area < 8) return 20_000;
  return 0;
}

function ucFlatSurcharge(tech: string, area: number): number {
  return tech === "Cửa cuốn công nghệ Úc" && area < 8 ? 600_000 : 0;
}

function motorTier(area: number): "300kg" | "400kg" | "500kg" {
  if (area < 12) return "300kg";
  if (area < 14.5) return "400kg";
  return "500kg";
}

const MOTOR_COST: Record<string, number> = {
  "300kg": 3_300_000, "400kg": 3_500_000, "500kg": 4_000_000, "Úc": 4_500_000,
};
const LOCK_COST   = { tole: 350_000, uc: 450_000 };
const BATTERY_COST = 2_200_000;

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

// ─── Door config ─────────────────────────────────────────────────────────────

const DOOR_CONFIG = {
  "Cửa Cuốn": {
    techLabel: "Công nghệ",
    techs: ["Cửa cuốn công nghệ Đức", "Cửa cuốn công nghệ Úc", "Cửa cuốn công nghệ Đài Loan", "Inox"],
    modelsByTech: {
      "Cửa cuốn công nghệ Đức":      ["KV 380", "KV 422 R", "KV 432 R", "KV 468 R", "CT 5222 R", "MT 5222 R"],
      "Cửa cuốn công nghệ Úc":       ["Tole màu 5.2 zem", "Tole màu 5.2 zem blusc"],
      "Cửa cuốn công nghệ Đài Loan": ["6zem", "8zem", "1ly"],
      "Inox":                         ["6zem", "8zem"],
    } as Record<string, string[]>,
    hasMotor: true,
  },
  "Cửa Kéo": {
    techLabel: "Loại",
    techs: ["Có lá", "Không lá"],
    modelsByTech: {
      "Có lá":    ["6zem", "8zem", "1ly", "1.2ly", "1.4ly"],
      "Không lá": ["6zem", "8zem", "1ly", "1.2ly", "1.4ly"],
    } as Record<string, string[]>,
    hasMotor: false,
  },
  "Cửa Nhôm Kính": {
    techLabel: "Phân loại",
    techs: ["Nhôm Việt", "Nhôm Nhập", "Nhôm Maxpro", "Cửa kính bản lề sàn", "Lan can cầu thang"],
    modelsByTech: {
      "Nhôm Việt":           ["Cửa đi 1.2ly", "Cửa đi 1.4ly", "Cửa đi 2.0ly", "Cửa sổ 1.2ly", "Cửa sổ 1.4ly", "Vách kính 1.2ly", "Vách kính 1.4ly"],
      "Nhôm Nhập":           ["Cửa đi 1.4ly", "Cửa đi 2.0ly", "Cửa sổ 1.4ly", "Vách kính 1.4ly"],
      "Nhôm Maxpro":         ["Hệ 55", "Hệ 65", "Hệ 83"],
      "Cửa kính bản lề sàn": ["10 ly", "12 ly"],
      "Lan can cầu thang":   ["Tay gỗ", "Tay nhôm 3D 2*2", "Tay nhôm 3D 3*3", "Tay nhôm 3D 4*4", "Máng cover"],
    } as Record<string, string[]>,
    hasMotor: false,
  },
} as const;

type DoorType = keyof typeof DOOR_CONFIG;
const DOOR_TYPES = Object.keys(DOOR_CONFIG) as DoorType[];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function QuoteEstimator() {
  const [doorType, setDoorType] = React.useState<DoorType>("Cửa Cuốn");
  const [tech, setTech]         = React.useState("");
  const [model, setModel]       = React.useState("");
  const [widthM, setWidthM]     = React.useState("");
  const [heightM, setHeightM]   = React.useState("");
  const [addMotor, setAddMotor] = React.useState(false);
  const [motorUc, setMotorUc]   = React.useState(false);
  const [addLock, setAddLock]   = React.useState(false);
  const [lockUc, setLockUc]     = React.useState(false);
  const [addBattery, setAddBattery] = React.useState(false);

  const cfg    = DOOR_CONFIG[doorType];
  const models = tech ? ((cfg.modelsByTech as Record<string, string[]>)[tech] ?? []) : [];

  const reset = (t: DoorType) => {
    setDoorType(t); setTech(""); setModel("");
    setAddMotor(false); setMotorUc(false);
    setAddLock(false);  setLockUc(false); setAddBattery(false);
  };

  const w    = parseFloat(widthM)  || 0;
  const h    = parseFloat(heightM) || 0;
  const area = w * h;

  const basePerSqm  = tech && model ? lookupPrice(doorType, tech, model) : 0;
  const perSqmSurch = area > 0 ? smallDoorSurcharge(doorType, area) : 0;
  const flatSurch   = tech && area > 0 ? ucFlatSurcharge(tech, area) : 0;
  const doorCost    = basePerSqm > 0 && area > 0 ? (basePerSqm + perSqmSurch) * area + flatSurch : 0;

  const mTier       = area > 0 ? motorTier(area) : "300kg";
  const motorCost   = addMotor   ? MOTOR_COST[motorUc ? "Úc" : mTier] : 0;
  const lockCost    = addLock    ? (lockUc ? LOCK_COST.uc : LOCK_COST.tole) : 0;
  const batteryCost = addBattery ? BATTERY_COST : 0;
  const subtotal    = doorCost + motorCost + lockCost + batteryCost;
  const grandTotal  = subtotal * 1.1;
  const hasPrice    = basePerSqm > 0 && area > 0;

  return (
    <section
      id="uoc-tinh-gia"
      aria-label="Công cụ ước tính giá"
      className="relative bg-white py-12 md:py-16"
    >
      {/* Subtle top border */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl"
        >
          {/* Section label */}
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand/40">
            Ước Tính Giá Tham Khảo
          </p>

          <div className="overflow-hidden rounded-2xl border border-brand/10 shadow-[0_8px_40px_-12px_rgba(10,37,64,0.12)]">
            {/* Gradient accent bar */}
            <div aria-hidden className="h-1 bg-gradient-to-r from-brand via-brand-300 to-brand-100" />

            <div className="p-5 md:p-6">

              {/* Door type */}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {DOOR_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => reset(t)}
                    className={
                      "rounded-lg border py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 " +
                      (doorType === t
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-brand/15 text-brand/60 hover:border-brand/35 hover:text-brand")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Tech + Model row */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1.5 text-xs font-medium text-brand/55">{cfg.techLabel}</p>
                  <select
                    value={tech}
                    onChange={(e) => { setTech(e.target.value); setModel(""); }}
                    className="w-full cursor-pointer rounded-lg border border-brand/20 bg-white px-3 py-2 text-sm text-brand outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                  >
                    <option value="">— Chọn —</option>
                    {(cfg.techs as unknown as string[]).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-medium text-brand/55">Mẫu</p>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!tech || models.length === 0}
                    className="w-full cursor-pointer rounded-lg border border-brand/20 bg-white px-3 py-2 text-sm text-brand outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                  >
                    <option value="">— Chọn mẫu —</option>
                    {models.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Dimensions */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="est-w" className="mb-1.5 block text-xs font-medium text-brand/55">
                    Chiều rộng (m)
                  </label>
                  <Input id="est-w" type="number" min="0.3" max="20" step="0.01"
                    placeholder="vd. 3.5" value={widthM} onChange={(e) => setWidthM(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="est-h" className="mb-1.5 block text-xs font-medium text-brand/55">
                    Chiều cao (m)
                  </label>
                  <Input id="est-h" type="number" min="0.3" max="15" step="0.01"
                    placeholder="vd. 2.5" value={heightM} onChange={(e) => setHeightM(e.target.value)} />
                </div>
              </div>

              {/* Accessories — Cửa Cuốn only */}
              {cfg.hasMotor && (
                <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-brand/70">
                    <input type="checkbox" checked={addMotor} onChange={(e) => setAddMotor(e.target.checked)} className="accent-brand" />
                    Motor
                    {addMotor && (
                      <span className="flex gap-2 ml-1">
                        <label className="flex items-center gap-1 text-xs text-brand/55 cursor-pointer">
                          <input type="radio" name="mtr" checked={!motorUc} onChange={() => setMotorUc(false)} className="accent-brand" />
                          Tiêu chuẩn
                        </label>
                        <label className="flex items-center gap-1 text-xs text-brand/55 cursor-pointer">
                          <input type="radio" name="mtr" checked={motorUc} onChange={() => setMotorUc(true)} className="accent-brand" />
                          Úc
                        </label>
                      </span>
                    )}
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-brand/70">
                    <input type="checkbox" checked={addLock} onChange={(e) => setAddLock(e.target.checked)} className="accent-brand" />
                    Khóa ngang
                    {addLock && (
                      <span className="flex gap-2 ml-1">
                        <label className="flex items-center gap-1 text-xs text-brand/55 cursor-pointer">
                          <input type="radio" name="lck" checked={!lockUc} onChange={() => setLockUc(false)} className="accent-brand" />
                          Tole
                        </label>
                        <label className="flex items-center gap-1 text-xs text-brand/55 cursor-pointer">
                          <input type="radio" name="lck" checked={lockUc} onChange={() => setLockUc(true)} className="accent-brand" />
                          Úc
                        </label>
                      </span>
                    )}
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-brand/70">
                    <input type="checkbox" checked={addBattery} onChange={(e) => setAddBattery(e.target.checked)} className="accent-brand" />
                    Bình Tích Điện
                  </label>
                </div>
              )}

              {/* Price result */}
              {hasPrice ? (
                <div className="rounded-xl bg-brand px-5 py-4 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 text-sm text-white/65">
                      <p>Cửa · {area.toFixed(2)} m²</p>
                      {motorCost > 0  && <p>Motor {motorUc ? "Úc" : mTier}</p>}
                      {lockCost > 0   && <p>Khóa ngang {lockUc ? "(Úc)" : "(tole)"}</p>}
                      {batteryCost > 0 && <p>Bình Tích Điện</p>}
                      <p className="text-white/40 text-xs pt-1">VAT 10% đã tính</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-white/45 mb-1">Ước tính</p>
                      <p className="text-2xl font-bold tracking-tight">{fmt(grandTotal)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-brand/15 bg-brand-50/50 px-5 py-4 text-center text-sm text-brand/35">
                  {!tech ? "Chọn công nghệ →" : !model ? "Chọn mẫu →" : "Nhập kích thước →"}
                </div>
              )}

              {/* CTA */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-4 w-full border-brand/20 text-brand hover:bg-brand hover:text-white"
              >
                <a href="#lien-he">
                  <ArrowDown className="h-4 w-4" aria-hidden />
                  Gửi yêu cầu báo giá chính thức
                </a>
              </Button>

              <p className="mt-3 text-center text-[11px] text-brand/35">
                Giá tham khảo · Chưa bao gồm thi công & vận chuyển
              </p>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
