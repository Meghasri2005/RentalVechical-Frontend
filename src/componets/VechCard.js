import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const VechCard = ({vech}) => {
  const navigate=useNavigate();
  return (
    <div className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer' onClick={()=>{
      navigate(`/Vechical/${vech._id}`);
    }}>
      <div className='relative h-48 overflow-hidden'>
        <img src={vech.image} alt={vech.name} className='w-full h-48 object-contain group-hover:scale-105 transition-transform  duration-500' />
        {vech.isAvailable && <p className='absolute top-4 left-4 bg-[#2563EB] text-white text-xs px-2.5 py-1 rounded-full'> Available Now</p>}
        <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-3 rounded-lg'>
        <span className="font-semibold">${vech.pricePerDay}</span>
        <span className='text-sm text-white/80'>/day</span>
        </div>
      </div>
      <div className='p-4 sm:p-5' >
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='text-lg font-medium'>{vech.brand} {vech.model}</h3>
            <p className='text-muted-foreground text-sm'>{vech.category}*{vech.year}</p>
          
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.users_icon} alt=""  className='h-4 mr-2'/>
            <span>{vech.seatingCapacity} Seats</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.fuel_icon} alt=""  className='h-4 mr-2'/>
            <span>{vech.FuelType}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.carIcon} alt=""  className='h-4 mr-2'/>
            <span>{vech.transmission}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt=""  className='h-4 mr-2'/>
            <span>{vech.location}</span>
          </div>

      </div>
      

    </div>
    </div>
  )
}

export default VechCard

