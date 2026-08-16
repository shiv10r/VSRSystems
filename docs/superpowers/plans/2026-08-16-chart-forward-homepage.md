# Chart-Forward Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text-dense home page sections with animated SVG/CSS charts and trimmed copy so mobile reads as cards, not an article — while preserving every existing animation.

**Architecture:** Keep all existing motion primitives (Reveal, SectionHeading, framer-motion draw/packets, operating-flow line, `prefers-reduced-motion` handling). Rewrite four content components to render chart-style layouts driven by shortened data in `story.ts`/`content.ts`, with new CSS in the existing stylesheet files.

**Tech Stack:** React 19 + TypeScript + Vite, framer-motion, lucide-react, Biome (lint), tsc (typecheck), hand-built SVG/CSS (no chart library).

## Global Constraints

- **Animations are non-negotiable.** Do not remove or alter any motion code: `motion.css`, framer-motion `initial/animate/whileInView`, `useReducedMotion`, Reveal, operating-flow packets, orbit artwork. Only content presentation changes.
- No new dependencies — hand-built SVG/CSS only.
- Honor `prefers-reduced-motion` via `useReducedMotion()` everywhere motion is added (existing pattern).
- Follow existing patterns: `Reveal` wrappers, `SectionHeading`, `TiltCard`, `surface` class, CSS custom properties (`--border`, `--cyan`, `--text-muted`, `--gradient`, `--font-mono`).
- Verification per task: `npm run lint` → `npm run typecheck` → `npm run build`, all must pass. Commit after each task. Do not push until all tasks complete unless asked.
- No unit-test framework exists in this repo — lint/typecheck/build are the gates.

---

### Task 1: Trim copy in shared data files

**Files:**
- Modify: `src/data/story.ts` (milestones, stageOfferings, engagementModels, strategicEnablers, operatingModel)
- Modify: `src/data/content.ts` (capabilities, differentiators, industries, deliverySteps, insights)
- Test: `npm run lint && npm run typecheck && npm run build` (no unit tests in repo)

**Interfaces:**
- Consumes: nothing (data-only change)
- Produces: shortened string values consumed by Tasks 2–4. Types unchanged: `Milestone`, `StageOffering`, `EngagementModel`, `StrategicEnabler`, `OperatingStep` (story.ts); `ContentCard` (content.ts).

- [ ] **Step 1: Shorten `src/data/story.ts` copy**

Replace the `milestones` array descriptions with:

```ts
export const milestones = [
  { value: "06", label: "Service disciplines", description: "Software, AI, cloud, data, security, consulting." },
  { value: "01", label: "Current live project", description: "VSR Systems corporate platform, live on Netlify." },
  { value: "07", label: "Solution patterns", description: "One owned project, six solution patterns." },
  { value: "Secure", label: "By design", description: "Security integrated into delivery and operations." },
]
```

Replace `stageOfferings` with:

```ts
export const stageOfferings = [
  {
    stage: "Launch",
    title: "Foundation & validation",
    description: "Secure, testable foundation with clear priorities.",
    capabilities: ["Discovery & architecture", "Rapid MVP", "Cloud & security foundations", "Data & integration design"],
  },
  {
    stage: "Scale",
    title: "Growth & optimization",
    description: "Automation, data and repeatable delivery.",
    capabilities: ["App & API development", "CI/CD & platform automation", "Data pipelines & analytics", "Reliability & security"],
  },
  {
    stage: "Transform",
    title: "Modernization & innovation",
    description: "Accountable, risk-aware transformation programs.",
    capabilities: ["Modernization roadmaps", "AI & intelligent automation", "Platform & integration strategy", "Advanced cloud & security"],
  },
]
```

Replace `engagementModels` with:

```ts
export const engagementModels = [
  { title: "Discovery sprint", fit: "Validate scope and investment" },
  { title: "Defined project", fit: "Bounded delivery, known outcomes" },
  { title: "Dedicated team", fit: "Long-term product development" },
  { title: "Managed delivery", fit: "Support, operations, reliability" },
  { title: "Co-development", fit: "Shared product ownership" },
  { title: "Outcome-based program", fit: "Multi-phase modernization" },
]
```

Replace `strategicEnablers` with:

