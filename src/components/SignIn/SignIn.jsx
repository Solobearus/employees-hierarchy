import React, { useState, useContext, useEffect } from 'react'
import './SignIn.css'
import { Context } from '../../context/Context'

const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('')
    const { handleLogin } = useContext(Context);

    // if I left the site I will store the token in the local storage, 
    // this way when I revisit I get to reauthenticate vs the server and login again automatically.
    useEffect(() => {
        const encodedUserInformation = localStorage.getItem("encodedUserInformation")
        if (encodedUserInformation) {
            handleLogin(encodedUserInformation);
        }
    }, [handleLogin])

    return (
        < div className="signIn" data-testid="signIn">
            <h1>Please Login</h1>
            < div className="wrapper" data-testid="signIn">
                <div className="loginError">{loginError}</div>
                <div className="inputLabel">
                    <div className="label">Email adress: </div>
                    <input
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="inputLabel">
                    <div className="label">password: </div>
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={() => { handleLogin(null, username, password, setLoginError) }}>Login</button>
            </div >
        </div >
    )
}

export default SignIn
