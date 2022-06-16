import { WindowSizeProvider } from '../../hooks/useWindowSize'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component,  session, ...pageProps }) {
  return (
    <WindowSizeProvider>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
    </WindowSizeProvider>
  )
}

export default MyApp
