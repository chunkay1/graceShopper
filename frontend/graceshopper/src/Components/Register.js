import React, { useState } from 'react';
import { setTargetValue } from '../constants/constants';
import { createAccount } from '../api/userRequests';
import styles from '../styles/Register.module.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
     
    return (
        <div className={`container text-center ${styles.container}`}>
            <h1>Register</h1>

            <form 
                
                onSubmit={ (event) => {
                    event.preventDefault();
                    console.log(username, password, email, address);
                    createAccount({username, password, email, address})
                }}>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        
                        <div class="col-md-1">
                            <label  
                                class="form-label align-self-start">Username
                            </label>
                        </div>

                        <input 
                            type="text" 
                            class="form-control" 
                            id="userInput" 
                            value={username}
                            required
                            onChange={setTargetValue(setUsername)} 
                        />

                        <div class="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">Password
                            </label>
                        </div>
        
                        <input 
                            type="password" 
                            class="form-control" 
                            id="pwInput" 
                            value={password}
                            minLength="9"
                            required
                            onChange={setTargetValue(setPassword)}
                        />
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">
                                    Email
                            </label>
                        </div>

                        <input 
                            type="email" 
                            class="form-control" 
                            id="emailInput" 
                            value={email}
                            required
                            onChange={setTargetValue(setEmail)}
                        />

                        <div class="invalid-feedback">
                            Please provide a valid email address.
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="col-md-1">
                            <label 
                                class="form-label align-self-start">
                                    Address
                            </label>
                        </div>

                        <input 
                            type="text" 
                            class="form-control" 
                            id="addressInput"
                            value={address}
                            required
                            onChange={setTargetValue(setAddress)}
                        />

                        <div class="invalid-feedback">
                            Please provide an address.
                        </div>
                    </div>
                </div>
        
                
                <div className={`col-12 ${styles.submit}`}>
                        <button 
                            class="btn btn-primary"
                            type="submit">
                                Submit form
                        </button>
                </div>

            </form>
        </div>
    )

    // return (
    //     <div>
    //         <h1>Register</h1>
    //         <form onSubmit={(event) => {
    //             event.preventDefault()
    //             console.log(username, password);
    //             createAccount({username, password, email, address})
    //         }}>
    //             <input 
    //                 type='text'
    //                 placeholder='username'
    //                 id='username'
    //                 onChange={setTargetValue(setUsername)}/>
                
    //             <input
    //                 type='password'
    //                 placeholder='password'
    //                 id='password'
    //                 onChange={setTargetValue(setPassword)}/>
    //             <input
    //                 type='email'
    //                 placeholder='email address'
    //                 id='email'
    //                 onChange={setTargetValue(setEmail)}/>
    //             <input
    //                 type='text'
    //                 placeholder='address'
    //                 id='address'
    //                 onChange={setTargetValue(setAddress)}/>
    //             <button type='submit'>Submit</button>
    //         </form>
    //     </div>
    // )
}



export default Register;