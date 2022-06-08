import { AppProps } from 'next/app'
import { ToastProvider } from '../../hooks/useToast'
import { WindowSizeProvider } from '../../hooks/useWindowSize'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <WindowSizeProvider>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </WindowSizeProvider>
  )
}

export default MyApp
