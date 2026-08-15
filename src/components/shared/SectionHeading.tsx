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
}: SectionHeadingProps) => (
  <header className={`section-heading section-heading--${align}`}>
    {eyebrow === undefined ? null : <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {description === undefined ? null : <p className="section-heading__copy">{description}</p>}
  </header>
)
