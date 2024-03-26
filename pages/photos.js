import React from 'react'
import Base from '../layouts/Base'
import Head from 'next/head'
import stripHtml from '../lib/strip-html'
import { AnimateSharedLayout } from 'framer-motion'
import { styled } from '../stitches.config'

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
        <Container>
          <Figure>
            <Img src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
            <FigCaption><a href="#">1</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/suspension-bridge.jpg" alt="The Clifton Suspension Bridge" />
            <FigCaption><a href="#">2</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/sunset.jpg" alt="Sunset and boats" />
            <FigCaption><a href="#">3</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/snowy.jpg" alt="a river in the snow" />
            <FigCaption><a href="#">4</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/bristol-balloons1.jpg" alt="a single checked balloon" />
            <FigCaption><a href="#">5</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/dog-balloon.jpg" alt="a hot air balloon shaped like a dog" />
            <FigCaption><a href="#">6</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/abq-balloons.jpg" alt="View from a hot air balloon of other balloons" />
            <FigCaption><a href="#">7</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/disney-balloon.jpg" alt="a balloon fairground ride" />
            <FigCaption><a href="#">8</a></FigCaption>
          </Figure>

          <Figure>
            <Img src="https://assets.codepen.io/12005/bristol-harbor.jpg" alt="sunrise over a harbor" />
            <FigCaption><a href="#">9</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/bristol-balloons2.jpg" alt="three hot air balloons in a blue sky" />
            <FigCaption><a href="#">10</a></FigCaption>
          </Figure>
          <Figure>
            <Img src="https://assets.codepen.io/12005/toronto.jpg" alt="the Toronto light up sign at night" />
            <FigCaption><a href="#">11</a></FigCaption>
          </Figure>
        </Container>
      </AnimateSharedLayout>
    </section>
  )
}

const Container = styled('section', {
  columnCount: 4,
  columnGap: '10px',
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

const FigCaption = styled('figcaption', {
  gridRow: '2',
  gridColumn: '1',
  backgroundColor: 'rgba(255,255,255,.5)',
  padding: '.2em .5em',
  justifySelf: 'start'
})

Photos.Layout = Base

export default Photos