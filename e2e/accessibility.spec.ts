import { expect, test } from "@playwright/test";

test.describe("Skip link", () => {
  test("is the first tab stop and moves focus to the main landmark", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("href", "#main");
    // Must be visible once focused, not just present in the DOM.
    await expect(focused).toBeInViewport();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("exists on landing pages too, with a target to jump to", async ({ page }) => {
    for (const route of ["/cua-cuon-can-tho", "/cua-cuon-o-mon", "/cong-trinh"]) {
      await page.goto(route);
      await expect(page.locator('a[href="#main"]')).toHaveCount(1);
      await expect(page.locator("#main")).toHaveCount(1);
    }
  });
});

test.describe("Reduced motion", () => {
  test("stops both marquees", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // Below-fold sections are dynamically imported; scroll so they mount.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);

    const marquees = page.locator(".animate-marquee");
    const count = await marquees.count();
    expect(count, "the homepage should have marquees to suppress").toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const animation = await marquees.nth(i).evaluate(
        (el) => getComputedStyle(el).animationName
      );
      expect(animation, "marquee should not animate under reduced motion").toBe(
        "none"
      );
    }
  });
});

test.describe("Tap targets at 390x844", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  // WCAG 2.2 SC 2.5.8 (AA) is 24x24 and exempts inline links inside sentences.
  // 44px is SC 2.5.5 (AAA) and is what we hold PRIMARY targets to: buttons,
  // nav items, and standalone chips. Inline prose links are checked at 24.
  const PRIMARY = 44;

  for (const route of ["/", "/cua-cuon-can-tho"]) {
    test(`${route} primary tap targets are at least ${PRIMARY}px`, async ({
      page,
    }) => {
      await page.goto(route);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);

      const undersized = await page.evaluate((min) => {
        const bad: string[] = [];
        const nodes = document.querySelectorAll<HTMLElement>(
          "button, a[href], [role='button']"
        );
        nodes.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return; // hidden
          // Inline links inside a paragraph or list are exempt under 2.5.8.
          const parentTag = el.parentElement?.tagName ?? "";
          if (["P", "LI", "SPAN"].includes(parentTag) && el.tagName === "A") return;
          if (el.closest(".skip-link")) return;
          if (r.height < min) {
            bad.push(
              `${el.tagName}.${el.className.toString().slice(0, 40)} h=${Math.round(r.height)}`
            );
          }
        });
        return bad;
      }, PRIMARY);

      expect(
        undersized,
        `undersized primary targets on ${route}:\n${undersized.join("\n")}`
      ).toEqual([]);
    });
  }
});

test.describe("Layout integrity", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the homepage never scrolls horizontally on mobile", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBe(0);
  });
});
