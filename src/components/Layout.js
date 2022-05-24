import {Navbar } from './Navbar'


const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='mx-auto pt-24'>{children}</div>
    </>
  )
}

export default Layout
