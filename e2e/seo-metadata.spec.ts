import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { WARRANTY_TERMS } from "../lib/site-data";

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
  // Since 14/11/2026 (CLAUDE.md locked decision #1) the only year counts allowed are
  // Hughie's cửa cuốn terms, word for word from WARRANTY_TERMS in lib/site-data.ts.
  // Everything else keeps "Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất".
  test("no warranty claim quotes a year count other than the 14/11/2026 terms", () => {
    const files: string[] = [];
    function walk(dir: string) {
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
    }
    for (const dir of ["app", "components", "lib"]) walk(dir);

    // Longest first: motorPhuKien is the tail of cuaCuon.
    const allowed = [WARRANTY_TERMS.cuaCuon, WARRANTY_TERMS.motorPhuKien].map((s) => s.toLowerCase());
    const offenders: string[] = [];
    // "bảo hành ... <n> năm" within one sentence.
    const re = /b[ảa]o h[àa]nh[^.\n]{0,120}?\b\d{1,2}\s*n[ăa]m/giu;

    for (const file of files) {
      const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, i) => {
        let rest = line.toLowerCase();
        for (const a of allowed) rest = rest.split(a).join(" ");
        re.lastIndex = 0;
        if (re.test(rest)) offenders.push(`${file}:${i + 1}  ${line.trim().slice(0, 120)}`);
      });
    }

    expect(
      offenders,
      "CLAUDE.md locked decision #1: a warranty year count may only be one of the " +
        "WARRANTY_TERMS sentences (lib/site-data.ts), word for word; everything else says " +
        '"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất".\n' +
        offenders.join("\n")
    ).toEqual([]);
  });
});