```ts
export const strategicEnablers = [
  { code: "R-MVP", title: "Rapid MVP", description: "Smallest useful product, real evidence." },
  { code: "PF", title: "Platform foundation", description: "Reusable foundations for consistent delivery." },
  { code: "DAE", title: "Data & AI enablement", description: "Governed data and AI that reach production." },
]
```

Replace `operatingModel` with:

```ts
export const operatingModel = [
  {
    phase: "01",
    title: "Discover",
    input: "Goals, users, constraints",
    output: "Scope, risks, plan",
    controls: ["Alignment", "Feasibility", "Checkpoints"],
  },
  {
    phase: "02",
    title: "Design",
    input: "Priorities, boundaries",
    output: "Architecture, security model",
    controls: ["Review", "Threat model", "Criteria"],
  },
  {
    phase: "03",
    title: "Build",
    input: "Approved architecture",
    output: "Increments, telemetry, docs",
    controls: ["Quality gates", "Releases", "Security"],
  },
  {
    phase: "04",
    title: "Operate",
    input: "Signals, feedback",
    output: "Reliability, learning",
    controls: ["Observability", "Incidents", "Improvement"],
  },
]
```

- [ ] **Step 2: Shorten `src/data/content.ts` copy**

Replace `capabilities` with:

```ts
export const capabilities = [
  { title: "Modern Engineering", description: "API-first systems built for continuous change." },
  { title: "AI Ready", description: "Integrations around real workflows and evidence." },
  { title: "Secure by Design", description: "Identity, secrets and controls from the start." },
  { title: "Delivery Focused", description: "Incremental releases and maintainable handover." },
]
```

Replace `differentiators` with:

```ts
export const differentiators = [
  { title: "Modern Architecture", description: "Systems that are easy to evolve and operate." },
  { title: "Product Engineering", description: "Decisions tied to user and business outcomes." },
  { title: "AI-Enabled Delivery", description: "Automation where it improves quality and speed." },
  { title: "Cloud Native", description: "Repeatable environments and delivery pipelines." },
  { title: "Security First", description: "Practical controls across product and platform." },
  { title: "Outcome Focus", description: "Small teams, clear ownership, fast feedback." },
]
```

Replace `industries` descriptions with (keep titles):

```ts
export const industries = [
  { title: "Healthcare", description: "Secure workflows for sensitive operations." },
  { title: "Financial Services", description: "Platforms where trust and auditability matter." },
  { title: "Retail & E-commerce", description: "Composable commerce and customer experiences." },
  { title: "Manufacturing", description: "Connected operations and workflow automation." },
  { title: "Travel & Hospitality", description: "Reliable booking and service platforms." },
  { title: "Transportation & Logistics", description: "Real-time workflows for complex networks." },
]
```

Replace `deliverySteps` with:

```ts
export const deliverySteps = [
  { title: "Discover", description: "Problem, users, constraints, outcome." },
  { title: "Define", description: "Scope, architecture, backlog, measures." },
  { title: "Design", description: "Experience, systems, APIs, data." },
  { title: "Build", description: "Iterative development, automated standards." },
  { title: "Launch", description: "Safe deployment, monitoring, readiness." },
  { title: "Improve", description: "Measure, optimize, evolve continuously." },
]
```

Replace `insights` descriptions with:

```ts
export const insights = [
  { title: "Building AI features without creating an AI maintenance problem", description: "Ground AI work in evaluation, ownership and reliable behavior." },
  { title: "When should an enterprise modernize instead of rewrite?", description: "Compare risk, economics and delivery speed first." },
  { title: "A practical cloud migration checklist for growing software products", description: "Architecture, operations and team questions to answer before moving." },
]
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint clean, tsc no errors, vite build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/data/story.ts src/data/content.ts
git commit -m "refactor(copy): shorten home data descriptions for chart-forward layout"
```

---

### Task 2: OperatingModel → animated phase-flow diagram

**Files:**
- Modify: `src/components/home/OperatingModel.tsx`
- Modify: `src/styles/operations.css`

**Interfaces:**
- Consumes: `operatingModel` from `src/data/story.ts` (shortened in Task 1); `Reveal`, `SectionHeading`, `useReducedMotion`, `motion` — same imports as current file.
- Produces: `.operating-card__flow` (input → output arrow row) and `.operating-card__controls` chips, styled by operations.css. Later tasks do not depend on these.

