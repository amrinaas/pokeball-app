import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from './Input'
import Button from './Button'
import { getPokemon } from '../Store/Action/Pokemon.js'
import {
  filterPokemon,
  setSearchTerm as setSearchTermAction,
  searchPokemon,
  clearSearchTerm as clearSearchTermAction,
  pokemonType,
  // filterPokemonByType,
} from '../Store/Action/Filter.js'
import Badge from './Badge.js'
import { getColorBadgeHex } from '../utils.js'
import { LOAD_POKEMON } from '../Store/Types.js'

const Filters = () => {
  const dispatch = useDispatch()
  const { searchTerm, pokemons } = useSelector((state) => state.Pokemon)
  const { filtered_pokemon, filters } = useSelector((state) => state.Filter)
  const [inputValue, setInputValue] = useState(searchTerm)

  useEffect(() => {
    dispatch(pokemonType())
    dispatch({ type: LOAD_POKEMON, payload: pokemons })
    // eslint-disable-next-line
  }, [pokemons])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearchClick = () => {
    dispatch(setSearchTermAction(inputValue))
    dispatch(searchPokemon(inputValue))
  }

  const handleResetFilter = () => {
    setInputValue('')
    dispatch(clearSearchTermAction())
    dispatch(getPokemon({ limit: 20, offset: 0 }))
  }

  const handleBadgeClick = (type) => {
    // dispatch(filterPokemonByType(type))
    dispatch(filterPokemon('types', type))
  }
  // console.log('filtered_pokemon', filtered_pokemon)

  return (
    <div className='px-10 text-left bg-black/60 p-5'>
      <div className='flex items-end'>
        <Input
          placeholder={'Search pokemon by name or pokemon ID'}
          label={'Search Pokemon'}
          value={inputValue}
          handleChange={handleInputChange}
          customStyle='w-3/4'
        />
        <div className='flex ml-5'>
          <Button handleClick={handleSearchClick}>Search</Button>
          <Button handleClick={handleResetFilter}>Reset filter</Button>
        </div>
      </div>
      <div className='mt-5'>
        <h1>Filter by Type: </h1>
        <p className='flex flex-wrap'>
          {filters.types.map((type) => (
            <span
              key={type.name}
              className='leading-loose mr-0.5 ml-0.5 first:ml-0 hover:bg-gray-500 cursor-pointer'
              onClick={() => handleBadgeClick(type.name)}
            >
              <Badge text={type.name} color={getColorBadgeHex(type.name)} />
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default Filters
