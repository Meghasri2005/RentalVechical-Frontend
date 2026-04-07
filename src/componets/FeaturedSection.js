import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import VechCard from "./VechCard"
import { Navigate, useNavigate } from 'react-router-dom'
import {useAppContext} from "../Context/AppContext"

const FeaturedSection = () => {
    const navigate=useNavigate()

    const {vechs}=useAppContext()
  return (
    
      <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='my-8'> 
            <Title title={"Featured Vechicles"} subtitle={"Explore our handpicked selection of top-rated Vechicalss, ready to elevate your driving experience."} />
        </div>
        <div className='mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
            {
                vechs.slice(0,3).map((vech)=>{
                    return (
                        <div key={vech._id}>
                            <VechCard vech={vech} />
                        </div>
                    )
                })
            }
        </div>
        <button onClick={()=>{
            navigate("/Vechicals");
            
        }} className='flex my-6 rounded-lg bg-[#F1F5F9] border-1 py-3 px-6 gap-4 justify-center items-center' >
            Explore all vechicals <img src={assets.arrow_icon} alt="arrow right"   />
        </button>
      </div>
    
  )
}

export default FeaturedSection
