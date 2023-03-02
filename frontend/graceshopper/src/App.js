import './styles/App.css';
import NavBar from './Components/NavBar1';
// import { Home } from './Components';
// import LandingPage from './LandingPage';
import Banner from './Components/Banner';


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
import { useState } from 'react';

const App = () => {
  const [bannerText, setBannerText] = useState('') 


  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Banner
        text = {bannerText}
      />

      <button onClick={() => setBannerText("Gear")}>Gear</button>
      <button onClick={() => setBannerText("Clothing")}>Clothing</button>
      <button onClick={() => setBannerText("Shoes")}>Shoes</button>
      <button onClick={() => setBannerText("Tents")}>Tents</button>
      
      
      <Routes>
        {/* <Route path='/' element={<NavBar />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        <Route path='/products' element={<Products />} />
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