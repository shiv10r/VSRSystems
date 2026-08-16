# VSR Systems UI, Motion, and Enquiry TODO

## Objective

Improve the site's visual credibility and interaction quality, make animations reliable on mobile, route every "Let's Talk" action to the contact form, and store contact enquiries in Netlify Forms.

## Confirmed Decisions

- Keep the existing dark "engineering command center" design direction.
- Make the interface feel more realistic through purposeful system visuals, depth, and responsive states rather than unsupported claims or decorative clutter.
- Use Netlify Forms as the only enquiry service. Do not add a custom backend, database, CRM, or paid email provider.
- Store verified submissions in the Netlify Forms dashboard without paid email or webhook notifications.
- Present `https://vsrsystems1.netlify.app/` as a current VSR-owned website project.
- Label all service-based project scenarios as representative solutions; do not present them as completed client work or testimonials.
- Harden the current Netlify website with restrictive browser security headers and bounded contact inputs.
- Open `/contact` in the same browser tab from every "Let's Talk" action.
- Accept any non-empty challenge message. Do not enforce the current 20-character minimum.
- Respect `prefers-reduced-motion` and keep mobile motion lightweight.
- Follow repository safety rules: do not install packages, access external services during implementation, run tests, launch a local server, or perform browser automation. Use lint, TypeScript checking, and the production build for static verification.

## Current Findings

- `src/components/layout/SiteLayout.tsx` renders the floating "Let's Talk" action as a `mailto:` link, while header actions already route to `/contact`.
- `src/pages/ContactPage.tsx` performs a native form submission to `/contact?submitted=true`. That full-page submission can surface Netlify's 404 instead of React's contact route.
- The React-rendered `data-netlify` form needs a build-visible HTML form definition so Netlify can reliably detect its fields during deployment.
- The challenge message currently requires at least 20 characters.
- The textarea already allows vertical resizing, but its initial presentation and validation make it feel constrained.
- The shared `Reveal` component uses one viewport threshold for every screen size. Mobile sections can fail to reach that threshold in short or unusual viewports.
- Existing continuous motion is limited mostly to the technology marquee; the hero orbit and system diagrams are visually static.
- `public/_redirects` already contains the SPA fallback `/* /index.html 200`; the form flow should not depend on a redirect after submission.

## Implementation TODO

### P0: Harden the Current Website

- [ ] Add a restrictive Content Security Policy that permits only same-origin application resources and form submissions.
- [ ] Add HSTS, cross-origin isolation headers, MIME-sniffing protection, frame protection, referrer policy, permissions policy, and cross-domain policy restrictions.
- [ ] Keep Framer Motion compatible by allowing inline styles while continuing to block inline scripts.
- [ ] Add schema and HTML length limits for every free-text contact field.
- [ ] Preserve Netlify's honeypot field and cap its accepted client-side length.

Acceptance criteria:

- The production deployment sends the configured security headers on document routes.
- The CSP blocks third-party scripts, objects, framing, off-origin form posts, and undeclared network connections.
- Contact fields reject oversized values before submission.
- The site builds without adding a security dependency or exposing a secret.

### P1: Add Current Project and Solution Feed

- [ ] Add the VSR Systems corporate website as a current VSR-owned live project linked to `https://vsrsystems1.netlify.app/`.
- [ ] Add representative software, AI, cloud, data, cybersecurity, and consulting solution cards linked to the matching service pages on the same Netlify site.
- [ ] Label every non-live scenario as a representative solution rather than a testimonial or completed client project.
- [ ] Show the business need and delivery focus for each card without invented clients, quotes, metrics, or outcomes.
- [ ] Add responsive desktop, tablet, and mobile layouts using the existing design system and reveal behavior.

Acceptance criteria:

- The current project card opens the supplied VSR Systems website URL.
- Every representative solution links to its matching service offering.
- Visitors cannot reasonably mistake representative scenarios for verified testimonials.
- Cards remain readable and usable without hover or animation.

### P0: Repair Enquiry Submission

- [ ] Add a hidden, build-visible `contact` form definition to `index.html` with field names matching the React form: `fullName`, `email`, `company`, `phone`, `service`, `budget`, `message`, `consent`, and `bot-field`.
- [ ] Replace native `HTMLFormElement.submit()` navigation with an asynchronous POST to `/` using `application/x-www-form-urlencoded` and a payload that includes `form-name=contact`.
- [ ] Keep the visitor on `/contact` throughout submission; never navigate to `/contact?submitted=true` or a Netlify-generated page.
- [ ] Display an in-page pending state while the request is active.
- [ ] Display a persistent success state only after Netlify returns a successful response.
- [ ] Display an actionable in-page error state after a failed response and retain the entered values so the visitor can retry.
- [ ] Prevent duplicate submissions while a request is active.
- [ ] Preserve the honeypot field and submit its value with the request.
- [ ] Reset the form only after a confirmed successful submission.

Acceptance criteria:

- A successful submission remains on `/contact` and shows "Message received."
- A failed submission remains on `/contact`, preserves all entered data, and shows a retryable error.
- The deployed Netlify Forms dashboard lists the `contact` form and captures every expected field.
- No Netlify 404 page appears during or after submission.

### P0: Verify Enquiry Storage

- [ ] Submit one deployed-site enquiry and confirm it appears under Netlify Forms.
- [ ] Open the stored submission and confirm it contains the complete enquiry details.

Netlify Forms is free and unlimited on current credit-based plans according to Netlify's current documentation, but account terms should be rechecked if Netlify changes its plans. Paid email, Slack, and webhook notifications are not required.

### P0: Correct Contact Actions and Message Input

