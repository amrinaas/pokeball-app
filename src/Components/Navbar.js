import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Asset/image/pokeball.png'

const Navbar = (props) => {
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  const navItems = [
    { id: 1, text: 'Home', url: '/' },
    { id: 2, text: 'Collection', url: '/collection' },
    { id: 3, text: 'About', url: '/about' },
  ]

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center h-24 px-14 bg-[#f66947]'>
        {/* Logo */}
        <NavLink to={'/'}>
          <div className='flex items-center justify-center'>
            <img src={Logo} className='h-12 mr-2' alt='Logo' />
            <h1 className='text-2xl font-bold'>PokeBall</h1>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex'>
          {navItems.map((item) => (
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `p-4 rounded-xl m-2 cursor-pointer duration-300 tracking-widest hover:text-black hover:font-bold ${
                  isActive ? 'text-black font-bold' : ''
                }`
              }
              key={item.id}
            >
              <li>{item.text}</li>
            </NavLink>
          ))}
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <span>Tutup</span> : <span>Buka</span>}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <NavLink to={'/'}>
            <div className='flex items-center justify-center p-4'>
              <img src={Logo} className='h-12 mr-2' alt='Logo' />
              <h1 className='text-2xl font-bold'>PokeBall</h1>
            </div>
          </NavLink>

          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `p-4 hover:bg-[#f66947] rounded-xl m-2 cursor-pointer duration-300 hover:text-black ${
                  isActive ? 'bg-[#f66947] text-black' : ''
                }`
              }
              key={item.id}
            >
              <li>{item.text}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      {props.children}
    </div>
  )
}

export default Navbar
