//Admin
import React,{useState,useEffect} from "react";
// import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
import { getAllItems,getProductById } from "../api/itemRequests";
// import { getAllUsers } from '../api/users.js'
import AddProducts from "./AddProducts";

const Admin = ({ token,setSingleProduct }) => {

  const [adminproducts, setAdminProducts] = useState([]);

useEffect(() => {
    const getAllProductsAsync = async () => {
        let allProducts = await getAllItems();
        setAdminProducts(allProducts);
        // console.log('products are', products)
    }
    getAllProductsAsync();
}, [adminproducts])

  return (
    <>
        <header>
            <h2 className={`${styles.title}`}>Admin</h2>
        </header>


        <main>
            <div className={`${styles.subNav}`}>
                <h3>Add Product</h3>
                    <AddProducts products={adminproducts} setProducts={setAdminProducts} token={token} />
            </div>

            <div className={styles.container}>

            {adminproducts.map(({ brand, category, id, name, price, size, image, inventory }) => {
                return (
                    <div key={id}>
                        <div className={`card ${styles.productCard}`}
                            style={{width: "18rem",backgroundColor: "#B7E4C7"}}
                    // this is where you click the div and it takes you to the single product view
                        onClick={async (e) => {
                        // console.log('brand is,', brand);
                        // console.log('name is,', name);
                        // console.log('price is,', price);
                            const props = await getProductById(id);
                            setAdminProducts(props)
                            // setSingleProduct(true);
                    }}>

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
                )}
            )}

            </div>

        </main>
    
    </>
  );
};

export default Admin;
