import { chromium, Browser, Page, ConsoleMessage } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://website-htp.vercel.app";

const PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/cua-cuon-nhom-can-tho", label: "Cửa Cuốn Nhôm" },
  { path: "/cua-keo-thep-can-tho", label: "Cửa Kéo Thép" },
  { path: "/lap-dat-cua-cuon-can-tho", label: "Lắp Đặt Cửa Cuốn" },
  { path: "/sua-chua-cua-cuon-can-tho", label: "Sửa Chữa Cửa Cuốn" },
  { path: "/bao-gia-cua-cuon-can-tho", label: "Báo Giá Cửa Cuốn" },
  { path: "/bang-gia-cua-keo-can-tho", label: "Bảng Giá Cửa Kéo" },
  { path: "/bang-gia-cua-nhom-kinh-can-tho", label: "Bảng Giá Cửa Nhôm Kính" },
];

interface PageAudit {
  url: string;
  label: string;
  statusCode: number;
  title: string;
  metaDescription: string;
  h1Count: number;
  h1Text: string[];
  consoleErrors: string[];
  consoleWarnings: string[];
  brokenImages: string[];
  brokenLinks: string[];
  missingAltImages: string[];
  lcp: number | null;
  cls: number | null;
  fcp: number | null;
  hasCanonical: boolean;
  canonicalUrl: string;
  hasOgTitle: boolean;
  hasOgDescription: boolean;
  hasOgImage: boolean;
  hasSchema: boolean;
  schemaTypes: string[];
  mobileIssues: string[];
  issues: string[];
  suggestions: string[];
}

