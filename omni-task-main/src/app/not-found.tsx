import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Strona nie została znaleziona (404)',
  description: 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: {
    title: 'Strona nie została znaleziona (404) | OmniTask',
    description: 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
    url: undefined,
    images: [],
  },
  twitter: {
    title: 'Strona nie została znaleziona (404) | OmniTask',
    description: 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
    images: [],
  },
}

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
          Błąd 404
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Nie znaleziono strony
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Strona, której szukasz, nie istnieje, została przeniesiona albo URL jest nieprawidłowy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Wróć na stronę główną
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Skontaktuj się z nami
          </Link>
        </div>
      </div>
    </section>
  )
}
