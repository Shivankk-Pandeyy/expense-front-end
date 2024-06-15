import {NavLink} from 'react-router-dom';
import './Component.css';
import LOGO from './LOGO.svg';
const Header = () => {
  return (
    <div className='header'>
        <div className="name-dark">
            <img src={LOGO} alt='Wolf Wallet LOGO' title='Wolf Wallet'></img>
        </div>
        <div className="links-dark">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/Login'>Login</NavLink>
            <NavLink to="/Signup">Signup</NavLink>
        </div>
        </div>
  )
}
export default Header