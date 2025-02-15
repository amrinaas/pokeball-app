import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className='w-full min-h-screen bg-gray-200/50 overflow-x-hidden'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
