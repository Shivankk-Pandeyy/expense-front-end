/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Wallet = () => {
    const BASE_URL="http://localhost:1818/api/expense/";
    const A1=()=>toast.warning("All fields are mandatory!");
    const A2=()=>toast.error("Invalid Month!");
    const A3=()=>toast.success("EXPENSES ADDED!");
    const A4=()=>toast.success("SAVINGS ADDED!");
    const A5=()=>toast.success("RECORD DELETED!");
    const {id}=useParams();
    const [exp,setEXP]=useState([]);
    const [sav,setSAV]=useState([]);
    var countSaving=0;
    var countExpense=0;
    const getUser=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}SingleUser/${id}`);
            setEXP(response.data.expenses);
            setSAV(response.data.saving);
        }
        catch(err){
            console.log(err);
        }
    }
    const [month,setMonth]=useState('');
    const [spend,setSpend]=useState({
        month:"",
        title:"",
        amount:"",
    })
    const setSpendData=(e)=>{
        const {name,value}=e.target;
        setSpend({
            ...spend,
            [name]:value
        });
    }
    const [save,setSave]=useState({
        month:"",
        title:"",
        amount:"",
    })
    const setSaveData=(e)=>{
        const {name,value}=e.target;
        setSave({
            ...save,
            [name]:value,
        });
    }
    const submitExpense=async()=>{
        if(spend.amount===""||spend.title===""){
            return A1();
        }
        else if(spend.month==="none"||spend.month===""){
            return A2();
        }
        else{
            try{
                const response=await axios.put(`${BASE_URL}AddExpense/${id}`,spend);
                setSpend({
                    month:month,
                    title:"",
                    amount:""
                })
                return A3();
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const submitSaving=async()=>{
        if(save.amount===""||save.title===""){
            return A1();
        }
        else if(save.month==="none"||save.month===""){
            return A2();
        }
        else{
            try{
                const response=await axios.post(`${BASE_URL}AddSaving/${id}`,save);
                setSave({
                    month:month,
                    title:"",
                    amount:""
                })
                return A4();
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const deleteExpense=async(m,t,a)=>{
        try{
            const response=await axios.put(`${BASE_URL}DeleteExpense/${id}`,m,t,a);
            return A5();
        }
        catch(err){
            console.log(err);
        }
    }
    const deleteSaving=async(m,t,a)=>{
        try{
            const response=await axios.put(`${BASE_URL}DeleteSaving/${id}`,m,t,a);
            return A5();
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getUser();
    },[deleteExpense,deleteSaving]);
return (
    <>
    <ToastContainer/>
    <Header/>
    <div className="D-header">
    <h2>Welcome to WOLF WALLET Dashboard</h2>
    <select name="MONTH" onChange={(e)=>
        {
        setSpend({...spend,month:e.target.value});
        setSave({...save,month:e.target.value});
        setMonth(e.target.value);
    }}>
    <option value="none" name="month">Choose a month</option>
    <option value="january" name="month">January</option>
    <option value="february" name="month">Feb</option>
    <option value="march" name="month">March</option>
    <option value="april" name="month">April</option>
    <option value="may" name="month">May</option>
    <option value="june" name="month">June</option>
    <option value="july" name="month">July</option>
    <option value="august" name="month">August</option>
    <option value="september" name="month">Sept</option>
    <option value="october" name="month">October</option>
    <option value="november" name="month">November</option>
    <option value="december" name="month">December</option>
    </select>
    <h2>Make the most of your income by organizing it.</h2>
    </div>
    <div className="wallet">
    <div className="W1">
    <h2>{month}</h2>
    <h2>ENTER DETAILS</h2>
    <div className="W-wallet">
    <h2>ADD EXPENSE</h2>
    <input type="text" placeholder="ENTER TITLE" autoComplete="off" name="title" onChange={setSpendData} value={spend.title}></input>
    <input type="number" placeholder="ENTER EXPENSE" autoComplete="off" name="amount" onChange={setSpendData} value={spend.amount}></input>
    <button onClick={submitExpense}>SAVE</button>
    </div>
    <div className="W-wallet">
    <h2>ADD SAVING</h2>
    <input type="text" placeholder="ENTER TITLE" autoComplete="off" name="title" onChange={setSaveData} value={save.title}></input>
    <input type="number" placeholder="ENTER SAVING" autoComplete="off" name="amount" onChange={setSaveData} value={save.amount}></input>
    <button onClick={submitSaving}>SAVE</button>
    </div>
    {
        exp.map((val)=>{
            if(val.month===month){
                countExpense+=parseInt(val.amount);
            }
        })
    }
    {
        sav.map((val)=>{
            if(val.month===month){
                countSaving+=parseInt(val.amount);
            }
        })
    }
    <h2>EXPENSES FOR THE MONTH: <span className="red">₹{countExpense}</span></h2>
    <h2>SAVINGS FOR THE MONTH: <span className="green">₹{countSaving}</span></h2>
    </div>
    <div className="W2">
    {
        exp.map((val)=>{
            if(val.month===month){
                return(
                    <>
                    <div className="W-cart-spend" key={val._id}>
                    <h2>{val.title}</h2>
                    <h2>- ₹{val.amount}</h2>
                    <button onClick={(e)=>deleteExpense(val.month,val.title,val.amount)}>DELETE</button>
                    </div>
                    </>
                )
            }
        })
    } 
    {
            sav.map((val)=>{
                if(val.month===month){
                return(
                <>
                <div className="W-cart-save" key={val._id}>
                <h2>{val.title}</h2>
                <h2>+₹{val.amount}</h2>
                <button onClick={(e)=>deleteSaving(val.month,val.title,val.amount)}>DELETE</button>
                </div>
                </>
                )
                }
                }) 
    }
    </div>
    </div>
    <Footer/>
    </>
)
}
export default Wallet
