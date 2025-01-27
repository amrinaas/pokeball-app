import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { detailPokemon, pokemonSpecies } from '../Store/Action/Pokemon'
import Layout from '../Components/Layout'
import Loading from '../Components/Loading'

const PokemonDetail = (props) => {
  const { id } = useParams()
  const { detail, species, detailPokemon, pokemonSpecies } = props
  const [showAll, setShowAll] = useState(false)
  const movesToShow = showAll ? detail.moves : detail.moves.slice(0, 10)

  const handleShowMore = () => {
    setShowAll(!showAll)
  }

  const handleHide = () => {
    setShowAll(false)
  }

  useEffect(() => {
    detailPokemon({ id: id })
    pokemonSpecies({ id: id })
    // eslint-disable-next-line
  }, [id])

  if (!detail || !species) return <Loading />
  return (
    <Layout>
      <h1 className='text-center text-xl font-bold mx-4 my-5'>
        {detail.name} (#{detail.id})
      </h1>
      <div className='flex justify-center shadow-lg rounded-lg lg:mx-48 md:mx-20 mx-10 bg-gray-400/40'>
        <img
          className='w-1/4 object-contain'
          src={detail.sprites.front_default}
          alt={detail.name}
        />
        <img
          className='w-1/4 object-contain'
          src={detail.sprites.back_default}
          alt={detail.name}
        />
      </div>
      <div className='my-5 lg:mx-48 md:mx-20 mx-10 text-left'>
        <p>
          Description :{' '}
          {
            species.flavor_text_entries.find(
              (entry) => entry.language.name === 'en'
            ).flavor_text
          }
        </p>
        <p>Height : {detail.height}</p>
        <p>Weight : {detail.weight}</p>
        <p>Types: {detail.types.map((type) => type.type.name).join(', ')}</p>
        <p>
          {' '}
          Abilities :
          {detail.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
        <p>Habitat : {species.habitat.name}</p>
        <p>
          Egg Groups: {species.egg_groups.map((group) => group.name).join(', ')}
        </p>
        <p>
          Moves :
          {movesToShow.map((item, id) => {
            return (
              <>
                <span
                  key={id}
                  className='leading-loose p-1 border border-gray-400/40 rounded-lg shadow-md mx-1'
                >
                  {item.move.name}
                </span>
                {!showAll && detail.moves.length > 10 && id === 9 && (
                  <button
                    className='text-white bg-blue-500 p-1 rounded-lg shadow-md m-1'
                    onClick={handleShowMore}
                  >
                    Show all
                  </button>
                )}
                {showAll && id === detail.moves.length - 1 && (
                  <button
                    className='text-white bg-blue-500 p-1 rounded-lg shadow-md m-1'
                    onClick={handleHide}
                  >
                    hide
                  </button>
                )}
              </>
            )
          })}
        </p>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    detail: state.Pokemon.detail,
    species: state.Pokemon.species,
  }
}

export default connect(mapStateToProps, {
  detailPokemon,
  pokemonSpecies,
})(PokemonDetail)
