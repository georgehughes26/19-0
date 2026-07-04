---
name: 19-0
description: A fan-made cricket draft-and-simulation game with a live broadcast aesthetic
colors:
  scoreboard-gold: "#f9c846"
  scoreboard-orange: "#f97316"
  hero-rose: "#e11d48"
  ink-black: "#0d0d12"
  panel-black: "#111118"
  void-black: "#0a0a0f"
  card-navy: "#0d0d18"
  surface-navy: "#13131f"
  border-subtle: "#1a1a24"
  border-strong: "#252535"
  text-primary: "#ffffff"
  text-body: "#c0c0d8"
  text-muted: "#9090a8"
  text-faint: "#6060a0"
  text-dim: "#606070"
  win-green: "#4ade80"
  loss-red: "#f87171"
  draw-amber: "#fbbf24"
  info-blue: "#60a5fa"
  allrounder-purple: "#c084fc"
  text-highlight: "#e0e0f0"
  text-muted-alt: "#606080"
  border-muted: "#2a2a50"
  text-secondary: "#8080c0"
  fallback-gray: "#aaaaaa"
  loss-tint-bg: "#1a1010"
  loss-tint-border: "#4a2020"
  perf-over-label: "#6fae82"
  perf-met-label: "#9a9ad4"
  perf-under-label: "#d99860"
  info-tint-bg: "#0a1420"
  info-tint-border: "#1a4060"
  info-tint-text-dim: "#6090b8"
typography:
  display:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 10vw, 86px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-4px"
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "10px"
    fontWeight: 800
    letterSpacing: "2px"
rounded:
  sm: "5px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  xxl: "14px"
  pill: "20px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.scoreboard-gold}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.md}"
    padding: "16px 52px"
  button-primary-hover:
    backgroundColor: "{colors.scoreboard-gold}"
    textColor: "{colors.ink-black}"
  chip-mode:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.lg}"
    padding: "14px 10px"
  chip-mode-active:
    backgroundColor: "{colors.card-navy}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
  card-stat:
    backgroundColor: "{colors.surface-navy}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.xl}"
    padding: "11px 13px"
  card-mvp:
    backgroundColor: "{colors.card-navy}"
    textColor: "{colors.scoreboard-gold}"
    rounded: "{rounded.xl}"
    padding: "11px 13px"
---

# Design System: 19-0

## 1. Overview

**Creative North Star: "The Night Broadcast"**

19-0 looks like a live cricket broadcast graphics package running at night — a near-black studio backdrop lit only by scoreboard gold and orange, the way a stadium floodlight cuts through darkness onto the one thing that matters: the number on the board. Every screen borrows this logic. Panels sit on ink-black surfaces with barely-there borders; nothing competes for attention until a rating, a result, or a call-to-action needs to glow.

This system explicitly rejects the generic SaaS/dashboard look — no cream or beige neutrals, no identical flat card grids, no tiny uppercase tracked eyebrows scaffolding every section, no gradient-text headings used as a decorative crutch (the one exception, the "19-0" hero wordmark, is a grandfathered brand asset, not a pattern to repeat elsewhere). It also rejects the stiff, overly official tone of a real governing body's site — this is a scrappy fan broadcast, not a corporate one.

**Key Characteristics:**
- Near-black studio backdrop; light comes from content, not chrome
- Gold-to-orange gradient reserved for the primary action and the brand wordmark only
- Flat, borderless-feeling panels distinguished by faint 1px borders, not shadows
- Color carries meaning first (green=win, red=loss, amber=draw, gold=rating) and decoration second

## 2. Colors

The palette is almost monochrome by default — a stack of near-black surfaces and muted blue-grey text — so that the gold/orange accent and the semantic result colors (win/loss/draw) read instantly against it.

