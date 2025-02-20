import React from 'react'
import CatchIcon from '../Asset/image/catch.svg'

const Loading = ({ size }) => {
  const sizes = {
    xl: {
      outer: 'w-48 h-48',
      mid: 'w-32 h-32',
      inner: 'w-24 h-24',
      icon: 'w-12 h-12',
    },
    lg: {
      outer: 'w-36 h-36',
      mid: 'w-24 h-24',
      inner: 'w-16 h-16',
      icon: 'w-8 h-8',
    },
    md: {
      outer: 'w-24 h-24',
      mid: 'w-16 h-16',
      inner: 'w-12 h-12',
      icon: 'w-6 h-6',
    },
    xs: {
      outer: 'w-12 h-12',
      mid: 'w-8 h-8',
      inner: 'w-6 h-6',
      icon: 'w-4 h-4',
    },
  }

  const selectedSize = sizes[size] || sizes.md // Default to 'md' size if size prop is not provided

  return (
    <div className='relative place-items-center grid gap-4'>
      <div
        className={`bg-orange-500 ${selectedSize.outer} absolute animate-ping rounded-full delay-5s shadow-xl`}
      ></div>
      <div
        className={`bg-orange-400 ${selectedSize.mid} absolute animate-ping rounded-full shadow-xl`}
      ></div>
      <div
        className={`bg-transparent ${selectedSize.inner} absolute animate-pulse rounded-full`}
      ></div>
      <img
        src={CatchIcon}
        alt='catch-ball'
        className={`${selectedSize.icon} animate-bounce`}
      />
    </div>
  )
}

export default Loading
