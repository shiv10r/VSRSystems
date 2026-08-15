import { Link } from "react-router-dom"
import { services } from "../../data/services"
import { siteConfig } from "../../data/site"

export const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer__grid">
      <div className="site-footer__brand">
        <img src="/brand/vsr-logo.svg" alt="VSR Systems" width="250" height="56" />
        <p>{siteConfig.tagline}.</p>
      </div>
      <div>
        <h2>Services</h2>
        {services.map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`}>
            {service.title}
          </Link>
        ))}
      </div>
      <div>
        <h2>Company</h2>
        <Link to="/company">About</Link>
        <Link to="/industries">Industries</Link>
        <Link to="/insights">Insights</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <h2>Connect</h2>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <p className="site-footer__note">Direct, practical technology conversations.</p>
      </div>
    </div>
    <div className="container site-footer__bottom">
      <span>&copy; {new Date().getFullYear()} VSR Systems. All rights reserved.</span>
      <Link to="/privacy">Privacy</Link>
    </div>
  </footer>
)
