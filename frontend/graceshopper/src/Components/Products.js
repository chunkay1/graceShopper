import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'
import { getAllItems, getProductsByCategory, getProductById } from '../api/itemRequests';
import { myProfile } from '../api/userRequests';
import { addToCart, getOrderHistory } from '../api/cartRequests';
import { setTargetValue } from '../constants/constants';
import SingleProduct from './SingleProduct';

const Products = ({token, singleProduct, setSingleProduct, itemProps, setItemProps}) => {
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
   
    
    useEffect(() => {
        const getProductsByCategoryAsync = async () => {
            let allProducts = await getAllItems();
            let categoryItems = allProducts.filter(product => product.category === category)
            // console.log(categoryItems)
            setProducts(categoryItems);
        }
        getProductsByCategoryAsync();
    }, [category])

    useEffect(() => {
        const getAllProductsAsync = async () => {
            let allProducts = await getAllItems();
            setProducts(allProducts);
            console.log('products are', allProducts)
        }
        getAllProductsAsync();
    }, [])
    
    let getCategoryItems = async (category)=> {
        await getProductsByCategory(category);
    } 
    
    
    return (
        <div>

            <h1>Products</h1>
            
            <button onClick={(e) => { 
                window.location.reload();
            }}>View All Products</button>
            
            <button onClick={(e) => { 
                getCategoryItems('Shoes');
                setCategory('Shoes');

            }}>Shoes</button>
            
            <button onClick={(e) => { 
                getCategoryItems('Tents');
                setCategory('Tents');
                }}>tents</button>
            
            <button onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('Clothing');
                setCategory('Clothing');
            }}>Clothing</button>
            
            <button onClick={(e) => { 
                getCategoryItems('Firepits and Grills');
                setCategory('Firepits and Grills');
            }}>Grills and firepits</button>

            {/* tests adding to cart with some set info */}
            <button onClick={async (e) => { 
                e.preventDefault();
                const orderHistory = await getOrderHistory(token)
                console.log(orderHistory)
            }}> Order History Test</button>

            <button onClick={async (e) => { 
                e.preventDefault();
                const user = await myProfile(token)
                console.log(user)
            }}> Admin Test</button>



            {
                singleProduct

                ?

                    <SingleProduct 
                        setSingleProduct={setSingleProduct}
                        setItemProps={setItemProps}
                        itemProps={itemProps}
                        token={token}
                        addToCart={addToCart}
                        getProductById={getProductById}
                    />

                :
                    <div className={styles.container}>
                        
                        {
                            products.map(({brand, category, id, name, price, size, image, inventory}) => {
                                return (
                                    <div key={id}>
        
                                        <div 
                                            className={`card ${styles.productCard}`} 
                                            style={{
                                                width: "18rem",
                                                backgroundColor: "#B7E4C7"
                                            }}
                                            // this is where you click the div and it takes you to the single product view
                                            onClick={async (e) => {
                                                const props = await getProductById(id);
                                                setItemProps(props)
                                                // console.log(itemProps)
                                                setSingleProduct(true);
        
                                            }}>
        
                                            <img src={image} class="card-img-top" alt="..."/>
                                            
                                            <div class="card-body">

                                                <h5 class="card-title">Name</h5>
                                                    <p class="card-text">{name}</p>
                                                <h5 class="card-title">Price</h5>
                                                    <p class="card-text">${price}</p>
                                                <h5 class="card-title">Inventory</h5>
                                                    <p class="card-text">{inventory}</p>
                                                
                                                { inventory < 1 ?  <h5>Sold Out!</h5> : null}

                                                { (inventory >= 1) && token ? 
                                                
                                                    <div className={styles.buttonDiv}> 
                                                        <button
                                                            className={styles.cartButton}
                                                            onClick={async (event) => {
                                                                event.preventDefault();
                                                                
                                                                setSingleProduct(false);  
                                                                const props = await getProductById(id);
                                                                setItemProps(props)
                                                                const something = await addToCart ( id, token )
                                                                console.log("this is something", something)
                                                            }}>
                                                            Add to Cart!
                                                        </button>
                                                    </div>

                                                :

                                                    null
                                                }

                                                
                                            </div>
        
                                        </div>
        
                                    </div>
        
                                )
                            
                            })
                        }
                    </div>
            }
            
         </div>
        
    )
}

export default Products;