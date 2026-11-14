import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { getAllPosts } from '../lib/blog'
import ListItem from '../components/ListItem'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import { pick, siteUrl } from '../lib/i18n'

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])
  const featuredPosts = []

  return {
    props: {
      locale,
      title: pick(locale, { en: 'Articles // Joey Clapton', pt: 'Artigos // Joey Clapton' }),
      tagline: pick(locale, { en: 'Learning. Sharing. Growing.', pt: 'Aprender. Compartilhar. Crescer.' }),
      url: siteUrl(locale, '/articles'),
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image, url, locale } = props
  const n = props.allPosts.length
  const description = pick(locale, {
    en: `Here are the <strong>${n} articles</strong> I've written, about tech, software development and whatever else I'm studying. They're written in Portuguese.`,
    pt: `Aqui estão os <strong>${n} artigos</strong> que escrevi, sobre tech, desenvolvimento de software e o que mais eu estiver estudando.`,
  })

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

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {/* <h2>Featured Articles</h2>
      <FeaturedArticles>{renderFeatured()}</FeaturedArticles> */}

      <h2>{pick(locale, { en: 'All Articles', pt: 'Todos os artigos' })}</h2>
      <ListGroup>{renderAll()}</ListGroup>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Articles.Layout = Base

export default Articles
