import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './menu.module.css'
import LogoH from '../../../public/logo/sintoniza-t_hor.png'
import { navigationLinksAdmin } from '../../../utils/navigationLinksAdmin'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

export function NavbarAdmin() {
  const { data: session } = useSession()
  const router = useRouter()

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
                priority
              />
            </a>
          </Link>
        </div>
        <nav className="flex h-[100%] flex-1 items-center justify-center gap-6">
          {navigationLinksAdmin.map((link, i) => (
            <div className="flex items-center justify-center gap-1" key={i}>
              <div className='text-green-900 hover:text-green-600'>{link.icon}</div>
              <Link href={link.path} passHref>
                <a className="flex h-full items-center justify-center text-sm font-light uppercase text-green-900">
                  {link.label}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex flex-col items-center justify-center">
          {/* <div className="">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div> */}
          <p className="text-xs font-bold text-green-800">
            {session.user.name}
          </p>
          <button
            onClick={() => signOut()}
            className="text-xs font-bold text-red-600 hover:text-red-800"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
