import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import {
  POST_TYPE_DESCRIPTIONS,
  SERVICE_PAGES,
  getWeekPostType,
  pickLinkForPostType,
} from "@/lib/gbp-content";
import {
  CAN_THO_LOCAL_CONTEXT,
  getCanThoSeason,
  getUpcomingHoliday,
} from "@/lib/news-sources";
import { SITE } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return header === `Bearer ${secret}`;
}

function buildPrompt(opts: {
  postType: string;
  postTypeBrief: string;
  link: { url: string; label: string; fullUrl: string };
  season: { label: string; angle: string };
  holiday: { name: string; daysAway: number; angle: string } | null;
}) {
  const localContext = CAN_THO_LOCAL_CONTEXT;

  return `Bạn là chuyên gia marketing nội dung tiếng Việt cho công ty cửa cuốn / nhôm kính / cửa kéo "${SITE.brand}" tại Cần Thơ (thành lập 2005, 21+ năm kinh nghiệm, 500+ công trình).

NHIỆM VỤ: Viết 1 bài đăng Google Business Profile (GBP) bằng tiếng Việt cho tuần này.

LOẠI BÀI: ${opts.postType}
HƯỚNG DẪN: ${opts.postTypeBrief}

NGỮ CẢNH MÙA: ${opts.season.label}. ${opts.season.angle}.
${opts.holiday ? `LỄ SẮP TỚI: ${opts.holiday.name} (còn ${opts.holiday.daysAway} ngày). Góc nhìn: ${opts.holiday.angle}.` : ""}

LINK CTA: ${opts.link.fullUrl}
NHÃN LINK: ${opts.link.label}

BỐI CẢNH ĐỊA PHƯƠNG (sử dụng tự nhiên nếu phù hợp):
- Quận/huyện Cần Thơ: ${localContext.districts.map((d) => `${d.name} (${d.note})`).join(", ")}.
- Địa danh: ${localContext.landmarks.join(", ")}.
- Xu hướng: ${localContext.trends.join("; ")}.

QUY TẮC VIẾT:
- Độ dài: 700–1200 ký tự (Google giới hạn ~1500). KHÔNG dùng emoji nhiều — tối đa 1–2.
- Viết hoa đúng tên riêng tiếng Việt, dùng dấu đầy đủ.
- Mở đầu bằng câu hook (8–15 từ) — tránh kiểu "Bạn có biết...".
- 1 đoạn nội dung chính (3–5 câu) — đưa giá trị / thông tin thật, không quảng cáo lộ liễu.
- 1 dòng CTA cuối + link đầy đủ (${opts.link.fullUrl}).
- KHÔNG dùng cụm "trọn đời", luôn dùng "bảo hành 5–10 năm" hoặc "bảo hành theo kỳ hạn nhà sản xuất".
- Giọng văn: chuyên nghiệp, gần gũi, có chuyên môn — KHÔNG sến, KHÔNG hô hào.
- KHÔNG dùng dấu "—" (em dash) — thay bằng dấu phẩy hoặc dấu hai chấm.

ĐỊNH DẠNG ĐẦU RA (BẮT BUỘC, dạng JSON):
{
  "headline": "câu mở đầu nổi bật (dùng làm Update title)",
  "body": "toàn bộ nội dung bài đăng (bao gồm cả CTA + link)",
  "hashtags": ["3 hashtag tiếng Việt liên quan, không # đầu"],
  "suggested_image": "gợi ý chọn ảnh nào từ thư viện (ví dụ: cửa cuốn nhôm Đức ở Bình Thủy)"
}

CHỈ TRẢ VỀ JSON, KHÔNG GIẢI THÍCH.`;
}

function extractJson(text: string): Record<string, unknown> | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end < 0) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}

function buildEmailHtml(opts: {
  postType: string;
  parsed: Record<string, unknown>;
  link: { url: string; label: string; fullUrl: string };
  season: string;
  holiday: string | null;
}) {
  const body = String(opts.parsed.body ?? "");
  const headline = String(opts.parsed.headline ?? "");
  const hashtags = Array.isArray(opts.parsed.hashtags)
    ? (opts.parsed.hashtags as string[])
    : [];
  const suggestedImage = String(opts.parsed.suggested_image ?? "");

  return `<!doctype html>
<html lang="vi">
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f4f6f8;padding:24px;color:#0A2540">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #e3e8ee">
    <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.12em">Bài đăng GBP — ${opts.postType}</p>
    <h1 style="margin:0 0 18px;font-size:22px;line-height:1.3">${headline}</h1>
    <div style="background:#f8fafc;border:1px solid #e3e8ee;border-radius:8px;padding:18px;white-space:pre-wrap;line-height:1.6;font-size:15px">${body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</div>
    <p style="margin:18px 0 4px;font-size:13px;color:#475569"><strong>Hashtags:</strong> ${hashtags
      .map((h) => `#${h}`)
      .join(" ")}</p>
    <p style="margin:4px 0;font-size:13px;color:#475569"><strong>Link CTA:</strong> <a href="${opts.link.fullUrl}" style="color:#0A2540">${opts.link.fullUrl}</a></p>
    <p style="margin:4px 0;font-size:13px;color:#475569"><strong>Gợi ý ảnh:</strong> ${suggestedImage}</p>
    <hr style="border:none;border-top:1px solid #e3e8ee;margin:18px 0" />
    <p style="margin:0;font-size:12px;color:#94a3b8">Ngữ cảnh tuần này: ${opts.season}${opts.holiday ? ` · ${opts.holiday}` : ""}</p>
    <p style="margin:14px 0 0;font-size:12px;color:#94a3b8">Hướng dẫn: copy phần nội dung trong khung xám, dán vào Google Business Profile → Updates → tạo bài mới. Đính kèm ảnh thực tế từ thư viện của bạn.</p>
  </div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const preview = url.searchParams.get("preview") === "1";

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const postType = getWeekPostType(now);
  const linkKey = pickLinkForPostType(postType, now);
  const linkInfo = SERVICE_PAGES[linkKey];
  const link = { ...linkInfo, fullUrl: `${SITE_URL}${linkInfo.url}` };
  const season = getCanThoSeason(now);
  const holiday = getUpcomingHoliday(now);

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json(
      { error: "Missing ANTHROPIC_API_KEY" },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: buildPrompt({
          postType,
          postTypeBrief: POST_TYPE_DESCRIPTIONS[postType],
          link,
          season,
          holiday,
        }),
      },
    ],
  });

  const raw =
    completion.content[0].type === "text" ? completion.content[0].text : "";
  const parsed = extractJson(raw);

  if (!parsed) {
    return NextResponse.json(
      { error: "Could not parse Claude response", raw },
      { status: 500 }
    );
  }

  const payload = {
    postType,
    link,
    season: season.label,
    holiday: holiday ? `${holiday.name} (còn ${holiday.daysAway} ngày)` : null,
    parsed,
  };

  if (preview) {
    return NextResponse.json(payload);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const recipient = process.env.GBP_RECIPIENT_EMAIL;
  if (!resendKey || !recipient) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY or GBP_RECIPIENT_EMAIL", ...payload },
      { status: 500 }
    );
  }

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: process.env.GBP_SENDER_EMAIL ?? "GBP Bot <onboarding@resend.dev>",
    to: recipient,
    subject: `Bài đăng GBP tuần này — ${postType}`,
    html: buildEmailHtml({
      postType,
      parsed,
      link,
      season: season.label,
      holiday: payload.holiday,
    }),
  });

  return NextResponse.json({ success: true, ...payload });
}
