import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className='w-full min-h-screen bg-gray-200/50 overflow-x-hidden'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
