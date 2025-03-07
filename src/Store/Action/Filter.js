import axios from 'axios'
import { getPokemonByColor } from './Pokemon.js'
import {
  FILTERED_POKEMON,
  FILTER_POKEMON_BEGIN,
  FILTER_POKEMON_ERROR,
  POKEMON_TYPES,
  FETCH_ERROR,
  UPDATE_FILTER_OFFSET,
  RESET_FILTERED_POKEMON,
} from '../Types'

export const pokemonType = () => async (dispatch) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type')

    if (response.status === 200) {
      dispatch({
        type: POKEMON_TYPES,
        payload: response.data.results,
      })
    } else {
      console.error(`Error: Received status code ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Pokémon types:', error)
    dispatch({
      type: FETCH_ERROR,
      payload: error.message,
    })
  }
}

export const filterPokemon = (params) => async (dispatch, getState) => {
  const { type } = params
  const { filteredOffset } = getState().Filter
  dispatch({ type: FILTER_POKEMON_BEGIN })

  try {
    const limit = 20
    let filteredPokemon = []

    if (type) {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      const pokemonByType = response.data.pokemon.slice(
        filteredOffset,
        filteredOffset + limit
      )

      const detailedPokemonPromises = pokemonByType.map(async (pokemon) => {
        const color = await getPokemonByColor(pokemon.pokemon.name)
        const pokemonDetailsResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`
        )
        const pokemonDetails = pokemonDetailsResponse.data

        return {
          name: pokemonDetails.name,
          types: pokemonDetails.types,
          stats: pokemonDetails.stats,
          color: color,
          id: pokemonDetails.id,
          image: `https://img.pokemondb.net/artwork/${pokemonDetails.name}.jpg`,
        }
      })

      filteredPokemon = await Promise.all(detailedPokemonPromises)
    }

    dispatch({
      type: FILTERED_POKEMON,
      payload: filteredPokemon,
    })

    // Update offset for next fetch
    dispatch({
      type: UPDATE_FILTER_OFFSET,
      payload: filteredOffset + limit,
    })
  } catch (error) {
    dispatch({
      type: FILTER_POKEMON_ERROR,
      error: error.message,
    })
  }
}

export const resetFilteredPokemon = () => ({
  type: RESET_FILTERED_POKEMON,
})

export const searchPokemon = (nameOrId) => async (dispatch) => {
  let filteredPokemon = []

  dispatch({ type: FILTER_POKEMON_BEGIN })
  try {
    if (nameOrId) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
      )
      const pokemonDetails = response.data
      const color = await getPokemonByColor(pokemonDetails.name)

      filteredPokemon = [
        {
          name: pokemonDetails.name,
          types: pokemonDetails.types,
          stats: pokemonDetails.stats,
          color: color,
          id: pokemonDetails.id,
          image: `https://img.pokemondb.net/artwork/${pokemonDetails.name}.jpg`,
        },
      ]
    }
    dispatch({ type: FILTERED_POKEMON, payload: filteredPokemon })
  } catch (error) {
    dispatch({
      type: FILTER_POKEMON_ERROR,
      error: error.message,
    })
  }
}
