import React from 'react';
import styles from '../styles/OrderConfirmation.module.css'

const OrderConfirmation = () => {

  let confirmationNumber =  Math.floor(Math.random() * 1000000);
     
    return (
        // bootstrap styling 
        <div id='container' class={`order-confirmation-container ${styles.ordercontainer}`}>
            <span>
            <h1>Order Confirmation</h1>
            <h1>Thank you for your order!</h1>
    <p>Your order confirmation number is: {confirmationNumber}</p>
    </span>
        </div>
        
    )
}

export default OrderConfirmation;