import { ArrowUpRight, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { capabilities } from "../../data/content"
import { services } from "../../data/services"
import { ButtonLink } from "../shared/Button"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"
import { ServiceIcon } from "../shared/ServiceIcon"
import { TiltCard } from "../shared/TiltCard"

export const Intro = () => (
  <section className="section intro" id="intro">
    <div className="container intro__grid">
      <Reveal>
        <h2>
          Build smarter.
          <br />
          Move faster.
          <br />
          <span className="gradient-text">Scale confidently.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p>
          VSR Systems helps organizations turn complex technology challenges into practical,
          scalable solutions. From application modernization and cloud platforms to AI automation
          and data engineering, we combine consulting discipline with hands-on product engineering.
        </p>
      </Reveal>
    </div>
  </section>
)

export const ServicesGrid = () => (
  <section className="section services-section" id="services">
    <div className="container">
      <SectionHeading
        eyebrow="Ways we serve"
        title="Expertise connected around the outcome"
        description="From strategy through production, VSR Systems brings engineering, cloud, data, AI and security expertise together to solve high-impact business problems."
      />
      <div className="card-grid">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 3) * 0.05}>
            <TiltCard className="content-card service-card">
              <div className="content-card__icon">
                <ServiceIcon name={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <ArrowUpRight className="service-card__arrow" aria-hidden="true" size={20} />
              <Link
                className="content-card__link"
                to={`/services/${service.slug}`}
                aria-label={`Explore ${service.title}`}
              />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export const StoryPanel = () => (
  <section className="section section--tight">
    <div className="container">
      <Reveal className="story-panel surface">
        <div className="story-panel__signal" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="story-panel__content">
          <p className="eyebrow">VSR Systems</p>
          <h2>Technology that moves business forward</h2>
          <p>
            From an ambitious idea to dependable software, we connect strategy, engineering and
            operations into one accountable delivery path.
          </p>
          <ButtonLink href="/company" variant="secondary" icon>
            Our approach
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  </section>
)

export const CapabilityCards = () => (
  <section className="section section--tight">
    <div className="container">
      <SectionHeading
        eyebrow="Built for dependable progress"
        title="Capability without invented numbers"
        description="What matters is how the work is designed, delivered and operated."
      />
      <div className="metric-grid">
        {capabilities.map((item, index) => (
          <article className="metric-card" key={item.title}>
            <span className="metric-card__index">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const advantagePoints = [
  "Senior engineering mindset",
  "Product-first execution",
  "Cloud and automation by default",
  "Secure and maintainable architecture",
  "Transparent communication",
  "Outcome-focused delivery",
] as const

export const Advantage = () => (
  <section className="section advantage" id="advantage">
    <div className="container advantage__grid">
      <Reveal>
        <p className="eyebrow">The VSR advantage</p>
        <h2>
          Small expert teams.
          <br />
          Clear ownership.
          <br />
          <span className="gradient-text">Fast evidence.</span>
        </h2>
        <p>
          Large transformation programs slow down when technology, delivery and business priorities
          are treated separately. VSR Systems works as one accountable engineering partner from
          prototype to production.
        </p>
        <ButtonLink href="/company" variant="secondary" icon>
          Why VSR Systems
        </ButtonLink>
      </Reveal>
      <Reveal delay={0.08} className="advantage__panel surface">
        <div className="advantage__diagram" aria-hidden="true">
          <span>DISCOVER</span>
          <span>ENGINEER</span>
          <span>OPERATE</span>
        </div>
        <ul>
          {advantagePoints.map((point) => (
            <li key={point}>
              <Check aria-hidden="true" size={18} />
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
)
