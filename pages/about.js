import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Pronunciation from '../components/Pronunciation'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import items from '../data/about'
import { useRouter } from 'next/router'
import { pick, siteUrl, dateLocale } from '../lib/i18n'
import Lottie from 'lottie-react'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'

export async function getStaticProps({ locale }) {
  const meta = {
    title: pick(locale, { en: 'About // Joey Clapton', pt: 'Sobre // Joey Clapton' }),
    description: pick(locale, {
      en: `Joey Clapton is a software engineer at Plank, based in Belo Horizonte. He builds products end to end, from the interface to the back-end integration, and has worked at CI&T, Hotmart, Globo.com, Ford and Nucont. In his spare time he builds the Mesa Posta and Tá Vindo apps.`,
      pt: `Joey Clapton é engenheiro de software na Plank, em Belo Horizonte. Constrói produtos de ponta a ponta, da interface à integração com o back-end, e já passou por CI&T, Hotmart, Globo.com, Ford e Nucont. Nas horas vagas desenvolve os apps Mesa Posta e Tá Vindo.`,
    }),
    tagline: pick(locale, { en: 'Learning. Running. Living. Repeat.', pt: 'Aprender. Correr. Viver. Repetir.' }),
    url: siteUrl(locale, '/about'),
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image, url } = props
  const { locale } = useRouter()
  const pt = locale === 'pt-BR'
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Joey"
            src="/static/images/me.jpeg"
            width="384"
            height="576"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>{pt ? 'Hey, me chamo Joey Clapton' : "Hey, I'm Joey Clapton"}</strong>
          </Paragraph>
          {pt ? <>
            <Paragraph>
              Nasci em <strong>Belo Horizonte</strong>, <strong>Minas Gerais</strong> 🔺, terra da cachaça, do café e do pão de queijo.</Paragraph>
            <Paragraph>
              Sou <strong>engenheiro de software</strong> na <strong>Plank</strong>, onde construo produtos e provas de conceito de ponta a ponta, da interface à integração com sistemas como o SAP.
              Antes passei por <strong>CI&T</strong>, <strong>Hotmart</strong>, <strong>Globo.com</strong>, <strong>Ford</strong>, <strong>Nucont</strong> e outras.
            </Paragraph>
            <Paragraph>
              Nas horas vagas construo meus próprios apps, como o <Link href="/projects">Mesa Posta e o Tá Vindo</Link>. Também corro, escrevo poemas e estudo sobre cafés e vinhos.
            </Paragraph>
          </> : <>
            <Paragraph>
              I was born in <strong>Belo Horizonte</strong>, <strong>Minas Gerais</strong> 🔺, the land of cachaça, coffee and pão de queijo.</Paragraph>
            <Paragraph>
              I'm a <strong>software engineer</strong> at <strong>Plank</strong>, where I build products and proofs of concept end to end, from the interface to integrations with systems like SAP.
              Before that I worked at <strong>CI&T</strong>, <strong>Hotmart</strong>, <strong>Globo.com</strong>, <strong>Ford</strong>, <strong>Nucont</strong> and others.
            </Paragraph>
            <Paragraph>
              In my spare time I build my own apps, like <Link href="/projects">Mesa Posta and Tá Vindo</Link>. I also run, write poems and study coffee and wine.
            </Paragraph>
          </>}
          {/* <Paragraph>
            Por trabalhar com <strong>tecnologia</strong> e estar sempre estudando, esse foi um dos motivos da criação desse blog, <strong>compartilhar</strong> conhecimento e documentar o que estou estudando. Aqui vou falar sobre <strong>Engenharia de Software</strong>, <strong>Filosofia</strong> e algumas reflexões.
          </Paragraph> */}
        </Section>
      </Container>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{pick(locale, item.jobTitle)}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {pick(locale, item.location)}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy', dateLocale(locale))}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy', dateLocale(locale))
                : pt ? 'hoje' : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    // o date-fns omite os campos zerados: jun/2022 a jun/2024 vem sem "months"
    const { years = 0, months = 0 } = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })
    const parts = []
    if (years) parts.push(pt ? `${years} ${years > 1 ? 'anos' : 'ano'}` : `${years} ${years > 1 ? 'yrs' : 'yr'}`)
    if (months || !years) parts.push(pt ? `${months} ${months === 1 ? 'mês' : 'meses'}` : `${months} ${months === 1 ? 'mo' : 'mos'}`)
    return parts.join(' ')
  }

  const downloadHeadshot = () => {
    setToastTitle('Downloading...')
    setToastDescription('You can now add this photo to your fancy site.')
    setShowToast(true)
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
  }

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

      {renderIntro()}

      <h2>{pt ? 'Carreira' : 'Career'}</h2>
      {renderAll()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
