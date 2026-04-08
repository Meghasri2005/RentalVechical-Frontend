import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {useAppContext} from '../Context/AppContext'
import {toast} from 'react-hot-toast'
const Navbar = () => {
    const {setShowLogin,user,logout,isOwner,axios,setIsOwner}=useAppContext()
    const location=useLocation();
    const [open,setOpen]=React.useState(false);
    const navigate=useNavigate();

    const changeRole=async()=>{
        if(user?.role === "Admin"){
        toast.error("Admin cannot become Owner")
        return
        }
        try{
            const {data}=await axios.post('/api/user/rolechange')
            
            console.log(data)
            if(data.success)
            {
                setIsOwner(true);
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }

        }
        catch(err)
        {
                toast.error("You need to Login")
        }
    }



  return (
    <div className={` flex  relative  ${location.pathname==="/"?"bg-[#F1F5F9]":"bg-white"} items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-[#c4c7d2] relative transition-all duration-300`}>
      <Link to="/">
      <img src={assets.VechTake} alt="logo" className='logo  absolute top-[-60px] h-[12rem] w-[14rem]' /></Link>
        <div className={`flex flex-col  max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname==="/"?"bg-[#F1F5F9]":"bg-white"} ${open?"max-sm:translate-x-0":"max-sm:translate-x-full"}`}>
            <Link to="/">Home</Link>
            <Link to="/Vechicals">Vechicals</Link>
            <Link to="/bookings">Bookings</Link>
            <div className='hidden lg:flex items-center gap-2 text-sm border border-[#c4c7d2]rounded-full  px-3 max-w-56'>
                <input type="text" placeholder='Search' className='py-1.5 w-full bg-transparent focus:outline-none placeholder-gray-500' />
                <img src={assets.search_icon} alt="search icon" />
            </div>
            <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>

                {user?.role !== "Admin" && (
                        <button 
                            className='cursor-pointer' 
                            onClick={()=>{isOwner ? navigate('/owner'):changeRole()}}
                        >
                            {isOwner ? 'Dashboard':'ListCars'}
                        </button>
                        )}
                
                  {/* adding the button */}
                    {user?.role === "Admin" && (
                    <button 
                        className='cursor-pointer text-red-600 font-semibold'
                        onClick={()=>navigate('/admin')}
                    >
                        Admin Panel
                    </button>
                    )}
                
                    <button className='cursor-pointer  px-5  py-2 bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white rounded-lg ' onClick={()=>{user ? logout() : setShowLogin(true)}} >{user ?'Logout':'Login'}</button> 
                
            </div>
        </div>

        <button className='cursor-pointer sm:hidden' aria-label=" menu" onClick={()=>setOpen(!open)}>
            <img src={open? assets.close_icon:assets.menu_icon} alt="menu icon" className='h-6 w-6'/>
        </button>
    </div>
  )
}

export default Navbar
