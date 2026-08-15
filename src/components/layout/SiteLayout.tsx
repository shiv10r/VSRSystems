import { Mail } from "lucide-react"
import { Outlet, useLocation } from "react-router-dom"
import { siteConfig } from "../../data/site"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { ScrollToTop } from "./ScrollToTop"

export const SiteLayout = () => {
  const location = useLocation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop key={location.pathname} />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <a
        className="floating-contact"
        href={`mailto:${siteConfig.email}`}
        aria-label="Email VSR Systems"
      >
        <Mail aria-hidden="true" size={19} />
        <span>Let's Talk</span>
      </a>
    </div>
  )
}
