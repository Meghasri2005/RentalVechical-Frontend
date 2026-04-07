import React, { useEffect } from 'react'
import { useState } from 'react';
import TitleBar from '../../componets/Owner/TitleBar';
import {useAppContext} from "../../Context/AppContext"
import {toast} from 'react-hot-toast'


const ManageBookings = () => {
  const {isOwner,axios}=useAppContext()
  const [bookings,setBookings]=useState([]);
  const fetchOwnerBookings=async ()=>{
    try{
      const {data}=await axios.get('/api/owner/bookings');
      console.log(data)
      if(data.success)
      {
        setBookings(data.data);
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }
  const ChangingBookingStatus=async (bookingId,status)=>{
    try{
      console.log(bookingId,status)
      const {data}=await axios.post('/api/owner/changestatus',{BookingId:bookingId,status});
      if(data.success)
      {
        toast.success(data.message)
        fetchOwnerBookings()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }



  useEffect(()=>{
    isOwner && fetchOwnerBookings()
  },[isOwner])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
          <TitleBar title='Manage Bookings' subtitle='Track all customer bookings,approve or cancel requests,and mange booking statuses'/>
    
          <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
              <table className='w-full border-collapse text-left text-sm text-gray-600'>
                  <thead className='text-gray-500'>
                    <tr >
                      <th className='p-3 font-medium'>Car</th>
                      <th className='p-3 font-medium max-md:hidden'>Date Range</th>
                      <th className='p-3 font-medium'>Total</th>
                      <th className='p-3 font-medium max-md:hidden'>Payment</th>
                      <th className='p-3 font-medium'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings?.map((booking,index)=>(
                      <tr key={index} className='border-t border-borderColor text-gray-500'>
                        <td className='p-3 flex items-center gap-3'>
                            <img src={booking.Vechical?.image} alt="" className='w-[50px] h-[50px] rounded-md object-contain'/>
                            <p className='font-medium max-md:hidden'>{booking.Vechical?.brand} {booking.Vechical?.model}</p>
                        </td>
                        <td className='p-3 max-md:hidden'>{booking.pickupDateTime?.split('T')[0]} to {booking.returnDateTime?.split('T')[0]}</td>
                        <td className='p-3'>${booking.price}</td>
                        <td className='p-3 max-md:hidden'><span className='bg-gray-100 px-3 rounded-full text-xs'>offline</span></td>
                        <td className='p-3'>{booking.status==='Pending'?(<select className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none' value={booking.status} onChange={e=>ChangingBookingStatus(booking._id,e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                          </select>):(<span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status ==='Confirmed'?'bg-green-100 text-green-500':'bg-red-100 text-red-500'}`}>{booking.status}</span>)}
                          </td>

                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
    
        </div>
  )
}

export default ManageBookings
