import { useT } from '../lib/i18n'

export default function BlogViews({ views }) {
  const t = useT()
  if (views) {
    return <span> • {views} {t({ en: 'views', pt: 'visualizações' })}</span>
  }

  return <span />
}
