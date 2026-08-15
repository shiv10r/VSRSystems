export const serviceIconNames = [
  "code",
  "sparkles",
  "cloud",
  "database",
  "shield",
  "strategy",
] as const

export type ServiceIconName = (typeof serviceIconNames)[number]

export type Service = {
  readonly slug: string
  readonly icon: ServiceIconName
  readonly title: string
  readonly shortDescription: string
  readonly heroTitle: string
  readonly problem: string
  readonly deliverables: readonly string[]
  readonly capabilities: readonly string[]
  readonly technologies: readonly string[]
  readonly useCases: readonly string[]
}

export const services = [
  {
    slug: "software-engineering",
    icon: "code",
    title: "Software Engineering",
    shortDescription:
      "Modern web platforms, APIs, enterprise applications and scalable backend systems.",
    heroTitle: "Software engineered for real-world scale",
    problem:
      "Legacy constraints, fragmented systems and unclear ownership slow teams down. We turn product goals into maintainable software with clear boundaries and reliable delivery.",
    deliverables: [
      "Product and platform architecture",
      "Web applications and APIs",
      "Modernization roadmaps",
      "Automated delivery foundations",
    ],
    capabilities: [
      "Web application development",
      "API and backend engineering",
      "Enterprise modernization",
      "SaaS product engineering",
      "Integration engineering",
      "Test automation",
      "Performance optimization",
      "PWA experiences",
    ],
    technologies: [
      "React",
      "TypeScript",
      ".NET",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    useCases: [
      "Replace a difficult legacy workflow",
      "Launch a new B2B product",
      "Unify disconnected operational systems",
    ],
  },
  {
    slug: "ai-automation",
    icon: "sparkles",
    title: "AI & Automation",
    shortDescription: "Practical AI, copilots, RAG, intelligent workflows and process automation.",
    heroTitle: "Move AI from experiment to useful software",
    problem:
      "AI experiments create value only when they fit real work, use trustworthy data and can be evaluated. We design practical systems around measurable workflows.",
    deliverables: [
      "AI opportunity and workflow design",
      "Production-ready copilots",
      "Document intelligence pipelines",
      "Evaluation and guardrail frameworks",
    ],
    capabilities: [
      "Generative AI applications",
      "RAG systems",
      "AI copilots",
      "Document intelligence",
      "Workflow automation",
      "LLM integration",
      "Evaluation and guardrails",
      "Human-in-the-loop workflows",
    ],
    technologies: [
      "OpenAI",
      "Python",
      "TypeScript",
      "Vector search",
      "PostgreSQL",
      "Azure AI",
      "Event workflows",
    ],
    useCases: [
      "Search internal knowledge securely",
      "Automate document-heavy operations",
      "Assist teams with contextual recommendations",
    ],
  },
  {
    slug: "cloud-devops",
    icon: "cloud",
    title: "Cloud & DevOps",
    shortDescription:
      "Cloud-native architecture, CI/CD, containers, observability and reliable delivery.",
    heroTitle: "Cloud platforms built for dependable change",
    problem:
      "Cloud value disappears when environments drift, releases stay manual and failures are hard to diagnose. We create repeatable platforms that teams can operate confidently.",
    deliverables: [
      "Cloud landing zones",
      "CI/CD and release automation",
      "Container platforms",
      "Observability and reliability baselines",
    ],
    capabilities: [
      "Cloud architecture",
      "Azure and AWS deployment",
      "Containers",
      "CI/CD",
      "Infrastructure as code",
      "Observability",
      "Secrets and identity",
      "Cost and reliability optimization",
    ],
    technologies: [
      "Azure",
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Azure DevOps",
      "OpenTelemetry",
    ],
    useCases: [
      "Standardize application deployment",
      "Modernize a monolith safely",
      "Improve release frequency and recovery",
    ],
  },
  {
    slug: "data-engineering",
    icon: "database",
    title: "Data Engineering & Analytics",
    shortDescription:
      "Data pipelines, analytics platforms, dashboards and trustworthy decision systems.",
    heroTitle: "Turn fragmented data into dependable decisions",
    problem:
      "Reports lose trust when definitions conflict and pipelines break silently. We build governed data products that connect operational sources to useful decisions.",
    deliverables: [
      "Data platform architecture",
      "Reliable ingestion pipelines",
      "Business-ready semantic models",
      "Analytics and reporting experiences",
    ],
    capabilities: [
      "Data pipelines",
      "Lakehouse architecture",
      "Data APIs",
      "Analytics engineering",
      "Business intelligence",
      "Data quality",
      "Migration and integration",
      "Operational dashboards",
    ],
    technologies: [
      "PostgreSQL",
      "SQL Server",
      "Python",
      "Power BI",
      "Kafka",
      "Azure Data",
      "AWS Data",
    ],
    useCases: [
      "Create one trusted reporting layer",
      "Automate operational data movement",
      "Expose analytics inside digital products",
    ],
  },
  {
    slug: "cybersecurity",
    icon: "shield",
    title: "Cybersecurity",
    shortDescription: "Secure applications, identity, cloud environments and DevSecOps delivery.",
    heroTitle: "Security designed into the system",
    problem:
      "Security bolted on after delivery becomes expensive friction. We integrate practical controls into architecture, identity, code and production operations.",
    deliverables: [
      "Application threat modelling",
      "Identity and access architecture",
      "Secure delivery controls",
      "Cloud security baselines",
    ],
    capabilities: [
      "Secure architecture",
      "Application security",
      "Identity and access",
      "API security",
      "Cloud posture",
      "DevSecOps",
      "Secrets management",
      "Security observability",
    ],
    technologies: [
      "OAuth 2.0",
      "OpenID Connect",
      "Azure Identity",
      "AWS IAM",
      "SAST",
      "DAST",
      "OpenTelemetry",
    ],
    useCases: [
      "Harden a customer-facing platform",
      "Standardize identity across applications",
      "Add security controls to CI/CD",
    ],
  },
  {
    slug: "technology-consulting",
    icon: "strategy",
    title: "Technology Consulting",
    shortDescription:
      "Architecture, modernization roadmaps, delivery planning and engineering strategy.",
    heroTitle: "Clarity for high-stakes technology decisions",
    problem:
      "Transformation stalls when priorities, architecture and delivery plans are disconnected. We turn complex choices into an actionable sequence with accountable outcomes.",
    deliverables: [
      "Architecture assessments",
      "Modernization roadmaps",
      "Technical due diligence",
      "Delivery model and governance",
    ],
    capabilities: [
      "Technology strategy",
      "Architecture review",
      "Modernization planning",
      "Product discovery",
      "Delivery planning",
      "Platform evaluation",
      "Engineering effectiveness",
      "Risk reduction",
    ],
    technologies: [
      "Cloud platforms",
      "Architecture modelling",
      "Delivery metrics",
      "Security frameworks",
      "Product analytics",
    ],
    useCases: [
      "Plan a multi-year modernization",
      "Validate architecture before investment",
      "Recover a complex digital program",
    ],
  },
] satisfies readonly Service[]

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug)
