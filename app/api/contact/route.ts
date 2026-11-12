import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

// A real person needs at least this long to read the labels and type a name and
// a phone number. Anything faster is a script. Deliberately generous — a false
// positive here is a lost lead, so this only catches the obviously automated.
const MIN_FILL_MS = 2500;

// Spam caps. A real customer sends one lead; a script hammering the form at 3am
// sends dozens. Silent drops past these, same as the other bot gates.
const IP_WINDOW_MS = 60 * 60 * 1000;
const IP_MAX_LEADS = 3;
const REPEAT_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_TRACKED_KEYS = 1000;

// Best effort, in module memory: Vercel's Fluid compute keeps a warm instance
// serving consecutive requests, which is exactly the burst case. A cold start
// forgets everything — acceptable, because Turnstile (below) is the real lock
// and these only cap the volume of whatever still gets past it.
const ipDeliveries = new Map<string, number[]>();
const repeatDeliveries = new Map<string, number>();

// The name shown in Telegram and the CRM when a Zalo-catalog lead gives only a
// number. The CRM swaps it for the customer's Zalo display name once the bot
// finds them.
const CATALOG_LEAD_NAME = "Khách Zalo (web)";

const schema = z.object({
  // Required, except on the one-field "Ghi số Zalo" form (catalog: true).
  name:     z.preprocess((val) => (val === "" ? undefined : val), z.string().trim().min(2).max(80).optional()),
  phone:    z.string().trim().regex(VN_PHONE_RE),
  // The visitor asked for the catalog on Zalo (LeadForm). The CRM has the
  // Zalo bot send it straight away; see product/htp-crm app.py _deliver_catalog.
  catalog:  z.boolean().optional(),
  email:    z.preprocess((val) => (val === "" ? undefined : val), z.string().email().optional()),
  message:  z.preprocess((val) => (val === "" ? undefined : val), z.string().trim().max(500).optional()),
  // Which page the lead came from, e.g. "Hero trang chủ" or "/cua-cuon-o-mon".
  // Forwarded to the CRM as its own field so `need` keeps meaning "what the
  // customer asked for" rather than "where they clicked".
  source:   z.preprocess((val) => (val === "" ? undefined : val), z.string().trim().max(120).optional()),
  // First-touch ad attribution from lib/attribution.ts. All optional — an
  // organic visitor sends none of these, and the CRM defaults to "website".
  utm_source:   z.string().trim().max(60).optional(),
  utm_medium:   z.string().trim().max(60).optional(),
  utm_campaign: z.string().trim().max(60).optional(),
  gclid:        z.string().trim().max(200).optional(),
  gbraid:       z.string().trim().max(200).optional(),
  wbraid:       z.string().trim().max(200).optional(),
  // Per-submission id, also sent to Google Ads as the conversion's
  // transaction_id, so a CRM row and an Ads conversion can be matched 1:1.
  lead_id:      z.string().trim().max(64).optional(),
  fbclid:       z.string().trim().max(200).optional(),
  landing:      z.string().trim().max(200).optional(),
  // Honeypot. Hidden from real users; bots fill every input they can find.
  website:  z.string().max(200).optional(),
  // Client timestamp of when the form mounted, for the timing gate above.
  // Optional here only so a missing one reaches the silent drop in POST rather
  // than a 400 that tells a script what it forgot.
  renderedAt: z.number().int().positive().optional(),
  // Cloudflare Turnstile token. Required only when TURNSTILE_SECRET_KEY is set.
  turnstileToken: z.string().trim().max(2048).optional(),
}).refine((d) => d.catalog || !!d.name, { path: ["name"] });

/**
 * Every notification channel reports explicitly instead of relying on throw.
 *
 * This matters: the old code used `Promise.allSettled` and treated rejection as
 * failure, but the "env var missing" path returned normally — so an entirely
 * unconfigured pipeline looked like three successes and the endpoint answered
 * `{ ok: true }` while the lead reached nobody.
 *
 *   fn() ──┬─ sends OK ──────────────► { ok: true }
 *          ├─ env missing ───────────► { ok: false, reason: "not-configured" }
 *          └─ throws / non-2xx ──────► { ok: false, reason: <message> }
 */
