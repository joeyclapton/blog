import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import Toast from '../components/Toast'
import { Box } from '../components/Box'
import { styled } from '../stitches.config'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  const meta = {
    locale,
    title: pick(locale, { en: 'Contact // Joey Clapton', pt: 'Contato // Joey Clapton' }),
    tagline: pick(locale, { en: 'Send an email. Like the old days.', pt: 'Manda um e-mail. Como antigamente.' }),
    url: siteUrl(locale, '/contact'),
    image: '/static/images/reminder-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Contact(props) {
  const { title, image, url, locale } = props
  const t = text => pick(locale, text)
  const description = t({
    en: `<strong>I love talking</strong> with people who build products: developers, designers, founders and students. It can be about a project, a job or just to exchange ideas. <strong>I'll reply as soon as I can.</strong>`,
    pt: `<strong>Adoro conversar</strong> com quem constrói produto: devs, designers, fundadores e estudantes. Pode ser sobre um projeto, uma vaga ou só pra trocar ideia. <strong>Respondo assim que der.</strong>`,
  })
  const [isEmailSent, setIsEmailSent] = React.useState(undefined)
  const [showToast, setShowToast] = React.useState(false)

  const onSendEmail = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).message)

      setIsEmailSent(true)
      setShowToast(true)
    }
    catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
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

      <Box>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>{t({ en: 'Send an email', pt: 'Mandar e-mail' })}</h2>
        <Form onSubmit={onSendEmail}>
          <FormGroup>
            <Label htmlFor="name">{t({ en: 'Name', pt: 'Nome' })}</Label>
            <Input id="name" type="text" placeholder={t({ en: 'Your name', pt: 'Seu nome' })} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">{t({ en: 'Email', pt: 'E-mail' })}</Label>
            <Input id="email" type="email" placeholder={t({ en: 'you@email.com', pt: 'voce@email.com' })} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">{t({ en: 'Message', pt: 'Mensagem' })}</Label>
            <Textarea id="message" placeholder={t({ en: 'How can I help?', pt: 'Como posso ajudar?' })} rows="4" required />
          </FormGroup>
          <FormGroup>
            <Button type="submit">{t({ en: 'Send', pt: 'Enviar' })}</Button>
          </FormGroup>
        </Form>

        <Toast
          title={isEmailSent ? t({ en: 'Email sent :D', pt: 'E-mail enviado :D' }) : t({ en: 'Error :(', pt: 'Erro :(' })}
          description={isEmailSent
            ? t({ en: 'Thanks for your message, I will reply soon.', pt: 'Valeu pela mensagem, respondo em breve.' })
            : t({ en: 'Something went wrong. Please try again later.', pt: 'Algo deu errado. Tenta de novo mais tarde.' })}
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </>
  )
}

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px'
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
})

const Label = styled('label', {
  color: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '500'
})

const Input = styled('input', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Textarea = styled('textarea', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Button = styled('button', {
  color: '$background',
  background: '#fff',
  border: '1px solid #fff',
  borderRadius: '$borderRadius',
  cursor: 'pointer',
  padding: '10px',
  marginTop: '5px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': { background: 'transparent', borderColor: '$cyan', color: '$cyan' },
  '&:focus': { background: 'transparent', borderColor: '$cyan', color: '$cyan', outline: 'none' },
})

Contact.Layout = Base

export default Contact
