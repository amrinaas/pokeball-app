import React from 'react'
import { Link } from "react-router-dom";

const Cards = ({ image, name, id }) => {
  return (
    <Link to={`/pokemon/${id+1}`}>
      <div key={id} className="card">
        <div>
          <img src={`${image}/${id + 1}.png`} alt={name} />
        </div>
        <div style={{ fontSize: '20px', margin: 'auto' }}>
          <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
        </div>
      </div>
    </Link>
  )
}

export default Cards