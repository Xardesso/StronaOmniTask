'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import LocaleLink from './LocaleLink'
import { useTranslation } from '@/i18n/context'
import { CALCOM_URL, CONTACT } from '@/lib/site-config'

interface CtaModalContextType {
  open: () => void
}

const CtaModalContext = createContext<CtaModalContextType | undefined>(undefined)

export function useCtaModal() {
  const ctx = useContext(CtaModalContext)
  if (!ctx) {
    throw new Error('useCtaModal must be used within a CtaModalProvider')
  }
  return ctx
}

export function CtaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <CtaModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen && (
        <div className="cta-modal__backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="cta-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t('cta_modal.title')}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cta-modal__close"
              onClick={() => setIsOpen(false)}
              aria-label={t('cta_modal.close')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="cta-modal__title">{t('cta_modal.title')}</h2>
            <p className="cta-modal__subtitle">{t('cta_modal.subtitle')}</p>

            <div className="cta-modal__options">
              <a href={`tel:${CONTACT.phoneHref}`} className="cta-modal__option" onClick={() => setIsOpen(false)}>
                <span className="cta-modal__option-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <span className="cta-modal__option-text">
                  <strong>{t('cta_modal.phone_title')}</strong>
                  <span>{CONTACT.phone}</span>
                </span>
              </a>

              <a
                href={CALCOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-modal__option"
                onClick={() => setIsOpen(false)}
              >
                <span className="cta-modal__option-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <span className="cta-modal__option-text">
                  <strong>{t('cta_modal.book_title')}</strong>
                  <span>{t('cta_modal.book_desc')}</span>
                </span>
              </a>

              <LocaleLink href="/zapytanie-ofertowe" className="cta-modal__option" onClick={() => setIsOpen(false)}>
                <span className="cta-modal__option-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="cta-modal__option-text">
                  <strong>{t('cta_modal.describe_title')}</strong>
                  <span>{t('cta_modal.describe_desc')}</span>
                </span>
              </LocaleLink>
            </div>
          </div>
        </div>
      )}
    </CtaModalContext.Provider>
  )
}
