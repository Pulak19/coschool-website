# CoSchool Landing Page

Production-ready React landing page built pixel-perfect from Figma (project `0DoG6IHA79fWK0BFQZrskJ`).

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output → dist/
npm run preview   # preview production build
```

## Stack

| Layer      | Choice                       |
|------------|------------------------------|
| Framework  | React 18 + Vite 5            |
| Styling    | CSS Modules + CSS Variables  |
| Fonts      | Google Fonts (Roboto Serif, Open Sans, Poppins) |
| Animations | Vanilla JS (RAF + IntersectionObserver) |

## Project Structure

```
src/
├── theme.css              ← All design tokens (colors, fonts, spacing)
├── index.css              ← Reset + global utilities
├── App.jsx                ← Root layout
└── components/
    ├── Nav/               ← Responsive header (hamburger on mobile, links on desktop)
    ├── Hero/              ← Screen 1: video, logo carousel, CTA
    ├── LoopSequence/      ← Screen 2a–2f: sticky scroll-driven sequence
    ├── HowItWorks/        ← Screen 3: "Closes the learning loop" + persona sections
    ├── CardsStack/        ← Screen 4 top: 5 horizontally scrollable cards
    ├── Founders/          ← Screen 4 bottom: founders + partners
    ├── CTASection/        ← Screen 5: "Book your Demo" + quote
    └── Footer/            ← Dark footer
```

## Before Going Live — Required Asset Replacements

All images currently reference `http://localhost:3845/assets/...` (Figma local server).
Replace with actual production assets:

| Asset                         | Location                          |
|-------------------------------|-----------------------------------|
| Intro video                   | `Hero.jsx` — uncomment `<source>` |
| Product walkthrough video     | `CTASection.jsx` — uncomment `<source>` |
| Partner logos (Screen 4)      | `Founders.jsx` — `PARTNERS` array `src` fields |
| All image assets              | Copy from Figma export, update `src` props |

### Exporting from Figma

1. Select each frame/component in Figma
2. In the right panel → Export → PNG (2×) for photos, SVG for icons/logos
3. Place in `public/assets/` and update `src` paths in components

## Responsive Breakpoints

| Breakpoint | Width    | Notes                          |
|------------|----------|--------------------------------|
| Mobile     | 375px+   | Single column, as per Figma    |
| Tablet     | 768px+   | Wider padding                  |
| Desktop    | 1024px+  | 2-column hero, nav links visible |
| Wide       | 1440px   | Max content width              |

## LoopSequence — Scroll Animation

- **Section height**: `600vh` (6 states × 100vh each)
- **Sticky content**: `position: sticky; top: 0; height: 100svh`
- **State mapping**: scroll progress `[0..1]` → state index `[0..5]`
- **State 2f (index 5)**: circle centers, replay button appears
- **Replay**: cycles nodes 1→5 at 700ms intervals, then returns to idle
- **Reduced motion**: all transitions collapse to 0ms

## Performance Notes

- All off-screen images use `loading="lazy"`
- Hero video poster preloaded via `<link rel="preload">`
- Logo carousel uses pure CSS `transform` animation (GPU accelerated)
- Scroll handler uses `requestAnimationFrame` + passive listener
- `IntersectionObserver` used for all fade-in animations

## QA Checklist

### Visual
- [ ] Desktop (1440px): 2-column hero, nav links visible
- [ ] Tablet (1024px): 2-column hero, nav links visible
- [ ] Mobile (375px): single column, hamburger nav, matches Figma exactly
- [ ] Button hover: scale 1.05, border #ABE881, text #ABE881, green shadow
- [ ] Logo carousel: infinite scroll, pauses on hover

### LoopSequence
- [ ] Scroll through 6 states — illustration, number, caption update at each 1/6
- [ ] State 2f: circle centers on screen, replay button visible
- [ ] Replay: nodes highlight 1→5 in sequence, each 700ms apart
- [ ] Keyboard replay: Enter/Space triggers replay
- [ ] Reduced motion: instant transitions

### Video
- [ ] Hero video autoplays muted/looped on load (desktop, tablet)
- [ ] Safari iOS: fallback poster visible if autoplay blocked
- [ ] Play button toggles playback

### Accessibility
- [ ] All interactive elements keyboard-focusable
- [ ] Focus rings visible (brand green outline)
- [ ] Carousel has `aria-label`, cards have `role="listitem"`
- [ ] `aria-live` region on LoopSequence content area
- [ ] Color contrast ≥ 4.5:1 for all body text

### Performance
- [ ] Lighthouse Desktop Performance > 90
- [ ] No layout shift during carousel animation
- [ ] Scroll handler debounced via `requestAnimationFrame`
