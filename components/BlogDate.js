import { parseISO, format } from 'date-fns'
import { useRouter } from 'next/router'
import { dateLocale } from '../lib/i18n'

export default function BlogDate({ dateString }) {
  const { locale } = useRouter()
  if (!dateString) return <div />

  const date = parseISO(dateString)
  // "May 12, 2024" em inglês, "12 mai 2024" em português
  return <time dateTime={dateString}>{format(date, locale === 'pt-BR' ? 'd LLL yyyy' : 'LLL d, yyyy', dateLocale(locale))}</time>
}
