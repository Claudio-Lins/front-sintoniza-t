import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import LogoH from '../../../public/logo/sintoniza-t_hor.png'
import { navigationLinksAdmin } from '../../../utils/navigationLinksAdmin'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'

export function NavbarAdmin() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <header className="fixed z-50 flex h-24 w-full justify-center bg-white shadow">
      <div className="flex w-full max-w-7xl items-center 2xl:max-w-[1480px]">
        {/* Logo */}
        <div className="w-[250px]">
          <Link href="/admin" passHref>
            <a>
              <Image
                src={LogoH}
                alt="Sintoniza T"
                width={250}
                height={60}
                layout="responsive"
              />
            </a>
          </Link>
        </div>
        {/* /Logo */}
        {/* Menu */}
        <nav className="flex h-[100%] flex-1 items-center justify-center gap-6">
          {navigationLinksAdmin.map((link, i) => (
            <Link href={link.path} passHref key={i}>
              <a
                className={`flex h-full items-center justify-center text-sm font-light uppercase text-green-900
              `}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <p className="text-xs font-bold">{session.user.name}</p>
          {/* <p className="text-[8px] font-light">{session.user.email}</p> */}
          <button
            onClick={() => signOut()}
            className="font-bold text-xs text-red-500 hover:text-red-700"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
