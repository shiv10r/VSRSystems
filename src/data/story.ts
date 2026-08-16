export type Milestone = {
  readonly value: string
  readonly label: string
  readonly description: string
}

export type ServiceNode = {
  readonly label: string
  readonly x: number
  readonly y: number
}

export type StageOffering = {
  readonly stage: string
  readonly title: string
  readonly description: string
  readonly capabilities: readonly string[]
}

export type EngagementModel = {
  readonly title: string
  readonly fit: string
}

export type StrategicEnabler = {
  readonly code: string
  readonly title: string
  readonly description: string
}

export type TechnologyGroup = {
  readonly title: string
  readonly technologies: readonly string[]
}

export type OperatingStep = {
  readonly phase: string
  readonly title: string
  readonly input: string
  readonly output: string
  readonly controls: readonly string[]
}

export const milestones = [
  {
    value: "06",
    label: "Service disciplines",
    description: "Software, AI, cloud, data, security, consulting.",
  },
  {
    value: "01",
    label: "Current live project",
    description: "VSR Systems corporate platform, live on Netlify.",
  },
  {
    value: "07",
    label: "Solution patterns",
    description: "One owned project, six solution patterns.",
  },
  {
    value: "Secure",
    label: "By design",
    description: "Security integrated into delivery and operations.",
  },
] satisfies readonly Milestone[]

export const serviceNodes = [
  { label: "Software", x: 110, y: 82 },
  { label: "AI", x: 370, y: 52 },
  { label: "Cloud", x: 640, y: 112 },
  { label: "Data", x: 120, y: 326 },
  { label: "Security", x: 392, y: 360 },
  { label: "Consulting", x: 650, y: 304 },
] satisfies readonly ServiceNode[]

export const stageOfferings = [
  {
    stage: "Launch",
    title: "Foundation & validation",
    description: "Secure, testable foundation with clear priorities.",
    capabilities: [
      "Discovery & architecture",
      "Rapid MVP",
      "Cloud & security foundations",
      "Data & integration design",
    ],
  },
  {
    stage: "Scale",
    title: "Growth & optimization",
    description: "Automation, data and repeatable delivery.",
    capabilities: [
      "App & API development",
      "CI/CD & platform automation",
      "Data pipelines & analytics",
      "Reliability & security",
    ],
  },
  {
    stage: "Transform",
    title: "Modernization & innovation",
    description: "Accountable, risk-aware transformation programs.",
    capabilities: [
      "Modernization roadmaps",
      "AI & intelligent automation",
      "Platform & integration strategy",
      "Advanced cloud & security",
    ],
  },
] satisfies readonly StageOffering[]

export const engagementModels = [
  { title: "Discovery sprint", fit: "Validate scope and investment" },
  { title: "Defined project", fit: "Bounded delivery, known outcomes" },
  { title: "Dedicated team", fit: "Long-term product development" },
  { title: "Managed delivery", fit: "Support, operations, reliability" },
  { title: "Co-development", fit: "Shared product ownership" },
  { title: "Outcome-based program", fit: "Multi-phase modernization" },
] satisfies readonly EngagementModel[]

export const strategicEnablers = [
  { code: "R-MVP", title: "Rapid MVP", description: "Smallest useful product, real evidence." },
  {
    code: "PF",
    title: "Platform foundation",
    description: "Reusable foundations for consistent delivery.",
  },
  {
    code: "DAE",
    title: "Data & AI enablement",
    description: "Governed data and AI that reach production.",
  },
] satisfies readonly StrategicEnabler[]

export const technologyLandscape = [
  {
    title: "Application engineering",
    technologies: ["React", "TypeScript", ".NET", "Node.js", "Python", "Progressive Web Apps"],
  },
  {
    title: "AI and automation",
    technologies: [
      "OpenAI",
      "RAG",
      "Vector search",
      "Azure AI",
      "Document intelligence",
      "Evaluation",
    ],
  },
  {
    title: "Cloud and delivery",
    technologies: ["Azure", "AWS", "Docker", "Kubernetes", "GitHub Actions", "OpenTelemetry"],
  },
  {
    title: "Data and analytics",
    technologies: ["PostgreSQL", "SQL Server", "Power BI", "Kafka", "Azure Data", "AWS Data"],
  },
  {
    title: "Security and identity",
    technologies: ["OAuth 2.0", "OpenID Connect", "Azure Identity", "AWS IAM", "SAST", "DAST"],
  },
  {
    title: "Strategy and architecture",
    technologies: [
      "Architecture modelling",
      "Delivery metrics",
      "Security frameworks",
      "Product analytics",
      "Cloud platforms",
    ],
  },
] satisfies readonly TechnologyGroup[]

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
] satisfies readonly OperatingStep[]
