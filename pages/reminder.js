import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import { Box } from '../components/Box'

export async function getStaticProps() {
  const meta = {
    title: 'Reminder // Joey Clapton',
    description:
      'Time is the most important asset. Time does not equal money. Time equals life. And you only have one chance to make it right.',
    tagline: 'Amor Fati.',
    image: '/static/images/reminder-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Reminder(props) {
  const { title, description, image } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://https://joeyclapton.vercel.app/reminder" property="og:url" />
        <meta content={`https://https://joeyclapton.vercel.app${image}`} property="og:image" />
      </Head>

      <Box css={{ textAlign: 'justify' }}>
        <blockquote>
          <q><strong>Quero cada vez mais aprender a ver como belo aquilo que é necessário nas coisas: – assim me tornarei um daqueles que fazem belas as coisas</strong>. Amor fati [amor ao destino]: seja este, doravante, o meu amor! Não quero fazer guerra ao que é feio. Não quero acusar, não quero nem mesmo acusar os acusadores. Que a minha única negação seja desviar o olhar! E, tudo somado e em suma: <strong>quero ser, algum dia, apenas alguém que diz Sim!</strong></q>
        </blockquote>
        <p>
          <em>Nietzsche</em>
        </p>
      </Box>
    </>
  )
}

Reminder.Layout = Base

export default Reminder
