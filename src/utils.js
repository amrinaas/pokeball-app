export const getColorHex = (color) => {
  const colors = {
    black: '#000000',
    blue: '#0000FF',
    brown: '#A52A2A',
    gray: '#808080',
    green: '#008000',
    pink: '#FFC0CB',
    purple: '#800080',
    red: '#FF0000',
    white: '#CCCCCC',
    yellow: '#FFFF00',
  }
  return `${colors[color]}66` || '#CCCCCC'
}

export const getColorBadgeHex = (type) => {
  const colors = {
    grass: '#008000', // green
    fire: '#FF0000', // red
    water: '#0000FF', // blue
    electric: '#FFAE42', // yellow orange
    ice: '#ADD8E6', // light blue
    fighting: '#A52A2A', // brown
    poison: '#800080', // purple
    ground: '#D2B48C', // tan
    flying: '#B0E0E6', // light sky blue
    psychic: '#FF69B4', // hot pink
    bug: '#9ACD32', // yellow green
    rock: '#808080', // gray
    ghost: '#4B0082', // indigo
    dragon: '#000080', // navy
    dark: '#000000', // black
    steel: '#C0C0C0', // silver
    fairy: '#FFC0CB', // pink
  }
  return colors[type] ? `${colors[type]}` : '#808080'
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])

  if (type === 'types') {
    unique = unique.flat().map((item) => item.type.name)
  }
  return ['all', ...new Set(unique)]
}
