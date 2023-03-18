import {React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myProfile } from '../api/userRequests';
import { getUserCart, deleteItemFromCart, updateCartQuantity, checkoutCart } from '../api/cartRequests';
import { cartHealth } from '../api/testRequests';
import styles from '../styles/Cart.module.css'

const Cart = ({ token }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartID, setCartID] = useState(0);
  const [cartChange, setCartChange] = useState(false)
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getCartItemsAsync = async () => {
  //     let cartItems = await getUserCart(token);
  //     console.log('use Effect is', cartItems.itemsInCart)
  //     setItemsInCart(cartItems.itemsInCart);
  //     setCartID(cartItems.id)
  //   }
  //   getCartItemsAsync();
  // }, [token])
  
  useEffect(() => {
    const getCartItemsAsync = async () => {
      let cartItems = await getUserCart(token);
      if (cartItems) {
        setItemsInCart(cartItems.itemsInCart);
        setCartID(cartItems.id)
      }

      setCartChange(false)
    }
    getCartItemsAsync();
  }, [token, cartChange])

  const toOrderConfirmationPage = () => {
    navigate('/order-confirmation', {
        state: {
            itemsInCart: { itemsInCart }
        }
    })
}
  
  let totalCartPrice = (itemsInCart) => {
    let cartPrice = 0;
    console.log(itemsInCart)
    for (let i = 0; i < itemsInCart.length; ++i) {
      let itemPrice = Number(itemsInCart[i].price);
      let quantity = itemsInCart[i].quantity
      let individualPrice = (itemPrice * quantity)
      cartPrice += individualPrice
    }
    return cartPrice
  }

  let numberOfItems = (itemsInCart) => itemsInCart.reduce(function (prev, next) {
    return prev + next.quantity; }, 0);


  return (
    <div>
      <h1>My Cart</h1>

      <button 
        onClick={async (event) => {
          event.preventDefault();
          //myProfile returns a #, which is the logged in users' ID#
          // let myID = await myProfile(token)
          console.log('cartId', cartID);
          
          await getUserCart(token);
          await cartHealth()
        }}>
        Get Cart Testing
      </button>
            
      <div class="py-5 text-center">

        {/* <img class="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}

        <h2>You're almost ready to hit the great outdoors</h2>

        <p class="lead">Be sure you didn't miss anything!</p>
        
      </div>

      <div className={`col md-5 justify-content-center`}>
        <div class="row justify-content-center">

          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span className={`text ${styles.cartLabel}`}>Your cart</span>
              <span className={`badge rounded-pill ${styles.countBadge}`}>{numberOfItems(itemsInCart)}</span>
            </h4>

            <ul class="list-group mb-3">

              {
                itemsInCart.map(({brand, name, size, price, itemsId, id, quantity, inventory}) => {
                  return(
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 class="my-0">{brand}</h6>
                        <small class="text-muted">{name}, Size: {size}</small>
                      </div>
                      
                      <div className={styles.priceAndIcons}>
                        <span class="text-muted">{price}</span>
                        <small class="text-muted">
                          <i 
                            className={`bi bi-trash3 ${styles.deleteIcon}`}
                            onClick={async (e) => {
                              e.preventDefault();
                              // console.log('delete item!')
                              let cart = await getUserCart(token)
                              
                              console.log('full cart is', cart)
                              //full cart is an object
                              // { 
                              //   id: carts.id, 
                              //   userId: carts.userId,
                              //   purchased: false, 
                              //   itemsInCart: [
                              //     {brand: items.brand, 
                              //     cartId: itemsInCart.cartId,
                              //     category:  items.category,
                              //     description: items.description,
                              //     id: itemsInCart.id?
                              //     image: items.image,
                              //     inventory: items.inventory,
                              //     itemsId: itemsInCart.itemsId,
                              //     name: items.name,
                              //     price: items.price,
                              //     quantity: itemsInCart.quantity
                              //     size: items.size}
                              //   ]
                              // }

                              //both arguments are needed in order to ensure we're deleting only that item, for that user in one specific cart and not that item across all carts.
                              
                              await deleteItemFromCart(itemsId, cartID, token)
                              setCartChange(true)
                            }}></i>
                          
                          <div className={styles.quantity}>
                            
                            { quantity <= 1
                              ?
                                null
                              :
                                <i 
                                class="bi bi-dash"
                                onClick={async (e) => {
                                  //the updateCartQuantity functions very similar to delete, it just takes a quantity as well. 
                                  e.preventDefault();
                                  let decrementQuantity = quantity - 1;
                                  console.log('itemId is', itemsId)
                                  console.log('arguments are', itemsId, cartID, decrementQuantity)
                                  let updatedCartItem = await updateCartQuantity(itemsId, cartID, decrementQuantity, token)
                                  setCartChange(true)
                                  console.log('updated cart item is:', updatedCartItem)
                                }}></i>
                            }
                          
                            <p className={styles.count}>{quantity}</p>

                            {quantity < inventory ? 
                              <i 
                              class="bi bi-plus"
                              onClick={async (e) => {
                                e.preventDefault();
                                let incrementQuantity = quantity + 1;
                                let updatedCartItem = await updateCartQuantity(itemsId, cartID, incrementQuantity, token)
                                setCartChange(true)
                                console.log('updated cart item is:', updatedCartItem)
                              }}></i>

                              :

                              null
                            }
                            
                          </div>

                          </small>
                            
                      </div>
                    </li>
                  )
                })
              }

              <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{totalCartPrice(itemsInCart).toFixed(2)}</strong>
              </li>

            </ul>

          </div>

        </div>

        <div class="row justify-content-center">
          <div class="col-md-5 text-center">

            {itemsInCart.length > 0 ?
              <button 
                // className={`${styles.button}`}
                className={`${styles.button}`}
                onClick={async (event) => {
                  event.preventDefault();
                  console.log(await checkoutCart(cartID, token))
                  navigate('/order-confirmation', {
                    state: {
                        orderedItems: { itemsInCart }
                    }
                })
                  
                }} >Checkout</button>
            
              :

              null
          }
            

          </div>
        </div>

      </div>
    
    </div>
  )
}

export default Cart;