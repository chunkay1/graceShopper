// import styles from '../styles/Products.module.css'
import React from 'react';
import { useState, useEffect } from 'react';
// import styles from '../styles/Products.module.css'
import styles from '../styles/SingleProduct.module.css'
import { getUserCart, deleteItemFromCart, updateCartQuantity} from '../api/cartRequests';

function SingleProduct({setSingleProduct, itemProps, setItemProps, token, addToCart, getProductById}) {
    const {image, category, id, name, price, size, brand, description, inventory} = itemProps;
    const [cartState, setCartState] = useState(false);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [cartItemQuantity, setCartItemQuantity] = useState(0);
    const [cartID, setCartID] = useState(0);
    const [cartChange, setCartChange] = useState(false)

    useEffect(() => {
        const getCartItemAsync = async () => {
          let cart = await getUserCart(token);
          console.log('useEffect cart is:', cart)
          if(!cart.itemsInCart) {
            setItemsInCart([])
            setCartID(null)
              
          } else {
            console.log('if (cart) success', cart.itemsInCart)
            setItemsInCart(cart.itemsInCart)
            setCartID(cart.id)
            setCartChange(false)
          }

        }
        getCartItemAsync();
      }, [token, cartChange])

    useEffect(() => {
        if(itemsInCart.length > 0) {
            itemsInCart.map((itemInCart) => {
                // console.log(itemInCart)
                if (itemInCart.itemsId === id) {
                    // console.log(`id matched, itemsId ${itemInCart.itemsId} is equal to id ${id}`)
                    setCartState(true)
                    setCartItemQuantity(itemInCart.quantity)
                    // console.log(`cartItemQuantity is ${itemInCart.quantity}`)
            }
                return null
              })
        } else {
            console.log('no items in cart')
        }
    }, [itemsInCart, id])
    
    return(
        <div>

            <div className={`container ${styles.productContainer}`}>
                <h5 class="display-5">{name}</h5>
                <div className={`row ${styles.productDiv}`}>

                    {/* this is a parent div */}
                    <div className={`col-xl-6 ${styles.imageDiv}`}>
                        <img src={image} className={`card-img-top ${styles.image}`} alt="..."/>
                    </div>

                    {/* this is the second parent div */}
                    <div className={`col-xl-6 justify-content-space-around ${styles.detailsDiv}`}>
                        
                        <div className={`row ${styles.detailRow}`}>

                            <div class="col xl-4">
                                <h5 class="card-title">Brand: </h5>
                                <p class="card-text">{brand}</p>
                            </div>

                            <div class="col xl-4">
                                <h5 class="card-title">Size: </h5>
                                <p class="card-text">{size}</p>
                            </div>

                            <div class="col xl-4">
                                <h5 class="card-title">Category: </h5>
                                <p class="card-text">{category}</p>
                            </div>

                        </div>

                        <div className={`row ${styles.detailRow}`}>

                            <div class="col xl-12">
                                <h5 class="card-title">Description: </h5>
                                <p class="card-text">{description}</p>
                            </div>

                        </div>

                        <div className={`row align-items-center ${styles.detailRow}`}>
                            
                            <div class="col xl-4">
                                <h5 class="card-title">Price: </h5>
                                <p class="card-text">${price}</p>
                            </div>

                            <div class="col xl-4">
                                <div className={styles.buttonDiv}> 

                                    <button
                                        className={styles.cartButton}
                                        onClick={async (e) => {
                                            const props = await getProductById(id);
                                            setItemProps(props)
                                            console.log(itemProps)
                                            setSingleProduct(false);
                                        }}>
                                        Return to Products
                                    </button>

                                    {
                                        cartState && cartItemQuantity >= 1 

                                        ?

                                        <div className={styles.cartControl}>
                                            
                                            <small className={`text-muted`}>
                                                <i 
                                                    className={`bi bi-trash3 ${styles.deleteIcon}`}
                                                    onClick={async (e) => {
                                                    e.preventDefault();
                                                    // console.log('delete item!')
                                                    await deleteItemFromCart(id, cartID, token)
                                                    setCartChange(true)
                                                    setCartState(false)
                                                    }}>
                                                </i>
                                                
                                                <div className={styles.quantityControl}>
                                                    
                                                    { cartItemQuantity <= 1
                                                    ?
                                                        null
                                                    :
                                                        <i 
                                                        class="bi bi-dash"
                                                        onClick={async (e) => {
                                                        
                                                        e.preventDefault();
                                                        let decrementQuantity = cartItemQuantity - 1;
                                                        console.log('itemId is', id)
                                                        console.log('arguments are', id, cartID, decrementQuantity)
                                                        let updatedCartItem = await updateCartQuantity(id, cartID, decrementQuantity, token)
                                                        setCartChange(true)
                                                        console.log('updated cart item is:', updatedCartItem)
                                                        }}></i>
                                                    }
                                                
                                                    <p className={styles.count}>{cartItemQuantity}</p>

                                                    {cartItemQuantity < inventory ? 
                                                    <i 
                                                    class="bi bi-plus"
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        let incrementQuantity = cartItemQuantity + 1;
                                                        let updatedCartItem = await updateCartQuantity(id, cartID, incrementQuantity, token)
                                                        setCartChange(true)
                                                        console.log('updated cart item is:', updatedCartItem)
                                                    }}></i>

                                                    : 

                                                    null
                                                    }
                                        
                                                </div>

                                            </small>
                                        </div>


                                        : (inventory >= 1) && token ?
                                        <button
                                        className={styles.cartButton}
                                        onClick={async (event) => {
                                            event.preventDefault();
                                            console.log('added to cart');
                                            await addToCart(id, token);
                                            // console.log('single product added to cart', test);
                                            setCartState(true)
                                            setCartChange(true)
                                        }}>
                                        Add to Cart!
                                        </button>

                                        :

                                        null
                                    }

                                </div>

                            </div>

                        </div>          

                    </div>
                    
                </div>

            </div>
        
        </div>
    )
}

export default SingleProduct;