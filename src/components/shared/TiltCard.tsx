import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import type { PointerEvent, ReactNode } from "react"

type TiltCardProps = {
  readonly children: ReactNode
  readonly className?: string
  readonly maxTilt?: number
}

export const TiltCard = ({ children, className = "", maxTilt = 9 }: TiltCardProps) => {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 220, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetTilt = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}
