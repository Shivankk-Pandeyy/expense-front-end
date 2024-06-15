/* eslint-disable no-unused-vars */
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import './Component.css';
import LOGO from './LOGO.svg';
import axios from 'axios';
const Header = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const LOGOUT=async()=>{
        try{
            const response=await axios.get("https://expense-back-end.vercel.app/api/expense/Logout");
            //console.log(response);
            navigate("/Login");
        }
        catch(err){
            console.log(err);
        }
    }
return (
    <div className='header'>
        <div className="name-dark">
            <img src={LOGO} alt='Wolf Wallet LOGO' title='Wolf Wallet'></img>
        </div>
        <div className="links-dark">
            <NavLink to={`/DashBoard/${id}`}>DashBoard</NavLink>
            <NavLink to={`/MyWallet/${id}`}>Wallet</NavLink>
            <button onClick={LOGOUT}>LOGOUT</button>
        </div>
        </div>
)
}
export default Header