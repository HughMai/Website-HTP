import { expect, test } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";
import { CUA_CUON_GALLERY, CUA_KEO_GALLERY } from "../lib/cua-cuon-keo-gallery";
import { NAN_DUC } from "../lib/bang-gia-data";

/*
 * /cua-cuon-can-tho and /cua-keo-can-tho since 24/11/2026 (Hughie: "keep the sản phẩm page
 * clean … header, images of product, then end"): the hero, one product grid laid out like his
 * old site's category page, then the footer. Cửa cuốn = the old site's three pages plus the
 * catalog's nan Đức. Content: lib/cua-cuon-keo-gallery.ts.
 */

const PAGES = [
  { path: "/cua-cuon-can-tho", grid: "#mau-cua-cuon", items: CUA_CUON_GALLERY },
  { path: "/cua-keo-can-tho", grid: "#mau-cua-keo", items: CUA_KEO_GALLERY },
];

test.describe("Cửa cuốn and cửa kéo product grids", () => {
  for (const { path, grid, items } of PAGES) {
    test(`${path} is the hero, the product grid, then the footer`, async ({ page }) => {
      await page.goto(path);
      const sections = page.locator("main > section");
      await expect(sections).toHaveCount(2);
      await expect(sections.nth(1)).toHaveAttribute("id", grid.slice(1));

      const cards = page.locator(grid).getByRole("button", { name: /^Xem ảnh lớn:/ });
      await expect(cards).toHaveCount(items.length);
      for (const item of [items[0], items[items.length - 1]]) {
        const card = cards.filter({ hasText: item.label }).first();
        await expect(card).toContainText("Hỏi giá qua Zalo");
      }

      // The FAQ went, so its FAQPage schema must go too.
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(ld.join("")).not.toContain("FAQPage");
    });
  }

  test("every product photo is served", async ({ request }) => {
    for (const { src } of [...CUA_CUON_GALLERY, ...CUA_KEO_GALLERY]) {
      const res = await request.get(src);
      expect(res.status(), src).toBe(200);
      expect(res.headers()["content-type"], src).toMatch(/^image\//);
    }
  });

  test("cửa cuốn ends with the catalog's nan Đức, shown whole", async ({ page }) => {
    // The old site's 36 products first, then the catalog, in its order.
    const catalog = CUA_CUON_GALLERY.slice(-NAN_DUC.length);
    expect(catalog.map((i) => i.src)).toEqual(NAN_DUC.map((n) => n.goc));
    expect(CUA_CUON_GALLERY.length).toBe(36 + NAN_DUC.length);

    await page.goto("/cua-cuon-can-tho");
    const last = page.getByRole("button", { name: `Xem ảnh lớn: ${catalog[catalog.length - 1].label}` });
    await expect(last.locator("img")).toHaveClass(/object-contain/);
  });

  test("a cửa kéo card's lead names the product and the page", async ({ page }) => {
    await resetCrm("ok");
    const run = (Date.now() + 29) % 100000;
    const phone = `098${String(run).padStart(7, "0")}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.204.${run % 250}.${(run >> 8) % 250}` });
    await page.goto("/cua-keo-can-tho");

    const target = CUA_KEO_GALLERY[5];
    await page.getByRole("button", { name: `Xem ảnh lớn: ${target.label}` }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText(target.label);
    await dialog.getByPlaceholder("Số Zalo của anh/chị").fill(phone);

    // The server drops submissions made faster than a human could type.
    await page.waitForTimeout(3200);
    await dialog.getByRole("button", { name: "Hỏi giá mẫu này" }).click();
    await expect.poll(async () => (await crmReceived()).length).toBe(1);
    const [lead] = await crmReceived<{ phone: string; need: string; sourcePage: string }>();
    expect(lead.phone).toBe(phone);
    expect(lead.need).toContain(`Hỏi giá mẫu: ${target.label}`);
    // The CRM picks the Zalo catalog from this ("cua keo" → catalog-htp-cua-keo.pdf).
    expect(lead.sourcePage).toBe("Cửa kéo Cần Thơ · thư viện mẫu");
  });
});
