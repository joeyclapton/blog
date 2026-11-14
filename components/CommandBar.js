import { styled } from '../stitches.config'
import { Box } from './Box'
import Toast from './Toast'
import { pick } from '../lib/i18n'
import { useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from 'kbar'
import Lottie from 'lottie-react'
import copyLinkIcon from '../public/static/icons/copy-link.json'
import emailIcon from '../public/static/icons/email.json'
import sourceIcon from '../public/static/icons/source.json'
import aboutIcon from '../public/static/icons/about.json'
import homeIcon from '../public/static/icons/home.json'
import articlesIcon from '../public/static/icons/articles.json'
import projectsIcon from '../public/static/icons/projects.json'
import usesIcon from '../public/static/icons/uses.json'
import reminderIcon from '../public/static/icons/reminder.json'

export default function CommandBar(props) {
  const copyLinkRef = useRef()
  const emailRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const aboutRef = useRef()
  const articlesRef = useRef()
  const projectsRef = useRef()
  const photosRef = useRef()
  const reminderRef = useRef()
  const router = useRouter()
  const t = text => pick(router.locale, text)
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = [
    {
      id: 'copy',
      name: t({ en: 'Copy Link', pt: 'Copiar link' }),
      shortcut: ['l'],
      keywords: 'copy-link',
      section: t({ en: 'General', pt: 'Geral' }),
      perform: copyLink,
      icon: <Lottie lottieRef={copyLinkRef} style={iconSize} animationData={copyLinkIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'email',
      name: t({ en: 'Send Email', pt: 'Mandar e-mail' }),
      shortcut: ['e'],
      keywords: 'send-email',
      section: t({ en: 'General', pt: 'Geral' }),
      perform: () => router.push('/contact'),
      icon: <Lottie lottieRef={emailRef} style={iconSize} animationData={emailIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'source',
      name: t({ en: 'View Source', pt: 'Ver o código' }),
      shortcut: ['s'],
      keywords: 'view-source',
      section: t({ en: 'General', pt: 'Geral' }),
      perform: () =>
        window.open('https://github.com/joeyclapton/blog', '_blank'),
      icon: <Lottie lottieRef={sourceRef} style={iconSize} animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'home',
      name: t({ en: 'Home', pt: 'Início' }),
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/'),
      icon: <Lottie lottieRef={homeRef} style={iconSize} animationData={homeIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'about',
      name: t({ en: 'About', pt: 'Sobre' }),
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/about'),
      icon: <Lottie lottieRef={aboutRef} style={iconSize} animationData={aboutIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'articles',
      name: t({ en: 'Articles', pt: 'Artigos' }),
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/articles'),
      icon: <Lottie lottieRef={articlesRef} style={iconSize} animationData={articlesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'projects',
      name: t({ en: 'Projects', pt: 'Projetos' }),
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/projects'),
      icon: <Lottie lottieRef={projectsRef} style={iconSize} animationData={projectsIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'photos',
      name: t({ en: 'Photos', pt: 'Fotos' }),
      shortcut: ['g', 'f'],
      keywords: 'go-photos',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/photos'),
      icon: <Lottie lottieRef={photosRef} style={iconSize} animationData={usesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'reminder',
      name: t({ en: 'Reminder', pt: 'Lembrete' }),
      shortcut: ['g', 'r'],
      keywords: 'go-reminder',
      section: t({ en: 'Go To', pt: 'Ir para' }),
      perform: () => router.push('/reminder'),
      icon: <Lottie lottieRef={reminderRef} style={iconSize} animationData={reminderIcon} loop={false} autoplay={false} />,
    },
  ]

  return (
    <>
      {/* o kbar registra as ações uma vez: trocar o idioma remonta a barra com os nomes novos */}
      <KBarProvider key={router.locale} actions={actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search defaultPlaceholder={t({ en: 'Type a command or search…', pt: 'Digite um comando ou busque…' })} /> {/* o KBarSearch ignora placeholder */}
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>

        {props.children}
      </KBarProvider>

      <Toast
        title={t({ en: 'Copied :D', pt: 'Copiado :D' })}
        description={t({ en: 'You can now share it with anyone.', pt: 'Agora é só compartilhar.' })}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

function RenderResults() {
  const { results } = useDeepMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = forwardRef(({ action, active }, ref) => {
  if (active) {
    action.icon.props.lottieRef.current?.play()
  } else {
    action.icon.props.lottieRef.current?.stop()
  }

  return (
    <Box
      ref={ref}
      css={getResultStyle(active)}
      onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
      onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
    >
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map(shortcut => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  )
})

ResultItem.displayName = 'ResultItem'

const Positioner = styled(KBarPositioner, {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
})

const Search = styled(KBarSearch, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
})

const GroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  background: '$command',
})

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
})

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
})

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const Animator = styled(KBarAnimator, {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },

  /* Hide scrollbar for Chrome, Safari and Opera */
  '& > div > div::-webkit-scrollbar': {
    display: 'none',
  },

  /* Hide scrollbar for IE, Edge and Firefox */
  '& > div > div': {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
})

const getResultStyle = active => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  }
}
