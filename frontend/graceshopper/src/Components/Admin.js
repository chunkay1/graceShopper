//Admin
import React from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'

const Admin = () => {

  return (
      <div className={styles.divContainer}>
        <header>
          <h1 className={`${styles.title}`}>Inventory Management</h1>
        </header>

        <div className={`${styles.subNav}`}>
          <div className={`${styles.link}`}>
            <Link to="/add-products">
              <button class={`btn btn-warning btn-lg ${styles.button}`}>Add Products</button>
              </Link>
          </div>
        </div>

        <img className={`${styles.img}`} alt='gif' src='https://vastphotos.com/files/uploads/photos/10519/forest-with-ferns-m.jpg?v=20220712073521'></img>
      
    </div>
  
  );
}

export default Admin;

