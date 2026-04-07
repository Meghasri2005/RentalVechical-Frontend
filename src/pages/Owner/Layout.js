import React, { useEffect } from 'react'
import NavbarOwner from '../../componets/Owner/NavbarOwner'
import Sidebar from '../../componets/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'

const Layout = () => {

  const {isOwner,navigate}=useAppContext()

  useEffect(()=>{
    if(!isOwner)
    {
      navigate('/');
    }
  },[isOwner])
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex w-full'>
          <Sidebar/>
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout
