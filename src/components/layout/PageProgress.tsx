import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

export const PageProgress = () => {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.35 })

  if (reduceMotion) return null

  return <motion.div className="page-progress" style={{ scaleX }} aria-hidden="true" />
}
