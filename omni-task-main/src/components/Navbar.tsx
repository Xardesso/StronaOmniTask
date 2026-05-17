'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import LanguageSelector from './LanguageSelector'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const serviceLinks = [
    { href: '/uslugi/rpa', label: 'RPA' },
    { href: '/uslugi/automatyzacja-workflow', label: 'Automatyzacja workflow' },
    { href: '/uslugi/integracja-systemow', label: 'Integracja systemów' },
    { href: '/uslugi/agenci-ai', label: 'Agenci AI' },
  ]

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/uslugi', label: t('nav.services'), dropdown: true },
    { href: '/o-nas', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/kontakt', label: t('nav.contact') },
    { href: '/zapytanie-ofertowe', label: t('nav.quote') },
  ]

  return (
    <header className={`navbar ${scrolled || mobileOpen ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" title="OmniTask - Strona główna">
          <img src={scrolled || mobileOpen ? "/Logo2.png" : "/Logo.png"} alt="OmniTask Logo" title="OmniTask Logo" className="navbar__logo-img" style={{ height: '42px', width: 'auto' }} />
        </Link>

        <nav className="navbar__nav" id="desktop-nav">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.href} className="navbar__dropdown" ref={dropdownRef}>
                <button
                  className={`navbar__link navbar__link--dropdown ${pathname.startsWith('/uslugi') ? 'navbar__link--active' : ''}`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  title={link.label}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="navbar__dropdown-menu">
                    <Link href="/uslugi" className="navbar__dropdown-item" title={t('nav.services')}>
                      Wszystkie usługi
                    </Link>
                    {serviceLinks.map((svc) => (
                      <Link key={svc.href} href={svc.href} className="navbar__dropdown-item" title={svc.label}>
                        {svc.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
                title={link.label}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageSelector />
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
            <span className={`navbar__hamburger-line ${mobileOpen ? 'navbar__hamburger-line--open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} id="mobile-menu">
        <nav className="navbar__mobile-nav">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.href}>
                <Link
                  href="/uslugi"
                  className={`navbar__mobile-link ${pathname.startsWith('/uslugi') ? 'navbar__mobile-link--active' : ''}`}
                  title={link.label}
                >
                  {link.label}
                </Link>
                {serviceLinks.map((svc) => (
                  <Link key={svc.href} href={svc.href} className="navbar__mobile-link" style={{ paddingLeft: '2rem', fontSize: '0.9rem' }} title={svc.label}>
                    {svc.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${pathname === link.href ? 'navbar__mobile-link--active' : ''}`}
                title={link.label}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  )
}
