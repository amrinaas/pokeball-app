import React from 'react'
import Cards from './Cards'

const CardList = ({ pokemons }) => {
  return (
    <div className='container'>
        {
            pokemons.map((pokemon, i) => {
                return (
                    <Cards
                        key={i}
                        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
                        id={i}
                        name={pokemon.name}
                     />
                )
            })
        }
    </div>
  )
}

export default CardList