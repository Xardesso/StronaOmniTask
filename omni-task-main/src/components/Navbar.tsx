'use client'

import Link from './LocaleLink'
import { useTranslation } from '@/i18n/context'
import LanguageSelector from './LanguageSelector'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { stripLocale } from '@/lib/i18n'
import { FEATURE_BUR, FEATURE_REALIZACJE } from '@/lib/site-config'
import ServiceIcon from './ServiceIcon'
import CtaButton from './CtaButton'

export default function Navbar() {
  const { t, locale } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Klucz aktualnie otwartego dropdownu ('uslugi' | 'branze' | null) - jeden
  // stan zamiast osobnego boolowa na każdy dropdown, żeby dodawanie kolejnych
  // (np. przyszłych kategorii nawigacji) nie wymagało powielania logiki.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const cleanPath = stripLocale(pathname)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setMobileOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.navbar__dropdown')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const allServiceLinks = [
    { href: '/uslugi/automatyzacja-workflow', slug: 'automatyzacja-workflow', label: t('service_detail.labels.workflow') },
    { href: '/uslugi/ksef', slug: 'ksef', label: t('service_detail.labels.ksef'), highlight: true, plOnly: true },
    { href: '/uslugi/integracja-systemow', slug: 'integracja-systemow', label: t('service_detail.labels.integration') },
    { href: '/uslugi/szkolenia-i-doradztwo', slug: 'szkolenia-i-doradztwo', label: t('service_detail.labels.szkolenia'), plOnly: true },
    { href: '/uslugi/rpa', slug: 'rpa', label: t('service_detail.labels.rpa') },
    { href: '/uslugi/opieka-i-hosting', slug: 'opieka-i-hosting', label: t('service_detail.labels.opieka') },
    { href: '/uslugi/agenci-ai', slug: 'agenci-ai', label: t('service_detail.labels.ai') },
  ]
  // KSeF, szkolenia i opieka nie mają sensu po angielsku/ukraińsku — brak realnego odbiorcy (spec 2.2).
  const serviceLinks = allServiceLinks.filter((s) => !s.plOnly || locale === 'pl')

  // Branże istnieją na razie tylko po polsku - kolejne dochodzą wraz z nowymi stronami.
  const industryLinks = [
    { href: '/branze/biura-nieruchomosci', slug: 'biura-nieruchomosci', label: t('branze_page.nieruchomosci_title') },
    { href: '/branze/biura-rachunkowe', slug: 'biura-rachunkowe', label: t('branze_page.rachunkowe_title') },
    { href: '/branze/handel-i-ecommerce', slug: 'handel-i-ecommerce', label: t('branze_page.ecommerce_title') },
  ]

  const navLinks = [
    { key: 'uslugi', href: '/uslugi', label: t('nav.services'), dropdown: true, items: serviceLinks, allHref: '/uslugi', allLabel: t('nav.all_services') },
    ...(locale === 'pl' ? [{ key: 'branze', href: '/branze', label: t('nav.industries'), dropdown: true, items: industryLinks, allHref: '/branze', allLabel: t('nav.all_industries') }] : []),
    ...(FEATURE_BUR && locale === 'pl' ? [{ href: '/dofinansowanie', label: t('nav.funding') }] : []),
    { href: '/cennik', label: t('nav.pricing') },
    ...(FEATURE_REALIZACJE && locale === 'pl' ? [{ href: '/realizacje', label: t('nav.projects') }] : []),
    { href: '/kontakt', label: t('nav.contact') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/o-nas', label: t('nav.about') },
  ]

  return (
    <header className={`navbar ${scrolled || mobileOpen ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" title="OmniTask - Strona główna">
          <img
            src={locale === 'pl' ? '/logo-pl.png' : '/logo-en.png'}
            alt="OmniTask Logo"
            title="OmniTask Logo"
            className="navbar__logo-img"
            style={{ height: '54px', width: 'auto' }}
          />
        </Link>

        <nav className="navbar__nav" id="desktop-nav">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.key} className="navbar__dropdown" ref={dropdownRef}>
                <button
                  className={`navbar__link navbar__link--dropdown ${cleanPath.startsWith(link.href) ? 'navbar__link--active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === link.key ? null : link.key)}
                  aria-expanded={openDropdown === link.key}
                  title={link.label}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openDropdown === link.key && (
                  <div className="navbar__dropdown-menu navbar__dropdown-menu--wide">
                    {link.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`navbar__dropdown-item ${'highlight' in item && item.highlight ? 'navbar__dropdown-item--highlight' : ''}`}
                        title={item.label}
                      >
                        <span className="navbar__dropdown-item-icon"><ServiceIcon slug={item.slug} size={18} /></span>
                        {item.label}
                      </Link>
                    ))}
                    <Link href={link.allHref} className="navbar__dropdown-item navbar__dropdown-item--all" title={link.label}>
                      {link.allLabel} →
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__link ${cleanPath === link.href ? 'navbar__link--active' : ''}`}
                title={link.label}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageSelector />
          <CtaButton className="btn btn--primary navbar__cta" title={t('nav.book_call')}>
            {t('nav.book_call')}
          </CtaButton>
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
              <div key={link.key}>
                <button
                  type="button"
                  className={`navbar__mobile-link navbar__mobile-link--toggle ${cleanPath.startsWith(link.href) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileOpenDropdown((v) => (v === link.key ? null : link.key))}
                  aria-expanded={mobileOpenDropdown === link.key}
                  aria-controls={`mobile-${link.key}-submenu`}
                >
                  <span>{link.label}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transition: 'transform 0.2s',
                      transform: mobileOpenDropdown === link.key ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileOpenDropdown === link.key && (
                  <div id={`mobile-${link.key}-submenu`} className="navbar__mobile-submenu">
                    {link.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`navbar__mobile-link navbar__mobile-link--sub ${cleanPath === item.href ? 'navbar__mobile-link--active' : ''}`}
                        title={item.label}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href={link.allHref}
                      className={`navbar__mobile-link navbar__mobile-link--sub ${cleanPath === link.allHref ? 'navbar__mobile-link--active' : ''}`}
                      title={link.label}
                    >{link.allLabel}</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${cleanPath === link.href ? 'navbar__mobile-link--active' : ''}`}
                title={link.label}
              >
                {link.label}
              </Link>
            )
          ))}
          <CtaButton
            className="btn btn--primary navbar__mobile-cta"
            title={t('nav.book_call')}
            onBeforeOpen={() => setMobileOpen(false)}
          >
            {t('nav.book_call')}
          </CtaButton>
        </nav>
      </div>
    </header>
  )
}
