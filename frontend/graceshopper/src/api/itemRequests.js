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
        console.log(json);
        return json;

    } catch (error) {
        console.error(error);
    }
}

export async function getProductsByCategory(categoryId) {
    try {
        const response = await fetch(
            `${BASEURL}/items/${categoryId}/productCategory`,
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