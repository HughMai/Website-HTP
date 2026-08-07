# HTP Website — Mitadoor-shaped rebuild

**Goal**: adopt Mitadoor's *structure* (catalog site, repeated category rows, project showcase,
segmented contact) while keeping HTP's *taste* (navy + amber, Inter, restrained motion) and HTP's
*content* (Cần Thơ, family shop, 21+ năm, 122 real công trình).

**Primary success metric**: a visitor can call or leave their number from anywhere on the page,
within one tap, at any scroll depth. Everything else serves that.

---

## What Mitadoor does that HTP doesn't (the gap)

| | Mitadoor | HTP before |
|---|---|---|
| Nav | Multi-page catalog, search, mega menu | 5 anchor links on one scroll page |
| Hero | Product photography slider | Text-only dark gradient, no product shown |
| Body rhythm | Category row → cards → "Xem tất cả" → catalog | One long narrative scroll |
| Projects | `/du-an`, tabbed by project type | 122 projects built but unlinked |
| Price | Published on every product page | Buried in an estimator |
| CTA density | Red CTA per product + floating rail | 2 hero buttons + 1 form at the bottom |
| Footer | Hotlines segmented by role + offices | Link groups only |

## What HTP has that Mitadoor doesn't (the moat — keep it loud)

- **122 real công trình, 266 real photos** — not catalog renders. Mitadoor's product shots are
  watermarked studio images; HTP's are actual Cần Thơ installs.
- **A working per-m² price engine** (`QuoteAndContact.tsx`) covering every door type.
- **Real risk reversal**: "Lắp xong mới thanh toán" · "Bồi thường 200% nếu sai vật liệu".
- **Local specificity**: 5 district pages, one city. Mitadoor is national and generic.

---

## Route map

Existing 21 SEO pages are the ranking assets — **all kept, none deleted, none duplicated**.
The catalog links *into* them rather than competing with them (no keyword cannibalisation).

```
/                          Homepage — rebuilt in Mitadoor rhythm
/san-pham                  NEW catalog hub → routes into the pillars below
  ├─ /cua-cuon-nhom-can-tho          (existing pillar)
  ├─ /cua-nhom-kinh-can-tho          (existing pillar)
  ├─ /cua-keo-can-tho                (existing pillar)
  ├─ /cua-keo-thep-can-tho           (existing)
  ├─ /lan-can-nhom-kinh-can-tho      (existing)
  └─ /cua-cuon-nha-xuong-can-tho     (existing)
/cong-trinh                Portfolio index (122 projects, filterable)
/cong-trinh/[slug]         Project detail
/bao-gia-cua-cuon-can-tho  Conversion page (existing)
/bang-gia-*                Price tables (existing ×2)
/lap-dat-*, /sua-chua-*    Service pages (existing)
/cua-cuon-{ninh-kieu,binh-thuy,cai-rang,o-mon,thot-not}   District pages (existing)
/blog, /blog/*             GEO content (existing)
```

## Homepage section order (mirrors Mitadoor 1:1)

| # | Mitadoor | HTP equivalent | Conversion job |
|---|---|---|---|
| 1 | Hero slider | Hero + **inline lead form** | Capture above the fold |
| 2 | — | Trust bar (21+ năm · 500+ · 1000+ · Cần Thơ) | Credibility |
| 3 | "Giới thiệu" + arch images | Giới thiệu + arch images (door-shaped) | Story |
| 4 | "Dòng sản phẩm" carousel | Dòng sản phẩm — 4 category tiles | Route to catalog |
| 5 | Per-category product rows | Per-category rows → pillar pages | Route to money pages |
| 6 | — | **CTA band** (call / Zalo / form) | Mid-scroll capture |
| 7 | "Công trình tiêu biểu" tabs | Công trình tiêu biểu — tabbed, real installs | Proof |
| 8 | "Thư viện" | Gallery | Proof |
| 9 | "Thành tựu / Đối tác" | Cam kết + Khu vực phục vụ | Trust + local SEO |
| 10 | — | Testimonials | Social proof |
| 11 | — | Báo giá + Liên hệ (price engine + form) | Primary capture |
| 12 | Rich footer, segmented hotlines | Footer, hotlines segmented by role | Last-chance capture |

## Conversion mechanics (the "landing machine")

1. **Hero lead form** — name + phone only. Two fields converts; ten fields doesn't.
2. **Sticky mobile action bar** — Gọi ngay / Zalo / Báo giá, fixed to the bottom on `<md`.
   Mobile is the majority of this site's traffic.
3. **Floating rail** (desktop, existing) — phone / Zalo / map.
4. **CTA bands** between sections — one after products, one after proof.
5. **Every product card is a link**, not a scroll-to-contact click.
6. **Price anchoring** — show "từ X đ/m²" so the visitor self-qualifies before calling.
7. **Segmented hotlines in footer** — Báo giá / Kỹ thuật · Bảo hành, so the caller knows they'll
   reach the right person.

## Taste rules (do NOT copy Mitadoor here)

- **Stay navy + amber.** Mitadoor is yellow/red. Copying the palette would make HTP look like a
  knock-off of its own competitor. Structure is borrowed; colour is not.
- Keep Inter, keep the six-size type scale, keep restrained motion (`DESIGN.md`).
- Borrow exactly one Mitadoor visual idea: the **arch-topped image frame**, because it reads as a
  door and HTP sells doors.

## Hard constraints carried through

1. Warranty phrasing is ONLY *"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất"* — no year counts
   anywhere. (Mitadoor writes "Bảo hành 5 năm" on its product pages; HTP must not copy that.)
2. Brand constants come from `lib/site-data.ts`.
3. `id="page-root"` is an inert wrapper — never gate its opacity (the intro animation is gone).
4. Founded 2005 · 21+ năm.
