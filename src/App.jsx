import {Routes,Route} from 'react-router-dom';
import Homepage from './Page/Homepage';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Home from './Dashboard/Home';
import Wallet from './Dashboard/Wallet';
const App = () => {
return (
    <Routes>
    <Route path='/' element=<Homepage/> /> 
    <Route path='/Login' element=<Login/> />
    <Route path='/Signup' element=<Signup/> />
    <Route path='/DashBoard/:id' element={<Home/>} />
    <Route path='/MyWallet/:id' element={<Wallet/>} />
    </Routes>
)
}
export default App