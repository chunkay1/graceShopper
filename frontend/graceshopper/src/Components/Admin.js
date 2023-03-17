//Admin
import React from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
// import { getAllItems } from "../api/itemRequests";
// import { getAllUsers } from '../api/users.js'

const Admin = ({ token }) => {

//   const [adminproducts, setAdminProducts] = useState([]);

  return (
    <>

      <h1 className={`${styles.title}`}>Admin</h1>

      {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
      {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
      {/* checking if user is admin, then show the add products button */}
    
    
       {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
       {/* checking if user is admin, then show the add products button */}      
    
    <div className={`${styles.subNav}`}>
        <Link to="/add-products">Add Products</Link>
    </div>

      {/* <button className={`btn btn-secondary ${styles.viewProductsButton}`} onClick={() => {console.log('View Products button clicked!')}}>View/Manage Products</button> */}
      {/* <button onClick={(e) => { 
                getAllUsers();
              }}>Get All Users</button>  */}
     </>
  )
}

export default Admin;
