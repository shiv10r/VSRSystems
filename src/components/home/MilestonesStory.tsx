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
                  <motion.line
                    className="service-network__line"
                    x1={networkCore.x}
                    y1={networkCore.y}
                    x2={node.x}
                    y2={node.y}
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, delay: index * 0.12, ease: "easeInOut" }}
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
                    <motion.circle
                      r="24"
                      animate={
                        reduceMotion ? false : { scale: [1, 1.3, 1], opacity: [0.45, 1, 0.45] }
                      }
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.4,
                        ease: "easeInOut",
                      }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                    <text y="44">{node.label}</text>
                  </g>
                </g>
              ))}
              <g
                className="service-network__core"
                transform={`translate(${networkCore.x} ${networkCore.y})`}
              >
                <motion.circle
                  r="48"
                  animate={reduceMotion ? false : { scale: [1, 1.16, 1], opacity: [0.55, 1, 0.55] }}
                  transition={{
                    duration: 3.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                <text y="4">VSR</text>
              </g>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
