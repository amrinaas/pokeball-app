const initialState = {
  pokemons: [],
  detail: null,
  species: null,
  evolutionChain: null,
  colors: [],
  searchTerm: '',
  searchResults: [],
  error: null,
  loading: false,
  filterLoading: false,
}

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POKEMON_BEGIN':
    case 'SEARCH_POKEMON_BEGIN':
      return {
        ...state,
        loading: action.type === 'GET_POKEMON_BEGIN' ? true : state.loading,
        filterLoading:
          action.type === 'SEARCH_POKEMON_BEGIN' ? true : state.filterLoading,
      }
    case 'GET_POKEMON_SUCCESS':
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload.pokemons],
        loading: false,
        error: null,
      }
    case 'GET_POKEMON_ERROR':
      return {
        ...state,
        pokemons: [],
        loading: false,
        error: action.error,
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
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      }
    case 'CLEAR_SEARCH_TERM':
      return {
        ...state,
        searchTerm: '',
        searchResults: [],
      }
    case 'SEARCH_POKEMON_SUCCESS':
      return {
        ...state,
        searchResults: action.payload,
        filterLoading: false,
        error: null,
      }
    case 'SEARCH_POKEMON_FAILURE':
      return {
        ...state,
        searchResults: [],
        filterLoading: false,
        error: action.error,
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      break
  }
  return state
}

export default pokemonReducer
