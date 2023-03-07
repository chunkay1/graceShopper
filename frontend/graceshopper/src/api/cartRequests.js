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

export async function addToCart({ id, token }) {
    try {
        const response = await fetch(
            `${BASEURL}/itemsInCart/`, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify ({
                    itemId : id
                })
            }
        )

        const json = await response.json();
        console.log(json);
        return json;
        
    } catch (error) {
        console.error(error)
    }
}