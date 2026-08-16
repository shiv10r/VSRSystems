import { MessageCircle } from "lucide-react"
import { Link, useLocation, useOutlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { PageProgress } from "./PageProgress"
import { RouteTransition } from "./RouteTransition"
import { ScrollToTop } from "./ScrollToTop"
import { SiteMotionLayer } from "./SiteMotionLayer"

export const SiteLayout = () => {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <PageProgress />
      <SiteMotionLayer />
      <ScrollToTop key={location.pathname} />
      <Header />
      <main id="main-content">
        <RouteTransition routeKey={location.pathname}>{outlet}</RouteTransition>
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
