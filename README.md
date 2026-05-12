# Hưng Thành Phát Door — SPA

Production-ready single-page marketing site for **Hưng Thành Phát Door**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui primitives, Framer Motion, Lucide React, React Hook Form and Zod.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product images

Drop the three required images into `public/products/`:

| Category | File |
| --- | --- |
| Cửa Cuốn | `image_f16476.jpg` |
| Cửa Nhôm Kính | `image_f16453.jpg` |
| Cửa Kéo | `image_f1641b.jpg` |

Recommended: 1600×1200 (4:3), optimized JPG/WebP.

## Structure

```
app/
  layout.tsx        Root layout, fonts, metadata, Toaster
  page.tsx          Single-page composition (Hero → About → Products → Gallery → Contact)
  globals.css       Tailwind + design tokens + utilities
components/
  sections/         Navbar, Hero, About, Products, Gallery, Contact, Footer
  ui/               shadcn-style primitives (button, input, textarea, sheet, toast, label)
lib/
  utils.ts          cn() helper
  site-data.ts      Brand, nav links, stats, products, gallery placeholders
```

## Highlights

- **Sticky glassmorphism Navbar** with `IntersectionObserver`-driven active-section state and `framer-motion` `layoutId` underline.
- **Mobile menu** uses a Radix-powered `Sheet` (slide-out from the right).
- **Hero** — animated headline, decorative grid + soft glows, trust chips, dual CTAs.
- **About** — 4 stat cards in a staggered grid plus 3 trust pillars.
- **Products** — 3 category cards with `next/image`, hover lift, and "Yêu cầu báo giá" CTA.
- **Gallery** — infinite, GPU-accelerated `framer-motion` marquee with edge fade-mask and pause-on-hover.
- **Contact** — `react-hook-form` + `zod` validation (Vietnamese phone regex), accessible errors, success Toast, `console.log` of submitted data.
- **WCAG AA** — visible focus rings, ARIA labels, `aria-invalid`/`aria-describedby` on form fields, semantic landmarks.

## Customization

- Brand colour lives in `tailwind.config.ts` under `colors.brand` (default `#0A2540`).
- Copy, hotline, address and stats are centralized in `lib/site-data.ts`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run built app |
| `npm run lint` | Lint with Next ESLint config |
