'use client'

import { useTranslation } from '@/i18n/context'

interface LegalSection {
  title: string
  intro?: string
  paragraphs?: string[]
  items?: string[]
  emailIntro?: string
  emailAfter?: string
}

export default function LegalContent({ doc }: { doc: 'privacy' | 'terms' }) {
  const { t, tRaw } = useTranslation()
  const base = `legal.${doc}`
  const sections = tRaw<LegalSection[]>(`${base}.sections`) || []
  const email = t('legal.contact_email')

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.title`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <div className="legal-page">
        <div className="section__container">
          <div className="legal-content">
            <p><em>{t(`${base}.last_updated`)}</em></p>

            {sections.map((section, i) => (
              <section key={i}>
                <h2>{section.title}</h2>

                {section.emailIntro !== undefined ? (
                  <p>
                    {section.emailIntro}
                    <a href={`mailto:${email}`} title={email}>{email}</a>
                    {section.emailAfter}
                  </p>
                ) : null}

                {section.paragraphs?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}

                {section.intro ? <p>{section.intro}</p> : null}

                {section.items && section.items.length > 0 ? (
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <strong>{t('legal.note_label')}</strong> {t('legal.note_text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
