import React from 'react'

const Button = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className='px-4 mx-2 inline py-2 text-sm font-medium leading-5 shadow border-[1px] text-white transition-colors duration-150  border-white rounded-lg focus:outline-none focus:shadow-outline-blue bg-[#f66947] active:bg-[#f66947] hover:bg-[#da5a3a]'
    >
      {children}
    </button>
  )
}

export default Button
