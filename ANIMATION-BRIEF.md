# Hưng Thành Phát Door — animation & motion design brief

Paste this whole file into a fresh Claude session. It is self-contained: it describes the
business, the brand system, every section of the landing page with its real copy, and the
motion direction. The goal is to turn a solid but static page into an animated one that
feels premium and deliberate — **without costing a single lead.**

---

## 1. The business

**Hưng Thành Phát Door** (HTP) — a family-run door manufacturer and installer in Cần Thơ,
Vietnam. Founded 2005, the first company to make and install roller doors (cửa cuốn) in the
city. 21+ years, 500+ installs. Showroom and workshop at 235–237 Võ Văn Kiệt, Bình Thủy.

They sell and install: **cửa cuốn** (roller doors), **cửa nhôm kính** (aluminium-glass doors
and windows), **cửa kéo** (accordion/scissor security gates), **lan can & cầu thang kính**
(glass railings and stairs), and **motor / bình lưu điện** (motors, battery backup, remotes).

**The visitor.** A homeowner or shop owner in Cần Thơ, on a phone, who needs a door and is
price-checking two or three local shops. They are not browsing for pleasure. Mobile is the
majority of traffic. A missed call is a lost job.

**The page's only job:** get that person to call, or leave a name and phone number.
Everything decorative must serve that or get out of the way.

**Language:** all copy is Vietnamese. Keep it exactly as written — it has been tuned. Do not
translate, paraphrase, or "improve" it. Vietnamese diacritics must render correctly.

---

## 2. Non-negotiables

These outrank every aesthetic decision.

1. **Warranty phrasing.** The only permitted wording is
   *"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất."*
   Never state a number of years anywhere, in any form, for any reason.
2. **Never delay the lead form.** The name+phone form sits in the hero. It must be visible
   and interactive within ~1 second of first paint. No intro curtain, no preloader, no
   scroll-jack may sit between a cold visitor and that form. This is the single most common
   way a beautiful site loses money.
3. **Never hide content behind JavaScript.** Every section must be readable with JS disabled
   or still loading. Animate *from* a visible state (e.g. animate `y` and let opacity settle
   fast), never *into* existence from `opacity: 0` with no fallback.
4. **Respect `prefers-reduced-motion`.** Full parity: everything must be reachable and
   readable with all motion off.
5. **All photography is real.** Every image is an actual HTP install in Cần Thơ. The site
   says so out loud ("ảnh thực tế, không phải ảnh mẫu") and cards carry an "Ảnh thực tế"
   badge. Never substitute stock or catalogue imagery.
6. **Phone numbers, address, email** are fixed: hotlines `0945 042 345` (báo giá & tư vấn)
   and `0913 574 077` (kỹ thuật & bảo hành), landline `02923 730 081`, email
   `hungthanhphat6688@gmail.com`, address `235 - 237 (281 Cũ) Võ Văn Kiệt, Bình Thủy, Cần Thơ`.
   Founded **2005**, experience **21+ năm**.

---

## 3. Brand system

### Colour

| Token | Hex | Role |
|---|---|---|
| Navy (brand) | `#0A2540` | Primary. Dark section backgrounds, all headings. |
| Navy deep | `#081E36` → `#020B14` | Gradient stops, footer |
| Navy tint | `#E6EBF1` | Card backgrounds, section tints |
| **Amber** | `#FBBF24` | **The** accent — CTAs, price text, underline rules, active states |
| Amber light | `#FCD34D` | Hover / gradient partner |
| White | `#FFFFFF` | Page and card background, dominant |
| Grey 50 | `#F9FAFB` | Alternating section tint |
| Slate 600 / 400 | `#475569` / `#94A3B8` | Secondary and micro text |

**Amber on navy is the signature pairing.** Do not introduce a third brand hue. Semantic
colours exist (green `#059669` success, red `#EF4343` error, `#0068FF` Zalo blue) but are
never used as decoration.

A note on the competitive landscape: the market leader (Mitadoor) is yellow-and-red. HTP is
navy-and-amber deliberately. **Do not drift toward yellow** — it would make HTP look like a
copy of its own competitor.

### Typography

**One family: Inter.** No secondary face. Six sizes carry the whole site — a seventh is a
smell.

