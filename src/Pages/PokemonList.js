import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from '../Store/Action/Pokemon'
// import { setSearchTerm, setSearchResults } from '../Store/Action/Filter'

import CardList from '../Components/CardList'
import Layout from '../Components/Layout'
import Filters from '../Components/Filters'
import Loading from '../Components/Loading'
import { filterPokemon } from '../Store/Action/Filter'

const PokemonList = () => {
  const dispatch = useDispatch()
  const { pokemons, loading, error } = useSelector((state) => state.Pokemon)
  const { filtered_pokemon, filterLoading, filters } = useSelector(
    (state) => state.Filter
  )

  const limit = 20
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(getPokemon({ limit, offset }))
    // eslint-disable-next-line
  }, [dispatch, offset])

  useEffect(() => {
    setData((prev) => {
      let updatedData = [...prev, ...pokemons].reduce((acc, current) => {
        if (!acc.find((item) => item.name === current.name)) {
          acc.push(current)
        }
        return acc
      }, [])
      return updatedData
    })
  }, [pokemons])

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop
    const documentHeight = document.documentElement.offsetHeight

    if (scrollPosition >= documentHeight - 5 && !loading && !filterLoading) {
      if (filters.types) {
        dispatch(filterPokemon(filters))
      } else {
        setOffset((prev) => prev + limit)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [loading])

  if (pokemons.length === 0 && loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Loading size={'xl'} />
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='pt-5 text-2xl font-bold'>Pokédex</h1>
      <Filters />
      {error && <p className='mt-5'>{error}</p>}
      <div className='lg:mx-20 md:mx-10 mx-2 my-6'>
        <CardList
          data={filtered_pokemon.length > 0 ? filtered_pokemon : data}
        />
        {loading && (
          <h2 className='text-xl text-center'>Load more pokemon ...</h2>
        )}
      </div>
      {filterLoading && filtered_pokemon.length === 0 && (
        <div className='mt-20'>
          <Loading size={'md'} />
        </div>
      )}
    </Layout>
  )
}

export default PokemonList
