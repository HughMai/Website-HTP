import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://hungthanhphat.vn", { waitUntil: "networkidle" });

  const schemas = await page.$$eval('script[type="application/ld+json"]', (els) =>
    els.map((el) => { try { return JSON.parse(el.textContent ?? "{}"); } catch { return null; } })
  );

  console.log("\n=== Schema.org blocks on homepage ===\n");
  schemas.forEach((s, i) => {
    if (!s) return;
    console.log(`--- Block ${i + 1}: @type = ${s["@type"]} ---`);
    console.log(JSON.stringify(s, null, 2));
    console.log();
  });

  await browser.close();
})();
