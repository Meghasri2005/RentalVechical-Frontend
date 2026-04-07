import React, { useEffect, useState } from 'react'
import Title from '../componets/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { toast } from 'react-hot-toast'

const MyBookings = () => {

  const { axios, user, setShowLogin } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings')

      if (data.success) {
        setBookings(data.Bookings || [])
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchBookings()
    else setLoading(false)
  }, [user])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 space-y-6'>

      <Title 
        title="My Bookings" 
        subtitle="View your current and past bookings" 
        align="left"
      />

      {/* Not logged in */}
      {!user && (
        <div className="flex flex-col items-center mt-16 text-gray-600">
          <p className="text-2xl font-semibold mb-2">
            Please login to view your bookings
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#2563EB] text-white px-6 py-2 rounded-md mt-4"
          >
            Login
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && <p className="text-center">Loading bookings...</p>}

      {/* No bookings */}
      {user && !loading && bookings.length === 0 && (
        <div className="text-center mt-16 text-gray-600">
          <p className="text-2xl font-semibold mb-2">
            You have no bookings yet
          </p>
          <p>Start booking your favorite vehicle.</p>
        </div>
      )}

      {/* Bookings List */}
      {bookings.map((booking, index) => (
        <div 
          key={booking._id} 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border rounded-lg mt-5"
        >

          {/* Vehicle */}
          <div>
            <img 
              src={booking.Vechical?.image} 
              alt="vehicle" 
              className="w-full aspect-video object-contain rounded-md"
            />
            <p className="text-lg font-medium mt-2">
              {booking.Vechical?.brand} {booking.Vechical?.model}
            </p>
            <p className='text-gray-500 text-sm'>
              {booking.Vechical?.year} • {booking.Vechical?.category} • {booking.Vechical?.location}
            </p>
          </div>

          {/* Details */}
          <div className='md:col-span-2 space-y-3'>
            <div className="flex items-center gap-2">
              <p className='px-3 py-1.5 bg-gray-100 rounded'>
                Booking #{index + 1}
              </p>
              <p className={`px-3 py-1 text-xs rounded-full ${
                booking.status === 'Confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <img src={assets.calendar_icon_colored} alt="calendar" className='w-4 h-4 mt-1'/>
              <div>
                <p className='text-gray-500'>Rental Period</p>
                <p>{booking.pickupDateTime} → {booking.returnDateTime}</p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={assets.location_icon_colored} alt="location" className='w-4 h-4 mt-1'/>
              <div>
                <p className='text-gray-500'>Pickup Location</p>
                <p>{booking.Vechical?.location}</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-500">Total Price</p>
              <p className="text-lg font-bold">₹{booking.price}</p>
              <p className='text-gray-500 text-sm'>
                Booked on {booking.pickupDateTime}
              </p>
            </div>
          </div>

        </div>
      ))}

    </div>
  )
}

export default MyBookings