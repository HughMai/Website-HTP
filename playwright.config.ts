import { defineConfig, devices } from "@playwright/test";
import { CRM_MOCK_PORT } from "./e2e/crm-mock";

const PORT = 3100;

/**
 * Runs against a production build on port 3100, deliberately NOT 3000 — dev and
 * prod share the .next directory, so building while `npm run dev` is up on 3000
 * corrupts the dev server.
 *
 * Notification safety: TELEGRAM_* and RESEND_* are explicitly blanked so those
 * channels report "not-configured" and can never send. Only the CRM channel is
 * enabled, and it points at the local mock in e2e/crm-mock.ts.
 */
export default defineConfig({
  testDir: "./e2e",
  // The CRM mock records requests globally, so specs must not interleave.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  globalSetup: "./e2e/global-setup.ts",

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Locally, drive the already-installed Edge instead of downloading a
        // Playwright browser binary. CI installs chromium explicitly.
        ...(process.env.CI ? {} : { channel: "msedge" as const }),
      },
    },
  ],

  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: {
      NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${PORT}`,
      CRM_WEBHOOK_TOKEN: "e2e-test-token",
      CRM_WEBHOOK_URL: `http://127.0.0.1:${CRM_MOCK_PORT}/crm`,
      TELEGRAM_BOT_TOKEN: "",
      TELEGRAM_CHAT_ID: "",
      RESEND_API_KEY: "",
      NOTIFY_EMAIL: "",
    },
  },
});
