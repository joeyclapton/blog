import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../stitches.config'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    // o artigo diz a própria língua; o resto do site segue o idioma escolhido no topo
    const lang = this.props.__NEXT_DATA__.props.pageProps?.lang || this.props.locale

    return (
      <Html lang={lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="Joey Clapton" name="author" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta name="theme-color" content="#08070b" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

          <link
            rel="icon"
            href="/favicon.ico"
            sizes="any"
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}
