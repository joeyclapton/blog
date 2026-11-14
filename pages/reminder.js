import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import { Box } from '../components/Box'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  const meta = {
    locale,
    title: pick(locale, { en: 'Reminder // Joey Clapton', pt: 'Lembrete // Joey Clapton' }),
    description: pick(locale, {
      en: 'Time is the most important asset. Time does not equal money. Time equals life. And you only have one chance to make it right.',
      pt: 'O tempo é o bem mais importante. Tempo não é dinheiro. Tempo é vida. E você só tem uma chance de fazer certo.',
    }),
    url: siteUrl(locale, '/reminder'),
    tagline: 'Amor Fati.',
    image: '/static/images/reminder-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Reminder(props) {
  const { title, description, image, url, locale } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={`https://joeyclapton.vercel.app${image}`} property="og:image" />
      </Head>

      <Box css={{ textAlign: 'justify' }}>
        <blockquote>
          {/* A Gaia Ciência, §276. Em inglês, tradução própria do original alemão (domínio público) */}
          {locale !== 'pt-BR' ? (
            <q><strong>I want to learn more and more to see what is necessary in things as beautiful: – that way I will be one of those who make things beautiful</strong>. Amor fati [love of fate]: let that be my love from now on! I do not want to wage war against what is ugly. I do not want to accuse; I do not even want to accuse the accusers. Let looking away be my only negation! And, all in all and on the whole: <strong>someday I want to be only someone who says Yes!</strong></q>
          ) : <q><strong>Quero cada vez mais aprender a ver como belo aquilo que é necessário nas coisas: – assim me tornarei um daqueles que fazem belas as coisas</strong>. Amor fati [amor ao destino]: seja este, doravante, o meu amor! Não quero fazer guerra ao que é feio. Não quero acusar, não quero nem mesmo acusar os acusadores. Que a minha única negação seja desviar o olhar! E, tudo somado e em suma: <strong>quero ser, algum dia, apenas alguém que diz Sim!</strong></q>}
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
