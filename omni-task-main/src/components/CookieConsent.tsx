'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import LocaleLink from './LocaleLink'
import { useTranslation } from '@/i18n/context'
import { readCookieConsent, writeCookieConsent, type CookieConsent as CookieConsentValue } from '@/lib/cookie-consent'

interface CookieConsentContextType {
  openSettings: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return ctx
}

const DEFAULT_DRAFT: CookieConsentValue = { analytics: false, marketing: false }

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [draft, setDraft] = useState<CookieConsentValue>(DEFAULT_DRAFT)

  useEffect(() => {
    if (!readCookieConsent()) setVisible(true)
  }, [])

  const persist = (consent: CookieConsentValue) => {
    writeCookieConsent(consent)
    setVisible(false)
    setShowSettings(false)
  }

  const acceptAll = () => persist({ analytics: true, marketing: true })
  const rejectAll = () => persist({ analytics: false, marketing: false })
  const saveSettings = () => persist(draft)

  const openSettings = () => {
    setDraft(readCookieConsent() || DEFAULT_DRAFT)
    setShowSettings(true)
    setVisible(true)
  }

  return (
    <CookieConsentContext.Provider value={{ openSettings }}>
      {children}
      {visible && (
        <div className="cookie-consent" role="dialog" aria-label={t('cookie_consent.title')}>
          {!showSettings ? (
            <div className="cookie-consent__banner">
              <div className="cookie-consent__text">
                <strong>{t('cookie_consent.title')}</strong>
                <p>{t('cookie_consent.description')}</p>
                <LocaleLink href="/polityka-prywatnosci" className="cookie-consent__link" title={t('footer.privacy_policy')}>
                  {t('footer.privacy_policy')}
                </LocaleLink>
              </div>
              <div className="cookie-consent__actions">
                <button type="button" className="btn btn--outline-dark" onClick={openSettings}>
                  {t('cookie_consent.customize')}
                </button>
                <button type="button" className="btn btn--dark" onClick={rejectAll}>
                  {t('cookie_consent.reject')}
                </button>
                <button type="button" className="btn btn--primary" onClick={acceptAll}>
                  {t('cookie_consent.accept_all')}
                </button>
              </div>
            </div>
          ) : (
            <div className="cookie-consent__settings">
              <strong>{t('cookie_consent.settings_title')}</strong>

              <div className="cookie-consent__category">
                <div className="cookie-consent__category-header">
                  <span>{t('cookie_consent.necessary_label')}</span>
                  <input type="checkbox" checked disabled aria-label={t('cookie_consent.necessary_label')} />
                </div>
                <p>{t('cookie_consent.necessary_desc')}</p>
              </div>

              <div className="cookie-consent__category">
                <div className="cookie-consent__category-header">
                  <span>{t('cookie_consent.analytics_label')}</span>
                  <input
                    type="checkbox"
                    checked={draft.analytics}
                    onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                    aria-label={t('cookie_consent.analytics_label')}
                  />
                </div>
                <p>{t('cookie_consent.analytics_desc')}</p>
              </div>

              <div className="cookie-consent__category">
                <div className="cookie-consent__category-header">
                  <span>{t('cookie_consent.marketing_label')}</span>
                  <input
                    type="checkbox"
                    checked={draft.marketing}
                    onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                    aria-label={t('cookie_consent.marketing_label')}
                  />
                </div>
                <p>{t('cookie_consent.marketing_desc')}</p>
              </div>

              <div className="cookie-consent__actions">
                <button type="button" className="btn btn--dark" onClick={rejectAll}>
                  {t('cookie_consent.reject')}
                </button>
                <button type="button" className="btn btn--primary" onClick={saveSettings}>
                  {t('cookie_consent.save')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </CookieConsentContext.Provider>
  )
}
