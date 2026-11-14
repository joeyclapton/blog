import { styled, keyframes } from '../stitches.config'

export const PostMain = styled('main', {
  '@bp2': { padding: '$navHeightDesktop 0' },
  padding: '$navHeightMobile 0',
  overflow: 'hidden',
  flex: '1 1',
})

export const Post = styled('main', {
  overflow: 'hidden',
  flex: '1 1',
})

const rise = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
  to: { opacity: 1, transform: 'none', filter: 'none' },
})

// cada bloco da página entra um pouco depois do anterior; do 9º em diante entram juntos
const stagger = Object.fromEntries(
  Array.from({ length: 8 }, (_, i) => [`& > *:nth-child(${i + 1})`, { animationDelay: `${i * 70}ms` }])
)

export const PostContainer = styled('div', {
  margin: '0 auto',
  maxWidth: '960px',
  padding: '0 20px',
  '& > *': { animation: `${rise} 600ms cubic-bezier(0.22, 1, 0.36, 1) both`, animationDelay: '560ms' },
  ...stagger,
  '@media (prefers-reduced-motion: reduce)': { '& > *': { animation: 'none' } },
})

export const PostContent = styled('div', {
  fontSize: '16px',
  lineHeight: '32px',
  color: '$secondary',
  background: '$background',
  position: 'relative',
  zIndex: 1,
  height: '100%',
  padding: '20px 0',
  '& .iframe-wrap': {
    height: '0',
    marginBottom: '20px',
    overflow: 'hidden',
    paddingBottom: '56.25%',
    paddingTop: '30px',
    position: 'relative',
  },
  '& .iframe-wrap iframe': {
    border: '0',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
  },
  '& .post-image-caption': {
    color: '$secondary',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '14px',
  },
  '& .post-image-full': {
    margin: '20px 0 0',
    maxWidth: 'initial',
    width: '70vw',
    '@bp2': {
      marginLeft: 'calc(-1 * (70vw - 760px) / 2)',
    },
    '@bp4': {
      marginLeft: 0,
    },
  },
  '& .side-by-side': {
    display: 'flex',
    width: '90vw',
    margin: '40px 0',
    flexDirection: 'row',
    '@bp2': {
      marginLeft: 'calc(-1 * (90vw - 760px) / 2)',
    },
    '@bp4': {
      marginLeft: 0,
      flexDirection: 'column',
    },
  },
  '& .side-by-side-img': {
    minWidth: '50%',
    '@bp2': {
      minWidth: '100%',
    },
    '@bp4': {
      // marginLeft: 0,
    },
  },
  '& .side-by-side-caption': {
    color: '$secondary',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '14px',
    marginTop: -30,
  },
})
