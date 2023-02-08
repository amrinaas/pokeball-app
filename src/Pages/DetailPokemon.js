import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailPokemon } from '../Store/Action/Pokemon';
import Navbar from '../Components/Navbar'
import { Box, LinearProgress, Typography, styled, Grid, Paper, Button, Stack } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontFamily: 'monospace'
}));

const DetailPokemon = (props) => {
    const { id } = useParams()
    const [index, setIndex] = useState(3)

    useEffect(() => {
      props.detailPokemon({ id: id });
    }, []);

  return (
    !props.detail ?
      <h1>Loading...</h1> :
    <Navbar>
      <Box sx={{ flexGrow: 1, mb:2 }}>
        <Grid container spacing={2} sx={{ ml: 'auto' }}>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <h2>{props.detail.name}</h2>
            <img 
              style={{ width: '200px' }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.detail.id}.png`}
              alt={props.detail.name} />
            <Item>
              <span>Type : </span>
              {props.detail.types.map((type, i) => {
                return (
                  <span key={i}>{ (i ? ', ' : '') + type.type.name }</span>  
                )
              })}
            </Item>
            <Item>
              <span>Abilities : </span>
              {props.detail.abilities.map((type, i) => {
                return (
                  <span key={i}>{ (i ? ', ' : '') + type.ability.name }</span>  
                )
              })}
            </Item>
            <Item>
              <span>Weight : </span>
              <span>{props.detail.weight}</span>
            </Item>
            <Item>
              <span>Height : </span>
              <span>{props.detail.height}</span>
            </Item>
          </Grid>
          <Grid item xs={8} sx={{ m: 'auto' }}>
            {props.detail?.stats?.map((item, index) => { 
              return(
                <Box key={item.stat.name}>
                  <Typography 
                      variant="h6"
                      sx={{ textAlign: 'left', mt: 1, fontFamily: 'monospace' }}
                  >
                      {item.stat.name}: {item.base_stat}
                  </Typography>
                  <LinearProgress 
                      variant="determinate"
                      value={item.base_stat}  
                      sx={{
                          width: '90%',
                          height: 10, 
                          mr: 2,
                          background: '#eeeeee'
                      }} 
                  
                  />
                </Box>
              )
          })}
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid sx={{  textAlign: 'left' }}>
          { props.detail.moves.slice(0, index).map((item) => 
            <Button variant="contained" sx={{ m: 1, fontFamily: 'monospace' }}>{item.move.name}</Button>
          )}
        <Button variant='outlined' size="small" onClick={() => setIndex(props.detail.moves.length)}>load more</Button>
        </Grid>
      </Box>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
    return {
        detail: state.Pokemon.detail
    }
}

export default connect(mapStateToProps, {
    detailPokemon
})(DetailPokemon)