// FULL VERSION //////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { getOrderHistory,  } from '../api/cartRequests';
// import styles from '../styles/Profile.module.css'

// const Profile = ({ token }) => {
//      const [orderHistory, setOrderHistory] = useState([]);
//     console.log(token)
//      useEffect(() => {
//          const getOrderHistoryAsync = async (token) => {
//              console.log(token)
//              let allOrders = await getOrderHistory(token);
//              setOrderHistory(allOrders);
//              console.log('past orders are:', allOrders)
//          }
//          getOrderHistoryAsync();
//          console.log(orderHistory)
//      }, [token, orderHistory])
     
//     return (
//         <div>
//             <h1 class={`${styles.h1Profile}`}>Profile</h1>

//             {/* <h1>Hi there, `${user}`</h1> */}

//             <h3>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

//             <button class='btn btn-info' onClick={async (e) => { 
//                 e.preventDefault();
//                 const orderHistory = await getOrderHistory(token)
//                 console.log(orderHistory)
//             }}>Get Order History</button>

           
//             <h5>And find something new that you'll love!</h5>
            
//         </div>
        
//     )
// }

// export default Profile;

// BUTTON ONLY VERSION //////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { getOrderHistory,  } from '../api/cartRequests';
import styles from '../styles/Profile.module.css'

const Profile = ({ token }) => {
     const [orderHistory, setOrderHistory] = useState([]);
     const [orderState, setOrderState] = useState(false);
    // console.log(token)
    //  useEffect(() => {
    //      const getOrderHistoryAsync = async (token) => {
    //          console.log(token)
    //          let allOrders = await getOrderHistory(token);
    //          setOrderHistory(allOrders);
    //          console.log('past orders are:', allOrders)
    //      }
    //      getOrderHistoryAsync();
    //      console.log(orderHistory)
    //  }, [token, orderHistory])
     
    return (
        <div>
            <h1 class={`${styles.h1Profile}`}>Profile</h1>

            {/* <h1>Hi there, `${user}`</h1> */}

            <h3>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

            <button class='btn btn-info' onClick={async (e) => { 
                e.preventDefault();
                const previousOrders = await getOrderHistory(token)
                setOrderHistory(previousOrders)
                console.log('frontend orderhistory:',orderHistory)
                setOrderState(true)
            }}>Get Order History</button>

           
            <h5>And find something new that you'll love!</h5>

            { orderState ?
            //    map here so I can get the list for every single order - refer to Cart.js line 89 (and Products.js)
            // {
            //     orderDetails.map(({name, brand, size, price}) => {
            //         return(
                       
            //         )
            //     })
            // }

            orderHistory.map(({name, brand, size, price}) => {
                return(
                    <div className={styles.container}>
                        <ul className={styles.orderDetails}>
                            <li>Order Number</li>
                
                        <ul className={styles.orderItems}>
                    {/* for loop or map */}
                            <li>Name</li>
                            <li>Brand</li>
                            <li>Size</li>
                            <li>Price</li>
                        </ul>
                        <ul>Total Price</ul>
                        </ul>
                    </div>
                )
            })
        //     <div className={styles.container}>
        //     <ul className={styles.orderDetails}>
        //         <li>Order Number</li>
                
        //         <ul className={styles.orderItems}>
        //             {/* for loop or map */}
        //             <li>Name</li>
        //             <li>Brand</li>
        //             <li>Size</li>
        //             <li>Price</li>
        //         </ul>
        //         <ul>Total Price</ul>
        //     </ul>
        // </div>

                :

                null}
            
        </div>
        
    )
}

export default Profile;

// cart pricing tool - rename variables
// let totalCartPrice = (itemsInCart) => {
//     let cartPrice = 0;
//     console.log(itemsInCart)
//     for (let i = 0; i < itemsInCart.length; ++i) {
//       let itemPrice = Number(itemsInCart[i].price);
//       let quantity = itemsInCart[i].quantity
//       let individualPrice = (itemPrice * quantity)
//       cartPrice += individualPrice
//     }
//     return cartPrice