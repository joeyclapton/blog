import Head from 'next/head'
import { styled } from '../stitches.config'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/papers'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      title: pick(locale, { en: 'Papers // Joey Clapton', pt: 'Publicações // Joey Clapton' }),
      tagline: pick(locale, { en: 'Measure. Compare. Publish.', pt: 'Medir. Comparar. Publicar.' }),
      url: siteUrl(locale, '/papers'),
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'purple',
      secondaryColor: 'cyan',
    },
  }
}

function Papers(props) {
  const { title, image, url, locale } = props
  const description = pick(locale, {
    en: `Research on <strong>web rendering performance</strong>, from my undergraduate thesis at PUC Minas to peer-reviewed publications.`,
    pt: `Pesquisa sobre <strong>desempenho de renderização na web</strong>, do meu TCC na PUC Minas a publicações revisadas por pares.`,
  })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={`https://joeyclapton.vercel.app${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      <Timeline>
        {items.map(paper => (
          <Card key={paper.title}>
            <Meta>
              <Year>{paper.year}</Year>
              <Badge>{pick(locale, paper.type)}</Badge>
            </Meta>
            <Title>{paper.title}</Title>
            <Venue>{typeof paper.venue === 'string' ? paper.venue : pick(locale, paper.venue)}</Venue>
            <Authors>
              {paper.authors.map((name, i) => (
                <span key={name}>
                  {name === 'Joey Clapton' ? <strong>{name}</strong> : name}
                  {i < paper.authors.length - 1 && ', '}
                </span>
              ))}
            </Authors>
            <Summary>{pick(locale, paper.summary)}</Summary>
            <Links>
              {paper.links.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
              ))}
            </Links>
          </Card>
        ))}
      </Timeline>
    </>
  )
}

const Timeline = styled('div', {
  position: 'relative',
  marginTop: 40,
  paddingLeft: 28,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 4,
    top: 8,
    bottom: 8,
    width: 1,
    background: 'linear-gradient(to bottom, $purple, $cyan, transparent)',
  },
})

const Card = styled('article', {
  position: 'relative',
  marginBottom: 48,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: -28,
    top: 7,
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: '$background',
    border: '1px solid $purple',
    transition: 'background 200ms, box-shadow 200ms',
  },
  '&:hover::before': { background: '$purple', boxShadow: '0 0 12px $colors$purple' },
})

const Meta = styled('div', { display: 'flex', alignItems: 'center', gap: 10 })

const Year = styled('span', {
  fontFamily: '$code',
  fontSize: 13,
  color: '$secondary',
})

const Badge = styled('span', {
  color: '$purple',
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  border: '1px solid $hover',
  borderRadius: '$borderRadius',
  padding: '1px 8px',
})

const Title = styled('h3', { margin: '8px 0 4px', lineHeight: 1.3 })

const Venue = styled('p', { margin: 0, fontStyle: 'italic', color: '$secondary', fontSize: 15 })

const Authors = styled('p', {
  margin: '8px 0',
  fontSize: 14,
  color: '$secondary',
  '& strong': { color: '$primary', fontWeight: 500 },
})

const Summary = styled('p', { margin: '8px 0 12px' })

const Links = styled('div', {
  display: 'flex',
  gap: 16,
  fontFamily: '$code',
  fontSize: 13,
})

Papers.Layout = Base

export default Papers
