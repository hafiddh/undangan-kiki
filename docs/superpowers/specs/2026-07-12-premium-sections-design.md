# Premium Sections & Ornaments — Design

Date: 2026-07-12
Status: Approved

## Problem

Inner invitation sections (Hero → Wishes) all sit on the same flat `bg-void`
near-black background. Result: monotone, "biasa", ornaments underused. The
Cover is already rich; the body is not.

## Goal

Make the body feel premium and give each section visual rhythm, while staying
in one gold-on-dark theme (not gaudy). Subtle & elegant effects. Reuse existing
webp ornaments plus new lightweight SVG ornaments.

## Decisions (locked)

- Background: **alternating tone + texture** (void ↔ warm panel, subtle grain/
  gold motif).
- Effects: **subtle & elegant** (parallax-lite, shimmer hairline, grain, slow
  ornament drift, refined reveal).
- Ornaments: **mix** — reuse webp for big accents + new SVG for dividers/frames.

## Components

### `components/Section.tsx` (new)

Wrapper replacing raw `Reveal` per section. Server component is fine (no state);
reuse the existing client `Reveal` inside for scroll animation.

Props:
- `id?: string` — anchor for BottomNav.
- `tone?: "void" | "panel"` (default `"void"`) — background tone.
- `texture?: boolean` — grain + faint gold motif overlay (panel tone only).
- `divider?: "svg" | "webp" | false` (default `"svg"`) — top separator ornament.
- `corner?: "vine" | "bunga" | false` (default `false`) — top-corner ornaments.
- `className?: string`, `children`.

Renders: outer `<section>` with tone bg + optional texture layer + optional
corner ornaments (parallax-lite via `drift`), an optional top divider, then the
`Reveal` wrapping children. Ornament layers are `pointer-events-none` +
`aria-hidden`.

### `components/Ornament.tsx` (extend)

New reusable gold SVG line-art (match existing stroke style `#d4af37`):
- `CornerVine({ className, flip })` — small delicate corner floral, lighter
  than existing `FloralCorner`.
- `SectionDivider({ className })` — ornate center-motif horizontal divider
  (upgrade of existing `Divider`), used at section tops.
- `MonogramFrame({ className })` — thin diamond/oval frame accent for Couple
  photos.

### `app/globals.css` (extend)

- `--panel-warm` bg token; `.tone-panel` / `.tone-void` helpers with layered
  `linear-gradient` + `radial-gradient` vignette.
- `.section-texture` — SVG data-uri fine-noise grain + faint repeating gold
  motif, low opacity.
- `.grain` — global film-grain overlay (fixed, low opacity, `pointer-events-none`).
- `.hairline-gold` — animated shimmer 1px border (reuse `shimmer-sweep`).
- `@keyframes drift` — slow float/parallax for corner ornaments.
- Refine `.reveal` — add slight `scale(0.98)` → `1` and blur-out.
- All new animations honored under `prefers-reduced-motion`.

## Page wiring (`app/page.tsx`)

Alternating rhythm:

| Section    | tone  | texture | divider | corner |
|------------|-------|---------|---------|--------|
| Hero       | void  | –       | svg     | –      |
| Quote      | panel | yes     | svg     | vine   |
| Couple     | void  | –       | svg     | –      |
| LoveStory  | panel | yes     | svg     | vine   |
| Gallery    | void  | –       | webp    | –      |
| Countdown  | panel | yes     | svg     | –      |
| Events     | void  | –       | svg     | bunga  |
| Rsvp       | panel | yes     | svg     | –      |
| Gift       | void  | –       | webp    | bunga  |
| Wishes     | panel | yes     | svg     | vine   |

Each section component swaps its inner `Reveal` for `Section` (or wraps). Global
`.grain` overlay added once in `app/layout.tsx` or `InvitationShell`.

## Reused webp

- `ornamen-atas.webp` — recurring section-top accent (webp divider variant).
- `pembatas-1.webp` — elegant divider variant.
- `bunga-kiri.webp` / `bunga-kanan.webp` — low-opacity side accents (Events, Gift).

## Non-goals

No data changes, no new heavy image assets, no palette change, no Cover redesign.

## Success

Scrolling the body shows clear tone alternation and ornament rhythm; feels
premium; no jank on mobile; reduced-motion respected; build passes.
