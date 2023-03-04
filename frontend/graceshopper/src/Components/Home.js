import React from 'react';
// import { helloWorld } from '../api/testRequests';
import { getAllItems } from '../api/itemRequests';

const Home = () => {
     
    return (
        <div>
            <h1>Home</h1>

            <button onClick={(e) => {getAllItems()}}>
                Test!
            </button>
            
        </div>
        
    )
}

export default Home;