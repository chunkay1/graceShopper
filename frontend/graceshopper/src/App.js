import './styles/App.css';
import NavBar from './Components/NavBar1';
import { useEffect, useState } from 'react';
// import { Home } from './Components';
// import LandingPage from './LandingPage';


import { Routes, Route } from 'react-router-dom';

import { 
  Home,
  Profile,
  Cart,
  Checkout,
  OrderConfirmation,
  Products,
  Register
 } from './Components';
import { STORAGE_KEY } from './constants/constants';

const App = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(`${STORAGE_KEY}`);

    if(token) {
      setToken(token)
    }
  }, [])

  return (
    <div>
      <nav>
        <NavBar 
          token={token}/>
      </nav>
      <h1>GraceShopper</h1>
      
      <Routes>
        {/* <Route path='/' element={<NavBar />} /> */}
        <Route path='/register' element={<Register token={token}/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        <Route path='/products' element={<Products token={token}/>} />
      </Routes>
    </div>
  )
}

export default App;

// routes needed
// not found
// home
// profile
// cart
// checkout
// order confirmation
// products (tier 1) 
    // each category (tier 2)
        // clothing
        // shoes
        // gear
        // accessories
// admin related:
    // admin home
    // admin view users
    // repurpose existing routes for:
        // carts
        // products