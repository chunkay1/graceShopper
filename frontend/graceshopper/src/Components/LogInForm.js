import styles from '../styles/LogInForm.module.css'
import React, { useState } from 'react';
import { setTargetValue } from '../constants/constants';
import { logIn } from '../api/userRequests';

// const setTargetValue = (callback) => {
//     return (event) => {
//         callback(event.target.value)
//     }
// }

function LogInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={styles.container}>
            <form
                onSubmit={
                    async (event) => {
                        event.preventDefault();
                        console.log('Submit Form')
                        await logIn({username,password});
                        window.location.reload();
                    }
                }
            >
                <div className={styles.inputDivs}>
                    <input
                        type="text"
                        name='username'
                        placeholder='Enter Username'
                        id='username'
                        value={username}
                        onChange={setTargetValue(setUsername)}
                        required
                    />
                </div>

                <div className={styles.inputDivs}>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter Password'
                        id='password'
                        value={password}
                        onChange={setTargetValue(setPassword)}
                        required
                    />
                </div>


                <div className={styles.submit}>
                    <button className={styles.button}>Log In</button>
                </div>

                <p className={styles.secondHeader}>Don't Have an Account?

                    <a className={styles.signUpLink} href='http://localhost:3000/register'>Create One Here!</a>
                </p>
            </form>

        </div>
    )
}

export default LogInForm;