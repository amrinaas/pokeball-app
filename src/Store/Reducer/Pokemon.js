const initialState = {
  pokemons: [],
  detail: null,
  species: null,
  evolutionChain: null,
  colors: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON':
      return {
        ...state,
        pokemons: action.payload,
      }
    case 'DETAIL_POKEMON':
      return {
        ...state,
        detail: action.payload,
      }
    case 'POKEMON_SPECIES':
      return {
        ...state,
        species: action.payload,
      }
    case 'EVOLUTION_CHAIN':
      return {
        ...state,
        evolutionChain: action.payload,
      }
    case 'CLEAR_POKEMON':
      return {
        ...state,
        detail: null,
        species: null,
        evolutionChain: null,
      }
    case 'POKEMON_COLOR':
      return {
        ...state,
        colors: action.payload,
      }
    case 'GET_POKEMON_BY_COLOR':
      return {
        ...state,
        pokemons: action.payload,
      }
    default:
      break
  }
  return state
}
