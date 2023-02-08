const initialState = {
    pokemons: [],
    detail: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMON':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'DETAIL_POKEMON':
            return {
                ...state,
                detail: action.payload
            }
        default:
            break;
    }
    return state;
}