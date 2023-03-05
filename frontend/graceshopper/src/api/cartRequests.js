export async function addToCart({brand, category, id, name, price, size, image}) {
    try {
        console.log(`cart item is 
            Brand: ${brand}, 
            category : ${category},
            id : ${id},
            name : ${name},
            price : ${price},
            size : ${size}`  
        )
    } catch (error) {
        console.error(error)
    }
}