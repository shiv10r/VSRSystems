import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type RouteTransitionProps = {
  readonly routeKey: string
  readonly children: ReactNode
}

export const RouteTransition = ({ routeKey, children }: RouteTransitionProps) => {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, filter: "blur(6px)" }}
        transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
