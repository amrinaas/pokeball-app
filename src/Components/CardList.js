import React from 'react'
import Cards from './Cards'

const CardList = ({ pokemons }) => {
  return (
    <div className='flex justify-around flex-wrap my-6 mx-20'>
      {pokemons.map((pokemon, i) => {
        return (
          <Cards
            key={i}
            image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
            id={i}
            name={pokemon.name}
          />
        )
      })}
    </div>
  )
}

export default CardList
