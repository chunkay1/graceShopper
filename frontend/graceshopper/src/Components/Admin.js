// Made from just Admin

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
// import { getAllUsers } from '../api/users.js'

const Admin = () => {
     
    return (
        <div>
            <h1>Admin</h1>
            <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button>
            <Link to={'/order-confirmation'}>
                <button className={`btn btn-secondary ${styles.viewProductsButton}`} onClick={() => {console.log('View Products button clicked!')}}>View/Manage Products</button>
            </Link>
            {/* <button onClick={(e) => { 
                getAllUsers();
                

            }}>Get All Users</button> */}
            
        </div>
        
    )
}

export default Admin;

// Made from Products Page ////////////////////////////////////////////////////