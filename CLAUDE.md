# HTP Website — Claude Code Context

**Project**: Hưng Thành Phát Door — Next.js 14 marketing website
**Live URL**: https://hungthanhphat.vn (prod) · https://website-htp.vercel.app (staging)
**Stack**: Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · Vercel

---

## Commands

```bash
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build (run before deploy check)
npm run lint      # ESLint (next lint)
npm start         # Serve production build locally
```

## Environment

Required in `.env.local` (never commit this file):
```
NEXT_PUBLIC_SITE_URL=https://hungthanhphat.vn
```
Staging uses `https://website-htp.vercel.app` — set per-environment in Vercel dashboard.

---

## Business Context

| Field | Value |
|-------|-------|
| Brand | Hưng Thành Phát Door |
| Founded | **2005** — first cửa cuốn company in Cần Thơ |
| Original address | 105 Đường 3/2, Cần Thơ (2005–2022) |
| Current address | 235-237 Võ Văn Kiệt, Bình Thủy, Cần Thơ (2022–present) |
| Experience | **21+ năm** (as of 2026) |
| Projects | 500+ công trình |
| Customers | 1000+ khách hàng |
| Warranty | **Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất** (ONLY phrasing — never quote year counts) |
| Hotlines | 0945 042 345 · 0913 574 077 |
| Email | hungthanhphatdoor@gmail.com |

**Products**: Cửa cuốn · Cửa nhôm kính · Cửa kéo · Motor & phụ kiện

---

## Locked Decisions (do not change without user approval)

1. **Warranty phrasing (HARD RULE — NEVER VIOLATE)**: the ONLY allowed phrase is `"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất"`. **NEVER** write "5–10 năm", "5-10 năm", "10 năm", "5 năm", "trọn đời", or any other specific year count. **NEVER** invent a number. If a year is required (e.g., schema fields), ask the user — do not guess. Applies to: website copy, JSON-LD schema, GBP descriptions, ads, social posts, emails — everywhere.
2. **Founding year**: `2005` everywhere — never 2008, never 2017.
3. **Experience count**: `21+ năm` (2026) — update annually.
4. **Roman numeral**: `Est. MMV` (= 2005) if ever used again — the intro animation that carried it is deleted.
5. **Origin story**: always mention "đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ" in About/history contexts.

---

## Site Architecture

### App Router Pages
```
app/page.tsx                          ← Homepage (primary SEO target)
app/cua-cuon-nhom-can-tho/page.tsx    ← Cửa cuốn nhôm (pillar)
app/cua-keo-can-tho/page.tsx          ← Cửa kéo Cần Thơ
app/cua-keo-thep-can-tho/page.tsx     ← Cửa kéo thép
app/cua-nhom-kinh-can-tho/page.tsx    ← Cửa nhôm kính
app/lan-can-nhom-kinh-can-tho/page.tsx← Lan can nhôm kính
app/cua-cuon-nha-xuong-can-tho/page.tsx← Cửa cuốn nhà xưởng
app/cua-cuon-binh-thuy/page.tsx       ← District landing (Bình Thủy)
app/lap-dat-cua-cuon-can-tho/page.tsx ← Lắp đặt service
app/sua-chua-cua-cuon-can-tho/page.tsx← Sửa chữa service
app/bao-gia-cua-cuon-can-tho/page.tsx ← Báo giá
app/bang-gia-cua-keo-can-tho/page.tsx ← Bảng giá cửa kéo
app/bang-gia-cua-nhom-kinh-can-tho/page.tsx← Bảng giá nhôm kính
app/blog/page.tsx                     ← Blog index
app/blog/nhom-duc-vs-thep-tinh-dien/  ← Blog post 1
app/blog/cach-bao-tri-cua-cuon/       ← Blog post 2
app/blog/motor-cua-cuon-tot-nhat/     ← Blog post 3
app/cua-cuon-ninh-kieu/page.tsx       ← District landing (Ninh Kiều)
app/cua-cuon-cai-rang/page.tsx        ← District landing (Cái Răng)
app/cua-cuon-o-mon/page.tsx           ← District landing (Ô Môn)
app/cua-cuon-thot-not/page.tsx        ← District landing (Thốt Nốt)
```

