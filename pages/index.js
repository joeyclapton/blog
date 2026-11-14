import { styled } from '../stitches.config'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShortcutHome from '../components/ShortcutHome'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  return {
    props: {
      title: 'Joey Clapton',
      role: pick(locale, { en: 'Software Engineer', pt: 'Engenheiro de Software' }),
      description: pick(locale, { en: 'Doing the basics, and doing them well 🎈', pt: 'Fazendo o básico bem feito 🎈' }),
      image: '/static/images/me.jpeg',
      url: siteUrl(locale),
    },
  }
}

export default function Index(props) {
  const { title, role, description, image, url } = props

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={`https://joeyclapton.vercel.app${image}`} property="og:image" />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
                <strong>{role}</strong>
                <br />
                {description}
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})
