import React, { useState, useEffect } from 'react'
import { getPokemon } from '../Store/Action/Pokemon'
import { connect } from 'react-redux'

import CardList from '../Components/CardList'
import Navbar from '../Components/Navbar'

const Home = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 20

  useEffect(() => {
    fetchPokemon()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
  }, [props.pokemons])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setOffset((prev) => prev + limit)
    }
  }

  const fetchPokemon = async () => {
    setLoading(true)
    try {
      await props.getPokemon({ limit, offset })
    } catch (error) {
      console.error('Error fetching pokemon', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return data.length === 0 && loading ? (
    <h1>Loading</h1>
  ) : (
    <Navbar>
      <h1 className='my-5 text-2xl font-bold'>Poké Card</h1>
      <CardList pokemons={data} />
      {loading && <h1 className='text-xl mb-7'>Loading more...</h1>}
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    pokemons: state.Pokemon.pokemons,
  }
}

export default connect(mapStateToProps, {
  getPokemon,
})(Home)
