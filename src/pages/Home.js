import React from 'react'
import Hero from '../componets/Hero'
import FeaturedSection from '../componets/FeaturedSection'
import Banner from '../componets/Banner'
import Testmonial from '../componets/Testmonial'
import Newsletter from '../componets/Newsletter'

const Home = () => {
  return (
    <>
      <div className='w-full min-h-screen'>
        <Hero />
        <FeaturedSection/>
        <Banner/>
        <Testmonial/>
        <Newsletter/>
      </div>
     
    </>
  )
}

export default Home
