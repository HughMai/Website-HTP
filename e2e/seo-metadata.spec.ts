import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

/**
 * Titles are asserted against the RENDERED <title>, not the source string,
 * because app/layout.tsx appends a template suffix to every page. Measuring the
 * source is what let all 24 titles drift past Google's cut in the first place.
 *
 * 60 characters is a proxy — Google truncates on pixel width and rewrites
 * titles at will — but it is the standard proxy and it catches the 100+ char
 * titles that were shipping.
 */
const TITLE_LIMIT = 60;

const ROUTES = [
  "/",
  "/cua-cuon-can-tho",
  "/cua-nhom-kinh-can-tho",
  "/cua-keo-can-tho",
  "/cua-keo-thep-can-tho",
  "/lan-can-nhom-kinh-can-tho",
  "/cua-cuon-nhom-can-tho",
  "/cua-cuon-nha-xuong-can-tho",
  "/cua-cuon-binh-thuy",
  "/cua-cuon-cai-rang",
  "/cua-cuon-ninh-kieu",
  "/cua-cuon-o-mon",
  "/cua-cuon-thot-not",
  "/lap-dat-cua-cuon-can-tho",
  "/sua-chua-cua-cuon-can-tho",
  "/phu-kien-cua-cuon-can-tho",
  "/bang-gia-cua-keo-can-tho",
  "/bang-gia-cua-nhom-kinh-can-tho",
  "/bang-gia-phu-kien-can-tho",
  "/bao-gia-cua-cuon-can-tho",
  "/cong-trinh",
  "/san-pham",
  "/blog",
  "/blog/cach-bao-tri-cua-cuon",
  "/blog/motor-cua-cuon-tot-nhat",
  "/blog/nhom-duc-vs-thep-tinh-dien",
];

test.describe("SEO metadata", () => {
  for (const route of ROUTES) {
    test(`${route} renders a title within ${TITLE_LIMIT} characters`, async ({
      page,
    }) => {
      const res = await page.goto(route);
      expect(res?.status(), `${route} should return 200`).toBe(200);

      const title = await page.title();
      expect(title.length, `${route} title is "${title}"`).toBeLessThanOrEqual(
        TITLE_LIMIT
      );
    });
  }

  test("pillar pages still emit their JSON-LD", async ({ page }) => {
    for (const route of [
      "/cua-cuon-can-tho",
      "/cua-nhom-kinh-can-tho",
      "/cua-keo-can-tho",
    ]) {
      await page.goto(route);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      expect(blocks.length, `${route} has structured data`).toBeGreaterThan(0);
      // Must be parseable — a broken block is invisible until Search Console
      // complains weeks later.
      for (const b of blocks) expect(() => JSON.parse(b)).not.toThrow();
    }
  });
});

test.describe("Locked copy rules", () => {
  // Source-level, not rendered: this must also catch year counts hiding inside
  // FAQPage JSON-LD strings, which is where six of them were living.
  test("no warranty claim quotes a specific year count", () => {
    const files: string[] = [];
    (function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (![".next", "node_modules", ".git", "public"].includes(entry.name)) {
            walk(p);
          }
        } else if (/\.(tsx?|md)$/.test(entry.name)) {
          files.push(p);
        }
      }
    })("app");

    const offenders: string[] = [];
    // "bảo hành ... <n> năm" within one sentence.
    const re = /b[ảa]o h[àa]nh[^.\n]{0,120}?\b\d{1,2}\s*n[ăa]m/giu;

    for (const file of files) {
      const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, i) => {
        re.lastIndex = 0;
        if (re.test(line)) offenders.push(`${file}:${i + 1}  ${line.trim().slice(0, 120)}`);
      });
    }

    expect(
      offenders,
      "CLAUDE.md hard rule: the only permitted warranty phrasing is " +
        '"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất" — never a year count.\n' +
        offenders.join("\n")
    ).toEqual([]);
  });
});
