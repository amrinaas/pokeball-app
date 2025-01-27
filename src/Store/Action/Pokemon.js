import axios from 'axios'

export const getPokemon = (params) => async (dispatch) => {
  const { limit, offset } = params
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
    const pokemons = response.data.results

    const colorsResponse = await axios.get(
      'https://pokeapi.co/api/v2/pokemon-color'
    )
    const colors = colorsResponse.data.results

    const detailedPokemonPromises = colors.map(async (color) => {
      const pokemonByColorResponse = await axios.get(color.url)
      const pokemonByColor = pokemonByColorResponse.data.pokemon_species

      const matchingPokemons = pokemons.filter((pokemon) =>
        pokemonByColor.some((species) => species.name === pokemon.name)
      )

      const pokemonDetailsPromises = matchingPokemons.map(async (pokemon) => {
        const pokemonDetailsResponse = await axios.get(pokemon.url)
        const pokemonDetails = pokemonDetailsResponse.data

        return {
          name: pokemonDetails.name,
          types: pokemonDetails.types[0].type.name,
          stats: pokemonDetails.stats,
          color: color.name,
          id: pokemonDetails.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`,
        }
      })

      return Promise.all(pokemonDetailsPromises)
    })

    const detailedPokemonArrays = await Promise.all(detailedPokemonPromises)
    const detailedPokemon = detailedPokemonArrays.flat()

    const shuffledPokemon = detailedPokemon.sort(() => Math.random() - 0.5)

    dispatch({
      type: 'GET_POKEMON',
      payload: shuffledPokemon,
    })
  } catch (err) {
    console.error('error', err)
  }
}

export const detailPokemon = (params) => (dispatch) => {
  const { id } = params
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

export const clearPokemon = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_POKEMON',
  })
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

export const getPokemonByColor = (params) => (dispatch) => {
  const { id } = params
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-color/${id}`)
    .then((response) => {
      dispatch({
        type: 'GET_POKEMON_BY_COLOR',
        payload: response.data.pokemon_species,
      })
    })
    .catch((err) => console.error('detail error', err))
}