type Delivery = { channel: string; ok: boolean; reason?: string };

type Lead = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  catalog?: boolean;
  // Ad attribution. Only the CRM consumes these — Telegram and email are read
  // by people, and a utm string in a phone notification is noise.
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  lead_id?: string;
  fbclid?: string;
  landing?: string;
  // Spam signals for the people reading the notification. The lead is still
  // delivered — these tell the family to verify before calling a stranger.
  ip: string;
  country?: string;
  flags: string[];
};

function clientIp(req: NextRequest): string {
  // Vercel overwrites x-forwarded-for with the real client address, so its
  // first entry can be trusted there.
  const first = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || "unknown";
}

function prune<V>(map: Map<string, V>): void {
  // Maps iterate oldest-insert first, so dropping from the front evicts the
  // stalest keys.
  for (const key of map.keys()) {
    if (map.size <= MAX_TRACKED_KEYS) return;
    map.delete(key);
  }
}

function recentFromIp(ip: string, now: number): number[] {
  return (ipDeliveries.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
}

// Same phone AND same message — a re-send. A customer who comes back to add a
// note ("cửa cuốn 4m") has a different message and still gets through.
const repeatKey = (phone: string, message?: string) => `${phone}|${message ?? ""}`;

function isRepeat(key: string, now: number): boolean {
  const last = repeatDeliveries.get(key);
  return last !== undefined && now - last < REPEAT_WINDOW_MS;
}

function recordDelivery(ip: string, key: string, now: number): void {
  repeatDeliveries.delete(key);
  repeatDeliveries.set(key, now);
  prune(repeatDeliveries);

  const recent = recentFromIp(ip, now);
  recent.push(now);
  ipDeliveries.delete(ip);
  ipDeliveries.set(ip, recent);
  prune(ipDeliveries);
}

async function verifyTurnstile(
  secret: string,
  token: string,
  ip: string
): Promise<{ ok: boolean; errorCodes?: string[] }> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(ip !== "unknown" ? { remoteip: ip } : {}),
      }),
    });
    if (!res.ok) return { ok: false, errorCodes: [`http-${res.status}`] };
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    return { ok: !!data.success, errorCodes: data["error-codes"] };
  } catch (err) {
    return { ok: false, errorCodes: [err instanceof Error ? err.message : String(err)] };
  }
}

/** The fake leads cluster around 2–3am and some come from abroad. Say so. */
function spamFlags(now: Date, country?: string): string[] {
  const flags: string[] = [];
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "12");
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  if (hour < 5) {
    flags.push(
      `🌙 Gửi lúc ${String(hour).padStart(2, "0")}:${minute} sáng — nhắn Zalo xác minh trước khi gọi`
    );
  }
  if (country && country !== "VN") flags.push(`🌍 Gửi từ nước ngoài (${country})`);
  return flags;
}

