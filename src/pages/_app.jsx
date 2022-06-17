import { WindowSizeProvider } from '../../hooks/useWindowSize'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '../data/hook/useToast'

function MyApp({ Component, session, ...pageProps }) {
  return (
    <WindowSizeProvider>
      <ToastProvider>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ToastProvider>
    </WindowSizeProvider>
  )
}

export default MyApp
