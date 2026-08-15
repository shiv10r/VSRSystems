import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

type RouteHeroProps = {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly parent?: { readonly label: string; readonly href: string }
}

export const RouteHero = ({ eyebrow, title, description, parent }: RouteHeroProps) => (
  <section className="route-hero">
    <div className="route-hero__glow" aria-hidden="true" />
    <div className="container route-hero__inner">
      <Reveal>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          {parent === undefined ? null : (
            <>
              <Link to={parent.href}>{parent.label}</Link>
              <ChevronRight aria-hidden="true" size={14} />
            </>
          )}
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="route-hero__copy">{description}</p>
      </Reveal>
    </div>
  </section>
)
