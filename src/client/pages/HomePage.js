import React from 'react';

const Home = () => {

    return (
        <div>
            <p>I'm the home component hello1</p>
            <button onClick={ console.log("hello") }>Click</button>
        </div>
    )
}

export default {
    component: Home
};