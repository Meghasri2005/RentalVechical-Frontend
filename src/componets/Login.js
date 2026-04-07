import React from "react";
import {useAppContext} from '../Context/AppContext'
import { useState } from "react";
import {toast} from 'react-hot-toast'

const Login = () => {
   

    const {setShowLogin,axios,setToken,navigate,setUser}=useAppContext()
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] =useState("");
    const [password, setPassword] = useState("");


    const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setState("login");
    };
    const onSubmitHandler=async (e)=>{
        try{
            e.preventDefault();
            const {data}=await axios.post(`/api/user/${state}`,{name,email,password,phoneNumber})
            console.log(data);
            
            if(data.success)
            {
                navigate('/');
                setToken(data.token)
                localStorage.setItem('token',data.token)
                setShowLogin(false)
                toast.success(data.message)
                setUser(data.user)
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

    return (


        <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"onClick={() => {
                resetForm();
                setShowLogin(false);
            }}>

            <form autoComplete="off" className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white" onSubmit={onSubmitHandler}onClick={e=>e.stopPropagation()}>
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "signup" && (
                <>
                    <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your Name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#2563EB]" type="text" required />
                </div>
                <div className="w-full">
                    <p>PhoneNumber</p>
                    <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Enter your PhoneNumber" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#2563EB]"  required />
                </div>
                </>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your Email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#2563EB]" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#2563EB]" type="password" required />
            </div>
            {state === "signup" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-[#2563EB] cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("signup")} className="text-[#2563EB] cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "signup" ? "signup" : "login"}
            </button>
        </form>

        </div>
    );
};

export default Login;