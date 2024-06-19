import { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import PIC from './LOGIN.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login=()=>{
        axios.defaults.withCredentials=true;
    const A1=()=>toast.warning("All Fields are Mandatory!");
    const A2=()=>toast.error("Invalid Password!");
    const A3=()=>toast.error("User doesn't exists!");
    const BASE_URL="https://expense-back-end.vercel.app/api/expense/";
    const navigate=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:"",
    });
    const setinfo=(e)=>{
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        });
    }
    const sendInfo=async(e)=>{
        e.preventDefault();
        if(data.email===""||data.password===""){
            return A1();
        }
        else{
            try{
                const response=await axios.post(`${BASE_URL}Login`,data);
                navigate(`/DashBoard/${response.data.id}`);
            }
            catch(err){
                if(err.response.data.message==="USERX"){
                    return A3();
                }
                else if(err.response.data.message==="PASSWORD"){
                    return A2();
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
        <img src={PIC} alt='LOGIN PAGE'></img>
        </div>
        <div className='login-2'>
        <h2>Wolf Wallet</h2>
        <p>Make the most of your income by organizing it.</p>
        <form onSubmit={sendInfo}>
        <input type='text' placeholder='Enter Email' autoComplete='off' name='email' onChange={setinfo}></input>
        <input type='password' placeholder='Enter Password' autoComplete='off' name='password' onChange={setinfo}></input>
        <button type='submit'>LOGIN</button>
        <NavLink to='/Signup'>Not yet on Wolf Wallet?</NavLink>
        </form>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Login;