| Level | Size | Weight | Line height |
|---|---|---|---|
| h1 | 60px (mobile 36px) | 600 | 1.08, `tracking-tight`, `text-balance` |
| h2 | 36px | 600 | 1.1 |
| h3 | 16–20px | 600–800 | 1.5 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | — |
| Micro | 12px | 400–600 | uppercase, `tracking-[0.18em]` for eyebrows |

Headings are **semibold (600), not bold**. Section eyebrows are 12px uppercase pills with
wide letter-spacing.

### Shape & depth

- **Pill (`9999px`) is the dominant shape** — CTAs, trust chips, tags, filter buttons.
- Cards `12–16px` radius. Inputs and nav items `10px`.
- Shadows are soft, low-contrast, for card lift only. No hard or coloured shadows.
- One signature shape: **arch-topped image frames** (`border-radius: 9999px 9999px 0 0`)
  with a 2px amber border. They read as a door opening. Used in the hero.

### Layout

Centred container, max `1320px`, `1rem` padding. Generous vertical section padding
(`56px` mobile / `80px` desktop). This reads as a premium trust site, not a dense one.

**Mobile (390×844) is the primary target, not an afterthought.**

---

## 4. Page structure, section by section

Order is fixed. Each block below gives the real copy and the motion intent.

### Fixed chrome

- **Navbar** — fixed top. Transparent over the navy hero, frosted white after 24px of
  scroll. Logo left; centre nav `Trang Chủ · Sản Phẩm ▾ · Công Trình · Bảng Giá ▾ ·
  Dịch Vụ ▾ · Liên Hệ`; amber phone button right (`0945 042 345`). Below `lg` it collapses
  to a hamburger sheet with the full route tree and hotlines pinned to the bottom.
  *Motion:* slide down on load; background/colour cross-fade on scroll; dropdowns fade+rise
  6px over 160ms.
- **Floating rail** (desktop only, bottom-right) — three 52px circles: map (emerald), Zalo
  (blue), phone (red). Each expands rightward on hover to reveal its label.
  *Motion:* slow pulse rings; the phone icon shakes every ~3s. Keep it subtle — it must not
  compete with the page.
- **Sticky action bar** (mobile only, bottom) — three equal cells: `Gọi ngay` / `Chat Zalo` /
  `Báo giá`. Always visible at every scroll depth. **This element converts more than any
  other. It must never animate away, hide on scroll, or be covered.**

### 1 — Hero (`#trang-chu`) · navy background

```
eyebrow  PHỤC VỤ CẦN THƠ TỪ 2005 — 500+ CÔNG TRÌNH
h1       Cửa Cuốn, Nhôm Kính, Cửa Kéo Cần Thơ
            ("Cần Thơ" in an amber gradient)
body     Khảo sát và báo giá miễn phí trong ngày. Lắp đúng hẹn, lắp xong mới thanh toán
         — bồi thường 200% nếu dùng sai vật liệu cam kết.
label    Để lại số — thợ gọi lại trong ít phút:
form     [Họ và tên] [Số điện thoại] [Nhận báo giá]      ← amber submit
note     Hoặc gọi thẳng 0945 042 345 — miễn phí tư vấn, không ép chốt.
buttons  [Gọi 0945 042 345] (white)   [Nhắn Zalo] (outline)
chips    ✓ Bồi thường 200% nếu sai vật liệu · ✓ 500+ công trình từ 2005
         · ✓ Lắp xong mới thanh toán
right    Two arch-framed real photos, the second offset 40px lower
bottom   Quick category pills: Cửa cuốn · Cửa nhôm kính · Cửa kéo · Lan can kính
         · Sửa cửa cuốn · Công trình đã làm
```

*Motion intent:* a faint grid and two soft radial glows sit behind. Copy rises in a short
stagger (~80ms apart). **The arches are the moment** — mask them open from the bottom like a
door lifting, revealing the photo. The form must be usable before that finishes.

### 2 — Giới thiệu (`#gioi-thieu`) · white

h2: **21 năm, 500+ công trình — chưa một khách nào gọi lại vì sai vật liệu.**

Body paragraph (keep verbatim): *Năm 2005, Hưng Thành Phát là đơn vị đầu tiên sản xuất và
lắp đặt cửa cuốn tại Cần Thơ — khởi nghiệp tại 105 Đường 3/2 với một cam kết duy nhất: lắp
đúng thứ đã báo giá. Không thay thế vật liệu rẻ hơn sau khi ký hợp đồng. Không làm tắt để
tiết kiệm thời gian. Năm 2022 chuyển về showroom hiện tại 235–237 Võ Văn Kiệt, Bình Thủy —
21 năm sau, 500+ công trình từ nhà phố đến nhà xưởng công nghiệp, cam kết đó vẫn còn nguyên.*

