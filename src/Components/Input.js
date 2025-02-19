import React from 'react'

const Input = ({ label, placeholder, value, handleChange, customStyle }) => {
  return (
    <div className={`${customStyle}`}>
      <label className='capitalize font-semibold text-base'>{label}</label>
      <input
        type='text'
        value={value}
        className={`w-full border-2 border-gray-200 px-5 py-2 mt-1 shadow-sm rounded-md`}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default Input
