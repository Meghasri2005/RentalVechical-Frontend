import React from 'react'
import { assets } from '../assets/assets'
import Title from '../componets/Title'
import { useState,useEffect } from 'react'
import VechCard from '../componets/VechCard'
import { useSearchParams } from 'react-router-dom'
import {useAppContext} from '../Context/AppContext'
import {toast} from "react-hot-toast"

 
const Vechicals = () => {
  const [searchParams]=useSearchParams()

  const pickupLocation=searchParams.get('pickupLocation')
  const pickupDateTime=searchParams.get('pickupDateTime')
  const returnDateTime=searchParams.get('returnDateTime')
  const type = searchParams.get("type");
  const location = searchParams.get("location");

  const [input,setInput]=useState("");
  const {vechs,axios}=useAppContext()


  const isSearchData=pickupLocation&&pickupDateTime&&returnDateTime;
  const [filteredVechs,setFilteredVechs]=useState([])
  


const applyFilter = () => {

   console.log(vechs)
   let filtered = [...vechs];   // Start from all vehicles
    
    if(type){
      filtered = filtered.filter(
        (vech) => vech.vechicalType === type
      );
    }

    if(location){
      filtered = filtered.filter(
        (vech) => vech.location === location
      );
    }


    if (input !== "") {
      filtered = filtered.filter((vech) =>
        vech.brand.toLowerCase().includes(input.toLowerCase()) ||
        vech.model.toLowerCase().includes(input.toLowerCase()) ||
        vech.category.toLowerCase().includes(input.toLowerCase()) ||
        vech.transmission.toLowerCase().includes(input.toLowerCase()) ||
        vech.vechicalType.toLowerCase().includes(input.toLowerCase())||
        vech.location.toLowerCase().includes(input.toLowerCase())
      );
    }

    setFilteredVechs(filtered);
};


  const searchVechAvailability=async ()=>{
    try{
      console.log(pickupLocation,pickupDateTime,returnDateTime);
      const {data}=await axios.post('/api/home/available',{location:pickupLocation,pickupDateTime,returnDateTime})
      console.log(data)

      if(data.success)
      {
        setFilteredVechs(data.availableVechs);
        if(data.availableVechs.length===0)
        {
          toast('No vechicals are availiable')
        }
        return null
      }
    }
    catch(err)
    {
      toast.error(err.message)
    }

  }
  
  useEffect(() => {
    console.log(vechs)
  if (!isSearchData) {
    setFilteredVechs(vechs);
  }
}, [vechs]);
  

  useEffect(()=>{
    console.log(vechs)
    isSearchData && searchVechAvailability()
  },[pickupLocation, pickupDateTime, returnDateTime])

 

  useEffect(()=>{
    console.log(vechs)
    vechs.length>0 && !isSearchData && applyFilter()
  },[input, vechs, isSearchData,type])
  return (
    <>
     <div className='flex flex-col items-center py-20 bg-[#F1F5F9] max-md:px-4'>
        <Title title="Available Vechs" subtitle="Browse our selection of premium vehicles for your next adventure" />
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-[800px] h-12 rounded-full shadow'>
            <img src={assets.search_icon} alt="search icon" className='w-4.5 h-4.5 mr-2'/>
            <input type='text' value={input} placeholder='Search by make,model or feature' className='w-full  h-full text-gray-500  outline-none' onChange={(e)=>setInput(e.target.value)} />
            <img src={assets.filter_icon} alt="filter icon"  className='w-4.5 h-4.5 mr-2'/>
        </div>
     </div>


     <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
          <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>{filteredVechs.length} {type} available</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>{filteredVechs.map((vech, index) => {
            return <div key={index}>
              <VechCard vech={vech} />

            </div>
            
          })}
          </div>
     </div>
    </>
  )
}

export default Vechicals
