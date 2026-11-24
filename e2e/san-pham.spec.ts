import { expect, test } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";
import { CUA_KEO, MOTOR, NAN_DUC, NHOM_KINH, SONG_NGANG, TAM_LIEN, TOLE_THEM } from "../lib/bang-gia-data";
import { SAN_PHAM_KINH } from "../lib/nhom-kinh-gallery";
import { PRODUCT_CATEGORIES, SITE, WARRANTY_TERMS } from "../lib/site-data";

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

  // The old site's six glass category pages (24/11/2026): a heading and the products, no copy.
  // On a computer each line is one row of four; "Xem thêm" brings the rest.
  test("shows the old site's glass lines as product rows with clean names", async ({ page }) => {
    for (const line of SAN_PHAM_KINH) {
      const block = page.locator(`[id="${line.id}"]`);
      const cards = block.getByRole("button", { name: /^Xem ảnh lớn:/ });
      await expect(block.getByRole("heading", { level: 2 })).toHaveText(line.name);
      await expect(cards).toHaveCount(4);
      await block.getByRole("button", { name: `Xem thêm ${line.items.length - 4} mẫu` }).click();
      await expect(cards).toHaveCount(line.items.length);
      await expect(cards.nth(4)).toBeFocused();
    }
    // The old names' SEO add-ons stay off: "Thi công … tại <quận>", Cần Thơ, districts.
    for (const { label } of SAN_PHAM_KINH.flatMap((l) => l.items)) {
      expect(label).not.toMatch(
        /thi công| tại |cần thơ|cái răng|bình thủy|ninh kiều|ô môn|phong điền|vĩnh thạnh|thốt nốt|cờ đỏ|hiện đại|cao cấp/i
      );
    }
  });
});

// 24/11/2026 (Hughie: "too large and mobile unfriendly"): the glass lines were full 2-across
// grids, 18 screens on a phone. Now every line is one swipe row, and the hero lists all nine.
test.describe("/san-pham on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("each line is one swipe row, and the hero's jump list reaches all nine", async ({ page }) => {
    await page.goto("/san-pham");
    for (const line of SAN_PHAM_KINH) {
      const block = page.locator(`[id="${line.id}"]`);
      const tops = await block.locator("li").evaluateAll((lis) => lis.map((li) => Math.round(li.getBoundingClientRect().top)));
      expect(tops, line.id).toHaveLength(line.items.length);
      expect(new Set(tops).size, `${line.id}: one row`).toBe(1);
      await expect(block.getByRole("button", { name: /^Xem thêm/ })).toBeHidden();
    }
    const jumps = page.getByRole("navigation", { name: "Các dòng sản phẩm" }).getByRole("link");
    await expect(jumps).toHaveCount(9); // cửa cuốn, cửa kéo, motor + the six glass lines
    for (const href of await jumps.evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
      await expect(page.locator(`[id="${href.slice(1)}"]`), href).toHaveCount(1);
    }
  });
});

// The Sản Phẩm menu sends lan can to its photos on /san-pham; the homepage must too (24/11/2026).
test("the homepage's lan can links open the lan can photos on /san-pham", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  for (const name of ["Lan can kính", "Xem Lan Can – Cầu Thang Kính"]) {
    await expect(main.getByRole("link", { name, exact: true })).toHaveAttribute("href", "/san-pham#lan-can-cau-thang");
  }
  await expect(main.locator('a[href="/lan-can-nhom-kinh-can-tho"]')).toHaveCount(0);
});

test("a glass product on /san-pham asks its price, and the lead names it", async ({ page }) => {
  await resetCrm("ok");
  const run = (Date.now() + 29) % 100000;
  const phone = `097${String(run).padStart(7, "0")}`;
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `10.204.${run % 250}.${(run >> 8) % 250}` });
  await page.goto("/san-pham");

  const line = SAN_PHAM_KINH.find((l) => l.id === "phong-tam-kinh")!;
  const item = line.items[2];
  await page.locator(`[id="${line.id}"]`).getByRole("button", { name: `Xem ảnh lớn: ${item.label}` }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText(item.label);
  await dialog.getByPlaceholder("Số Zalo của anh/chị").fill(phone);
  // The server drops submissions made faster than a human could type.
  await page.waitForTimeout(3200);
  await dialog.getByRole("button", { name: "Hỏi giá mẫu này" }).click();
  await expect.poll(async () => (await crmReceived()).length).toBe(1);
  const [lead] = await crmReceived<{ phone: string; need: string; sourcePage: string }>();
  expect(lead.phone).toBe(phone);
  expect(lead.need).toContain(`Hỏi giá mẫu: ${item.label} · ảnh ${item.src}`);
  expect(lead.sourcePage).toBe(`Trang sản phẩm · ${line.name}`);
});

