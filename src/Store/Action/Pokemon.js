import axios from 'axios'

export const getPokemon = (params) => async (dispatch) => {
  const { limit, offset } = params
  dispatch({ type: 'GET_POKEMON_BEGIN' })
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
    const pokemons = response.data.results

    const detailedPokemonPromises = pokemons.map(async (pokemon) => {
      const color = await getPokemonByColor(pokemon.name)

      const pokemonDetailsResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
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

    const detailedPokemonArrays = await Promise.all(detailedPokemonPromises)
    const detailedPokemon = detailedPokemonArrays

    const shuffledPokemon = detailedPokemon.sort(() => Math.random() - 0.5)

    dispatch({
      type: 'GET_POKEMON_SUCCESS',
      payload: { pokemons: shuffledPokemon },
    })
  } catch (err) {
    dispatch({
      type: 'GET_POKEMON_ERROR',
      error: err,
    })
  }
}

export const detailPokemon = (params) => (dispatch) => {
  const { id } = params
  dispatch({ type: 'GET_POKEMON_BEGIN' })
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
      dispatch({
        type: 'DETAIL_POKEMON',
        payload: response.data,
      })
    })
    .catch((err) => console.error('detail error', err))
}

export const pokemonSpecies = (params) => (dispatch) => {
  const { id } = params
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => {
      dispatch({
        type: 'POKEMON_SPECIES',
        payload: response.data,
      })
      return axios.get(response.data.evolution_chain.url)
    })
    .then((response) => {
      dispatch({
        type: 'EVOLUTION_CHAIN',
        payload: response.data,
      })
    })
    .catch((err) => console.error('detail error', err))
}

export const getListPokemonColor = () => (dispatch) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-color`)
    .then((response) => {
      dispatch({
        type: 'POKEMON_COLOR',
        payload: response.data,
      })
    })
    .catch((err) => console.error('detail error', err))
}

export const getPokemonByColor = async (name) => {
  try {
    const pokemonColors = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-color`
    )

    const colors = pokemonColors.data.results

    for (const color of colors) {
      const pokemonByColorResponse = await axios.get(color.url)
      const pokemonByColor = pokemonByColorResponse.data.pokemon_species

      const matchingPokemon = pokemonByColor.find(
        (species) => species.name === name
      )

      if (matchingPokemon) {
        return color.name
      }
    }

    return null
  } catch (error) {
    console.error('error getPokemonByColor', error)
    return null
  }
}
