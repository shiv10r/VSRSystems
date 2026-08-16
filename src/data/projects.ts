export type ProjectFeedItem = {
  readonly label: "Current VSR project" | "Representative solution"
  readonly title: string
  readonly businessNeed: string
  readonly deliveryFocus: string
  readonly href: string
  readonly linkLabel: string
}

const siteUrl = "https://vsrsystems1.netlify.app"

export const projectFeed = [
  {
    label: "Current VSR project",
    title: "VSR Systems corporate website",
    businessNeed:
      "Create a clear, responsive digital presence that explains VSR Systems services and gives businesses a direct path to start a technology conversation.",
    deliveryFocus:
      "React architecture, responsive interface engineering, accessible motion, Netlify deployment and secure enquiry capture.",
    href: `${siteUrl}/`,
    linkLabel: "View live project",
  },
  {
    label: "Representative solution",
    title: "Modern customer and operations platform",
    businessNeed:
      "Replace fragmented workflows with one maintainable product that connects teams, customers and operational data.",
    deliveryFocus:
      "Product architecture, React applications, APIs, integrations and delivery automation.",
    href: `${siteUrl}/services/software-engineering`,
    linkLabel: "Explore software engineering",
  },
  {
    label: "Representative solution",
    title: "Knowledge and document automation",
    businessNeed:
      "Help teams find reliable answers and move document-heavy work forward without removing human control.",
    deliveryFocus:
      "RAG workflows, document intelligence, evaluations, guardrails and human review.",
    href: `${siteUrl}/services/ai-automation`,
    linkLabel: "Explore AI and automation",
  },
  {
    label: "Representative solution",
    title: "Reliable cloud delivery foundation",
    businessNeed:
      "Make releases repeatable, environments consistent and production behavior easier to understand.",
    deliveryFocus:
      "Cloud architecture, CI/CD, containers, infrastructure as code and observability.",
    href: `${siteUrl}/services/cloud-devops`,
    linkLabel: "Explore cloud and DevOps",
  },
  {
    label: "Representative solution",
    title: "Trusted operational data platform",
    businessNeed:
      "Unify disconnected sources so business teams can work from dependable metrics and timely reporting.",
    deliveryFocus:
      "Data pipelines, semantic models, quality controls, dashboards and embedded analytics.",
    href: `${siteUrl}/services/data-engineering`,
    linkLabel: "Explore data engineering",
  },
  {
    label: "Representative solution",
    title: "Security built into digital delivery",
    businessNeed:
      "Reduce application and cloud risk without turning security into a late-stage delivery bottleneck.",
    deliveryFocus:
      "Threat modelling, identity, secure architecture, DevSecOps controls and observability.",
    href: `${siteUrl}/services/cybersecurity`,
    linkLabel: "Explore cybersecurity",
  },
  {
    label: "Representative solution",
    title: "Modernization and investment roadmap",
    businessNeed:
      "Turn competing priorities and legacy constraints into an actionable, risk-aware delivery sequence.",
    deliveryFocus:
      "Architecture assessment, due diligence, modernization planning and delivery governance.",
    href: `${siteUrl}/services/technology-consulting`,
    linkLabel: "Explore technology consulting",
  },
] satisfies readonly ProjectFeedItem[]
