"use client";

import * as React from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { getAttribution } from "@/lib/attribution";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { trackLead } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * One submit path for every lead form on the site.
 *
 * Before this existed, LeadForm, Contact and QuoteAndContact each hand-rolled
 * the same fetch/toast/reset, and the copies had already drifted: two of the
 * three had no try/catch, so a dropped connection produced no message at all.
 *
 *   submit(data)
 *     │
 *     ├─ fetch rejects ─────────────► status "error", kind "network"
 *     ├─ res.status 400 ────────────► status "error", kind "invalid"
 *     ├─ res.status 502 ────────────► status "error", kind "undelivered"
 *     ├─ res.status other non-2xx ──► status "error", kind "server"
 *     └─ res.ok ────────────────────► status "success"  (form is REPLACED,
 *                                      never reset to blank — a blank form
 *                                      after submit invites a duplicate lead)
 */

export type LeadErrorKind = "network" | "invalid" | "captcha" | "undelivered" | "server";
export type LeadStatus = "idle" | "submitting" | "success" | "error";

const ERROR_COPY: Record<LeadErrorKind, string> = {
  network:
    "Mất kết nối khi gửi. Bạn kiểm tra mạng rồi thử lại, hoặc gọi trực tiếp giúp mình nhé.",
  invalid: "Thông tin chưa hợp lệ. Bạn kiểm tra lại họ tên và số điện thoại nhé.",
  captcha:
    "Chưa xác minh được trình duyệt. Bạn thử gửi lại, hoặc gọi trực tiếp / nhắn Zalo giúp mình nhé.",
  undelivered:
    "Hệ thống đang bận nên chưa nhận được yêu cầu. Bạn gọi trực tiếp giúp mình nhé.",
  server: "Gửi không thành công. Bạn vui lòng gọi trực tiếp giúp mình nhé.",
};

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
};

/**
 * Cloudflare Turnstile — the lock a script can't pick. Inert until
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set (and the server only demands a token
 * once TURNSTILE_SECRET_KEY is set), so this ships safely before keys exist.
 *
 * "interaction-only" keeps it invisible for almost everyone: the token is
 * fetched in the background while the customer types, and a checkbox appears
 * only when Cloudflare is unsure. If no token ever arrives, the customer gets
 * the error panel with the hotline and Zalo, never a dead end.
 */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Long enough to tick the checkbox if Cloudflare does ask for one.
const TURNSTILE_WAIT_MS = 20_000;

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** One per form. Lives in a ref: the widget's callbacks fire outside React. */
export type TurnstileState = {
  token: string;
  loadFailed: boolean;
  widgetId: string | null;
  waiter: ((token: string | null) => void) | null;
};

// The homepage mounts four forms; the script must load once, not four times.
let turnstileLoad: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  turnstileLoad ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile-missing"));
    script.onerror = () => {
      turnstileLoad = null; // let a later mount try again
      script.remove();
      reject(new Error("turnstile-load-failed"));
    };
    document.head.appendChild(script);
  });
  return turnstileLoad;
}

function settleTurnstile(state: TurnstileState, token: string | null) {
  state.token = token ?? "";
  state.waiter?.(token);
  state.waiter = null;
}

function turnstileToken(state: TurnstileState): Promise<string | null> {
  if (state.token) return Promise.resolve(state.token);
  if (state.loadFailed) return Promise.resolve(null);
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => settleTurnstile(state, null), TURNSTILE_WAIT_MS);
    state.waiter = (token) => {
      window.clearTimeout(timer);
      resolve(token);
    };
  });
}

function resetTurnstile(state: TurnstileState) {
  // Tokens are single-use: every attempt needs a fresh one.
  state.token = "";
  if (!state.widgetId) return;
  try {
    window.turnstile?.reset(state.widgetId);
  } catch {
    /* a widget that is already gone needs no reset */
  }
}

export function useLeadSubmit(source: string) {
  // Captured once on mount. The server rejects submissions that arrive
  // implausibly fast after this instant.
  const renderedAt = React.useRef(Date.now());
  const honeypot = React.useRef("");
  const turnstile = React.useRef<TurnstileState>({
    token: "",
    loadFailed: false,
    widgetId: null,
    waiter: null,
  });

  const [status, setStatus] = React.useState<LeadStatus>("idle");
  const [errorKind, setErrorKind] = React.useState<LeadErrorKind | null>(null);

  const submit = React.useCallback(
    async (data: LeadPayload) => {
      // Guard against a double-tap landing two leads before React re-renders.
      if (status === "submitting") return;
      setStatus("submitting");
      setErrorKind(null);

      let token: string | null = null;
      if (TURNSTILE_SITE_KEY) {
        token = await turnstileToken(turnstile.current);
        if (!token) {
          resetTurnstile(turnstile.current);
          setErrorKind("captcha");
          setStatus("error");
          return;
        }
      }

      let res: Response;
      try {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            source,
            // First-touch ad attribution, if this visitor arrived on a tagged
            // or click-id'd URL. Empty object when they didn't — the CRM then
            // files the lead as a plain website lead.
            ...getAttribution(),
            website: honeypot.current,
            renderedAt: renderedAt.current,
            ...(token ? { turnstileToken: token } : {}),
          }),
        });
      } catch {
        setErrorKind("network");
        setStatus("error");
        return;
      } finally {
        if (token) resetTurnstile(turnstile.current);
      }

      if (res.ok) {
        // Report the conversion only when the server says a channel received
        // the lead. Firing on submit would teach Smart Bidding to chase clicks
        // that never reached the shop — and the server's silent spam drops
        // answer 200 too, just without `delivered`.
        const body = (await res.json().catch(() => null)) as { delivered?: number } | null;
        if ((body?.delivered ?? 0) > 0) trackLead("form_submit", { source });
        setStatus("success");
        return;
      }

      setErrorKind(
        res.status === 400
          ? "invalid"
          : res.status === 403
            ? "captcha"
            : res.status === 502
              ? "undelivered"
              : "server"
      );
      setStatus("error");
    },
    [source, status]
  );

  const dismissError = React.useCallback(() => {
    setStatus("idle");
    setErrorKind(null);
  }, []);

  return {
    status,
    errorKind,
    errorMessage: errorKind ? ERROR_COPY[errorKind] : null,
    isSubmitting: status === "submitting",
    submit,
    dismissError,
    honeypotRef: honeypot,
    turnstile,
  };
}

