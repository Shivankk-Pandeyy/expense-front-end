/* eslint-disable no-unused-vars */
import Header from "./Components/Header"
import Footer from './Components/Footer'
import './Dashboard.css'
import { Chart as ChartJs } from "chart.js/auto"
import { Bar,Doughnut,Line } from "react-chartjs-2"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
const Home = () => {
    const BASE_URL="https://expense-back-end.vercel.app/api/expense/";
    const {id}=useParams();
    const [saving,setSaving]=useState([]);
    const [expense,setExpense]=useState([]);
    const getUser=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}SingleUser/${id}`);
            setExpense(response.data.expenses);
            setSaving(response.data.saving);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getUser();
    },[]);
return (
    <>
    <Header/>
    <div className="D">
    <div className="D-header">
    <h2>Welcome to WOLF WALLET Dashboard</h2>
    <h2>Make the most of your income by organizing it.</h2>
    </div>
    <div className="D-dash">
    <div className="C1">
    <Bar data={{
        labels:["Jan","Feb","March","April","May","June","July","August","September","October","November","December"],
        datasets:[
            {
                label:"Spending",
                data:expense.map((val)=>val.amount)
            },
            {
                label:"Savings",
                data:saving.map((val)=>val.amount)
            }
        ]
    }}>
    </Bar>
    </div>
    <div className="C-holder">
    <div className="C2">
    <Doughnut data={{
        labels:["Jan","Feb","March","April","May","June","July","August","September","October","November","December"],
        datasets:[
            {
                label:"Spending",
                data:expense.map((val)=>val.amount)
            },
            {
                label:"Savings",
                data:saving.map((val)=>val.amount)
            }
        ]
    }}>
    </Doughnut>
    </div>
    <div className="C3">
    <Line data={{
        labels:["Jan","Feb","March","April","May","June","July","August","September","October","November","December"],
        datasets:[
            {
                label:"Spending",
                data:expense.map((val)=>val.amount)
            },
            {
                label:"Savings",
                data:saving.map((val)=>val.amount)
            }
        ]
    }}>
    </Line>
    </div>
    </div>
    </div>
    </div>
    <Footer/>
    </>
)
}
export default Home
