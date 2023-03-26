import { BASEURL } from "../constants/constants";

export async function addToCart( id, token ) {
    try {
        const response = await fetch(
            `${BASEURL}/itemsInCart/addItem`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify ({
                    itemId: id
                })
            }
        )

        const json = await response.json();
        return json;
        
    } catch (error) {
        console.error(error)
    }
}

export async function getUserCart(token) {
    try {
        const response = await fetch(
            `${BASEURL}/carts/userCart`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }, 
            }
        )
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error)
    }
}

export async function getOrderHistory(token) {
    try {
        const response = await fetch(
            `${BASEURL}/carts/userCart/orderHistory`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            }
        )
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error)
    }
}

export async function checkoutCart(cartId, token) {
    try {
        const response = await fetch(
            `${BASEURL}/carts/${cartId}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            }
        )
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error)
    }
}

export async function deleteItemFromCart(itemInCartId, cartId, token) {
     try {
        const response = await fetch(
            `${BASEURL}/itemsInCart/`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify ({
                    itemInCartId: itemInCartId,
                    cartId: cartId,
                })
            }
        )
        const json = await response.json();

        return json

        
    } catch (error) {
        console.error(error)
    }
}

export async function updateCartQuantity(itemInCartId, cartID, newQuantity, token) {
    try {
       const response = await fetch(
           `${BASEURL}/itemsInCart/change-quantity`,
           {
               method: "PATCH",
               headers: {
                   'Content-Type': 'application/json',
                   "Authorization": `Bearer ${token}`
               },
               body: JSON.stringify ({
                   itemInCartId: itemInCartId,
                   cartID: cartID,
                   newQuantity: newQuantity
               })
           }
       )
       const json = await response.json();

       return json

       
   } catch (error) {
       console.error(error)
   }
}

