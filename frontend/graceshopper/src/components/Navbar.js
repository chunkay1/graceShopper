import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <h1>Navbar</h1>
            <nav>
                <Link to='/register'>Register</Link>
                <Link to='/home'>Home</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/cart'>Cart</Link>
                <Link to='/checkout'>Checkout</Link>
                <Link to='/order-confirmation'>Order Confirmation</Link>
                <Link to='/products'>Products</Link>
                {/* <Link to='/404'>Page Not Found</Link> */}
            </nav>
        </header>
    )
}

export default Navbar;