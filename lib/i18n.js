import { useRouter } from 'next/router'
import { ptBR } from 'date-fns/locale'

// Os textos ficam ao lado de onde são usados, nas duas línguas: t({ en: 'About', pt: 'Sobre' })
export const pick = (locale, text) => (locale === 'pt-BR' ? text.pt : text.en)

export function useT() {
  const { locale } = useRouter()
  return text => pick(locale, text)
}

// endereço público de uma página no idioma atual (og:url e hreflang)
export const siteUrl = (locale, path = '') =>
  `https://joeyclapton.vercel.app${locale === 'pt-BR' ? '/pt-BR' : ''}${path}`

// para o date-fns escrever "jul 2024" em português
export const dateLocale = locale => (locale === 'pt-BR' ? { locale: ptBR } : undefined)
