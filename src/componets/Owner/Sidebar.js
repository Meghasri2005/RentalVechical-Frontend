import React from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const {user,axios,fetchUser}=useAppContext();
    const location=useLocation();
    const [image,setImage]=useState('')

    const updateImage=async()=>{
        try{
                const formData=new FormData();
                formData.append('image',image)

                const {data}=await axios.post('/api/user/upload',formData)
                if(data.success)
                {
                    fetchUser()
                    toast.success(data.message);
                    setImage('')
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
  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
        <div className='group relative'>
            <label htmlFor='image'>
                <img src={image?URL.createObjectURL(image):user?.image} alt="image"className='h-[100px]  w-[100px]  rounded-full  '/>
                <input type='file' id="image" accept='image/*' hidden onChange={e=>setImage(e.target.files[0])}/>
                <div className='absolute hidden top-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer w-full'>
                    <img src={assets.edit_icon} alt="" />
                     
                </div>
            </label>
        </div>
        {image&&(
            <button className='absolute top-0 right-0 flex p-2 gap-1 bg-[#2563EB/10] text-[#2563EB]cursor-pointer' onClick={updateImage}>Save <img src={assets.check_icon} width={13} alt='' /></button>
        )}
        <p>{user?.name}</p>
        

        <div className='w-full'>
            {ownerMenuLinks.map((link,index)=>(
                <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-10  ${link.path===location.pathname?'bg-[#d6dff1] text-[#2563EB]':'text-gray-600'}`}>
                    <img src={link.path===location.pathname?link.coloredIcon:link.icon} alt=""/>
                    <span className='max-md:hidden'>{link.name}</span>
                    <div className={`${link.path===location.pathname&&'bg-[#2563EB]'} w-1.5 h-10 rounded-l right-0 absolute`}></div>
                </NavLink>
            ))}
        </div>
      
    </div>
  )
}

export default Sidebar
