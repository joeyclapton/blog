import React from 'react'
import Base from '../layouts/Base'
import Head from 'next/head'
import stripHtml from '../lib/strip-html'
import { AnimateSharedLayout } from 'framer-motion'
import { styled } from '../stitches.config'
import { getAllPhotos } from '../lib/blog'

export async function getStaticProps() {
  const photos = getAllPhotos();

  return {
    props: {
      title: 'Photos // Joey Clapton',
      tagline: 'Observe. Sinta. Fotografe.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      photos
    }
  }
}

const Photos = (props) => {
  const { title, image, photos } = props
  const description = `O homem inventa processos de registro para não ser refém do esquecimento. É a memória que nos orienta no tempo, informa-nos sobre quem somos, de onde viemos e nos dá identidade...
  </br> É a fotografia que segura relógios, retorna calendários, faz do passado presente, num instante.`
  console.log(photos)
  return (
    <section>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/articles" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>
      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>My Photos</h2>
        <Container>
          {
            photos.map((url, idx) => (
              <Figure key={url}>
                <Img src={`/static/images/album/${url}`} alt="A windmill" />
              </Figure>
            ))
          }
        </Container>
      </AnimateSharedLayout>
    </section>
  )
}

const Container = styled('section', {
  columnCount: 4,
  columnGap: '16px',
  marginTop: 24
})

const Figure = styled('figure', {
  margin: '0',
  display: 'grid',
  gridTemplateRows: '2fr auto',
  marginBottom: '10px',
  breakInside: 'avoid',
  cursor: 'pointer'
})

const Img = styled('img', {
  gridRow: '1 / -1',
  gridColumn: 1,
})

Photos.Layout = Base

export default Photos