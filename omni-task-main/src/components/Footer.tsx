'use client'

import Link from './LocaleLink'
import { useTranslation } from '@/i18n/context'
import { CONTACT, FEATURE_REALIZACJE } from '@/lib/site-config'
import CtaButton from './CtaButton'
import { useCookieConsent } from './CookieConsent'

interface FooterPost {
  slug: string
  title: string
  image: string | null
  date: string
}

export default function Footer({ posts = [] }: { posts?: FooterPost[] }) {
  const { t, locale } = useTranslation()
  const { openSettings } = useCookieConsent()

  return (
    <footer className="footer" id="main-footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Column 1 - Brand */}
          <div className="footer__col">
            <div className="footer__brand">
              <img src="/logo-footer.png" alt="OmniTask Logo" title="OmniTask Logo" className="footer__logo-img" style={{ height: '46px', width: 'auto' }} />
            </div>
            <p className="footer__description">{t('footer.description')}</p>
            <div className="footer__socials">
              <a href="https://www.facebook.com/profile.php?id=61574333642391" target="_blank" rel="noopener noreferrer" className="footer__social-link" title="Facebook" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/omni-task" target="_blank" rel="noopener noreferrer" className="footer__social-link" title="LinkedIn" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/omnitask.pl/" target="_blank" rel="noopener noreferrer" className="footer__social-link" title="Instagram" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="footer__col">
            <h3 className="footer__heading">{t('footer.services')}</h3>
            <ul className="footer__links">
              <li><Link href="/uslugi/automatyzacja-workflow" className="footer__link" title={t('service_detail.labels.workflow')}>{t('service_detail.labels.workflow')}</Link></li>
              {locale === 'pl' && <li><Link href="/uslugi/ksef" className="footer__link" title={t('service_detail.labels.ksef')}>{t('service_detail.labels.ksef')}</Link></li>}
              <li><Link href="/uslugi/integracja-systemow" className="footer__link" title={t('service_detail.labels.integration')}>{t('service_detail.labels.integration')}</Link></li>
              {locale === 'pl' && <li><Link href="/uslugi/szkolenia-i-doradztwo" className="footer__link" title={t('service_detail.labels.szkolenia')}>{t('service_detail.labels.szkolenia')}</Link></li>}
              <li><Link href="/uslugi/rpa" className="footer__link" title={t('service_detail.labels.rpa')}>{t('service_detail.labels.rpa')}</Link></li>
              <li><Link href="/uslugi/opieka-i-hosting" className="footer__link" title={t('service_detail.labels.opieka')}>{t('service_detail.labels.opieka')}</Link></li>
              <li><Link href="/uslugi/agenci-ai" className="footer__link" title={t('service_detail.labels.ai')}>{t('service_detail.labels.ai')}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Firma */}
          <div className="footer__col">
            <h3 className="footer__heading">{t('footer.company')}</h3>
            <ul className="footer__links">
              <li><Link href="/o-nas" className="footer__link" title={t('nav.about')}>{t('nav.about')}</Link></li>
              {FEATURE_REALIZACJE && locale === 'pl' && <li><Link href="/realizacje" className="footer__link" title={t('nav.projects')}>{t('nav.projects')}</Link></li>}
              <li><Link href="/blog" className="footer__link" title={t('nav.blog')}>{t('nav.blog')}</Link></li>
              {locale === 'pl' && <li><Link href="/faq" className="footer__link" title={t('nav.faq')}>{t('nav.faq')}</Link></li>}
              <li><Link href="/kontakt" className="footer__link" title={t('nav.contact')}>{t('nav.contact')}</Link></li>
              <li><Link href="/zapytanie-ofertowe" className="footer__link" title={t('nav.quote')}>{t('nav.quote')}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Recent Posts */}
          {posts.length > 0 && (
            <div className="footer__col">
              <h3 className="footer__heading">{t('footer.recent_posts')}</h3>
              <ul className="footer__posts">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="footer__post" title={post.title}>
                      <span className="footer__post-thumb">
                        {post.image ? <img src={post.image} alt={post.title} loading="lazy" /> : null}
                      </span>
                      <span>
                        <span className="footer__post-date">
                          {new Date(post.date).toLocaleDateString(locale === 'ua' ? 'uk-UA' : locale === 'en' ? 'en-US' : 'pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="footer__post-title">{post.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 5 - Contact */}
          <div className="footer__col">
            <h3 className="footer__heading">{t('footer.contact_info')}</h3>
            <ul className="footer__contact">
              <li className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <a href={`tel:${CONTACT.phoneHref}`} className="footer__link" title="Telefon">{CONTACT.phone}</a>
              </li>
              <li className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${CONTACT.email}`} className="footer__link" title="Email">{CONTACT.email}</a>
              </li>
            </ul>
            <div className="footer__cta-group">
              <CtaButton className="btn btn--primary footer__cta" title={t('nav.book_call')}>
                {t('nav.book_call')}
              </CtaButton>
              <Link href="/zapytanie-ofertowe" className="btn btn--outline footer__cta" title={t('nav.quote')}>
                {t('nav.quote')}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t('footer.copyright')}</p>
          <div className="footer__legal-links">
            <Link href="/polityka-prywatnosci" className="footer__link" title={t('footer.privacy_policy')}>{t('footer.privacy_policy')}</Link>
            <span>|</span>
            <Link href="/regulamin" className="footer__link" title={t('footer.terms')}>{t('footer.terms')}</Link>
            <span>|</span>
            <button type="button" className="footer__link footer__link--button" onClick={openSettings} title={t('footer.cookie_settings')}>
              {t('footer.cookie_settings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
