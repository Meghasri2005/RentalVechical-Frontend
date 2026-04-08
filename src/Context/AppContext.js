import {  createContext, useContext, useState } from "react";
import axios from 'axios';
import toast  from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'
  
axios.defaults.baseURL = "http://localhost:5000";

export const AppContext =createContext();

export const AppProvider=({children})=>{
    const navigate=useNavigate();
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [pickupDateTime,setPickupDateTime]=useState('')
    const [returnDateTime,setReturnDateTime]=useState('')
    const [vechs,setVechs]=useState([])


    useEffect(() => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}, [token])

    //Function to check if user is logged in 
    const fetchUser=async ()=>{
        try{
            const {data}=await axios.get('/api/user/data')
            if(data.success)
            {
                setUser(data.user)
                setIsOwner(data.user.role==='Owner')
            }
            else{
                navigate('/')
            }
        }
        catch(err)
        {
            toast.error(err.message)
        }
    }
    // useeffect to retrive form local storage

    useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken){
        setToken(storedToken)
    }
    fetchVechs()
},[])


    // function to fetch all cars form db
    const fetchVechs=async()=>{
        try{
            const {data}=await axios.get('/api/home/vechicals')
            if(data.success)
            {
                setVechs(data.vechicals)
                console.log(vechs)
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
    // Function to log out the user
    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        delete axios.defaults.headers.common['Authorization'];
        toast.success('you have been loged out')
    }

    // useffect to fetch user data when token is available
    useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken){
        setToken(storedToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        fetchUser()
        fetchVechs()
    }
},[])

    

    const value={
            navigate,axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,setShowLogin,logout,fetchVechs,vechs,setVechs,pickupDateTime,setPickupDateTime,returnDateTime,setReturnDateTime
    }

    return (<AppContext.Provider value={value}>
            {children}
    </AppContext.Provider>)
}

export const useAppContext=()=>{
    return useContext(AppContext)
}