- [ ] Replace the floating `mailto:` "Let's Talk" action with an internal React Router link to `/contact`.
- [ ] Audit all "Let's Talk," "Start a Project," and equivalent primary contact actions and route them to `/contact` in the same tab.
- [ ] Change message validation from a 20-character minimum to a non-empty trimmed value with a clear empty-field error.
- [ ] Increase the textarea's initial visible height while preserving unrestricted vertical resizing.
- [ ] Keep direct email visible as secondary contact information on the contact page and in the footer; it must not be the primary CTA behavior.

Acceptance criteria:

- No primary contact CTA opens a new browser tab, Gmail, or a local mail application.
- A one-character non-whitespace message is accepted.
- A whitespace-only message is rejected.
- The textarea is comfortable to use on desktop and mobile and can be resized vertically.

### P1: Make Mobile Animations Reliable

- [ ] Update the shared reveal behavior so sections enter reliably on short mobile viewports without requiring 16% of a large element to become visible.
- [ ] Use smaller vertical travel and shorter durations on narrow screens while preserving the current desktop emphasis motion.
- [ ] Keep all entrance animation properties limited to `transform` and `opacity`.
- [ ] Verify that mobile navigation transitions remain responsive and do not conflict with page reveals.
- [ ] Preserve immediate rendering and disable continuous movement when `prefers-reduced-motion: reduce` is active.

Acceptance criteria:

- Every section becomes visible while scrolling at 320 px, 375 px, and 430 px viewport widths.
- Animations do not cause horizontal overflow, layout shift, blocked taps, or scrolling stutter.
- Reduced-motion users receive all content without delayed or continuous animation.

### P1: Add Purposeful Motion

- [ ] Add slow transform/opacity motion to hero orbit rings, nodes, and halo to make the system visual feel active without distracting from the headline.
- [ ] Add restrained signal movement to the story and capability diagrams where motion communicates data flow.
- [ ] Stagger related card entrances with short capped delays; do not make visitors wait for content.
- [ ] Add clear press, focus, and completion feedback to primary CTAs and the contact submit action.
- [ ] Keep the existing marquee behavior and ensure it pauses or becomes static under accessibility and interaction conditions.
- [ ] Avoid animated layout properties, large blur animation, scroll-jacking, parallax that interferes with reading, and infinite motion on text.

Acceptance criteria:

- Motion establishes hierarchy and system activity rather than adding random decoration.
- Continuous animation remains low-cost on mobile and stops under reduced motion.
- Controls remain fully usable by keyboard, touch, and assistive technology.

### P1: Enhance UI Realism and Polish

- [ ] Strengthen spacing, surface separation, borders, and focal lighting while preserving the existing color tokens and design identity.
- [ ] Refine card and diagram details so they resemble credible software, cloud, data, AI, and security systems rather than generic glowing boxes.
- [ ] Improve mobile composition, text wrapping, touch targets, and vertical rhythm across the hero, service sections, CTA panels, and contact form.
- [ ] Keep claims factual. Do not invent client names, metrics, testimonials, certifications, case studies, or project outcomes.
- [ ] Ensure every hover-only enhancement has an equivalent visible, focus, or touch state.
- [ ] Maintain WCAG 2.2 AA contrast targets and visible focus indicators.

Acceptance criteria:

- The site has a coherent enterprise engineering identity on desktop and mobile.
- Important content remains understandable without hover or animation.
- No UI element overlaps the floating contact control, safe areas, navigation, or form actions.

## Data Flow

1. The visitor opens `/contact` from an internal CTA.
2. React Hook Form and Zod validate the contact fields locally.
3. The client URL-encodes the validated values and posts them asynchronously to `/` with `form-name=contact` and the `application/x-www-form-urlencoded` content type.
4. Netlify matches the request to the build-visible `contact` form definition.
5. Netlify stores the verified submission in the site's Forms dashboard.
6. The contact page shows success without navigation, or retains the form and shows an error if submission fails.

## Error Handling

- Validation errors appear next to their fields before network submission.
- Network and non-success HTTP responses produce a form-level error message.
- Failed submissions retain visitor input and permit retry.
- Successful submissions reset the fields and show one persistent confirmation.
- The direct email address remains visible as a manual fallback, but primary CTAs do not invoke an email client.

## Static Verification

- [ ] Run `npm run lint` and resolve only issues introduced by this work.
- [ ] Run `npm run typecheck` and resolve only issues introduced by this work.
- [ ] Run `npm run build` and confirm Netlify deployment artifacts are generated successfully.
- [ ] Confirm `dist/_redirects` contains the SPA fallback after the build.
- [ ] Confirm the built HTML contains the Netlify-detectable `contact` form and matching field names.
- [ ] Confirm `netlify.toml` contains the expected CSP, HSTS, cross-origin, framing, MIME, referrer, permissions, and form-action controls.

## Deployment Verification for the Site Owner

- [ ] Deploy the production build to Netlify.
- [ ] Check layout and animation behavior on desktop and at 320 px, 375 px, and 430 px mobile widths.
- [ ] Check the deployed site with reduced motion enabled.
- [ ] Open the current VSR website project and every representative service link from the project feed.
- [ ] Inspect production response headers and confirm the security policy is active without blocking the application.
- [ ] Submit a valid enquiry and confirm the page does not navigate or show a 404.
- [ ] Confirm the enquiry appears in Netlify Forms.
- [ ] Simulate or observe a failed submission and confirm entered values remain available for retry.

## Out of Scope

- Custom API or serverless function for email delivery.
- Database, CRM, Google Sheets, or sales-pipeline integration.
- Authentication or an enquiry-management admin portal.
- New dependencies, stock imagery, fabricated proof, or unrelated content rewrites.
- Automated tests, local browser execution, or external service operation during implementation, per repository rules.

## References

- Netlify form handling: <https://docs.netlify.com/manage/forms/setup/>
- Netlify credit-based plan form usage: <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work>
