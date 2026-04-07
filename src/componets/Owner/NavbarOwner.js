import React from 'react'
import TitleBar from './TitleBar'
import { assets, } from '../../assets/assets'
import { Link } from 'react-router-dom'
import {useAppContext} from '../../Context/AppContext'

const NavbarOwner = () => {
  const {user}=useAppContext();
  return (
    <div className='flex flex-col items-start jsutify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
     
      <p>Welcome,{ user?.name||"Owner" }</p>
    </div>
  )
}

export default NavbarOwner