async function auditPage(
  page: Page,
  url: string,
  label: string,
  screenshotDir: string
): Promise<PageAudit> {
  const audit: PageAudit = {
    url,
    label,
    statusCode: 0,
    title: "",
    metaDescription: "",
    h1Count: 0,
    h1Text: [],
    consoleErrors: [],
    consoleWarnings: [],
    brokenImages: [],
    brokenLinks: [],
    missingAltImages: [],
    lcp: null,
    cls: null,
    fcp: null,
    hasCanonical: false,
    canonicalUrl: "",
    hasOgTitle: false,
    hasOgDescription: false,
    hasOgImage: false,
    hasSchema: false,
    schemaTypes: [],
    mobileIssues: [],
    issues: [],
    suggestions: [],
  };

  // Collect console messages
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") audit.consoleErrors.push(msg.text());
    if (msg.type() === "warning") audit.consoleWarnings.push(msg.text());
  });

  // Navigate
  const response = await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  audit.statusCode = response?.status() ?? 0;

  if (audit.statusCode >= 400) {
    audit.issues.push(`HTTP ${audit.statusCode} error`);
    return audit;
  }

  await page.waitForTimeout(2000);

  // Desktop screenshot
  await page.screenshot({
    path: path.join(screenshotDir, `desktop-${label.replace(/\s+/g, "-")}.png`),
    fullPage: true,
  });

  // --- Meta ---
  audit.title = await page.title();
  audit.metaDescription =
    (await page
      .locator('meta[name="description"]')
      .getAttribute("content")
      .catch(() => "")) ?? "";
  audit.canonicalUrl =
    (await page
      .locator('link[rel="canonical"]')
      .getAttribute("href")
      .catch(() => "")) ?? "";
  audit.hasCanonical = audit.canonicalUrl.length > 0;
  audit.hasOgTitle =
    (await page.locator('meta[property="og:title"]').count()) > 0;
  audit.hasOgDescription =
    (await page.locator('meta[property="og:description"]').count()) > 0;
  audit.hasOgImage =
    (await page.locator('meta[property="og:image"]').count()) > 0;

  // --- Schema ---
  const schemas = await page.locator('script[type="application/ld+json"]').all();
  audit.hasSchema = schemas.length > 0;
  for (const s of schemas) {
    try {
      const text = await s.textContent();
      if (text) {
        const parsed = JSON.parse(text);
        const types = Array.isArray(parsed)
          ? parsed.map((x) => x["@type"]).flat()
          : [parsed["@type"]];
        audit.schemaTypes.push(...types.filter(Boolean));
      }
    } catch {
      audit.issues.push("Malformed JSON-LD schema detected");
    }
  }

  // --- Headers ---
  const h1s = await page.locator("h1").all();
  audit.h1Count = h1s.length;
  for (const h of h1s) {
    audit.h1Text.push((await h.innerText()).trim());
  }

  // --- Images ---
  const imgs = await page.locator("img").all();
  for (const img of imgs) {
    const src = (await img.getAttribute("src")) ?? "";
    const alt = await img.getAttribute("alt");
    if (alt === null || alt === "") {
      audit.missingAltImages.push(src.substring(0, 80));
    }
  }

  // --- Links ---
  const links = await page.locator("a[href]").all();
  const internalLinks: string[] = [];
  for (const link of links) {
    const href = (await link.getAttribute("href")) ?? "";
    if (href.startsWith("/") && !href.startsWith("//")) {
      internalLinks.push(href);
    }
  }

  // Check a sample of internal links for 404s
  const uniqueLinks = [...new Set(internalLinks)].slice(0, 15);
  for (const href of uniqueLinks) {
    const res = await page.request
      .get(new URL(href, BASE_URL).toString())
      .catch(() => null);
    if (res && res.status() >= 400) {
      audit.brokenLinks.push(`${href} → ${res.status()}`);
    }
  }

  // --- Web Vitals via PerformanceObserver ---
  const vitals = await page.evaluate(() => {
    return new Promise<{ lcp: number | null; cls: number | null; fcp: number | null }>(
      (resolve) => {
        const result = { lcp: null as number | null, cls: null as number | null, fcp: null as number | null };
        let clsValue = 0;
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
              result.lcp = (e as PerformanceEntry & { startTime: number }).startTime;
            }
          }).observe({ type: "largest-contentful-paint", buffered: true });

          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
              const entry = e as PerformanceEntry & { hadRecentInput: boolean; value: number };
              if (!entry.hadRecentInput) clsValue += entry.value;
            }
            result.cls = clsValue;
          }).observe({ type: "layout-shift", buffered: true });

          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
              if (e.name === "first-contentful-paint") {
                result.fcp = (e as PerformanceEntry & { startTime: number }).startTime;
              }
            }
          }).observe({ type: "paint", buffered: true });
        } catch {
          // observer not supported
        }
        setTimeout(() => resolve(result), 3000);
      }
    );
  });
  audit.lcp = vitals.lcp ? Math.round(vitals.lcp) : null;
  audit.cls = vitals.cls !== null ? Math.round(vitals.cls * 1000) / 1000 : null;
  audit.fcp = vitals.fcp ? Math.round(vitals.fcp) : null;

  // --- Mobile viewport check ---
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(screenshotDir, `mobile-${label.replace(/\s+/g, "-")}.png`),
    fullPage: true,
  });

  // Check for horizontal overflow on mobile
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  if (hasOverflow) {
    audit.mobileIssues.push("Horizontal scroll overflow detected on mobile");
  }

  // Check floating buttons are visible and sized correctly
  const floatingBtns = await page.locator(".fixed").all();
  for (const btn of floatingBtns) {
    const box = await btn.boundingBox().catch(() => null);
    if (box && box.width > 250) {
      audit.mobileIssues.push(`Oversized fixed element: ${box.width}px wide`);
    }
  }

  // Reset viewport
  await page.setViewportSize({ width: 1280, height: 800 });

  // --- SEO checks ---
  if (!audit.title) audit.issues.push("Missing <title> tag");
  else if (audit.title.length < 30)
    audit.issues.push(`Title too short (${audit.title.length} chars): "${audit.title}"`);
  else if (audit.title.length > 65)
    audit.issues.push(`Title too long (${audit.title.length} chars)`);

  if (!audit.metaDescription)
    audit.issues.push("Missing meta description");
  else if (audit.metaDescription.length < 120)
    audit.issues.push(`Meta description too short (${audit.metaDescription.length} chars)`);
  else if (audit.metaDescription.length > 165)
    audit.issues.push(`Meta description too long (${audit.metaDescription.length} chars)`);

  if (audit.h1Count === 0) audit.issues.push("No H1 tag found");
  else if (audit.h1Count > 1) audit.issues.push(`Multiple H1 tags (${audit.h1Count})`);

  if (!audit.hasCanonical) audit.suggestions.push("Add canonical URL tag");
  if (!audit.hasOgTitle) audit.suggestions.push("Add og:title meta tag");
  if (!audit.hasOgDescription) audit.suggestions.push("Add og:description meta tag");
  if (!audit.hasOgImage) audit.suggestions.push("Add og:image meta tag");
  if (!audit.hasSchema) audit.suggestions.push("Add JSON-LD structured data");

  if (audit.missingAltImages.length > 0)
    audit.issues.push(`${audit.missingAltImages.length} image(s) missing alt text`);

  if (audit.lcp && audit.lcp > 2500)
    audit.suggestions.push(`LCP ${audit.lcp}ms is above 2500ms threshold (Good < 2500ms)`);
  if (audit.cls && audit.cls > 0.1)
    audit.issues.push(`CLS ${audit.cls} is above 0.1 threshold (Good < 0.1)`);

  return audit;
}

