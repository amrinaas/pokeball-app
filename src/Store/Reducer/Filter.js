import { FILTERED_POKEMON, LOAD_POKEMON, POKEMON_TYPES } from '../Types.js'

const initialState = {
  filtered_pokemon: [],
  all_pokemon: [],
  search_term: '',
  filters: {
    types: [],
    colors: [],
    abilities: [],
    height: [],
    weight: [],
  },
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FILTERED_POKEMON:
    //   const { filters, all_pokemon } = state
    //   const { types, colors, abilities, height, weight } = filters
    //   const { type, value } = action.payload
    //   let tempPokemon = [...all_pokemon]

    //   console.log('state', state, 'type', type, 'value', value)

    //   if (types.length > 0) {
    //     tempPokemon = tempPokemon.filter((pokemon) => {
    //       return types.every((type) => pokemon.types.includes(type))
    //     })
    //   }
    //   if (colors.length > 0) {
    //     tempPokemon = tempPokemon.filter((pokemon) => {
    //       return colors.includes(pokemon.color)
    //     })
    //   }
    //   if (abilities.length > 0) {
    //     tempPokemon = tempPokemon.filter((pokemon) => {
    //       return abilities.every((ability) =>
    //         pokemon.abilities.includes(ability)
    //       )
    //     })
    //   }
    //   if (height.length > 0) {
    //     tempPokemon = tempPokemon.filter((pokemon) => {
    //       return height.includes(pokemon.height)
    //     })
    //   }
    //   if (weight.length > 0) {
    //     tempPokemon = tempPokemon.filter((pokemon) => {
    //       return weight.includes(pokemon.weight)
    //     })
    //   }
    //   return {
    //     ...state,
    //     filtered_pokemon: tempPokemon,
    //     filters: {
    //       ...state.filters,
    //     },
    //   }
    case LOAD_POKEMON:
      return {
        ...state,
        all_pokemon: [...action.payload],
        filtered_pokemon: [...action.payload],
        filters: {
          ...state.filters,
        },
      }
    case FILTERED_POKEMON:
      const { filters, all_pokemon } = state
      const { type, value } = action.payload
      const newFilters = { ...filters }
      console.log(
        'newFilters',
        newFilters,
        'type',
        type,
        'value',
        value,
        'all_pokemon',
        all_pokemon
      )

      const newFilteredPokemon = all_pokemon.filter((pokemon) => {
        if (type === 'types') {
          return pokemon.types.includes(value)
        }
        if (type === 'colors') {
          return pokemon.color === value
        }
        if (type === 'abilities') {
          return pokemon.abilities.includes(value)
        }
        if (type === 'height') {
          return pokemon.height === value
        }
        if (type === 'weight') {
          return pokemon.weight === value
        }
        return pokemon
      })
      return {
        ...state,
        filtered_pokemon: newFilteredPokemon,
        filters: newFilters,
      }
    case POKEMON_TYPES:
      return {
        ...state,
        filters: {
          ...state.filters,
          types: action.payload,
        },
        error: null,
      }
    default:
      break
  }
  return state
}

export default filterReducer
