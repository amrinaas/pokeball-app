import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from './Input'
import Button from './Button'
import { getPokemon } from '../Store/Action/Pokemon.js'
import {
  pokemonType,
  filterPokemon,
  resetFilteredPokemon,
} from '../Store/Action/Filter.js'
import Badge from './Badge.js'
import { getColorBadgeHex, getUniqueValues } from '../utils.js'
import { UPDATE_FILTER } from '../Store/Types.js'

const Filters = () => {
  const dispatch = useDispatch()
  const { pokemons } = useSelector((state) => state.Pokemon)
  const { filters, types } = useSelector((state) => state.Filter)

  useEffect(() => {
    dispatch(pokemonType())
    // eslint-disable-next-line
  }, [pokemons])

  useEffect(() => {
    dispatch(filterPokemon(filters))
    // eslint-disable-next-line
  }, [filters, dispatch])

  // const handleSearchClick = () => {
  //   dispatch({ type: FILTERED_POKEMON })
  // }

  const handleResetFilter = () => {
    dispatch(getPokemon({ limit: 20, offset: 0 }))
  }

  const handleUpdateFilter = (event) => {
    let name = event.currentTarget.name
    let value = event.target.value

    if (name === 'types') {
      value = event.target.innerText
    }

    if (name === 'nameOrId') {
      value = event.target.value
    }

    dispatch(resetFilteredPokemon())
    dispatch({ type: UPDATE_FILTER, payload: { name, value } })
  }

  const pokemonTypes = getUniqueValues(types, 'name')

  return (
    <div className='px-10 text-left bg-black/60 p-5'>
      <div className='flex items-end'>
        <Input
          placeholder={'Search pokemon by name or pokemon ID'}
          label={'Search Pokemon'}
          value={filters.nameOrId}
          handleChange={handleUpdateFilter}
          customStyle='w-3/4'
          name={'nameOrId'}
        />
        <div className='flex ml-5'>
          {/* <Button handleClick={handleSearchClick}>Search</Button> */}
          <Button handleClick={handleResetFilter}>Reset filter</Button>
        </div>
      </div>
      <div className='mt-5'>
        <h1>Filter by Type: </h1>
        <p className='flex flex-wrap'>
          {pokemonTypes.map((type) => (
            <button
              key={type}
              name='types'
              type='button'
              onClick={handleUpdateFilter}
              className='leading-loose mr-0.5 ml-0.5 first:ml-0 hover:bg-gray-500 cursor-pointer'
            >
              <Badge text={type} color={getColorBadgeHex(type)} />
            </button>
          ))}
        </p>
      </div>
    </div>
  )
}

export default Filters
