import { Check } from "lucide-react"
import { engagementModels, stageOfferings, strategicEnablers } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const BusinessOfferings = () => (
  <>
    <section className="section stage-offerings">
      <div className="container">
        <SectionHeading
          eyebrow="Business-stage offerings"
          title="Engineering support shaped around where you are"
        />
        <div className="stage-offerings__chart">
          {stageOfferings.map((offering, index) => (
            <Reveal delay={index * 0.07} key={offering.stage}>
              <article className="stage-offering-card">
                <div className="stage-offering-card__bar" aria-hidden="true" />
                <div className="stage-offering-card__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{offering.stage}</strong>
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                <ul className="capability-chips">
                  {offering.capabilities.map((capability) => (
                    <li key={capability}>
                      <Check aria-hidden="true" size={13} />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section engagement-section">
      <div className="container">
        <SectionHeading
          eyebrow="Flexible engagement"
          title="A delivery model matched to the work"
        />
        <ol className="engagement-spectrum">
          {engagementModels.map((model, index) => (
            <Reveal delay={(index % 3) * 0.05} key={model.title}>
              <li className="engagement-spectrum__item">
                <span className="engagement-spectrum__dot" aria-hidden="true" />
                <h3>{model.title}</h3>
                <p>{model.fit}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="section enablers-section">
      <div className="container">
        <SectionHeading
          eyebrow="Strategic enablers"
          title="Reusable foundations that reduce delivery friction"
        />
        <div className="enabler-grid">
          {strategicEnablers.map((enabler, index) => (
            <Reveal delay={index * 0.07} key={enabler.code}>
              <article className="enabler-card">
                <span>{enabler.code}</span>
                <h3>{enabler.title}</h3>
                <p>{enabler.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
)
