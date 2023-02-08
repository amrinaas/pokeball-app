import axios from "axios";

export const getPokemon = (params) => (dispatch) => {
    const { limit, offset } = params;
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
        dispatch({
            type: "GET_POKEMON",
            payload: response.data.results
        });
    })
    .catch((err) => console.log('error', err));
}

export const detailPokemon = (params) => (dispatch) => {
    const { id } = params;
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
        dispatch({
            type: "DETAIL_POKEMON",
            payload: response.data
        });
    })
    .catch((err) => console.log('detail error', err));
}