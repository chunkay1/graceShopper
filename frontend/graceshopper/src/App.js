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
  Register,
  LandingPage,
  Banner,
  AdminProducts,
  AddProducts
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

      <Routes>
        {/* <Route path='/' element={<NavBar />} /> */}
        <Route exact path='/' element={
          <LandingPage/>
          } 
        />
        <Route path='/register' element={
          <>
            <NavBar token={token}/>
            <Register token={token}/>
            </>
          } 
        />
        <Route path='/home' element={
          <>
            <NavBar token={token}/>
            <Banner/>
            <Home />
          </>
          } 
        />
        <Route path='/profile' element={
          <>
            <NavBar token={token}/> 
            <Profile />
          </>
          } 
        />
        <Route path='/cart' element={
          <>
            <NavBar token={token}/>
            <Cart />
          </>
          } 
        />
        <Route path='/checkout' element={
          <>
            <NavBar token={token}/>
            <Checkout />
          </>
          } 
        />
        <Route path='/order-confirmation' element={
          <>
            <NavBar token={token}/>
            <OrderConfirmation />
          </>
          } 
        />
        <Route path='/products' element={
          <>
            <NavBar token={token}/> 
            <Products token={token}/>
          </>
          } 
        />
      <Route path='/admin-products' element={
          <>
            <NavBar token={token}/> 
            <AdminProducts token={token}/>
          </>
          } 
        />

        <Route path='/add-products' element={
          <>
            <NavBar token={token}/> 
            <AddProducts 
              token={token}
            />
          </>
          } 
        />

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