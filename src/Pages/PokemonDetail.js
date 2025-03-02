import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import { detailPokemon, pokemonSpecies } from '../Store/Action/Pokemon'
import Layout from '../Components/Layout'
import Loading from '../Components/Loading'
import Badge from '../Components/Badge'

import { SHOW_POKEMON_MOVES } from '../Store/Types'

const PokemonDetail = (props) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    detail,
    species,
    detailPokemon,
    pokemonSpecies,
    evolutionChain,
    loadingDetail,
    loadingSpecies,
    showAllMoves,
  } = props

  useEffect(() => {
    detailPokemon({ id: id })
    pokemonSpecies({ id: id })
    // eslint-disable-next-line
  }, [id, detailPokemon, pokemonSpecies])

  if (loadingDetail || loadingSpecies) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Loading size={'xl'} />
      </div>
    )
  }

  const handleShowMore = () => {
    dispatch({ type: SHOW_POKEMON_MOVES })
  }

  const movesToShow =
    detail === null
      ? []
      : showAllMoves
      ? detail.moves
      : detail.moves.slice(0, 10)

  const EvolutionStage = ({ chain }) => {
    const getImageUrl = (name) => {
      return `https://img.pokemondb.net/artwork/${name}.jpg`
    }

    const id = chain.species.url.split('/').slice(-2, -1)[0]

    return (
      <div
        className={`flex w-36 bg-white flex-col items-center border-black border-[1px] rounded-xl lg:px-3 md:px-3 px-1 py-2 shadow-md hover:shadow-2xl cursor-pointer relative`}
      >
        {loadingSpecies && (
          <div className='absolute inset-0 flex justify-center items-center'>
            <Loading size={'md'} />
          </div>
        )}
        <img
          src={getImageUrl(chain.species.name)}
          alt={chain.species.name}
          className={`rounded-xl h-40 object-contain w-28 ${
            !loadingSpecies ? 'opacity-100' : 'opacity-0'
          }`}
          // onLoad={() =>  loadingSpecies(false)}
        />

        {!loadingSpecies && (
          <p className='capitalize mt-2'>
            {chain.species.name} <span className='text-gray-400'>(#{id})</span>
          </p>
        )}
      </div>
    )
  }

  const renderEvolution = (chain) => {
    if (!chain || !chain.species) return null
    return (
      <div
        className={`flex ${
          chain.evolves_to.length === 0
            ? 'flex-wrap'
            : 'lg:flex-row md:flex-row flex-col'
        } items-center justify-center my-3 mx-1`}
      >
        <div className='flex items-center lg:flex-row md:flex-row flex-col'>
          <Link to={`/pokemon/${chain.species.name}`}>
            <EvolutionStage chain={chain} />
          </Link>

          {chain.evolves_to.length !== 0 && (
            <>
              <div className='text-5xl font-bold lg:mx-3 md:mx-2 mx-1 lg:block md:block hidden'>
                &#x2192;
              </div>
              <div className='text-5xl font-bold lg:mx-3 md:mx-1.5 mx-1 lg:hidden md:hidden'>
                &#x2193;
              </div>
            </>
          )}
        </div>

        {chain.evolves_to.length > 0 && (
          <div className='flex flex-wrap w-auto justify-center items-center'>
            {chain.evolves_to.map((evolution, index) => {
              return (
                <div className='' key={index}>
                  {renderEvolution(evolution)}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const getMaxStatValue = (statName) => {
    const statMaxValues = {
      hp: 255,
      attack: 190,
      defense: 230,
      'special-attack': 194,
      'special-defense': 230,
      speed: 180,
    }

    return statMaxValues[statName] || 100 // Default max value if not specified
  }

  const renderStats = (stats) => {
    return stats.map((stat, i) => {
      const maxStat = getMaxStatValue(stat.stat.name)
      const barWidth = (stat.base_stat / maxStat) * 100

      return (
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
                style={{ width: `${barWidth}%` }}
              ></div>
            </div>
          </div>
          <p className='w-1/12 text-right text-white font-bold'>
            {stat.base_stat}
          </p>
        </div>
      )
    })
  }

  return (
    <Layout>
      <h1 className='text-center text-xl font-bold mx-4 my-5 capitalize'>
        {detail.name} (#{detail.id})
      </h1>
      <div className='flex lg:flex-row flex-col justify-around'>
        <div className='lg:w-1/3 w-full p-5 flex lg:flex-col md:flex-row flex-col items-center rounded-lg shadow-xl lg:mx-3 md:mx-1.5 mx-0'>
          <img
            src={`https://img.pokemondb.net/artwork/${detail.name}.jpg`}
            alt={detail.name}
            className='bg-white lg:w-full md:w-1/2 w-11/12 h-80 shadow-xl object-contain rounded-lg'
          />

          {/* Stats */}
          <div className='lg:w-full md:w-1/2 w-11/12 lg:ml-0 ml-3'>
            <h3 className='text-left font-bold mt-3 text-lg underline'>
              Stats :
            </h3>
            {renderStats(detail.stats)}
          </div>
        </div>

        <div className='mx-3 lg:w-2/3 w-full rounded-lg shadow-xl p-5'>
          {/* Description */}
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
                    {(detail?.weight * 0.220462)?.toFixed(1) ?? 'unknown'} lbs
                  </p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>Height:</p>
                  <p>{(detail?.height * 0.3937)?.toFixed(1) ?? 'unknown'} "</p>
                </div>
                <div className='mb-4'>
                  <p className='text-yellow-300 uppercase font-bold'>
                    Habitat:
                  </p>
                  <p>{species?.habitat?.name ?? 'unknown'}</p>
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
            <span className='flex flex-wrap'>
              {movesToShow.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    <span className='leading-loose mr-0.5 ml-0.5 first:ml-0'>
                      <Badge text={item.move.name} color={'#a29f58'} />
                    </span>
                  </React.Fragment>
                )
              })}
              <button
                className='text-white bg-blue-500 py-1 px-2 rounded-lg shadow-md m-1'
                onClick={handleShowMore}
              >
                {showAllMoves ? 'Show Less' : 'Show More'}
              </button>
            </span>
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
    showAllMoves: state.Pokemon.showAllMoves,
    loadingDetail: state.Pokemon.loadingDetail,
    errorDetail: state.Pokemon.errorDetail,
    loadingSpecies: state.Pokemon.loadingSpecies,
    errorSpecies: state.Pokemon.errorSpecies,
  }
}

export default connect(mapStateToProps, {
  detailPokemon,
  pokemonSpecies,
})(PokemonDetail)
