import React, { useState } from 'react'

import TitleBar from '../../componets/Owner/TitleBar';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../Context/AppContext';
import {toast} from 'react-hot-toast'

const AddVechicals = () => {

  const {axios}=useAppContext();




  const [image,setImage]=useState(null);
  const [vech,setVech]=useState({
    vechicalType:'',
    brand:'',
    model:'',
    year:0,
    pricePerDay:0,
    category:'',
    transmission:'',
    FuelType:'',
    seatingCapacity:0,
    location:'',
    description:'',
  })

  const [isLoading,setIsLoading]=useState(false)

  const onSubmitHandler=async (e)=>{
      e.preventDefault()
      if(isLoading) return null

      setIsLoading(true)
      try{
          const formData=new FormData()
          formData.append('image',image)
          formData.append('VechicalData',JSON.stringify(vech))

          const {data}=await axios.post('/api/owner/addVechical',formData)
          if(data.success)
          {
            toast.success(data.message)
            setImage(null)
            setVech({
              vechicalType:'',
              brand:'',
              model:'',
              year:0,
              pricePerDay:0,
              category:'',
              transmission:'',
              fuel_type:'',
              seating_capacity:0,
              location:'',
              description:'',
            })
            
          }
          else{
            toast.error(data.message)
          }
      }
      catch(error)
      {
          toast.error(error.message)
      }
      finally{
        setIsLoading(false);
      }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1 '>
      <TitleBar title='Add New Car' subtitle='Fill in details to list a new car for booking,including pricing, availability and car specification '/>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
          {/* car image */}
          <div className='flex items-center gap-2 w-full'>
            <label htmlFor='Vechical-image'>
              <img src={image?URL.createObjectURL(image):assets.upload_icon} className='h-14 rounded cursor-pointer'/>
              <input type="file" id='Vechical-image' accept='image/*' hidden onChange={(e)=>{
                setImage(e.target.files[0])
              }} />
            </label>
            <p className='text-sm text-gray-500'>upload picture of your car</p>
          </div>

           {/*brand and model  */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
              <div className='flex flex-col w-full'>
                <label>VechicalType</label>
                <input type='text' required placeholder='e.g. Car,bike,Auto' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.vechicalType} onChange={(e)=>{
                  setVech({...vech,vechicalType:e.target.value})
                }}/>

              </div>
            </div> */}
             <div className='flex flex-col w-full'>
                  <label htmlFor="VechicalType">Location</label>
                  <select value={vech.vechicalType} onChange={(e)=>{
                  setVech({...vech,vechicalType:e.target.value})
                }} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                   <option value="">Vechical Type</option>
                   <option value='Car'>Car</option>
                  <option value='Bike'>Bike</option>
                  <option value='Scooter'>Scooter</option>
                  <option value='Auto'>Auto</option>
                  </select>
            </div>






              {/*brand and model  */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
              <div className='flex flex-col w-full'>
                <label>Brand</label>
                <input type='text' required placeholder='e.g. BMW,Mercendes,Audi' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.brand} onChange={(e)=>{
                  setVech({...vech,brand:e.target.value})
                }}/>

              </div>
              
              <div className='flex flex-col w-full'>
                <label>Model</label>
                <input type='text' required placeholder='e.g X5,E-class etc' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.model} onChange={(e)=>{
                  setVech({...vech,model:e.target.value})
                }}/>

             
              </div>


              
            </div>

            {/* Car year,price,category */}
            <div className='grid grid-cols-1 sm:gridcols-2 md:grid-cols-3 gap-6'>
              <div className='flex flex-col w-full'>
                <label>Year</label>
                <input type='number' required placeholder='2025' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.year} onChange={(e)=>{
                  setVech({...vech,year:e.target.value})
                }}/>

              </div>

              <div className='flex flex-col w-full'>
                <label>Daily Price $</label>
                <input type='number' required placeholder='$100' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.pricePerDay} onChange={(e)=>{
                  setVech({...vech,pricePerDay:e.target.value})
                }}/>

              </div>

              <div className='flex flex-col w-full'>
                <label>Category</label>
                <select onChange={e=>setVech({...vech,category:e.target.value})} value={vech.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                 
                  <option value=''>Select a category</option>
                  <option value='Economy'>Economy</option>
                   <option value='Compact'>Compact</option>
                  <option value='Sedan'>Sedan</option>
                  <option value='SUV'>SUV</option>
                  <option value='Luxury'>Luxury</option>
                  <option value='Electric'>Electric</option>
                </select>
              </div>
            </div>
            {/* car transmission,fuel type,seating capacity */}

            <div className='grid grid-cols-1 sm:gridcols-2 md:grid-cols-3 gap-6'>
              <div className='flex flex-col w-full'>
                <label>Transmission</label>
                <select onChange={e=>setVech({...vech,transmission:e.target.value})} value={vech.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                 
                  
                  <option value=''>Select a transmission</option>
                  <option value='Automatic'>Automatic</option>
                  <option value='Manual'>Manual</option>
                  <option value='Electric'>Electric</option>
                </select>
              </div>

              <div className='flex flex-col w-full'>
                <label>Fuel type</label>
                <select onChange={e=>setVech({...vech,FuelType:e.target.value})} value={vech.FuelType} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                 
                 
                  <option value=''>Select FuelType</option>
                  <option value='Petrol'>Petrol</option>
                  <option value='Diesel'>Diesel</option>
                  <option value='Gas'>Gas</option>
                  <option value='Electric'>Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>


              <div className='flex flex-col w-full'>
                <label>Seating Capacity</label>
                <input type='number' required placeholder='4' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.seatingCapacity} onChange={(e)=>{
                  setVech({...vech,seatingCapacity:e.target.value})
                }}/>
              </div>
            </div>
                {/* car location */}
            <div className='flex flex-col w-full'>
                  <label htmlFor="location">Location</label>
                  <select onChange={e=>setVech({...vech,location:e.target.value})} value={vech.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                   <option value="">Select location</option>
                   <option value='Mumbai'>Mumbai</option>
                  <option value='Chennai'>Chennai</option>
                  <option value='Hyderabad'>Hyderabad</option>
                  <option value='Bangulore'>Bangulore</option>
                  </select>
            </div>

            {/* description */}
                <div className='flex flex-col w-full'>
                <label>Description</label>
                <textarea rows={5} placeholder='enter about car' required  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={vech.description} onChange={(e)=>{
                  setVech({...vech,description:e.target.value})
                }}></textarea>
              </div>

            {/* submition */}
            <button className='bg-[#2563EB] gap-2  text-white w-[200px] flex items-center justify-center text-lg h-10'>
              <img src={assets.tick_icon} alt="" />
              {isLoading? 'Listing...':'List your vechical'}
            </button>
            
        </form>
      
    </div>
  )
}

export default AddVechicals
