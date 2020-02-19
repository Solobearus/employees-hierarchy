import React, { useState, useContext, useEffect } from 'react'
import './SignIn.css'
import encode from '../../utils/encode'
import { Context } from '../../context/Context'

const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserLogged } = useContext(Context);

    const handleLogin = (encodedUserInformationFromLocalStorage) => {

        let encodedUserInformation = encodedUserInformationFromLocalStorage;

        if (!encodedUserInformation)
            encodedUserInformation = encode(username, password);

        fetch(`https://gongfetest.firebaseio.com/secrets/${encodedUserInformation}.json`)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    setUserLogged(res)
                    localStorage.setItem("encodedUserInformation", encodedUserInformation)
                }
            })
            .catch(err => console.error(err))
    }

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
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div >
    )
}

export default SignIn
