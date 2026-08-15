import { writeFileSync } from "node:fs"

const siteUrl = process.env.URL
const routes = [
  "",
  "company",
  "services",
  "services/software-engineering",
  "services/ai-automation",
  "services/cloud-devops",
  "services/data-engineering",
  "services/cybersecurity",
  "services/technology-consulting",
  "industries",
  "insights",
  "careers",
  "contact",
  "privacy",
]

if (siteUrl !== undefined) {
  const urls = routes.map((route) => `  <url><loc>${siteUrl}/${route}</loc></url>`).join("\n")
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync("public/sitemap.xml", sitemap, "utf8")
}
