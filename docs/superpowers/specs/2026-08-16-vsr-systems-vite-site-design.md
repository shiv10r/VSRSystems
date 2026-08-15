# VSR Systems Vite Website Design

**Date:** 2026-08-16
**Status:** Approved design, awaiting written-spec review

## 1. Purpose

Build a production-quality public marketing website for VSR Systems, an IT consulting and software engineering company. The website must present the company, services, industries, insights, careers, and contact experience with original enterprise content and a polished dark visual identity.

`VSR_Systems_Website_Architecture.md` is the product-content authority. The construction-management product described in `deployement-rule.md` is not part of this website. The safety restrictions in `deployement-rule.md` remain authoritative for development operations.

## 2. Confirmed Decisions

- Use Vite, React, and TypeScript instead of Next.js.
- Implement a data-driven single-page application with React Router.
- Deploy the static production build to Netlify.
- Use Netlify Forms for contact submissions and preserve `mailto:shr1030cd@gmail.com` as the direct fallback.
- Do not access external websites or download external media during implementation.
- Replace the requested hero video and stock imagery with original local SVG/CSS artwork and lightweight animation.
- Preserve a typed asset manifest so final company images and video can be added later without restructuring components.
- Project-local npm dependency installation is permitted. Global installation and changes outside `D:\Projects\VSR Systems` are not permitted.
- ESLint, TypeScript checking, and the Vite production build are permitted.
- Do not write or run unit tests, launch a local server, run a preview server, or operate an MCP server.

## 3. Technology Stack

- Vite
- React
- TypeScript with strict type checking
- React Router for route definitions and navigation
- Tailwind CSS for the design system and responsive layout
- Framer Motion for restrained motion and scroll reveals
- Lucide React with individual icon imports
- React Helmet Async for client-side route metadata
- React Hook Form and Zod for typed contact-form state and validation
- Netlify Forms for production form processing
- ESLint for static quality checks

Dependencies must be project-local, established packages required by this design, and pinned through the generated lockfile.

## 4. Application Architecture

The site is a client-rendered SPA. Netlify serves `dist` and rewrites application routes to `index.html`. React Router maps URLs to route-level page components. A persistent site layout owns global navigation and contact UI.

Suggested structure:

```text
src/
  app/
    App.tsx
    router.tsx
  components/
    home/
    layout/
    shared/
  data/
    assets.ts
    industries.ts
    insights.ts
    navigation.ts
    services.ts
    site.ts
    technologies.ts
  hooks/
  lib/
  pages/
  styles/
public/
  brand/
  artwork/
  _redirects
  robots.txt
  sitemap.xml
```

The exact file split may change during planning, but responsibilities must remain isolated:

- `pages` compose route-level content.
- `components` provide reusable visual and interaction units.
- `data` is the typed source of truth for company copy and collections.
- `lib` contains small framework-independent helpers.
- `app` owns routing and global providers.

No component should contain duplicated service, navigation, industry, technology, or company-contact records.

## 5. Route Model

Implement these routes:

```text
/
/company
/services
/services/software-engineering
/services/ai-automation
/services/cloud-devops
/services/data-engineering
/services/cybersecurity
/services/technology-consulting
/industries
/insights
/careers
/contact
/privacy
```

All six service-detail URLs use one reusable `ServicePage` composition backed by a typed service record. Unknown URLs render a branded 404 page with navigation back to Home and Services.

## 6. Shared Layout And Navigation

`SiteLayout` provides:

- A skip-to-content link.
- A sticky, safe-area-aware header.
- Original VSR Systems logo and mark.
- Keyboard-accessible desktop navigation and dropdowns.
- A touch-first mobile drawer with expandable parent items.
- Body scroll locking while the drawer is open.
- Escape-key handling and route-change closure.
- Scroll restoration and predictable focus after navigation.
- A complete footer with dynamic current year and verified contact details only.
- A safe-area-aware floating contact control.

The same typed navigation data feeds desktop and mobile navigation. Critical information must never depend on hover.

## 7. Homepage Composition

The homepage follows this order:

1. Animated hero with VSR identity, headline, CTAs, and capability strip.
2. Digital-transformation introduction.
3. Six service cards.
4. Story panel.
5. Capability cards without fabricated metrics.
6. VSR advantage split section.
7. Six core differentiators.
8. Technology marquee without partnership claims.
9. Six industries.
10. Six-step delivery process.
11. Three static insight cards.
12. Final contact CTA.

Each section is an independently understandable component with typed props or direct access to a focused data module. The page must contain all final copy; no lorem ipsum or unlabelled placeholder blocks are allowed.

## 8. Visual System And Local Artwork

Use the architecture document's near-black base, white typography, subtle surfaces, and restrained cyan/violet/magenta accent gradient. Gradients are accents, not full-page decoration. Layout uses strong hierarchy, generous spacing, subtle borders, and clear focus states.

Because external media access is prohibited:

- Create original VSR logo, mark, favicon, and section artwork as local SVG files.
- Use CSS gradients, grid/noise patterns, geometric diagrams, and SVG compositions to distinguish cards and sections.
- Implement the hero with lightweight transform/opacity animation rather than a video.
- Render a static hero composition for reduced-motion users.
- Keep asset paths centralized so a future local video can replace the animated composition.
- Do not add hotlinked media or runtime external-media dependencies.

Typography must use a local-safe or bundled strategy that does not fetch fonts from an external CDN at runtime.

## 9. Responsive And WebView Behavior

Design mobile-first and verify through responsive CSS rules for approximately 320, 360, 375, 390, 412, 480, 640, 768, 1024, 1280, 1440, and 1920 pixel widths.

Requirements:

- One column on phones, one or two on tablets, and two or three on desktop as content permits.
- No accidental horizontal scrolling.
- Fluid headings that wrap naturally.
- At least 44 by 44 pixel touch targets; use at least 48 pixels for the mobile floating contact control.
- At least 16 pixel mobile form text to avoid iOS zoom.
- Safe-area handling for the header, drawer, floating control, and edge-aligned content.
- Modern viewport units with compatible fallbacks.
- Readable fallbacks for unsupported backdrop filters and advanced effects.
- No fixed background attachment, essential hover-only content, WebGL dependency, or expensive continuous effects.
- Animations use transform and opacity, run sparingly, and respect reduced-motion preferences.

## 10. Data Flow

Typed data modules provide site identity, navigation, services, industries, technologies, insights, delivery steps, and asset locations. Page and shared components consume these records; components do not mutate them.

Navigation data feeds desktop dropdowns, mobile accordions, footer links, and route matching. Service data feeds the homepage cards, service index, service-detail pages, and related CTAs. Site configuration is the only source for the company name, tagline, description, and email address.

The exact contact email everywhere is:

```text
shr1030cd@gmail.com
```

## 11. Contact Form

The contact page contains labelled fields for full name, work email, company, optional phone, service, optional budget, message, and consent.

Behavior:

- Validate with a typed Zod schema before submission.
- Use appropriate field types and autocomplete attributes.
- Link validation messages with accessible descriptions.
- Prevent duplicate submissions while submitting.
- Submit URL-encoded form data in the Netlify-compatible format.
- Show persistent inline success or failure feedback.
- Keep the direct email address and `mailto:` fallback visible.
- Do not expose API keys or depend on popup windows.

The deployed form requires Netlify's build-time form detection markup/configuration. Live delivery must be confirmed after deployment by the user unless additional runtime QA permission is granted later.

## 12. Metadata And Discoverability

Use React Helmet Async for client-side page titles, descriptions, and canonical-ready configuration. Provide strong default title, description, Open Graph, and social metadata in `index.html` so non-JavaScript crawlers receive valid baseline information.

Include static `robots.txt` and `sitemap.xml` files containing every public route. Do not invent organization details. This SPA approach does not guarantee route-specific metadata to crawlers that do not execute JavaScript; static pre-rendering is explicitly deferred unless requested later.

## 13. Error Handling And Degradation

- Unknown routes render a useful branded 404 page.
- Contact validation and submission errors remain visible, specific, and accessible.
- Optional decorative artwork failures must not remove or obscure content.
- The site remains fully readable when motion is reduced or unsupported.
- Navigation remains operable with keyboard, touch, and without hover.
- No errors are silently swallowed; user-facing failures receive concise feedback.

Do not add speculative retries, legacy compatibility layers, or a backend that this design does not require.

## 14. Verification Boundaries

Permitted verification:

1. ESLint.
2. TypeScript type checking.
3. Vite production build.

Prohibited unless separately approved in the current conversation:

- Unit, integration, or end-to-end tests.
- Starting Vite development or preview servers.
- Browser automation against a local server.
- External network checks, website browsing, or live Netlify operations.
- Installing global software or additional tooling outside the project.

Static checks can establish lint, type, and build correctness. They cannot establish runtime console cleanliness, visual fidelity at every breakpoint, browser/WebView compatibility, or live Netlify form delivery. Those are manual deployment checks under the current safety constraints.

## 15. Definition Of Done

Implementation is complete when:

- The Vite React TypeScript application and all approved dependencies are configured locally.
- Every required route exists and unknown routes have a useful fallback.
- The homepage contains every required section in the approved order.
- Shared desktop and mobile navigation works by design and all declared links resolve in the router.
- All six service records drive cards, index content, and reusable detail pages.
- Company, industries, insights, careers, contact, and privacy pages contain final original copy.
- VSR branding, local artwork, metadata, favicon, and email are consistent.
- Netlify SPA routing and form-detection configuration are present.
- Contact validation, submission states, and direct email fallback are implemented.
- Responsive, safe-area, touch, WebView fallback, accessibility, and reduced-motion requirements are represented in code.
- No Quadrafort content, fake claims, fake metrics, external media dependencies, API secrets, lorem ipsum, or pretending-to-be-live AI chat appears.
- ESLint, TypeScript checking, and the production build exit successfully.
- Any runtime or deployment checks not permitted by the safety rules are clearly recorded as unverified rather than claimed as passing.

## 16. Out Of Scope

- Construction-management, expense, billing, project-management, analytics, or AI-chat application features.
- A custom backend or database.
- A CMS or dynamically published insights.
- Authentication or user accounts.
- A live AI chatbot.
- External stock-media download or hotlinking.
- Video generation or local server execution.
- Unit and browser tests under the current rules.
- Static pre-rendering or server-side rendering.
