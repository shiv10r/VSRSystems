export type ContentCard = {
  readonly title: string
  readonly description: string
}

export const capabilities = [
  {
    title: "Modern Engineering",
    description:
      "API-first systems, clean boundaries and scalable delivery built for continuous change.",
  },
  {
    title: "AI Ready",
    description:
      "Practical integrations designed around real workflows, evidence and measurable outcomes.",
  },
  {
    title: "Secure by Design",
    description:
      "Identity, authorization, secrets and production controls considered from the start.",
  },
  {
    title: "Delivery Focused",
    description: "Clear scope, incremental releases, observability and maintainable handover.",
  },
] satisfies readonly ContentCard[]

export const differentiators = [
  {
    title: "Modern Architecture",
    description: "Boundaries that make systems easier to evolve, test and operate.",
  },
  {
    title: "Product Engineering",
    description: "Technical decisions tied directly to user and business outcomes.",
  },
  {
    title: "AI-Enabled Delivery",
    description: "Automation used selectively where it improves quality and throughput.",
  },
  {
    title: "Cloud Native",
    description: "Repeatable environments, delivery pipelines and operational visibility.",
  },
  {
    title: "Security First",
    description: "Practical controls integrated across product and platform delivery.",
  },
  {
    title: "Outcome Focus",
    description: "Small expert teams, clear ownership and fast evidence-based feedback.",
  },
] satisfies readonly ContentCard[]

export const industries = [
  {
    title: "Healthcare",
    description:
      "Secure digital workflows and connected information designed around sensitive operations.",
  },
  {
    title: "Financial Services",
    description:
      "Resilient platforms, automation and data systems where trust and auditability matter.",
  },
  {
    title: "Retail & E-commerce",
    description:
      "Composable commerce, customer experiences and operational intelligence for growth.",
  },
  {
    title: "Manufacturing",
    description:
      "Connected operations, workflow automation and data visibility across the value chain.",
  },
  {
    title: "Travel & Hospitality",
    description: "Reliable booking, service and operations platforms built for changing demand.",
  },
  {
    title: "Transportation & Logistics",
    description: "Real-time workflows, integration and analytics for complex movement networks.",
  },
] satisfies readonly ContentCard[]

export const deliverySteps = [
  {
    title: "Discover",
    description: "Understand the business problem, users, constraints and desired outcome.",
  },
  {
    title: "Define",
    description: "Create scope, architecture, backlog, success measures and delivery plan.",
  },
  { title: "Design", description: "Prototype experience, systems, APIs, data and integrations." },
  {
    title: "Build",
    description: "Develop iteratively with review, automation and clear production standards.",
  },
  {
    title: "Launch",
    description: "Deploy safely with observability, monitoring and operational readiness.",
  },
  {
    title: "Improve",
    description: "Measure, optimize, automate and evolve the platform continuously.",
  },
] satisfies readonly ContentCard[]

export const insights = [
  {
    title: "Building AI features without creating an AI maintenance problem",
    description:
      "A practical framework for grounding AI work in evaluation, ownership and reliable product behavior.",
  },
  {
    title: "When should an enterprise modernize instead of rewrite?",
    description:
      "How to compare risk, economics and delivery speed before choosing a transformation path.",
  },
  {
    title: "A practical cloud migration checklist for growing software products",
    description:
      "The architecture, operations and team questions that should be answered before moving.",
  },
] satisfies readonly ContentCard[]

export const technologies = [
  ".NET",
  "C#",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "PostgreSQL",
  "SQL Server",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
  "Redis",
  "Kafka",
  "Power BI",
  "OpenAI",
] as const
