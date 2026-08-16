import { ArrowUpRight } from "lucide-react"
import { projectFeed } from "../../data/projects"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const ProjectsFeed = () => (
  <section className="section project-feed-section" id="projects">
    <div className="container">
      <SectionHeading
        eyebrow="Work and solutions"
        title="Current work, grounded in real business needs"
        description="Our live VSR Systems website is shown as a current owned project. The remaining cards are representative solution patterns, not client testimonials or claims of completed client work."
      />
      <div className="project-feed-grid">
        {projectFeed.map((project, index) => (
          <Reveal
            className={`project-feed-item ${index === 0 ? "project-feed-item--featured" : ""}`}
            delay={(index % 3) * 0.05}
            key={project.title}
          >
            <article className="project-feed-card">
              <div className="project-feed-card__meta">
                <span>{project.label}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-feed-card__content">
                <h3>{project.title}</h3>
                <div>
                  <p className="project-feed-card__label">Business need</p>
                  <p>{project.businessNeed}</p>
                </div>
                <div>
                  <p className="project-feed-card__label">Delivery focus</p>
                  <p>{project.deliveryFocus}</p>
                </div>
              </div>
              <a href={project.href} aria-label={`${project.linkLabel}: ${project.title}`}>
                {project.linkLabel}
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
