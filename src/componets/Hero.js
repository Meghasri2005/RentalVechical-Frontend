import React from 'react'
import { assets} from '../assets/assets'
import { useState ,useEffect} from 'react'
import {useAppContext} from '../Context/AppContext'




const Hero = () => {
    
    const [pickupLocation, setPickupLocation] = useState('')
    const [Vechs, setVechs] = useState([]);
    const [locations, setLocations] = useState([]);
    const {pickupDateTime,setPickupDateTime,returnDateTime,setReturnDateTime,navigate,axios}=useAppContext()
    const handleSearch=(e)=>{
        e.preventDefault();
        navigate('/Vechicals?pickupLocation='+pickupLocation+'&pickupDateTime='+pickupDateTime+'&returnDateTime='+returnDateTime)
    }

    useEffect(() => {
    axios.get("api/home/vechicals")
      .then(res => {
        console.log(res.data)
        setVechs(res.data);

        
        // Extract unique locations
        const uniqueLocations = [
            ...new Set(res.data.vechicals.map(vech => vech.location))
            ];


        setLocations(uniqueLocations);
      })
      .catch(err => console.log(err));
  }, []);

 

  return (
    <div className="\h-screen flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32  items-center justify-center gap-14 bg-[#F1F5F9] text-center" >
        <h1 className='text-4xl md:text-5xl font-semibold mt-8'>Vechicals on rent</h1>
        <form onSubmit={handleSearch} className=' flex h-13 flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full  max-w-400 md:max-w-200 bg-white shadow-[0px,8px,20px,rgba(0,0,0,0,1)]'> 
            <div className='w-full  flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
                <div className='flex flex-col items-start gap-1'>
                    <select required value={pickupLocation} onChange={e=>setPickupLocation(e.target.value)} >
                     <option value="">Pickup Location</option>
                     {locations.map((loc,index)=>(
                        <option value={loc} key={loc}>{loc}</option>
                     ))}
                    </select>
                    <p className='px-1 text-sm text-gray-500' >{pickupLocation ? ` ${pickupLocation}` : "Please Select location"}</p>
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label className='px-1 text-sm text-gray-500' >Select Pickup Date and Time</label>
                    <input type="datetime-local" autoComplete="new-date" value={pickupDateTime} onChange={e=>setPickupDateTime(e.target.value)}   min={new Date().toISOString().split('T')[0]} required className='cursor-pointer' />
                    
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label className='px-1 text-sm text-gray-500' >Select Return Date and Time</label>
                    <input type="datetime-local"autoComplete="new-date" value={returnDateTime} onChange={e=>setReturnDateTime(e.target.value)}min={new Date().toISOString().split('T')[0]} required className='cursor-pointer' />
                    
                </div>
                
            
            </div>
            <button className='flex items-center gap-2 px-7 py-3 max-sm:mt-4  bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white  rounded-full cursor-pointer' >
                    <img src={assets.search_icon} alt="search icon" className='brightness-600 ' />
                    Search
                    
                </button>
            
        </form>
        <div className='w-[1000px] max-h-74   my-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 '>
             <div className='brightness-600 bg-white rounded-full  object-cover w-[150px] h-[150px] flex items-center justify-center'  onClick={() => navigate("/Vechicals?type=Bike")}>
                <img src={assets.Bike} alt="search icon"  width="130px" height='130px'/>
             </div>
             <div className='brightness-600 bg-white rounded-full object-cover w-[150px] h-[150px] flex items-center justify-center'  onClick={() => navigate("/Vechicals?type=Auto")}>
                <img src={assets.Auto} alt="search icon"  width="100px" height='100px'/>
             </div>
             <div className='brightness-600 bg-white rounded-full object-cover w-[150px] h-[150px] flex items-center justify-center'  onClick={() => navigate("/Vechicals?type=Car")}>
                <img src={assets.Car} alt="search icon"  width="130px" height='130px'/>
             </div>
             <div className='brightness-600 bg-white rounded-full object-cover w-[150px] h-[150px] flex items-center justify-center'  onClick={() => navigate("/Vechicals?type=Scooter")}>
                <img src={assets.Scooty} alt="search icon"  width="130px" height='130px'/>
             </div>
             <div className='brightness-600 bg-white rounded-full object-cover w-[150px] h-[150px] flex items-center justify-center'  onClick={() => navigate("/locations")}>
                <img src={assets.Location} alt="search icon"  width="90px" height='90px'/>
             </div>
             
        </div>
    </div>
  )
}

export default Hero
