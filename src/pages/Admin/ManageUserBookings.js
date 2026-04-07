import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

const ManageBookings = () => {

  const { axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    const { data } = await axios.get('/api/admin/bookings')
    console.log(data)
    if (data.success) setBookings(data.bookings)
  }
const formatDateTime = (dateString) => {
  const dateObj = new Date(dateString)

  const date = dateObj.toLocaleDateString()
  const time = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return { date, time }
}

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Manage Bookings</h2>

      <table className='w-full bg-white shadow rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-3 text-left'>User</th>
            <th>Vehicle</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {bookings.map(b => {

    const pickup = formatDateTime(b.pickupDateTime)
    const drop = formatDateTime(b.returnDateTime)

    return (
      <tr key={b._id} className='border-t hover:bg-gray-50 transition'>

        <td className='p-4 font-medium text-gray-700'>
          {b.user?.name}
        </td>

        <td className='text-gray-600'>
          {b.Vechical?.brand}
        </td>

        {/* Pickup Date */}
        <td className='text-center'>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>
              {pickup.date}
            </span>
            <span className='text-xs text-gray-500'>
              {pickup.time}
            </span>
          </div>
        </td>

        {/* Return Date */}
        <td className='text-center'>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>
              {drop.date}
            </span>
            <span className='text-xs text-gray-500'>
              {drop.time}
            </span>
          </div>
        </td>

        <td>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold
            ${b.status === "Confirmed" && "bg-green-100 text-green-600"}
            ${b.status === "Pending" && "bg-yellow-100 text-yellow-600"}
            ${b.status === "Cancelled" && "bg-red-100 text-red-600"}
          `}>
            {b.status}
          </span>
        </td>

      </tr>
    )
  })}
</tbody>
      </table>
    </div>
  )
}

export default ManageBookings