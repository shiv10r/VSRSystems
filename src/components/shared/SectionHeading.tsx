import { motion, useReducedMotion } from "framer-motion"

type SectionHeadingProps = {
  readonly eyebrow?: string
  readonly title: string
  readonly description?: string
  readonly align?: "left" | "center"
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const reduceMotion = useReducedMotion()

  const hidden = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 38, filter: "blur(8px)" }
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" }

  return (
    <motion.header
      className={`section-heading section-heading--${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
      }}
    >
      {eyebrow === undefined ? null : (
        <motion.p className="eyebrow" variants={{ hidden, visible }}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={{ hidden, visible }}>{title}</motion.h2>
      {description === undefined ? null : (
        <motion.p className="section-heading__copy" variants={{ hidden, visible }}>
          {description}
        </motion.p>
      )}
    </motion.header>
  )
}
