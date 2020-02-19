import React, { useState, useContext, useEffect } from 'react'
import './SignIn.css'
import { Context } from '../../context/Context'

const SignIn = () => {

    const [username, setUsername] = useState('anthony.xiouping@xtreet.tvl');
    const [password, setPassword] = useState('mllv9n0x');
    const { handleLogin } = useContext(Context);

    // if I left the site I will store the token in the local storage, 
    // this way when I revisit I get to reauthenticate vs the server and login again automatically.
    useEffect(() => {
        const encodedUserInformation = localStorage.getItem("encodedUserInformation")
        if (encodedUserInformation) {
            handleLogin(encodedUserInformation);
        }
    }, [])

    return (
        < div className="signIn" data-testid="signIn">
            <h1>Please Login</h1>
            <input
                type="text"
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
        </div >
    )
}

export default SignIn
