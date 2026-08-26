'use client'

import { useTranslation } from '@/i18n/context'

interface LegalTable {
  headers: string[]
  rows: string[][]
}

interface LegalBlock {
  title?: string
  intro?: string
  paragraphs?: string[]
  items?: string[]
  table?: LegalTable
  emailIntro?: string
  emailAfter?: string
}

interface LegalSection extends LegalBlock {
  title: string
  subsections?: LegalBlock[]
}

function BlockBody({ block, email }: { block: LegalBlock; email: string }) {
  return (
    <>
      {block.emailIntro !== undefined ? (
        <p>
          {block.emailIntro}
          <a href={`mailto:${email}`} title={email}>{email}</a>
          {block.emailAfter}
        </p>
      ) : null}

      {block.intro ? <p>{block.intro}</p> : null}

      {block.items && block.items.length > 0 ? (
        <ul>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      ) : null}

      {block.paragraphs?.map((p, j) => (
        <p key={j}>{p}</p>
      ))}

      {block.table ? (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {block.table.headers.map((h, j) => <th key={j}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    ci === 0 ? <td key={ci}><strong>{cell}</strong></td> : <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  )
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
                <BlockBody block={section} email={email} />

                {section.subsections?.map((sub, si) => (
                  <div key={si}>
                    {sub.title ? <h3>{sub.title}</h3> : null}
                    <BlockBody block={sub} email={email} />
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
