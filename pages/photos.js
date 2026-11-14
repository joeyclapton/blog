import React from 'react'
import Base from '../layouts/Base'
import Head from 'next/head'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'
import { getAllPhotos } from '../lib/blog'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  const photos = getAllPhotos();

  return {
    props: {
      locale,
      title: pick(locale, { en: 'Photos // Joey Clapton', pt: 'Fotos // Joey Clapton' }),
      tagline: pick(locale, { en: 'Observe. Feel. Shoot.', pt: 'Observe. Sinta. Fotografe.' }),
      url: siteUrl(locale, '/photos'),
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      photos
    }
  }
}

const Photos = (props) => {
  const { title, image, photos, url: pageUrl, locale } = props
  const description = pick(locale, {
    en: `We invent ways of recording things so we are not held hostage by forgetting. Memory is what guides us through time, tells us who we are and where we come from, and gives us an identity...
  </br> Photography is what holds clocks still, turns calendars back and makes the past present, in an instant.`,
    pt: `O homem inventa processos de registro para não ser refém do esquecimento. É a memória que nos orienta no tempo, informa-nos sobre quem somos, de onde viemos e nos dá identidade...
  </br> É a fotografia que segura relógios, retorna calendários, faz do passado presente, num instante.`,
  })
  return (
    <section>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content={pageUrl} property="og:url" />
        <meta content={`https://joeyclapton.vercel.app${image}`} property="og:image" />
      </Head>
      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>{pick(locale, { en: 'My Photos', pt: 'Minhas fotos' })}</h2>
      <Container>
        {
          photos.map((url, idx) => (
            <Figure key={url}>
              <Img src={`/static/images/album/${url}`} alt={pick(locale, { en: 'Photo by Joey Clapton', pt: 'Foto de Joey Clapton' })} />
            </Figure>
          ))
        }
      </Container>
    </section>
  )
}

const Container = styled('section', {
  columnCount: 3,
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