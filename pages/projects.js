import Head from 'next/head'
import Image from 'next/image'
import { styled } from '../stitches.config'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  return {
    props: {
      title: 'Projects // Joey Clapton',
      tagline: 'Build. Ship. Repeat.',
      image: '/static/images/projects-bw.jpg',
      primaryColor: 'cyan',
      secondaryColor: 'green',
    },
  }
}

function Projects(props) {
  const { title, image } = props
  const description = `Projetos pessoais que eu desenho e construo do zero, <strong>do produto ao código</strong>.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://joeyclapton.vercel.app/projects" property="og:url" />
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
              <Status>{project.status}</Status>
            </Title>
            <Description>{project.description}</Description>
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
