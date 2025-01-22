import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Cards = ({ image, name, id }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [id])

  return (
    <Link to={`/pokemon/${id + 1}`}>
      <div
        key={id}
        className='shadow-lg ease-out border border-white transition-all duration-300 m-3 p-1 w-64 h-28 rounded-md flex justify-center items-center bg-black/40 hover:scale-125 hover:cursor-pointer hover:shadow-2xl'
      >
        {loading && <Loading />}
        <div>
          <img
            src={`${image}/${id + 1}.png`}
            alt={name}
            onLoad={() => setLoading(false)}
            className={loading ? 'hidden' : 'block'}
          />
        </div>
        {!loading && (
          <h5 className='text-xl font-semibold m-auto'>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h5>
        )}
      </div>
    </Link>
  )
}

export default Cards
