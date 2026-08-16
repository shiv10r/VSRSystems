# Chart-Forward Home Page — Design

**Date:** 2026-08-16
**Status:** Approved (Approach B — "keep the animation no matter what changes")
**Scope:** Home page only. Inner pages (services, company, industries, insights, contact) follow later.

## Problem

On mobile (grids collapse to 1 column at ≤680px), the home page reads as an endless article of stacked paragraph blocks — "only to read, no cards." The most text-dense sections are `OperatingModel`, `BusinessOfferings`, `DeliveryProcess`, `Intro`, `StoryPanel`, and `Advantage`.

## Goal

Explain the same content with graphs/charts instead of paragraphs, cut visible word count by ~40–50%, and keep **every existing animation** exactly as-is. Visuals render inside card frames with big numbers/icons so mobile still feels like cards, not text.

## Design

### 1. Text reduction pass
- Shorten every description in `src/data/content.ts` and `src/data/story.ts`.
- Drop or shorten SectionHeading subtitles that restate the title.
- Target 40–50% fewer words in visible copy. No meaning lost.

### 2. OperatingModel → animated phase-flow diagram
- Replace the 4 cards (Input/Output/Controls lists) with an SVG flow diagram.
- Desktop: horizontal 4-node flow `Discover → Design → Build → Operate`, nodes connected by draw-on-scroll lines with the existing moving-packet motif (reuse service-network motion language).
- Each node: phase number + title, 3 compact control chips (1–2 words each).
- Mobile: same diagram, flows vertically, still animated.

### 3. DeliveryProcess → animated stepper
- Replace the 6 numbered paragraphs with a stepper visual.
- Desktop: horizontal line with 6 nodes, each an icon + short title + one-line description.
- Mobile: vertical stepper with animated connecting line.
- Existing Reveal/draw animations preserved.

### 4. BusinessOfferings → Launch→Scale→Transform chart
- **Stage offerings:** ascending bars/pyramid — Launch base → Scale middle → Transform top — with capability chips instead of paragraph + 4-bullet lists.
- **Engagement models:** ownership-spectrum bar — 6 models positioned along one horizontal axis (Discovery sprint → Outcome-based program) instead of 6 text cards.
- **Strategic enablers:** keep compact cards, shorten text, code badges (R-MVP / PF / DAE) as the visual anchor.

### 5. Advantage → visual instead of bullet list
- Replace the 6-point text list with a compact check-grid — icon + 2-word label per point, no sentences.
- Keep the DISCOVER/ENGINEER/OPERATE diagram.

### 6. MilestonesStory / Intro / StoryPanel
- MilestonesStory already has the SVG network chart — kept as-is (already "graph over text").
- Intro + StoryPanel paragraphs trimmed to 1 sentence.

## Mobile treatment

- Every new chart renders inside a bordered, rounded card frame with big numbers/icons.
- All SVGs responsive via `viewBox`; no horizontal scroll; `min-height: auto` at mobile widths.

## Files touched

- `src/data/story.ts` — chart data (flow steps, stepper steps, spectrum positions)
- `src/data/content.ts` — trimmed copy
- `src/components/home/OperatingModel.tsx` — rewrite
- `src/components/home/HomeSecondary.tsx` — DeliveryProcess rewrite
- `src/components/home/BusinessOfferings.tsx` — rewrite
- `src/components/home/HomePrimary.tsx` — Advantage rewrite; Intro + StoryPanel copy trims (these sections live in this file)
- `src/styles/operations.css`, `story.css`, `pages.css` — chart styles

## Constraints

- **Animations are non-negotiable.** Motion code (`motion.css`, `framer-motion` usage, Reveal, draw-on-scroll, packets, orbit) is preserved untouched. Only content presentation changes.
- No new dependencies — hand-built SVG only.
- Honor `prefers-reduced-motion` (existing pattern via `useReducedMotion`).
- Follow existing component/CSS patterns (Reveal, SectionHeading, TiltCard, surface classes, CSS custom properties).

## Out of scope

- Inner pages, contact form, header/footer, MilestonesStory SVG network, any motion behavior change.
