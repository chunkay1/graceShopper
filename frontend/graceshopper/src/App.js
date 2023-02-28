import './App.css';
import LandingPage from './LandingPage';
// adding routes
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';

// NEW APP FUNCTION ---------------------
const App = () => {
  return (
    <Routes>
      
    </Routes>
  )
}

// ORIGINAL APP FUNCTION ----------------
// function App() {
//   return (
//     <div className="App">
//       <LandingPage/>
//     </div>
//   );
// }

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