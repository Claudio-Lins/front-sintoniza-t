import { WindowSizeProvider } from '../../hooks/useWindowSize'
import { ToastProvider } from '../../hooks/useToast'
import '../styles/globals.css'
import { AppProps } from 'next/app';
import Layout from '../components/Layout'



function MyApp({ Component, pageProps }: AppProps) {
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
