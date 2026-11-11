"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LeadError,
  LeadHoneypot,
  LeadSuccess,
  useLeadSubmit,
} from "@/hooks/useLeadSubmit";
import { cn } from "@/lib/utils";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

// Two fields only. Every extra field costs conversions, and the shop calls back
// within minutes anyway — the phone number is the whole job.
const leadSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .regex(VN_PHONE_RE, "Nhập đúng 10 chữ số (ví dụ: 0901234567)."),
});

type LeadValues = z.infer<typeof leadSchema>;

/**
 * Compact name + phone capture. Transport, error taxonomy and the persistent
 * confirmation all live in `useLeadSubmit`, shared with Contact and
 * QuoteAndContact so the three can no longer drift apart.
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
  const { status, errorMessage, isSubmitting, submit, dismissError, honeypotRef } =
    useLeadSubmit(source);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "" },
    mode: "onTouched",
  });

  const dark = tone === "dark";

  // Success REPLACES the form. A blank form after a successful submit reads as
  // "nothing happened" and invites the same customer to send twice.
  if (status === "success") {
    return <LeadSuccess tone={tone} className={className} />;
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("relative w-full", className)}
      noValidate
    >
      <LeadHoneypot honeypotRef={honeypotRef} />

      {status === "error" && errorMessage && (
        <LeadError
          message={errorMessage}
          onRetry={dismissError}
          tone={tone}
          className="mb-3"
        />
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Input
            {...register("name")}
            placeholder="Họ và tên"
            aria-label="Họ và tên"
            aria-invalid={!!errors.name}
            className={cn(
              "h-12",
              dark &&
                "border-white/25 bg-white/10 text-white placeholder:text-white/55 focus-visible:ring-amber-400"
            )}
          />
          {errors.name && (
            <p
              className={cn(
                "mt-1 text-xs",
                dark ? "text-amber-300" : "text-red-600"
              )}
            >
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Input
            {...register("phone")}
            type="tel"
            inputMode="numeric"
            placeholder="Số điện thoại"
            aria-label="Số điện thoại"
            aria-invalid={!!errors.phone}
            className={cn(
              "h-12",
              dark &&
                "border-white/25 bg-white/10 text-white placeholder:text-white/55 focus-visible:ring-amber-400"
            )}
          />
          {errors.phone && (
            <p
              className={cn(
                "mt-1 text-xs",
                dark ? "text-amber-300" : "text-red-600"
              )}
            >
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
      <p className={cn("mt-2 text-sm", dark ? "text-white/60" : "text-brand/60")}>
        Gửi số điện thoại là đồng ý để Hưng Thành Phát gọi lại báo giá. Xem{" "}
        <a href="/chinh-sach-bao-mat" className="underline underline-offset-2">
          chính sách bảo mật
        </a>
        .
      </p>
    </form>
  );
}
