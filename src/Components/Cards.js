import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Badge from './Badge'

const Cards = ({ image, name, id, color, type }) => {
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

  const getColorBadgeHex = (type) => {
    const colors = {
      grass: '#008000', // green
      fire: '#FF0000', // red
      water: '#0000FF', // blue
      electric: '#FFAE42', // yellow orange
      ice: '#ADD8E6', // light blue
      fighting: '#A52A2A', // brown
      poison: '#800080', // purple
      ground: '#D2B48C', // tan
      flying: '#B0E0E6', // light sky blue
      psychic: '#FF69B4', // hot pink
      bug: '#9ACD32', // yellow green
      rock: '#808080', // gray
      ghost: '#4B0082', // indigo
      dragon: '#000080', // navy
      dark: '#000000', // black
      steel: '#C0C0C0', // silver
      fairy: '#FFC0CB', // pink
    }
    return colors[type] ? `${colors[type]}` : '#808080'
  }

  useEffect(() => {
    setLoading(false)
  }, [id])

  return (
    <Link to={`/pokemon/${id}`}>
      <div
        key={id}
        style={{ borderColor: getColorHex(color) }}
        className={`shadow-xl border-4 bg-white text-black ease-out transition-all duration-300 m-3 p-1 rounded-lg flex flex-col justify-center items-center hover:scale-110 hover:cursor-pointer hover:shadow-2xl`}
      >
        {loading && <Loading />}
        {!loading && (
          <>
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
          </>
        )}
        <div className='flex capitalize flex-wrap mb-3 justify-around mt-5 w-full'>
          {type.map((t, i) => (
            <Badge
              key={i}
              text={t.type.name}
              color={getColorBadgeHex(t.type.name)}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default Cards
