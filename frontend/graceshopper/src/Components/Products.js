import React, { useEffect } from 'react';
import { useState } from 'react';
import { getAllItems } from '../api/itemRequests';
import styles from '../styles/Products.module.css'



const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsAsync = async () => {
            let products = await getAllItems();
            setProducts(products);
            console.log('products are', products)
        }
        getProductsAsync();
    }, [])
    
    return (
        <div>

            <h1>Products</h1>

            {/* <button 
                onClick={ (e) => {
                    getProductsAsync();
                }}>
                Click me twice
            </button> */}
            
            <br/>

            {/* <button 
                onClick={ (e) => {
                    products.map(({brand, category, id, name, price, size}) => {
                        return (
                            <div>
                                <h3>{brand}</h3>
                                <h3>{category}</h3>
                                <h3>{id}</h3>
                                <h3>{name}</h3>
                                <h3>{price}</h3>
                                <h3>{size}</h3>
                            </div>
                        )
                    
                    })
                }}>
                Click me Once?
            </button> */}


            <div className={styles.container}>

                
                {
                    products.map(({brand, category, id, name, price, size}) => {
                        return (
                            <div 
                                className={styles.productCard} 
                                key={id}>
                                    <h3 className={styles.header}>Brand: <p className={styles.cardValue}>{brand}</p></h3>
                                    <h3 className={styles.header}>Category: <p className={styles.cardValue}>{category}</p></h3>
                                    <h3 className={styles.header}>Id: <p className={styles.cardValue}>{id}</p></h3>
                                    <h3 className={styles.header}>Name: <p className={styles.cardValue}>{name}</p></h3>
                                    <h3 className={styles.header}>Price: <p className={styles.cardValue}>{price}</p></h3>
                                    <h3 className={styles.header}>Size: <p className={styles.cardValue}>{size}</p></h3>
                            </div>
                        )
                    
                    })
                }
            </div>

        </div>
        
    )
}

export default Products;