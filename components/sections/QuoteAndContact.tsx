"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SITE } from "@/lib/site-data";

// ─── Pricing engine ──────────────────────────────────────────────────────────

const PRICE_PER_SQM: Record<string, number> = {
  "Cửa cuốn công nghệ Đức|KV 380":    1_450_000,
  "Cửa cuốn công nghệ Đức|KV 422 R":  1_750_000,
  "Cửa cuốn công nghệ Đức|KV 432 R":  1_950_000,
  "Cửa cuốn công nghệ Đức|KV 468 R":  2_150_000,
  "Cửa cuốn công nghệ Đức|CT 5222 R": 2_200_000,
  "Cửa cuốn công nghệ Đức|MT 5222 R": 2_300_000,
  "Inox|6zem": 1_700_000,  "Inox|8zem": 1_900_000,
  "Cửa cuốn công nghệ Đài Loan|6zem": 500_000,
  "Cửa cuốn công nghệ Đài Loan|8zem": 560_000,
  "Cửa cuốn công nghệ Đài Loan|1ly":  780_000,
  "Cửa cuốn công nghệ Úc|Tole màu 5.2 zem":       700_000,
  "Cửa cuốn công nghệ Úc|Tole màu 5.2 zem blusc": 900_000,
  "Cửa Kéo|Có lá - 6zem":   640_000, "Cửa Kéo|Có lá - 8zem":   700_000,
  "Cửa Kéo|Có lá - 1ly":    760_000, "Cửa Kéo|Có lá - 1.2ly":  820_000,
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
const LOCK_COST    = { tole: 350_000, uc: 450_000 };
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

// ─── Contact form schema ──────────────────────────────────────────────────────

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

const contactSchema = z.object({
  name:    z.string().trim().min(2, "Vui lòng nhập họ và tên (ít nhất 2 ký tự).").max(80),
  phone:   z.string().trim().regex(VN_PHONE_RE, "Vui lòng nhập đúng 10 chữ số (ví dụ: 0901234567)."),
  email:   z.preprocess((v) => (v === "" ? undefined : v), z.string().email("Email không hợp lệ.").optional()),
  message: z.preprocess((v) => (v === "" ? undefined : v), z.string().trim().max(500).optional()),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function QuoteAndContact() {
  const { toast } = useToast();

  // ── Estimator state ──────────────────────────────────────────────────────
  const [doorType, setDoorType]     = React.useState<DoorType>("Cửa Cuốn");
  const [tech, setTech]             = React.useState("");
  const [model, setModel]           = React.useState("");
  const [widthM, setWidthM]         = React.useState("");
  const [heightM, setHeightM]       = React.useState("");
  const [addMotor, setAddMotor]     = React.useState(false);
  const [motorUc, setMotorUc]       = React.useState(false);
  const [addLock, setAddLock]       = React.useState(false);
  const [lockUc, setLockUc]         = React.useState(false);
  const [addBattery, setAddBattery] = React.useState(false);

  const cfg    = DOOR_CONFIG[doorType];
  const models = tech ? ((cfg.modelsByTech as Record<string, string[]>)[tech] ?? []) : [];

  const handleDoorType = (t: DoorType) => {
    setDoorType(t); setTech(""); setModel("");
    setAddMotor(false); setMotorUc(false);
    setAddLock(false);  setLockUc(false); setAddBattery(false);
  };

  // ── Calculations ─────────────────────────────────────────────────────────
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
  const vat         = subtotal * 0.1;
  const grandTotal  = subtotal + vat;
  const hasPrice    = basePerSqm > 0 && area > 0;

  // ── Contact form ─────────────────────────────────────────────────────────
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormValues>({
      resolver: zodResolver(contactSchema),
      defaultValues: { name: "", phone: "", email: "", message: "" },
      mode: "onTouched",
    });

  const onSubmit = async (data: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast({ title: "Gửi thất bại", description: "Vui lòng thử lại hoặc gọi trực tiếp.", variant: "destructive" });
      return;
    }
    toast({ title: "Gửi yêu cầu thành công!", description: "Hưng Thành Phát sẽ liên hệ trong vòng 15 phút." });
    reset();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      id="lien-he"
      aria-labelledby="contact-heading"
      className="relative bg-brand py-16 text-white md:py-20"
    >
      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 100% at 50% 100%,black 30%,transparent 80%)",
        }}
      />

      <div className="container relative">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-8 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            Thông Tin Liên Hệ
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Gọi ngay hoặc để lại thông tin.
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {SITE.hotlines.map((hotline) => (
              <a
                key={hotline}
                href={`tel:${hotline.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {hotline}
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/45">{SITE.workingHours}</p>
        </motion.div>

        {/* Side-by-side panels */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={1}
          className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8"
        >

          {/* ── Left: Price estimator ────────────────────────────────────── */}
          <div className="overflow-hidden rounded-2xl bg-white text-brand shadow-2xl">
            <div aria-hidden className="h-1 bg-gradient-to-r from-brand via-brand-300 to-brand-100" />
            <div className="p-5 md:p-6">

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/40">
                Ước Tính Giá Tham Khảo
              </p>

              {/* Door type */}
              <div className="mb-4 grid grid-cols-3 gap-1.5">
                {DOOR_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleDoorType(t)}
                    className={
                      "rounded-lg border py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 " +
                      (doorType === t
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-brand/15 text-brand/55 hover:border-brand/35 hover:text-brand")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Tech + Model */}
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1 text-xs text-brand/50">{cfg.techLabel}</p>
                  <select
                    value={tech}
                    onChange={(e) => { setTech(e.target.value); setModel(""); }}
                    className="w-full cursor-pointer rounded-lg border border-brand/20 bg-white px-2.5 py-2 text-xs text-brand outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                  >
                    <option value="">— Chọn —</option>
                    {(cfg.techs as unknown as string[]).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="mb-1 text-xs text-brand/50">Mẫu</p>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!tech || models.length === 0}
                    className="w-full cursor-pointer rounded-lg border border-brand/20 bg-white px-2.5 py-2 text-xs text-brand outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                  >
                    <option value="">— Chọn mẫu —</option>
                    {models.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Dimensions */}
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qc-w" className="mb-1 block text-xs text-brand/50">Rộng (m)</label>
                  <Input id="qc-w" type="number" min="0.3" max="20" step="0.01"
                    placeholder="vd. 3.5" value={widthM} onChange={(e) => setWidthM(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="qc-h" className="mb-1 block text-xs text-brand/50">Cao (m)</label>
                  <Input id="qc-h" type="number" min="0.3" max="15" step="0.01"
                    placeholder="vd. 2.5" value={heightM} onChange={(e) => setHeightM(e.target.value)} />
                </div>
              </div>
              {w > 0 && h > 0 && (
                <p className="mb-3 text-[11px] text-brand/40">Diện tích: {area.toFixed(2)} m²</p>
              )}

              {/* Accessories — Cửa Cuốn only */}
              {cfg.hasMotor && (
                <div className="mb-4 space-y-2">
                  <p className="text-xs text-brand/50">Phụ kiện</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs text-brand/70">
                      <input type="checkbox" checked={addMotor}
                        onChange={(e) => setAddMotor(e.target.checked)} className="accent-brand" />
                      Motor
                    </label>
                    {addMotor && (
                      <>
                        <label className="flex cursor-pointer items-center gap-1 text-xs text-brand/55">
                          <input type="radio" name="mtr" checked={!motorUc}
                            onChange={() => setMotorUc(false)} className="accent-brand" />
                          Tiêu chuẩn ({mTier})
                        </label>
                        <label className="flex cursor-pointer items-center gap-1 text-xs text-brand/55">
                          <input type="radio" name="mtr" checked={motorUc}
                            onChange={() => setMotorUc(true)} className="accent-brand" />
                          Công nghệ Úc
                        </label>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs text-brand/70">
                      <input type="checkbox" checked={addLock}
                        onChange={(e) => setAddLock(e.target.checked)} className="accent-brand" />
                      Khóa ngang
                    </label>
                    {addLock && (
                      <>
                        <label className="flex cursor-pointer items-center gap-1 text-xs text-brand/55">
                          <input type="radio" name="lck" checked={!lockUc}
                            onChange={() => setLockUc(false)} className="accent-brand" />
                          Tole
                        </label>
                        <label className="flex cursor-pointer items-center gap-1 text-xs text-brand/55">
                          <input type="radio" name="lck" checked={lockUc}
                            onChange={() => setLockUc(true)} className="accent-brand" />
                          Công nghệ Úc
                        </label>
                      </>
                    )}
                  </div>
                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-brand/70">
                    <input type="checkbox" checked={addBattery}
                      onChange={(e) => setAddBattery(e.target.checked)} className="accent-brand" />
                    Bình Tích Điện
                  </label>
                </div>
              )}

              {/* Price breakdown */}
              {hasPrice ? (
                <div className="rounded-xl bg-brand p-4 text-white">
                  <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                    Chi tiết ước tính
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">
                        Cửa ({area.toFixed(2)} m² × {fmt(basePerSqm)}/m²
                        {perSqmSurch > 0 && ` + ${fmt(perSqmSurch)}`})
                      </span>
                      <span className="ml-3 shrink-0 font-medium">{fmt(doorCost)}</span>
                    </div>
                    {flatSurch > 0 && (
                      <div className="flex justify-between text-white/60">
                        <span>Phụ thu công nghệ Úc</span>
                        <span className="ml-3 shrink-0">{fmt(flatSurch)}</span>
                      </div>
                    )}
                    {motorCost > 0 && (
                      <div className="flex justify-between text-white/70">
                        <span>Motor {motorUc ? "Úc" : mTier}</span>
                        <span className="ml-3 shrink-0">{fmt(motorCost)}</span>
                      </div>
                    )}
                    {lockCost > 0 && (
                      <div className="flex justify-between text-white/70">
                        <span>Khóa ngang {lockUc ? "(Úc)" : "(tole)"}</span>
                        <span className="ml-3 shrink-0">{fmt(lockCost)}</span>
                      </div>
                    )}
                    {batteryCost > 0 && (
                      <div className="flex justify-between text-white/70">
                        <span>Bình Tích Điện</span>
                        <span className="ml-3 shrink-0">{fmt(batteryCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-white/15 pt-1.5 text-white/55">
                      <span>Tổng cộng</span>
                      <span className="ml-3 shrink-0">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/45">
                      <span>VAT (10%)</span>
                      <span className="ml-3 shrink-0">{fmt(vat)}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-3">
                    <span className="text-sm font-medium text-white/75">Tổng tiền ước tính</span>
                    <span className="text-xl font-bold tracking-tight">{fmt(grandTotal)}</span>
                  </div>
                  <p className="mt-2 text-[10px] text-white/30">
                    * Chưa bao gồm thi công & vận chuyển. Báo giá chính thức sau khảo sát.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-brand/15 bg-brand-50/60 px-4 py-5 text-center text-sm text-brand/35">
                  {!tech
                    ? `Chọn ${cfg.techLabel.toLowerCase()} để bắt đầu.`
                    : !model && models.length > 0
                    ? "Chọn mẫu để xem giá."
                    : "Nhập kích thước để xem giá."}
                </div>
              )}

            </div>
          </div>

          {/* ── Right: Contact form ──────────────────────────────────────── */}
          <div className="rounded-2xl bg-white text-brand shadow-2xl">
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-brand">Yêu cầu báo giá miễn phí</h3>
              <p className="mt-1 text-sm text-brand/65">
                Chuyên viên sẽ phản hồi trong vòng 15 phút.
              </p>

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 space-y-4"
                aria-label="Form yêu cầu báo giá"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="c-name">Họ và Tên <span className="text-destructive">*</span></Label>
                  <Input id="c-name" placeholder="Nguyễn Văn A" autoComplete="name"
                    aria-invalid={!!errors.name} {...register("name")} />
                  {errors.name && <p role="alert" className="text-xs font-medium text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-phone">Số Điện Thoại <span className="text-destructive">*</span></Label>
                  <Input id="c-phone" placeholder="0901234567" inputMode="tel" autoComplete="tel"
                    maxLength={10} aria-invalid={!!errors.phone} {...register("phone")} />
                  {errors.phone && <p role="alert" className="text-xs font-medium text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-email">
                    Email <span className="font-normal text-brand/40">(Không bắt buộc)</span>
                  </Label>
                  <Input id="c-email" type="email" placeholder="example@gmail.com"
                    inputMode="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                  {errors.email && <p role="alert" className="text-xs font-medium text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-message">
                    Nhu Cầu / Lời Nhắn <span className="font-normal text-brand/40">(Không bắt buộc)</span>
                  </Label>
                  <Textarea id="c-message" placeholder="Ví dụ: Cần báo giá cửa cuốn mặt tiền nhà phố 4m..."
                    aria-invalid={!!errors.message} {...register("message")} />
                  {errors.message && <p role="alert" className="text-xs font-medium text-destructive">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Đang gửi...</>
                  ) : (
                    <><Send className="h-4 w-4" aria-hidden />Gửi Yêu Cầu Báo Giá</>
                  )}
                </Button>

                <p className="text-center text-xs text-brand/45">
                  Bằng việc gửi yêu cầu, Quý khách đồng ý cho Hưng Thành Phát liên hệ qua số điện thoại đã cung cấp.
                </p>
              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
