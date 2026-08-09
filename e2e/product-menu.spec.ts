import { expect, test } from "@playwright/test";

const CATEGORIES = ["Cửa Cuốn", "Cửa Kéo", "Nhôm Kính", "Phụ Kiện"];

test.describe("Sản Phẩm menu", () => {
  test("desktop dropdown shows exactly the four categories, with photos", async ({
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

    for (const label of CATEGORIES) {
      await expect(menu.getByRole("link", { name: new RegExp(label) })).toBeVisible();
    }

    // Icons, not photos. Install shots were tried here and read as mush at
    // 64px; icons stay crisp and give all four categories one visual language.
    await expect(menu.locator("svg")).toHaveCount(CATEGORIES.length);
    await expect(menu.locator("img")).toHaveCount(0);
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

    // Still linked in-body from the parent pillar, so they are not orphaned.
    await page.goto("/cua-cuon-can-tho");
    await expect(
      page.locator('a[href="/cua-cuon-nhom-can-tho"]').first()
    ).toBeAttached();
  });

  test("every menu destination returns 200", async ({ page, request }) => {
    const targets = [
      "/cua-cuon-can-tho",
      "/cua-keo-can-tho",
      "/cua-nhom-kinh-can-tho",
      "/phu-kien-cua-cuon-can-tho",
    ];
    for (const t of targets) {
      const res = await request.get(t);
      expect(res.status(), `${t} should return 200`).toBe(200);
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