- [ ] **Step 1: Rewrite `src/components/home/OperatingModel.tsx`**

Replace the entire file body with:

```tsx
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { operatingModel } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const OperatingModel = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section operating-model">
      <div className="container">
        <SectionHeading
          eyebrow="Operating model"
          title="From business context to production learning"
        />
        <div className="operating-flow" aria-hidden="true">
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0.3 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {reduceMotion ? null : (
            <>
              <motion.i
                animate={{ x: ["0%", "900%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.i
                animate={{ x: ["0%", "900%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.4,
                  delay: 1.7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </>
          )}
        </div>
        <ol className="operating-model__grid">
          {operatingModel.map((step, index) => (
            <li key={step.phase}>
              <Reveal delay={index * 0.08}>
                <article className="operating-card">
                  <div className="operating-card__heading">
                    <span>{step.phase}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <p className="operating-card__flow">
                    <span>{step.input}</span>
                    <ArrowRight aria-hidden="true" size={14} />
                    <span>{step.output}</span>
                  </p>
                  <ul className="operating-card__controls">
                    {step.controls.map((control) => (
                      <li key={control}>{control}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

Note: the `operating-flow` animated line and packets are **unchanged** — this preserves the existing animation. Only the card body changes from Input/Output/Controls lists to a compact flow row + chips.

- [ ] **Step 2: Update `src/styles/operations.css`**

Replace the `.operating-card dl` / `.operating-card dt` / `.operating-card dd` / `.operating-card__controls` block (lines 62–100) with:

```css
.operating-card__flow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 28px;
  color: var(--text-muted);
  font-size: 0.92rem;
}
.operating-card__flow span:first-child::before {
  content: "IN  ";
  color: var(--text-quiet);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
}
.operating-card__flow span:last-child::before {
  content: "OUT ";
  color: var(--text-quiet);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
}
.operating-card__flow svg {
  flex: 0 0 auto;
  color: var(--cyan);
}
.operating-card__controls {
  margin: 0;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}
