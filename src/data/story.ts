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
    description: "Software, AI, cloud, data, cybersecurity and technology consulting.",
  },
  {
    value: "01",
    label: "Current live project",
    description: "The VSR Systems corporate platform is live on Netlify and actively evolving.",
  },
  {
    value: "07",
    label: "Solution patterns",
    description: "One current owned project and six representative business solution patterns.",
  },
  {
    value: "Secure",
    label: "By design",
    description: "Security controls are integrated into architecture, delivery and operations.",
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
    title: "Foundation and validation",
    description:
      "Turn an opportunity into a secure, testable foundation with clear priorities and delivery boundaries.",
    capabilities: [
      "Product discovery and architecture",
      "Rapid MVP and prototype delivery",
      "Cloud and security foundations",
      "Initial data and integration design",
    ],
  },
  {
    stage: "Scale",
    title: "Growth and optimization",
    description:
      "Strengthen a working product with automation, dependable data and repeatable production delivery.",
    capabilities: [
      "Application and API development",
      "CI/CD and platform automation",
      "Data pipelines and analytics",
      "Reliability and security controls",
    ],
  },
  {
    stage: "Transform",
    title: "Modernization and innovation",
    description:
      "Modernize complex systems and operating models through an accountable, risk-aware program.",
    capabilities: [
      "Enterprise modernization roadmaps",
      "AI and intelligent automation",
      "Platform and integration strategy",
      "Advanced cloud and security posture",
    ],
  },
] satisfies readonly StageOffering[]

export const engagementModels = [
  {
    title: "Discovery sprint",
    fit: "Unclear scope, architecture decisions and investment validation",
  },
  { title: "Defined project", fit: "Known outcomes, bounded delivery and predictable milestones" },
  {
    title: "Dedicated engineering team",
    fit: "Long-term product development and continuous improvement",
  },
  {
    title: "Managed delivery",
    fit: "Ongoing support, cloud operations, reliability and security work",
  },
  {
    title: "Co-development",
    fit: "Shared product ownership with internal business and engineering teams",
  },
  {
    title: "Outcome-based program",
    fit: "Multi-phase modernization tied to measurable business outcomes",
  },
] satisfies readonly EngagementModel[]

export const strategicEnablers = [
  {
    code: "R-MVP",
    title: "Rapid minimum viable product",
    description:
      "A focused validation path that delivers the smallest useful product, gathers evidence and reduces investment risk.",
  },
  {
    code: "PF",
    title: "Platform foundation",
    description:
      "Reusable application, cloud, delivery and security foundations that help teams ship consistently as demand grows.",
  },
  {
    code: "DAE",
    title: "Data and AI enablement",
    description:
      "Governed data, evaluation patterns and workflow integration that move AI from experiments into useful operations.",
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
    input: "Business goals, users, current systems, constraints and risk appetite.",
    output: "Prioritized scope, opportunity map, assumptions and delivery risks.",
    controls: ["Stakeholder alignment", "Feasibility review", "Decision checkpoints"],
  },
  {
    phase: "02",
    title: "Design",
    input: "Validated priorities, data boundaries, integration needs and operating context.",
    output: "Solution architecture, experience flows, delivery plan and security model.",
    controls: ["Architecture review", "Threat modelling", "Acceptance criteria"],
  },
  {
    phase: "03",
    title: "Build",
    input: "Approved architecture, sequenced outcomes and a ready delivery foundation.",
    output: "Working increments, automated delivery, telemetry and production documentation.",
    controls: ["Code quality gates", "Release controls", "Security checks"],
  },
  {
    phase: "04",
    title: "Operate",
    input: "Production signals, user feedback, service health and evolving business priorities.",
    output: "Reliability improvements, optimized cost, risk reduction and product learning.",
    controls: ["Observability", "Incident learning", "Continuous improvement"],
  },
] satisfies readonly OperatingStep[]
