# Design Notes — Figma → Component Mapping

## Style Sheet (Figma node 4:80)

| Token          | Value                     | CSS Variable             |
|----------------|---------------------------|--------------------------|
| Brand          | `#73B462`                 | `--color-brand`          |
| Brand Light    | `#ABE881`                 | `--color-brand-light`    |
| Brand Stroke   | `#DCE9D3`                 | `--color-brand-stroke`   |
| Foreground 1   | `#3C3D3C`                 | `--color-fg-1`           |
| Foreground 2   | `#434C3D`                 | `--color-fg-2`           |
| Header Font    | Roboto Serif Light 34px   | `--font-header`          |
| Subheader Font | Open Sans Bold 20px       | `--size-subheader`       |
| Body Font      | Open Sans Regular 15px    | `--size-body`            |

## Figma Frames → Components

| Figma Frame | Node ID | Component         | Notes |
|-------------|---------|-------------------|-------|
| Screen 1    | 1:828   | `Hero`            | Mobile frame; desktop layout extrapolated |
| Screen 2a   | 4:34    | `LoopSequence`    | State 0 (stateIdx=0) |
| Screen 2b   | 6:139   | `LoopSequence`    | State 1 |
| Screen 2c   | 6:244   | `LoopSequence`    | State 2 |
| Screen 2d   | 6:346   | `LoopSequence`    | State 3 |
| Screen 2e   | 6:415   | `LoopSequence`    | State 4 |
| Screen 2f   | 6:515   | `LoopSequence`    | State 5 (final — full circle + replay) |
| Screen 3    | 6:487   | `HowItWorks`      | Very tall frame (~3300px); 4 persona sub-sections |
| Screen 4    | 8:32    | `CardsStack` + `Founders` | Split into two components |
| Screen 5    | 8:1254  | `CTASection` + `Footer` | CTA + quote + footer |
| Style Sheet | 4:80    | `theme.css`       | All design tokens |

## Loop Circle Node Positions

Derived from Figma node 6:515 (Screen 2f), ellipse container 6:535 (365×355px):

| Node | Step | SVG x | SVG y | Clock position |
|------|------|-------|-------|----------------|
| 1    | 1    | 23    | 200   | 9 o'clock (left) |
| 2    | 2    | 147   | 369   | 7 o'clock (bottom-left) |
| 3    | 3    | 336   | 313   | 5 o'clock (bottom-right) |
| 4    | 4    | 355   | 114   | 1 o'clock (top-right) |
| 5    | 5    | 141   | 33    | 11 o'clock (top-left) |

SVG viewBox: `0 0 400 400`, circle center: `(200, 200)`, radius: `177px`.

## Known Issues / Open Items

1. **Card 4 title**: Figma has "Curriculum-Aligned & Safe" for Card 4 (same as Card 1). Updated to "Real-Time Learning Signals" in code — confirm with designer.

2. **Screen 3 body text**: "Student's AI tutor", "Parent's Confidant", "Admin's Insights" sections had placeholder body copy in Figma ("Set goals, unlocks chapters..."). Updated with descriptive copy — confirm with copywriter.

3. **Partner logos**: Figma did not export partner logo assets (Arise, CEO Clubs India, NEP 2020). Placeholder boxes rendered; replace with actual assets in `Founders.jsx`.

4. **Video sources**: No video files provided. `<source>` tags are commented out. Add actual MP4 files and uncomment.

5. **Desktop layout**: Figma frames are mobile-only (393px). Desktop 2-column layouts extrapolated based on standard landing page conventions. Review at 1440px and adjust.

## Button Hover Spec (from Style Sheet node 4:96)

```
Rest state:
  background: linear-gradient(110.52deg, rgba(0,0,0,0.96) 7.97%, rgba(39,39,39,0.96) 97.89%)
  border: 1px solid #FFFFFF
  text: #FFFFFF

Hover state:
  background: (same gradient)
  border: 1px solid #ABE881
  text: #ABE881
  box-shadow: 0px 2px 24px 0px rgba(171,232,129,0.3)
  transform: scale(1.05)
  transition: 180ms ease-in-out
```
