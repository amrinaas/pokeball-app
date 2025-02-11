import React from 'react'

const Badge = ({ text, color }) => {
  return (
    <div
      className='px-5 py-1 text-xs border-slate-400/50 mb-1 border-[1px] rounded-xl tracking-wider shadow-2xl text-white capitalize'
      style={{ backgroundColor: color }}
    >
      {text}
    </div>
  )
}

export default Badge
