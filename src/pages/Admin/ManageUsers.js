import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const ManageUsers = () => {

  const { axios } = useAppContext()
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/admin/users')
    if (data.success) setUsers(data.users)
  }

  const toggleBlock = async (id) => {
    const { data } = await axios.post('/api/admin/block-user', { id })
    if (data.success) {
      toast.success(data.message)
      fetchUsers()
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Manage Users</h2>

      <table className='w-full bg-white shadow rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-3 text-left'>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className='border-t'>
              <td className='p-3'>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBlocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => toggleBlock(user._id)}
                  className='bg-red-500 text-white px-3 py-1 rounded'
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsers