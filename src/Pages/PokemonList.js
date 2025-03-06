import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from '../Store/Action/Pokemon'

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

  const handleScroll = useCallback(() => {
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
  }, [loading, filterLoading, filters, dispatch])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [handleScroll])

  const renderCardList = useMemo(() => {
    if (filtered_pokemon.length === 0 && pokemons.length === 0) {
      return <p>No pokemon by type</p>
    }

    if (filterLoading && filtered_pokemon.length === 0) {
      return (
        <div className='mt-36'>
          <Loading />
        </div>
      )
    }

    if (filtered_pokemon.length !== 0) {
      return <CardList data={filtered_pokemon} />
    }

    return <CardList data={data} />
    // eslint-disable-next-line
  }, [filtered_pokemon, pokemons, data, filterLoading])

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
        {renderCardList}
        {loading && (
          <h2 className='text-xl text-center'>Load more pokemon ...</h2>
        )}
      </div>
    </Layout>
  )
}

export default PokemonList
