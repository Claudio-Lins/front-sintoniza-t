import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Navbar } from './Navbar'
import MenuLateral from './template/MenuLateral'

interface LayoutProps {
  children: ReactElement
  title?: string
  subtitle?: string
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      {session && router.pathname !== '/' ? (
        <div className=" flex min-h-screen w-full">
          <MenuLateral />

          <div className=" p-2 w-full">{children}</div>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="mx-auto pt-24">{children}</div>
        </>
      )}
    </>
  )
}

export default Layout
