import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

// A real person needs at least this long to read the labels and type a name and
// a phone number. Anything faster is a script. Deliberately generous — a false
// positive here is a lost lead, so this only catches the obviously automated.
const MIN_FILL_MS = 2500;

const schema = z.object({
  name:     z.string().trim().min(2).max(80),
  phone:    z.string().trim().regex(VN_PHONE_RE),
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
  fbclid:       z.string().trim().max(200).optional(),
  landing:      z.string().trim().max(200).optional(),
  // Honeypot. Hidden from real users; bots fill every input they can find.
  website:  z.string().max(200).optional(),
  // Client timestamp of when the form mounted, for the timing gate above.
  renderedAt: z.number().int().positive().optional(),
});

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
  // Ad attribution. Only the CRM consumes these — Telegram and email are read
  // by people, and a utm string in a phone notification is noise.
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  fbclid?: string;
  landing?: string;
};

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
    `👤 <b>Khách hàng:</b> ${lead.name}\n` +
    `📞 <b>Điện thoại:</b> <code>${lead.phone}</code>\n` +
    (lead.email   ? `📧 <b>Email:</b> ${lead.email}\n`     : "") +
    (lead.message ? `💬 <b>Nhu cầu:</b> ${lead.message}\n` : "") +
    (lead.source  ? `📍 <b>Từ trang:</b> ${lead.source}\n` : "") +
    `\n🕐 ${now}`;

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
        // store.attribution_from_utm() turns these into customers.source +
        // customers.source_detail, which is the only way CAC per campaign can
        // be answered later. Absent for organic visitors; the CRM defaults.
        utm_source: lead.utm_source ?? "",
        utm_medium: lead.utm_medium ?? "",
        utm_campaign: lead.utm_campaign ?? "",
        note: [lead.email, lead.gclid && `gclid:${lead.gclid}`,
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
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const {
    name, phone, email, message, source, website, renderedAt,
    utm_source, utm_medium, utm_campaign, gclid, fbclid, landing,
  } = parsed.data;

  // Bot gates. Answer 200 so a script learns nothing from the response, but log
  // the rejection with its reason — otherwise a mis-tuned threshold silently
  // eats real leads and nothing in the logs says so.
  if (website) {
    console.info("[contact] rejected", { reason: "honeypot", source });
    return NextResponse.json({ ok: true });
  }
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_MS) {
    console.info("[contact] rejected", {
      reason: "too-fast",
      elapsedMs: Date.now() - renderedAt,
      source,
    });
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    name, phone, email, message, source,
    utm_source, utm_medium, utm_campaign, gclid, fbclid, landing,
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

  return NextResponse.json({ ok: true, delivered: results.filter((r) => r.ok).length });
}
