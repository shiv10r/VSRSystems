import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

type RevealProps = {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
}

export const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const reduceMotion = useReducedMotion()
  const [compactMotion, setCompactMotion] = useState(
    () => window.matchMedia("(max-width: 680px)").matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 680px)")
    const updateMotion = (event: MediaQueryListEvent) => setCompactMotion(event.matches)
    mediaQuery.addEventListener("change", updateMotion)
    return () => mediaQuery.removeEventListener("change", updateMotion)
  }, [])

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: compactMotion ? 14 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: compactMotion ? 0.04 : 0.16 }}
      transition={{ duration: compactMotion ? 0.42 : 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
