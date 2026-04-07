import React, { useEffect } from 'react'
import Title from '../componets/Title'
import { useState } from 'react'
import { dummyMyBookingsData } from '../assets/assets';
import {assets} from '../assets/assets';
import {useAppContext} from '../Context/AppContext'
import {toast} from 'react-hot-toast'

const MyBookings = () => {
  const { axios, user, setShowLogin } = useAppContext();
  const [bookings,setBookings]=useState([]);


  const fetchBookings=async()=>{
      try{
          const {data}=await axios.get('/api/user/bookings');
          console.log(data)
          


          if(data.success)
          {
             setBookings(data.Bookings)
            
          }
          else{
            toast.error(data.message)
          }
      }
      catch(err)
      {
        toast.error(err.message)
      }
    }

  useEffect(()=>{
    user && fetchBookings();
  },[user])
  return (

    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 space-y-6'>
      <Title title="My Bookings" subtitle="View your current and past bookings" align="left"/>
      <div>
              {!user && (
                      <div className="flex flex-col items-center justify-center mt-16 text-gray-600">
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

              {user && bookings.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-16 text-gray-600">
                  <p className="text-2xl font-semibold mb-2">
                    You have no bookings yet
                  </p>
                  <p className="mb-4">Start booking your favorite vehicle.</p>
                </div>
              )}



              {bookings.map((booking,index)=>{
                return <div key={booking.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 justify-between relative ">
                  {/*  car image and info */ }
                  <div className='md:col-span-1'>
                  <div className='rounded-md overflow-hidden mb-3'>
                      <img src={booking.Vechical?.image} alt="" className="w-full h-auto aspect-video object-contain" />
                    </div>
                    <p className="text-lg font-medium mt-2">{booking.Vechical?.brand} {booking.Vechical?.model}</p>
                    <p className='text-gray-500 text-sm'>{booking.Vechical?.year}*{booking.Vechical?.category} *{booking.Vechical?.location}</p>
                  </div>
                  <div>
                  {/* booking details */}
                  <div className='md:col-span-2'>
                    <div className="flex items-center gap-2">
                      <p className='px-3 py-1.5 bg-light rounded'>Booking #{index+1}</p>
                      <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{booking.status}</p>
                    </div>
                  </div>

                  {/* booking dates and price */}
                  

                  <div className='flex items-start gap-2 mt-3'>
                    <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                    <div>
                      <p className='text-gray-500'>Rental Period</p>
                      <p>{booking.pickupDateTime} to {booking.returnDateTime}</p>
                    </div>
                  </div>


                  <div className='flex items-start gap-2 mt-3'>
                    <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                    <div>
                      <p className='text-gray-500'>Pickup-location</p>
                      <p>{booking.Vechical?.location}</p>
                    </div>
                </div>
                  {/* Price */}
                  


                  </div>

                  <div className="md:col-span-1 flex flex-col justify-between gap-6 absolute right-10 top-10">
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <p className="text-lg font-bold">${booking.price}</p>
                      <p className='text-gray-500'>Booked on {booking.pickupDateTime}</p>
                    </div>
                  </div>

                  

                </div>
              })}
      </div>

    </div>
  )
}

export default MyBookings
