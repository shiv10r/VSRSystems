import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { ButtonLink } from "../shared/Button"
import { OrbitArtwork } from "../shared/OrbitArtwork"

export const Hero = () => {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? false : { opacity: 0, y: 24 }

  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.p
            className="eyebrow"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            VSR Systems / Digital Engineering & Consulting
          </motion.p>
          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Engineering <span className="gradient-text">intelligent systems</span> for modern
            business
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            We design, build, modernize and scale secure digital products using cloud, AI, data and
            modern software engineering.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            <ButtonLink href="/contact" icon>
              Start a Project
            </ButtonLink>
            <ButtonLink href="/#services" variant="secondary">
              Explore Services
            </ButtonLink>
          </motion.div>
        </div>
        <motion.div
          className="hero__art"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.18 }}
        >
          <OrbitArtwork />
        </motion.div>
      </div>
      <div className="container hero__strip">
        <span>Software Engineering</span>
        <i /> <span>AI & Automation</span>
        <i /> <span>Cloud</span>
        <i /> <span>Data</span>
        <i /> <span>Security</span>
      </div>
      <a className="hero__scroll" href="#intro" aria-label="Scroll to introduction">
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </section>
  )
}
