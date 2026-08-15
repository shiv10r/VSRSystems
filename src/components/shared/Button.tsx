import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type ButtonLinkProps = {
  readonly children: ReactNode
  readonly href: string
  readonly variant?: "primary" | "secondary" | "text"
  readonly icon?: boolean
  readonly className?: string
}

export const ButtonLink = ({
  children,
  href,
  variant = "primary",
  icon = false,
  className = "",
}: ButtonLinkProps) => {
  const classes = `button button--${variant} ${className}`.trim()

  if (href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href}>
        <span>{children}</span>
        {icon ? <ArrowRight aria-hidden="true" size={17} /> : null}
      </a>
    )
  }

  return (
    <Link className={classes} to={href}>
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={17} /> : null}
    </Link>
  )
}
