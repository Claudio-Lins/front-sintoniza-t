import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './menu.module.css'
import LogoH from '../../../public/logo/sintoniza-t_hor.png'

export function Navbar() {
  return (
    <header className="fixed z-50 flex h-24 w-full justify-center bg-white shadow">
      <div className="flex w-full max-w-7xl items-center 2xl:max-w-[1480px]">
        {/* Logo */}
        <div className="w-[250px]">
          <Link href="/" passHref>
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
          <a
            className={
              styles.active +
              ' relative h-24 cursor-pointer font-bold leading-[6rem] text-green-900 '
            }
          >
            Destaque
          </a>
          <a
            className={
              styles.texto +
              '  h-24 cursor-pointer font-bold leading-[6rem] text-green-900'
            }
          >
            Equipa
          </a>
        </nav>
      </div>
    </header>
  )
}
