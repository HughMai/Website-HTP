import { expect, test } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";

/*
 * Google Ads landing pages (/lp/*): the conversion rules from
 * Enki/htp/ads/conversion-plan-2026-11-11.md, checked on a 360×740 phone, the
 * smallest common Android screen in Cần Thơ.
 */

// form: install pages lead with the Zalo-number form; the repair page is an emergency
// and has none.
const PAGES = [
  { path: "/lp/cua-cuon-can-tho", keyword: "Cửa Cuốn Cần Thơ", price: "500.000", form: true },
  { path: "/lp/cua-keo-can-tho", keyword: "Cửa Kéo Cần Thơ", price: "540.000", form: true },
  { path: "/lp/cua-nhom-kinh-can-tho", keyword: "Cửa Nhôm Kính Cần Thơ", price: "1.200.000", form: true },
  { path: "/lp/sua-cua-cuon-can-tho", keyword: "Sửa Cửa Cuốn Cần Thơ", price: "300.000", form: false },
];

const PHONE = { width: 360, height: 740 };

test.describe("Google Ads landing pages", () => {
  test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

  for (const p of PAGES) {
    test(`${p.path}: search term in the H1, call and Zalo above the fold, nothing to wander off to`, async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);

      // Search = ad = page: the H1 opens with the ad group's keyword, and so does the title.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(p.keyword);
      await expect(page).toHaveTitle(new RegExp(`^${p.keyword}`));

      // Paid traffic only: never indexed, never in the sitemap (checked below).
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

      // A call button is always on the first screen (the header's). On the repair page the
      // hero's own call and Zalo are there too; on install pages the form holds that spot
      // (checked below) and the hero's call/Zalo row may sit just under it. The sticky bar
      // stays out of the way while the hero's ask is visible.
      const firstScreen = p.form
        ? ['[data-track="lp_topbar"] a[href^="tel:"]']
        : ['[data-track="lp_topbar"] a[href^="tel:"]', '[data-track="lp_hero"] a[href^="tel:"]', '[data-track="lp_hero"] a[href*="zalo.me"]'];
      for (const selector of firstScreen) {
        const box = await page.locator(selector).boundingBox();
        expect(box, selector).not.toBeNull();
        expect(box!.y + box!.height, `${selector} must be on the first screen`).toBeLessThanOrEqual(PHONE.height);
      }
      // Bottom bar: the Zalo field on install pages, call + Zalo on the repair page.
      // Hidden while the hero's own ask is on screen.
      const sticky = page.locator(p.form ? '[data-track="sticky_zalo"]' : '[data-track="sticky_bar"]');
      await expect(sticky).toHaveAttribute("aria-hidden", "true");

      // No site menu, no footer link groups, no map iframe — the only ways out are
      // calling, Zalo, the form, the Google reviews and directions.
      await expect(page.locator('a[href="/san-pham"], a[href="/cong-trinh"], a[href="/"]')).toHaveCount(0);
      await expect(page.locator('iframe[src*="maps.google"]')).toHaveCount(0);

      if (p.form) {
        // Install pages: the Zalo-number box is the first thing to do — field and button
        // both on the first screen, inside the hero.
        await expect(page.locator('[data-track="lp_hero"] #nhan-bao-gia form')).toHaveCount(1);
        for (const selector of ['#nhan-bao-gia input[type="tel"]', '#nhan-bao-gia button[type="submit"]']) {
          const box = await page.locator(selector).boundingBox();
          expect(box, selector).not.toBeNull();
          expect(box!.y + box!.height, `${selector} must be on the first screen`).toBeLessThanOrEqual(PHONE.height);
        }
      } else {
        // Repair: someone with a stuck door calls. Nothing to fill in anywhere.
        await expect(page.locator("main form")).toHaveCount(0);
      }
      // The advertised price is on the page.
      // 3 ĐÚNG on the install pages: đúng giá, đúng vật tư, đúng hẹn — with the late-install consequence.
      if (!p.path.includes("sua-")) {
        await expect(page.locator("#lp-cam-ket")).toContainText("đúng hẹn");
        await expect(page.locator("main")).toContainText("giảm 1% giá trị hợp đồng cho mỗi ngày trễ, tối đa 10%");
      }
      await expect(page.locator("main")).toContainText(p.price);

      // Form copy is title + field + button only (Hughie, 12/11/2026).
      await expect(page.locator("main")).not.toContainText("Gửi số là đồng ý");
      await expect(page.locator("main")).not.toContainText("Catalog và bảng giá gửi thẳng vào Zalo");

      // Logo-only header with the HTP Door logo (12/11/2026), and no floating rail.
      await expect(page.locator('header img[src*="logo-htp-door"]')).toBeVisible();
      await expect(page.locator('[data-track="floating_rail"]')).toHaveCount(0);

      // Proof sits with the ask: the Google rating and a real review sentence in the hero.
      const hero = page.locator('section[aria-labelledby="lp-title"]');
      await expect(hero).toContainText("đánh giá Google");
      await expect(hero.locator("blockquote")).toBeVisible();

      // Scrolled past the hero, the bottom bar slides in with the page's one ask plus a
      // call button, and no map button sending the paid visitor off the page.
      await page.locator("#lp-bang-gia").scrollIntoViewIfNeeded();
      await expect(sticky).not.toHaveAttribute("aria-hidden", "true");
      await expect(sticky.locator('a[href^="tel:"]')).toBeInViewport();
      if (p.form) {
        await expect(sticky.getByPlaceholder("Số Zalo anh/chị")).toBeInViewport();
        await expect(sticky.getByRole("button", { name: "Nhận giá" })).toBeInViewport();
      } else {
        await expect(sticky.locator('a[href*="zalo.me"]')).toBeInViewport();
      }
      await expect(sticky.locator('a[href*="google.com/maps"]')).toHaveCount(0);
    });
  }

  test("the bottom Zalo bar steps aside while another form is on screen", async ({ page }) => {
    await page.goto("/lp/cua-keo-can-tho");
    const bar = page.locator('[data-track="sticky_zalo"]');
    await page.locator("#lp-bang-gia").scrollIntoViewIfNeeded();
    await expect(bar).not.toHaveAttribute("aria-hidden", "true");
    // The closing section has the same form: one field on screen, not two.
    await page.locator("#lp-goi-ngay").scrollIntoViewIfNeeded();
    await expect(bar).toHaveAttribute("aria-hidden", "true");
  });

  test("a lead from the bottom Zalo bar reaches the CRM, tagged as the bar", async ({ page }) => {
    await resetCrm("ok");
    const run = (Date.now() + 7) % 100000;
    const phone = `097${String(run).padStart(7, "0")}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.201.${run % 250}.${(run >> 8) % 250}` });

    await page.goto("/lp/cua-keo-can-tho?utm_source=google&utm_medium=cpc&utm_campaign=cua-keo");
    await page.locator("#lp-bang-gia").scrollIntoViewIfNeeded();
    const bar = page.locator('[data-track="sticky_zalo"]');
    await expect(bar).not.toHaveAttribute("aria-hidden", "true");
    await bar.getByPlaceholder("Số Zalo anh/chị").fill(phone);
    // The server drops submissions made faster than a human could type.
    await page.waitForTimeout(3200);
    await bar.getByRole("button", { name: "Nhận giá" }).click();

    await expect(bar.getByRole("status")).toContainText("Đang gửi báo giá qua Zalo", { timeout: 15_000 });
    await expect(bar.getByRole("status")).toContainText("nhận tin nhắn từ người lạ");
    await expect.poll(async () => (await crmReceived()).length).toBe(1);
    const got = await crmReceived<{ phone: string; sourcePage: string; catalog: boolean; utm_campaign: string }>();
    expect(got[0].phone).toBe(phone);
    expect(got[0].catalog).toBe(true);
    expect(got[0].sourcePage).toBe("lp_cua-keo-can-tho · thanh dưới");
    expect(got[0].utm_campaign).toBe("cua-keo");
  });

  test("only real customer reviews run on ad pages — never the family's own", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      await expect(page.locator("main")).not.toContainText("Mai Hugh");
    }
  });

  test("no warranty year counts on ad pages (CLAUDE.md hard rule)", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      // Open every FAQ so collapsed answers are in innerText too.
      await page.locator("details").evaluateAll((els) => els.forEach((d) => d.setAttribute("open", "")));
      const text = await page.locator("main").innerText();
      expect(text).not.toMatch(/b[ảa]o h[àa]nh[^.\n]{0,120}?\b\d{1,2}\s*n[ăa]m/iu);
    }
  });

  test("repair prices on the ad page match /sua-chua-cua-cuon-can-tho", async ({ page }) => {
    await page.goto("/lp/sua-cua-cuon-can-tho");
    await page.locator("details").evaluateAll((els) => els.forEach((d) => d.setAttribute("open", "")));
    const rows = await page.locator("table tbody tr").allInnerTexts();
    expect(rows.length).toBeGreaterThan(10);

    await page.goto("/sua-chua-cua-cuon-can-tho");
    const seo = await page.locator("body").innerText();
    for (const row of rows) {
      const [item, range] = row.split("\t").map((s) => s.trim());
      expect(seo, `"${item}" is missing from the repair page`).toContain(item);
      expect(seo, `"${item}: ${range}" no longer matches the repair page`).toContain(range);
    }
  });

  test("a lead from an ad page reaches the CRM tagged with the page and the Google Ads campaign", async ({ page }) => {
    await resetCrm("ok");
    // A fresh visitor, so the per-IP and per-phone caps in /api/contact never see a repeat.
    const run = Date.now() % 100000;
    const phone = `098${String(run).padStart(7, "0")}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.200.${run % 250}.${(run >> 8) % 250}` });

    await page.goto("/lp/cua-cuon-can-tho?utm_source=google&utm_medium=cpc&utm_campaign=cua-cuon");
    const block = page.locator("#nhan-bao-gia");
    await expect(block).toContainText("Ghi số Zalo để nhận báo giá ngay lập tức");
    await block.getByPlaceholder("Số Zalo của anh/chị").fill(phone);
    // The server drops submissions made faster than a human could type.
    await page.waitForTimeout(3200);
    await block.locator('button[type="submit"]').click();

    // Catalog on its way, plus the one setting that can stop it arriving.
    await expect(block.getByRole("status")).toContainText("Đang gửi catalog và báo giá qua Zalo", { timeout: 15_000 });
    await expect(block.getByRole("status")).toContainText("nhận tin nhắn từ người lạ");
    await expect.poll(async () => (await crmReceived()).length).toBe(1);
    const got = await crmReceived<{
      phone: string; sourcePage: string; utm_source: string; utm_campaign: string; catalog: boolean;
    }>();
    expect(got[0].phone).toBe(phone);
    expect(got[0].catalog).toBe(true);
    expect(got[0].sourcePage).toBe("lp_cua-cuon-can-tho");
    expect(got[0].utm_source).toBe("google");
    expect(got[0].utm_campaign).toBe("cua-cuon");
  });

  test("ad pages stay out of the sitemap, and unknown slugs 404", async ({ page, request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).not.toContain("/lp/");
    const res = await page.goto("/lp/khong-ton-tai");
    expect(res?.status()).toBe(404);
  });
});