Three promises, each icon + heading + body:
1. **Đúng vật liệu cam kết — bồi thường 200% nếu sai** — Mỗi bộ cửa đều có CO/CQ chứng nhận
   xuất xứ. Sai một chi tiết nhỏ — bồi thường gấp đôi giá trị hợp đồng. Không có ngoại lệ.
2. **Có mặt trong ngày khảo sát — lắp đúng ngày hẹn** — Đội kỹ thuật thường trực tại Cần Thơ,
   không tính phí đi lại nội thành. Có mặt trong ngày để khảo sát — lắp đúng ngày hẹn đã cam kết.
3. **Lắp xong mới trả tiền — không lo bị ép** — Chúng tôi không nhận trước toàn bộ. Chạy thử,
   kiểm tra hài lòng, ký nghiệm thu — rồi mới thanh toán. Đơn giản vậy thôi.

Right: a real photo of the storefront, caption `235–237 Võ Văn Kiệt, Bình Thủy, Cần Thơ`.

*Motion intent:* the three promises reveal in sequence on scroll. Consider counting `21` and
`500+` up once when they enter view.

### 3 — Dòng sản phẩm (`#san-pham`) · grey-50

Intro — eyebrow `DÒNG SẢN PHẨM`, h2 **Cửa nào phù hợp công trình của bạn?**, body *Mỗi tấm
hình dưới đây là một công trình Hưng Thành Phát đã lắp tại Cần Thơ — bấm vào để xem trọn bộ
ảnh của công trình đó.*

Then **five category rows**, each identical in structure:

```
┌ amber rule (48×2px)
│ CATEGORY NAME            (uppercase, extrabold, tracking-wider)
│ tagline                                    [ Xem <pillar page> → ]  ← navy pill, right
│ từ N đ/m²                (amber, bold)
├──────────────────────────────────────────────────────────────────────
│ 4 photo cards — "Ảnh thực tế" badge top-left, label + "Xem công trình →" below
│ (mobile: horizontal snap-scroll · lg: 4-col grid)
└ subtype chips, wrapping — each links to the pillar page
```

| Category | Tagline | Price |
|---|---|---|
| Cửa Cuốn | Vận hành êm – Bảo mật cao – Tiết kiệm không gian | từ 500.000đ/m² |
| Cửa Nhôm Kính | Sang trọng – Cách âm – Cách nhiệt vượt trội | từ 1.400.000đ/m² |
| Lan Can – Cầu Thang Kính | Kính cường lực – Tay vịn gỗ hoặc nhôm – Thoáng và an toàn | từ 1.950.000đ/m² |
| Cửa Kéo | Bền bỉ – Chống đột nhập – Phù hợp mặt tiền kinh doanh | từ 540.000đ/m² |
| Motor – Bình Lưu Điện | Vận hành ổn định – Dự phòng điện – Phụ kiện chính hãng | từ 3.300.000đ/bộ |

Motor has **no photos** (none exist yet) — it renders as four text tiles reading
`Hỏi giá & tình trạng hàng →`. Keep that treatment; do not fill it with stock imagery.

*Motion intent:* cards stagger in per row. On hover, image scales to 1.04 and the label
turns amber. This is the densest part of the page — keep motion restrained here or it
becomes noise.

### 4 — CTA band · navy

h2 **Cần báo giá cho công trình của bạn?** · *Gửi số điện thoại — thợ khảo sát gọi lại trong
ít phút, tư vấn miễn phí.* · `[Gọi 0945 042 345]` `[Nhắn Zalo]` · right: a glass panel with
the same 2-field form, labelled *Hoặc để lại thông tin, mình gọi lại:* and footnote *Khảo
sát và báo giá miễn phí trong nội ô Cần Thơ.*

### 5 — Công trình tiêu biểu (`#du-an`) · white

eyebrow `CÔNG TRÌNH TIÊU BIỂU`, h2 **122+ công trình đã bàn giao tại Cần Thơ**, body *Toàn bộ
hình dưới đây là ảnh chụp thực tế tại công trình — không phải ảnh mẫu, không phải ảnh
catalogue.*

