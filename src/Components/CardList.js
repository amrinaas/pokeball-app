import React from 'react'
import Cards from './Cards'

const CardList = ({ data }) => {
  return (
    <div className='flex justify-around flex-wrap'>
      {data.length > 0 &&
        data.map((pokemon, i) => {
          return (
            <div className='lg:w-1/4 md:w-1/3 w-80 p-2' key={i}>
              <Cards
                image={pokemon.image}
                id={pokemon.id}
                name={pokemon.name}
                color={pokemon.color}
                stats={pokemon.stats}
                type={pokemon.types}
              />
            </div>
          )
        })}
      {!data.length === 0 && <div>No pokemon found!</div>}
    </div>
  )
}

export default CardList