### Key Components
```
components/sections/Hero.tsx          ← Homepage hero with trust chips
components/sections/About.tsx         ← Company story (21 năm origin)
components/sections/Products.tsx      ← Product grid (horizontal scroll mobile)
components/sections/Testimonials.tsx  ← Infinite marquee reviews
components/sections/Process.tsx       ← How we work
components/sections/Footer.tsx        ← 2-col mobile, map hidden mobile
components/sections/Navbar.tsx        ← Navigation
components/FloatingContact.tsx        ← Floating contact widgets
lib/site-data.ts                      ← SINGLE SOURCE OF TRUTH for brand data
```

### Single Source of Truth
All brand constants live in `lib/site-data.ts` — `SITE.brand`, `SITE.hotlines`, `SITE.foundedYear`, `SITE.address`, `SITE.mapCoords`, `SITE.email`. **Never hardcode these values in components.**

---

## SEO Rules

### On-Page Hierarchy
- **Homepage H1**: must contain `"Cửa Cuốn, Nhôm Kính, Cửa Kéo Cần Thơ"`
- **Title template**: `[Page Title] | Hưng Thành Phát Door` (set in layout.tsx)
- **Canonical**: every page must have `alternates: { canonical: \`${siteUrl}/[slug]\` }`
- **NAP**: Name + Address + Phone in Footer on every page ✓

### Priority Keywords
| Tier | Keyword | Volume | Difficulty |
|------|---------|--------|-----------|
| P1 | cửa cuốn Cần Thơ | 800 | 25 |
| P1 | cửa nhôm kính Cần Thơ | 600 | 28 |
| P1 | lắp đặt cửa cuốn Cần Thơ | 400 | 20 |
| P1 | cửa kéo Cần Thơ | 350 | 22 |
| P1 | sửa cửa cuốn Cần Thơ | 250 | 15 |
| P2 | báo giá cửa cuốn Cần Thơ | 300 | 18 |
| P2 | cửa cuốn Bình Thủy | 150 | 10 |

### Schema
- `HomeAndConstructionBusiness` + `WebSite` schemas in `app/layout.tsx`
- `@id: ${siteUrl}/#organization` for GBP Knowledge Panel merge
- `sameAs` includes Facebook, Zalo, Google Maps listing

### Internal Linking — Topic Clusters
- **Pillar**: `/cua-cuon-nhom-can-tho` ← link from homepage, blog, district pages
- **Cluster**: `/cua-cuon-binh-thuy`, `/lap-dat-cua-cuon-can-tho`, `/sua-chua-cua-cuon-can-tho`, `/bao-gia-cua-cuon-can-tho`
- Blog posts must link back to relevant product/service pillar pages

---

## Technical Notes

### Intro Animation — REMOVED
The first-visit door animation is gone, along with `sessionStorage['htp-intro-seen']`,
the `data-htp-ready` attribute, the `beforeInteractive` guard script and the
`#page-root { opacity: 0 }` gate. It delayed the hero by ~2–3s on a first visit, and
above the fold is where the conversion happens. The homepage now paints immediately.

Do not reintroduce a full-screen overlay before the hero without a deliberate decision:
it puts a fixed time cost in front of the only section every visitor sees.

### Mobile Patterns
- Footer: 2-col grid on mobile (`grid-cols-2`), map hidden (`hidden md:block`)
- Products subtypes: horizontal scroll with `-mx-4 px-4 overflow-x-auto snap-x` on mobile, grid on `lg:`
- Always test mobile layout before marking UI tasks complete

### Testimonials (`components/sections/Testimonials.tsx`)
- Infinite CSS marquee (`@keyframes htp-marquee`, `translateX(-50%)` on doubled array)
- 6 real reviews from Google Business
- Google Maps link: `https://www.google.com/maps/place/Hưng+Thành+Phát+Door/@10.0484783,105.7548398`
- Hover pauses animation (`animation-play-state: paused`)

