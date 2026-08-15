import { Helmet } from "react-helmet-async"
import { siteConfig } from "../../data/site"

type PageMetaProps = {
  readonly title: string
  readonly description: string
}

export const PageMeta = ({ title, description }: PageMetaProps) => (
  <Helmet>
    <title>{`${title} | ${siteConfig.name}`}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | ${siteConfig.name}`} />
    <meta property="og:description" content={description} />
  </Helmet>
)
