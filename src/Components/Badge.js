import React from 'react'

const Badge = ({ text, color }) => {
  return (
    <span
      className='px-5 py-1 text-xs border-slate-400/50 mb-1 border-[1px] rounded-md tracking-wider shadow-2xl cursor-pointer text-white'
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  )
}

export default Badge
