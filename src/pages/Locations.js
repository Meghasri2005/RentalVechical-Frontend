import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'

const Locations = () => {

  const { axios } = useAppContext()
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLocations = async () => {
    try {
      const { data } = await axios.get('/api/home/locations')

      if (data.success) {
        setLocations(data.locations || [])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <div className="p-10">

      <h2 className="text-3xl font-semibold mb-8">
        Select Your Location
      </h2>

      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {locations.map((city) => (
            <div
              key={city}
              onClick={() => navigate(`/Vechicals?location=${city}`)}
              className="cursor-pointer bg-white shadow-md hover:shadow-xl transition-all p-8 rounded-xl text-center font-semibold text-lg"
            >
              {city}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default Locations