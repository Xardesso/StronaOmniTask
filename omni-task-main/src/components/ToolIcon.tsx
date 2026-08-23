// Neutralne, własne glify narzędzi na pasku zaufania — nie są to oficjalne
// znaki towarowe dostawców, tylko rozróżnialne symbole kategorii narzędzia.

const PATHS: Record<string, React.ReactNode> = {
  n8n: (
    <>
      <circle cx="5" cy="12" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M7 12h5M13.5 7.5 17 6M13.5 16.5 17 18M12 12l1.5-4.5M12 12l1.5 4.5" />
    </>
  ),
  make: (
    <>
      <path d="M7 12a5 5 0 100-.01M17 12a5 5 0 100-.01" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </>
  ),
  ksef: (
    <>
      <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
      <path d="M15 2v5h5" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  comarch: (
    <>
      <rect x="3" y="10" width="6" height="10" />
      <rect x="10" y="5" width="6" height="15" />
      <rect x="17" y="13" width="4" height="7" />
    </>
  ),
  hubspot: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="16" r="2" />
      <circle cx="5" cy="16" r="2" />
      <path d="M12 7v2M17.3 15l-2.6-1.5M6.7 15l2.6-1.5" />
    </>
  ),
  'google-cloud': (
    <>
      <path d="M15.5 9.5A5.5 5.5 0 005 11a4 4 0 00.5 8h10a4.5 4.5 0 001-8.9 5.5 5.5 0 00-1-.6z" />
    </>
  ),
}

export default function ToolIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[slug] || <circle cx="12" cy="12" r="8" />}
    </svg>
  )
}
