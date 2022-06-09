import { AppProps } from 'next/app'
import { ToastProvider } from '../../hooks/useToast'
import { WindowSizeProvider } from '../../hooks/useWindowSize'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <WindowSizeProvider>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </WindowSizeProvider>
    </SessionProvider>
  )
}

export default MyApp
