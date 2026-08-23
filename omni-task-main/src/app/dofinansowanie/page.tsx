import { notFound } from 'next/navigation'
import DofinansowanieContent from '@/components/pages/DofinansowanieContent'
import { FEATURE_BUR } from '@/lib/site-config'

export default function DofinansowaniePage() {
  // Strona zostaje 404, dopóki firma nie jest faktycznie wpisana do BUR —
  // patrz specyfikacja OMNITASK 2.0, sekcja 0.3 i 4.1.
  if (!FEATURE_BUR) notFound()
  return <DofinansowanieContent />
}
