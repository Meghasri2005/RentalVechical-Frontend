import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from '../componets/Title'
import VechCard from '../componets/VechCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
import { toast } from "react-hot-toast"

const Vechicals = () => {

  const [searchParams] = useSearchParams()

  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDateTime = searchParams.get('pickupDateTime')
  const returnDateTime = searchParams.get('returnDateTime')
  const type = searchParams.get("type")
  const location = searchParams.get("location")

  const [input, setInput] = useState("")
  const [filteredVechs, setFilteredVechs] = useState([])

  const { vechs, axios } = useAppContext()

  const isSearchData = pickupLocation && pickupDateTime && returnDateTime

  // 🔍 Filter function
  const applyFilter = (data) => {
    let filtered = [...data]

    if (type) {
      filtered = filtered.filter(v => v.vechicalType === type)
    }

    if (location) {
      filtered = filtered.filter(v => v.location === location)
    }

    if (input) {
      filtered = filtered.filter(v =>
        v.brand?.toLowerCase().includes(input.toLowerCase()) ||
        v.model?.toLowerCase().includes(input.toLowerCase()) ||
        v.category?.toLowerCase().includes(input.toLowerCase()) ||
        v.transmission?.toLowerCase().includes(input.toLowerCase()) ||
        v.vechicalType?.toLowerCase().includes(input.toLowerCase()) ||
        v.location?.toLowerCase().includes(input.toLowerCase())
      )
    }

    setFilteredVechs(filtered)
  }

  // 🚀 Fetch available vehicles (API search)
  const searchVechAvailability = async () => {
    try {
      const { data } = await axios.post('/api/home/available', {
        location: pickupLocation,
        pickupDateTime,
        returnDateTime
      })

      if (data.success) {
        if (data.availableVechs.length === 0) {
          toast("No vehicles available")
        }
        applyFilter(data.availableVechs) // 🔥 Apply filters AFTER API
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  // 🧠 Main logic controller
  useEffect(() => {
    if (isSearchData) {
      searchVechAvailability()
    } else {
      applyFilter(vechs)
    }
  }, [vechs, input, type, location, pickupLocation, pickupDateTime, returnDateTime])

  return (
    <>
      {/* 🔍 Search UI */}
      <div className='flex flex-col items-center py-20 bg-[#F1F5F9] max-md:px-4'>
        <Title 
          title="Available Vechs" 
          subtitle="Browse our selection of premium vehicles for your next adventure" 
        />

        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-[800px] h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2' />

          <input
            type='text'
            value={input}
            placeholder='Search by make, model or feature'
            className='w-full h-full text-gray-500 outline-none'
            onChange={(e) => setInput(e.target.value)}
          />

          <img src={assets.filter_icon} alt="filter" className='w-4.5 h-4.5 mr-2' />
        </div>
      </div>

      {/* 🚗 Vehicles */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>

        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          {filteredVechs.length} vehicles available
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredVechs.map((vech) => (
            <VechCard key={vech._id} vech={vech} />
          ))}
        </div>

      </div>
    </>
  )
}

export default Vechicals