/**
 * Where the Turnstile widget mounts. Renders nothing without a site key. Its
 * lifetime is the form's: it unmounts with the form on success, so the widget
 * is removed rather than left running behind the thank-you panel.
 */
export function LeadTurnstile({
  turnstile,
  className,
}: {
  turnstile: React.MutableRefObject<TurnstileState>;
  className?: string;
}) {
  const el = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const sitekey = TURNSTILE_SITE_KEY;
    if (!sitekey) return;
    const state = turnstile.current;
    // StrictMode mounts, unmounts and remounts; only the surviving mount renders.
    let cancelled = false;

    loadTurnstile()
      .then((api) => {
        if (cancelled || !el.current) return;
        state.widgetId = api.render(el.current, {
          sitekey,
          appearance: "interaction-only",
          language: "vi",
          callback: (token: string) => settleTurnstile(state, token),
          "expired-callback": () => {
            state.token = "";
          },
          // Turnstile retries on its own; this only stops a submit that is
          // already waiting from spinning for the full timeout.
          "error-callback": () => settleTurnstile(state, null),
        });
      })
      .catch(() => {
        if (cancelled) return;
        state.loadFailed = true;
        settleTurnstile(state, null);
      });

    return () => {
      cancelled = true;
      if (state.widgetId) {
        try {
          window.turnstile?.remove(state.widgetId);
        } catch {
          /* already gone */
        }
        state.widgetId = null;
      }
      state.token = "";
    };
  }, [turnstile]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={el} className={className} />;
}

/**
 * Hidden input that real users never see and bots reliably fill.
 * `aria-hidden` + `tabIndex={-1}` keep it out of the keyboard and screen-reader
 * path, so it costs a real customer nothing.
 */
export function LeadHoneypot({
  honeypotRef,
}: {
  honeypotRef: React.MutableRefObject<string>;
}) {
  // The homepage renders three LeadForms (hero plus two CTA bands), so a fixed
  // id would put duplicate ids in the document and break label association.
  const id = React.useId();

  // Inline styles, deliberately NOT Tailwind. This shipped broken once: the
  // hooks/ directory was missing from the Tailwind content globs, so these
  // classes were never generated and the honeypot rendered in normal flow on
  // top of the name field. A honeypot that becomes visible is worse than none
  // at all — it breaks the form for every real customer.
  const hidden: React.CSSProperties = {
    position: "absolute",
    left: "-9999px",
    top: "auto",
    width: 1,
    height: 1,
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  };

  return (
    <div aria-hidden style={hidden}>
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        onChange={(e) => {
          honeypotRef.current = e.target.value;
        }}
      />
    </div>
  );
}

/**
 * Persistent confirmation that REPLACES the form. Announced via `role="status"`
 * so it reaches screen readers the way the old transient toast never did.
 */
export function LeadSuccess({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  const hotline = SITE.hotlines[0];

  return (
    <div
      role="status"
      className={cn(
        "rounded-xl border p-4",
        dark
          ? "border-amber-400/40 bg-amber-400/10 text-white"
          : "border-green-600/30 bg-green-50 text-slate-900",
        className
      )}
    >
      <p className="flex items-center gap-2 font-semibold">
        <CheckCircle2
          className={cn("h-5 w-5 shrink-0", dark ? "text-amber-300" : "text-green-600")}
          aria-hidden
        />
        Đã nhận thông tin của bạn!
      </p>
      <p className={cn("mt-1 text-sm", dark ? "text-white/80" : "text-slate-600")}>
        Hưng Thành Phát sẽ gọi lại trong ít phút. Cần gấp hơn thì bạn gọi thẳng{" "}
        <a href={`tel:${hotline.replace(/\s/g, "")}`} className="font-semibold underline">
          {hotline}
        </a>{" "}
        hoặc{" "}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          nhắn Zalo
        </a>
        .
      </p>
    </div>
  );
}

/**
 * Error panel with the fallback path always visible. An error that does not
 * tell the customer how else to reach you is still a lost lead.
 */
export function LeadError({
  message,
  onRetry,
  tone = "dark",
  className,
}: {
  message: string;
  onRetry: () => void;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  const hotline = SITE.hotlines[0];

  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border p-4",
        dark ? "border-red-400/40 bg-red-500/10 text-white" : "border-red-300 bg-red-50 text-slate-900",
        className
      )}
    >
      <p className={cn("text-sm", dark ? "text-white/90" : "text-slate-700")}>{message}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={`tel:${hotline.replace(/\s/g, "")}`}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-semibold",
            dark ? "bg-white text-brand" : "bg-brand text-white"
          )}
        >
          <Phone className="h-4 w-4" aria-hidden />
          Gọi {hotline}
        </a>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-11 items-center rounded-md border px-4 text-sm font-semibold",
            dark
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-brand/20 text-brand hover:bg-brand/5"
          )}
        >
          Nhắn Zalo
        </a>
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "inline-flex h-11 items-center rounded-md px-4 text-sm font-medium underline",
            dark ? "text-white/80" : "text-slate-600"
          )}
        >
          Thử gửi lại
        </button>
      </div>
    </div>
  );
}
