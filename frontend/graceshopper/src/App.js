import LandingPage from './LandingPage';

import { Routes, Route } from 'react-router-dom';

import { 
  Home,
  Profile,
  Cart,
  Checkout,
  OrderConfirmation,
  Products,
  Navbar,
  Register
 } from './components';

const App = () => {
  return (
    <div>
      <h1>GraceShopper</h1>
      <Routes>
        <Route path='/' element={<Navbar />} />
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