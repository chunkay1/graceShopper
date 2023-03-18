//Admin
import React,{useState} from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
import { getAllItems } from "../api/itemRequests";
// import { getAllUsers } from '../api/users.js'

const Admin = () => {

  const [adminproducts, setAdminProducts] = useState([]);

  // useEffect(() => {
  //     const getAllProductsAsync = async () => {
  //         let allProducts = await getAllItems();
  //         setAdminProducts(allProducts);
  //     }
  //     getAllProductsAsync();
  // }, [])

  return (
    <div>
      <header>
        <h1 className={`${styles.title}`}>Admin</h1>
      </header>

      <div className={`${styles.subNav}`}>
        <div className={`${styles.link}`}>
          <Link to="/add-products">Add Products</Link>
        </div>

        <button className={`${styles.getProducts}`}
          onClick={async (event) => {

            try {
              event.preventDefault();
              let getAdminProducts = await getAllItems();
              setAdminProducts(getAdminProducts);
            } catch (error) {
              console.log(error, "error fetching products");
            }}}
        >Get Products</button>

      <div className={`${styles.container}`}>

        {adminproducts.map(({ brand, category, id, name, price, size, image, inventory }) => {
          return (
            <div key={id}>
              <div className={`card ${styles.productCard}`}
                style={{ width: "18rem", backgroundColor: "#B7E4C7" }}>

                <img src={image} class="card-img-top" alt="..." />

                <div class="card-body">
                  <h5 class="card-title">Name</h5>
                  <p class="card-text">{name}</p>
                  <h5 class="card-title">Price</h5>
                  <p class="card-text">{price}</p>
                  <h5 class="card-title">Inventory</h5>
                  <p class="card-text">{inventory}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

export default Admin;