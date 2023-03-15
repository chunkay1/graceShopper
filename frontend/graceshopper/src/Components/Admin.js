//Admin 
import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
import { getAllItems} from '../api/itemRequests';
// import { getAllUsers } from '../api/users.js'
import { myProfile } from '../api/userRequests';
import AddProducts from "./AddProducts";
// const jwt = require('jsonwebtoken')


const Admin = ({token,setProducts }) => {

    const [admin, setAdmin] = useState('');
  
    useEffect(() => {
        const getProductsByCategoryAsync = async () => {
            const allProducts = await getAllItems();
            const categoryItems = allProducts.filter(product => product.category === category)
            console.log(categoryItems)
            setProducts(categoryItems);
        }
        getProductsByCategoryAsync();
    }, [category,setProducts])

    useEffect(() => {
        const getAllProductsAsync = async () => {
            let allProducts = await getAllItems();
            setProducts(allProducts);
            // console.log('products are', products)
        }
        getAllProductsAsync();
    }, [setProducts])

    // calling the AdminUser function
    const getAdmin = async () => {
      const admin = await myProfile();
      setAdmin (admin);

// const admin = await myProfile();

    const getItemProps = (brand, category, id, name, price, size) => {

        console.log('props are', brand, category, id, name, price, size)
        setItemProps(
            {
               brand : brand,
               category : category,
               id : id,
               name : name,
               price : price,
               size : size,
            }
        )
        return itemProps
    }

    getAdmin();
    console.log(admin);

    // const getItemProps = (brand, category, id, name, price, size) => {

    //     console.log('props are', brand, category, id, name, price, size)
    //     setItemProps(
    //         {
    //            brand : brand,
    //            category : category,
    //            id : id,
    //            name : name,
    //            price : price,
    //            size : size,
    //         }
    //     )
    //     return itemProps
    // }

    
    return (
        <div>

            <h1>Admin</h1>
            {/* <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button> */}
            {/* checking if user is admin, then show the add products button */}
            {/* {admin ? 

            <button onClick={(e) => { 
                e.preventDefault();
                
                <AddProducts setProducts={setProducts} token={token} />

            }}>Add Products</button> 
            : null} */}
            
            <button onClick={(e) => { 
                window.location.reload();
            }}>View All Products</button>

            {/* <button className={`btn btn-secondary ${styles.viewProductsButton}`} onClick={() => {console.log('View Products button clicked!')}}>View/Manage Products</button> */}
            {/* <button onClick={(e) => { 
                getAllUsers();
              }}>Get All Users</button>  */}

         </div>
    
    )
}

export default Admin;
