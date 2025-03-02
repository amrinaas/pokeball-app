import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from '../Store/Action/Pokemon'
// import { setSearchTerm, setSearchResults } from '../Store/Action/Filter'

import CardList from '../Components/CardList'
import Layout from '../Components/Layout'
import Filters from '../Components/Filters'
import Loading from '../Components/Loading'

const PokemonList = () => {
  const dispatch = useDispatch()
  const { pokemons, loading, searchTerm, searchResults, error, filterLoading } =
    useSelector((state) => state.Pokemon)

  const limit = 20
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(getPokemon({ limit, offset }))
    // eslint-disable-next-line
  }, [dispatch, offset])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setData((prev) => {
        let updatedData = [...prev, ...pokemons].reduce((acc, current) => {
          if (!acc.find((item) => item.name === current.name)) {
            acc.push(current)
          }
          return acc
        }, [])
        return updatedData
      })
    } else {
      setData(searchResults)
    }
  }, [searchTerm, pokemons, searchResults])

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop
    const documentHeight = document.documentElement.offsetHeight

    if (scrollPosition >= documentHeight - 5 && !loading) {
      setOffset((prev) => prev + limit)
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
        <CardList data={data} />
        {loading && (
          <h2 className='text-xl text-center'>Load more pokemon ...</h2>
        )}
      </div>
      {filterLoading && searchResults.length === 0 && (
        <div className='mt-20'>
          <Loading size={'md'} />
        </div>
      )}
    </Layout>
  )
}

export default PokemonList
