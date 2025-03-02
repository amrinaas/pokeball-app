import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Badge from './Badge'
import { getColorHex, getColorBadgeHex } from '../utils'
import CatchIcon from '../Asset/image/catch.svg'

const Cards = ({ image, name, id, color, type }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [id])

  return (
    <Link to={`/pokemon/${name}`}>
      <div
        key={id}
        style={{ borderColor: getColorHex(color) }}
        className={`shadow-xl border-4 bg-white text-black ease-out transition-all duration-300 m-3 p-1 rounded-lg flex flex-col justify-center items-center hover:scale-110 hover:cursor-pointer hover:shadow-2xl relative min-h-64`}
      >
        {loading && (
          <div className='absolute inset-0 flex justify-center items-center'>
            <Loading />
          </div>
        )}
        {!loading && (
          <>
            <div className='absolute top-0 left-0 w-16 h-16'>
              <div className='w-10 h-10 bg-green-600/80 rounded-ee-md hover:bg-orange-400/80 transition-colors '>
                <img
                  src={CatchIcon}
                  alt='catch-ball'
                  className='w-5 h-5 absolute top-2 left-2'
                />
              </div>
            </div>
            <h6 className='text-right w-full font-bold'>#{id}</h6>
            <h5 className='text-xl font-semibold'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h5>
            <img
              src={`${image}`}
              alt={name}
              onLoad={() => setLoading(false)}
              className={`h-32 w-32 object-contain ${
                loading ? 'hidden' : 'block'
              }`}
            />
            <div className='flex capitalize flex-wrap mb-3 justify-around mt-5 w-full'>
              {type.map((t, i) => (
                <Badge
                  key={i}
                  text={t.type.name}
                  color={getColorBadgeHex(t.type.name)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Cards
