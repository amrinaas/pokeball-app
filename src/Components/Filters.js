import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from './Input'
import Button from './Button'
import { getPokemon } from '../Store/Action/Pokemon.js'
import {
  pokemonType,
  filterPokemon,
  resetFilteredPokemon,
  searchPokemon,
} from '../Store/Action/Filter.js'
import { getColorBadgeHex, getUniqueValues } from '../utils.js'
import { UPDATE_FILTER } from '../Store/Types.js'

const Filters = () => {
  const dispatch = useDispatch()
  const { filters, types } = useSelector((state) => state.Filter)
  let { type, nameOrId } = filters

  useEffect(() => {
    dispatch(pokemonType())
    dispatch(filterPokemon(filters))

    // eslint-disable-next-line
  }, [type, dispatch])

  const handleResetFilter = () => {
    dispatch(resetFilteredPokemon())
    dispatch(getPokemon({ limit: 20, offset: 0 }))
  }

  const handleUpdateFilter = (event) => {
    let name = event.currentTarget.name
    let value = event.target.value

    if (name === 'type') {
      value = event.target.innerText.toLowerCase()
    }

    if (name === 'nameOrId') {
      value = event.target.value
    }

    dispatch(resetFilteredPokemon())
    dispatch({ type: UPDATE_FILTER, payload: { name, value } })
  }

  const handleSearchPokemon = () => {
    dispatch(searchPokemon(nameOrId))
  }

  const pokemonTypes = getUniqueValues(types, 'name')

  return (
    <div className='px-10 text-left bg-black/60 p-5'>
      <div className='flex items-end'>
        <Input
          placeholder={'Search pokemon by name or pokemon ID'}
          label={'Search Pokemon'}
          value={nameOrId}
          handleChange={handleUpdateFilter}
          customStyle='w-3/4'
          name={'nameOrId'}
        />
        <div className='flex ml-5'>
          <Button handleClick={handleSearchPokemon}>Search</Button>
          <Button handleClick={handleResetFilter}>Reset filter</Button>
        </div>
      </div>
      <div className='mt-5'>
        <h1 className='font-bold underline'>Filter by Type: </h1>
        <p className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:w-2/5 w-1/2 mt-3'>
          {pokemonTypes.map((name) => {
            return (
              <button
                key={name}
                name='type'
                type='Button'
                onClick={handleUpdateFilter}
                style={{ backgroundColor: getColorBadgeHex(name) }}
                className={`capitalize leading-loose mr-0.5 ml-0.5 first:ml-0 text-white cursor-pointer border-[1px] px-4 py-1 rounded ${
                  type === name
                    ? 'text-white shadow-2xl transform scale-110 border-black'
                    : 'text-slate-400 shadow-md border-white'
                } transition duration-300 ease-in-out`}
              >
                {name}
              </button>
            )
          })}
        </p>
      </div>
    </div>
  )
}

export default Filters
