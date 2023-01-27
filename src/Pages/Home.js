import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPokemon } from '../Store/Action/Pokemon';

class Home extends Component {
  constructor() {
    super();
    this.state = {
        limit: 50,
        offset: 0
    };
  }

  componentDidMount() {
    this.props.getPokemon({
        limit: this.state.limit,
        offset: this.state.offset
    });
  }

  render() {
    // const { offset } = this.state;
    const { pokemons } = this.props;
    
    return (
      <div>
        <h1>Poké Ball</h1>
        <div className='container'>
            {pokemons.map((pokemon, i) => {
                return (
                    <div key={i} className="card">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`} alt={pokemon.name} />
                        <h4><b>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b></h4>
                    </div>
                )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.Pokemon.pokemons
    }
}

export default connect(mapStateToProps, {
    getPokemon
})(Home)