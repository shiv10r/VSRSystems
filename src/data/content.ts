export type ContentCard = {
  readonly title: string
  readonly description: string
}

export const capabilities = [
  { title: "Modern Engineering", description: "API-first systems built for continuous change." },
  { title: "AI Ready", description: "Integrations around real workflows and evidence." },
  { title: "Secure by Design", description: "Identity, secrets and controls from the start." },
  { title: "Delivery Focused", description: "Incremental releases and maintainable handover." },
] satisfies readonly ContentCard[]

export const differentiators = [
  { title: "Modern Architecture", description: "Systems that are easy to evolve and operate." },
  { title: "Product Engineering", description: "Decisions tied to user and business outcomes." },
  { title: "AI-Enabled Delivery", description: "Automation where it improves quality and speed." },
  { title: "Cloud Native", description: "Repeatable environments and delivery pipelines." },
  { title: "Security First", description: "Practical controls across product and platform." },
  { title: "Outcome Focus", description: "Small teams, clear ownership, fast feedback." },
] satisfies readonly ContentCard[]

export const industries = [
  { title: "Healthcare", description: "Secure workflows for sensitive operations." },
  { title: "Financial Services", description: "Platforms where trust and auditability matter." },
  { title: "Retail & E-commerce", description: "Composable commerce and customer experiences." },
  { title: "Manufacturing", description: "Connected operations and workflow automation." },
  { title: "Travel & Hospitality", description: "Reliable booking and service platforms." },
  { title: "Transportation & Logistics", description: "Real-time workflows for complex networks." },
] satisfies readonly ContentCard[]

export const deliverySteps = [
  { title: "Discover", description: "Problem, users, constraints, outcome." },
  { title: "Define", description: "Scope, architecture, backlog, measures." },
  { title: "Design", description: "Experience, systems, APIs, data." },
  { title: "Build", description: "Iterative development, automated standards." },
  { title: "Launch", description: "Safe deployment, monitoring, readiness." },
  { title: "Improve", description: "Measure, optimize, evolve continuously." },
] satisfies readonly ContentCard[]

export const insights = [
  {
    title: "Building AI features without creating an AI maintenance problem",
    description: "Ground AI work in evaluation, ownership and reliable behavior.",
  },
  {
    title: "When should an enterprise modernize instead of rewrite?",
    description: "Compare risk, economics and delivery speed first.",
  },
  {
    title: "A practical cloud migration checklist for growing software products",
    description: "Architecture, operations and team questions to answer before moving.",
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
