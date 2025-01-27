import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Cards = ({ image, name, id, color, stats, type }) => {
  const [loading, setLoading] = useState(true)

  const getColorHex = (color) => {
    const colors = {
      black: '#000000',
      blue: '#0000FF',
      brown: '#A52A2A',
      gray: '#808080',
      green: '#008000',
      pink: '#FFC0CB',
      purple: '#800080',
      red: '#FF0000',
      white: '#CCCCCC',
      yellow: '#FFFF00',
    }
    return `${colors[color]}66` || '#CCCCC'
  }

  useEffect(() => {
    setLoading(false)
  }, [id])

  return (
    <Link to={`/pokemon/${id}`}>
      <div
        key={id}
        style={{ backgroundColor: getColorHex(color) }}
        className={`shadow-xl text-black ease-out transition-all duration-300 m-3 p-1 rounded-md flex flex-col justify-center items-center hover:scale-110 hover:cursor-pointer hover:shadow-2xl`}
      >
        {loading && <Loading />}
        {!loading && (
          <>
            <h6 className='text-right w-full font-bold'>#{id}</h6>
            <h5 className='text-xl font-semibold'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h5>
            <img
              src={`${image}/${id}.png`}
              alt={name}
              onLoad={() => setLoading(false)}
              className={`h-32 w-32 object-contain ${
                loading ? 'hidden' : 'block'
              }`}
            />
            <p className='text-sm'>Type: {type}</p>
            <div className='p-2 w-full text-xs'>
              {stats.map((stat, i) => (
                <div key={i} className='flex px-1 items-center'>
                  <p className='w-1/3 text-left'>{stat.stat.name} </p> :{' '}
                  <div className='bg-gray-200 w-3/5 h-2 rounded-full overflow-hidden'>
                    <div
                      className='bg-green-500 h-2 w-full'
                      style={{ width: `${stat.base_stat}%` }}
                    ></div>
                  </div>
                  <p className='w-1/6'>{stat.base_stat}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Cards
