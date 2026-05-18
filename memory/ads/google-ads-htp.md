# HTP Door — Google Ads Campaign Playbook
Last updated: 2026-05-15

---

## Overview

| Item | Value |
|------|-------|
| Budget | 3–5 triệu VND/month (use 4M as baseline = ~133K VND/day) |
| Goal | Phone call conversions |
| Products (Phase 1) | Cửa cuốn + Cửa nhôm kính |
| Location | Cần Thơ + 25km radius |
| Email to use | hungthanhphatdoor@gmail.com |

---

## Conversion Value Estimates

| Product | Avg Job Value | 6% Profit | Max CPA Target |
|---------|--------------|-----------|----------------|
| Cửa cuốn | 8,000,000 VND | 480,000 VND | 300,000 VND |
| Cửa nhôm kính | 25,000,000 VND | 1,500,000 VND | 500,000 VND |

A campaign spending 4M/month breaking even needs only ~13 cửa cuốn calls turning into jobs.

---

## Phase 1: Setup Checklist (Before Launch)

### Step 1 — Create Google Ads Account
- [ ] Go to ads.google.com → sign in with hungthanhphatdoor@gmail.com
- [ ] When asked goal, choose "Get more calls" → enter 0945 042 345
- [ ] Skip the guided setup (click "Switch to Expert Mode" at the bottom)
- [ ] Set billing: Vietnam, VND, add bank card or Momo

### Step 2 — Set Up Call Conversion Tracking (no site code needed)
This method tracks calls via Google's forwarding number built into the ad — zero site changes required.

1. In Google Ads → **Tools & Settings → Conversions → + New conversion action**
2. Choose **"Phone calls"**
3. Choose **"Calls from ads using a Google forwarding number"**
4. Settings:
   - **Conversion name**: Goi dien thuc te
   - **Value**: 480,000 VND (use avg cửa cuốn; adjust later)
   - **Count**: One per click
   - **Call length**: 30 seconds minimum (filters pocket dials)
   - **Attribution**: Data-driven (or Last click if not enough data)
5. Save → copy the **Conversion ID** (format: AW-XXXXXXXXXX) — needed for Step 3

### Step 3 — Add Google Tag to Website
Once you have your Conversion ID, add this to `app/layout.tsx` (see "Site Changes" section below).

### Step 4 — Link Google Search Console
- Tools & Settings → Linked accounts → Search Console → Link hungthanhphat.vn
- This gives impression/click data for organic alongside paid.

---

## Campaign Structure

```
Account: HTP Door
└── Campaign: HTP_Search_CanTho_CuaCuon-NhomKinh
    ├── Ad Group 1: Cua-Cuon (budget: ~90K VND/day)
    └── Ad Group 2: Nhom-Kinh (budget: ~43K VND/day)
```

### Campaign Settings
| Setting | Value |
|---------|-------|
| Type | Search (NOT Performance Max for now) |
| Networks | Search only — uncheck "Display Network" and "Search Partners" |
| Location | Cần Thơ → +25km radius |
| Language | Vietnamese + All languages |
| Bidding (Week 1–3) | Manual CPC, max bid 8,000 VND/click |
| Bidding (Month 2+) | Maximize conversions → then Target CPA 300,000 VND |
| Budget | 133,000 VND/day |
| Ad schedule | Mon–Sat 07:00–18:00 (when you can answer calls) |
| Devices | All (mobile will dominate for local search) |

---

## Ad Group 1: Cua-Cuon

### Keywords
```
[cửa cuốn cần thơ]               ← Exact — highest intent
[lắp đặt cửa cuốn cần thơ]       ← Exact
[sửa cửa cuốn cần thơ]           ← Exact
[cửa cuốn nhôm cần thơ]          ← Exact
"báo giá cửa cuốn cần thơ"       ← Phrase
"cửa cuốn tự động cần thơ"       ← Phrase
"cửa cuốn nhà xưởng cần thơ"     ← Phrase
"cửa cuốn bình thủy"             ← Phrase
"cửa cuốn cần thơ giá rẻ"        ← Phrase
```

