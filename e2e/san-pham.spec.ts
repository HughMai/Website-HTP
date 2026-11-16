import { expect, test } from "@playwright/test";
import { PRODUCT_CATEGORIES, SITE } from "../lib/site-data";

/**
 * /san-pham after the 10–14/11/2026 changes: one "từ" price per product family (row prices
 * go out by Zalo, 13/11), the 30-minute Zalo form, cọc 30% and pay-after-install, the miền
 * Tây service area (14/11), and the 10/11 catalog's cửa cuốn lines.
 */
test.describe("/san-pham", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/san-pham");
  });

  test("the hero carries the Zalo form with the 30-minute total and the offer", async ({ page }) => {
    const card = page.locator("[data-zalo-card]").first();
    await expect(card.getByRole("heading", { name: /30 phút có giá trọn gói/ })).toBeVisible();
    await expect(card.getByRole("button", { name: "Nhận giá trọn gói" })).toBeVisible();
    await expect(card).toContainText(SITE.phoneHours);

    const hero = page.locator("main section").first();
    await expect(hero).toContainText("Chỉ cọc 30%");
    await expect(hero).toContainText(SITE.serviceArea);
  });

  test("every product family shows its starting price, and no other figure", async ({ page }) => {
    const main = page.locator("main");
    for (const cat of PRODUCT_CATEGORIES) {
      await expect(main.getByText(cat.priceFrom, { exact: true })).toBeVisible();
    }
    // Price gate: any amount in đồng on the page must be a "từ" anchor.
    const text = await main.innerText();
    const amounts = [...text.matchAll(/(\S+\s+)?\d{1,3}(?:\.\d{3})+\s?đ/g)];
    const bare = amounts.filter((m) => !/^từ\s/i.test(m[1] ?? "")).map((m) => m[0]);
    expect(bare, "every price on /san-pham is a starting price").toEqual([]);
  });

  test("lists the 10/11 catalog lines and none of the pre-gate copy", async ({ page }) => {
    for (const line of ["Cửa Cuốn Công Nghệ Úc", "Cửa Cuốn Tole Siêu Trường"]) {
      await expect(page.getByRole("link", { name: line, exact: true })).toBeVisible();
    }
    await expect(page.locator("main")).not.toContainText("giá tham khảo theo m²");

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toContain("miền Tây");
    expect(description).not.toMatch(/khảo sát miễn phí|giá tham khảo/i);
  });
});