.operating-card__controls ul {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.operating-card__controls li {
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.66rem;
}
```

Also reduce the fixed card height so cards feel compact: change `.operating-card { min-height: 540px; }` (line 39) to `min-height: 420px;`, and in the `@media (max-width: 1100px)` block change `.operating-card { min-height: 490px; }` to `min-height: 400px;`. Keep the `@media (max-width: 620px)` `min-height: auto` override as-is.

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint clean (ArrowRight import used), tsc no errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/OperatingModel.tsx src/styles/operations.css
git commit -m "feat(home): render operating model as compact animated flow diagram"
```

---

### Task 3: DeliveryProcess → animated stepper

**Files:**
- Modify: `src/components/home/HomeSecondary.tsx` (DeliveryProcess only — do not touch other exports in this file)
- Modify: `src/styles/pages.css`

**Interfaces:**
- Consumes: `deliverySteps` from `src/data/content.ts` (shortened in Task 1); existing `Reveal`, `SectionHeading` imports already in HomeSecondary.tsx.
- Produces: `.process-stepper` / `.process-stepper__step` / `.process-stepper__node` markup, styled by pages.css. No later task depends on it.

- [ ] **Step 1: Rewrite the `DeliveryProcess` component in `src/components/home/HomeSecondary.tsx`**

Replace the existing `DeliveryProcess` function (lines 88–109) with the code below, and update the lucide import at the top of the file (see the import block first).

Update the lucide import at the top of `HomeSecondary.tsx` to alias the six stepper icons (avoids collision with the existing `ArrowUpRight`):

```tsx
import {
  ArrowUpRight,
  Code2 as Code2Icon,
  PenTool as PenToolIcon,
  Rocket as RocketIcon,
  Search as SearchIcon,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-react"
```

Then replace the `DeliveryProcess` function with:

```tsx
const processIcons = [SearchIcon, TargetIcon, PenToolIcon, Code2Icon, RocketIcon, TrendingUpIcon]

export const DeliveryProcess = () => (
  <section className="section process-section">
    <div className="container">
      <SectionHeading
        eyebrow="Delivery"
        title="From idea to production"
        description="A clear path that reduces uncertainty early."
      />
      <ol className="process-stepper">
        {deliverySteps.map((step, index) => {
          const StepIcon = processIcons[index]
          return (
            <Reveal key={step.title} delay={index * 0.06}>
              <li className="process-stepper__step">
                <span className="process-stepper__node" aria-hidden="true">
                  <StepIcon size={20} />
                </span>
                <div className="process-stepper__body">
                  <span className="process-stepper__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            </Reveal>
          )
        })}
      </ol>
    </div>
  </section>
)
```

- [ ] **Step 2: Update `src/styles/pages.css`**

Replace the `.process-list` block (lines 328–352) with:

```css
.process-stepper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: steps;
}
.process-stepper__step {
  position: relative;
  min-height: 260px;
  padding: 30px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012));
}
.process-stepper__node {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  margin-bottom: 40px;
  border: 1px solid rgba(55, 217, 243, 0.35);
  border-radius: 14px;
  color: var(--cyan);
  background: rgba(55, 217, 243, 0.06);
}
.process-stepper__index {
  display: block;
  margin-bottom: 10px;
  color: var(--text-quiet);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
.process-stepper h3 {
  margin-bottom: 8px;
  font-size: 1.5rem;
}
.process-stepper p {
  max-width: 620px;
  margin: 0;
}
```

In the `@media (max-width: 1000px)` block (line 815), add `.process-stepper { grid-template-columns: repeat(2, minmax(0, 1fr)); }`. In the `@media (max-width: 680px)` block (line 863), replace the existing `.process-list li { grid-template-columns: 46px 1fr; }` rule with `.process-stepper { grid-template-columns: 1fr; }`.

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint clean, tsc no errors (icon aliases used, no unused imports), build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomeSecondary.tsx src/styles/pages.css
git commit -m "feat(home): convert delivery process to animated stepper cards"
```

---

### Task 4: BusinessOfferings → Launch→Scale→Transform chart + spectrum

**Files:**
- Modify: `src/components/home/BusinessOfferings.tsx`
- Modify: `src/styles/story.css`

**Interfaces:**
- Consumes: `stageOfferings`, `engagementModels`, `strategicEnablers` from `src/data/story.ts` (shortened in Task 1); existing `Reveal`, `SectionHeading` imports.
- Produces: `.stage-offerings__chart` (ascending bars), `.stage-offering-card__bar`, `.capability-chips`, `.engagement-spectrum` / `.engagement-spectrum__item`, styled by story.css. No later task depends on it.

- [ ] **Step 1: Rewrite `src/components/home/BusinessOfferings.tsx`**

Replace the entire file body with:

```tsx
import { Check } from "lucide-react"
import { engagementModels, stageOfferings, strategicEnablers } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const BusinessOfferings = () => (
  <>
    <section className="section stage-offerings">
      <div className="container">
        <SectionHeading
          eyebrow="Business-stage offerings"
          title="Engineering support shaped around where you are"
        />
        <div className="stage-offerings__chart">
          {stageOfferings.map((offering, index) => (
            <Reveal delay={index * 0.07} key={offering.stage}>
              <article className="stage-offering-card">
                <div className="stage-offering-card__bar" aria-hidden="true" />
                <div className="stage-offering-card__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{offering.stage}</strong>
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                <ul className="capability-chips">
                  {offering.capabilities.map((capability) => (
                    <li key={capability}>
                      <Check aria-hidden="true" size={13} />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section engagement-section">
      <div className="container">
        <SectionHeading
          eyebrow="Flexible engagement"
          title="A delivery model matched to the work"
        />
        <ol className="engagement-spectrum">
          {engagementModels.map((model, index) => (
            <Reveal delay={(index % 3) * 0.05} key={model.title}>
              <li className="engagement-spectrum__item">
                <span className="engagement-spectrum__dot" aria-hidden="true" />
                <h3>{model.title}</h3>
                <p>{model.fit}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="section enablers-section">
      <div className="container">
        <SectionHeading
          eyebrow="Strategic enablers"
          title="Reusable foundations that reduce delivery friction"
        />
        <div className="enabler-grid">
          {strategicEnablers.map((enabler, index) => (
            <Reveal delay={index * 0.07} key={enabler.code}>
              <article className="enabler-card">
                <span>{enabler.code}</span>
                <h3>{enabler.title}</h3>
                <p>{enabler.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
)
```

- [ ] **Step 2: Update `src/styles/story.css`**

Replace the `.stage-offerings__grid` block (lines 90–95) with — **keep `.enabler-grid` in the shared rule; it is still used by the enablers section**:

```css
.stage-offerings__chart,
.enabler-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.stage-offerings__chart {
  align-items: end;
}
```

Replace `.stage-offering-card` (lines 96–103) with:

```css
.stage-offering-card {
  position: relative;
  min-height: 470px;
  height: 100%;
  padding: 32px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
}
.stage-offering-card__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--bar, 6px);
  background: linear-gradient(180deg, var(--gradient));
  opacity: 0.55;
}
/* Each card sits inside a Reveal motion.div wrapper, so select the wrapper's nth-child,
   then descend to the card inside. */
.stage-offerings__chart > :nth-child(1) .stage-offering-card__bar { --bar: 22%; }
.stage-offerings__chart > :nth-child(2) .stage-offering-card__bar { --bar: 42%; }
.stage-offerings__chart > :nth-child(3) .stage-offering-card__bar { --bar: 62%; }
```

Replace `.stage-offering-card__index` margin (line 110: `margin-bottom: 72px;`) with `margin-bottom: 48px;`.

Replace the `.stage-offering-card ul` block (lines 118–135) with:

```css
.capability-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}
.capability-chips li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.8rem;
}
.capability-chips li svg {
  flex: 0 0 auto;
  color: var(--cyan);
}
```

Replace the `.engagement-grid` block (lines 140–151), the `.engagement-card > span, .enabler-card > span` rule (lines 152–160), and the `.engagement-card h3`/`.engagement-card p` rules (lines 161–166) with — **keep `.enabler-card > span` styling; the enabler cards still exist and need their code badge look**:

```css
.engagement-spectrum {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 18px;
  margin: 0;
  padding: 44px 0 0;
  list-style: none;
}
.engagement-spectrum::before {
  content: "";
  position: absolute;
  top: 21px;
  right: 4%;
  left: 4%;
  height: 1px;
  background: var(--border);
}
.engagement-spectrum__item {
  position: relative;
  padding-top: 26px;
}
.engagement-spectrum__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border: 2px solid var(--cyan);
  border-radius: 50%;
  background: var(--canvas);
}
.engagement-spectrum__item h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}
.engagement-spectrum__item p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.enabler-card > span {
  display: block;
  margin-bottom: 52px;
  color: var(--cyan);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.09em;
}
```

In the `@media (max-width: 1000px)` block (line 229), change `.stage-offerings__grid,` to `.stage-offerings__chart,` and add `.engagement-spectrum { grid-template-columns: repeat(2, minmax(0, 1fr)); }`. In the `@media (max-width: 680px)` block (line 242), change `.engagement-grid,` to `.engagement-spectrum,` in the grid-template-columns collapse and remove `.engagement-card` from the min-height auto list (it no longer exists — keep `.milestone-card`, `.enabler-card`, `.technology-group`).

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint clean, tsc no errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/BusinessOfferings.tsx src/styles/story.css
git commit -m "feat(home): render stage offerings as ascending chart with engagement spectrum"
```

---

### Task 5: Advantage → check-grid tiles + Intro/StoryPanel trims

**Files:**
- Modify: `src/components/home/HomePrimary.tsx` (Advantage rewrite; Intro + StoryPanel copy trims)
- Modify: `src/styles/pages.css`

**Interfaces:**
- Consumes: existing imports (ButtonLink, Reveal, SectionHeading); no data change.
- Produces: `.advantage__tiles` / `.advantage-tile` markup, styled by pages.css. No later task depends on it.

- [ ] **Step 1: Rewrite `Advantage` + trim `Intro`/`StoryPanel` in `src/components/home/HomePrimary.tsx`**

Replace the `advantagePoints` array and `Advantage` function (lines 113–159) with:

```tsx
const advantagePoints = [
  { icon: "Cpu", label: "Senior engineering" },
  { icon: "Target", label: "Product-first" },
  { icon: "Cloud", label: "Cloud by default" },
  { icon: "ShieldCheck", label: "Secure architecture" },
  { icon: "MessageSquare", label: "Clear communication" },
  { icon: "TrendingUp", label: "Outcome-focused" },
] as const

export const Advantage = () => (
  <section className="section advantage" id="advantage">
    <div className="container advantage__grid">
      <Reveal>
        <p className="eyebrow">The VSR advantage</p>
        <h2>
          Small expert teams.
          <br />
          Clear ownership.
          <br />
          <span className="gradient-text">Fast evidence.</span>
        </h2>
        <p className="advantage__lede">
          One accountable engineering partner from prototype to production.
        </p>
        <ButtonLink href="/company" variant="secondary" icon>
          Why VSR Systems
        </ButtonLink>
      </Reveal>
      <Reveal delay={0.08} className="advantage__panel surface">
        <div className="advantage__diagram" aria-hidden="true">
          <span>DISCOVER</span>
          <span>ENGINEER</span>
          <span>OPERATE</span>
        </div>
        <ul className="advantage__tiles">
          {advantagePoints.map((point) => (
            <li className="advantage-tile" key={point.label}>
              <Icon name={point.icon} size={18} />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
)
```

Add the same aliased lucide imports used in Task 3 to the top of HomePrimary.tsx (extend the existing `import { ArrowUpRight, Check } from "lucide-react"` line to add `Cloud as CloudIcon, Cpu as CpuIcon, MessageSquare as MessageSquareIcon, ShieldCheck as ShieldCheckIcon, Target as TargetIcon, TrendingUp as TrendingUpIcon`), and add a local icon-mapping helper near `advantagePoints`:

```tsx
const ADVANTAGE_ICONS = {
  Cpu: CpuIcon,
  Target: TargetIcon,
  Cloud: CloudIcon,
  ShieldCheck: ShieldCheckIcon,
  MessageSquare: MessageSquareIcon,
  TrendingUp: TrendingUpIcon,
} as const

function Icon({ name, size }: { name: keyof typeof ADVANTAGE_ICONS; size: number }) {
  const IconComponent = ADVANTAGE_ICONS[name]
  return <IconComponent size={size} />
}
```

**Note:** if `Icon` name collides with anything in the file, name it `AdvantageIcon` instead. The `Check` import is still used by... verify: `Check` was only used in the old Advantage list. If nothing else in the file uses `Check`, remove it from the lucide import to satisfy Biome unused-import lint.

Trim `Intro` paragraph (lines 24–28) to:

```tsx
        <p>
          Complex technology challenges, turned into practical, scalable solutions — from
          strategy to production.
        </p>
```

Trim `StoryPanel` body paragraph (lines 79–82) to:

```tsx
          <p>Strategy, engineering and operations — one accountable delivery path.</p>
```

- [ ] **Step 2: Update `src/styles/pages.css`**

Replace the `.advantage ul` block (lines 249–264) with:

```css
.advantage__lede {
  max-width: 560px;
}
.advantage__tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.advantage-tile {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-muted);
  font-size: 0.92rem;
}
.advantage-tile svg {
  flex: 0 0 auto;
  color: var(--cyan);
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint clean (no unused `Check`/`ArrowUpRight` imports — remove any that become unused), tsc no errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomePrimary.tsx src/styles/pages.css
git commit -m "feat(home): replace advantage bullet list with tile grid, trim intro and story panel copy"
```

---

### Task 6: Final verification and push

**Files:** none (verification only)

- [ ] **Step 1: Full gate**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all pass. Also run `git status` and confirm only the five commits from Tasks 1–5 are un-pushed.

- [ ] **Step 2: Sanity-check animation preservation**

`git diff a21f96b..HEAD -- src/styles/motion.css` — expect **no changes** (motion.css must be untouched). Also confirm `Hero.tsx`, `MilestonesStory.tsx`, `TiltCard.tsx`, `SectionHeading.tsx`, `Reveal.tsx` are unmodified: `git diff --name-only a21f96b..HEAD`.

- [ ] **Step 3: Push**

```bash
git push origin develop01
```

- [ ] **Step 4: Report**

Summarize: which sections changed, word reduction achieved, and that all motion is preserved.
