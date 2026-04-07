import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { assets } from '../assets/assets'
import Loader from '../componets/Loader'
import {useAppContext} from '../Context/AppContext'
import {toast} from 'react-hot-toast'

const VechicalDetails = () => {

  const {id}=useParams()

  const {vechs,axios,pickupDateTime,setPickupDateTime,returnDateTime,setReturnDateTime,user,setShowLogin}=useAppContext()
  const navigate=useNavigate();
  const [vech,setVech]=useState(null);
  useEffect(()=>{
    fetch(`/api/home/vechicals/${id}`)
      setVech(vechs.find(vech=>vech._id===id));

  },[vechs,id])

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (!user) {
    toast.error("Please login first to book a vehicle");
    navigate("/")
    setShowLogin(true);
    return;
    }
    try{
      const {data}=await axios.post('/api/Booking/create',{
        vech:id,
        pickupDateTime,
        returnDateTime
      })

      if(data.success)
      {
          toast.success(data.message);
          navigate('/bookings')
      }
      else{
         toast.error(data.message);
      }

    }
    catch(err)
    {
      toast.error(err.message);
    }

  }
  return vech ? (
        (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-300' >
      <div className='flex my-6 gap-2' onClick={()=>navigate(-1)}><img src={assets.arrow_icon} className="rotate-180 opacity-65" />Back to all cars</div>
      <div className='flex gap-6'>
        <div className='lg:col-span-2  w-full'>
          <img src={vech.image} className='w-[600px] h-[400px] rounded-md object-contain' />
          <div className='space-y-6'> 
              <div >
                <h1 className='text-3xl font-bold'>{vech.brand} {vech.model}</h1>
                <p>{vech.category} * {vech.year}</p>
            </div>
            <hr className="border-borderColor my-6 "/>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"> {[
              {icon:assets.users_icon, label:`${vech.seatingCapacity} Seats`},
              {icon:assets.fuel_icon, label:vech.FuelType},
              {icon:assets.car_icon, label:vech.transmission},
              {icon:assets.location_icon, label:vech.location}
            ].map(({icon,label})=><div key={label} className="flex items-center gap-2">
              <img src={icon} className="w-6 h-6"/>
              <p>{label}</p>
            </div>)}</div>

            {/* description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{vech.description}</p>
            </div>

            {/* Features */}

            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='Grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["360 Camera ","Bluetooth","GPS","Heated Seats","Raar view mirror"].map((item)=>
                    <li key={item} className="flex items-center text-gray-500">
                      <img src={assets.check_icon} className="w-4 h-4 mr-2"/>{item}
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        
          <form  onSubmit={handleSubmit} autoComplete="off" className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-5 text-gray-500 w-[400px]'>
            <div className='flex items-center justify-between text-2xl text-gray-800 font-semibold'><h2>${vech.pricePerDay}</h2><span className='text-base text-gray-400 font-normal'>per day</span></div>
            <hr className='border-borderColor my-6'/>
            <div className='flex flex-col gap-2'>
              <label htmlFor='pickup-date'>Pickup Date and Time</label>
              <input type="datetime-local" autoComplete="new-date"
                value={pickupDateTime} onChange={e=>setPickupDateTime(e.target.value)}
              className='border border-borderColor px-3 py-2 rounded-lg'required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='return-date'>Return Date and Time</label>
              <input type="datetime-local" autoComplete="new-date" value={returnDateTime} onChange={e=>setReturnDateTime(e.target.value)}
              className='border border-borderColor px-3 py-2 rounded-lg'required id='return-date' min={new Date().toISOString().split('T')[0]}/>
            </div>

            <button className='w-full bg-[#2563EB] px-6   hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer '>Book Now</button>

            <p className='text-center text-sm'>No credit card required to reserve</p>
          </form>
        
      </div>
    </div>
  )
  ):<Loader/>
}

export default  VechicalDetails
