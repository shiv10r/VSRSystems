import { motion, useReducedMotion } from "framer-motion"

type SectionHeadingProps = {
  readonly eyebrow?: string
  readonly title: string
  readonly description?: string
  readonly align?: "left" | "center"
}

const splitWords = (text: string) => text.split(" ")

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const reduceMotion = useReducedMotion()
  const words = splitWords(title)

  const hidden = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26, filter: "blur(8px)" }
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" }

  return (
    <motion.header
      className={`section-heading section-heading--${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } },
      }}
    >
      {eyebrow === undefined ? null : (
        <motion.p className="eyebrow" variants={{ hidden, visible }}>
          {eyebrow}
        </motion.p>
      )}
      <h2 aria-label={title}>
        {words.map((word, index) => (
          <motion.span
            className="section-heading__word"
            // biome-ignore lint/suspicious/noArrayIndexKey: heading words are static and never reorder
            key={`${word}-${index}`}
            variants={{ hidden, visible }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {description === undefined ? null : (
        <motion.p className="section-heading__copy" variants={{ hidden, visible }}>
          {description}
        </motion.p>
      )}
    </motion.header>
  )
}
