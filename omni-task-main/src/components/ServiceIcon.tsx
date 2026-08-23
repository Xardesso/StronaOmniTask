// Spójny, rozróżnialny zestaw ikon usług — używany w gridzie na stronie
// głównej i w rozwijanym menu "Usługi", żeby karty nie wyglądały identycznie.

const PATHS: Record<string, React.ReactNode> = {
  'automatyzacja-workflow': (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <path d="M7.5 6h9M16.8 8.1 8.5 16" />
    </>
  ),
  ksef: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
      <path d="M15 2v5h5" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  'integracja-systemow': (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a2 2 0 012 2V14M6.5 10v4a2 2 0 002 2H14" />
    </>
  ),
  'szkolenia-i-doradztwo': (
    <>
      <path d="M2 8l10-4 10 4-10 4-10-4z" />
      <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  rpa: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M9 8V5a3 3 0 016 0v3" />
      <circle cx="9" cy="13.5" r="1.4" />
      <circle cx="15" cy="13.5" r="1.4" />
      <path d="M9 17h6" />
    </>
  ),
  'opieka-i-hosting': (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  'agenci-ai': (
    <>
      <path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
}

export default function ServiceIcon({ slug, size = 24 }: { slug: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[slug] || <path d="M7 10l3 3 7-7" />}
    </svg>
  )
}
