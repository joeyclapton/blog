import { useState, useEffect } from 'react'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { useT } from '../lib/i18n'

export default function ShortcutError() {
  const [mounted, setMounted] = useState(false)
  const t = useT()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    if (isMobile) {
      return (
        <ButtonPrimary as="a" href="/">
          {t({ en: 'Tap to go home →', pt: 'Toque para voltar ao início →' })}
        </ButtonPrimary>
      )
    }

    return (
      <ButtonPrimary as="a" href="/">
        {t({ en: 'Press', pt: 'Aperte' })} <kbd>G</kbd> <kbd>H</kbd> {t({ en: 'to go home →', pt: 'para voltar ao início →' })}
      </ButtonPrimary>
    )
  }

  return <div />
}