### Primary
- **Scoreboard Gold** (#f9c846): The color of the thing that matters — primary CTAs, ratings, MVP highlights, active states. Always paired with `#0f0f13` ink-black text for contrast, never gold text on dark.
- **Scoreboard Orange** (#f97316): Never used alone; always the second stop in the gold→orange gradient on buttons, hero text, and glow effects.

### Tertiary
- **Hero Rose** (#e11d48): Third stop in the "19-0" wordmark gradient only. Not used elsewhere as a standalone color.

### Neutral
- **Ink Black** (#0d0d12): The base app background.
- **Panel Black** (#111118): Elevated panel backgrounds (mode chips, table rows).
- **Void Black** (#0a0a0f): Deepest recess — table headers, innings headers, the darkest layer in the stack.
- **Card Navy** (#0d0d18): Card and settings-block surfaces; slightly warmer than pure ink.
- **Surface Navy** (#13131f): Stat cards, MVP card base — one step up in perceived elevation from Card Navy.
- **Border Subtle** (#1a1a24): The default 1px border on almost every panel.
- **Border Strong** (#252535): Used when a border needs to read as a real edge (input fields, settings blocks).
- **Text Primary** (#ffffff): Headlines, player names, key numbers.
- **Text Body** (#c0c0d8): Standard body copy, table values.
- **Text Muted** (#9090a8): Secondary labels, sub-headings.
- **Text Faint** (#6060a0): Tertiary meta text (dates, small stats, timestamps).
- **Text Dim** (#606070): The dimmest readable layer — section eyebrows, table header labels.

### Semantic (result colors)
- **Win Green** (#4ade80): Wins, positive form, "Overperformed".
- **Loss Red** (#f87171): Losses, negative form, "Underperformed".
- **Draw Amber** (#fbbf24): Draws, "Expected"/neutral verdicts.
- **Info Blue** (#60a5fa): Bowling figures, informational stat callouts.
- **Allrounder Purple** (#c084fc): Reserved specifically for all-rounder role badges — the one role-specific color in the system.

### Reconciled tokens (season review + share card)
Added after a `/impeccable critique` pass found these already in production use but undocumented, plus three new contrast-driven fixes:
- **Text Highlight** (#e0e0f0), **Text Muted Alt** (#606080), **Border Muted** (#2a2a50), **Text Secondary** (#8080c0), **Fallback Gray** (#aaaaaa): secondary text/border tones used in the season-review perf-card and share-card builders.
- **Loss Tint Bg** (#1a1010) / **Loss Tint Border** (#4a2020): the dark red-tinted background/border pairing for a below-target ("Eliminated in Group Stage") share-card finish badge.
- **Perf Over/Met/Under Label** (#6fae82 / #9a9ad4 / #d99860): brightened replacements for the original `.perf-label` colors (#4a7a5a / #6868a0 / #8a5030), which measured under 3.6:1 contrast against their card backgrounds. These pass ≥4.5:1 while keeping the same green/indigo/orange hue coding.
- **Info Tint Bg** (#0a1420) / **Info Tint Border** (#1a4060) / **Info Tint Text Dim** (#6090b8): the dark blue-tinted background/border/secondary-text set for the "Continue Saved Game" resume affordance on the Test Cricket home tab, tonally paired with Info Blue the same way Loss Tint pairs with Loss Red. The text-dim value was brightened from an initial #406080 (~2.8:1) to #6090b8 (~5.4:1) to clear WCAG AA for the saved-date caption.

### Named Rules
**The Floodlight Rule.** Gold/orange never covers more than the CTA, the wordmark, or a single highlighted stat at a time. If more than one element on screen is glowing gold, the hierarchy has broken down.

## 3. Typography

**Display/Body Font:** system-ui, -apple-system, sans-serif (single system-font stack throughout; no webfont loading)

**Character:** One typeface family doing every job — the system relies on weight, size, and letter-spacing (not font pairing) to create hierarchy, which keeps the broadcast-graphics feel snappy and avoids any hint of "designed brochure."

### Hierarchy
- **Display** (800 weight, `clamp(2.5rem, 10vw, 86px)`, line-height 1, letter-spacing -4px): The "19-0" wordmark only. Rendered with the gold→orange→rose gradient via `background-clip: text`.
- **Headline** (900 weight, 20–28px): Screen titles, match results, season-review headlines.
- **Title** (800 weight, 13–16px): Card titles, player names, section headers.
- **Body** (400–700 weight, 12–15px, line-height 1.6–1.8): Descriptive copy, stat rows, quotes.
- **Label** (800 weight, 9–11px, letter-spacing 1.5–3px, uppercase): Eyebrows, table headers, stat-card labels — always dim (`Text Dim` or `Text Faint`), never full white.

### Named Rules
**The Broadcast Caps Rule.** Uppercase, tracked, dim labels are for metadata only (table headers, stat captions). The moment a label needs to carry real information, it drops to sentence case at full body weight.

## 4. Elevation

Flat by default — this system has no shadow vocabulary at all. Depth is conveyed entirely through tonal layering: each "step up" in perceived elevation is a slightly lighter navy/black (Ink Black → Card Navy → Surface Navy → Panel Black), bordered with a 1px line rather than a drop shadow. The one exception is the MVP card's shimmer sweep and glisten glow, which stands in for elevation by using light (a moving highlight and a soft color-pulse) instead of a shadow.

### Named Rules
**The Flat-Studio Rule.** No `box-shadow` for structural depth, ever. If a component needs to feel "lifted," lighten its background one tonal step and/or brighten its border — don't reach for a shadow.

## 5. Components

Tactile scoreboard panels: dark rectangular segments with thin borders that light up gold when active, exactly like individual scoreboard segments switching on.

### Buttons
- **Shape:** 8px radius (`.btn-start`), slightly tighter than cards
- **Primary:** Gold→orange gradient background (`linear-gradient(135deg, #f9c846, #f97316)`), ink-black (#0f0f13) text, 16px/52px padding, 800 weight
- **Hover / Active:** Hover drops opacity to 0.88; active applies `transform: scale(0.97)` for tactile press feedback
- **Secondary/Ghost:** Card Navy background, Border Strong (#2a2a50-family) border, Text Faint label — used for "Back to Home"-style de-emphasized actions

### Chips (mode selector, pills)
- **Style:** Panel Black background, Border Subtle border, Text Muted label at rest
- **Active state:** Card Navy→Ink Black gradient background, Border shifts to a saturated indigo (#4040a0), text goes full white
- **Result pills** (Won/Lost): Win Green or Loss Red text on a matching dark-tinted background (`#0a2a0a` / `#2a0a0a`)

### Cards / Containers
- **Corner Style:** 12px radius standard (`.stat-card`, `.perf-card`), 14px for larger settings blocks
- **Background:** Surface Navy (stat cards) or Card Navy (settings, squad list), one tonal step above the page background
- **Shadow Strategy:** None — see Elevation
- **Border:** 1px Border Subtle by default; MVP card upgrades to a gold border (#b8922a) plus the shimmer/glisten treatment
- **Internal Padding:** 11–16px depending on density

### Inputs / Fields
- **Style:** Card Navy background, Border Strong (#252535) border, centered text, 8px radius
- **Focus:** Border shifts to saturated indigo (#4040a0); no glow/shadow, just the border-color change

### Navigation (mode selector)
- Three equal-width flex chips at the top of the home screen; icon + uppercase label stacked vertically; active chip gets the indigo border + gradient fill treatment described above. No hover states needed on touch, but `:active` scale feedback applies.

### Signature Component: Season Review Reveal
The end-of-run recap is the system's showcase component: sections (stat cards, MVP, performance verdict, match history, squad list) reveal in sequence as the user scrolls, each with its own entrance treatment (pop-in, stagger, count-up numbers) rather than one uniform fade — see `reference/animate.md`-style motion principles already implemented in `index.html`.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Scoreboard Gold (#f9c846) for the single most important element on any given screen — a CTA, a rating, an MVP badge.
- **Do** build depth with tonal steps (Ink Black → Card Navy → Surface Navy → Panel Black) and 1px borders, never with `box-shadow`.
- **Do** use the semantic result colors consistently: green = win/positive, red = loss/negative, amber = draw/neutral, exactly as already used across match summaries and season reviews.
- **Do** keep every core interaction (draft, pick XI, sim, result) usable one-handed on mobile, per PRODUCT.md's "One thumb, no friction" principle.
- **Do** gate all animation behind `prefers-reduced-motion`, matching the pattern already built into the season-review and home-screen entrance sequences.

### Don't:
- **Don't** introduce cream, beige, or any warm-neutral background — this is a near-black system, full stop.
- **Don't** add new gradient-text treatments beyond the existing "19-0" wordmark; it's a grandfathered exception, not a precedent.
- **Don't** add tiny uppercase tracked eyebrows above every new section "because landing pages do this" — reserve that treatment for table headers and stat labels only.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on cards or list rows.
- **Don't** reach for identical repeating card grids; vary layout by content type as the existing screens already do (tables, stat cards, squad lists, and match-recap rows all look different from each other on purpose).
- **Don't** add `box-shadow`-based elevation; tonal layering and borders are the only depth language this system uses.
