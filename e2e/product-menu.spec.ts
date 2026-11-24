import { expect, test } from "@playwright/test";
import { MAIN_NAV } from "../lib/site-data";

// The five glass lines joined the menu on 24/11/2026 (Hughie), a 3×3 grid.
const CATEGORIES = [
  "Cửa Cuốn",
  "Cửa Kéo",
  "Nhôm Kính",
  "Tủ Nhôm Kính",
  "Lan Can Cầu Thang Kính",
  "Vách Kính",
  "Cửa Kính Cường Lực",
  "Phòng Tắm Kính",
  "Phụ Kiện",
];

const PRODUCT_LINKS = MAIN_NAV.find((i) => i.label === "Sản Phẩm")!.children!.map((c) => c.href);

test.describe("Sản Phẩm menu", () => {
  test("desktop dropdown shows exactly the nine product lines, with icons, three to a row", async ({
    page,
  }) => {
    await page.goto("/");

    // Both the desktop nav and the mobile sheet render a Sản Phẩm link, so
    // scope to the desktop nav by its aria-label.
    const desktopNav = page.getByRole("navigation", { name: "Liên kết điều hướng" });
    const trigger = desktopNav.getByRole("link", { name: "Sản Phẩm", exact: true });
    await trigger.hover();

    const menu = desktopNav.locator("ul").filter({ hasText: "Cửa Cuốn" }).first();
    await expect(menu).toBeVisible();

    const links = menu.locator("a");
    await expect(links).toHaveCount(CATEGORIES.length);

    // Anchored: "Nhôm Kính" must not also match "Tủ Nhôm Kính".
    for (const label of CATEGORIES) {
      await expect(menu.getByRole("link", { name: new RegExp(`^${label}`) })).toBeVisible();
    }

    // Icons, not photos. Install shots were tried here and read as mush at
    // 64px; icons stay crisp and give every line one visual language.
    await expect(menu.locator("svg")).toHaveCount(CATEGORIES.length);
    await expect(menu.locator("img")).toHaveCount(0);

    // Three to a row.
    const tops = await links.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
    expect(tops[1]).toBe(tops[0]);
    expect(tops[2]).toBe(tops[0]);
    expect(tops[3]).toBeGreaterThan(tops[0]);
  });

  test("at 1024px the dropdown still ends inside the window", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/");
    const desktopNav = page.getByRole("navigation", { name: "Liên kết điều hướng" });
    await desktopNav.getByRole("link", { name: "Sản Phẩm", exact: true }).hover();
    const menu = desktopNav.locator("ul").filter({ hasText: "Cửa Cuốn" }).first();
    await expect(menu).toBeVisible();
    const box = (await menu.boundingBox())!;
    expect(box.x + box.width).toBeLessThanOrEqual(1024);
  });

  test("the demoted variant pages are gone from the menu but still reachable", async ({
    page,
  }) => {
    await page.goto("/");
    // Both the desktop nav and the mobile sheet render a Sản Phẩm link, so
    // scope to the desktop nav by its aria-label.
    const desktopNav = page.getByRole("navigation", { name: "Liên kết điều hướng" });
    const trigger = desktopNav.getByRole("link", { name: "Sản Phẩm", exact: true });
    await trigger.hover();

    const menu = desktopNav.locator("ul").filter({ hasText: "Cửa Cuốn" }).first();
    for (const gone of ["Cửa Cuốn Nhôm", "Cửa Kéo Thép", "Lan Can Nhôm Kính"]) {
      await expect(menu.getByRole("link", { name: gone, exact: true })).toHaveCount(0);
    }

    // Still linked from the footer on every page, so they are not orphaned.
    await page.goto("/cua-cuon-can-tho");
    await expect(
      page.locator('a[href="/cua-cuon-nhom-can-tho"]').first()
    ).toBeAttached();
  });

  test("every menu destination returns 200", async ({ page, request }) => {
    for (const t of new Set(PRODUCT_LINKS.map((h) => h.split("#")[0]))) {
      const res = await request.get(t);
      expect(res.status(), `${t} should return 200`).toBe(200);
    }
    // The glass lines land on their block of /san-pham.
    await page.goto("/san-pham");
    for (const href of PRODUCT_LINKS.filter((h) => h.includes("#"))) {
      await expect(page.locator(`#${href.split("#")[1]}`), href).toBeAttached();
    }
    // And the new page is a real page, not a stub.
    await page.goto("/phu-kien-cua-cuon-can-tho");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Phụ Kiện");
  });
});

test.describe("Product photo lightbox", () => {
  test("opens a larger sample, walks with arrows, closes with Escape", async ({
    page,
  }) => {
    await page.goto("/cua-cuon-can-tho");

    const firstTile = page.getByRole("button", { name: /^Xem ảnh lớn:/ }).first();
    await firstTile.scrollIntoViewIfNeeded();
    await expect(firstTile).toBeVisible();

    await firstTile.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img").first()).toBeVisible();

    // Counter should move when stepping forward.
    const counterBefore = await dialog.getByText(/\d+\/\d+/).textContent();
    await page.getByRole("button", { name: "Ảnh kế tiếp" }).click();
    const counterAfter = await dialog.getByText(/\d+\/\d+/).textContent();
    expect(counterAfter).not.toBe(counterBefore);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("photo sections render on all three product pages", async ({ page }) => {
    for (const route of [
      "/cua-cuon-can-tho",
      "/cua-keo-can-tho",
      "/cua-nhom-kinh-can-tho",
    ]) {
      await page.goto(route);
      const tiles = page.getByRole("button", { name: /^Xem ảnh lớn:/ });
      expect(await tiles.count(), `${route} has product photos`).toBeGreaterThan(0);
    }
  });
});