// The "từ" prices in site-data.ts are typed by hand (site-data reaches client bundles, so it
// must not import the price data). Check them against the catalog export instead.
test("each family's 'từ' price is the catalog's lowest price", () => {
  const low = (xs: (number | null)[]) => Math.min(...xs.filter((x): x is number => x !== null));
  const fmt = (n: number) => n.toLocaleString("de-DE");
  const nhomKinh = NHOM_KINH.filter((g) => g.group !== "Lan can cầu thang");
  const lanCan = NHOM_KINH.filter((g) => g.group === "Lan can cầu thang");
  const floors: Record<string, string> = {
    "cua-cuon": `từ ${fmt(
      low([
        ...NAN_DUC.map((n) => n.gia),
        ...TAM_LIEN.flatMap((g) => g.rows.map((r) => r.gia)),
        ...TOLE_THEM.flatMap((g) => g.rows.map((r) => r.gia)),
        ...SONG_NGANG.flatMap((g) => g.rows.map((r) => r.gia)),
      ])
    )}đ/m²`,
    "cua-keo": `từ ${fmt(low(CUA_KEO.flatMap((r) => [r.coLa, r.khongLa])))}đ/m²`,
    "cua-nhom-kinh": `từ ${fmt(low(nhomKinh.flatMap((g) => g.rows.map((r) => r.gia))))}đ/m²`,
    "lan-can-cau-thang": `từ ${fmt(low(lanCan.flatMap((g) => g.rows.map((r) => r.gia))))}đ/m²`,
    "motor-binh-luu-dien": `từ ${fmt(low(MOTOR.map((m) => m.gia)))}đ/bộ`,
  };
  for (const cat of PRODUCT_CATEGORIES) {
    expect(cat.priceFrom, cat.id).toBe(floors[cat.id]);
  }
});

// The four pages under Sản Phẩm, brought in line on 16/11/2026.
test.describe("Sản Phẩm pages", () => {
  // warranty: the terms the page must state; null = the manufacturer phrase; false = no warranty
  // text at all. Since 24/11/2026 cửa cuốn and cửa kéo are the hero + product grid only (Hughie):
  // the district block that named the service area and the FAQ that gave the warranty are gone.
  const PAGES = [
    { path: "/cua-cuon-can-tho", mienTay: false, warranty: false as const },
    { path: "/cua-keo-can-tho", mienTay: false, warranty: false as const },
    { path: "/cua-nhom-kinh-can-tho", mienTay: true, warranty: null },
    // Phụ kiện is fitted on site, same day, in Cần Thơ: no miền Tây promise there.
    { path: "/phu-kien-cua-cuon-can-tho", mienTay: false, warranty: WARRANTY_TERMS.motorPhuKien },
  ];
  for (const p of PAGES) {
    test(`${p.path}: phone hours, service area and warranty follow the 14/11 decisions`, async ({ page }) => {
      await page.goto(p.path);
      const hero = page.locator("section", { has: page.locator("h1") }).first();
      const main = page.locator("main");
      // Hours beside a call button are when the phones are answered; the shop's opening
      // hours (SITE.workingHours) stay in the footer, outside <main>.
      await expect(hero).toContainText(`Nghe máy ${SITE.phoneHours}`);
      await expect(main).not.toContainText(SITE.workingHours);

      if (p.mienTay) await expect(main).toContainText(SITE.serviceArea);
      // "Miễn phí" measuring is only ever promised inside Cần Thơ.
      await expect(main).not.toContainText(/khảo sát miễn phí(?!.{0,40}cần thơ)/i);
      if (p.warranty) await expect(main).toContainText(p.warranty);
      else if (p.warranty === null) await expect(main).toContainText("theo kỳ hạn tiêu chuẩn của nhà sản xuất");
      else await expect(main).not.toContainText(/bảo hành/i);
    });
  }

  // The offer line and the form's hours note made the hero taller; on a phone the Zalo button
  // must still end above the fixed call / Zalo / map bar (390×844, CLAUDE.md's phone check).
  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    for (const path of ["/san-pham", ...PAGES.map((p) => p.path)]) {
      test(`${path}: the Zalo button is on the first screen, above the bottom bar`, async ({ page }) => {
        await page.goto(path);
        const button = (await page.locator("[data-zalo-card] button[type=submit]").first().boundingBox())!;
        const bar = (await page.locator('[data-track="sticky_bar"]').boundingBox())!;
        expect(button.y + button.height).toBeLessThanOrEqual(bar.y);
      });
    }
  });
});
