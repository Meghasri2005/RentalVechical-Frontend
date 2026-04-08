import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../componets/Loader'
import { useAppContext } from '../Context/AppContext'
import { toast } from 'react-hot-toast'

const VechicalDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const {
    axios,
    pickupDateTime,
    setPickupDateTime,
    returnDateTime,
    setReturnDateTime,
    user,
    setShowLogin
  } = useAppContext()

  const [vech, setVech] = useState(null)

  // ✅ Fetch single vehicle from backend
  useEffect(() => {
    const fetchVech = async () => {
      try {
        const { data } = await axios.get(`/api/home/${id}`)
        if (data.success) {
          setVech(data.vechical)
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }

    fetchVech()
  }, [id])

  // ✅ Booking handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please login first to book a vehicle")
      setShowLogin(true)
      navigate("/")
      return
    }

    try {
      const { data } = await axios.post('/api/Booking/create', {
        vech: id,
        pickupDateTime,
        returnDateTime
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/bookings')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  // ✅ Loader
  if (!vech) return <Loader />

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-20'>

      {/* Back button */}
      <div className='flex my-6 gap-2 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={assets.arrow_icon} alt="back" className="rotate-180 opacity-65" />
        Back to all cars
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>

        {/* Left Section */}
        <div className='w-full'>
          <img src={vech.image} alt="vehicle" className='w-full max-w-[600px] h-[400px] rounded-md object-contain' />

          <div className='space-y-6 mt-4'>

            <div>
              <h1 className='text-3xl font-bold'>{vech.brand} {vech.model}</h1>
              <p>{vech.category} • {vech.year}</p>
            </div>

            <hr />

            {/* Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, label: `${vech.seatingCapacity} Seats` },
                { icon: assets.fuel_icon, label: vech.FuelType },
                { icon: assets.car_icon, label: vech.transmission },
                { icon: assets.location_icon, label: vech.location }
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <img src={icon} alt="icon" className="w-6 h-6" />
                  <p>{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{vech.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear view mirror"].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} alt="check" className="w-4 h-4 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Right Section (Booking) */}
        <form
          onSubmit={handleSubmit}
          className='shadow-lg h-max sticky top-20 rounded-xl p-6 space-y-5 text-gray-500 w-full max-w-[400px]'
        >

          <div className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            <h2>₹{vech.pricePerDay}</h2>
            <span className='text-base text-gray-400 font-normal'>per day</span>
          </div>

          <hr />

          <div className='flex flex-col gap-2'>
            <label>Pickup Date and Time</label>
            <input
              type="datetime-local"
              value={pickupDateTime}
              onChange={e => setPickupDateTime(e.target.value)}
              className='border px-3 py-2 rounded-lg'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Return Date and Time</label>
            <input
              type="datetime-local"
              value={returnDateTime}
              onChange={e => setReturnDateTime(e.target.value)}
              className='border px-3 py-2 rounded-lg'
              required
            />
          </div>

          <button className='w-full bg-[#2563EB] hover:bg-blue-700 transition py-3 text-white rounded-xl'>
            Book Now
          </button>

          <p className='text-center text-sm'>No credit card required</p>

        </form>
      </div>
    </div>
  )
}

export default VechicalDetails