Filter pills (Cửa cuốn is default): `Cửa cuốn · Cửa nhôm kính · Cửa kéo · Lan can & cầu thang
kính · Cổng, vách & phòng tắm · Nhà xưởng & công trình lớn · Khác`. Below: an 8-card grid
(2-col mobile, 4-col desktop). Footer CTA: `Xem tất cả 122 công trình →`.

*Motion intent:* **this is the best animation opportunity on the page.** Filter changes
should cross-fade and re-flow with a shared-layout transition rather than snapping. Cards
enter with a small stagger.

### 6 — Quy trình (`#quy-trinh`) · navy

h2 **4 bước đơn giản — từ tư vấn đến bàn giao.** Note: *Bồi thường 200% tổng giá trị hợp
đồng nếu sử dụng không đúng chủng loại, thương hiệu đã cam kết.*

1. **Tư Vấn** — Gọi hoặc nhắn tin — kỹ thuật viên tư vấn sơ bộ ngay, đặt lịch khảo sát miễn
   phí tại nhà trong ngày.
2. **Khảo Sát & Báo Giá** — Đo đạc thực tế, báo giá chi tiết từng hạng mục — vật tư, motor,
   nhân công — không phát sinh ẩn.
3. **Thi Công Lắp Đặt** — Thợ lắp đúng ngày hẹn, bảo vệ sàn và tường, dọn dẹp gọn gàng. Hầu
   hết công trình nhà phố tiêu chuẩn hoàn thành trong 1 ngày làm việc.
4. **Nghiệm Thu — Rồi Mới Thanh Toán** — Chạy thử toàn hệ thống trước mặt bạn, ký nghiệm thu,
   rồi mới thanh toán. Bồi thường 200% nếu sai vật liệu cam kết.

*Motion intent:* a connecting line draws between the four steps as they scroll into view.

### 7 — Thư viện · white

h2 **Khoảnh khắc thi công thực tế từ đội ngũ Hưng Thành Phát.** Body: *Hơn 500 công trình lớn
nhỏ khắp Đồng Bằng Sông Cửu Long — minh chứng sống động cho chất lượng thi công và sự tin
tưởng của khách hàng.* A continuously drifting horizontal marquee of real site photos with
captions. Pauses on hover.

### 8 — Đánh giá (`#danh-gia`) · grey-50

h2 **500+ công trình — khách hàng tin tưởng.** · *Đánh giá thực tế từ khách hàng trên Google
Business.* Six real Google reviews (name, `Tháng 5/2026`, 5 stars, quote) on a 40s marquee
that pauses on hover. Link: `Xem thêm đánh giá trên Google Maps`.

### 9 — Second CTA band · navy

h2 **Xem xong rồi — giờ cần con số cụ thể?** · *Nhập kích thước để tự ước tính, hoặc để lại
số để thợ báo giá chính xác theo công trình.* Same layout as section 4.

### 10 — Khu vực phục vụ · grey-50

h2 **Thợ Cần Thơ, làm cho người Cần Thơ** · *Xưởng đặt tại Bình Thủy, Cần Thơ — đi tới công
trình nào trong thành phố cũng nhanh.* District pills: `Ninh Kiều · Bình Thủy · Cái Răng ·
Ô Môn · Thốt Nốt`. Three cards: **Khảo sát trong ngày**, **Giao lắp tận nơi**, **Bảo trì tại chỗ**.

### 11 — Báo giá & liên hệ (`#lien-he`) · white

h2 **Để lại số — chúng tôi gọi lại trong 15 phút.** Two hotlines, hours `08:00 - 17:30
(Thứ 2 - Thứ 7)`.

Left: **Ước Tính Giá Tham Khảo** — a live price calculator. Tabs `Cửa Cuốn / Cửa Kéo / Cửa
Nhôm Kính` → technology → model → width × height → optional motor, lock, battery → live
subtotal, 10% VAT, grand total. **This is a genuinely rare asset for a local door shop
(competitors say "liên hệ"). Treat it as a feature, not a form.** Numbers should tick, not
jump, when inputs change.

Right: **Yêu cầu báo giá miễn phí** — *Chuyên viên sẽ phản hồi trong vòng 15 phút.* Fields:
name, phone, email (optional), message. Submit `Gửi Yêu Cầu Báo Giá`. Footnote: *Bằng việc
gửi yêu cầu, bạn đồng ý để Hưng Thành Phát liên hệ qua số điện thoại đã cung cấp.* The
estimate is attached to the submission automatically.

### 12 — Footer · deep navy

