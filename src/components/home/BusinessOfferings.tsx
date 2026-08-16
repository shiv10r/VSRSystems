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
          description="The structure adapts the sample's staged offering model for businesses generally, using only VSR Systems' declared capabilities."
        />
        <div className="stage-offerings__grid">
          {stageOfferings.map((offering, index) => (
            <Reveal delay={index * 0.07} key={offering.stage}>
              <article className="stage-offering-card">
                <div className="stage-offering-card__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{offering.stage}</strong>
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                <ul>
                  {offering.capabilities.map((capability) => (
                    <li key={capability}>
                      <Check aria-hidden="true" size={16} />
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
          description="Choose the level of ownership, continuity and outcome alignment that fits the initiative."
        />
        <div className="engagement-grid">
          {engagementModels.map((model, index) => (
            <Reveal delay={(index % 3) * 0.05} key={model.title}>
              <article className="engagement-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{model.title}</h3>
                <p>{model.fit}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section enablers-section">
      <div className="container">
        <SectionHeading
          eyebrow="Strategic enablers"
          title="Reusable foundations that reduce delivery friction"
          description="Focused approaches that help teams validate, establish and scale digital capabilities responsibly."
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
