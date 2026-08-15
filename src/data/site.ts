export const siteConfig = {
  name: "VSR Systems",
  tagline: "Engineering Intelligent Systems for Modern Business",
  description:
    "VSR Systems builds modern software, cloud platforms, AI automation, data solutions and secure digital products.",
  email: "shr1030cd@gmail.com",
} as const

export type NavItem = {
  readonly label: string
  readonly href: string
  readonly children?: readonly NavItem[]
}

export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "Overview", href: "/company" },
      { label: "Why VSR Systems", href: "/company#advantage" },
      { label: "Our Approach", href: "/company#approach" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Software Engineering", href: "/services/software-engineering" },
      { label: "AI & Automation", href: "/services/ai-automation" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "Data Engineering", href: "/services/data-engineering" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "Technology Consulting", href: "/services/technology-consulting" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] satisfies readonly NavItem[]
