import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

const AdminDashboard = () => {

  const { axios } = useAppContext()
  const [stats, setStats] = useState({})

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats')
      console.log(data)
      if (data.success) {
        setStats(data.stats)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Admin Dashboard</h2>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white p-6 shadow rounded-lg'>
          <p className='text-gray-500'>Total Users</p>
          <h3 className='text-2xl font-bold'>{stats.users || 0}</h3>
        </div>

        <div className='bg-white p-6 shadow rounded-lg'>
          <p className='text-gray-500'>Total Agencies</p>
          <h3 className='text-2xl font-bold'>{stats.agencies || 0}</h3>
        </div>

        <div className='bg-white p-6 shadow rounded-lg'>
          <p className='text-gray-500'>Pending Vehicles</p>
          <h3 className='text-2xl font-bold'>{stats.pendingVehicles || 0}</h3>
        </div>

        <div className='bg-white p-6 shadow rounded-lg'>
          <p className='text-gray-500'>Total Bookings</p>
          <h3 className='text-2xl font-bold'>{stats.bookings || 0}</h3>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard