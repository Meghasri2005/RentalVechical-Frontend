import React, { useEffect } from 'react'
import NavbarAdmin from '../../componets/Admin/NavbarAdmin'
import Sidebar from '../../componets/Admin/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'

const AdminLayout = () => {

  const { user, navigate } = useAppContext()
  const isAdmin = user?.role === "Admin"

  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [isAdmin])

  return (
    <div className='flex flex-col'>
        <NavbarAdmin />
        <div className='flex w-full'>
          <Sidebar/>
          <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout