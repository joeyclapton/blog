import React from 'react'
import Base from '../layouts/Base'
import Head from 'next/head'
import stripHtml from '../lib/strip-html'
import { AnimateSharedLayout } from 'framer-motion'

export async function getStaticProps() {

  return {
    props: {
      title: 'Photos // Joey Clapton',
      tagline: 'Observe. Sinta. Fotografe.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
    }
  }
}

const Photos = (props) => {
  const { title, image } = props
  const description = `O homem inventa processos de registro para não ser refém do esquecimento. É a memória que nos orienta no tempo, informa-nos sobre quem somos, de onde viemos e nos dá identidade...
  </br> É a fotografia que segura relógios, retorna calendários, faz do passado presente, num instante.`

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
      </AnimateSharedLayout>
    </section>
  )
}

Photos.Layout = Base

export default Photos