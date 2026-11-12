"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LeadError,
  LeadHoneypot,
  LeadTurnstile,
  useLeadSubmit,
} from "@/hooks/useLeadSubmit";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

/** "0901 234 567", "0901.234.567", "+84 901 234 567" → "0901234567". */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("84") && digits.length === 11 ? `0${digits.slice(2)}` : digits;
}

// One field. Every extra field costs conversions, and the Zalo number is the
// whole job: the CRM's Zalo bot sends the catalog to it straight away, and the
// customer's name comes from their Zalo profile. Also used by ZaloStickyBar.
export const leadSchema = z.object({
  phone: z
    .string()
    .transform(normalizePhone)
    .pipe(z.string().regex(VN_PHONE_RE, "Nhập đúng số Zalo 10 chữ số (ví dụ: 0901 234 567).")),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadValues = z.output<typeof leadSchema>;

/**
 * "Ghi số Zalo để nhận báo giá ngay lập tức": the visitor leaves a Zalo number,
 * the CRM's Zalo bot sends the catalog to it (product/htp-crm app.py
 * _deliver_catalog), and the family is pinged to call. Transport, error copy and
 * Turnstile live in `useLeadSubmit`, shared with Contact and QuoteAndContact.
 */
export function LeadForm({
  source,
  tone = "dark",
  className,
  submitLabel = "Nhận báo giá",
}: {
  source: string;
  tone?: "dark" | "light";
  className?: string;
  submitLabel?: string;
}) {
  const { status, errorMessage, isSubmitting, submit, dismissError, honeypotRef, turnstile } =
    useLeadSubmit(source);
  const [sentTo, setSentTo] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput, unknown, LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { phone: "" },
    mode: "onTouched",
  });

  const dark = tone === "dark";

  // Success REPLACES the form. A blank form after a successful submit reads as
  // "nothing happened" and invites the same customer to send twice.
  if (status === "success") {
    return <ZaloCatalogSent phone={sentTo} tone={tone} className={className} />;
  }

  const onSubmit = (values: LeadValues) => {
    setSentTo(values.phone);
    return submit({ phone: values.phone, message: "Nhận catalog & báo giá qua Zalo", catalog: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("relative w-full", className)} noValidate>
      <LeadHoneypot honeypotRef={honeypotRef} />

      {status === "error" && errorMessage && (
        <LeadError message={errorMessage} onRetry={dismissError} tone={tone} className="mb-3" />
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <MessageCircle
            className={cn(
              "pointer-events-none absolute left-3.5 top-3.5 h-5 w-5",
              dark ? "text-sky-300" : "text-[#0068FF]"
            )}
            aria-hidden
          />
          <Input
            {...register("phone")}
            type="tel"
            inputMode="tel"
            enterKeyHint="send"
            autoComplete="tel"
            placeholder="Số Zalo của anh/chị"
            aria-label="Số Zalo"
            aria-invalid={!!errors.phone}
            className={cn(
              "h-12 pl-11 text-base",
              dark &&
                "border-white/25 bg-white/10 text-white placeholder:text-white/55 focus-visible:ring-amber-400"
            )}
          />
          {errors.phone && (
            <p className={cn("mt-1 text-xs", dark ? "text-amber-300" : "text-red-600")}>
              {errors.phone.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 shrink-0 bg-amber-400 px-6 text-sm font-bold text-brand hover:bg-amber-300"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          {submitLabel}
        </Button>
      </div>
      {/* The consent sentence under the button was removed at Hughie's request
          (12/11/2026); the privacy policy stays linked from every footer. */}
      <LeadTurnstile turnstile={turnstile} className="mt-2" />
    </form>
  );
}

/**
 * What happens next, and the one setting that can stop it: a Zalo account that
 * blocks messages from strangers never receives the catalog. The CRM retries
 * once ~90s later, so turning the setting on now still gets it there; if that
 * fails too, the family is told to call.
 */
function ZaloCatalogSent({
  phone,
  tone,
  className,
}: {
  phone: string;
  tone: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  const hotline = SITE.hotlines[0];
  const shown = phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");

  return (
    <div
      role="status"
      className={cn(
        "rounded-xl border p-4",
        dark ? "border-amber-400/40 bg-amber-400/10 text-white" : "border-green-600/30 bg-green-50 text-slate-900",
        className
      )}
    >
      <p className="flex items-start gap-2 font-semibold">
        <CheckCircle2
          className={cn("mt-0.5 h-5 w-5 shrink-0", dark ? "text-amber-300" : "text-green-600")}
          aria-hidden
        />
        <span>
          Đang gửi catalog và báo giá qua Zalo tới số <span className="whitespace-nowrap">{shown}</span>
        </span>
      </p>
      <div
        className={cn(
          "mt-3 rounded-lg border p-3",
          dark ? "border-amber-300/50 bg-brand/40" : "border-amber-500/40 bg-amber-50"
        )}
      >
        <p className="flex items-start gap-2 text-sm font-semibold">
          <AlertTriangle
            className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-amber-300" : "text-amber-600")}
            aria-hidden
          />
          Đảm bảo Zalo của anh/chị đang ở chế độ nhận tin nhắn từ người lạ.
        </p>
        <p className={cn("mt-1 pl-6 text-sm", dark ? "text-white/80" : "text-slate-700")}>
          Tin nhắn đến từ tài khoản Zalo của Hưng Thành Phát trong 1–2 phút. Nếu Zalo đang chặn người
          lạ, vào Zalo → Cài đặt → Quyền riêng tư để bật lại.
        </p>
      </div>
      <p className={cn("mt-3 text-sm", dark ? "text-white/80" : "text-slate-600")}>
        Chưa thấy tin nhắn?{" "}
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Nhắn Zalo cho bên em
        </a>{" "}
        hoặc gọi{" "}
        <a href={`tel:${hotline.replace(/\s/g, "")}`} className="font-semibold underline">
          {hotline}
        </a>
        . Bên em cũng sẽ gọi lại tư vấn.
      </p>
    </div>
  );
}
