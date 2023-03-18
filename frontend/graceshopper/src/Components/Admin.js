//Admin
import React from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
// import { getAllItems } from "../api/itemRequests";
// import { getAllUsers } from '../api/users.js'

const Admin = () => {

  // const [adminproducts, setAdminProducts] = useState([]);

  return (
      <div>
        <header>
          <h1 className={`${styles.title}`}>Admin</h1>
        </header>

        <div className={`${styles.subNav}`}>
          <div className={`${styles.link}`}>
            <Link to="/add-products">Add Products</Link>
          </div>
        </div>

        <img className={`${styles.img}`} alt='gif' src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjY0MDJjMWM5YzA2NmI5NjRkZWE3M2Y3YTBhNTUyZTJkMjE1MGNkZCZjdD1n/xUA7b4arnbo3THfzi0/giphy.gif'></img>
      
    </div>
  
  );
}

export default Admin;

