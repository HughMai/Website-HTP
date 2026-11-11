import { expect, test, type Locator, type Page } from "@playwright/test";
import { crmReceived, resetCrm } from "./crm-mock";

const VALID = { name: "Nguyễn Văn A", phone: "0901234567" };

// The server rejects submissions faster than this; tests must look human.
const HUMAN_MS = 3000;
const humanTimestamp = () => Date.now() - HUMAN_MS;

// The route remembers recent leads per IP and per phone, so each test is a
// fresh visitor — otherwise one test throttles the next. runId keeps a rerun
// against a reused server from colliding with the last run's visitors.
const runId = Date.now() % 65536;
let seq = 0;
function visitor() {
  seq++;
  return {
    phone: `09${String(runId).padStart(5, "0")}${String(seq).padStart(3, "0")}`,
    headers: { "x-forwarded-for": `10.${runId >> 8}.${runId & 255}.${seq}` },
  };
}

test.describe("POST /api/contact — server behaviour", () => {
  test.beforeEach(async () => {
    await resetCrm("ok");
  });

  test("rejects a malformed phone number with 400", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...VALID, phone: "12345", renderedAt: humanTimestamp() },
    });
    expect(res.status()).toBe(400);
    expect(await crmReceived()).toHaveLength(0);
  });

  test("rejects a missing name with 400", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "", phone: VALID.phone, renderedAt: humanTimestamp() },
    });
    expect(res.status()).toBe(400);
  });

  test("REGRESSION: the CRM receives a populated need and sourcePage", async ({
    request,
  }) => {
    // QuoteEstimator was deleted, and the CRM forward kept building `need` and
    // `size` from the estimate — so every lead arrived with empty strings.
    const v = visitor();
    const res = await request.post("/api/contact", {
      headers: v.headers,
      data: {
        name: VALID.name,
        phone: v.phone,
        message: "Cần báo giá cửa cuốn 4m",
        source: "Hero trang chủ",
        renderedAt: humanTimestamp(),
      },
    });
    expect(res.ok()).toBe(true);
    // `delivered` is what tells the browser to fire the ad conversion.
    expect(await res.json()).toEqual({ ok: true, delivered: 1 });

    const got = await crmReceived<{
      name: string;
      phone: string;
      need: string;
      sourcePage: string;
    }>();
    expect(got).toHaveLength(1);
    expect(got[0].name).toBe(VALID.name);
    expect(got[0].phone).toBe(v.phone);
    expect(got[0].need).toBe("Cần báo giá cửa cuốn 4m");
    expect(got[0].need).not.toBe("");
    expect(got[0].sourcePage).toBe("Hero trang chủ");
  });

  test("answers 502 when every channel fails", async ({ request }) => {
    // Telegram and Resend are unconfigured by the test env, so making the CRM
    // fail leaves nothing that could have received the lead.
    await resetCrm("fail");
    const v = visitor();
    const lead = { name: VALID.name, phone: v.phone, renderedAt: humanTimestamp() };
    const res = await request.post("/api/contact", { headers: v.headers, data: lead });
    expect(res.status()).toBe(502);

    // Nothing received it, so it must not count against the customer: the
    // retry after the outage goes through instead of being dropped as a repeat.
    await resetCrm("ok");
    const retry = await request.post("/api/contact", { headers: v.headers, data: lead });
    expect(await retry.json()).toEqual({ ok: true, delivered: 1 });
  });

  test("silently drops a honeypot submission without notifying anyone", async ({
    request,
  }) => {
    const v = visitor();
    const res = await request.post("/api/contact", {
      headers: v.headers,
      data: {
        name: VALID.name,
        phone: v.phone,
        website: "http://spam.example",
        renderedAt: humanTimestamp(),
      },
    });
    // 200 so a bot learns nothing, but nothing is forwarded.
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(await crmReceived()).toHaveLength(0);
  });

  test("silently drops a submission that arrives implausibly fast", async ({
    request,
  }) => {
    const v = visitor();
    const res = await request.post("/api/contact", {
      headers: v.headers,
      data: { name: VALID.name, phone: v.phone, renderedAt: Date.now() },
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(await crmReceived()).toHaveLength(0);
  });

  test("REGRESSION: silently drops a direct POST with no renderedAt", async ({
    request,
  }) => {
    // The timing gate used to be skipped entirely when renderedAt was absent,
    // which is exactly what a script posting {name, phone} sends.
    const v = visitor();
    const res = await request.post("/api/contact", {
      headers: v.headers,
      data: { name: VALID.name, phone: v.phone },
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(await crmReceived()).toHaveLength(0);
  });

  test("drops an exact re-send of the same phone, but not a follow-up note", async ({
    request,
  }) => {
    const first = visitor();
    const second = visitor(); // a different IP, so only the phone matches
    const send = (headers: Record<string, string>, message?: string) =>
      request.post("/api/contact", {
        headers,
        data: { name: VALID.name, phone: first.phone, message, renderedAt: humanTimestamp() },
      });

    expect(await (await send(first.headers)).json()).toEqual({ ok: true, delivered: 1 });
    // Same phone, same (empty) message: someone re-sending a number.
    expect(await (await send(second.headers)).json()).toEqual({ ok: true });
    expect(await crmReceived()).toHaveLength(1);

    // The customer scrolls down and adds what they need — that must arrive.
    const note = await send(second.headers, "Cửa cuốn mặt tiền 4m");
    expect(await note.json()).toEqual({ ok: true, delivered: 1 });
    expect(await crmReceived()).toHaveLength(2);
  });

  test("drops the 4th lead from one IP within the hour", async ({ request }) => {
    const ip = visitor().headers;
    const send = () =>
      request.post("/api/contact", {
        headers: ip,
        data: { name: VALID.name, phone: visitor().phone, renderedAt: humanTimestamp() },
      });

    for (let i = 0; i < 3; i++) {
      expect(await (await send()).json()).toEqual({ ok: true, delivered: 1 });
    }
    expect(await (await send()).json()).toEqual({ ok: true });
    expect(await crmReceived()).toHaveLength(3);
  });
});

test.describe("Lead forms — every form on the site behaves the same", () => {
  test.beforeEach(async () => {
    await resetCrm("ok");
  });

  /**
   * The homepage renders THREE LeadForms (hero plus two CTA bands), so every
   * assertion has to be scoped to one of them. `section` is the container that
   * survives submission — on success the <form> is replaced by the
   * confirmation panel, so scoping to the form itself would go stale.
   */
  async function fillAndSubmit(section: Locator) {
    const form = section.locator("form").first();
    await form.getByPlaceholder("Họ và tên").fill(VALID.name);
    await form.getByPlaceholder("Số điện thoại").fill(VALID.phone);
    await form.locator('button[type="submit"]').click();
  }

  test("REGRESSION: the honeypot is invisible and never overlaps a real field", async ({
    page,
  }) => {
    // This shipped broken: hooks/ was missing from the Tailwind content globs,
    // so the honeypot's hiding classes were never generated and it rendered on
    // top of the name input. Asserting presence and roles was not enough —
    // this asserts geometry.
    await page.goto("/");

    const honeypot = page.locator('input[name="website"]');
    const count = await honeypot.count();
    expect(count, "every lead form carries a honeypot").toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const field = honeypot.nth(i);
      await expect(field).not.toBeInViewport();

      const box = await field.boundingBox();
      // Either laid out far off-screen, or collapsed to nothing.
      if (box) {
        expect(
          box.x + box.width < 0 || box.y + box.height < 0 || box.width <= 1,
          `honeypot ${i} is on-screen at x=${box.x} y=${box.y} w=${box.width}`
        ).toBe(true);
      }
    }

    // And the visible name field must be genuinely clickable, not covered.
    const nameField = page.locator("#trang-chu").getByPlaceholder("Họ và tên");
    await expect(nameField).toBeVisible();
    await nameField.click();
    await expect(nameField).toBeFocused();
  });

  /** Records gtag calls, standing in for the real tag (absent in tests). */
  async function stubGtag(page: Page) {
    await page.addInitScript(() => {
      const calls: unknown[][] = [];
      Object.assign(window, { __gtagCalls: calls, gtag: (...args: unknown[]) => calls.push(args) });
    });
  }
  const gtagCalls = (page: Page) =>
    page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);

  for (const [label, json, expected] of [
    ["a delivered lead fires the ad conversion", { ok: true, delivered: 1 }, 1],
    // The server's silent spam drops look like success to the sender, but the
    // ad account must not be told a lead arrived.
    ["a silently dropped lead fires no conversion", { ok: true }, 0],
  ] as const) {
    test(label, async ({ page }) => {
      await stubGtag(page);
      await page.goto("/");
      await page.route("**/api/contact", (route) => route.fulfill({ status: 200, json }));

      const hero = page.locator("#trang-chu");
      await page.waitForTimeout(HUMAN_MS);
      await fillAndSubmit(hero);

      await expect(hero.getByText("Đã nhận thông tin của bạn!")).toBeVisible();
      const calls = await gtagCalls(page);
      expect(calls.filter((c) => c[1] === "form_submit")).toHaveLength(expected);
    });
  }

  test("a 403 (failed Turnstile) shows the hotline and Zalo, not a fake thank-you", async ({
    page,
  }) => {
    await page.goto("/");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 403, json: { error: "Chưa xác minh được." } })
    );

    const hero = page.locator("#trang-chu");
    await page.waitForTimeout(HUMAN_MS);
    await fillAndSubmit(hero);

    const alert = hero.getByRole("alert");
    await expect(alert).toContainText("Chưa xác minh được");
    await expect(alert.getByRole("link", { name: /Gọi/ })).toBeVisible();
    await expect(alert.getByRole("link", { name: "Nhắn Zalo" })).toBeVisible();
  });

  test("hero form shows a persistent thank-you that replaces the form", async ({
    page,
  }) => {
    await page.goto("/");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { ok: true, delivered: 1 } })
    );

    const hero = page.locator("#trang-chu");
    // The server rejects submissions faster than MIN_FILL_MS; act like a human.
    await page.waitForTimeout(HUMAN_MS);
    await fillAndSubmit(hero);

    const confirmation = hero.getByText("Đã nhận thông tin của bạn!");
    await expect(confirmation).toBeVisible();

    // The old behaviour was a toast plus a blanked form, which invited the
    // same customer to submit twice. The hero's fields must be gone entirely.
    await expect(hero.getByPlaceholder("Họ và tên")).toHaveCount(0);

    // And it must still be there long after a toast would have expired.
    await page.waitForTimeout(6000);
    await expect(confirmation).toBeVisible();
  });

  test("a dropped connection shows an error and the hotline", async ({ page }) => {
    await page.goto("/");
    await page.route("**/api/contact", (route) => route.abort("failed"));

    const hero = page.locator("#trang-chu");
    await page.waitForTimeout(HUMAN_MS);
    await fillAndSubmit(hero);

    const alert = hero.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("Mất kết nối");
    // An error with no way to reach the business is still a lost lead.
    await expect(alert.getByRole("link", { name: /Gọi/ })).toBeVisible();
  });

  test("a 502 tells the customer the request was not received", async ({ page }) => {
    await page.goto("/");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 502, json: { error: "Không gửi được yêu cầu." } })
    );

    const hero = page.locator("#trang-chu");
    await page.waitForTimeout(HUMAN_MS);
    await fillAndSubmit(hero);

    await expect(hero.getByRole("alert")).toContainText("chưa nhận được");
  });

  test("a double tap sends exactly one lead", async ({ page }) => {
    await page.goto("/");
    let calls = 0;
    await page.route("**/api/contact", async (route) => {
      calls++;
      await new Promise((r) => setTimeout(r, 400));
      await route.fulfill({ status: 200, json: { ok: true, delivered: 1 } });
    });

    const hero = page.locator("#trang-chu");
    await page.waitForTimeout(HUMAN_MS);
    const form = hero.locator("form").first();
    await form.getByPlaceholder("Họ và tên").fill(VALID.name);
    await form.getByPlaceholder("Số điện thoại").fill(VALID.phone);
    await form.locator('button[type="submit"]').click({ clickCount: 2, delay: 30 });

    await expect(hero.getByText("Đã nhận thông tin của bạn!")).toBeVisible();
    expect(calls).toBe(1);
  });

  test("a landing-page form captures leads too", async ({ page }) => {
    await page.goto("/cua-cuon-o-mon");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { ok: true, delivered: 1 } })
    );

    // Landing pages carry exactly one form (the CTA band), so page-level
    // locators are unambiguous here in a way they are not on the homepage.
    await expect(page.locator("form")).toHaveCount(1);
    await page.waitForTimeout(HUMAN_MS);

    const form = page.locator("form").first();
    await form.getByPlaceholder("Họ và tên").fill(VALID.name);
    await form.getByPlaceholder("Số điện thoại").fill(VALID.phone);
    await form.locator('button[type="submit"]').click();

    await expect(page.getByText("Đã nhận thông tin của bạn!")).toBeVisible();
  });
});
