"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone, Send, X } from "lucide-react";

import { leadSchema, type LeadInput, type LeadValues } from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LEAD_SENT_EVENT, LeadHoneypot, LeadTurnstile, useLeadSubmit } from "@/hooks/useLeadSubmit";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * The Zalo-number field as a bar pinned to the bottom of the screen once the hero's
 * Zalo card has scrolled away (Hughie, 12/11/2026): same field, same checks, same CRM
 * path as the card (useLeadSubmit → /api/contact → the Zalo bot sends the catalog).
 * Rendered by ZaloQuoteCard, so every page with the card gets the bar.
 *
 * Shows only when it is the one ask on screen: the hero card is above the viewport,
 * no other form is visible, and no lead has gone through on this page yet. While it is
 * up it sets html[data-zalo-bar="on"], which hides the site's 3-button call bar
 * (StickyCallBar); the call button here keeps calling one tap away. While typing it
 * rides above the phone keyboard (visualViewport).
 */
export function ZaloStickyBar({ source, watch }: { source: string; watch: string }) {
  const hotline = SITE.hotlines[0];
  const tel = `tel:${hotline.replace(/\s/g, "")}`;
  const { status, errorMessage, isSubmitting, submit, dismissError, honeypotRef, turnstile } =
    useLeadSubmit(source);

  const barRef = React.useRef<HTMLDivElement>(null);
  const mine = React.useRef(false);
  const [heroPassed, setHeroPassed] = React.useState(false);
  const [formsOnScreen, setFormsOnScreen] = React.useState(0);
  const [sentElsewhere, setSentElsewhere] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [lift, setLift] = React.useState(0);
  const [sentTo, setSentTo] = React.useState("");
  // Rendered into <body> after mount: the card sits inside heroes with centred text, and
  // a transformed ancestor would trap a position:fixed bar. Hidden at first paint anyway.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput, unknown, LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { phone: "" },
    mode: "onSubmit",
  });
  const phone = register("phone");

  // The hero card: the bar waits until it has scrolled up and out of view.
  React.useEffect(() => {
    const card = document.querySelector(watch);
    if (!card || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) =>
      setHeroPassed(!e.isIntersecting && e.boundingClientRect.bottom <= 0)
    );
    io.observe(card);
    return () => io.disconnect();
  }, [watch]);

  // Any other form on screen (the closing form, a CTA band): step aside for it.
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setFormsOnScreen(visible.size);
    });
    document.querySelectorAll("form").forEach((f) => {
      if (!barRef.current?.contains(f)) io.observe(f);
    });
    return () => io.disconnect();
  }, []);

  // A lead sent from another form on this page: stop asking.
  React.useEffect(() => {
    const onSent = () => {
      if (!mine.current) setSentElsewhere(true);
    };
    window.addEventListener(LEAD_SENT_EVENT, onSent);
    return () => window.removeEventListener(LEAD_SENT_EVENT, onSent);
  }, []);

  // Keep the bar above the on-screen keyboard while its field has focus.
  React.useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setLift(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)));
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const done = status === "success";
  const show =
    !dismissed &&
    (done || status === "error" || focused || (heroPassed && formsOnScreen === 0 && !sentElsewhere));

  React.useEffect(() => {
    const root = document.documentElement;
    if (show) root.dataset.zaloBar = "on";
    else delete root.dataset.zaloBar;
    return () => {
      delete root.dataset.zaloBar;
    };
  }, [show]);

  const onSubmit = (values: LeadValues) => {
    mine.current = true;
    setSentTo(values.phone);
    return submit({ phone: values.phone, message: "Nhận catalog & báo giá qua Zalo", catalog: true });
  };

  const tab = show ? undefined : -1;
  const problem = errors.phone?.message ?? (status === "error" ? errorMessage : null);

  if (!mounted) return null;
  return createPortal(
    <div
      ref={barRef}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-white/95 p-2 text-left pb-[max(0.5rem,env(safe-area-inset-bottom))] text-brand shadow-[0_-4px_20px_rgba(10,37,64,0.08)] backdrop-blur transition-transform duration-300",
        "md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[30rem] md:-translate-x-1/2 md:rounded-2xl md:border md:p-3 md:shadow-xl",
        show ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
      )}
      style={focused && lift ? { bottom: lift } : undefined}
      aria-hidden={!show}
      data-track="sticky_zalo"
    >
      {done ? (
        <div role="status" className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
          <p className="flex-1 leading-snug text-slate-700">
            <span className="font-semibold text-brand">
              Đang gửi báo giá qua Zalo tới{" "}
              <span className="whitespace-nowrap">{sentTo.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3")}</span>.
            </span>{" "}
            Chưa thấy tin nhắn? Bật nhận tin nhắn từ người lạ trong Zalo, hoặc gọi{" "}
            <a href={tel} className="font-semibold underline">
              {hotline}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="-m-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
          <LeadHoneypot honeypotRef={honeypotRef} />
          {problem && (
            <p role="alert" className="mb-1.5 px-1 text-sm leading-snug text-red-600">
              {problem}
            </p>
          )}
          <div className="flex items-center gap-2">
            <a
              href={tel}
              tabIndex={tab}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/20 text-brand active:bg-brand-50"
              aria-label={`Gọi ${hotline}`}
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <Input
              {...phone}
              onChange={(e) => {
                if (status === "error") dismissError();
                return phone.onChange(e);
              }}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                setFocused(false);
                return phone.onBlur(e);
              }}
              tabIndex={tab}
              type="tel"
              inputMode="tel"
              enterKeyHint="send"
              autoComplete="tel"
              placeholder="Số Zalo anh/chị"
              aria-label="Số Zalo để nhận báo giá"
              aria-invalid={!!problem}
              className="h-12 min-w-0 flex-1 px-3 text-base"
            />
            <Button
              type="submit"
              tabIndex={tab}
              disabled={isSubmitting}
              className="h-12 shrink-0 gap-1.5 bg-amber-400 px-4 text-base font-bold text-brand hover:bg-amber-300"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4" aria-hidden />
              )}
              Nhận giá
            </Button>
          </div>
          <LeadTurnstile turnstile={turnstile} className="mt-2" />
        </form>
      )}
    </div>,
    document.body
  );
}
