import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'
import { getAllItems, getProductsByCategory } from '../api/itemRequests';
import { addToCart } from '../api/cartRequests';
import { setTargetValue } from '../constants/constants';



const Products = ({token}) => {
    const [category, setCategory] = useState('');
    const [cartItemProps, setCartItemProps] = useState({});
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getProductsAsync = async () => {
            let allProducts = await getAllItems();
            let categoryItems = allProducts.filter(product => product.category === category)
            console.log(categoryItems)
            setProducts(categoryItems);
        }
        getProductsAsync();
    }, [category])

    useEffect(() => {
        const getProductsAsync = async () => {
            let products = await getAllItems();
            setProducts(products);
            // console.log('products are', products)
        }
        getProductsAsync();
    }, [])
    
    let getCategoryItems = async (category)=> {
        await getProductsByCategory(category);
    } 

    let getCartItemProps = (brand, category, id, name, price, size) => {
        console.log('props are', brand, category, id, name, price, size)
        setCartItemProps(
            {
               brand : brand,
               category : category,
               id : id,
               name : name,
               price : price,
               size : size,
            }
        )

        return cartItemProps
    }
    
    
    return (
        <div>

            <h1>Products</h1>
            
            <button onClick={(e) => { 
                window.location.reload();
            }}>View All Products</button>
            
            <button onClick={(e) => { 
                getCategoryItems('shoes');
                setCategory('shoes');

            }}>Shoes</button>
            
            <button onClick={(e) => { 
                // setTargetValue(setCategory)
                getCategoryItems('tents');
                setCategory('tents');
                }}>tents</button>
            
            <button onClick={(e) => { 
                setTargetValue(setCategory)
                getCategoryItems('Clothing');
                setCategory('Clothing');
            }}>Clothing</button>
            
            <button onClick={(e) => { 
                // setTargetValue(setCategory)
                getCategoryItems('Firepits and Grills');
                setCategory('Firepits and Grills');
            }}>Grills and firepits</button>


            <div className={styles.container}>

                
                {
                    products.map(({brand, category, id, name, price, size, image}) => {
                        return (
                            <div key={id}>

                                <div 
                                    class={`card ${styles.productCard}`} 
                                    style={{
                                        width: "18rem",
                                        backgroundColor: "#B7E4C7"
                                    }}>

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
                                                onClick={async (event) => {
                                                    event.preventDefault();
                                                    console.log('added to cart')
                                                    let test = await addToCart(getCartItemProps(brand, category, id, name, price, size, image))
                                                    console.log(test)
                                                                                                      
                                                    // getCartItemProps(brand, category, id, name, price, size, image).then((result) => {
                                                    //     console.log(result)
                                                    //     addToCart(result);
                                                    // }).catch((err) => {
                                                    //     console.log(err)
                                                    // });
                                                }}>
                                                Add to Cart!
                                            </button>
                                        </div>
                                    </div>

                                </div>

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