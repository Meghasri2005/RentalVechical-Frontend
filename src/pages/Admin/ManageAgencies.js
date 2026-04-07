import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

const ManageAgencies = () => {

  const { axios } = useAppContext()
  const [agencies, setAgencies] = useState([])

  const fetchAgencies = async () => {
    const { data } = await axios.get('/api/admin/owners')
    console.log(data)
    if (data.success) setAgencies(data.agencies)
  }

  useEffect(() => {
    fetchAgencies()
  }, [])

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Manage Agencies</h2>

      <table className='w-full bg-white shadow rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-3 text-left'>Owner Name</th>
            <th className='p-3 text-left'>Total Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map(a => (
            <tr key={a._id} className='border-t'>
              <td className='p-3'>{a.name}</td>
              <td className='p-3'>{a.vehicleCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageAgencies