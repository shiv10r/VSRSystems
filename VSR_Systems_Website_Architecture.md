# VSR Systems — IT Consulting Website Architecture & Coding-Agent Build Specification

> **Purpose:** Give this file directly to an OpenAI coding agent / OpenCode agent and ask it to build the website end-to-end.
>
> **Reference style:** Premium dark-theme enterprise IT consulting website inspired by the supplied screenshots, but **do not copy Quadrafort branding, text, logo, layout pixel-for-pixel, or proprietary assets**. Build an original VSR Systems identity with a similar level of polish, motion, enterprise credibility, and content depth.

---

## 1. Master Instruction for the Coding Agent

Build a production-quality, responsive marketing website for an IT consulting/software services company named **VSR Systems**.

The visual direction should feel like a modern enterprise technology consultancy:

- Dark premium UI
- Black / near-black base background
- White typography
- Electric violet / cyan / magenta gradient accents
- Large headings and generous spacing
- Full-width hero with **autoplay muted background video**
- Animated service cards
- Image-driven cards with dark gradient overlays
- Smooth scroll reveal animations
- Sticky navigation
- Dropdown/mega-menu on desktop
- Mobile drawer navigation
- Strong call-to-action sections
- Floating contact button
- Optional floating AI/chat button UI (visual only unless backend is added)
- Fully responsive from 320px to large desktop screens
- Must run smoothly inside normal mobile browsers **and embedded Android/iOS WebViews**
- Mobile-first interaction design with touch-safe controls, safe-area handling, and no desktop-only interactions
- High Lighthouse performance target
- Accessibility-conscious animation behavior

Use original VSR Systems branding and content from this specification.

### Preferred stack

Use:

- **Next.js using the latest stable App Router**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for scroll/micro animations
- **Lucide React** for icons
- `next/image` for local images
- Native `<video>` for looping background videos
- Optional `react-hook-form + zod` for contact form validation

If the repository is already Vite/React, keep React + TypeScript + Tailwind and adapt the same architecture instead of migrating unnecessarily.

### Important execution rule

Do not stop after creating a skeleton. Build the complete home page, inner service pages, contact page, reusable components, responsive behavior, assets folder, SEO metadata, motion, and polished loading/hover states.

---

# 2. Company Identity

## Company name

**VSR Systems**

## Recommended tagline

**Engineering Intelligent Systems for Modern Business**

Alternative supporting line:

**Software. Cloud. Data. AI. Built for measurable business outcomes.**

## Brand positioning

VSR Systems is a technology consulting and software engineering company focused on helping organizations modernize applications, automate operations, adopt cloud platforms, use data intelligently, and build secure digital products.

## Brand personality

- Modern
- Reliable
- Technically strong
- Enterprise-ready
- Fast-moving
- Practical rather than buzzword-heavy
- Innovation-focused

## Contact email

**shr1030cd@gmail.com**

Use this everywhere the website needs an email address:

- Contact page
- Footer
- Floating contact button mail link
- `mailto:shr1030cd@gmail.com`
- Contact form fallback

Do not invent phone numbers, office addresses, client names, customer counts, certifications, awards, or partnerships.

---

# 3. Visual Design System

## Theme

Default theme: **dark**.

### Color tokens

```css
--background: #050505;
--surface: #0b0b0e;
--surface-2: #111116;
--border: rgba(255,255,255,0.10);
--text-primary: #f7f7fb;
--text-secondary: #a7a7b3;
--violet: #8b5cf6;
--magenta: #ec4899;
--cyan: #22d3ee;
--blue: #3b82f6;
--success: #22c55e;
```

### Primary gradient

```css
linear-gradient(90deg, #22d3ee 0%, #8b5cf6 50%, #ec4899 100%)
```

Use the gradient as an accent only:

- heading underline
- active nav line
- icons
- CTA border glow
- card hover glow
- small decorative background orbs

Do not flood the whole page with gradients.

## Typography

Recommended:

- Heading: `Manrope`, `Inter`, or `Plus Jakarta Sans`
- Body: `Inter`

Use `next/font/google` if using Next.js.

Suggested sizing:

```txt
Hero H1: clamp(44px, 7vw, 88px)
Section H2: clamp(32px, 4.5vw, 58px)
Card title: 22–30px
Body: 16–19px
Small/eyebrow: 12–14px
```

## Corners

- Main cards: 22–28px radius
- Buttons: pill or 12–16px radius
- Images: inherit card radius

## Borders

Use subtle 1px white-alpha borders.

## Shadow/glow

On hover only:

```css
box-shadow: 0 20px 60px rgba(139, 92, 246, 0.12);
```

---

# 4. Logo Direction

Create a clean temporary SVG logo inside the codebase so the site can run immediately.

### Logo concept

A geometric **VSR** monogram made from 2–3 angular strokes, paired with the text:

**VSR Systems**

Subtitle optional:

**Build · Automate · Scale**

### Files

```txt
/public/brand/vsr-logo.svg
/public/brand/vsr-mark.svg
/public/brand/favicon.svg
```

Do not copy the Quadrafort logo.

---

# 5. Navigation Architecture

Desktop navigation:

```txt
Home
Company
  Overview
  Why VSR Systems
  Our Approach
Services
  Software Engineering
  AI & Automation
  Cloud & DevOps
  Data Engineering & Analytics
  Cybersecurity
  Technology Consulting
Industries
  Healthcare
  Financial Services
  Retail & E-commerce
  Manufacturing
  Travel & Hospitality
  Logistics
Insights
Careers
Contact
```

Header behavior:

- sticky at top
- backdrop blur after scrolling
- transparent/black at page top
- thin bottom border
- logo left
- navigation center/right
- CTA button: **Let's Talk**
- mobile hamburger below `lg`
- accessible keyboard navigation

---

# 6. Route Architecture

Create the following routes:

```txt
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

If speed is critical, build all routes from shared data-driven templates so there is minimal duplicate code.

---

# 7. Home Page — Exact Section Order

## Section 1 — Hero / Animated Background Video

Full viewport height or minimum `calc(100vh - header)`.

### Background

Autoplay video:

```html
<video autoplay muted loop playsinline preload="metadata">
```

Overlay:

- black 55–70%
- subtle radial gradient
- optional light grid/noise texture

### Hero copy

Eyebrow:

**VSR SYSTEMS · DIGITAL ENGINEERING & CONSULTING**

H1:

**Engineering Intelligent Systems for Modern Business**

Paragraph:

**We design, build, modernize, and scale secure digital products using cloud, AI, data, and modern software engineering.**

Primary CTA:

**Start a Project** → `/contact`

Secondary CTA:

**Explore Services** → `#services`

Bottom floating trust strip:

```txt
Software Engineering   •   AI & Automation   •   Cloud   •   Data   •   Security
```

### Motion

- background video slight scale from `1.06 -> 1`
- eyebrow fade + y
- H1 word-by-word stagger or line reveal
- CTA fade after heading
- scroll-down mouse indicator

Respect `prefers-reduced-motion`.

---

## Section 2 — Intro / Digital Transformation

Two-column layout.

Left:

### Heading

**Build smarter. Move faster. Scale confidently.**

Right body:

**VSR Systems helps organizations turn complex technology challenges into practical, scalable solutions. From application modernization and cloud platforms to AI automation and data engineering, we combine consulting discipline with hands-on product engineering.**

Add a gradient underline under the section heading.

---

## Section 3 — Ways We Serve

ID: `services`

Heading:

**Ways We Serve**

Description:

**From strategy through production, VSR Systems brings engineering, cloud, data, AI, and security expertise together to solve high-impact business problems.**

Create a responsive grid of 6 cards.

### Service cards

#### 1. Software Engineering

**Design and build modern web platforms, APIs, enterprise applications, SaaS products, and scalable backend systems.**

Link: `/services/software-engineering`

#### 2. AI & Automation

**Prototype and deploy practical AI solutions, intelligent workflows, copilots, document automation, RAG experiences, and process automation.**

Link: `/services/ai-automation`

#### 3. Cloud & DevOps

**Modernize infrastructure with cloud-native architecture, containerization, CI/CD, observability, infrastructure automation, and reliable deployments.**

Link: `/services/cloud-devops`

#### 4. Data Engineering & Analytics

**Turn fragmented data into trusted pipelines, analytics platforms, dashboards, APIs, and actionable business intelligence.**

Link: `/services/data-engineering`

#### 5. Cybersecurity

**Build security into applications, APIs, cloud environments, identity, access control, DevSecOps workflows, and production operations.**

Link: `/services/cybersecurity`

#### 6. Technology Consulting

**Translate business priorities into architecture, modernization roadmaps, engineering plans, delivery models, and measurable digital programs.**

Link: `/services/technology-consulting`

### Card layout

Each card:

- 16:10 image
- dark overlay gradient bottom
- icon
- title
- short description appears on hover / desktop
- arrow icon moves right on hover
- slight image zoom

On mobile descriptions remain visible.

---

# 8. Animated Story Section

Similar intent to the supplied “Watch our story” reference, but use original VSR Systems treatment.

Heading:

**Technology that moves business forward**

Use a cinematic video card approximately 16:7 or 16:8 with large rounded corners.

Overlay center content:

```txt
VSR SYSTEMS
From idea to dependable software.
[ Play our story ]
```

The play button can open a modal. Until a custom company video exists, use an abstract technology stock loop without audio.

Add a dark fade around the video so it blends with page background.

---

# 9. Capabilities / Metrics Section

Because this is a new company website, **do not publish fake numeric achievements**.

Instead of fabricated “100+ clients” or certifications, use capability cards such as:

```txt
Modern Engineering
Cloud-native architecture, API-first systems, clean code and scalable delivery.

AI Ready
Practical AI integrations designed around real workflows and measurable outcomes.

Secure by Design
Authentication, authorization, secrets management, secure APIs and DevSecOps principles.

Delivery Focused
Clear scope, incremental releases, automation, observability and maintainable handover.
```

Optional future editable stats data structure:

```ts
export const metrics = [
  // Add verified business metrics only when they are true.
];
```

---

# 10. “The VSR Advantage” Section

Split layout: text left, image right.

Heading:

**The VSR advantage**

Body:

**Large transformation programs often become slow because technology, delivery, and business priorities are treated separately. VSR Systems works differently: small expert teams, clear ownership, modern engineering practices, and fast feedback from prototype to production.**

Bullets:

- Senior engineering mindset
- Product-first execution
- Cloud and automation by default
- Secure and maintainable architecture
- Transparent communication
- Outcome-focused delivery

CTA:

**Why VSR Systems** → `/company`

---

# 11. Core Differentiators Grid

Heading:

**Our core differentiators**

Create 6 image-backed cards:

```txt
Modern Architecture
Product Engineering
AI-Enabled Delivery
Cloud Native
Security First
Business Outcome Focus
```

Hover interaction:

- image zoom 1.00 → 1.06
- overlay gets darker
- 2–3 line description slides upward

---

# 12. Technology Marquee

Create a horizontally scrolling logo/text marquee.

Use text labels or simple icons; do not imply official partnerships.

Technology examples:

```txt
.NET
C#
React
Next.js
TypeScript
Python
Node.js
SQL Server
PostgreSQL
Azure
AWS
Docker
Kubernetes
Redis
RabbitMQ
Kafka
Power BI
OpenAI
GitHub Actions
Azure DevOps
```

Label above:

**Technologies we build with**

Do not display “Official Partner” unless verified.

---

# 13. Industries Section

Heading:

**Technology built around your industry**

6 cards:

```txt
Healthcare
Financial Services
Retail & E-commerce
Manufacturing
Travel & Hospitality
Transportation & Logistics
```

Each gets an icon, short description, and hover state.

---

# 14. Delivery Process Section

Heading:

**From idea to production**

Horizontal desktop timeline / vertical mobile timeline:

```txt
01 Discover
Understand the business problem, users, constraints and desired outcome.

02 Define
Create scope, architecture, backlog, success metrics and delivery plan.

03 Design
Prototype user experience, systems, APIs, data model and integrations.

04 Build
Develop iteratively with code review, automated tests and CI/CD.

05 Launch
Deploy safely with observability, monitoring and production readiness.

06 Improve
Measure, optimize, automate and evolve the platform continuously.
```

Animate timeline progress when entering viewport.

---

# 15. Insights Section

Heading:

**Insights**

Create 3 article cards using placeholder static data:

```txt
Building AI features without creating an AI maintenance problem

When should an enterprise modernize instead of rewrite?

A practical cloud migration checklist for growing software products
```

Route can initially be `/insights` without CMS.

---

# 16. Final CTA Section

Large gradient-border panel.

Heading:

**Have a technology challenge worth solving?**

Body:

**Tell us what you are building, modernizing, or automating. VSR Systems can help you turn it into a clear engineering plan and a production-ready solution.**

Buttons:

- **Start a Conversation** → `/contact`
- **Email Us** → `mailto:shr1030cd@gmail.com`

---

# 17. Footer

Dark slightly lighter surface than body.

Columns:

### VSR Systems

```txt
Engineering Intelligent Systems for Modern Business.
```

### Services

- Software Engineering
- AI & Automation
- Cloud & DevOps
- Data Engineering
- Cybersecurity
- Technology Consulting

### Company

- About
- Industries
- Insights
- Careers
- Contact

### Connect

- `shr1030cd@gmail.com`
- LinkedIn placeholder: hide until real URL is supplied
- GitHub placeholder: hide until real URL is supplied

Bottom:

```txt
© {currentYear} VSR Systems. All rights reserved.
Privacy
```

Use current year dynamically.

---

# 18. Contact Page

Route: `/contact`

Hero:

**Let’s build what’s next.**

Description:

**Tell us about the product, platform, automation, cloud, data, or engineering challenge you are working on.**

### Contact details

Email:

**shr1030cd@gmail.com**

### Form fields

```txt
Full name *
Work email *
Company
Phone (optional)
Service interested in
Project budget range (optional)
Message *
Consent checkbox
```

Service dropdown:

```txt
Software Engineering
AI & Automation
Cloud & DevOps
Data Engineering & Analytics
Cybersecurity
Technology Consulting
Other
```

For the first version, implement one of these approaches:

### Fastest no-backend option

Use a `mailto:` fallback after validation.

### Better production option

Use Web3Forms, Formspree, Resend API route, or another configured email provider.

If no API key exists, the page must still work and clearly provide `shr1030cd@gmail.com` as direct contact.

Never expose a private API key in frontend code.

---

# 19. Floating Contact Button

Desktop bottom-right fixed button:

```txt
Let's Talk
```

Icon: message circle or phone-call style icon.

Click should open `/contact` or a small contact panel with:

- Email us
- Start project
- Copy email

Use:

```txt
shr1030cd@gmail.com
```

Also add a small circular floating VSR mark on bottom-left as an optional visual “chat” trigger.

If no chatbot backend exists, clicking it should open a lightweight panel:

```txt
Hi — how can VSR Systems help?
[Start a project]
[Email us]
```

Do not pretend it is a live AI chatbot unless one is actually implemented.

---

# 20. Image & Video Assets — Ready-to-Use Sources

## Important usage approach

For a fast coding-agent build, use remote URLs initially or download them into the repository.

**Preferred production approach:** download selected media, optimize/compress it, and store it under `/public/images` and `/public/videos`. This avoids depending on a third-party hotlink at runtime.

Pexels source pages referenced below identify the media as free-to-use on their page, but still review the current license before commercial launch.

---

## A. AI / Hero technology image

Source page:

https://www.pexels.com/photo/robot-pointing-on-a-wall-8386440/

Direct image URL:

```txt
https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1800
```

Suggested local file:

```txt
/public/images/hero-ai-network.jpg
```

Use for:

- AI card
- hero fallback/poster
- modern architecture card

---

## B. Cloud / Data Center

Source page:

https://www.pexels.com/photo/server-racks-on-data-center-4508751/

Direct image URL:

```txt
https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=1600
```

Suggested local file:

```txt
/public/images/cloud-data-center.jpg
```

---

## C. Cybersecurity

Source page:

https://www.pexels.com/photo/close-up-view-of-system-hacking-5380642/

Direct image URL:

```txt
https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600
```

Suggested local file:

```txt
/public/images/cybersecurity.jpg
```

---

## D. Business Consulting / Teamwork

Source page:

https://www.pexels.com/photo/people-having-business-meeting-together-3183183/

Direct image URL:

```txt
https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1600
```

Suggested local file:

```txt
/public/images/consulting-team.jpg
```

---

## E. Software Engineering

Source page:

https://www.pexels.com/photo/woman-coding-on-computer-3861958/

Direct image URL:

```txt
https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1600
```

Suggested local file:

```txt
/public/images/software-engineering.jpg
```

---

## F. Developer / Coding alternate

Source page:

https://www.pexels.com/photo/man-coding-on-computers-sitting-at-desk-16129703/

Direct image URL:

```txt
https://images.pexels.com/photos/16129703/pexels-photo-16129703.jpeg?auto=compress&cs=tinysrgb&w=1600
```

Suggested local file:

```txt
/public/images/developer-workspace.jpg
```

---

# 21. Animated Video Sources

## Hero video option 1 — Abstract AI

Source page:

https://www.pexels.com/video/an-artist-s-animation-of-artificial-intelligence-ai-this-video-depicts-language-models-which-generate-text-it-was-created-by-wes-cockx-as-part-of-the-visualising-ai-project-launched-by-18069701/

Pexels CDN MP4 identified by the download redirect:

```txt
https://videos.pexels.com/video-files/18069701/18069701-uhd_3840_2160_24fps.mp4
```

This is 4K and can be too heavy for a homepage. Download and compress to a short 1080p H.264/WebM loop before launch.

Suggested local filename:

```txt
/public/videos/hero-ai.mp4
```

---

## Hero/story video option 2 — Futuristic digital architecture

Source page:

https://www.pexels.com/video/an-artist-s-animation-of-artificial-intelligence-ai-this-visual-depicts-the-process-used-by-text-to-image-diffusion-models-it-was-created-by-artist-linus-zoll-as-part-of-the-visualisin-18069164/

Suggested local filename:

```txt
/public/videos/digital-architecture.mp4
```

Download a suitable HD version manually from the source page.

---

## Story/video option 3 — Developers collaborating

Source page:

https://www.pexels.com/video/people-coding-on-computer-6804109/

Suggested filename:

```txt
/public/videos/team-coding.mp4
```

---

## Secondary motion option — Code workspace

Source page:

https://www.pexels.com/video/modern-workspace-with-coding-on-screen-33314914/

Suggested filename:

```txt
/public/videos/code-workspace.mp4
```

---

# 22. Video Implementation Requirements

Use this component pattern:

```tsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/images/hero-ai-network.jpg"
  aria-hidden="true"
>
  <source src="/videos/hero-ai.webm" type="video/webm" />
  <source src="/videos/hero-ai.mp4" type="video/mp4" />
</video>
```

### Video performance rules

- No audio for decorative autoplay video
- Always `muted`
- Always `playsInline`
- Use `poster`
- Keep hero loop ideally 6–15 seconds
- Compress aggressively
- Prefer 1080p or 1440p, not raw 4K
- Mobile can use a static poster if video is too large
- Lazy load non-hero videos
- Pause videos when they leave viewport if practical
- Respect reduced-motion preference by showing poster instead

Pseudo behavior:

```ts
if (prefersReducedMotion || isSaveDataMode) {
  renderPosterImage();
} else {
  renderVideo();
}
```

---

# 23. Image Handling in Next.js

If using downloaded assets:

```tsx
import Image from "next/image";

<Image
  src="/images/software-engineering.jpg"
  alt="Software engineer working with modern development tools"
  fill
  className="object-cover transition-transform duration-700 group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```

If initially using `images.pexels.com`, configure `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
```

Production recommendation remains to self-host optimized copies.

---

# 24. Component Architecture

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    company/
      page.tsx
    services/
      page.tsx
      software-engineering/page.tsx
      ai-automation/page.tsx
      cloud-devops/page.tsx
      data-engineering/page.tsx
      cybersecurity/page.tsx
      technology-consulting/page.tsx
    industries/
      page.tsx
    insights/
      page.tsx
    careers/
      page.tsx
    contact/
      page.tsx
    privacy/
      page.tsx

  components/
    layout/
      Header.tsx
      DesktopNav.tsx
      MobileMenu.tsx
      Footer.tsx
      FloatingContact.tsx

    home/
      Hero.tsx
      Intro.tsx
      ServicesGrid.tsx
      StoryVideo.tsx
      CapabilityCards.tsx
      VsrAdvantage.tsx
      DifferentiatorsGrid.tsx
      TechnologyMarquee.tsx
      IndustriesGrid.tsx
      DeliveryProcess.tsx
      InsightsPreview.tsx
      FinalCta.tsx

    shared/
      SectionHeading.tsx
      GradientLine.tsx
      ServiceCard.tsx
      ImageCard.tsx
      VideoBackground.tsx
      Button.tsx
      Container.tsx
      Reveal.tsx
      Modal.tsx
      Breadcrumbs.tsx
      ContactForm.tsx

  data/
    navigation.ts
    services.ts
    industries.ts
    insights.ts
    technologies.ts
    site.ts

  lib/
    utils.ts
    seo.ts

public/
  brand/
  images/
  videos/
