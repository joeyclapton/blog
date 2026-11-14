import Head from 'next/head'
import { ArticleJsonLd } from 'next-seo'
import Blogpost from '../layouts/Blogpost'
import ErrorMessage from '../components/ErrorMessage'
import { useRouter } from 'next/router'
import { getPostBySlug, getAllPosts, convertMarkdownToHtml } from '../lib/blog'
import { siteUrl } from '../lib/i18n'

function Post(props) {
  const { locale } = useRouter()
  if (props.errorCode) {
    return <ErrorMessage code={props.errorCode} />
  }

  const title = `${props.title} // Joey Clapton`
  const description = props.description || ''
  const url = siteUrl(locale, `/${props.slug}`)
  const date = new Date(props.date).toISOString()
  const image = props.image
    ? `https://joeyclapton.vercel.app${props.image}`
    : 'https://joeyclapton.vercel.app/static/images/home-opt.jpg'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={image} property="og:image" />

        {props.canonical_url && (
          <link rel="canonical" href={props.canonical_url} />
        )}
      </Head>

      <ArticleJsonLd
        author="Joey Clapton"
        type="Blog"
        url={url}
        headline={title}
        image={[image]}
        datePublished={date}
        dateModified={date}
        description={props.description}
      />

      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    const post = getPostBySlug(params.slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title',
    ])

    const content = await convertMarkdownToHtml(post.content || '')

    const isProd = process.env.NODE_ENV === 'production'
    const base = isProd ? 'https://joeyclapton.vercel.app' : 'http://localhost:3000'

    if (isProd) {
      const viewsReq = await fetch(`${base}/api/views/${params.slug}`)
      const viewsRes = await viewsReq.json()

      post.views = new Intl.NumberFormat().format(viewsRes.views || 0)
    }

    return {
      props: {
        ...post,
        content,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { notFound: true }
  }
}

export async function getStaticPaths({ locales }) {
  const posts = getAllPosts(['slug'])

  // o artigo é o mesmo nos dois idiomas (escrito em português); muda só o que está em volta
  return {
    paths: posts.flatMap(post => locales.map(locale => ({ params: { slug: post.slug }, locale }))),
    fallback: 'blocking',
  }
}

Post.Layout = Blogpost

export default Post
