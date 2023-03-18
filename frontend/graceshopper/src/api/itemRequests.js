import { BASEURL } from "../constants/constants";

export async function getAllItems() {
    try {
        const response = await fetch(
            `${BASEURL}/items/`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const json = await response.json();
        // console.log(json);
        return json;

    } catch (error) {
        console.error(error);
    }
}

export async function getProductsByCategory(categoryId) {

    try {
        const response = await fetch(
            `${BASEURL}/items/${categoryId}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )

        const json = await response.json();
        console.log(`here are all ${categoryId} items:`, json);

        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function getProductById(id) {
    try {
        const response = await fetch(
            `${BASEURL}/items/${id}/item`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )

        const json = await response.json();
        // console.log(`product info for ID #:${id} - info:`, json);

        return json;
    } catch (error) {
        console.error(error);
    }
}

// added the function for adding products
// export async function addProducts(token,props,products,setProducts,itemProps,setItemProps) {

//     const body = JSON.stringify({
//         name: props.name,
//         category: props.password,
//         brand: props.brand,
//         size: props.size,
//         price: props.price,
//         description: props.description,
//     });

//     try {
//         const response = await fetch(`${BASEURL}/items, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body,
//         });

//         const json = await response.json();
//         console.log(json);
//         const responseProduct = json;
//         setProducts([responseProduct,...products]);
//         console.log(responseProduct)

//     }catch (error) {
//         console.log(error);
//       }
//     }


export async function  itemDelete (token,id) {

    try {
      const response = await fetch(`${BASEURL}/items/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const json = await response.json();
      console.log(json);

    } catch (error) {
      console.log("Failed to delete post");
      console.log(error);
    }
  };
