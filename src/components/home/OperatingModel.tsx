import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { operatingModel } from "../../data/story"
import { Reveal } from "../shared/Reveal"
import { SectionHeading } from "../shared/SectionHeading"

export const OperatingModel = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section operating-model">
      <div className="container">
        <SectionHeading
          eyebrow="Operating model"
          title="From business context to production learning"
        />
        <div className="operating-flow" aria-hidden="true">
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0.3 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {reduceMotion ? null : (
            <>
              <motion.i
                animate={{ x: ["0%", "900%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.i
                animate={{ x: ["0%", "900%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.4,
                  delay: 1.7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </>
          )}
        </div>
        <ol className="operating-model__grid">
          {operatingModel.map((step, index) => (
            <li key={step.phase}>
              <Reveal delay={index * 0.08}>
                <article className="operating-card">
                  <div className="operating-card__heading">
                    <span>{step.phase}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <p className="operating-card__flow">
                    <span>{step.input}</span>
                    <ArrowRight aria-hidden="true" size={14} />
                    <span>{step.output}</span>
                  </p>
                  <ul className="operating-card__controls">
                    {step.controls.map((control) => (
                      <li key={control}>{control}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
