import Head from 'next/head'
import Image from 'next/image'
import { styled } from '../stitches.config'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      title: pick(locale, { en: 'Projects // Joey Clapton', pt: 'Projetos // Joey Clapton' }),
      tagline: pick(locale, { en: 'Build. Ship. Repeat.', pt: 'Construir. Lançar. Repetir.' }),
      url: siteUrl(locale, '/projects'),
      image: '/static/images/projects-bw.jpg',
      primaryColor: 'cyan',
      secondaryColor: 'green',
    },
  }
}

function Projects(props) {
  const { title, image, url, locale } = props
  const description = pick(locale, {
    en: `Personal projects I design and build from scratch, <strong>from product to code</strong>.`,
    pt: `Projetos pessoais que eu desenho e construo do zero, <strong>do produto ao código</strong>.`,
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

      {items.map(project => (
        <Card key={project.title}>
          <Image src={project.icon} alt="" width={64} height={64} style={{ width: 64, height: 64, minWidth: 64, borderRadius: 14 }} />
          <div style={{ minWidth: 0 }}>
            <Title>
              {project.url ? (
                <a href={project.url} target="_blank" rel="noreferrer">{project.title} ↗</a>
              ) : (
                project.title
              )}
              <Status>{pick(locale, project.status)}</Status>
            </Title>
            <Description>{pick(locale, project.description)}</Description>
            <Stack>
              {project.stack.map(tech => <li key={tech}>{tech}</li>)}
            </Stack>
          </div>
        </Card>
      ))}
    </>
  )
}

const Card = styled('article', {
  display: 'flex',
  gap: 20,
  margin: '40px 0',
  '& img': { transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)' },
  '&:hover img': { transform: 'rotate(-6deg) scale(1.08)' },
  '& li': { transition: 'border-color 200ms, color 200ms' },
  '&:hover li': { borderColor: '$secondary', color: '$primary' },
  '@media (prefers-reduced-motion: reduce)': { '&:hover img': { transform: 'none' } },
})

const Title = styled('h3', {
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 10,
})

const Status = styled('span', {
  color: '$secondary',
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
})

const Description = styled('p', {
  margin: '8px 0',
})

const Stack = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: 13,
  color: '$secondary',
  '& li': {
    border: '1px solid $hover',
    borderRadius: '$borderRadius',
    padding: '2px 8px',
  },
})

Projects.Layout = Base

export default Projects
