import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCart, deleteItemFromCart, updateCartQuantity, checkoutCart } from '../api/cartRequests';
import styles from '../styles/Cart.module.css'

const Cart = ({ token }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartID, setCartID] = useState(0);
  const [cartChange, setCartChange] = useState(false)
  const navigate = useNavigate();
  
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
  
  let totalCartPrice = (itemsInCart) => {
    let cartPrice = 0;
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
    <div className={styles.container}>
            
      <div class="py-5 text-center">

        {itemsInCart.length < 1 ?
          <>
            <h2>Your Cart Is Empty...For Now</h2>
            <p className={`lead`}>
              <a className={`lead nav-link text-black ${styles.productsLink}`} 
                href="products">Get Ready For Your Next Adventure Here!</a>
            </p>
          </>
        :
          <>
            <h2>You're almost ready to hit the great outdoors</h2>
            <p class="lead">Be sure you didn't miss anything!</p>
          </>
        }
        
      </div>

      <div className={`col md-5 justify-content-center`}>
        <div class="row justify-content-center">

          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span className={`text ${styles.cartLabel}`}>Your Cart</span>
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
                        <span className={`text-muted ${styles.price}`}>${price}</span>
                        <small class="text-muted">
                          <i 
                            className={`bi bi-trash3 ${styles.deleteIcon}`}
                            onClick={async (e) => {
                              e.preventDefault();
                              await deleteItemFromCart(itemsId, cartID, token)
                              setCartChange(true)
                            }}></i>
                          
                          <div className={styles.quantity}>
                            
                            { quantity <= 1
                              ?
                                null
                              :
                                <i 
                                className={`bi bi-dash ${styles.dashIcon}`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  let decrementQuantity = quantity - 1;
                                  await updateCartQuantity(itemsId, cartID, decrementQuantity, token)
                                  setCartChange(true)
                                }}></i>
                            }
                          
                            <p className={styles.count}>{quantity}</p>

                            { quantity < inventory 
                              ? 
                                <i 
                                className={`bi bi-plus ${styles.addIcon}`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  let incrementQuantity = quantity + 1;
                                  await updateCartQuantity(itemsId, cartID, incrementQuantity, token)
                                  setCartChange(true)
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
                <strong>${totalCartPrice(itemsInCart).toFixed(2)}</strong>
              </li>

            </ul>

          </div>

        </div>

        <div class="row justify-content-center">
          <div class="col-md-5 text-center">

            {itemsInCart.length > 0 ?
              <button 
                className={`${styles.button}`}
                onClick={async (event) => {
                  event.preventDefault();
                  await checkoutCart(cartID, token)
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