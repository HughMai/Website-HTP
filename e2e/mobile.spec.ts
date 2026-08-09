import { expect, test } from "@playwright/test";

/**
 * Mobile is the majority of this site's traffic — a Cần Thơ homeowner finds the
 * shop on a phone, from Maps or a search result. Everything here is measured
 * geometry at a real phone viewport, not markup assertions: the honeypot bug
 * shipped precisely because the tests checked roles and text while the CSS that
 * positioned the field was never generated.
 */
/**
 * iPhone 13 metrics, but deliberately NOT `devices["iPhone 13"]` — that preset
 * carries `defaultBrowserType: "webkit"`, which overrides the project's browser
 * and makes the run demand a WebKit download. The layout under test is CSS, so
 * the engine matters far less than the viewport and touch behaviour.
 */
test.use({
  viewport: { width: 390, height: 664 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

const ROUTES = [
  "/",
  "/cua-cuon-can-tho",
  "/cua-keo-can-tho",
  "/cua-nhom-kinh-can-tho",
  "/phu-kien-cua-cuon-can-tho",
  "/bang-gia-cua-keo-can-tho",
  "/bao-gia-cua-cuon-can-tho",
  "/cong-trinh",
  "/blog",
];

const FORM_ROUTES = ["/", "/bao-gia-cua-cuon-can-tho", "/cua-cuon-can-tho"];

/**
 * 44px, minus half a pixel. Layout returns floats — an `h-11` box measures
 * 43.999969 under a fractional device scale factor, and asserting against an
 * exact 44 turns that rounding into a flaky failure rather than a finding.
 */
const MIN_TAP = 43.5;

/** Scroll the whole page so lazy images and scroll-triggered sections settle. */
async function settle(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}

test.describe("Mobile layout", () => {
  for (const route of ROUTES) {
    test(`${route} does not scroll sideways`, async ({ page }) => {
      await page.goto(route);
      await settle(page);

      const { vw, scrollWidth, culprits } = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const culprits: string[] = [];
        if (document.documentElement.scrollWidth > vw + 1) {
          for (const el of document.querySelectorAll<HTMLElement>("body *")) {
            const r = el.getBoundingClientRect();
            if (r.width === 0) continue;
            if (r.right > vw + 1 && getComputedStyle(el).position !== "fixed") {
              culprits.push(
                `<${el.tagName.toLowerCase()} class="${el.className}"> right=${Math.round(r.right)}`
              );
              if (culprits.length >= 5) break;
            }
          }
        }
        return {
          vw,
          scrollWidth: document.documentElement.scrollWidth,
          culprits,
        };
      });

      expect(
        scrollWidth,
        `${route} overflows ${vw}px:\n${culprits.join("\n")}`
      ).toBeLessThanOrEqual(vw + 1);
    });
  }
});

test.describe("Mobile readability", () => {
  for (const route of ROUTES) {
    test(`${route} sets running copy at 14px or larger`, async ({ page }) => {
      await page.goto(route);
      await settle(page);

      const tiny = await page.evaluate(() => {
        const out: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>("p, li")) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") continue;

          // Only leaf-ish running copy: an element that owns a real sentence.
          const own = [...el.childNodes]
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent ?? "")
            .join("")
            .trim();
          if (own.length < 30) continue;

          // Fine print keeps its conventional smaller size — an asterisked price
          // caveat and the copyright line are meant to sit below body copy.
          if (/^[*©]/.test(el.textContent?.trim() ?? "")) continue;

          if (parseFloat(cs.fontSize) < 14) {
            out.push(`${cs.fontSize} — "${own.slice(0, 60)}" .${el.className}`);
          }
        }
        return out;
      });

      expect(tiny, `${route} has sub-14px body copy:\n${tiny.join("\n")}`).toEqual(
        []
      );
    });
  }
});

