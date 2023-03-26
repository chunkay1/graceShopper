import { BASEURL } from "../constants/constants";
import { STORAGE_KEY } from "../constants/constants";

export async function createAccount(props) {
    const body = JSON.stringify({
        
        username: props.username,
        password: props.password,
        email: props.email,
        address: props.address,
        
    });

    try {
        const response = await fetch(
            `${BASEURL}/users/register`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body,
            }
        )

        const json = await response.json();
        const replyToken = json.token;

        if (replyToken) {
            localStorage.setItem(`${STORAGE_KEY}`, replyToken)
        }
        
    } catch (error) {
        console.error(error)
    }
}

export async function logIn(props) {

    const body = JSON.stringify({
        
        username: props.username,
        password: props.password,
        
    });

    try {
        const response = await fetch(
            `${BASEURL}/users/login`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            }
        )
        const json = await response.json();
        const replyToken = json.token;

        if (replyToken) {
            localStorage.setItem(`${STORAGE_KEY}`, replyToken)
        }

        return json
        
    } catch (error) {
        console.error(error)
        window.alert(error)
    }
}

export async function logOut() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(error)
    }
}

export async function myProfile(token) {
    try {
        const response = await fetch(
            `${BASEURL}/users/me`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            }
        )
        const json = await response.json();
        const admin = json.user.isAdmin;

        return admin
        
    } catch (error) {
        console.error(error)
    }
}
