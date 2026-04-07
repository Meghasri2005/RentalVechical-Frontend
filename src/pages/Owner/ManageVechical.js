import React, { useEffect } from 'react'
import TitleBar from '../../componets/Owner/TitleBar'
import { assets, dummyCarData } from '../../assets/assets';
import { useState } from 'react';
import {useAppContext} from '../../Context/AppContext'
import {toast} from 'react-hot-toast'


const ManageVechical = () => {

  const {isOwner,axios}=useAppContext()

  const [vechs,setVechs]=useState([]);

  const fetchOwnerVechs=async()=>{
    try{
        const {data}=await axios.get('/api/owner/ownervechicals')
        console.log(data)
        if(data.success)
        {
          setVechs(data.OwnerVechicals);
          
        }
        else{
          toast.error(data.message)
        }
    }
    catch(err)
    {
        toast.error(err.message);
    }
  }

    const toggleAvailabilty=async(id)=>{
      try{
          const {data}=await axios.post(`/api/owner/toggleAvailiable/${id}`,{id})
          if(data.success)
          {
            toast.success(data.message)
            fetchOwnerVechs()
          }
          else{
            toast.error(data.message)
          }
      }
      catch(err)
      {
          toast.error(err.message);
      }
    }

    const deleteCar=async(id)=>{
      try{
          const confirm=window.confirm('Are you sure you want to delete this car?')
          if(!confirm)
          {
            return null
          }

          const {data}=await axios.post(`/api/owner/delete/${id}`,{id})
          if(data.success)
          {
            toast.success(data.message);
            fetchOwnerVechs()
          }
          else{
            toast.error(data.message)
          }
      }
      catch(err)
      {
          toast.error(err.message);
      }
    }





  useEffect(()=>{
    isOwner && fetchOwnerVechs()
  },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <TitleBar title='Manage Car' subtitle='View all listed cars,update their details, or remove them from the booking platform.'/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
              <thead className='text-gray-500'>
                <tr >
                  <th className='p-3 font-medium'>Vechicals</th>
                  <th className='p-3 font-medium max-md:hidden'>Vechical Type</th>
                  <th className='p-3 font-medium'>Price</th>
                  <th className='p-3 font-medium max-md:hidden'>Available</th>
                  <th className='p-3 font-medium max-md:hidden'>Status</th>
                  <th className='p-3 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vechs?.map((vech,index)=>(
                  <tr key={index} className='border-t border-borderColor'>
                    <td className='p-3 flex items-center gap-3'>
                      
                      <img src={vech.image} alt=""   className='w-[50px] h-[50px] rounded-md object-contain'/>
                      <div className='max-md:hidden'>
                        <p className='font-medium'>{vech.brand} {vech.model}</p>
                        <p className='font-medium'>{vech.seatingCapacity}*{vech.transmission}</p>


                      </div>
                    </td>
                    <td className='p-3 max-md:hidden'>{vech.vechicalType}</td>
                    <td className='p-3'>${vech.pricePerDay}/day</td>
                    <td className='p-3'><span className={`p-3 py-1 rounded-full text-sm ${vech.isAvailable?'bg-green-300':'bg-red-300'}`}>{vech.isAvailable? "Available":"Unavailable"}</span></td>
                    <td className='p-3'><span className={`p-3 py-1 rounded-full text-sm ${(vech.status==="Pending"||vech.status==="Cancelled")?'bg-yellow-300':'bg-green-300'}`}>{vech.status}</span></td>
                    <td className='flex items-center p-3'>

                        <img src={vech.isAvailable?assets.eye_close_icon:assets.eye_icon } alt='' className='cursor-pointer' onClick={()=>toggleAvailabilty(vech._id)}/>

                        <img src={assets.delete_icon} alt='' className='cursor-pointer' onClick={()=>deleteCar(vech._id)}/>

                    </td>

                  </tr>
                ))}
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default ManageVechical
