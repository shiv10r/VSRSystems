import { ChevronDown, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { navigation } from "../../data/site"
import { ButtonLink } from "../shared/Button"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null)
  const closeMenu = () => {
    setMenuOpen(false)
    setExpandedLabel(null)
  }

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen)
    return () => document.body.classList.remove("menu-is-open")
  }, [menuOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/" aria-label="VSR Systems home">
          <img src="/brand/vsr-logo.svg" alt="VSR Systems" width="250" height="56" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <div className="desktop-nav__item" key={item.label}>
              <NavLink to={item.href} className={({ isActive }) => (isActive ? "is-active" : "")}>
                {item.label}
                {item.children === undefined ? null : <ChevronDown aria-hidden="true" size={14} />}
              </NavLink>
              {item.children === undefined ? null : (
                <div className="desktop-nav__panel">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="site-header__actions">
          <ButtonLink href="/contact" className="header-cta">
            Let's Talk
          </ButtonLink>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={`mobile-drawer ${menuOpen ? "is-open" : ""}`} id="mobile-navigation">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <div className="mobile-nav__group" key={item.label}>
              <div className="mobile-nav__row">
                <Link to={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
                {item.children === undefined ? null : (
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} links`}
                    aria-expanded={expandedLabel === item.label}
                    onClick={() =>
                      setExpandedLabel((label) => (label === item.label ? null : item.label))
                    }
                  >
                    <ChevronDown aria-hidden="true" size={18} />
                  </button>
                )}
              </div>
              {item.children === undefined || expandedLabel !== item.label ? null : (
                <div className="mobile-nav__children">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href} onClick={closeMenu}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <ButtonLink href="/contact" icon>
            Start a Project
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
