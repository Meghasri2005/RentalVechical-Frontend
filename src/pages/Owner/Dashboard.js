import React from 'react'
import TitleBar from '../../componets/Owner/TitleBar';
import { assets} from '../../assets/assets';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../../Context/AppContext';
import {toast} from 'react-hot-toast'

const Dashboard = () => {

  const {axios,isOwner}=useAppContext();


  const [data,setData]=useState({
    totalVechicals:0,
    totalCars:0,
    totalBikes:0,
    totalAutos:0,
    totalScooters:0,
    totalBookings:0,
    pendingBooking:0,
    completedBooking:0,
    recentBookings:[],
    monthlyRevenue:0,
  });

  const dashboardCards=[
    {title:"Total Vechicals",value:data.totalVechicals,icon:assets.carIconColored},
    {title:"Total Cars",value:data.totalCars,icon:assets.Minicar},
    {title:"Total Bikes",value:data.totalBikes,icon:assets.MotorBike},
    {title:"Total Autos",value:data.totalAutos,icon:assets.AutoRickshaw},
    {title:"Total Scooters",value:data.totalScooters,icon:assets.ScootyBike},

    {title:"Total Bookings",value:data.totalBookings,icon:assets.listIconColored},
    {title:"pending ",value:data.pendingBooking,icon:assets.cautionIconColored},
    {title:"Confirmed",value:data.completedBooking,icon:assets.listIconColored},
  ]

  const fetchDashboardData=async ()=>{

    try{
      const {data}=await axios.get('/api/owner/dashboard')
      if(data.success)
      {
        setData(data.dashboardData)
        
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err)
    {
      toast.error(err.message)
    }

  }


  useEffect(()=>{
    if(isOwner)
    {
      fetchDashboardData()
    }
  },[]);



  return (
    <div className='px-4 pt-10 md:px-10 flex-l'>
      <TitleBar title="Admin Dashboard" subtitle="Monitor overall platform performance including total cars,bookings,revenue,and recent activities"/>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
          {
            dashboardCards.map((card,index)=>(
              <div key={index} className='flex gap-2 w-full items-center justify-between p-4 rounded-md border border-borderColor'>
                    <div>
                          <h1 className='text-xs text-gray-500 '>{card.title}</h1>
                          <p className='text-lg font-semibold'>{card.value}</p>
                    </div>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-[#d1dbf1]'>
                          <img src={card.icon} alt="" className='h-6 w-6'/>

                    </div>
              </div>
            ))
          }
      </div>

      <div className='flex gap-4'>
            {/* recent bookings */}
            <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
                <h1 className='text-lg font-medium'>Recent Bookings</h1>
                <p className='text-gray-500'>Latest customer bookings</p>
                {data.recentBookings?.map((booking,index)=>(
                  <div key={index} className='mt-4 flex items-center justify-between '>
                    <div className='flex items-center gap-2'>
                        <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#d1dbf1] '>
                          <img src={assets.listIconColored} alt=""  className='h-5 w-5'/>
                        </div>
                        <div>
                          <p>
                            {booking.Vechical?.brand || "Unknown"} {booking.Vechical?.model || ""}
                          </p>
                          
                          <p className='text-sm text-grey-500'>{booking.createdAt?.split('T')[0]}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 font-medium '>
                        <p className='text-sm text-gray-500'>{booking.price}</p>
                        <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>${booking.status}</p>
                    </div>
                  </div>

                ))}
            </div>
            {/*  monthly revenue*/}
            <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
                <h1 className='text-lg font-medium'>Monthly Revenue</h1>
                <p className='text-gray-500'>Revenue for current month</p>
                <p className='text-3xl mt-6 font-semibold text-[#2563EB]'>${data.monthlyRevenue}</p>
            </div>

      </div>
    </div>

    
  )
}

export default Dashboard
