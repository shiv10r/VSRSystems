import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import {
  deliverySteps,
  differentiators,
  industries,
  insights,
  technologies,
} from "../../data/content"
import { siteConfig } from "../../data/site"
import { ButtonLink } from "../shared/Button"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"
import { TiltCard } from "../shared/TiltCard"

export const Differentiators = () => (
  <section className="section differentiators">
    <div className="container">
      <SectionHeading eyebrow="How we work" title="Our core differentiators" />
      <div className="differentiator-grid">
        {differentiators.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 0.05}>
            <TiltCard className="differentiator-card">
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export const TechnologyMarquee = () => {
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeading eyebrow="Technology" title="Technologies we build with" />
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {technologies.map((technology) => (
            <span className="marquee__item" key={`${technology}-first`}>
              {technology}
            </span>
          ))}
          {technologies.map((technology) => (
            <span className="marquee__item" key={`${technology}-second`}>
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export const IndustriesGrid = () => (
  <section className="section industries-preview">
    <div className="container">
      <SectionHeading
        eyebrow="Industry context"
        title="Technology built around your industry"
        description="We apply modern engineering patterns with respect for each operating environment, risk profile and customer journey."
      />
      <div className="industry-grid">
        {industries.map((industry, index) => (
          <Reveal delay={(index % 4) * 0.05} key={industry.title}>
            <Link className="industry-card" to="/industries">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
              <ArrowUpRight className="industry-card__arrow" aria-hidden="true" size={20} />
            </Link>
          </Reveal>
        ))}
      </div>
      <ButtonLink href="/industries" variant="text" icon>
        Explore industries
      </ButtonLink>
    </div>
  </section>
)

export const DeliveryProcess = () => (
  <section className="section process-section">
    <div className="container">
      <SectionHeading
        eyebrow="Delivery"
        title="From idea to production"
        description="A clear path that reduces uncertainty early and keeps learning connected to delivery."
      />
      <ol className="process-list">
        {deliverySteps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export const InsightsPreview = () => (
  <section className="section insights-preview">
    <div className="container">
      <SectionHeading eyebrow="Insights" title="Practical thinking for complex technology work" />
      <div className="insight-grid">
        {insights.map((insight, index) => (
          <Reveal delay={(index % 3) * 0.06} key={insight.title}>
            <article className="insight-card">
              <span className="insight-card__type">Perspective / 0{index + 1}</span>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
              <Link to="/insights">
                Read insight <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export const FinalCta = () => (
  <section className="section">
    <div className="container">
      <Reveal className="cta-panel">
        <div className="cta-panel__content">
          <p className="eyebrow">Start a conversation</p>
          <h2>Have a technology challenge worth solving?</h2>
          <p>
            Tell us what you are building, modernizing or automating. We can help turn it into a
            clear engineering plan and a production-ready solution.
          </p>
          <div className="cta-panel__actions">
            <ButtonLink href="/contact" icon>
              Start a Conversation
            </ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
              Email Us
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)
