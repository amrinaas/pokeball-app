import React, { useState, useEffect} from 'react'
import { getPokemon } from '../Store/Action/Pokemon';
import { connect } from 'react-redux';

import CardList from '../Components/CardList'
import Navbar from '../Components/Navbar'

const Home = (props) => {
  const [limit, setLimit] = useState(50)
  const [offset, setOffset] = useState(0)

  React.useEffect(() => {
		props.getPokemon({
      limit: limit,
      offset: offset
    });
	}, []);

  return (
      !props.pokemons.length ?
        <h1>Loading...</h1> :
        (
          <Navbar>
            <h1>Poké Card</h1>
            <CardList pokemons={props.pokemons} />
          </Navbar>
        )
  )
}

const mapStateToProps = (state) => {
  return {
      pokemons: state.Pokemon.pokemons
  }
}

export default connect(mapStateToProps, {
  getPokemon
})(Home)