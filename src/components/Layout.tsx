import { ReactElement } from 'react';
import {Navbar } from './Navbar'

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className='mx-auto pt-24'>{children}</div>
    </>
  )
}

export default Layout
 