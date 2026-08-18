# Satwik Rudra — Portfolio

Personal portfolio site. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + GSAP.

Visual language, palette, and motion system are modelled on [heynesh.com](https://heynesh.com):
sand/black/electric-yellow palette, oversized display type, masked line reveals,
clip-path wipes, a stacked-card scroll timeline, and Lenis smooth scrolling.

---

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build && npm start   # production
```

### Dev flag

Append `?nomotion=1` to any URL to render every section in its final state with
animations disabled — useful for checking layout or taking screenshots.

---

## Before you launch — things only you can fill in

| # | What | Where |
|---|------|-------|
| 1 | **Your portrait** — run `./scripts/make-portrait.sh <headshot>` | writes `public/assets/portrait.png` |
| 2 | **Google Play URL** for Atelier AI | `src/lib/content.ts` → `projects.items[0].links` |
| 3 | **LinkedIn / GitHub URLs** — currently guessed | `src/lib/content.ts` → `socials` |
| 4 | **Live domain** — used for SEO metadata and Open Graph | `src/lib/content.ts` → `site.url` |
| 5 | **Hero stat numbers** — currently "5+ years", "4 teams" | `src/lib/content.ts` → `hero.stats` |

The hero composition is built around the portrait sitting in front of the giant
wordmark. Until `portrait.png` exists you'll see a silhouette placeholder with an
"add portrait.png" chip — that's expected, not a bug.

### Making the portrait

```bash
./scripts/make-portrait.sh ~/Desktop/headshot.jpg
```

Removes the background using the macOS Vision framework (no external service or
API key), trims to the subject, and composes it on a transparent 1200×1600
canvas, bottom-anchored to match how `Hero.tsx` renders it. If Vision can't find
a subject it falls back to keying out a flat studio background.

Re-run it any time you change photos.

---

## Editing content

**All copy lives in [`src/lib/content.ts`](src/lib/content.ts).** No component has
hard-coded text. To change anything on the page, edit that one file.

### Adding a personal project

Push another object into `projects.items`:

```ts
{
  slug: "my-project",
  name: "My Project",
  tagline: "One-line descriptor",
  year: "2026",
  status: "Live",              // renders as the yellow pill
  body: "What it is and what you did.",
  role: "Design, Engineering",
  tags: ["React Native", "AI"],
  icon: "/assets/my-project/icon.png",
  shots: ["/assets/my-project/shot-01.png"],   // phone screenshots, any count
  links: [{ label: "App Store", href: "https://..." }],
}
```

Links with an empty `href` are filtered out automatically, so you can leave a
store link blank until the app is published.

---

## Structure

```
scripts/
  make-portrait.sh  headshot -> transparent, framed public/assets/portrait.png
  cutout.swift      macOS Vision subject cutout (compiled on first run)
  frame_portrait.py trims + composes onto the hero canvas
src/
  app/
    layout.tsx        fonts, SEO metadata, smooth-scroll provider
    page.tsx          section composition order
    globals.css       design tokens, type scale, component classes
  components/
    Hero.tsx          wordmark + portrait + scroll-scrubbed parallax
    Statement.tsx     big type beat + tech-stack marquee
    Journey.tsx       stacked-card timeline ('19 → '26)
    Work.tsx          professional experience, sticky heading
    Projects.tsx      personal projects (Atelier AI)
    Capabilities.tsx  oversized "What I Do?" + capability rows
    CTA.tsx           contact block
    FAQ.tsx           accordion
    Footer.tsx        nav, socials, wordmark sign-off
    SmoothScroll.tsx  Lenis + GSAP ScrollTrigger wiring
    ui/Anim.tsx       SplitLines / Rise / Wipe / Counter primitives
  lib/
    content.ts        >>> ALL SITE COPY <<<
    gsap.ts           plugin registration + shared easing vocabulary
```

## Design tokens

Defined as Tailwind v4 `@theme` variables in `src/app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `sand` | `#d5cfbe` | page background |
| `sand-2` / `sand-3` | `#e0dfc5` / `#ebeada` | section + card backgrounds |
| `yellow` | `#ffff23` | accent, wordmark, hover states |
| `ink` | `#000000` | dark sections, text |
| `cream` | `#f8f7f3` | text on dark |

## Typography

Open-licence stand-ins for the reference site's commercial faces:

- **Archivo** (display) — headings, wordmark, numerals
- **Geist Sans** (body) — interface and paragraph text

To swap in licensed fonts later, drop the `.woff2` files in `public/fonts/`,
declare them with `next/font/local` in `src/app/layout.tsx`, and point the
`--font-display` / `--font-sans` tokens at them.

## Motion

Vocabulary defined in `src/lib/gsap.ts` and applied via `src/components/ui/Anim.tsx`:

- `SplitLines` — text split to lines, masked, swept up (`yPercent 110 → 0`, 0.1s stagger, `expo.out`)
- `Rise` — `y 10% + scale + opacity` settle for cards and media
- `Wipe` — `clip-path inset(100% 0 0 0) → inset(0)` image reveal
- `Counter` — numerals count up on enter

All motion is disabled under `prefers-reduced-motion` and behind `?nomotion=1`.

## Deploying (GitHub Pages)

The site builds to a fully static export (`output: "export"` → `./out`) and is
deployed by [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) on
every push to the `port-v2` branch.

**One-time setup in the repo:** Settings → Pages → Source → **GitHub Actions**.

Live URL: `https://ssyo5540.github.io/satwik-rudra-portfolio/`

### The basePath gotcha

Pages serves this as a *project* page, so everything lives under
`/satwik-rudra-portfolio` rather than the domain root. CI sets
`NEXT_PUBLIC_BASE_PATH=/satwik-rudra-portfolio`, which feeds `basePath` and
`assetPrefix` in `next.config.ts`. It is deliberately empty locally so
`npm run dev` still serves from `http://localhost:3000/`.

Because the export sets `images.unoptimized`, **`next/image` does not rewrite
asset URLs for basePath** — raw paths would 404 in production. Any public asset
referenced by path must go through the `asset()` helper:

```ts
import { asset } from "@/lib/asset";
<Image src={asset("/assets/foo.png")} … />
```

`public/.nojekyll` stops GitHub stripping the `_next` directory.

### Moving to a custom domain later

1. Drop the `NEXT_PUBLIC_BASE_PATH` env line from the workflow (root-served, no prefix).
2. Add `public/CNAME` containing the domain.
3. Point the DNS at GitHub Pages, and update `site.url` in `src/lib/content.ts`.

### Verifying a build locally the way CI does

```bash
NEXT_PUBLIC_BASE_PATH=/satwik-rudra-portfolio npm run build
npx serve out   # or serve it under a matching sub-path
```
