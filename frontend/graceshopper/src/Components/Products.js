import React, { useEffect } from 'react';
import { useState } from 'react';
import { getAllItems, getProductsByCategory } from '../api/itemRequests';
import styles from '../styles/Products.module.css'
import { setTargetValue } from '../constants/constants';



const Products = ({token}) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getProductsAsync = async () => {
            let products = await getAllItems();
            setProducts(products);
            console.log('products are', products)
        }
        getProductsAsync();
    }, [])

    let getCategoryItems = async (category)=> {
        await getProductsByCategory(category);
    } 
    
    
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
            
            <button onClick={(e) => { console.log('all')}}>View All Products</button>
            
            <button 
                
                onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('shoes');
                }}
            >
                    
                Shoes
                    
            </button>
            
            <button onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('tents');
                }}>tents</button>
            
            <button onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('Clothing');
            }}>Clothing</button>
            
            <button onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('Firepits and Grills');
            }}>Grills and firepits</button>


            <div className={styles.container}>

                
                {
                    products.map(({brand, category, id, name, price, size, image}) => {
                        return (
                            <div>

                                <div class={`card ${styles.productCard}`} style={{width: "18rem"}}>
                                    <img src={image} class="card-img-top" alt="..."/>
                                    
                                    <div class="card-body">
                                        <h5 class="card-title">Brand</h5>
                                            <p class="card-text">{brand}</p>
                                        <h5 class="card-title">Name</h5>
                                            <p class="card-text">{name}</p>
                                        {/* <h5 class="card-title">size</h5>
                                            <p class="card-text">{size}</p> */}
                                        <h5 class="card-title">Category</h5>
                                            <p class="card-text">{category}</p>
                                        {/* <h5 class="card-title">Id</h5>
                                            <p class="card-text">{id}</p> */}
                                        
                                        <div className={styles.buttonDiv}> 
                                            <button
                                                className={styles.cartButton}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    console.log('added to cart')
                                                }}>
                                                Add to Cart!
                                            </button>
                                        </div>
                                    </div>


                                </div>

                            {/* <div 
                                className={styles.productCard} 
                                key={id}>
                                    <img src = {image} alt = {'shoes png'} width = {"100%"} className = {styles.image}></img>
                                    <div className={styles.description}>
                                      <h3 className={styles.header}>Brand: <p className={styles.cardValue}>{brand}</p></h3>
                                      <h3 className={styles.header}>Category: <p className={styles.cardValue}>{category}</p></h3>
                                      <h3 className={styles.header}>Id: <p className={styles.cardValue}>{id}</p></h3>
                                      <h3 className={styles.header}>Name: <p className={styles.cardValue}>{name}</p></h3>
                                      <h3 className={styles.header}>Price: <p className={styles.cardValue}>{price}</p></h3>
                                      <h3 className={styles.header}>Size: <p className={styles.cardValue}>{size}</p></h3>
                                    </div>

                                    {
                                        (!token)

                                        ?

                                        null
                                        :

                                        <div className={styles.cartbutton}> 
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    console.log('added to cart')
                                                }}>
                                                Add to Cart!
                                            </button>
                                        </div>

                                    }
                            </div> */}
                            </div>

                        )
                    
                    })
                }
                {/* {
                    products.map(({brand, category, id, name, price, size, image}) => {
                        return (
                            <div 
                                className={styles.productCard} 
                                key={id}>
                                    <img src = {image} alt = {'shoes png'} width = {"100%"} className = {styles.image}></img>
                                    <div className={styles.description}>
                                      <h3 className={styles.header}>Brand: <p className={styles.cardValue}>{brand}</p></h3>
                                      <h3 className={styles.header}>Category: <p className={styles.cardValue}>{category}</p></h3>
                                      <h3 className={styles.header}>Id: <p className={styles.cardValue}>{id}</p></h3>
                                      <h3 className={styles.header}>Name: <p className={styles.cardValue}>{name}</p></h3>
                                      <h3 className={styles.header}>Price: <p className={styles.cardValue}>{price}</p></h3>
                                      <h3 className={styles.header}>Size: <p className={styles.cardValue}>{size}</p></h3>
                                    </div>

                                    {
                                        (!token)

                                        ?

                                        null
                                        :

                                        <div className={styles.cartbutton}> 
                                            <button
                                                onClick={console.log('Added To Cart!')}>
                                                Add to Cart!
                                            </button>
                                        </div>

                                    }
                            </div>
                        )
                    
                    })
                } */}
            </div>

        </div>
        
    )
}

export default Products;