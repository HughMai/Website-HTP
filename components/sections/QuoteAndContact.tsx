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
import {
  LeadError,
  LeadHoneypot,
  LeadSuccess,
  useLeadSubmit,
} from "@/hooks/useLeadSubmit";
import { SITE } from "@/lib/site-data";

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
  // ── Contact form ─────────────────────────────────────────────────────────
  const { status, errorMessage, isSubmitting, submit, dismissError, honeypotRef } =
    useLeadSubmit("Form báo giá trang chủ");

  const { register, handleSubmit, formState: { errors } } =
    useForm<ContactFormValues>({
      resolver: zodResolver(contactSchema),
      defaultValues: { name: "", phone: "", email: "", message: "" },
      mode: "onTouched",
    });

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
            Liên Hệ & Báo Giá
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            Để lại số — chúng tôi gọi lại trong 15 phút.
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {SITE.hotlines.map((hotline) => (
              <a
                key={hotline}
                href={`tel:${hotline.replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
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
          className="mx-auto max-w-xl"
        >

          {/* ── Right: Contact form ──────────────────────────────────────── */}
          <div className="rounded-2xl bg-white text-brand shadow-2xl">
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-brand">Yêu cầu báo giá miễn phí</h3>
              <p className="mt-1 text-sm text-brand/65">
                Chuyên viên sẽ phản hồi trong vòng 15 phút.
              </p>

              {status === "success" ? (
                <LeadSuccess tone="light" className="mt-5" />
              ) : (
              <form
                noValidate
                onSubmit={handleSubmit(submit)}
                className="relative mt-5 space-y-4"
                aria-label="Form yêu cầu báo giá"
              >
                <LeadHoneypot honeypotRef={honeypotRef} />

                {status === "error" && errorMessage && (
                  <LeadError message={errorMessage} onRetry={dismissError} tone="light" />
                )}

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
                    Email <span className="font-normal text-brand/70">(Không bắt buộc)</span>
                  </Label>
                  <Input id="c-email" type="email" placeholder="example@gmail.com"
                    inputMode="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                  {errors.email && <p role="alert" className="text-xs font-medium text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-message">
                    Nhu Cầu / Lời Nhắn <span className="font-normal text-brand/70">(Không bắt buộc)</span>
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

                <p className="text-center text-sm text-brand/70">
                  Bằng việc gửi yêu cầu, bạn đồng ý để Hưng Thành Phát liên hệ qua số điện thoại đã cung cấp.
                </p>
              </form>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
