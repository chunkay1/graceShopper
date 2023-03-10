import { BASEURL } from "../constants/constants";

// export async function addToCart({brand, category, id, name, price, size, image}) {
//     try {
//         return (
//             `Brand: ${brand}, 
//             category : ${category},
//             id : ${id},
//             name : ${name},
//             price : ${price},
//             size : ${size}`  
//         ) 
        
//     } catch (error) {
//         console.error(error)
//     }
// }

export async function addToCart( id, token ) {
    // console.log('id type is', typeof(id))
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
        // console.log(response)

        const json = await response.json();
        console.log(json);
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
        const itemsInCart = json.itemsInCart
        console.log(`cart info for user is:`, json);
        // const id = json.user.id;
        // console.log('user ID is:', id)

        
    } catch (error) {
        console.error(error)
    }
}
