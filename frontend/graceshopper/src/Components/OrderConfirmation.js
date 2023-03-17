import React from 'react';
import styles from '../styles/OrderConfirmation.module.css'
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {

  let confirmationNumber =  Math.floor(Math.random() * 1000000);
  const location = useLocation();
  const orderItems = location.state.orderedItems.itemsInCart
     
    return (
        // bootstrap styling 
        <div className='container'>
        <div class={`order-confirmation-container ${styles.ordercontainer}`}>
            
            <h1 class={`h1-order-received ${styles.h1OrderReceived}`}>Your order has been received</h1>
            <img class={`img-checkmark ${styles.imgCheckmark}`} src='https://cdn-icons-png.flaticon.com/512/4436/4436481.png' alt='Green checkmark'/>
            <h1 class={`h1-thank-you ${styles.h1ThankYou}`}>Thank you for your purchase!</h1>
            <p class={`p-confirmation-num ${styles.pConfirmationNum}`}>Your order confirmation number is: {confirmationNumber}</p>
            
            {/* <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                console.log(orderItems)
              }}>Test</button> */}
            
            <div className={styles.detailsContainer}>
              {
                orderItems.map(({brand, category, name, quantity, size, price}) => {
                  return (
                    <div className={styles.orderDiv}>
                      <span className={styles.orderItem}>
                          <h6 className={styles.itemHeader}>Brand: </h6>
                            <p className={styles.itemContent}>{brand}</p>

                          <h6 className={styles.itemHeader}>Name:</h6>
                            <p className={styles.itemContent}>{name}</p>

                          <h6 className={styles.itemHeader}>Size:</h6>
                            <p className={styles.itemContent}>{size}</p>

                          <h6 className={styles.itemHeader}>Quantity:</h6>
                            <p className={styles.itemContent}>{quantity}</p>

                          <h6 className={styles.itemHeader}>Price:</h6>
                            <p className={styles.itemContent}>${price}</p>
                      </span>
                    </div>
                  )
                })
              }

            </div>
            
            <Link to={'/products'}>
              <button className={`w-100 btn btn-warning btn-lg ${styles.button}`} type="submit">
                  Continue Shopping</button>
            </Link>

            </div>
        </div>
        
    )
}

export default OrderConfirmation;