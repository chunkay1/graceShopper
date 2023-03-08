import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'
import { getAllItems, getProductsByCategory, getProductById } from '../api/itemRequests';
import { addToCart } from '../api/cartRequests';
import { setTargetValue } from '../constants/constants';
import SingleProduct from './SingleProduct';
import { STORAGE_KEY } from '../constants/constants';

// const jwt = require('jsonwebtoken')



const Products = ({token}) => {
    const [category, setCategory] = useState('');
    const [itemProps, setItemProps] = useState({});
    const [products, setProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(false);
    
    useEffect(() => {
        const getProductsByCategoryAsync = async () => {
            let allProducts = await getAllItems();
            let categoryItems = allProducts.filter(product => product.category === category)
            console.log(categoryItems)
            setProducts(categoryItems);
        }
        getProductsByCategoryAsync();
    }, [category])

    useEffect(() => {
        const getAllProductsAsync = async () => {
            let allProducts = await getAllItems();
            setProducts(allProducts);
            // console.log('products are', products)
        }
        getAllProductsAsync();
    }, [])
    
    let getCategoryItems = async (category)=> {
        await getProductsByCategory(category);
    } 

    let getItemProps = (brand, category, id, name, price, size) => {
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

            {/* tests adding to cart with some set info */}
            <button onClick={async (e) => { 
                const addedToCart = await addToCart(7, token)
                console.log(addedToCart)
            }}> add to cart test</button>


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
                            products.map(({brand, category, id, name, price, size, image}) => {
                                return (
                                    <div key={id}>
        
                                        <div 
                                            className={`card ${styles.productCard}`} 
                                            style={{
                                                width: "18rem",
                                                backgroundColor: "#B7E4C7"
                                            }}
                                            onClick={async (e) => {
                                                // console.log('brand is,', brand);
                                                // console.log('name is,', name);
                                                // console.log('price is,', price);
                                                const props = await getProductById(id);
                                                setItemProps(props)
                                                console.log(itemProps)
                                                setSingleProduct(true);
        
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
                                                            
                                                            // const { [id] : userId } = jwt.verify(token)
                                                            console.log("this is the id", id, "this is the token", token)
                                                             const something = await addToCart ( id, token )
                                                             console.log("this is something", something)
                                                            // let test = await addToCart(getItemProps(brand, category, id, name, price, size, image))
                                                                                                            
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
                    </div>
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
        
    )
}

export default Products;