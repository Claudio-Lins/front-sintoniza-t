import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './menu.module.css'
import LogoH from '../../../public/logo/sintoniza-t_hor.png'
import { navigationLinksAdmin } from '../../../utils/navigationLinksAdmin'
import { useRouter } from 'next/router'

export function NavbarAdmin() {
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
      </div>
    </header>
  )
}
