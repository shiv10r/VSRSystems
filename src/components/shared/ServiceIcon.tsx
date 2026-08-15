import { Bot, Braces, CloudCog, DatabaseZap, ShieldCheck, Workflow } from "lucide-react"
import type { ServiceIconName } from "../../data/services"

type ServiceIconProps = {
  readonly name: ServiceIconName
  readonly size?: number
}

export const ServiceIcon = ({ name, size = 22 }: ServiceIconProps) => {
  switch (name) {
    case "code":
      return <Braces aria-hidden="true" size={size} />
    case "sparkles":
      return <Bot aria-hidden="true" size={size} />
    case "cloud":
      return <CloudCog aria-hidden="true" size={size} />
    case "database":
      return <DatabaseZap aria-hidden="true" size={size} />
    case "shield":
      return <ShieldCheck aria-hidden="true" size={size} />
    case "strategy":
      return <Workflow aria-hidden="true" size={size} />
  }
}
