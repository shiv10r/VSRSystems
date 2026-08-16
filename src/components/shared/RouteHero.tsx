import { useReducedMotion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

type RouteHeroProps = {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly parent?: { readonly label: string; readonly href: string }
}

export const RouteHero = ({ eyebrow, title, description, parent }: RouteHeroProps) => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="route-hero">
      <div className="route-hero__glow" aria-hidden="true" />
      <svg className="route-hero__signals" viewBox="0 0 1440 760" aria-hidden="true">
        <path d="M-80 570 C280 270 530 720 860 390 S1230 180 1510 420" />
        <path d="M180 -40 C380 160 610 90 790 330 S1120 650 1450 510" />
        {reduceMotion ? null : (
          <>
            <circle r="6">
              <animateMotion
                path="M-80 570 C280 270 530 720 860 390 S1230 180 1510 420"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="4">
              <animateMotion
                path="M180 -40 C380 160 610 90 790 330 S1120 650 1450 510"
                dur="8s"
                begin="-3s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>
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
}
