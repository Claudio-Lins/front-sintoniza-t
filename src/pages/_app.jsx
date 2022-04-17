import { WindowSizeProvider } from '../../hooks/useWindowSize'
import { ToastProvider } from '../../hooks/useToast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <WindowSizeProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </WindowSizeProvider>
  )
}

export default MyApp
