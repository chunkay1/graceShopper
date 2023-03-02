import React, { useState } from 'react';
import { setTargetValue } from '../constants/constants';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
     
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(event) => {event.preventDefault()
            console.log(username, password)
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
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    )
}

export default Register;