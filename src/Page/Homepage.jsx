import Footer from "./Component/Footer";
import Header from "./Component/Header";
import './Page.css'
import LOGO1 from './LOGO1.svg'
import HOME from './HOME.svg';
const Homepage=()=>{
    return(
        <>
        <Header/>
        <div className="homepage">
        <div className="homepage-1"> 
        <div className="homepage-title">
        <img src={LOGO1} alt="Wolf Wallet Logo"></img>
        <h2>WOLF WALLET</h2>
        </div>
        <h2>WOLF</h2>
        <h2>WALLET</h2>
        <div className="homepage-contact">
        <h2>FREE TO USE</h2>
        </div>
        <p>EST.2024</p>
        <p>Welcome to Wolf Wallet, your ultimate expense tracker designed to help you take charge of your finances with the precision and power of a wolf.</p>
        </div>
        <div className="homepage-2"> 
        <img src={HOME}></img>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Homepage;