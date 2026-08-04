# HTP Website Expansion — Intake Checklist

**Purpose**: everything the build needs BEFORE it starts. Fill each item, drop files into `intake/` (folder structure below), tick the box. When every REQUIRED box is ticked, the build begins — no mid-build "chờ ba mẹ gửi hình."

**Target shape** (mapped from mitadoor.com.vn on 2026-07-23): product catalog under `/san-pham/`, projects gallery under `/du-an/`, plus `gioi-thieu`, `bang-gia`, `chinh-sach`, `thu-vien`, `lien-he`. HTP version scoped to Cần Thơ — catalog depth where it helps a local buyer, not 109 pages for the sake of it.

**Hard rule carried over**: warranty phrasing is ONLY *"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất"* — everywhere, including any policy doc the family writes. If their draft contains year counts, it gets rewritten before it goes on the site.

---

## 1. Sản phẩm (REQUIRED — this is the core of the expansion)

For **each** product family, then **each** model/variant within it:

| Field | Vietnamese label (for ba mẹ) | Notes |
|---|---|---|
| ☐ Product name | Tên sản phẩm | e.g. "Cửa cuốn nhôm khe thoáng 5S" | 
| ☐ Category | Loại | cửa cuốn / cửa kéo / nhôm kính / motor / phụ kiện | 
| ☐ Description | Mô tả (3-5 câu) | what it is, who it's for, why choose it | 
| ☐ Materials | Vật liệu | nhôm đúc, thép tĩnh điện, inox... |
| ☐ Sizes available | Kích thước | min-max khổ, độ dày lá |
| ☐ Colors | Màu sắc | list or photo of color chart |
| ☐ Origin/brand | Xuất xứ / hãng | brands HTP carries or fabricates |
| ☐ Motor specs (if motorized) | Thông số motor | brand, tải trọng, nguồn |
| ☐ Price | Giá | number, range, or "liên hệ" — decide per product (see §6) |
| ☐ Photos | Hình ảnh (3-8 tấm/sản phẩm) | real installs > catalog scans; ≥1600px wide |

☐ **Full product list first**: one flat list of every product family + model HTP actually sells/installs, before detail. This decides the catalog size.

## 2. Dự án / Công trình (REQUIRED — 10-20 installs)

Per project:
- ☐ Photos — Hình thi công + hoàn thiện (3-6 tấm, ≥1600px, originals not Zalo-compressed)
- ☐ Location — Địa điểm (quận/huyện is enough: "Bình Thủy, Cần Thơ")
- ☐ Door type — Loại cửa lắp
- ☐ Year — Năm thi công
- ☐ One line — Một câu về công trình (khách yêu cầu gì, giải quyết sao)
- ☐ Customer name — Tên khách (optional; "anh T., Ninh Kiều" is fine)

## 3. Công ty (REQUIRED)

- ☐ Company story, long form — Lịch sử chi tiết từ 2005 (founding at 105 Đường 3/2, first cửa cuốn company in Cần Thơ, move to Võ Văn Kiệt 2022 — locked facts, but need the human detail: who founded, how it grew, family photos of early days if any)
- ☐ Team/family photos — Hình đội ngũ, xưởng, showroom (current)
- ☐ Business license number — Số GPKD (footer trust signal; optional to publish)
- ☐ Certificates/partnerships — Chứng nhận, đại lý ủy quyền của hãng nào (Austdoor? YH? each needs the certificate or letter photo)

## 4. Chính sách (REQUIRED)

- ☐ Warranty policy — Chính sách bảo hành (will be rewritten to manufacturer-standard phrasing)
- ☐ Payment terms — Thanh toán ("lắp xong mới trả tiền" is already a hero claim — formalize it)
- ☐ Installation/survey policy — Quy trình khảo sát, lắp đặt
- ☐ Maintenance/repair policy — Bảo trì, sửa chữa (ties into existing `/sua-chua-cua-cuon-can-tho`)

## 5. Media (REQUIRED for build, blocks design)

- ☐ Logo vector — File logo gốc (AI/SVG/PDF; if only PNG exists, largest available)
- ☐ Existing videos — Video có sẵn (thi công, sản phẩm chạy thử — anything)
- ☐ Brand video — the Higgsfield door-opening clip (workflow in main chat; lands in `/thu-vien` + homepage hero)
- ☐ Photo dump — everything else: old installs, xưởng, delivery trucks. More is better; I'll curate.

## 6. Pricing decisions (DECISION — Hughie + family)

- ☐ Publish prices, ranges, or "liên hệ" — per category. (Mitadoor publishes a bảng giá hub. HTP already has 3 bảng giá pages; decide whether the catalog pages show numbers.)
- ☐ Current price tables — Bảng giá hiện tại per category (even if not published, build needs them for the quote form logic)

## 7. Contact & social (mostly have — confirm)

- ☑ Hotlines: 0945 042 345 · 0913 574 077
- ☑ Email: hungthanhphatdoor@gmail.com
- ☑ Address: 235-237 Võ Văn Kiệt, Bình Thủy, Cần Thơ
- ☐ Zalo OA or personal Zalo number for the chat button — confirm which
- ☐ Facebook page URL — confirm current/active one
- ☐ Google Maps listing URL — confirm (Testimonials section links one already)

## 8. Scope decisions (DECISION — Hughie)

- ☐ Keep blog (`/blog/*`) — recommend YES, it's doing GEO work
- ☐ News section (tin tức) — recommend NO until someone will actually write it; a dead news page is worse than none
- ☐ Tuyển dụng page — only if actively hiring
- ☐ Cảnh báo hàng giả page — mitadoor has one; relevant only if HTP has a counterfeiting problem
- ☐ Existing 21 SEO pages — ALL KEPT, none deleted; catalog links INTO them (they're the ranking assets)

---

## Drop folder structure

```
intake/
├── san-pham/<ten-san-pham>/     # photos + a text/word file per product
├── du-an/<dia-diem-nam>/        # photos + one line
├── cong-ty/                     # story, team photos, licenses, certificates
├── chinh-sach/                  # policy docs (any format)
├── media/                       # logo, videos, photo dump
└── bang-gia/                    # price tables
```

Phone photos are fine. Word, Zalo notes, paper scans are fine — I normalize. The only quality bar: photos ≥1600px wide and not screenshots-of-photos.

---

## What happens after intake is complete

1. `/design-consultation` — extend DESIGN.md for catalog + gallery page types (nav/mega-menu, product card, project card, breadcrumbs)
2. `/spec` — route map + data model (products as structured data, not hardcoded JSX) → approved by Hughie
3. Build in phases: **P1** nav + catalog skeleton + 10 hero products · **P2** full catalog + dự án gallery · **P3** chính sách + thư viện + video hero
4. Each phase: `/qa` + `/design-review` before push (main auto-deploys — every merge is production)
