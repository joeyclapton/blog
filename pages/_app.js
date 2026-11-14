import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import CommandBar from '../components/CommandBar'

const Noop = ({ children }) => children

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  return (
    <CommandBar>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBar>
  )
}
