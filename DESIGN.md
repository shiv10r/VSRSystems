# VSR Systems Design System

## 0. Research Log

- Embedded references: shortlisted Stripe, Superhuman, and Runway; selected cinematic execution with Stripe-inspired chromatic depth because VSR needs enterprise precision without copying another brand.
- External product research, image generation, interaction catalogs, browser QA, and Lighthouse were skipped because project rules prohibit external access and local server/browser execution.

## 1. Atmosphere & Identity

VSR Systems feels like a calm engineering command center: dark, exact, dimensional, and confident without inflated claims. Its signature is the systems orbit, a luminous local SVG/CSS network that turns cloud, data, software, AI, and security into one connected visual language.

## 2. Color

| Role | Token | Value |
|---|---|---|
| Canvas | `--canvas` | `#050507` |
| Canvas raised | `--canvas-raised` | `#09090d` |
| Surface | `--surface` | `#0d0d14` |
| Surface strong | `--surface-strong` | `#13131d` |
| Text | `--text` | `#f7f7fb` |
| Text muted | `--text-muted` | `#a7a7b5` |
| Text quiet | `--text-quiet` | `#747483` |
| Border | `--border` | `rgba(255,255,255,.11)` |
| Cyan | `--cyan` | `#37d9f3` |
| Violet | `--violet` | `#8b6df6` |
| Magenta | `--magenta` | `#ed5fa9` |
| Blue | `--blue` | `#4b7df8` |
| Success | `--success` | `#32d583` |
| Error | `--error` | `#ff6b7a` |

The accent ramp is cyan to violet to magenta. It is reserved for focus, primary actions, active states, and focal artwork. Surfaces use tonal shifts, fine rims, inner sheen, and blue-violet shadows.

## 3. Typography

- Display: `Aptos Display`, `Segoe UI Variable Display`, `Segoe UI`, sans-serif.
- Body: `Aptos`, `Segoe UI Variable Text`, `Segoe UI`, sans-serif.
- Technical: `Cascadia Code`, `Consolas`, monospace.
- Display: `clamp(3rem, 7vw, 6rem)`, 650, line-height .98, tracking -.045em.
- Page title: `clamp(2.5rem, 5vw, 4.75rem)`, 650, line-height 1.02, tracking -.04em.
- Section title: `clamp(2rem, 4vw, 3.75rem)`, 620, line-height 1.05, tracking -.035em.
- Card title: `clamp(1.25rem, 2vw, 1.75rem)`, 600, line-height 1.15.
- Lead: `clamp(1.05rem, 1.7vw, 1.25rem)`, 400, line-height 1.65.
- Body: `1rem`, 400, line-height 1.65. Mobile form text never falls below `1rem`.
- Label: `.75rem`, 650, line-height 1.2, tracking .13em, uppercase.

## 4. Spacing & Layout

- Base unit: 4px.
- Tokens: `--s-1:4px`, `--s-2:8px`, `--s-3:12px`, `--s-4:16px`, `--s-5:20px`, `--s-6:24px`, `--s-8:32px`, `--s-10:40px`, `--s-12:48px`, `--s-16:64px`, `--s-20:80px`, `--s-24:96px`, `--s-32:128px`.
- Container: `min(100% - 32px, 1440px)`, increasing side gutters at tablet and desktop.
- Breakpoints: 640, 768, 1024, 1280, and 1536px.
- Radius: 12px controls, 20px cards, 28px feature surfaces, 999px only for compact status or CTA pills.
- Sections use `clamp(80px, 11vw, 160px)` vertical rhythm.
- Full-height compositions use `100svh` with `100dvh` support and never rely on fixed `100vh` alone.

## 5. Components

### Button
- Structure: link or button with label, optional Lucide icon, and focus ring.
- Variants: primary chromatic, secondary glass, text.
- States: default, hover lift, active press, focus-visible ring, disabled dim, loading label.
- Minimum touch target: 44px; 48px on mobile primary controls.

### SectionHeading
- Structure: optional eyebrow, heading, supporting copy.
- Variants: left, centered, split.
- Long copy remains readable at 200% zoom and 320px width.

### SurfaceCard And ServiceCard
- Structure: artwork, icon, title, copy, route link.
- States: tonal rest, chromatic rim and artwork scale on hover/focus, 2px active press.
- All information remains visible without hover.

