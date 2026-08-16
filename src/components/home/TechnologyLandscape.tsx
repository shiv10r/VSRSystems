import { technologyLandscape } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const TechnologyLandscape = () => (
  <section className="section technology-landscape">
    <div className="container">
      <SectionHeading
        eyebrow="Technology landscape"
        title="A practical stack for modern systems"
        description="Technologies are grouped from VSR Systems' existing service catalogue. Inclusion describes delivery capability, not vendor partnership or certification."
      />
      <div className="technology-landscape__grid">
        {technologyLandscape.map((group, index) => (
          <Reveal delay={(index % 3) * 0.05} key={group.title}>
            <article className="technology-group">
              <div className="technology-group__heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="technology-group__list">
                {group.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
