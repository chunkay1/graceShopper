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
        console.log(json);
        const replyToken = json.token;

        if (replyToken) {
            localStorage.setItem(`${STORAGE_KEY}`, replyToken)
        }
        console.log(replyToken);
        

        
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
        console.log(json);
        const replyToken = json.token;

        if (replyToken) {
            localStorage.setItem(`${STORAGE_KEY}`, replyToken)
        }

        console.log(replyToken)
        
        
    } catch (error) {
        console.error(error)
        window.alert(error)
    }
}