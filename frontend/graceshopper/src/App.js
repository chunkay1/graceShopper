import './styles/App.css';
import NavBar from './Components/NavBar1';
import React, { useEffect, useState } from 'react';

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
  Admin,
  AddProducts
 } from './Components';
import { STORAGE_KEY } from './constants/constants';

const App = () => {
  const [token, setToken] = useState('')

  //moved upstream from products.js so that it can be set and linked to from the homepage carousels
  const [singleProduct, setSingleProduct] = useState(false);
  const [itemProps, setItemProps] = useState({});
  const [category, setCategory] = useState('');
  
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
            <Home 
              setSingleProduct = {setSingleProduct}
              setItemProps = {setItemProps}
              setCategory = {setCategory}
            />
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
            <Cart token={token} />
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
            <Products 
            token={token}
            itemProps = {itemProps}
            setItemProps = {setItemProps}
            singleProduct = {singleProduct}
            setSingleProduct = {setSingleProduct}
            category = {category}
            setCategory = {setCategory}
            />
          </>
          } 
        />
        
        <Route path='/admin' element={
          <>
            <NavBar token={token}/> 
            <Admin token={token}/>
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