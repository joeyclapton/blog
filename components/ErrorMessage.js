import ShortcutError from './ShortcutError'
import { Box } from './Box'
import { useT } from '../lib/i18n'

export default function ErrorMessage({ code }) {
  const t = useT()
  let title = t({ en: 'five hundred', pt: 'quinhentos' })
  let description = t({ en: "Something isn't right.", pt: 'Algo não está certo.' })

  if (code === 404) {
    title = t({ en: 'four oh four', pt: 'quatro zero quatro' })
    description = t({ en: "This page doesn't exist.", pt: 'Esta página não existe.' })
  }

  return (
    <Box css={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <ShortcutError />
      <p>{description}</p>
    </Box>
  )
}