test.describe("Mobile forms", () => {
  for (const route of FORM_ROUTES) {
    test(`${route} form fields are 16px so iOS does not zoom`, async ({
      page,
    }) => {
      await page.goto(route);

      const small = await page.evaluate(() => {
        const out: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>(
          "input, textarea, select"
        )) {
          const r = el.getBoundingClientRect();
          // The honeypot is parked off-screen at 1px; it is never focused.
          if (r.width < 2 || r.height < 2) continue;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs < 16) out.push(`${el.getAttribute("name")}: ${fs}px`);
        }
        return out;
      });

      expect(
        small,
        `iOS Safari zooms the viewport when a focused field is under 16px:\n${small.join("\n")}`
      ).toEqual([]);
    });
  }

  test("the honeypot never overlaps a real field", async ({ page }) => {
    await page.goto("/");
    const box = await page.evaluate(() => {
      const hp = document.querySelector<HTMLElement>('input[name="website"]');
      if (!hp) return null;
      const r = hp.getBoundingClientRect();
      return { left: r.left, width: r.width, height: r.height };
    });
    expect(box, "honeypot field is present").not.toBeNull();
    // Parked off-canvas, not merely transparent — a visible-but-clear input
    // still steals taps from the name field underneath it.
    expect(box!.left).toBeLessThan(-1000);
  });
});

test.describe("Mobile navigation", () => {
  test("menu opens, closes, and offers the four product categories", async ({
    page,
  }) => {
    await page.goto("/");

    const open = page.getByRole("button", { name: "Mở menu" });
    await expect(open).toBeVisible();
    const openBox = (await open.boundingBox())!;
    expect(Math.min(openBox.width, openBox.height)).toBeGreaterThanOrEqual(MIN_TAP);

    await open.click();
    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();

    for (const label of ["Cửa Cuốn", "Cửa Kéo", "Nhôm Kính", "Phụ Kiện"]) {
      const link = sheet.getByRole("link", { name: label, exact: true });
      await expect(link).toBeVisible();
      const b = (await link.boundingBox())!;
      expect(
        Math.min(b.width, b.height),
        `"${label}" is a ${Math.round(b.width)}x${Math.round(b.height)} target`
      ).toBeGreaterThanOrEqual(MIN_TAP);
    }

    // The close control was the icon glyph itself, a 20x20 target.
    const close = sheet.getByRole("button", { name: "Đóng" });
    const cb = (await close.boundingBox())!;
    expect(Math.min(cb.width, cb.height)).toBeGreaterThanOrEqual(MIN_TAP);

    await close.click();
    await expect(sheet).toBeHidden();
  });

  test("the sticky call bar keeps all three actions thumb-sized", async ({
    page,
  }) => {
    await page.goto("/");
    for (const name of [
      /^Gọi hotline/,
      /Zalo/,
      /Google Maps/,
    ]) {
      const link = page.getByRole("link", { name }).last();
      const b = (await link.boundingBox())!;
      expect(Math.min(b.width, b.height)).toBeGreaterThanOrEqual(MIN_TAP);
    }
  });

  test("the sticky bar offers call, Zalo and the map — not a quote page", async ({
    page,
  }) => {
    await page.goto("/");
    const bar = page.locator("div.fixed.bottom-0").last();
    const hrefs = await bar.locator("a").evaluateAll((els) =>
      els.map((e) => e.getAttribute("href") ?? "")
    );
    expect(hrefs).toHaveLength(3);
    expect(hrefs[0]).toMatch(/^tel:/);
    expect(hrefs[1]).toContain("zalo.me");
    expect(hrefs[2]).toContain("google.com/maps");
  });

  for (const route of ROUTES) {
    test(`${route} has no undersized tap targets`, async ({ page }) => {
      await page.goto(route);
      await settle(page);

      const small = await page.evaluate(() => {
        const out: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>(
          "a[href], button"
        )) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          if (el.closest('[aria-hidden="true"]')) continue;

          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;

          // WCAG 2.2 SC 2.5.8 exempts links flowing inline inside a sentence —
          // they cannot be enlarged without breaking the line box.
          if (cs.display === "inline") continue;

          // An anchor wrapping a button is not the hit target; the button is.
          if (el.tagName === "A" && el.querySelector("button")) continue;

          if (Math.min(r.width, r.height) < 43.5) {
            out.push(
              `${Math.round(r.width)}x${Math.round(r.height)} "${(
                el.textContent ?? ""
              )
                .trim()
                .slice(0, 30)}" .${el.className}`
            );
          }
        }
        return out;
      });

      expect(
        small,
        `${route} has targets under 44px:\n${small.join("\n")}`
      ).toEqual([]);
    });
  }
});
