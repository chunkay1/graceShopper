import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
     
    return (
        <div>
            <form onSubmit={(event) => {event.preventDefault()
            console.log(username, password)
            }}>
                <input type='text'placeholder='username'onChange={(event) => setUsername(event.target.value)}/>
                <input type='password'placeholder='password'onChange={(event) => setPassword(event.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    )
}

export default Register;