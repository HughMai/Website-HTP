# HTP Website — Design System

**Status**: extracted from the live production site (https://hungthanhphat.vn, 1440×900) and cross-checked against `tailwind.config.ts` + `app/globals.css` on 2026-07-23.

This is the calibration baseline for `/design-review`. Deviations from what's recorded here are findings. Items under **Known drift** are already-accepted debt — flag them only if a change makes them worse.

---

## Color

### Brand scale (`tailwind.config.ts` → `colors.brand`)

| Token | Hex | Role |
|---|---|---|
| `brand.DEFAULT` / `brand.500` | `#0A2540` | Primary navy — dark section backgrounds, headings |
| `brand.50` | `#E6EBF1` | Section tint, card backgrounds (19 uses) |
| `brand.100` | `#C2CDDC` | Borders, dividers |
| `brand.200`–`brand.400` | `#8FA2BA` · `#5C7798` · `#2E4E76` | Mid-scale, sparse use |
| `brand.600`–`brand.900` | `#081E36` → `#020B14` | Deep navy, gradient stops |

### Accent

| Token | Hex | Role |
|---|---|---|
| Amber | `#FBBF24` (amber-400) | **The** accent — CTAs, trust chips, highlight text. 120 uses, second-most-common text color after navy. |
| Amber light | `#FCD34D` (amber-300) | Hover/gradient partner |

Amber on navy is the signature pairing. Do not introduce a third brand hue.

### Neutrals

`#FFFFFF` (page + card bg, dominant) · `#F9FAFB` (gray-50, alternating section tint) · `#475569` / `#94A3B8` (slate-600/400, secondary text) · `#1E293B` (slate-800)

### Semantic

`#059669` green (success/trust) · `#EF4343` red (errors — 2 uses) · `#2563EB` blue, `#EC4899` pink, `#8B5CF6` violet, `#F59E0B` orange — these five appear 2× each and are **category/icon accents only**, never UI chrome.

---

## Typography

**One family: Inter** (`var(--font-inter)`, `next/font`). 898 of ~966 rendered elements use it. No secondary face — do not add one.

### Scale as rendered at 1440px

| Level | Size | Weight | Line height | Color |
|---|---|---|---|---|
| h1 | 60px | 600 | 1.08 (`leading-[1.08]`) | white (sits on dark hero) |
| h2 | 36px | 600 | 1.1 | `#0A2540` |
| h3 | 16–20px | 600–800 | 1.5 | `#0A2540` |
| Body | 16px | 400 | 24px (1.5) | `#0A2342` |
| Small | 14px | 400 | — | slate-600 |
| Micro | 12px | 400–600 | — | slate-400 |

Size frequency: 16px (577) ≫ 14px (172) ≫ 12px (125) ≫ 36px (6) ≫ 20px (4) ≫ 60px (2). **Six sizes carry the whole site** — a new size is a smell.

h1 uses `text-balance` and `tracking-tight`. Headings are `font-semibold` (600), not bold — the one exception is the intro splash (below).

### Intro splash is exempt

`components/IntroAnimation.tsx` renders an h2 (`.i-title` inside `.i-mid`) at **72px / weight 800** — larger and heavier than the h1. This is intentional: it's a full-screen overlay shown once per session, never on-page alongside the h1. **Do not report this as an inverted heading hierarchy.**

---

## Shape & depth

| Token | Value | Where |
|---|---|---|
| Pill | `9999px` | 45 uses — trust chips, tags, CTA buttons. The dominant shape. |
| `--radius` (lg) | `12px` (0.75rem) | Cards, panels |
| md | `10px` | Nav items, inputs (39 uses) |
| Large card | `16px` | Product/section cards (39 uses) |

Shadows are soft and low-contrast — used for card lift only, never for emphasis. No hard/colored shadows.

---

## Layout & spacing

- Container: **centered, `1rem` padding, max `1320px`** at `2xl` (`tailwind.config.ts` → `theme.container`).
- Vertical rhythm is Tailwind's default 4px scale. Section padding is generous — this reads as a premium/trust site, not a dense one.
- `@/` alias resolves to project root.

### Mobile (390×844) — non-negotiable

Mobile is the majority of this site's traffic. These are deliberate, not bugs:

- **Footer**: `grid-cols-2` on mobile, map `hidden md:block`
- **Products subtypes**: `-mx-4 px-4 overflow-x-auto snap-x` horizontal scroll on mobile → grid at `lg:`

Always review 390×844 alongside desktop.

---

## Motion

- `marquee` — 40s linear infinite, `translateX(-50%)` on a doubled array (Testimonials). Pauses on hover.
- `accordion-down` / `accordion-up` — 0.2s ease-out.
- Framer Motion for section reveals; below-fold sections are `dynamic()` imported.
- Intro animation: once per session via `sessionStorage['htp-intro-seen']`.

Motion is restrained and functional. No decorative parallax, no scroll-jacking.

---

## Known drift (accepted — don't re-report)

1. **Two navies.** `--foreground` in `app/globals.css` is `213 73% 15%` = `#0A2342`, but `brand.DEFAULT` is `#0A2540`. They differ by 2 in the blue channel — visually identical, technically two tokens. Body text renders `#0A2342`; headings that use `text-brand` render `#0A2540`. Worth unifying eventually; not a visual defect today.
2. **Ad-hoc category accents.** The five 2×-use hues (blue/pink/violet/green/orange) aren't in `tailwind.config.ts` — they're inline utility classes on category icons.

---

## Hard constraints (from `CLAUDE.md` — these outrank taste)

1. **Warranty phrasing.** Only `"Bảo hành theo kỳ hạn tiêu chuẩn của nhà sản xuất"`. Never a year count, anywhere — including any copy a design fix touches. If a fix needs warranty text, stop and ask.
2. **Brand constants** come from `lib/site-data.ts` (`SITE.*`). Never hardcode brand, hotlines, address, email, founding year in a component.
3. **`id="page-root"`** must stay on the homepage root — `IntroAnimation` reads it for the zoom effect.
4. Founding year is **2005**; experience is **21+ năm** (2026).