### Gotchas
- **`id="page-root"`**: still on the homepage root as a plain wrapper. Nothing reads it any more (the intro animation that did is deleted), so it carries no behaviour — do not add opacity/visibility gating back onto it.
- **External images**: any new image hostname needs a `remotePatterns` entry in `next.config.mjs`, otherwise Next.js throws at build time.
- **`@/` alias**: resolves to the project root via `tsconfig.json` `paths` — use for all imports.
- **Dynamic imports**: homepage uses `dynamic(() => import(...))` for all sections below the fold. New sections added to `app/page.tsx` should follow the same pattern.

---

## Content Calendar (remaining)

| Week | Page | Keyword | Status |
|------|------|---------|--------|
| Next | Cửa nhôm kính pillar | cửa nhôm kính Cần Thơ | pending |
| +1 | Cửa kéo pillar | cửa kéo Cần Thơ | pending |
| +2 | Cửa cuốn nhà xưởng | cửa cuốn nhà xưởng Cần Thơ | pending |

**Completed**: sửa cửa cuốn · báo giá cửa cuốn · cửa cuốn Bình Thủy · blog nhôm đức vs thép · blog bảo trì · district pages (Ninh Kiều, Cái Răng, Ô Môn, Thốt Nốt) · blog motor cửa cuốn

---

## Completed Infrastructure

- **Google Search Console**: connected and sitemap submitted — do not suggest again.

## GEO Content Targets (AI-citation)

| Query | Page / Format |
|-------|---------------|
| nên chọn cửa cuốn nhôm hay thép | `/blog/nhom-duc-vs-thep-tinh-dien` ✓ |
| cách bảo trì cửa cuốn | `/blog/cach-bao-tri-cua-cuon` ✓ |
| motor cửa cuốn nào tốt | `/blog/motor-cua-cuon-tot-nhat` ✓ |
| bảo hành cửa cuốn bao lâu | FAQ on product pages — answer with manufacturer-standard phrasing (NEVER year counts) |
| cửa cuốn tấm liền là gì | Definition block needed |

---

## Git / Deploy

- **Branch**: `main` → auto-deploys to Vercel
- **Remote**: origin (GitHub)
- Commit format: descriptive imperative, Co-Authored-By footer
- Always push after completing a batch of related changes

## Memory Files

- `memory/research/keyword-research/2026-05-14-htp-door.md` — full keyword data
- `memory/hot-cache.md` — live SEO decisions and veto items (auto-loaded by skills)

---

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec

### Browser targets

Browser-driven skills (`/browse`, `/design-review`, `/landing-report`, `/benchmark`, `/canary`, `/qa`) default to:

| Target | URL |
|---|---|
| Production | https://hungthanhphat.vn |
| Staging | https://website-htp.vercel.app |
| Local dev | http://localhost:3000 (`npm run dev` first) |

Priority pages for visual/SEO passes, in order: `/` (homepage), `/cua-cuon-nhom-can-tho` (pillar), `/bao-gia-cua-cuon-can-tho` (conversion), `/cua-cuon-binh-thuy` (district template — represents 5 near-identical pages).

Always check **390×844** alongside desktop — mobile is the majority of this site's traffic and Footer/Products have mobile-only layouts (see Mobile Patterns).

### Skill guardrails for this repo

- **Warranty phrasing is a HARD RULE** (Locked Decisions #1). Any skill that writes or rewrites copy — `/design-review` fix loops, `/design-html`, content skills — must never emit a year count. If a fix would touch warranty text, stop and ask.
- **Brand constants come from `lib/site-data.ts`.** Skills that patch components must read from `SITE.*`, never hardcode.
- `/design-review` operates on the rendered site, not source. Calibrate findings against `DESIGN.md` in this repo root.
- `/ship` pushes `main`, which auto-deploys to Vercel production. There is no manual gate — treat every ship as a live deploy.
