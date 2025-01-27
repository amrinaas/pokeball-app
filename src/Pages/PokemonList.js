import React, { useState, useEffect } from 'react'
import { getPokemon } from '../Store/Action/Pokemon'
import { connect } from 'react-redux'

import CardList from '../Components/CardList'
import Layout from '../Components/Layout'

const PokemonList = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 20

  useEffect(() => {
    fetchPokemon()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [offset])

  useEffect(() => {
    setData((prev) => {
      let updatedData = [...prev, ...props.pokemons].reduce((acc, current) => {
        if (!acc.find((item) => item.name === current.name)) {
          acc.push(current)
        }
        return acc
      }, [])
      return updatedData
    })
    // eslint-disable-next-line
  }, [props.pokemons])

  const debounce = (func, delay) => {
    let debounceTimer
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const handleScroll = debounce(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop
    const documentHeight = document.documentElement.offsetHeight
    const margin = window.innerWidth < 640 ? 10 : 5 // Adjust margin for small screens

    if (scrollPosition + margin >= documentHeight) {
      setOffset((prev) => prev + limit)
    }
  }, 1500)

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      await props.getPokemon({ limit, offset })
    } catch (error) {
      console.error('Error fetching pokemon', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className='py-5 text-2xl font-bold'>Poké Card</h1>
          <CardList pokemons={data} />
          {!loading && (
            <p className='pb-10 text-2xl'>Loading more pokemon...</p>
          )}
        </>
      )}
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.Pokemon.pokemons,
  }
}

export default connect(mapStateToProps, {
  getPokemon,
})(PokemonList)