```

Keep content arrays outside components so copy can be changed quickly.

---

# 25. Suggested Data Model

## `data/site.ts`

```ts
export const siteConfig = {
  name: "VSR Systems",
  tagline: "Engineering Intelligent Systems for Modern Business",
  description:
    "VSR Systems builds modern software, cloud platforms, AI automation, data solutions and secure digital products.",
  email: "shr1030cd@gmail.com",
};
```

## `data/services.ts`

```ts
export const services = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    shortDescription:
      "Modern web platforms, APIs, enterprise applications and scalable backend systems.",
    image: "/images/software-engineering.jpg",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    shortDescription:
      "Practical AI, copilots, RAG, intelligent workflows and process automation.",
    image: "/images/hero-ai-network.jpg",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription:
      "Cloud-native architecture, CI/CD, containers, observability and reliable delivery.",
    image: "/images/cloud-data-center.jpg",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering & Analytics",
    shortDescription:
      "Data pipelines, analytics platforms, dashboards and trustworthy decision systems.",
    image: "/images/data-engineering.jpg",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortDescription:
      "Secure applications, identity, cloud environments and DevSecOps delivery.",
    image: "/images/cybersecurity.jpg",
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    shortDescription:
      "Architecture, modernization roadmaps, delivery planning and engineering strategy.",
    image: "/images/consulting-team.jpg",
  },
];
```

If `data-engineering.jpg` has not been downloaded, reuse `cloud-data-center.jpg` temporarily.

---

# 26. Service Page Template

All 6 service pages should use a reusable template with:

1. Breadcrumb
2. Hero
3. Business problem
4. What we deliver
5. Capabilities grid
6. Technology stack
7. Delivery approach
8. Example use cases
9. CTA

### Example — Software Engineering

Hero title:

**Software engineered for real-world scale**

Capabilities:

- Web application development
- API & backend engineering
- Enterprise modernization
- Microservices
- SaaS product engineering
- Mobile/PWA experiences
- Integration engineering
- Test automation
- Performance optimization

### Example — AI & Automation

Hero title:

**Move AI from experiment to useful software**

Capabilities:

- Generative AI application development
- RAG systems
- AI copilots
- Document intelligence
- Workflow automation
- LLM integration
- Model/API orchestration
- Evaluation and guardrails
- Human-in-the-loop workflows

### Example — Cloud & DevOps

Capabilities:

- Cloud architecture
- Azure/AWS deployment
- Containers
- CI/CD
- Infrastructure as code
- Observability
- Secrets & identity
- Application modernization
- Cost and reliability optimization

---

# 27. Motion System

Use tasteful motion; enterprise, not gaming-style.

### Scroll reveals

```txt
opacity 0 -> 1
y 30 -> 0
duration 0.55–0.8
```

### Card hover

```txt
translateY: 0 -> -6px
image scale: 1 -> 1.04
border alpha: 0.1 -> 0.25
```

### Hero stagger

```txt
Eyebrow      delay 0.10
Heading      delay 0.20
Description  delay 0.38
Buttons      delay 0.50
```

### Marquee

Continuous, slow, pause on hover.

### Reduced motion

All motion components must check:

```css
@media (prefers-reduced-motion: reduce)
```

or Framer Motion’s reduced-motion hook.

---

# 28. Responsive Behavior

## Desktop ≥ 1280px

- max content width ~1440px
- 3-column service grids
- large hero typography
- desktop nav with dropdowns

## Tablet 768–1279px

- 2-column cards
- slightly smaller hero
- mobile or compact nav depending width

## Mobile < 768px

- single-column cards
- hero minimum 720px or viewport-based
- use static video poster if needed for performance
- full-width CTA buttons or stacked CTAs
- mobile drawer
- contact floating button becomes round icon or compact pill
- section padding 72–96px

No horizontal scroll at any width.

---

# 29. Accessibility Requirements

- Semantic headings in order
- `<nav>`, `<main>`, `<footer>`
- Visible focus styles
- Keyboard-accessible dropdowns and mobile menu
- `aria-expanded` on menu controls
- Correct button vs anchor usage
- Useful alt text on meaningful images
- Decorative images/video `aria-hidden`
- Minimum contrast suitable for dark UI
- Skip-to-content link
- Reduced motion support
- Form labels, not placeholder-only inputs
- Form error messages linked via `aria-describedby`

---

# 30. SEO Requirements

Home metadata:

```txt
Title: VSR Systems | Software, Cloud, Data & AI Engineering
Description: VSR Systems helps businesses build modern software, cloud platforms, AI automation, data solutions and secure digital products.
```

Add:

- Open Graph metadata
- Twitter/X metadata
- canonical URLs after domain exists
- `robots.ts`
- `sitemap.ts`
- Organization JSON-LD using only verified details

Do not invent physical address, phone number, founding year, employee count or legal registration data.

---

# 31. Performance Requirements

Target:

```txt
Lighthouse Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

Implementation:

- `next/image`
- AVIF/WebP generation when possible
- optimized local video
- do not load every video on first paint
- dynamic import heavy modal/gallery components
- avoid giant icon libraries; import specific Lucide icons
- no unnecessary client components
- keep server components by default
- lazy-load below-the-fold images
- avoid expensive continuous particle effects on mobile

---

# 32. Loading Experience

Do not use a long splash loader.

Use:

- immediate content render
- hero poster while video loads
- subtle shimmer/skeleton only where needed
- fade video in after `canplay`

---

# 33. Content Tone

Write in clear enterprise English.

Avoid excessive claims such as:

- “world-leading”
- “best in the industry”
- “500+ experts”
- “100+ global clients”
- “ISO certified”
- “Microsoft Gold Partner”

unless actual verified evidence is later supplied.

Preferred language:

- “We help”
- “We build”
- “We modernize”
- “Designed for”
- “Focused on”
- “Practical AI”
- “Production-ready”
- “Secure and maintainable”

---

# 34. Initial Assets Manifest

Create this file:

```txt
src/data/assets.ts
```

Example:

```ts
export const assets = {
  heroPoster: "/images/hero-ai-network.jpg",
  heroVideo: "/videos/hero-ai.mp4",
  storyVideo: "/videos/team-coding.mp4",
  softwareEngineering: "/images/software-engineering.jpg",
  aiAutomation: "/images/hero-ai-network.jpg",
  cloudDevops: "/images/cloud-data-center.jpg",
  dataEngineering: "/images/cloud-data-center.jpg",
  cybersecurity: "/images/cybersecurity.jpg",
  consulting: "/images/consulting-team.jpg",
};
```

This makes later replacement simple.

---

# 35. Fast Build Strategy for the Coding Agent

Implement in this exact order:

```txt
1. Initialize Next.js + TypeScript + Tailwind
2. Add fonts and global design tokens
3. Build site config/data files
4. Build Header + Footer
5. Build reusable Container / SectionHeading / Button / Reveal components
6. Build Home Hero and video background
7. Build ServicesGrid and cards
8. Build StoryVideo
9. Build remaining home sections
10. Build Contact page + form
11. Build reusable ServicePageTemplate
12. Generate 6 service routes from data
13. Build Company / Industries / Insights / Careers pages
14. Add mobile menu and dropdowns
15. Add responsive polish
16. Add animation/reduced motion
17. Add metadata/sitemap/robots
18. Run lint + typecheck + production build
19. Fix all errors
20. Final visual polish
```

---

# 36. Definition of Done

The task is complete only when:

- [ ] `/` renders a polished complete homepage
- [ ] dark VSR Systems branding is used everywhere
- [ ] hero has background video + poster fallback
- [ ] video is autoplay/muted/loop/playsInline
- [ ] header is sticky and responsive
- [ ] dropdown navigation works
- [ ] mobile drawer works
- [ ] all 6 service cards work
- [ ] all service pages exist
- [ ] company page exists
- [ ] industries page exists
- [ ] insights page exists
- [ ] careers page exists
- [ ] contact page exists
- [ ] email is exactly `shr1030cd@gmail.com`
- [ ] email CTA uses `mailto:shr1030cd@gmail.com`
- [ ] footer contains contact email
- [ ] floating contact button works
- [ ] responsive design works at 320px, 360px, 375px, 390px, 412px, 768px, 1024px, 1440px and 1920px
- [ ] mobile browser + Android WebView + iOS WKWebView compatibility requirements are implemented
- [ ] no placeholder lorem ipsum remains
- [ ] no Quadrafort logo/name/text appears in final VSR site
- [ ] no fake clients, metrics, certifications, partnerships, phone number, or address
- [ ] reduced motion is respected
- [ ] all images have correct handling/alt text
- [ ] no runtime console errors
- [ ] TypeScript passes
- [ ] lint passes
- [ ] production build passes

---

# 36A. Mandatory Mobile Browser + Android/iOS WebView Compatibility

This is a **hard requirement**, not an optional enhancement.

The entire VSR Systems website must work smoothly in:

- Chrome on Android
- Safari on iPhone/iPad
- Samsung Internet
- Edge mobile
- Android `WebView`
- iOS `WKWebView`
- In-app browser/webview containers
- Desktop Chrome/Edge/Safari/Firefox

The coding agent must treat the project as **mobile-first and WebView-safe**.

## 36A.1 Responsive breakpoint strategy

Use mobile-first CSS/Tailwind breakpoints and verify every important section at approximately:

```txt
320px   very small mobile
360px   common Android mobile
375px   iPhone class width
390px   modern iPhone width
412px   larger Android width
480px   large mobile
640px   small tablet
768px   tablet portrait
1024px  tablet landscape / small laptop
1280px  desktop
1440px  large desktop
1920px  wide desktop
```

Do not create a desktop design and simply shrink it.

Expected layout behavior:

- 1 column on small phones
- 1–2 columns on tablets depending on content
- 2–3 columns on desktop
- Prevent horizontal scrolling at every width
- Long headings must wrap naturally
- Buttons may become full-width on narrow phones
- Card content must never be clipped
- Images must preserve aspect ratio
- Do not use fixed pixel widths for primary content containers

Recommended container pattern:

```tsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
```

## 36A.2 Correct viewport behavior

For Next.js App Router configure viewport correctly.

Example:

```tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};
```

Never disable pinch zoom with `maximum-scale=1` or `user-scalable=no`.

## 36A.3 Do not rely blindly on `100vh`

Mobile browser chrome and embedded WebViews can make `100vh` behave badly.

For fullscreen hero sections prefer modern viewport units with fallbacks:

```css
.hero {
  min-height: 100vh;
  min-height: 100svh;
}

@supports (height: 100dvh) {
  .hero {
    min-height: 100dvh;
  }
}
```

In Tailwind, use `min-h-svh` / `min-h-dvh` when supported by the configured version, with a normal `min-h-screen` fallback.

The hero should never jump aggressively when the mobile address bar expands/collapses.

## 36A.4 Safe-area support for notches and home indicators

Support iPhone notches, Dynamic Island devices and app WebViews using CSS safe-area environment variables.

Example:

```css
.safe-page {
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
}

.mobile-bottom-ui {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

Apply this especially to:

- sticky header
- mobile drawer
- floating contact button
- bottom CTA controls
- fullscreen video areas

Nothing important should sit underneath the iOS home indicator or camera cutout.

## 36A.5 Touch-first interaction rules

Every interactive element must work without hover.

Minimum touch target:

```txt
44px × 44px minimum
```

This applies to:

- hamburger button
- close button
- dropdown toggles
- carousel controls
- form controls
- service-card links
- floating contact button
- social icons

Desktop hover effects may exist, but all information and navigation must remain available on touch screens.

Use media queries when needed:

```css
@media (hover: hover) and (pointer: fine) {
  /* desktop-only hover enhancement */
}
```

Do not make critical content appear only on hover.

## 36A.6 Mobile navigation specification

Below desktop breakpoint:

- Replace desktop mega-menu with hamburger button
- Open an accessible full-height or large slide-in drawer
- Body scroll should lock while menu is open
- Drawer itself must remain scrollable if content is taller than viewport
- Parent navigation items with children should use tap-to-expand accordions
- Clearly show active/open state
- Close drawer after route navigation
- Close on Escape where keyboard is available
- Keep the contact CTA easily reachable

Do not use hover-based dropdowns in mobile/WebView mode.

## 36A.7 Background video rules for mobile and WebView

Animated/video sections are required, but they must not hurt mobile usability.

Use native HTML video:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/images/hero-poster.webp"
  aria-hidden="true"
>
  <source src="/videos/hero.webm" type="video/webm" />
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>
```

Mandatory behavior:

- `muted`
- `playsInline`
- no controls for decorative background video
- optimized MP4 fallback
- WebM when useful
- poster image always available
- do not wait for video before rendering hero text
- hero content must be readable if autoplay is blocked
- pause video when far outside viewport when practical
- avoid loading several heavy videos simultaneously on mobile
- use lightweight clips, typically a few MB rather than huge cinematic files
- no audio autoplay

For `prefers-reduced-motion: reduce`, use the poster/static image instead of continuous background motion where practical.

For low-powered devices/WebViews, graceful degradation is preferred over forcing expensive animation.

## 36A.8 WebView-safe animation implementation

Prefer GPU-friendly animation properties:

```txt
transform
opacity
```

Avoid continuously animating:

- width/height
- large blur filters
- box-shadow on large elements
- background-position on huge layers
- expensive SVG filters
- huge particle systems

Framer Motion rules:

- animations should be short and subtle
- viewport reveal should run once where possible
- avoid dozens of simultaneous spring animations
- disable/reduce nonessential motion on small devices
- support `prefers-reduced-motion`

Do not make the page dependent on WebGL/Three.js for core content.

## 36A.9 CSS/WebView compatibility fallbacks

Do not assume every embedded WebView supports every newest visual feature perfectly.

Examples:

```css
.glass-header {
  background: rgba(5, 5, 5, 0.92);
}

@supports (backdrop-filter: blur(16px)) {
  .glass-header {
    background: rgba(5, 5, 5, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
```

Provide readable fallbacks for:

- `backdrop-filter`
- advanced gradient effects
- newer viewport units
- unsupported video formats

Avoid `background-attachment: fixed` because it is unreliable and janky on many mobile browsers/WebViews.

## 36A.10 Prevent horizontal overflow

The final page must have **zero accidental horizontal scrolling**.

Use:

```css
html,
body {
  max-width: 100%;
  overflow-x: clip;
}
```

Use `overflow-x: hidden` as a compatibility fallback if needed.

Be especially careful with:

- absolutely positioned gradient orbs
- marquees
- large headings
- sliders
- code blocks
- transformed elements
- negative margins
- fixed floating buttons

Never solve layout problems by hiding meaningful clipped content.

## 36A.11 Image rules

Use `next/image` where appropriate.

Each content image must have:

- explicit dimensions or stable aspect ratio
- responsive `sizes`
- modern optimized format when possible
- useful `alt` text unless purely decorative
- `object-cover` only where intentional
- no layout shift while loading

Example:

```tsx
<Image
  src="/images/services/software-engineering.webp"
  alt="Software engineering team collaborating on a digital product"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

Images in cards must not be downloaded at desktop resolution unnecessarily on small phones.

## 36A.12 Typography on mobile

Use fluid sizing with `clamp()` or responsive Tailwind classes.

Avoid headings that become extremely large on a 320–390px screen.

Recommended hero title behavior:

```css
font-size: clamp(2.25rem, 9vw, 5.5rem);
line-height: 0.98;
```

Body text should generally remain at least `16px` to avoid uncomfortable reading and iOS form zoom issues.

Form inputs should use at least `16px` font size on mobile.

## 36A.13 Floating contact button on mobile

Desktop may use a larger fixed pill.

Mobile/WebView behavior:

- compact circular or short pill version
- minimum 48px touch target
- leave safe-area bottom spacing
- must not cover form submit buttons, cookie UI, navigation or key content
- use `mailto:shr1030cd@gmail.com`

Example positioning concept:

```css
bottom: max(16px, env(safe-area-inset-bottom));
right: max(16px, env(safe-area-inset-right));
```

## 36A.14 Forms inside mobile/WebView

Contact form must be mobile-friendly:

- 16px+ input font size
- proper `type="email"`, `type="tel"` where applicable
- correct `autocomplete` attributes
- visible labels; placeholders are not labels
- no tiny checkboxes
- clear focus state
- validation messages directly below fields
- submit button easy to tap
- loading state prevents duplicate submissions
- success/error state remains visible after keyboard dismissal

When there is no backend, fallback contact action should open:

```txt
mailto:shr1030cd@gmail.com
```

Do not make the contact experience depend on a popup window.

## 36A.15 External links and WebView behavior

Avoid workflows that require `window.open()` popups.

Normal internal routes use Next.js `Link`.

External links can use normal anchors. If opening a new tab is necessary:

```tsx
<a target="_blank" rel="noopener noreferrer">...</a>
```

The site must remain usable when an app WebView chooses to intercept `mailto:`, external links or file downloads.

## 36A.16 Sticky/fixed elements

Use fixed/sticky UI sparingly because mobile keyboards and WebViews can resize the visual viewport.

Header:

- `position: sticky` preferred
- predictable height
- no giant fixed overlay

Floating CTA:

- small footprint
- safe-area aware
- avoid positioning based on hard-coded viewport height

When a form input receives focus, important controls must not be permanently hidden behind the keyboard.

## 36A.17 Scrolling behavior

Use native vertical scrolling.

Avoid scroll-jacking libraries.

`scroll-behavior: smooth` is acceptable for anchor navigation, but respect reduced motion.

Do not prevent normal browser back/forward navigation.

Avoid nested scrolling containers unless truly necessary.

## 36A.18 Performance budget for mobile/WebView

Target the site to feel fast on a mid-range Android device, not only on a developer laptop.

Targets/guidelines:

```txt
LCP: < 2.5s target
CLS: < 0.1 target
INP: < 200ms target
Initial JS: keep as lean as practical
Hero poster: optimized WebP/AVIF
Hero video: lazy/non-blocking and compressed
Below-fold media: lazy loaded
```

Implementation rules:

- Server Components by default in Next.js
- Add `"use client"` only where interaction/motion requires it
- Dynamically import heavy optional components
- Avoid large animation/UI libraries besides what is required
- Do not ship giant icon packs; import individual Lucide icons
- Use optimized local fonts / `next/font`
- no blocking third-party chat script for MVP
- no huge map SDK on homepage

## 36A.19 Mobile image/video fallback policy

For expensive decorative media, it is acceptable to serve a simpler experience on small screens.

Example strategy:

```txt
Desktop: autoplay cinematic background video
Mobile: compressed video where performance is good
Reduced motion / unsupported autoplay: poster image
Slow WebView: poster image + subtle CSS gradient motion
```

The content and CTA must be identical regardless of which visual fallback is used.

## 36A.20 Accessibility on touch/mobile

Verify:

- visible keyboard focus states
- screen-reader labels for icon-only controls
- `aria-expanded` on expandable navigation
- `aria-controls` where useful
- Escape closes modal/drawer
- focus returns to hamburger after drawer closes
- sufficient contrast
- reduced-motion handling
- logical heading hierarchy
- no text rendered only inside images

## 36A.21 WebView-friendly feature policy

Core website functionality must NOT depend on:

- browser extensions
- desktop hover
- popup windows
- WebGL
- service workers
- install prompts
- third-party cookies
- cross-site storage
- clipboard access
- camera/microphone permissions
- geolocation

Those can be future enhancements, but the marketing site must work without them.

## 36A.22 Required test matrix before completion

The coding agent must validate these viewport/device classes before declaring the task finished:

```txt
320 × 568     compact phone
360 × 800     Android phone
375 × 812     iPhone class
390 × 844     modern iPhone
412 × 915     large Android
768 × 1024    tablet portrait
1024 × 768    tablet landscape
1280 × 800    laptop
1440 × 900    desktop
1920 × 1080   large desktop
```

Also test with browser device emulation and, if available, a real or simulated embedded WebView.

Check at every mobile size:

- no horizontal overflow
- header/menu works
- drawer scrolls correctly
- hero text fits
- hero CTA remains visible
- background video does not block rendering
- service cards stack correctly
- card content can be tapped
- forms are not hidden by keyboard
- floating contact CTA does not cover content
- footer columns reflow correctly
- animations stay smooth

## 36A.23 Definition of done for mobile + WebView

Do **not** consider the site complete until all of these pass:

- [ ] Works at 320px width without horizontal scrolling
- [ ] Works at 360/375/390/412px widths
- [ ] Works in portrait and landscape orientation
- [ ] Mobile navigation is tap-based and accessible
- [ ] Header respects safe areas
- [ ] Floating contact CTA respects safe areas
- [ ] Hero uses `svh/dvh` strategy rather than depending only on `100vh`
- [ ] Background video includes `muted`, `playsInline`, poster and MP4 fallback
- [ ] Site remains usable if video autoplay fails
- [ ] No core feature requires hover
- [ ] Touch targets are at least ~44px
- [ ] Form inputs do not trigger unwanted iOS zoom
- [ ] WebView does not require popups for core navigation/contact
- [ ] No `background-attachment: fixed`
- [ ] No scroll-jacking
- [ ] Animations primarily use transform/opacity
- [ ] Reduced motion works
- [ ] Images do not cause CLS
- [ ] Mobile performance remains smooth on mid-range devices
- [ ] iOS Safari layout is checked
- [ ] Android Chrome layout is checked
- [ ] Android WebView/WKWebView-safe fallbacks are present
- [ ] Production build, lint and TypeScript checks pass

---

# 37. Optional Nice-to-Have Features After MVP

Add only after the core website works:

- Blog/CMS using Sanity, Contentful or Markdown/MDX
- Calendly/Cal.com meeting booking
- Actual AI chatbot
- Resend-backed contact email API
- Case studies
- Careers/job listing CMS
- Cookie consent
- Analytics
- Search
- Multi-language support
- Light/dark theme toggle
- WebGL/Three.js hero only if performance remains strong

---

# 38. Suggested Final Coding-Agent Prompt

Copy the block below and give it to the coding agent together with this file:

```txt
Build the VSR Systems website described in VSR_Systems_Website_Architecture_OpenAI_Coding_Agent.md.

Do not only scaffold the project. Implement the complete UI, responsive layout, routes, reusable components, animations, hero background video, service pages, contact page, footer, image handling and SEO metadata.

Use original VSR Systems branding. The Quadrafort screenshots are only visual inspiration; do not copy its logo, copywriting or proprietary assets.

Use shr1030cd@gmail.com as the contact email everywhere.

If the referenced video/image files are not yet physically present, initially wire valid remote assets/fallbacks so the UI still renders, and create a clear /public/images and /public/videos structure for later self-hosting.

Run lint, typecheck and production build before finishing. Fix all errors. Make the UI look production-quality on desktop, mobile browsers, Android WebView and iOS WKWebView. Treat Section 36A as mandatory acceptance criteria.
```

---

# 39. Quick Asset Download Checklist

Before production launch:

1. Open each Pexels source link above.
2. Download the chosen image/video.
3. Rename using the filenames in this document.
4. Put images in `public/images/`.
5. Put videos in `public/videos/`.
6. Compress images to WebP/AVIF where possible.
7. Compress video to a lightweight 1080p MP4 and optionally WebM.
8. Keep a poster JPG/WebP for every background video.
9. Verify license again before commercial publication.
10. Remove unused media.

---

# 40. Final Homepage Visual Summary

The homepage should visually read like this:

```txt
[STICKY DARK HEADER]

[FULLSCREEN VIDEO HERO]
VSR Systems
Engineering Intelligent Systems for Modern Business
[Start a Project] [Explore Services]

[INTRO / DIGITAL TRANSFORMATION]

[WAYS WE SERVE — 6 LARGE IMAGE CARDS]

[CINEMATIC STORY VIDEO]

[CAPABILITY CARDS — NO FAKE METRICS]

[VSR ADVANTAGE — SPLIT CONTENT + IMAGE]

[CORE DIFFERENTIATORS — IMAGE GRID]

[TECHNOLOGY MARQUEE]

[INDUSTRIES]

[DELIVERY PROCESS]

[INSIGHTS]

[LARGE CTA]

[ENTERPRISE FOOTER]

[FLOATING CONTACT BUTTON]
```

The result should feel visually premium, credible, fast, and enterprise-grade while still being realistic for a new technology company.

