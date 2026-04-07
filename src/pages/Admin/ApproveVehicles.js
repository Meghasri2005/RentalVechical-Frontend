import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const ApproveVehicles = () => {

  const { axios } = useAppContext()
  const [vehicles, setVehicles] = useState([])

  const fetchVehicles = async () => {
    const { data } = await axios.get('/api/admin/pending-vehicles')
    console.log(data)
    if (data.success) setVehicles(data.vehicles)
  }

  const approveVehicle = async (vehicleId, status) => {
    const { data } = await axios.post('/api/admin/approve-vehicle', { vehicleId, status })
    if (data.success) {
      toast.success(data.message)
      fetchVehicles()
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Approve Vehicles</h2>

      <table className='w-full bg-white shadow rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-3 text-left'>Vehicle</th>
            <th className='p-3 text-left'>Price/Day</th>
            <th className='p-3 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v._id} className='border-t'>
              <td className='p-3'>{v.brand} {v.model}</td>
              
              <td className='p-3'>₹{v.pricePerDay}</td>
              <td className='flex gap-2'>
                <button
                  onClick={() => approveVehicle(v._id, "Approved")}
                  className='bg-green-500 text-white px-3 my-2 py-1 rounded'
                >
                  Approve
                </button>
                <button
                  onClick={() => approveVehicle(v._id, "Cancelled")}
                  className='bg-red-500 text-white px-3 my-2 py-1 rounded'
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ApproveVehicles