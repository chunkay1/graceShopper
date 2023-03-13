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
        console.log('body:', body)
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

export async function logOut() {
    try {
        localStorage.clear();
        console.log('logged out!');
    } catch (error) {
        console.error(error)
    }
}

//added function to check for admin user
export const AdminUser = async (token) => {
    try {
      const response = await fetch(
        `${BASEURL}/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await response.json();
      const me = json.isAdmin;
  
      return me;

    } catch (error) {
      console.log('Failed to fetch admin user.');
      console.error(error);
      throw error;
    }
  };
