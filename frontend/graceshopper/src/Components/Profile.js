// FINAL VERSION //////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { getOrderHistory, } from '../api/cartRequests';
import styles from '../styles/Profile.module.css'

const Profile = ({ token }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    getOrderHistory(token).then((answer) => {
      if (answer) {
        setOrderHistory(answer)
      }
    })
  }, [token])

  return (
    <div class={styles.mainContainer}>
      <h1 class={styles.h1Profile}>Profile</h1>

      <h3 class={styles.h3}>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

      { orderHistory.length &&

        orderHistory.map((order) => {
          return (
            <ul key={order.id}>

              {
                order.itemsInCart.map((itemInCart) => {
                  return (
                    <li key={itemInCart.id}>{itemInCart.name}</li>
                  )
                })
              }

            </ul>
          )
        })
      }
      
    </div>
  )
}

export default Profile;
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

// BUTTON ONLY VERSION - WED 3/15 ///////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { getOrderHistory,  } from '../api/cartRequests';
// import styles from '../styles/Profile.module.css'

// const Profile = ({ token }) => {
//      const [orderHistory, setOrderHistory] = useState([]);
//      const [orderState, setOrderState] = useState(false);
//      const [testState, setTestState] = useState(false);

//     const allOrders = getOrderHistory(token).then((answer) => {
//     setTestState(true)
//     })
        
//     useEffect(() => {
//     setOrderHistory(allOrders)
//     }, [testState])
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
     
    // return (
    //     <div class={styles.mainContainer}>
    //         <h1 class={styles.h1Profile}>Profile</h1>

    //         {/* <h1>Hi there, `${user}`</h1> */}

    //         <h3 class={styles.h3}>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

    //         <button class='btn btn-info' onClick={async (e) => { 
    //             e.preventDefault();
    //            await getOrderHistory(token).then((value) => {
    //                 setOrderHistory(value)
    //             })
            
    //             console.log('frontend orderhistory:',orderHistory)
                
               
    //             setOrderState(true)
                
    //         }}>Get Order History</button>

           
    //         <h5 class={styles.h5}>And find something new that you'll love!</h5>
            

    //         { orderState ?

    //         orderHistory.itemsInCart.map(({name, brand, size, price}) => {
                            
    //             return(
    //                 <div className={styles.container}>
    //                     <ul className={styles.orderDetails}>
    //                         <li>Order Number</li>
                
    //                     <ul className={styles.orderItems}>
    //                 {/* for loop or map */}
    //                         <li>Name</li>
    //                         <li>Brand</li>
    //                         <li>Size</li>
    //                         <li>Price</li>
    //                     </ul>
    //                     <ul>Total Price</ul>
    //                     </ul>
    //                 </div>
    //             )
    //         })
//////////////////////////////////////////////////////////////////////////
        //     return(
        //         for(let i =0; i < orderHistory.length; i++) {
        //             let orderHistoryObj = orderHistory[i].itemsInCart
        //              // console.log(orderHistoryObj)
        
        //              orderHistoryObj.map(({name}) => {
        //                  return(
        //                     console.log(name)
        //                  <div>
        //                     <p>Name</p>
        //                     <p>{name}</p>

        //                 </div>
        //                  )
                         
        //                  )
          
    
                     
                 
        //      })
        //  }
            // console.log(orderHistory.itemsInCart)
            // orderHistory.itemsInCart.map(({name, brand, size, price}) => {
                
            //     return(
            //         <div className={styles.container}>
            //             <ul className={styles.orderDetails}>
            //                 <li>Order Number</li>
                
            //             <ul className={styles.orderItems}>
            //         {/* for loop or map */}
            //                 <li>Name</li>
            //                 <li>Brand</li>
            //                 <li>Size</li>
            //                 <li>Price</li>
            //             </ul>
            //             <ul>Total Price</ul>
            //             </ul>
            //         </div>
            //     )
            // })
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

//                 :

//                 null}
            
//         </div>
        
//     )
// }

// export default Profile;

// BUTTON ONLY VERSION - THU 3/16 //////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { getOrderHistory,  } from '../api/cartRequests';
// import styles from '../styles/Profile.module.css'

// const Profile = ({ token }) => {
//      const [orderHistory, setOrderHistory] = useState([]);
//      const [orderState, setOrderState] = useState(false);
//     // console.log(token)
//     //  useEffect(() => {
//     //      const getOrderHistoryAsync = async (token) => {
//     //          console.log(token)
//     //          let allOrders = await getOrderHistory(token);
//     //          setOrderHistory(allOrders);
//     //          console.log('past orders are:', allOrders)
//     //      }
//     //      getOrderHistoryAsync();
//     //      console.log(orderHistory)
//     //  }, [token, orderHistory])
     
//     return (
//         <div class={styles.mainContainer}>
//             <h1 class={styles.h1Profile}>Profile</h1>

//             {/* <h1>Hi there, `${user}`</h1> */}

//             <h3 class={styles.h3}>Take a stroll down memory lane to see what awesome stuff you've already purchased</h3>

//             <button class='btn btn-info' onClick={async (e) => { 
//                 e.preventDefault();
//                 const previousOrders = await getOrderHistory(token)
//                 setOrderHistory(previousOrders)
//                 console.log('frontend orderhistory:',orderHistory)
//                 setOrderState(true)
//             }}>Get Order History</button>

           
//             <h5 class={styles.h5}>And find something new that you'll love!</h5>

//             { orderState ?

//             // orderHistory.map(({name, brand, size, price}) => {
//             //     return(
//                     <div key={token} className={styles.container}>
                        
//                         <ul className={styles.orderDetails}>
//                         {
//                             orderHistory.map(({name, brand, size, price}) => {
//                                 return(
//                                     <ul>
//                                     <li>New List Item Returned!</li>
//                                     <li>{orderHistory.name}</li>
//                                     </ul>
//                                 )
//                             })
//                         }
//                             <li>Order Number</li>
                
//                         <ul className={styles.orderItems}>
//                     {/* for loop or map */}
//                             <li>Name</li>
//                             <li>Brand</li>
//                             <li>Size</li>
//                             <li>Price</li>
//                         </ul>
//                         <ul>Total Price</ul>
//                         </ul>
//                     </div>
//         //////////////////////////
//                 )
//             })
//         //////////////////////////
//         //     <div className={styles.container}>
//         //     <ul className={styles.orderDetails}>
//         //         <li>Order Number</li>
                
//         //         <ul className={styles.orderItems}>
//         //             {/* for loop or map */}
//         //             <li>Name</li>
//         //             <li>Brand</li>
//         //             <li>Size</li>
//         //             <li>Price</li>
//         //         </ul>
//         //         <ul>Total Price</ul>
//         //     </ul>
//         // </div>

//                 :

//                 null}
            
//         </div>
        
//     )
// }

// export default Profile;

// REFERENCE ///////////////////////////////////////////////////////////////////

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