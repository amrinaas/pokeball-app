import {
  FILTERED_POKEMON,
  POKEMON_TYPES,
  UPDATE_FILTER,
  FILTER_POKEMON_BEGIN,
  FILTER_POKEMON_ERROR,
  UPDATE_FILTER_OFFSET,
  RESET_FILTERED_POKEMON,
  FETCH_ERROR,
} from '../Types.js'

const initialState = {
  filtered_pokemon: [],
  search_term: '',
  types: [],
  filters: {
    types: '',
    nameOrId: '',
    colors: [],
    abilities: [],
    height: [],
    weight: [],
  },
  filterLoading: false,
  error: null,
  filteredOffset: 0,
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_POKEMON_BEGIN:
      return {
        ...state,
        filterLoading: true,
        error: null,
      }
    case FILTERED_POKEMON:
      return {
        ...state,
        filtered_pokemon: [...state.filtered_pokemon, ...action.payload],
        filterLoading: false,
        error: null,
      }
    case UPDATE_FILTER:
      const { name, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
        filtered_pokemon: [],
        filteredOffset: 0,
        error: null,
      }
    case FILTER_POKEMON_ERROR:
      return {
        ...state,
        filtered_pokemon: [],
        filterLoading: false,
        error: action.error,
      }
    case POKEMON_TYPES:
      return {
        ...state,
        types: action.payload,
        error: null,
      }
    case UPDATE_FILTER_OFFSET:
      return {
        ...state,
        filteredOffset: action.payload,
      }
    case RESET_FILTERED_POKEMON:
      return {
        ...state,
        filtered_pokemon: [],
      }
    case FETCH_ERROR:
      return {
        ...state,
        filterLoading: false,
        error: action.error,
      }
    default:
      break
  }
  return state
}

export default filterReducer
