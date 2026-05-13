import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VN_PHONE_RE = /^0(3|5|7|8|9)\d{8}$/;

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(VN_PHONE_RE),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email().optional()
  ),
  message: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().max(500).optional()
  ),
});

async function notifyViaTelegram(
  name: string,
  phone: string,
  email?: string,
  message?: string
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[contact] Telegram chưa cấu hình — bỏ qua thông báo.");
    return;
  }

  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  });

  const text =
    `🔔 <b>YÊU CẦU BÁO GIÁ MỚI</b>\n\n` +
    `👤 <b>Khách hàng:</b> ${name}\n` +
    `📞 <b>Điện thoại:</b> <code>${phone}</code>\n` +
    (email ? `📧 <b>Email:</b> ${email}\n` : "") +
    (message ? `💬 <b>Nhu cầu:</b> ${message}\n` : "") +
    `\n🕐 ${now}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API lỗi: ${err}`);
  }
}

async function notifyViaEmail(
  name: string,
  phone: string,
  email?: string,
  message?: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn("[contact] Email chưa cấu hình — bỏ qua thông báo.");
    return;
  }

  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "long",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#1d4ed8;padding:24px 28px">
        <h2 style="margin:0;color:#fff;font-size:18px">🔔 Yêu cầu báo giá mới</h2>
        <p style="margin:4px 0 0;color:#bfdbfe;font-size:13px">Hưng Thành Phát — ${now}</p>
      </div>
      <div style="padding:24px 28px;background:#fff">
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr>
            <td style="padding:10px 0;color:#6b7280;width:130px">👤 Khách hàng</td>
            <td style="padding:10px 0;font-weight:600;color:#111827">${name}</td>
          </tr>
          <tr style="border-top:1px solid #f3f4f6">
            <td style="padding:10px 0;color:#6b7280">📞 Điện thoại</td>
            <td style="padding:10px 0;font-weight:600;color:#111827">${phone}</td>
          </tr>
          ${email ? `<tr style="border-top:1px solid #f3f4f6">
            <td style="padding:10px 0;color:#6b7280">📧 Email</td>
            <td style="padding:10px 0;color:#111827">${email}</td>
          </tr>` : ""}
          ${message ? `<tr style="border-top:1px solid #f3f4f6">
            <td style="padding:10px 0;color:#6b7280;vertical-align:top">💬 Nhu cầu</td>
            <td style="padding:10px 0;color:#111827">${message}</td>
          </tr>` : ""}
        </table>
      </div>
      <div style="padding:14px 28px;background:#f9fafb;font-size:12px;color:#9ca3af">
        Email này được gửi tự động từ website hungthanhphat.vn
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Hưng Thành Phát <onboarding@resend.dev>",
      to: [toEmail],
      subject: `[Báo giá] ${name} — ${phone}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API lỗi: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Yêu cầu không hợp lệ." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  const { name, phone, email, message } = parsed.data;

  // Fire both in parallel — neither should block the customer's response.
  Promise.allSettled([
    notifyViaTelegram(name, phone, email, message),
    notifyViaEmail(name, phone, email, message),
  ]).then((results) => {
    for (const r of results) {
      if (r.status === "rejected")
        console.error("[contact] Notification thất bại:", r.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
