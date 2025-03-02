import axios from 'axios'
import { getPokemonByColor, getPokemon } from './Pokemon.js'
import {
  FILTERED_POKEMON,
  SEARCH_POKEMON_BEGIN,
  SEARCH_POKEMON_SUCCESS,
  SEARCH_POKEMON_FAILURE,
  POKEMON_TYPES,
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  FETCH_ERROR,
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

export const searchPokemon = (searchTerm) => async (dispatch) => {
  dispatch({ type: SEARCH_POKEMON_BEGIN })
  if (searchTerm.trim() === '') {
    dispatch(getPokemon({ limit: 20, offset: 0 }))
  } else {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      )

      const pokemonDetails = response.data
      const color = await getPokemonByColor(pokemonDetails.name)

      const detailedPokemon = {
        name: pokemonDetails.name,
        types: pokemonDetails.types,
        stats: pokemonDetails.stats,
        color: color,
        id: pokemonDetails.id,
        image: `https://img.pokemondb.net/artwork/${pokemonDetails.name}.jpg`,
      }

      dispatch({
        type: SEARCH_POKEMON_SUCCESS,
        payload: [detailedPokemon],
      })
    } catch (error) {
      dispatch({
        type: SEARCH_POKEMON_FAILURE,
        error: error.response.data,
      })
    }
  }
}

export const filterPokemon = (type, value) => (dispatch) => {
  dispatch({
    type: FILTERED_POKEMON,
    payload: { type, value },
  })
}

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
})

export const clearSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM,
})

export const filterPokemonByType = (type) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_POKEMON_BEGIN })

    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)

    if (response.status === 200) {
      const pokemons = response.data.pokemon.map((p) => p.pokemon)
      dispatch({
        type: SEARCH_POKEMON_SUCCESS,
        payload: pokemons,
      })
    } else {
      dispatch({
        type: SEARCH_POKEMON_FAILURE,
        error: `Error: Received status code ${response.status}`,
      })
    }
  } catch (error) {
    dispatch({
      type: SEARCH_POKEMON_FAILURE,
      error: error.message,
    })
  }
}

export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
})
