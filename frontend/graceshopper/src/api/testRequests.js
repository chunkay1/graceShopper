import { BASEURL } from "../constants/constants";

export async function helloWorld() {
    try {
        const response = await fetch(
            `${BASEURL}/health`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.error(error);
    }
}

export async function cartHealth() {
    try {
        const response = await fetch(
            `${BASEURL}/carts/health`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.error(error);
    }
}