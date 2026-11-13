import { Lock, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/*
 * Prices are gated (Hughie, 13/11/2026; Enki/htp/ads/price-gate-2026-11-13.md): each
 * product family keeps one "từ X" starting price; every row's own price reads "Liên hệ"
 * and calls the hotline, and the full list goes out by Zalo, in the catalog the CRM bot
 * sends to the number left in the form (it carries the full retail list). The visitor
 * still sees whether HTP is in range; to compare row by row, they call or leave a number.
 * The /lp ad pages have no price table at all.
 */

const HOTLINE = SITE.hotlines[0];
const TEL = `tel:${HOTLINE.replace(/\s/g, "")}`;

/**
 * Where a row's price used to be: "Liên hệ" as a call button (Hughie, 13/11), so the
 * moment a visitor wants that price is one tap from the hotline. No figure is in the
 * HTML. The PriceGate under the table offers the full list by Zalo instead.
 */
export function CallForPrice({ className }: { className?: string }) {
  return (
    <a
      href={TEL}
      aria-label={`Liên hệ: gọi ${HOTLINE} để hỏi giá`}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-400 bg-amber-50 px-3 text-sm font-semibold text-brand transition-colors hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400",
        className
      )}
      data-price-call=""
      data-track="price_call"
    >
      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Liên hệ
    </a>
  );
}

/**
 * The ask under a price table. Install products: the one-field Zalo form, whose catalog
 * holds the full list. Repairs: there is no repair list to send (the price depends on
 * what is broken), so call or Zalo, and the visit is quoted before any work starts.
 */
export function PriceGate({
  source,
  kind = "install",
  tone = "light",
  className,
}: {
  /** CRM lead source, e.g. "Bảng giá cửa cuốn · nan nhôm". */
  source: string;
  kind?: "install" | "repair";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 md:p-6",
        dark ? "border-white/15 bg-white/5 text-white" : "border-brand/10 bg-brand-50/70 text-brand",
        className
      )}
      data-price-gate=""
      data-track="price_gate"
    >
      <p className="flex items-center gap-2 text-lg font-semibold leading-snug">
        <Lock className={cn("h-5 w-5 shrink-0", dark ? "text-amber-400" : "text-amber-600")} aria-hidden />
        {kind === "install" ? "Ghi số Zalo, nhận bảng giá đầy đủ trong 1–2 phút" : "Giá sửa tùy tình trạng cửa"}
      </p>
      {kind === "install" ? (
        <>
          <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-white/75" : "text-slate-600")}>
            Giá từng mẫu nằm trong bảng giá gửi qua Zalo. Giá đúng khổ cửa nhà mình: thợ đo tận nơi, báo giá miễn phí
            nội thành Cần Thơ.
          </p>
          <LeadForm source={source} tone={tone} submitLabel="Nhận bảng giá" className="mt-4 max-w-lg" />
          <p className={cn("mt-3 text-sm", dark ? "text-white/75" : "text-slate-600")}>
            Hoặc gọi{" "}
            <a href={TEL} className={cn("font-semibold underline underline-offset-4", dark ? "text-white" : "text-brand")}>
              {HOTLINE}
            </a>
            , {SITE.workingHours}.
          </p>
        </>
      ) : (
        <>
          <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-white/75" : "text-slate-600")}>
            Gọi hoặc nhắn Zalo, tả cửa đang bị gì. Thợ báo giá trước khi sửa, sửa xong mới thanh toán.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={TEL}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-base font-bold text-brand transition-colors hover:bg-amber-300"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Gọi {HOTLINE}
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors",
                dark ? "border-white/25 text-white hover:bg-white/10" : "border-brand/15 bg-white text-brand hover:bg-brand-50"
              )}
            >
              <MessageCircle className={cn("h-5 w-5", dark ? "text-sky-300" : "text-[#0068FF]")} aria-hidden />
              Nhắn Zalo
            </a>
          </div>
        </>
      )}
    </div>
  );
}
