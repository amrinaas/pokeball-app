import {
  GET_POKEMON_BEGIN,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
  GET_DETAIL_POKEMON_BEGIN,
  DETAIL_POKEMON,
  GET_DETAIL_POKEMON_ERROR,
  GET_POKEMON_SPECIES_BEGIN,
  POKEMON_SPECIES,
  GET_POKEMON_SPECIES_ERROR,
  EVOLUTION_CHAIN,
  POKEMON_COLOR,
  SHOW_POKEMON_MOVES,
} from '../Types'

const initialState = {
  loading: false,
  pokemons: [],
  error: null,
  loadingDetail: true,
  detail: null,
  errorDetail: null,
  loadingSpecies: true,
  species: null,
  errorSpecies: null,
  evolutionChain: null,
  colors: [],
  showAllMoves: false,
}

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload.pokemons],
        loading: false,
        error: null,
      }
    case GET_POKEMON_ERROR:
      return {
        ...state,
        pokemons: [],
        loading: false,
        error: action.error,
      }
    case GET_DETAIL_POKEMON_BEGIN:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
        errorDetail: null,
      }
    case GET_DETAIL_POKEMON_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: null,
        errorDetail: action.error,
      }
    case DETAIL_POKEMON:
      return {
        ...state,
        detail: action.payload,
        loadingDetail: false,
      }
    case POKEMON_SPECIES:
      return {
        ...state,
        species: action.payload,
        loadingSpecies: false,
        errorSpecies: null,
      }
    case GET_POKEMON_SPECIES_BEGIN:
      return {
        ...state,
        loadingSpecies: true,
        errorSpecies: null,
      }
    case GET_POKEMON_SPECIES_ERROR:
      return {
        ...state,
        loadingSpecies: false,
        species: null,
        errorSpecies: action.error,
      }
    case EVOLUTION_CHAIN:
      return {
        ...state,
        evolutionChain: action.payload,
      }
    case POKEMON_COLOR:
      return {
        ...state,
        colors: action.payload,
      }
    case SHOW_POKEMON_MOVES:
      return {
        ...state,
        showAllMoves: !state.showAllMoves,
      }
    default:
      break
  }
  return state
}

export default pokemonReducer
