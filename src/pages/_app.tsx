import { WindowSizeProvider } from '../../hooks/useWindowSize'
import { ToastProvider } from '../../hooks/useToast'
import '../styles/globals.css'
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WindowSizeProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </WindowSizeProvider>
  )
}

export default MyApp
