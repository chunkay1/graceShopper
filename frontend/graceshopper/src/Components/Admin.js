//Admin
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import styles from '../styles/Admin.module.css'
import { getAllItems } from "../api/itemRequests";
// import { getAllUsers } from '../api/users.js'
import { myProfile } from "../api/userRequests";
// const jwt = require('jsonwebtoken')

const Admin = ({ token }) => {
//   const [admin, setAdmin] = useState("");
  const [adminproducts, setAdminProducts] = useState([]);

  useEffect(() => {
    const getAllProductsAsync = async () => {
    let allProducts = await getAllItems();
    setAdminProducts(allProducts);
    }
    getAllProductsAsync();
}, [adminproducts])

  return (
    <>
      <h1>Admin</h1>
      {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
      {/* checking if user is admin, then show the add products button */}
      {/* {admin ? 

// const Admin = ({token,setProducts,itemProps,setItemProps }) => {

//     const [admin, setAdmin] = useState('');

    // useEffect(() => {
    //     const getProductsByCategoryAsync = async () => {
    //         const allProducts = await getAllItems();
    //         const categoryItems = allProducts.filter(product => product.category === category)
    //         console.log(categoryItems)
    //         setProducts(categoryItems);
    //     }
    //     getProductsByCategoryAsync();
    // }, [setProducts])

//     useEffect(() => {
//         const getAllProductsAsync = async () => {
//             let allProducts = await getAllItems();
//             setProducts(allProducts);
//             // console.log('products are', products)
//         }
//         getAllProductsAsync();
//     }, [setProducts])

//     // calling the AdminUser function
//     useEffect(() => {
//         if (token) {
//           myProfile(token)
//             .then((admin) => {
//               setAdmin(admin);
//             })
//             .catch((error) => {
//               console.log(`Failed to fetch admin`);
//             });
//         }
//       })
    
//     return (
//         <div>

//             <h1>Admin</h1>
//             {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
//             {/* checking if user is admin, then show the add products button */}
//             {/* {admin ? 

//             <button onClick={(e) => { 
//                 e.preventDefault();
                
//                 <AddProducts setProducts={setProducts} token={token} />

            }}>Add Products</button> 
            : null} */}

        
    
        <header>
      
        <Link to="/add-products">Add Products</Link>
    
        </header>

        <button
        onClick={(e) => {
          window.location.reload();
        }}
        >
        View All Products
        </button>

      {/* <button className={`btn btn-secondary ${styles.viewProductsButton}`} onClick={() => {console.log('View Products button clicked!')}}>View/Manage Products</button> */}
      {/* <button onClick={(e) => { 
                getAllUsers();
              }}>Get All Users</button>  */}
    </>
  );
};

export default Admin;
