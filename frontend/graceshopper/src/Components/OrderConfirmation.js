import React from 'react';
import styles from '../styles/OrderConfirmation.module.css'
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {

  let confirmationNumber =  Math.floor(Math.random() * 1000000);
     
    return (
        // bootstrap styling 
        <div>
        <div id='container' class={`order-confirmation-container ${styles.ordercontainer}`}>
            
            <h1 class={`h1-order-received ${styles.h1OrderReceived}`}>Your order has been received</h1>
            <img class={`img-checkmark ${styles.imgCheckmark}`} src='https://cdn-icons-png.flaticon.com/512/4436/4436481.png' alt='Green checkmark'/>
            <h1 class={`h1-thank-you ${styles.h1ThankYou}`}>Thank you for your purchase!</h1>
            <p class={`p-confirmation-num ${styles.pConfirmationNum}`}>Your order confirmation number is: {confirmationNumber}</p>
            
            <Link to={'/products'}>
              <button class="w-100 btn btn-warning btn-lg" type="submit">
                  Continue Shopping</button>
            </Link>

    
        </div>
        
        </div>
        
    )
}

export default OrderConfirmation;