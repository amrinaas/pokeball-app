import React from 'react'
import Cards from './Cards'

const CardList = ({ pokemons }) => {
  return (
    <div className='flex justify-around flex-wrap my-6 lg:mx-20 md:mx-10 mx-2'>
      {pokemons.map((pokemon, i) => {
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
    </div>
  )
}

export default CardList
