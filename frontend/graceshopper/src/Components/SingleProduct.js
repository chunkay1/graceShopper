import { useState, useEffect } from 'react';
import styles from '../styles/Products.module.css'
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
          console.log('use Effect is', cart.itemsInCart)
          setItemsInCart(cart.itemsInCart)
          setCartID(cart.id)
          setCartChange(false)
        }
        getCartItemAsync();
      }, [token, cartChange])

    useEffect(() => {
        itemsInCart.filter((itemInCart) => {
            console.log(itemInCart)
            if (itemInCart.itemsId === id) {
                console.log(`id matched, itemsId ${itemInCart.itemsId} is equal to id ${id}`)
                setCartState(true)
                setCartItemQuantity(itemInCart.quantity)
                console.log(`cartItemQuantity is ${itemInCart.quantity}`)
            }
    
            return null
          })
    }, [itemsInCart, id])


    //   const itemFound = itemsInCart.filter((itemInCart) => {
        
    //     if (itemInCart.itemsId === id) {
    //         return itemInCart.quantity
    //     }

    //     return null
    //   })
    
    return(

        <>
            <h1>Woot woot</h1>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log(itemProps)
                }}
            >
                Props
            </button>

            <button onClick={async (e) => { 
                e.preventDefault();
                setCartState(false)
            }}> Cart State Test</button>

            <div key={id}>
        
                <div 
                    class={`card ${styles.productCard}`} 
                    style={{
                        width: "30rem",
                        backgroundColor: "#B7E4C7"
                    }}>
        
                    <img src={image} class="card-img-top" alt="..."/>
                                            
                    <div class="card-body">
                        <h5 class="card-title">Brand</h5>
                            <p class="card-text">{brand}</p>
                        <h5 class="card-title">Name</h5>
                            <p class="card-text">{name}</p>
                        <h5 class="card-title">size</h5>
                            <p class="card-text">{size}</p>
                        <h5 class="card-title">Category</h5>
                            <p class="card-text">{category}</p>
                        <h5 class="card-title">Description</h5>
                            <p class="card-text">{description}</p>
                        <h5 class="card-title">Price</h5>
                            <p class="card-text">${price}</p>
                        <h5 class="card-title">Inventory</h5>
                            <p class="card-text">{inventory}</p>
                        {/* <h5 class="card-title">Quantity</h5>
                            <p class="card-text">{quantity}</p> */}
                        
                                                
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

                            {/* <button
                                className={styles.cartButton}
                                onClick={async (event) => {
                                    event.preventDefault();
                                    console.log('added to cart');
                                    let test = await addToCart(id, token);
                                    console.log('single product added to cart', test);
                                    setCartState(true)
                                }}>
                                Add to Cart!
                            </button> */}

                            {
                                cartState && cartItemQuantity >= 1 

                                ?

                                <small class="text-muted">
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
                                    
                                    <div className={styles.quantity}>
                                        
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

                                :
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
                            }

                            

                            
                        </div>
                    </div>
        
                </div>
        
            </div>
        
        </>

    )
}

export default SingleProduct;