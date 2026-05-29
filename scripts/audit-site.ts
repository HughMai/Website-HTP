import { chromium, type Page } from "@playwright/test";

const BASE = "https://hungthanhphat.vn";

async function measure(page: Page, url: string) {
  const start = Date.now();
  const response = await page.goto(url, { waitUntil: "networkidle" });
  const loadTime = Date.now() - start;
  return { status: response?.status(), loadTime };
}

async function auditPage(page: Page, url: string, label: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`AUDITING: ${label} — ${url}`);
  console.log("=".repeat(60));

  const { status, loadTime } = await measure(page, url);
  console.log(`  Status: ${status} | Load time: ${loadTime}ms`);

  // ── Viewport screenshots ──────────────────────────────────────
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `scripts/screenshots/${label}-mobile.png`,
    fullPage: true,
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `scripts/screenshots/${label}-desktop.png`,
    fullPage: true,
  });

  // ── Meta tags ─────────────────────────────────────────────────
  const title = await page.title();
  const desc = await page
    .$eval('meta[name="description"]', (el) => el.getAttribute("content"))
    .catch(() => "MISSING");
  const canonical = await page
    .$eval('link[rel="canonical"]', (el) => el.getAttribute("href"))
    .catch(() => "MISSING");
  const h1s = await page.$$eval("h1", (els) => els.map((e) => e.textContent?.trim()));
  const h2s = await page.$$eval("h2", (els) => els.map((e) => e.textContent?.trim()));

  console.log(`  Title (${title.length}): ${title}`);
  console.log(`  Desc  (${(desc ?? "").length}): ${desc}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  H1s (${h1s.length}): ${JSON.stringify(h1s)}`);
  console.log(`  H2s (${h2s.length}): ${JSON.stringify(h2s)}`);

  // ── Images without alt ────────────────────────────────────────
  const missingAlt = await page.$$eval("img", (imgs) =>
    imgs
      .filter((img) => !img.alt || img.alt.trim() === "")
      .map((img) => img.src)
  );
  console.log(`  Images missing alt: ${missingAlt.length}`);
  missingAlt.slice(0, 5).forEach((s) => console.log(`    - ${s}`));

  // ── Broken links check ────────────────────────────────────────
  const links = await page.$$eval("a[href]", (els) =>
    [...new Set(els.map((e) => e.getAttribute("href") ?? ""))]
      .filter((h) => h.startsWith("/") || h.startsWith("https://hungthanhphat"))
  );
  console.log(`  Internal links: ${links.length}`);

  // ── CLS / LCP proxies via performance API ─────────────────────
  const perfEntries = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      loadEvent: Math.round(nav.loadEventEnd - nav.startTime),
      ttfb: Math.round(nav.responseStart - nav.requestStart),
    };
  });
  console.log(`  TTFB: ${perfEntries.ttfb}ms | DCL: ${perfEntries.domContentLoaded}ms | Load: ${perfEntries.loadEvent}ms`);

  // ── Accessibility quick checks ────────────────────────────────
  const noAriaLabel = await page.$$eval("button:not([aria-label])", (els) =>
    els.filter((el) => !el.textContent?.trim()).length
  );
  console.log(`  Buttons with no text/aria-label: ${noAriaLabel}`);

  // ── Schema.org structured data ────────────────────────────────
  const schemas = await page.$$eval('script[type="application/ld+json"]', (els) =>
    els.map((el) => {
      try {
        return JSON.parse(el.textContent ?? "{}");
      } catch {
        return { error: "parse error" };
      }
    })
  );
  console.log(`  Schema.org blocks: ${schemas.length}`);
  schemas.forEach((s) => console.log(`    @type: ${s["@type"] ?? "unknown"}`));

  // ── Console errors ────────────────────────────────────────────
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.reload({ waitUntil: "networkidle" });
  if (errors.length) console.log(`  Console errors: ${errors.join(" | ")}`);

  return { label, url, title, desc, h1s, h2s, missingAlt, links, perfEntries, schemas };
}

(async () => {
  const { mkdirSync } = await import("fs");
  mkdirSync("scripts/screenshots", { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const pages = [
    { url: BASE, label: "homepage" },
    { url: `${BASE}/sua-chua-cua-cuon-can-tho`, label: "sua-chua" },
    { url: `${BASE}/lap-dat-cua-cuon-can-tho`, label: "lap-dat" },
    { url: `${BASE}/cua-cuon-nhom-can-tho`, label: "cua-cuon-nhom" },
    { url: `${BASE}/cua-keo-thep-can-tho`, label: "cua-keo-thep" },
    { url: `${BASE}/bao-gia-cua-cuon-can-tho`, label: "bao-gia" },
  ];

  const results = [];
  for (const p of pages) {
    results.push(await auditPage(page, p.url, p.label));
  }

  await browser.close();
  console.log("\n\n✅ Audit complete. Screenshots saved to scripts/screenshots/");
})();
