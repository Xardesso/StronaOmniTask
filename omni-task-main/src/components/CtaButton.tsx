'use client'

import type { ReactNode, MouseEvent } from 'react'
import { useCtaModal } from './CtaModal'

interface CtaButtonProps {
  className?: string
  title?: string
  children: ReactNode
  // Wywoływane przed otwarciem modala, np. żeby zamknąć menu mobilne.
  onBeforeOpen?: () => void
}

// Zastępuje bezpośredni link do CALCOM_URL przyciskiem, który otwiera modal
// z wyborem formy kontaktu (telefon / rozmowa w kalendarzu / opisz proces).
export default function CtaButton({ className, title, children, onBeforeOpen }: CtaButtonProps) {
  const { open } = useCtaModal()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onBeforeOpen?.()
    open()
  }

  return (
    <button type="button" className={className} title={title} onClick={handleClick}>
      {children}
    </button>
  )
}