test.describe("Google Ads landing pages — desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("no floating rail, and the mid-page rows repeat the page's ask", async ({ page }) => {
    await page.goto("/lp/cua-cuon-can-tho");
    await expect(page.locator('[data-track="floating_rail"]')).toHaveCount(0);
    await expect(page.locator('[data-track="lp_steps"]').getByRole("button", { name: "Nhận báo giá ngay" })).toBeVisible();
    await page.goto("/lp/sua-cua-cuon-can-tho");
    await expect(page.locator('[data-track="lp_steps"] a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('[data-track="lp_steps"] button')).toHaveCount(0);
  });

  test("'Nhận báo giá ngay' mid-page opens the Zalo form in place, field focused", async ({ page }) => {
    await page.goto("/lp/cua-keo-can-tho");
    await page.locator('[data-track="lp_steps"]').getByRole("button", { name: "Nhận báo giá ngay" }).click();
    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(sheet).toContainText("Ghi số Zalo để nhận báo giá ngay lập tức");
    await expect(sheet).toContainText("đánh giá Google");
    await expect(sheet.getByPlaceholder("Số Zalo của anh/chị")).toBeFocused();
    await expect(sheet).toBeInViewport({ ratio: 1 });
  });
});

// The site's own landing pages (organic search) got the same treatment on 12/11/2026:
// the Zalo card is the first form on the page, inside the hero, and the HTP DOOR logo
// is in the navbar. The repair page stays call-first, like /lp/sua-cua-cuon-can-tho.
test.describe("Site landing pages", () => {
  test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

  const WITH_CARD = [
    "/cua-cuon-can-tho",
    "/cua-keo-can-tho",
    "/cua-nhom-kinh-can-tho",
    "/cua-cuon-ninh-kieu",
    "/lap-dat-cua-cuon-can-tho",
    "/phu-kien-cua-cuon-can-tho",
    "/bang-gia-cua-keo-can-tho",
    "/bao-gia-cua-cuon-can-tho",
  ];
  for (const path of WITH_CARD) {
    test(`${path}: the Zalo card is in the hero, and the new logo is in the navbar`, async ({ page }) => {
      await page.goto(path);
      const hero = page.locator("section", { has: page.locator("h1") }).first();
      await expect(hero.locator('[data-track="hero_form"] form')).toHaveCount(1);
      await expect(hero).toContainText("Ghi số Zalo để nhận báo giá ngay lập tức");
      await expect(page.locator('img[src*="logo-htp-door"]').first()).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Gửi số là đồng ý");
    });
  }

  test("past the hero card, the Zalo field bar takes over from the call bar", async ({ page }) => {
    await page.goto("/cua-cuon-can-tho");
    const callBar = page.locator('[data-track="sticky_bar"]');
    const zaloBar = page.locator('[data-track="sticky_zalo"]');
    await expect(callBar).toBeVisible();
    await expect(zaloBar).toHaveAttribute("aria-hidden", "true");

    await page.evaluate(() => {
      const card = document.querySelector("[data-zalo-card]")!;
      window.scrollTo(0, card.getBoundingClientRect().bottom + window.scrollY + 200);
    });
    await expect(zaloBar).not.toHaveAttribute("aria-hidden", "true");
    await expect(zaloBar.getByPlaceholder("Số Zalo anh/chị")).toBeInViewport();
    await expect(zaloBar.locator('a[href^="tel:"]')).toBeInViewport();
    await expect(callBar).toBeHidden();

    // Back up to the card: the bar gets out of the way again.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(zaloBar).toHaveAttribute("aria-hidden", "true");
    await expect(callBar).toBeVisible();
  });

  test("the repair page stays call-first: no form in its hero", async ({ page }) => {
    await page.goto("/sua-chua-cua-cuon-can-tho");
    const hero = page.locator("section", { has: page.locator("h1") }).first();
    await expect(hero.locator("form")).toHaveCount(0);
    await expect(hero.locator('a[href^="tel:"]').first()).toBeVisible();
  });
});
