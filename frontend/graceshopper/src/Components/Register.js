import React, { useState } from 'react';
import { setTargetValue } from '../constants/constants';
import { createAccount } from '../api/userRequests';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
     
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                console.log(username, password);
                createAccount({username, password, email, address})
            }}>
                <input 
                    type='text'
                    placeholder='username'
                    id='username'
                    onChange={setTargetValue(setUsername)}/>
                
                <input
                    type='password'
                    placeholder='password'
                    id='password'
                    onChange={setTargetValue(setPassword)}/>
                <input
                    type='text'
                    placeholder='email address'
                    id='email'
                    onChange={setTargetValue(setEmail)}/>
                <input
                    type='text'
                    placeholder='address'
                    id='address'
                    onChange={setTargetValue(setAddress)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    )
}

export default Register;