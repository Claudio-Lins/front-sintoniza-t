import { ReactElement } from 'react'
import { Navbar } from './Navbar'
import { useSession } from 'next-auth/react'
import { NavbarAdmin } from './NavbarAdmin'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  function Header() {
    if (session && router.pathname !== '/') {
      return <NavbarAdmin />
    } else {
      return <Navbar />
    }
  }

  return (
    <>
      {Header()}

      <div className="mx-auto pt-24">{children}</div>
    </>
  )
}

export default Layout
