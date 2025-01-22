import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'

const NotFound = () => {
  return (
    <div className='h-screen w-screen bg-gray-100 flex items-center justify-center'>
      <div className='container px-5 text-gray-700'>
        <div className=''>
          <div className='text-5xl font-dark font-bold'>404</div>
          <p className='text-2xl md:text-3xl font-light leading-normal'>
            Sorry we couldn't find this page.{' '}
          </p>
          <p className='mb-8'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link to={'/'}>
            <Button>back to homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
