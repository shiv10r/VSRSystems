import { motion, useReducedMotion } from "framer-motion"
import { milestones, serviceNodes } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

const networkCore = { x: 380, y: 210 } as const

export const MilestonesStory = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section milestones-story">
      <div className="container">
        <SectionHeading
          eyebrow="Watch our story"
          title="Milestones and delivery signals"
          description="A transparent view of what VSR Systems offers today, without borrowed customer counts, team claims or certifications."
        />
        <div className="milestones-story__layout">
          <div className="milestone-grid">
            {milestones.map((milestone, index) => (
              <Reveal delay={index * 0.06} key={milestone.label}>
                <article className="milestone-card">
                  <span>{milestone.value}</span>
                  <h3>{milestone.label}</h3>
                  <p>{milestone.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="service-network surface" delay={0.12}>
            <div className="service-network__heading">
              <p className="eyebrow">Connected capabilities</p>
              <h3>One delivery system, six disciplines</h3>
            </div>
            <svg viewBox="0 0 760 420" role="img" aria-labelledby="service-network-title">
              <title id="service-network-title">VSR Systems connected service disciplines</title>
              {serviceNodes.map((node, index) => (
                <g key={node.label}>
                  <line
                    className="service-network__line"
                    x1={networkCore.x}
                    y1={networkCore.y}
                    x2={node.x}
                    y2={node.y}
                  />
                  <motion.circle
                    className="service-network__packet"
                    cx={networkCore.x}
                    cy={networkCore.y}
                    r="4"
                    animate={
                      reduceMotion
                        ? false
                        : {
                            x: [0, node.x - networkCore.x],
                            y: [0, node.y - networkCore.y],
                            opacity: [0, 1, 0],
                          }
                    }
                    transition={{
                      duration: 3.8,
                      repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
                      delay: index * 0.48,
                      ease: "easeInOut",
                    }}
                  />
                  <g className="service-network__node" transform={`translate(${node.x} ${node.y})`}>
                    <circle r="24" />
                    <text y="44">{node.label}</text>
                  </g>
                </g>
              ))}
              <g
                className="service-network__core"
                transform={`translate(${networkCore.x} ${networkCore.y})`}
              >
                <circle r="48" />
                <text y="4">VSR</text>
              </g>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
