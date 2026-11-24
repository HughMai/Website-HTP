import { expect, test, type Locator } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";
import { NK_GALLERY } from "../lib/nhom-kinh-gallery";

/*
 * The cửa nhôm kính design grid on /cua-nhom-kinh-can-tho (lib/nhom-kinh-gallery.ts): one named
 * card per design, laid out like his old site's category page, designs only (no job photos), and
 * a lightbox that asks for that design's price, so the lead tells the family which door the
 * customer meant.
 */

const PHONE = { width: 360, height: 740 };

/** The top edge of every card, to read the grid's rows. */
const tops = (cards: Locator) => cards.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));

test.describe("Cửa nhôm kính design grid", () => {
  test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

  test("sits under the hero as one named card per design, two to a row on a phone", async ({ page }) => {
    await page.goto("/cua-nhom-kinh-can-tho");
    const gallery = page.locator("#thu-vien-mau");
    const systems = page.getByRole("heading", { name: "Hệ Cửa Nhôm Kính Thi Công Tại Cần Thơ" });
    expect((await gallery.boundingBox())!.y).toBeLessThan((await systems.boundingBox())!.y);

    const cards = gallery.getByRole("button", { name: /^Xem ảnh lớn:/ });
    await expect(cards).toHaveCount(NK_GALLERY.length);
    for (const item of NK_GALLERY) {
      const card = gallery.getByRole("button", { name: `Xem ảnh lớn: ${item.label}` });
      await expect(card).toContainText(item.label);
      await expect(card).toContainText("Hỏi giá qua Zalo");
    }
    const t = await tops(cards);
    expect(t[1]).toBe(t[0]);
    expect(t[2]).toBeGreaterThan(t[0]);

    // Designs only: the real jobs are under /cong-trinh, linked below the grid.
    expect(NK_GALLERY.every((i) => i.src.startsWith("/thu-vien-nhom-kinh/"))).toBe(true);
    await expect(gallery.getByRole("link", { name: /công trình đã thi công/ })).toHaveAttribute("href", "/cong-trinh");
  });

  test("a design's lightbox asks for that design's price, and the lead names it", async ({ page }) => {
    await resetCrm("ok");
    const run = (Date.now() + 13) % 100000;
    const phone = `098${String(run).padStart(7, "0")}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.203.${run % 250}.${(run >> 8) % 250}` });
    await page.goto("/cua-nhom-kinh-can-tho");

    const target = NK_GALLERY.find((i) => i.label === "Cửa đi mở quay nhôm Xingfa 4 cánh")!;
    const next = NK_GALLERY[NK_GALLERY.indexOf(target) + 1];
    await page.getByRole("button", { name: `Xem ảnh lớn: ${target.label}` }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Hỏi giá mẫu này qua Zalo");
    await expect(dialog).toContainText(target.label);

    // The field and the button fit the phone's first screen, under the photo.
    const button = dialog.getByRole("button", { name: "Hỏi giá mẫu này" });
    const box = (await button.boundingBox())!;
    expect(box.y + box.height).toBeLessThanOrEqual(PHONE.height);

    // Arrow keys walk the designs, but not while typing the number.
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText(next.label);
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toContainText(target.label);
    const field = dialog.getByPlaceholder("Số Zalo của anh/chị");
    await field.fill(phone);
    await field.press("ArrowLeft");
    await expect(dialog).toContainText(target.label);

    // The server drops submissions made faster than a human could type.
    await page.waitForTimeout(3200);
    await button.click();
    await expect.poll(async () => (await crmReceived()).length).toBe(1);
    const [lead] = await crmReceived<{ phone: string; need: string; sourcePage: string; catalog: boolean }>();
    expect(lead.phone).toBe(phone);
    expect(lead.need).toContain(`Hỏi giá mẫu: ${target.label}`);
    expect(lead.sourcePage).toBe("Cửa nhôm kính · thư viện mẫu");
    expect(lead.catalog).toBe(true);
  });

  test.describe("on a desktop", () => {
    test.use({ viewport: { width: 1280, height: 900 }, isMobile: false, hasTouch: false });

    test("lays the designs out four to a row", async ({ page }) => {
      await page.goto("/cua-nhom-kinh-can-tho");
      const cards = page.locator("#thu-vien-mau").getByRole("button", { name: /^Xem ảnh lớn:/ });
      await expect(cards).toHaveCount(NK_GALLERY.length);
      const t = await tops(cards);
      expect(new Set(t.slice(0, 4)).size).toBe(1);
      expect(t[4]).toBeGreaterThan(t[0]);
      expect(new Set(t.slice(4, 8)).size).toBe(1);
    });
  });
});
