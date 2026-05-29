import { chromium } from "@playwright/test";
import { mkdirSync } from "fs";

mkdirSync("scripts/screenshots", { recursive: true });

const txt = async (page: any, sel: string) => {
  try { return (await page.$eval(sel, (el: Element) => el.textContent?.trim() ?? "")) } catch { return "" }
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ "Accept-Language": "vi-VN,vi;q=0.9" });

  await page.goto(
    "https://www.google.com/search?q=H%C6%B0ng+Th%C3%A0nh+Ph%C3%A1t+Door+C%E1%BA%A7n+Th%C6%A1&hl=vi&gl=VN",
    { waitUntil: "networkidle", timeout: 30000 }
  );
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "scripts/screenshots/gbp-search.png" });

  // Extract whatever text we can find in the knowledge panel area
  const title       = await txt(page, '[data-attrid="title"]');
  const ratingEl    = await txt(page, '[aria-label*="sao"], [aria-label*="star"], .Aq14fc');
  const reviewEl    = await txt(page, '.hqzQac span, [data-attrid*="review"]');
  const addressEl   = await txt(page, '[data-attrid*="address"] .LrzXr, [data-attrid*="address"] span');
  const phoneEl     = await txt(page, '[data-attrid*="phone"] .LrzXr');
  const categoryEl  = await txt(page, '[data-attrid*="category"] span, .YhemCb');
  const descEl      = await txt(page, '[data-attrid*="description"] span');
  const websiteEl   = await txt(page, '[data-attrid*="website"] a');
  const photoCount  = await page.$$eval("img[src*='lh3.googleuser'], img[src*='maps.gstatic']", (els: Element[]) => els.length).catch(() => 0);

  // Fallback: dump the full body text in first 3000 chars for manual inspection
  const bodySnippet = await page.evaluate(() => document.body.innerText.slice(0, 3000));

  console.log("\n=== Knowledge Panel Extracted Fields ===");
  console.log("Title:    ", title || "(not found)");
  console.log("Rating:   ", ratingEl || "(not found)");
  console.log("Reviews:  ", reviewEl || "(not found)");
  console.log("Address:  ", addressEl || "(not found)");
  console.log("Phone:    ", phoneEl || "(not found)");
  console.log("Category: ", categoryEl || "(not found)");
  console.log("Desc:     ", descEl.slice(0, 120) || "(not found)");
  console.log("Website:  ", websiteEl || "(not found)");
  console.log("Photos:   ", photoCount);

  console.log("\n=== Page body snippet (first 3000 chars) ===");
  console.log(bodySnippet);

  await browser.close();
})();