### Call Ad (best for mobile — shows phone number, no landing page needed)
```
Business name:  Hưng Thành Phát Door
Phone:          0945 042 345
Headline 1:     Cửa Cuốn Cần Thơ - Gọi Ngay          (30 chars)
Headline 2:     21 Năm Kinh Nghiệm - Bảo Hành Hãng   (36 chars — verify in UI)
Description 1:  Đơn vị đầu tiên lắp đặt cửa cuốn tại Cần Thơ từ 2005. Báo giá miễn phí.
Description 2:  500+ công trình, motor Somfy/CAME chính hãng. Gọi để được tư vấn ngay.
```

### Responsive Search Ad (RSA) — for desktop + more headline rotation
Add all headlines; Google picks the best combination automatically.

**Headlines** (max 30 chars each — verify in Google Ads UI):
```
1.  Cửa Cuốn Cần Thơ - Gọi Ngay
2.  21 Năm Kinh Nghiệm Thi Công
3.  Đơn Vị Đầu Tiên Tại Cần Thơ
4.  Bảo Hành Chính Hãng Theo Tiêu Chuẩn
5.  500+ Công Trình Đã Hoàn Thành
6.  Lắp Đặt & Sửa Chữa Cửa Cuốn
7.  Báo Giá Miễn Phí - Tư Vấn Nhanh
8.  Motor Somfy, CAME Chính Hãng
9.  Khảo Sát Tận Nơi Miễn Phí
10. Phục Vụ Toàn TP. Cần Thơ
```

**Descriptions** (max 90 chars each):
```
1. Hưng Thành Phát Door — đơn vị đầu tiên lắp cửa cuốn Cần Thơ từ 2005. Bảo hành theo hãng.
2. 21 năm, 500+ công trình. Motor Somfy, CAME, Nice chính hãng. Gọi để được tư vấn ngay.
3. Chuyên lắp đặt & sửa cửa cuốn nhôm, thép tại Cần Thơ. Thi công đúng hẹn, bảo hành rõ ràng.
4. Phục vụ toàn TP. Cần Thơ và vùng lân cận. Khảo sát miễn phí, báo giá nhanh trong ngày.
```

**Landing page**: `https://hungthanhphat.vn/cua-cuon-nhom-can-tho`

---

## Ad Group 2: Nhom-Kinh

### Keywords
```
[cửa nhôm kính cần thơ]              ← Exact
[cửa nhôm kính]                      ← Exact (narrow geo radius helps)
"lắp đặt cửa nhôm kính cần thơ"     ← Phrase
"báo giá cửa nhôm kính cần thơ"     ← Phrase
"lan can nhôm kính cần thơ"          ← Phrase
"cửa nhôm kính giá rẻ cần thơ"      ← Phrase
"vách kính cần thơ"                  ← Phrase
```

### Responsive Search Ad

**Headlines**:
```
1.  Cửa Nhôm Kính Cần Thơ
2.  21 Năm Kinh Nghiệm Lắp Đặt
3.  Thiết Kế Theo Yêu Cầu
4.  Nhôm Cao Cấp - Bền Đẹp
5.  Bảo Hành Tiêu Chuẩn Nhà Sản Xuất
6.  Báo Giá Miễn Phí Tận Nơi
7.  Khảo Sát & Tư Vấn Miễn Phí
8.  500+ Công Trình Cần Thơ
9.  Cửa Nhôm, Vách Kính, Lan Can
10. Phục Vụ Toàn TP. Cần Thơ
```

**Descriptions**:
```
1. Hưng Thành Phát Door — chuyên cửa nhôm kính cao cấp Cần Thơ từ 2005. Tư vấn & báo giá miễn phí.
2. Thiết kế và thi công cửa nhôm kính, vách kính, lan can theo yêu cầu. Bảo hành rõ ràng.
```

**Landing page**: `https://hungthanhphat.vn/cua-nhom-kinh-can-tho`

---

## Assets (Extensions)

### Call Assets — add to campaign level
```
Phone 1: 0945 042 345  (schedule: Mon–Sat 07:00–18:00)
Phone 2: 0913 574 077  (schedule: Mon–Sat 07:00–18:00)
```

