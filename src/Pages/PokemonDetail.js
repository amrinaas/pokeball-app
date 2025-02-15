import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { detailPokemon, pokemonSpecies } from '../Store/Action/Pokemon'
import Layout from '../Components/Layout'
import Loading from '../Components/Loading'
import Badge from '../Components/Badge'
const PokemonDetail = (props) => {
  const { id } = useParams()
  const { detail, species, detailPokemon, pokemonSpecies, evolutionChain } =
    props
  const [showAll, setShowAll] = useState(false)
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    detailPokemon({ id: id })
    pokemonSpecies({ id: id })
    // eslint-disable-next-line
  }, [id, detailPokemon, pokemonSpecies])

  if (!detail || !species) return <Loading />

  const movesToShow =
    showAll && detail !== null ? detail.moves : detail.moves.slice(0, 10)

  const handleShowMore = () => {
    setShowAll(!showAll)
  }

  const handleHide = () => {
    setShowAll(false)
  }

  const renderEvolution = (chain) => {
    if (!chain) return null

    const getImageUrl = (name) => {
      return `https://img.pokemondb.net/artwork/${name}.jpg`
    }

    return (
      <div className='flex lg:flex-row md:flex-row flex-col items-center justify-center my-3 mx-1'>
        <div className='flex flex-col items-center'>
          <img
            src={getImageUrl(chain.species.name)}
            alt={chain.species.name}
            className='rounded-xl w-full shadow-md h-56 p-3 object-contain bg-white'
          />
          <p className='capitalize mt-2'>{chain.species.name}</p>
        </div>
        {chain.evolves_to.length > 0 && (
          <>
            <div className='lg:text-5xl md:text-3xl text-2xl font-bold lg:mx-3 md:mx-1.5 mx-1 lg:block md:block hidden'>
              &#x2192;
            </div>
            <div className='lg:text-5xl md:text-3xl text-2xl font-bold lg:mx-3 md:mx-1.5 mx-1 lg:hidden md:hidden'>
              &#x2193;
            </div>
          </>
        )}
        {chain.evolves_to.map((evolution) => renderEvolution(evolution))}
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='text-center text-xl font-bold mx-4 my-5 capitalize'>
        {detail.name} (#{detail.id})
      </h1>
      <div className='flex lg:flex-row flex-col justify-around w-full px-10'>
        <div className='lg:w-1/3 w-full p-5 flex lg:flex-col md:flex-row flex-col items-center rounded-lg shadow-xl mx-3'>
          <img
            src={`https://img.pokemondb.net/artwork/${detail.name}.jpg`}
            alt={detail.name}
            className='bg-white lg:w-full md:w-1/2 w-11/12 h-80 object-contain rounded-lg'
          />

          {/* Stats */}
          <div className='lg:w-full md:w-1/2 w-11/12 lg:ml-0 ml-3'>
            <h3 className='text-left font-bold mt-3 text-lg underline'>
              Stats :
            </h3>
            {detail.stats.map((stat, i) => (
              <div
                key={i}
                className='flex items-center my-2 bg-black/70 p-2 rounded-md shadow-lg'
              >
                <p className='w-2/5 text-left text-yellow-300 font-bold uppercase'>
                  {stat.stat.name}
                </p>
                <div className='flex flex-col items-center w-1/2'>
                  <div className='bg-gray-200 flex w-full h-3 rounded-lg relative border-2 border-yellow-500'>
                    <div
                      className='bg-green-500 h-full left-0'
                      style={{ width: `${stat.base_stat}%` }}
                    ></div>
                  </div>
                </div>
                <p className='w-1/12 text-right text-white font-bold'>
                  {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className='mx-3 lg:w-2/3 w-full rounded-lg shadow-xl p-5'>
          <h3 className='text-left font-bold mt-3 text-lg underline'>
            Description :
          </h3>
          <div className='text-justify lg:text-lg md:text-base sm:text-sm'>
            {
              species.flavor_text_entries.find(
                (entry) => entry.language.name === 'en'
              ).flavor_text
            }
          </div>

          {/* Details */}
          <div className='text-left bg-black/70 my-5 text-white rounded-lg p-5 capitalize'>
            <div className='flex justify-between'>
              <div className='w-1/2'>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>Weight:</p>
                  <p className='lowercase'>
                    {(detail.weight * 0.220462).toFixed(1)} lbs
                  </p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>Height:</p>
                  <p>{(detail.height * 0.3937).toFixed(1)}"</p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>
                    Habitat:
                  </p>
                  <p>{species.habitat.name}</p>
                </div>
              </div>
              <div className='w-1/2'>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>
                    Egg groups:
                  </p>
                  <p>
                    {species.egg_groups.map((group) => group.name).join(', ')}
                  </p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>
                    Abilities:
                  </p>
                  <p>
                    {detail.abilities
                      .map((ability) => ability.ability.name)
                      .join(', ')}
                  </p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>Types:</p>
                  <p>{detail.types.map((type) => type.type.name).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Moves */}
          <div className='text-justify'>
            <h3 className='text-left font-bold mt-3 text-lg underline'>
              Moves :
            </h3>{' '}
            <p className='flex flex-wrap'>
              {movesToShow.map((item, id) => {
                return (
                  <>
                    <span className='leading-loose mr-0.5 ml-0.5 first:ml-0'>
                      <Badge key={id} text={item.move.name} color={'#a29f58'} />
                    </span>
                    {!showAll && detail.moves.length > 10 && id === 9 && (
                      <button
                        className='text-white bg-blue-500 py-1 px-2 rounded-lg shadow-md m-1'
                        onClick={handleShowMore}
                      >
                        Show all
                      </button>
                    )}
                    {showAll && id === detail.moves.length - 1 && (
                      <button
                        className='text-white bg-blue-500 py-1 px-2 rounded-lg shadow-md m-1'
                        onClick={handleHide}
                      >
                        Hide
                      </button>
                    )}
                  </>
                )
              })}
            </p>
          </div>

          {/* Evolutions */}
          <div className=''>
            {' '}
            <h3 className='text-left font-bold mt-3 text-lg underline'>
              Evolutions :
            </h3>{' '}
            <div className='rounded-r-2xl'>
              {evolutionChain && renderEvolution(evolutionChain.chain)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    detail: state.Pokemon.detail,
    species: state.Pokemon.species,
    evolutionChain: state.Pokemon.evolutionChain,
  }
}

export default connect(mapStateToProps, {
  detailPokemon,
  pokemonSpecies,
})(PokemonDetail)
