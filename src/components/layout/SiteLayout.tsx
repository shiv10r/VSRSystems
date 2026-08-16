import { MessageCircle } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { PageProgress } from "./PageProgress"
import { ScrollToTop } from "./ScrollToTop"

export const SiteLayout = () => {
  const location = useLocation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <PageProgress />
      <ScrollToTop key={location.pathname} />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Link
        className="floating-contact"
        to="/contact"
        aria-label="Open the VSR Systems contact form"
      >
        <MessageCircle aria-hidden="true" size={19} />
        <span>Let's Talk</span>
      </Link>
    </div>
  )
}
