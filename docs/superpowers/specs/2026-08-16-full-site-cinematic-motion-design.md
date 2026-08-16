# Full-Site Cinematic Motion Design

## Problem

The previous motion rollout technically animates, but most additions are one-time opacity/translate reveals, a two-pixel reading-progress line, and small hover shifts. These effects are much less visible than the existing “One delivery system, six disciplines” network, which continuously sends six packets through a large SVG system. The implementation therefore met a subtle-motion interpretation rather than the requested animated-site experience.

## Direction

VSR Systems will use a cinematic layered motion system across every route. Each major section receives one clearly visible animation that communicates flow, connection, progression, capability, or interaction. The six-disciplines network sets the visibility benchmark, but it is not duplicated verbatim.

Motion has three coordinated layers:

1. Persistent system motion: one ambient mechanism per major section, active only while visible.
2. Scroll-linked choreography: headings, paths, cards, and information flows construct as the visitor progresses.
3. Route and interaction motion: route transitions, animated route heroes, and spring feedback on actionable elements.

## Architecture

### MotionSection

A shared section wrapper coordinates viewport state or scroll progress and exposes `rise`, `split`, `scale`, and `draw` choreography. It replaces repeated faint `Reveal` usage where a complete section needs a visible sequence. `Reveal` remains available for minor supporting content.

### SignalPath

A reusable SVG primitive draws a path, sends one or more packets through it, and optionally pulses terminal nodes. Each feature supplies its own geometry, labels, direction, and timing so the shared mechanism does not create repetitive layouts.

### RouteTransition

The routed outlet is keyed by location and receives an interruptible opacity/translate transition. Route changes restore scroll position and move keyboard focus without waiting for animation completion. Every route hero adds a restrained signal field built from SVG paths, particles, and chromatic glow.

### Motion Constraints

- Use the installed `framer-motion` package; do not add GSAP.
- Use `useScroll` and `useTransform` for scroll-linked values.
- Use pooled `whileInView` behavior for triggered choreography.
- Use SVG `pathLength`, transforms, opacity, and filter fades only.
- Do not animate width, height, margin, padding, top, or left.
- Persistent loops stop when their section is outside the viewport.
- Content remains readable when animation or JavaScript is unavailable.

## Home Route Coverage

| Section | Primary visible motion |
|---|---|
| Hero | Existing orbit plus animated copy cascade, signal sweep, and responsive light field |
| Introduction | Scroll-linked statement emphasis and a connecting signal line |
| Milestones | Existing six-discipline packet network plus sequenced milestone telemetry |
| Services | Signal packets travel between service cards; icons pulse when reached |
| Business stages | Launch, Scale, and Transform cards construct along a moving progression rail |
| Operating model | Packets move Discover → Design → Build → Operate and activate each control group |
| Story | Layered panels shift with scroll and connect through a drawn path |
| Capabilities | Capability nodes enter from radial directions and settle into a system |
| Advantage | Proof points reveal through a scanning-light sequence |
| Differentiators | Direction-aware card choreography with an animated comparison spine |
| Technology | Continuous marquees with depth, pause behavior, and static reduced-motion layout |
| Industries | Industry rows receive a directional signal sweep and actionable arrow response |
| Delivery process | A vertical progress path draws and activates each delivery stage |
| Projects | Project cards receive timeline progress, status pulse, and directional entry |
| Insights | Editorial cards stagger with masked light reveals and link arrow response |
| Final CTA | Converging signal paths resolve into the primary action |

## Secondary Route Coverage

| Route | Primary visible motion |
|---|---|
| Company | Animated route field, editorial statement build, delivery path, and story panels |
| Services | Animated route field, service-system connection map, and sequenced service cards |
| Service detail | Capability path, deliverable activation, technology marquee, and use-case progression |
| Industries | Animated route field and directional industry rows with active signal markers |
| Insights | Animated route field and editorial list progression |
| Careers | Animated route field, working-principle scan, and contact action emphasis |
| Contact | Animated route field, engagement-step path, field focus response, and submit-state motion |
| Privacy | Restrained route field and sequential legal-section path without distracting loops |
| 404 | Broken signal path that reconnects toward the home and services actions |

## Intensity And Variety

At least one visible mechanism is active in each major viewport, but adjacent sections use different compositions. Continuous animation is reserved for signal systems, orbit fields, marquees, and status indicators. Text and cards animate on entry, scroll progress, or interaction rather than looping without meaning.

The motion hierarchy is:

1. Signature: section-scale systems and route fields.
2. Structural: path drawing, card sequencing, and scroll-linked progression.
3. Interactive: hover, focus, press, form state, and directional link feedback.

## Accessibility

`prefers-reduced-motion: reduce` renders every element in its final state, removes continuous paths and marquees, disables displacement, and keeps only immediate state changes. Motion never conveys information without a text or structural equivalent. Focus remains visible during route and interaction transitions.

## Performance

- Reuse a small number of Motion values per section.
- Avoid one global React state update per scroll frame.
- Keep SVG packet counts bounded and pause offscreen loops.
- Use transform, opacity, path length, and short filter fades.
- Preserve route-level code splitting and avoid adding a second animation runtime.

## Verification

Static gates are `npm run lint`, `npm run typecheck`, and `npm run build`. Repository rules prohibit launching the app locally, browser checks, and automated tests, so rendered motion remains an explicit deployed/manual verification item. The user-visible acceptance check is that every listed route and major section displays a clearly noticeable animation at normal motion settings and a complete static composition under reduced motion.

## Acceptance Criteria

- The six-disciplines network is no longer the only section with clearly visible system motion.
- Every major home section has a distinct, noticeable animation mechanism.
- Every secondary route has animated hero atmosphere and content choreography.
- Operating-model packets visibly travel between phases rather than only drawing a line once.
- Scroll and interaction motion remains interruptible and does not block navigation or input.
- Reduced-motion mode contains no continuous or displacement animation.
- Lint, TypeScript, and production build complete successfully.
