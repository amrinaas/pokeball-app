import Home from './Pages/Home';
import DetailPokemon from './Pages/DetailPokemon';

export const publicRoutes = [
    {
        components: Home,
        path: '/',
        exact: true
    },
    {
        components: DetailPokemon,
        path: '/pokemon/:id',
        exact: true
    }
]