
import Navbar from './componets/Navbar'

import { Routes, Route , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Vechicals from './pages/Vechicals';
import VechicalDetails from './pages/VechicalDetails';
import MyBookings from './pages/MyBookings';
import Footer from './pages/Footer';
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import AddVechicals from './pages/Owner/AddVechicals';
import ManageVechical from './pages/Owner/ManageVechical';
import ManageBookings from './pages/Owner/ManageBookings';
import AdminDashboard from './pages/Admin/AdminDashboard'
import Login from './componets/Login';
import {Toaster } from 'react-hot-toast';
import {useAppContext} from './Context/AppContext';
import {Navigate} from 'react-router-dom';
import { useEffect } from "react"
import ApproveVehicles from './pages/Admin/ApproveVehicles';
import ManageAgencies from './pages/Admin/ManageAgencies';
import ManageUserBookings from './pages/Admin/ManageUserBookings';
import ManageUsers from './pages/Admin/ManageUsers';
import PricingCategories from './pages/Admin/PricingCategories';
import AdminLayout from './pages/Admin/AdminLayout';
import Locations from "./pages/Locations"


const App = () => {
    const {showLogin,user}=useAppContext();
    const isOwner=useLocation().pathname.includes("dashboard");
    const location = useLocation()

        useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        }, [location.pathname])
  return (
   <>
   <Toaster/>
    {showLogin&& <Login />}
        
    {!isOwner && <Navbar />}

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Vechicals' element={<Vechicals />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/Vechical/:id' element={<VechicalDetails />} />
            <Route path='/bookings' element={<MyBookings />} />
            <Route path='/admin' element={user?.role === "Admin"? <AdminLayout/>: <Navigate to="/" /> }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="agencies" element={<ManageAgencies />} />
                <Route path="vehicles" element={<ApproveVehicles />} />
                <Route path="bookings" element={<ManageUserBookings />} />
                <Route path="pricing" element={<PricingCategories />} />
            </Route>

            <Route path='/owner' element={<Layout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='addVechical' element={<AddVechicals/>}/>
                <Route path='ownervechicals' element={<ManageVechical/>}/>
                <Route path='bookings' element={<ManageBookings/>}/>

            </Route>
        </Routes>
    {!isOwner && <Footer/>}
    </>
  )
}

export default App
