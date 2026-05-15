import { chromium, devices } from "@playwright/test";
import path from "path";

const URL = "http://localhost:3000";
const OUT = path.join(process.cwd(), "scripts", "screenshots");

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // ── Mobile (iPhone 12) ──────────────────────────────────────────────
  const mobileCx = await browser.newContext({
    ...devices["iPhone 12"],
    storageState: undefined,
  });
  const mobilePage = await mobileCx.newPage();

  await mobilePage.addInitScript(() => {
    sessionStorage.removeItem("htp-intro-seen");
  });

  // Wait until page is interactive (dev server can be slow on first compile)
  await mobilePage.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  // t=0: right at DOMContentLoaded — overlay should cover page
  await mobilePage.screenshot({ path: `${OUT}/mobile-0-start.png`, fullPage: false });

  // t=500ms — early animation (chars starting)
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: `${OUT}/mobile-1-500ms.png`, fullPage: false });

  // t=1200ms — mid animation
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({ path: `${OUT}/mobile-2-1200ms.png`, fullPage: false });

  // t=2000ms — chars finishing
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: `${OUT}/mobile-3-2000ms.png`, fullPage: false });

  // t=3000ms — doors opening
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: `${OUT}/mobile-4-3000ms.png`, fullPage: false });

  // t=4200ms — animation done, page revealed
  await mobilePage.waitForTimeout(1200);
  await mobilePage.screenshot({ path: `${OUT}/mobile-5-done.png`, fullPage: false });

  await mobileCx.close();

  // ── Desktop (1400×900) ──────────────────────────────────────────────
  const desktopCx = await browser.newContext({
    viewport: { width: 1400, height: 900 },
  });
  const desktopPage = await desktopCx.newPage();

  await desktopPage.addInitScript(() => {
    sessionStorage.removeItem("htp-intro-seen");
  });

  await desktopPage.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  await desktopPage.screenshot({ path: `${OUT}/desktop-0-start.png`, fullPage: false });

  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: `${OUT}/desktop-1-500ms.png`, fullPage: false });

  await desktopPage.waitForTimeout(700);
  await desktopPage.screenshot({ path: `${OUT}/desktop-2-1200ms.png`, fullPage: false });

  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: `${OUT}/desktop-3-2000ms.png`, fullPage: false });

  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: `${OUT}/desktop-4-3000ms.png`, fullPage: false });

  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({ path: `${OUT}/desktop-5-done.png`, fullPage: false });

  await desktopCx.close();
  await browser.close();

  console.log("Screenshots saved to scripts/screenshots/");
}

capture().catch(console.error);