Four columns: brand blurb + Facebook/Zalo icons · **Liên Kết Nhanh** (the six routes) ·
**Thông Tin Liên Hệ** with hotlines split by role (`Báo giá & tư vấn` / `Kỹ thuật & bảo hành`
/ `Văn phòng (cố định)`), email, address, hours · **Bản Đồ Showroom** embedded map with a
`Chỉ đường` link. Below: a single inline row of all landing-page links. Bottom bar:
`© 2026 Hưng Thành Phát Door. Mọi quyền được bảo lưu.`

---

## 5. Motion direction

### The idea: **the door is the interface**

HTP sells doors. Every motion primitive should be derived from how a door behaves — opening,
lifting, sliding, unrolling. That gives the site a reason for its animation instead of
generic fade-ups, and it is the thing no competitor can copy without looking derivative.

Four primitives, reused everywhere:

1. **The lift** — a roller door rising. A `clip-path` inset animating from `inset(100% 0 0 0)`
   to `inset(0)`. Use for hero arches and section-heading images.
2. **The slat** — a roller door is horizontal slats. Reveal large images as 8–12 horizontal
   bands with a 20ms stagger. Use sparingly: once in the hero, maybe once at Công trình.
   It is memorable exactly because it is rare.
3. **The swing** — a hinged door. `rotateY` from -12° with `transform-origin: left`, plus
   perspective. Use for card hovers, at low amplitude.
4. **The slide** — a sliding door. Horizontal `translateX` reveals. Use for filter changes
   and the marquees.

### Timing and easing

- Standard: **300ms**, `cubic-bezier(0.22, 1, 0.36, 1)` (the site's existing ease).
- Reveals: **500–600ms**. Micro-interactions: **150–200ms**. Nothing over 800ms.
- Stagger: **50–80ms** between siblings. Cap any group at ~400ms total.
- Scroll reveals trigger once (`viewport={{ once: true, amount: 0.15 }}`), never replay.

### Rules

- **Transform and opacity only.** No animating `width`, `height`, `top`, `box-shadow`.
- Everything must hold **60fps on a mid-range Android**, which is what this audience uses.
- **No scroll-jacking, no horizontal page scroll, no parallax on text.** Parallax on a
  background image is acceptable at low amplitude.
- **The page must never scroll horizontally.** Wide content scrolls inside its own container.
- Under `prefers-reduced-motion: reduce`, replace every reveal with a plain fade of ≤100ms
  and stop the marquees.

### Where to spend the animation budget

Ranked. Do the top three well and stop; a page where everything moves reads as cheap.

1. **Hero arch reveal** — the first impression, and the clearest expression of the metaphor.
2. **Công trình filter transitions** — the most-used interaction on the page.
3. **Quy trình line-draw** — turns a list into a narrative.
4. Category card stagger — keep it subtle.
5. Number count-ups (21, 500+, 122+) — once each, on first view.

**Do not animate:** the sticky mobile bar, the hero form, any phone number, or the price
calculator's controls. Those are the money. They stay still and instant.

---

## 6. Technical context

- **Next.js 14 App Router**, TypeScript, Tailwind CSS, **Framer Motion** already installed,
  shadcn/ui primitives, `lucide-react` icons, Inter via `next/font`.
- Below-fold sections are `dynamic()` imported to split the bundle.
- Images go through `next/image`. The hero image should carry `priority`.
- Deployed on Vercel; `main` auto-deploys to production.
- Current homepage first-load JS is ~215 kB. **Treat that as a ceiling** — if an animation
  library would blow past it, hand-roll the effect with CSS instead.

---

## 7. What "professional" means here, and what would ruin it

This is a family business in a provincial Vietnamese city selling a considered purchase to
people who are price-checking competitors. Impressive means **confident and calm**, not
flashy. The visitor should think *"these people are serious and they'll turn up on time"* —
not *"someone spent a lot on this website."*

Ruins it:
- A preloader or intro curtain between a cold visitor and the phone number.
- Text that fades in as you scroll past, so you read it late or not at all.
- Motion on every element. Restraint is the signal of expense.
- Drifting toward the competitor's yellow-and-red.
- Replacing real install photos with polished stock — the real photos, some with a timestamp
  burned in, are the proof. They are the whole argument.

The bar to clear: **would a customer who saw this on their phone at 9pm still be able to tap
one button and call?** If an animation makes that harder, it is wrong, however good it looks.
