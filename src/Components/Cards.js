import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ image, name, id }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [id])

  return (
    <Link to={`/pokemon/${id + 1}`}>
      <div key={id} className='card'>
        {loading && <div className='loader'></div>}
        <div>
          <img
            src={`${image}/${id + 1}.png`}
            alt={name}
            onLoad={() => setLoading(false)}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
        {!loading && (
          <div style={{ fontSize: '20px', margin: 'auto' }}>
            <b>{name.charAt(0).toUpperCase() + name.slice(1)}</b>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Cards