async function notifyViaTelegram(lead: Lead): Promise<Delivery> {
  const channel = "telegram";
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return { channel, ok: false, reason: "not-configured" };

  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  });

  const text =
    `🔔 <b>YÊU CẦU BÁO GIÁ MỚI</b>\n\n` +
    (lead.flags.length ? lead.flags.map((f) => `<b>${f}</b>`).join("\n") + "\n\n" : "") +
    `👤 <b>Khách hàng:</b> ${lead.name}\n` +
    `📞 <b>Điện thoại:</b> <code>${lead.phone}</code>\n` +
    (lead.email   ? `📧 <b>Email:</b> ${lead.email}\n`     : "") +
    (lead.message ? `💬 <b>Nhu cầu:</b> ${lead.message}\n` : "") +
    (lead.source  ? `📍 <b>Từ trang:</b> ${lead.source}\n` : "") +
    `\n🕐 ${now}` +
    `\n<code>IP ${lead.ip}${lead.country ? ` · ${lead.country}` : ""}</code>`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!res.ok) return { channel, ok: false, reason: `HTTP ${res.status}` };
    return { channel, ok: true };
  } catch (err) {
    return { channel, ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

async function notifyViaEmail(lead: Lead): Promise<Delivery> {
  const channel = "email";
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !toEmail) return { channel, ok: false, reason: "not-configured" };

  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "long",
    timeStyle: "short",
  });

  const row = (label: string, value: string, strong = false) => `
    <tr style="border-top:1px solid #f3f4f6">
      <td style="padding:10px 0;color:#6b7280;width:130px">${label}</td>
      <td style="padding:10px 0;${strong ? "font-weight:600;" : ""}color:#111827">${value}</td>
    </tr>`;

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#1d4ed8;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:18px">Yêu cầu báo giá mới</h2>
        <p style="margin:4px 0 0;color:#bfdbfe;font-size:13px">Hưng Thành Phát — ${now}</p>
      </div>
      <div style="padding:24px 28px;background:#fff">
        ${lead.flags.length ? `<div style="margin-bottom:16px;padding:12px 14px;background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;color:#92400e;font-size:14px;font-weight:600">${lead.flags.join("<br/>")}</div>` : ""}
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${row("Khách hàng", lead.name, true)}
          ${row("Điện thoại", lead.phone, true)}
          ${lead.email   ? row("Email", lead.email)     : ""}
          ${lead.message ? row("Nhu cầu", lead.message) : ""}
          ${lead.source  ? row("Từ trang", lead.source) : ""}
        </table>
      </div>
      <div style="padding:14px 28px;background:#f9fafb;font-size:12px;color:#9ca3af">
        Email này được gửi tự động từ website hungthanhphat.vn
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Hưng Thành Phát <onboarding@resend.dev>",
        to: [toEmail],
        subject: `[Báo giá] ${lead.name} — ${lead.phone}`,
        html,
      }),
    });
    if (!res.ok) return { channel, ok: false, reason: `HTTP ${res.status}` };
    return { channel, ok: true };
  } catch (err) {
    return { channel, ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

async function notifyViaCRM(lead: Lead): Promise<Delivery> {
  const channel = "crm";
  const token = process.env.CRM_WEBHOOK_TOKEN;
  const url =
    process.env.CRM_WEBHOOK_URL || "https://crm.hungthanhphat.vn/api/yeu-cau";

  if (!token) return { channel, ok: false, reason: "not-configured" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Web-Token": token },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        // `need` is what the customer asked for. `sourcePage` is where they
        // asked from. Keeping them separate means CRM reporting on `need`
        // does not silently change meaning.
        need: lead.message ?? "",
        sourcePage: lead.source ?? "",
        catalog: !!lead.catalog,
        // store.attribution_from_utm() turns these into customers.source +
        // customers.source_detail, which is the only way CAC per campaign can
        // be answered later. Absent for organic visitors; the CRM defaults.
        utm_source: lead.utm_source ?? "",
        utm_medium: lead.utm_medium ?? "",
        utm_campaign: lead.utm_campaign ?? "",
        note: [lead.email, lead.gclid && `gclid:${lead.gclid}`,
               lead.gbraid && `gbraid:${lead.gbraid}`, lead.wbraid && `wbraid:${lead.wbraid}`,
               lead.lead_id && `lead_id:${lead.lead_id}`,
               lead.landing && `landing:${lead.landing}`]
          .filter(Boolean).join(" | "),
      }),
    });
    if (!res.ok) return { channel, ok: false, reason: `HTTP ${res.status}` };
    return { channel, ok: true };
  } catch (err) {
    return { channel, ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(req: NextRequest) {
  // Who sent it, on every log line — the only way to tell a 3am script from a
  // real customer after the fact.
  const ip = clientIp(req);
  const country = req.headers.get("x-vercel-ip-country")?.trim().toUpperCase() || undefined;
  const meta = { ip, country: country ?? "unknown", userAgent: req.headers.get("user-agent") ?? "" };

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    console.info("[contact] rejected", { reason: "invalid-json", ...meta });
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    console.info("[contact] rejected", { reason: "invalid-schema", ...meta });
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const {
    phone, email, message, source, catalog, website, renderedAt, turnstileToken,
    utm_source, utm_medium, utm_campaign, gclid, gbraid, wbraid, lead_id, fbclid, landing,
  } = parsed.data;
  const name = parsed.data.name ?? CATALOG_LEAD_NAME;

  // Bot gates. Answer 200 so a script learns nothing from the response, but log
  // the rejection with its reason — otherwise a mis-tuned threshold silently
  // eats real leads and nothing in the logs says so. A silent drop never
  // carries `delivered`, so the browser fires no ad conversion for it.
  const drop = (reason: string, extra: Record<string, unknown> = {}) => {
    console.info("[contact] rejected", { reason, source, ...extra, ...meta });
    return NextResponse.json({ ok: true });
  };

  if (website) return drop("honeypot");
  // Every real form sends this. A script posting straight to the endpoint
  // usually doesn't — that is how the timing gate used to be skipped.
  if (!renderedAt) return drop("missing-rendered-at");
  const now = Date.now();
  if (now - renderedAt < MIN_FILL_MS) return drop("too-fast", { elapsedMs: now - renderedAt });

  // Turnstile, once keys exist. A failure is a visible 403, not a silent drop:
  // a real customer can fail it (blocked script, expired token), and a fake
  // "thank you" would leave them waiting for a call that never comes. The form
  // shows the hotline and Zalo instead.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const verified = turnstileToken
      ? await verifyTurnstile(turnstileSecret, turnstileToken, ip)
      : { ok: false, errorCodes: ["missing-token"] };
    if (!verified.ok) {
      console.info("[contact] rejected", {
        reason: "turnstile", errorCodes: verified.errorCodes, source, ...meta,
      });
      return NextResponse.json({ error: "Chưa xác minh được." }, { status: 403 });
    }
  }

  const key = repeatKey(phone, message);
  if (isRepeat(key, now)) return drop("repeat");
  if (recentFromIp(ip, now).length >= IP_MAX_LEADS) return drop("ip-limit");

  const flags = spamFlags(new Date(now), country);
  const lead: Lead = {
    name, phone, email, message, source, catalog,
    utm_source, utm_medium, utm_campaign, gclid, gbraid, wbraid, lead_id, fbclid, landing,
    ip, country, flags,
  };

  const results = await Promise.all([
    notifyViaTelegram(lead),
    notifyViaEmail(lead),
    notifyViaCRM(lead),
  ]);

  const failed = results.filter((r) => !r.ok);
  for (const r of failed) {
    console.error(`[contact] ${r.channel} thất bại:`, r.reason);
  }

  if (failed.length === results.length) {
    // Nothing received this lead. Log the whole thing so it is at least
    // recoverable from the Vercel log, and tell the caller the truth so the
    // customer is shown the hotline instead of a false confirmation.
    console.error("[contact] TẤT CẢ KÊNH THẤT BẠI — lead chưa được lưu ở đâu:", {
      name,
      phone,
      email,
      message,
      source,
      results,
    });
    return NextResponse.json(
      { error: "Không gửi được yêu cầu." },
      { status: 502 }
    );
  }

  // Counted only once something received it, so a total outage (502 above)
  // never locks the customer out of retrying.
  recordDelivery(ip, key, now);
  const delivered = results.filter((r) => r.ok).length;
  console.info("[contact] accepted", { source, delivered, flags, ...meta });
  return NextResponse.json({ ok: true, delivered });
}
