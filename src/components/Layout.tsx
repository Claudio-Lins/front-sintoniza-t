import { ReactElement } from 'react'
import { Navbar } from './Navbar'
import { useSession } from 'next-auth/react'
import { NavbarAdmin } from './NavbarAdmin'
import { useRouter } from 'next/router'
import Content from './template/Content'
import MenuLateral from './template/MenuLateral'
import TopBar from './template/TopBar'

interface LayoutProps {
  children: ReactElement
  title: string
  subtitle: string
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      {session && router.pathname !== '/' ? (
        <div className={`flex min-h-screen w-screen`}>
          <MenuLateral />
          <div
            className={` flex w-full flex-col bg-gray-100
      p-4 md:p-7
      `}
          >
            <TopBar title={title} subtitle={subtitle} />
            <Content>{children}</Content>
          </div>
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