### Sitelink Assets
```
Báo Giá Cửa Cuốn    → /bao-gia-cua-cuon-can-tho
Sửa Chữa Cửa Cuốn  → /sua-chua-cua-cuon-can-tho
Cửa Nhôm Kính       → /cua-nhom-kinh-can-tho
Liên Hệ Ngay        → / (homepage)
```

### Callout Assets (no URL, shown inline in ad)
```
✓ Kinh nghiệm 21 năm
✓ Bảo hành chính hãng
✓ Khảo sát miễn phí
✓ 500+ công trình
✓ Phục vụ toàn Cần Thơ
✓ Motor chính hãng
```

---

## Negative Keywords (Add Day 1 — Critical)

### Campaign-level negatives
```
hà nội
tp hcm
hồ chí minh
sài gòn
đà nẵng
bình dương
đồng nai
thanh lý
cũ
đã qua sử dụng
second hand
secondhand
tự lắp
tự sửa
hướng dẫn tự
youtube
tuyển dụng
việc làm
tuyển thợ
học
khóa học
đào tạo
```

---

## Bidding Strategy Progression

| Timeline | Strategy | Reason |
|----------|----------|--------|
| Week 1–3 | Manual CPC, max 8,000 VND | Gather data, stay in control |
| Week 4–8 | Maximize conversions | Have 10–20 call conversions to learn from |
| Month 2+ | Target CPA: 300,000 VND | Optimize for cost efficiency |

**Important**: Never increase daily budget by more than 20–30% at once — it resets the learning algorithm.

---

## Expected Performance

At 4M VND/month in Cần Thơ:

| Metric | Low | High |
|--------|-----|------|
| Est. CPC | 5,000 VND | 12,000 VND |
| Clicks/day | 11 | 26 |
| Clicks/month | 330 | 780 |
| Call rate | 5% | 10% |
| Calls/month | 17 | 78 |
| Close rate | 25% | 35% |
| Jobs/month | 4 | 27 |
| Profit/job (cửa cuốn) | 480,000 VND | 480,000 VND |
| Monthly profit from ads | 1.9M VND | 13M VND |

At midpoint: ~10 jobs/month, ~5M VND profit on 4M spend → ROAS 1.25× in month 1, improving as Quality Score builds.

---

## Weekly Review Checklist

**Every Monday (15 min):**
- [ ] Check calls received vs. cost per call
- [ ] Open Search Terms report → add irrelevant terms as negatives
- [ ] Check if any keywords have 0 impressions (bid too low or too specific)
- [ ] Check which ad (Call Ad vs RSA) is getting more calls
- [ ] Pause any keyword with 50+ clicks and 0 conversions

**Every Month:**
- [ ] Review top 5 performing keywords → increase bids 10–15%
- [ ] Review bottom 5 → pause or restructure
- [ ] If CPA < 200K VND → increase daily budget by 20%
- [ ] If CPA > 400K VND → tighten audience or review ad copy

---

## Site Changes Needed (layout.tsx)

Once you have your **Google Ads Conversion ID** (format: `AW-XXXXXXXXXX`), add this to `app/layout.tsx` inside the `<body>` tag, after the existing `<Script id="htp-intro-guard" ...>` block:

```tsx
{/* Google Ads tag — replace AW-XXXXXXXXXX with your real Conversion ID */}
<Script
  src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-ads-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-XXXXXXXXXX');
  `}
</Script>
```

This enables richer conversion tracking (website visits, time on page) in addition to call tracking.

---

## Phase 2 (Month 2+) — When to Expand

- Add cửa kéo ad group once Phase 1 is profitable
- Add remarketing campaign (target past visitors at lower CPC)
- Test Performance Max campaign for display + YouTube reach
- Consider Google Local Services Ads if/when available in Vietnam

---

## UTM Template for All Ads

Use this in landing page URLs to track in GA4 (once installed):
```
?utm_source=google&utm_medium=cpc&utm_campaign=cua-cuon&utm_content=rsa-01
```

Change `cua-cuon` to `nhom-kinh` for Ad Group 2 ads.
