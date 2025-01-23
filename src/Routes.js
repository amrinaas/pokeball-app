import PokemonList from './Pages/PokemonList'
import PokemonDetail from './Pages/PokemonDetail'

export const publicRoutes = [
  {
    components: PokemonList,
    path: '/',
    exact: true,
  },
  {
    components: PokemonDetail,
    path: '/pokemon/:id',
    exact: true,
  },
]
