const initialState = {
  pokemons: [],
  detail: null,
  species: null,
  evolutionChain: null,
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
    default:
      break
  }
  return state
}
