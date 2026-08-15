import { CheckCircle2 } from "lucide-react"
import { Navigate, useParams } from "react-router-dom"
import { FinalCta } from "../components/home/HomeSecondary"
import { ButtonLink } from "../components/shared/Button"
import { PageMeta } from "../components/shared/PageMeta"
import { RouteHero } from "../components/shared/RouteHero"
import { ServiceIcon } from "../components/shared/ServiceIcon"
import { getServiceBySlug, services } from "../data/services"

export const ServicesPage = () => (
  <>
    <PageMeta
      title="Services"
      description="Software, AI, cloud, data, cybersecurity and technology consulting services from VSR Systems."
    />
    <RouteHero
      eyebrow="Services"
      title="Engineering capability connected around your outcome"
      description="Strategy matters most when it can survive contact with delivery. Our services connect business priorities to secure, maintainable systems."
    />
    <section className="section">
      <div className="container service-index">
        {services.map((service) => (
          <article className="service-index__item" key={service.slug}>
            <div className="content-card__icon">
              <ServiceIcon name={service.icon} />
            </div>
            <div>
              <h2>{service.title}</h2>
              <p>{service.shortDescription}</p>
            </div>
            <ButtonLink href={`/services/${service.slug}`} variant="text" icon>
              Explore service
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
    <FinalCta />
  </>
)

export const ServiceDetailPage = () => {
  const { slug } = useParams()
  const service = slug === undefined ? undefined : getServiceBySlug(slug)
  if (service === undefined) return <Navigate to="/services" replace />

  return (
    <>
      <PageMeta title={service.title} description={service.shortDescription} />
      <RouteHero
        eyebrow={service.title}
        title={service.heroTitle}
        description={service.shortDescription}
        parent={{ label: "Services", href: "/services" }}
      />
      <section className="section service-detail">
        <div className="container service-detail__intro">
          <div>
            <p className="eyebrow">The business problem</p>
            <h2>Build the right system, not just more software</h2>
          </div>
          <p>{service.problem}</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <header className="section-heading">
            <p className="eyebrow">What we deliver</p>
            <h2>From direction to dependable operation</h2>
          </header>
          <div className="delivery-grid">
            {service.deliverables.map((item) => (
              <article key={item}>
                <CheckCircle2 className="delivery-grid__icon" aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section service-capabilities">
        <div className="container service-columns">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2>Focused expertise for the work ahead</h2>
          </div>
          <ul>
            {service.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container technology-use">
          <div>
            <p className="eyebrow">Technology stack</p>
            <div className="tag-list">
              {service.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Example use cases</p>
            <ol>
              {service.useCases.map((useCase, index) => (
                <li key={useCase}>
                  <span>0{index + 1}</span>
                  {useCase}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
