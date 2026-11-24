import { expect, test } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";
import { NK_FILTERS, NK_GALLERY } from "../lib/nhom-kinh-gallery";

/*
 * The cửa nhôm kính gallery on /cua-nhom-kinh-can-tho (lib/nhom-kinh-gallery.ts): filters by
 * where the door goes, honest labels, and a lightbox that asks for that photo's price, so the
 * lead tells the family which door the customer meant. On a 360×740 phone.
 */

const PHONE = { width: 360, height: 740 };

test.describe("Cửa nhôm kính gallery", () => {
  test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

  test("sits under the hero, filters by door type, and never labels a catalog photo as a job", async ({ page }) => {
    await page.goto("/cua-nhom-kinh-can-tho");
    const gallery = page.locator("#thu-vien-mau");
    const systems = page.getByRole("heading", { name: "Hệ Cửa Nhôm Kính Thi Công Tại Cần Thơ" });
    expect((await gallery.boundingBox())!.y).toBeLessThan((await systems.boundingBox())!.y);

    const tiles = gallery.getByRole("button", { name: /^Xem ảnh lớn:/ });
    await expect(gallery.getByRole("button", { name: "Tất cả" })).toHaveAttribute("aria-pressed", "true");
    await expect(tiles).toHaveCount(NK_GALLERY.length);
    for (const f of NK_FILTERS) {
      await gallery.getByRole("button", { name: f, exact: true }).click();
      await expect(tiles, f).toHaveCount(NK_GALLERY.filter((i) => i.kind === f).length);
    }
    await gallery.getByRole("button", { name: "Tất cả" }).click();

    // The old Xingfa page's product photos say "Mẫu", HTP's jobs "Công trình thật".
    for (const item of NK_GALLERY) {
      const tile = gallery.getByRole("button", { name: `Xem ảnh lớn: ${item.code} · ${item.label}` });
      await expect(tile).toContainText(item.badge === "mau" ? "Mẫu" : "Công trình thật");
      expect(item.badge === "mau", `${item.code}`).toBe(item.code!.startsWith("X"));
    }
  });

  test("a photo's lightbox asks for that photo's price, and the lead names its code", async ({ page }) => {
    await resetCrm("ok");
    const run = (Date.now() + 13) % 100000;
    const phone = `098${String(run).padStart(7, "0")}`;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.203.${run % 250}.${(run >> 8) % 250}` });
    await page.goto("/cua-nhom-kinh-can-tho");

    const x03 = NK_GALLERY.find((i) => i.code === "X03")!;
    await page.getByRole("button", { name: `Xem ảnh lớn: X03 · ${x03.label}` }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Hỏi giá mẫu X03 qua Zalo");
    await expect(dialog).toContainText("Nhôm hệ Xingfa");

    // The field and the button fit the phone's first screen, under the photo.
    const button = dialog.getByRole("button", { name: "Hỏi giá mẫu này" });
    const box = (await button.boundingBox())!;
    expect(box.y + box.height).toBeLessThanOrEqual(PHONE.height);

    // Arrow keys walk the photos, but not while typing the number.
    await page.keyboard.press("ArrowRight");
    const next = NK_GALLERY[NK_GALLERY.indexOf(x03) + 1];
    await expect(dialog).toContainText(`Hỏi giá mẫu ${next.code} qua Zalo`);
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toContainText("Hỏi giá mẫu X03 qua Zalo");
    const field = dialog.getByPlaceholder("Số Zalo của anh/chị");
    await field.fill(phone);
    await field.press("ArrowLeft");
    await expect(dialog).toContainText("Hỏi giá mẫu X03 qua Zalo");

    // The server drops submissions made faster than a human could type.
    await page.waitForTimeout(3200);
    await button.click();
    await expect.poll(async () => (await crmReceived()).length).toBe(1);
    const [lead] = await crmReceived<{ phone: string; need: string; sourcePage: string; catalog: boolean }>();
    expect(lead.phone).toBe(phone);
    expect(lead.need).toContain(`Hỏi giá mẫu X03: ${x03.label}`);
    expect(lead.sourcePage).toBe("Cửa nhôm kính · thư viện mẫu");
    expect(lead.catalog).toBe(true);
  });
});
