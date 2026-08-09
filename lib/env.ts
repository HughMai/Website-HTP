/**
 * Lead-pipeline environment validation.
 *
 * Vercel serverless has no "startup" moment to warn at, so this runs at build
 * time instead: `app/layout.tsx` imports it at module scope, and every one of
 * the 152 static pages is generated through that module.
 *
 *   next build ──► layout.tsx module eval ──► assertContactEnv()
 *                                              │
 *                    all three channels unset ─┴─► throw (production build fails)
 *                    some channels unset ────────► console.warn, build continues
 *
 * The asymmetry is deliberate. Losing one channel is a degraded pipeline and
 * `/api/contact` still answers 200 because another channel took the lead.
 * Losing all three means every submitted phone number goes nowhere, which is
 * never a state worth deploying.
 */

const CHANNELS = [
  { name: "Telegram", vars: ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"] },
  { name: "Email (Resend)", vars: ["RESEND_API_KEY", "NOTIFY_EMAIL"] },
  { name: "CRM webhook", vars: ["CRM_WEBHOOK_TOKEN"] },
] as const;

export function assertContactEnv() {
  const unconfigured = CHANNELS.filter((c) =>
    c.vars.some((v) => !process.env[v])
  );

  if (unconfigured.length === 0) return;

  const detail = unconfigured
    .map((c) => `${c.name} (${c.vars.filter((v) => !process.env[v]).join(", ")})`)
    .join("; ");

  if (unconfigured.length === CHANNELS.length) {
    const msg =
      `[env] Không kênh nhận lead nào được cấu hình: ${detail}. ` +
      `Mọi yêu cầu báo giá sẽ thất bại.`;
    // Fail the build rather than deploy a site that silently discards leads.
    if (process.env.VERCEL_ENV === "production") throw new Error(msg);
    console.warn(msg);
    return;
  }

  console.warn(
    `[env] Kênh nhận lead chưa cấu hình đầy đủ: ${detail}. ` +
      `Các kênh còn lại vẫn hoạt động.`
  );
}
