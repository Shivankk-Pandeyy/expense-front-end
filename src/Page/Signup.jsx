import {NavLink, useNavigate} from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import PIC from './LOGIN.svg';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup=()=>{
    const A1=()=>toast.warning("All Fields are Mandatory!");
    const A2=()=>toast.error("Invalid Name!");
    const A3=()=>toast.error("Invalid Email!");
    const A4=()=>toast.error("User already Registered!");
    const navigate=useNavigate();
    const BASE_URL="http://localhost:1818/api/expense/";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex=/^[A-Za-z]/;
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    });
    const setData=(e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        });
    }
    const submitUser=async(e)=>{
        e.preventDefault();
        let email=emailRegex.test(user.email);
        let name=nameRegex.test(user.name);
        if(user.name===""||user.email===""||user.password===""){
            return A1();
        }
        if(!name){
            return A2();
        }
        if(!email){
            return A3();
        }
        else{
            try{
                const response=await axios.post(`${BASE_URL}Register`,user);
                setUser({
                    name:"",
                    email:"",
                    password:""
                });
                navigate(`/Dashboard/${response.data.id}`);
            }
            catch(err){
                if(err.response.data.message==="EMAIL"){
                    A4();
                    setUser({
                        ...user,
                        email:"",
                    })
                }
            }
        }
    }
    return(
        <>
        <ToastContainer/>
        <Header/>
        <div className='login'>
        <div className='login-1'>
        <img src={PIC} alt='SIGNUP PAGE'></img>
        </div>
        <div className='login-2'>
        <h2>Wolf Wallet</h2>
        <p>Make the most of your income by organizing it.</p>
        <form onSubmit={submitUser}>
        <input type='text' placeholder='Enter Name' autoComplete='off' name='name' onChange={setData} value={user.name}></input>
        <input type='text' placeholder='Enter Email' autoComplete='off' name='email' onChange={setData} value={user.email}></input>
        <input type='password' placeholder='Enter Password' autoComplete='off' name='password' onChange={setData} value={user.password}></input>
        <button type='submit'>SIGNUP</button>
        <NavLink to='/Login'>Already on Wolf Wallet?</NavLink>
        </form>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Signup;