### Header, DesktopNav, And MobileDrawer
- Sticky header with opaque fallback and enhanced blur when supported.
- Desktop dropdowns support pointer, keyboard, Escape, and focus transfer.
- Mobile drawer locks body scroll, scrolls internally, uses tap accordions, and closes after route navigation.

### FormField And ContactForm
- Visible labels, typed inputs, inline linked errors, focus ring, disabled submit, and persistent success/error panel.
- Netlify submission is primary; direct email is always visible.

### Reveal
- One-time opacity and translate reveal. Reduced motion renders immediately.

### MotionSection
- Shared section choreography with `rise`, `split`, `scale`, and `draw` variants.
- Coordinates heading, content, and one section-specific signal mechanism through viewport entry or scroll progress.
- All content remains rendered and readable before JavaScript enhancement and under reduced motion.

### SignalPath
- Reusable SVG path with a drawn line, traveling packet, and optional node pulse.
- Used to communicate delivery flow, service relationships, project progression, or operational feedback.
- Each section supplies its own geometry and labels; the mechanism is shared without cloning one composition.

### RouteTransition
- Crossfades and translates route content on location change while preserving keyboard focus and scroll restoration.
- Route heroes pair the transition with a restrained moving signal field.

### TechnologyMarquee
- Two duplicated rows for continuity, pause on hover/focus, and static wrapped list under reduced motion.

### HeroArtwork
- Local SVG/CSS systems orbit with luminous paths, layered glass nodes, and slow transform/opacity motion only.
- Static equivalent under reduced motion and on constrained devices.

### FloatingContact And RouteHero
- Floating contact respects safe-area insets and never covers form actions.
- Route hero uses breadcrumb, title, lead, and a restrained orbit fragment.

## 6. Motion & Interaction

- Micro: 140ms ease-out for press and icon movement.
- Standard: 240ms cubic-bezier(.2,.8,.2,1) for menus and state changes.
- Emphasis: 620ms cubic-bezier(.16,1,.3,1) for route/section entry.
- Spring: stiffness 260, damping 28, mass .8 for spatial Framer Motion transitions.
- Ambient system loops: 4.8-8s ease-in-out for telemetry pulses; 18-24s linear for orbital rotation.
- Cinematic section motion uses one prominent ambient mechanism per major section, scroll-linked construction for information flow, and spring feedback for interactive controls.
- Section mechanisms include signal packets, path drawing, node pulses, scanning light, orbital movement, and marquees; adjacent sections must not repeat the same composition.
- Scroll-linked movement uses Motion values and GPU-composited transforms rather than manual scroll listeners.
- Persistent loops remain limited to one primary visual system per section and pause when the section is outside the viewport.
- Animate only transform, opacity, and short filter fades. No layout-property animation.
- Reduced motion removes continuous orbit/marquee movement, scroll reveal displacement, and smooth scrolling.

## 7. Depth & Surface

Use a mixed chromatic-depth strategy: tonal surface separation, 1px translucent rims, inset top sheen, and layered blue-violet shadows. Elevated surfaces use `0 24px 80px rgba(30,20,80,.22), 0 8px 28px rgba(0,0,0,.38), inset 0 1px rgba(255,255,255,.08)`. Glass always has an opaque fallback before `backdrop-filter` enhancement.

## 8. Accessibility Constraints & Accepted Debt

Target WCAG 2.2 AA with 4.5:1 body contrast, 3:1 large text, semantic landmarks, ordered headings, keyboard reachability, visible focus, 44px touch targets, reduced motion, safe-area support, and no pinch-zoom restriction.

Personas:
- A time-poor technology leader must identify services and reach contact in under three clear decisions.
- A keyboard or screen-reader prospect must navigate menus, routes, and the contact form without pointer dependence.
- A motion-sensitive visitor in an embedded mobile WebView must receive a stable, readable, low-cost experience.

Accepted debt under explicit project rules:

| Item | Location | Reason | Exit |
|---|---|---|---|
| Browser and visual QA unverified | Entire site | Local servers and browser tests are prohibited | User runs deployed/manual QA |
| Lighthouse and runtime render profiling unverified | Production build | Browser execution is prohibited | Run after explicit future permission |
| Live Netlify form delivery unverified | Contact page | External deployment access is prohibited | Verify after user deploys |
| React runtime inspection tools omitted | Development entry | They require local runtime use that is prohibited | Add only after explicit future permission |
