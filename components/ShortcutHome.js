import { useState, useEffect } from 'react'
import { useKBar } from 'kbar'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { useT } from '../lib/i18n'

export default function ShortcutHome() {
  const { query } = useKBar()
  const t = useT()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    if (isMobile) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {t({ en: 'Tap to start →', pt: 'Toque para começar →' })}
        </ButtonPrimary>
      )
    } else if (isMac) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {t({ en: 'Press', pt: 'Aperte' })} <kbd>⌘</kbd> <kbd>K</kbd> {t({ en: 'to start →', pt: 'para começar →' })}
        </ButtonPrimary>
      )
    } else {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {t({ en: 'Press', pt: 'Aperte' })} <kbd>ctrl</kbd> <kbd>K</kbd> {t({ en: 'to start →', pt: 'para começar →' })}
        </ButtonPrimary>
      )
    }
  }

  return <div />
}
