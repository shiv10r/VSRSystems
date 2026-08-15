import { motion, useReducedMotion } from "framer-motion"

export const OrbitArtwork = () => {
  const reduceMotion = useReducedMotion()
  const orbitTransition = {
    duration: reduceMotion ? 0 : 24,
    repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
    ease: "linear" as const,
  }

  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit__halo" />
      <motion.div
        className="orbit__ring orbit__ring--outer"
        animate={{ rotate: reduceMotion ? 0 : 360 }}
        transition={orbitTransition}
      >
        <span className="orbit__node orbit__node--cyan" />
        <span className="orbit__node orbit__node--magenta" />
      </motion.div>
      <motion.div
        className="orbit__ring orbit__ring--inner"
        animate={{ rotate: reduceMotion ? 0 : -360 }}
        transition={{ ...orbitTransition, duration: reduceMotion ? 0 : 18 }}
      >
        <span className="orbit__node orbit__node--violet" />
      </motion.div>
      <div className="orbit__core">
        <img src="/brand/vsr-mark.svg" alt="" width="72" height="72" />
        <span>INTELLIGENT SYSTEMS</span>
      </div>
      <span className="orbit__label orbit__label--one">SOFTWARE</span>
      <span className="orbit__label orbit__label--two">CLOUD</span>
      <span className="orbit__label orbit__label--three">DATA</span>
    </div>
  )
}
