import React from 'react'

const Button = ({ children }) => {
  return (
    <button className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-[#f66947] active:bg-[#f66947] hover:bg-[#da5a3a]'>
      {children}
    </button>
  )
}

export default Button
