import { useId } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, MotionConfig } from 'framer-motion'
import { styled } from '../stitches.config'
import { useT } from '../lib/i18n'

// Bandeirinhas em SVG: emoji de bandeira não aparece no Windows (vira as letras "US" e "BR").
// Simplificadas para 20×14: listras e cantão nos EUA; losango, globo e faixa no Brasil.
function EUA() {
  const faixa = 14 / 13
  return (
    <svg viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#fff" />
      {Array.from({ length: 7 }, (_, k) => <rect key={k} y={k * 2 * faixa} width="20" height={faixa} fill="#B22234" />)}
      <rect width="8.8" height={7 * faixa} fill="#3C3B6E" />
    </svg>
  )
}

function Brasil() {
  const globo = useId()
  return (
    <svg viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#009C3B" />
      <path d="M10 1.7 18.3 7 10 12.3 1.7 7z" fill="#FFDF00" />
      <clipPath id={globo}><circle cx="10" cy="7" r="3.1" /></clipPath>
      <circle cx="10" cy="7" r="3.1" fill="#002776" />
      <path d="M6.6 7.6Q10 5.6 13.4 7.4" stroke="#fff" strokeWidth=".6" fill="none" clipPath={`url(#${globo})`} />
    </svg>
  )
}

const IDIOMAS = [
  ['en', 'English', EUA],
  ['pt-BR', 'Português', Brasil],
]

// A língua atual fica acesa sobre uma pílula; a outra, apagada, acende no hover.
// Ao trocar, a pílula desliza de uma bandeira para a outra (o menu não é remontado na troca).
export default function LanguageSwitch() {
  const router = useRouter()
  const t = useT()
  // a mesma página no outro idioma (o Next põe o /pt-BR na frente)
  const aqui = { pathname: router.pathname, query: router.query }

  return (
    <MotionConfig reducedMotion="user">
      <Lista aria-label={t({ en: 'Language', pt: 'Idioma' })}>
        {IDIOMAS.map(([locale, nome, Bandeira]) => {
          const atual = router.locale === locale
          return (
            <Link key={locale} href={aqui} as={router.asPath} locale={locale} scroll={false} passHref legacyBehavior>
              <Opcao lang={locale} title={nome} aria-label={nome} aria-current={atual ? 'true' : undefined}>
                {atual && <Pilula layoutId="idioma" transition={{ type: 'spring', stiffness: 520, damping: 42 }} />}
                <Moldura animate={{ scale: atual ? 1 : 0.88 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                  <Bandeira />
                </Moldura>
              </Opcao>
            </Link>
          )
        })}
      </Lista>
    </MotionConfig>
  )
}

const Lista = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  marginRight: '4px',
})

const Opcao = styled('a', {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: '36px',
  height: '34px',
  border: 0,
  borderRadius: '$borderRadius',
  opacity: 0.5,
  filter: 'grayscale(.7)',
  transition: 'opacity .2s ease-out, filter .2s ease-out, transform .2s ease-out',
  '&:hover, &:focus-visible': { opacity: 1, filter: 'none', transform: 'translateY(-1px)' },
  '&[aria-current="true"]': { opacity: 1, filter: 'none' },
  '&:focus-visible': { outline: '2px solid $primary', outlineOffset: '2px' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
})

const Pilula = styled(motion.span, {
  position: 'absolute',
  inset: 0,
  borderRadius: '$borderRadius',
  background: '$hover',
  zIndex: 0,
})

const Moldura = styled(motion.span, {
  position: 'relative',
  zIndex: 1,
  display: 'block',
  width: '20px',
  height: '14px',
  borderRadius: '3px',
  overflow: 'hidden',
  boxShadow: '0 0 0 1px rgba(255, 255, 255, .18)',
  '& svg': { display: 'block', width: '100%', height: '100%' },
})
