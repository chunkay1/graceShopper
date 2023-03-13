//Admin 
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Admin.module.css'
// import styles from '../styles/Products.module.css'
import { getAllItems, getProductsByCategory, getProductById } from '../api/itemRequests';
// import { getAllUsers } from '../api/users.js'
import { myProfile } from '../api/userRequests';
import { addToCart } from '../api/cartRequests';
import { setTargetValue } from '../constants/constants';
import AddProducts from "./AddProducts";
// import SingleProduct from './SingleProduct';
// const jwt = require('jsonwebtoken')

const Admin = async ({token,category,setCategory,products,setProducts,itemProps,setItemProps,singleProduct,setSingleProduct }) => {
   
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
    
    const getCategoryItems = async (category)=> {
        await getProductsByCategory(category);
    } 

    // calling the AdminUser function
    const admin = await myProfile();

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

    
    return (
        <div>

            <h1>Products</h1>

            {/* checking if user is admin, then show the add products button */}
            {admin ? 
            <button onClick={(e) => { 
                e.preventDefault();
                
                <AddProducts products={products} setProducts={setProducts} token={token} />

            }}>Add Products</button> : null}
            
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

                    <singleProduct 
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
                                            // this is where you click the div and it takes you to the single product view
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
                                                {/* <h5 class="card-title">Brand</h5>
                                                    <p class="card-text">{brand}</p> */}
                                                <h5 class="card-title">Name</h5>
                                                    <p class="card-text">{name}</p>
                                                {/* <h5 class="card-title">size</h5>
                                                    <p class="card-text">{size}</p> */}
                                                {/* <h5 class="card-title">Category</h5>
                                                    <p class="card-text">{category}</p> */}
                                                <h5 class="card-title">Price</h5>
                                                    <p class="card-text">{price}</p>
                                                {/* <h5 class="card-title">Id</h5>
                                                    <p class="card-text">{id}</p> */}
                                                
                                                <div className={styles.buttonDiv}> 
                                                    <button
                                                        className={styles.cartButton}
                                                        onClick={async (event) => {
                                                            event.preventDefault();

                                                            console.log('added to cart')
                                                            let test = await addToCart(getItemProps(brand, category, id, name, price, size, image))
                                                            console.log(test);
                                                            // this prevents from going to single product view after clicking add to cart
                                                            const props = await getProductById(id);
                                                            setItemProps(props)
                                                            console.log(itemProps)
                                                            setSingleProduct(false);

                                                            
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



//     return (
//         <div>
//             <h1>Admin</h1>
//             <button className={`btn btn-info ${styles.viewUsersButton}`} onClick={() => {console.log('View Users button clicked!')}}>View/Manage Users</button>
//             <Link to={'/order-confirmation'}>
//                 <button className={`btn btn-secondary ${styles.viewProductsButton}`} onClick={() => {console.log('View Products button clicked!')}}>View/Manage Products</button>
//             </Link>
//             {/* <button onClick={(e) => { 
//                 getAllUsers();
                

//             }}>Get All Users</button> */}
            
//         </div>
        
//     )
// }


export default Admin;