async function runAudit() {
  const screenshotDir = path.join(
    "c:/Users/Hugh Mai/HTP website/scripts/screenshots"
  );
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });
  const page = await context.newPage();

  const results: PageAudit[] = [];

  for (const { path: pagePath, label } of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`\nAuditing: ${label} — ${url}`);
    try {
      const audit = await auditPage(page, url, label, screenshotDir);
      results.push(audit);
      console.log(`  Status: ${audit.statusCode} | Title: ${audit.title.substring(0, 60)}`);
      if (audit.issues.length) console.log(`  Issues: ${audit.issues.join("; ")}`);
      if (audit.mobileIssues.length) console.log(`  Mobile: ${audit.mobileIssues.join("; ")}`);
    } catch (err) {
      console.error(`  ERROR on ${label}:`, err);
      results.push({ url, label, statusCode: 0, issues: [`Playwright error: ${err}`] } as PageAudit);
    }
  }

  await browser.close();

  // Write JSON report
  const reportPath = path.join("c:/Users/Hugh Mai/HTP website/scripts/audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nReport saved to: ${reportPath}`);

  // Print summary
  console.log("\n========== AUDIT SUMMARY ==========");
  for (const r of results) {
    const totalIssues = r.issues.length + r.mobileIssues.length + r.consoleErrors.length;
    console.log(
      `\n[${r.label}] ${r.url}\n  HTTP ${r.statusCode} | H1: ${r.h1Count} | Schema: ${r.schemaTypes.join(", ") || "none"}`
    );
    console.log(
      `  LCP: ${r.lcp ?? "n/a"}ms | FCP: ${r.fcp ?? "n/a"}ms | CLS: ${r.cls ?? "n/a"}`
    );
    if (r.consoleErrors.length) console.log(`  Console errors: ${r.consoleErrors.join(" | ")}`);
    if (r.issues.length) console.log(`  Issues (${r.issues.length}): ${r.issues.join(" | ")}`);
    if (r.mobileIssues.length) console.log(`  Mobile issues: ${r.mobileIssues.join(" | ")}`);
    if (r.brokenLinks.length) console.log(`  Broken links: ${r.brokenLinks.join(" | ")}`);
    if (r.suggestions.length) console.log(`  Suggestions: ${r.suggestions.join(" | ")}`);
    if (totalIssues === 0) console.log("  ✅ No issues found");
  }
}

runAudit().catch(console.error);
