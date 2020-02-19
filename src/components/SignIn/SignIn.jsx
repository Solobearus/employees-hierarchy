import React, { useState, useContext, useEffect } from 'react'
import './SignIn.css'
import encode from '../../utils/encode'
import { Context } from '../../context/Context'

const SignIn = () => {

    const [username, setUsername] = useState('anthony.xiouping@xtreet.tvl');
    const [password, setPassword] = useState('mllv9n0x');
    const { setUserLogged } = useContext(Context);

    const handleLogin = (encodedUserInformationFromLocalStorage) => {
        let encodedUserInformation = encodedUserInformationFromLocalStorage;

        if (!encodedUserInformation)
            encodedUserInformation = encode(username, password);

        fetch(`https://gongfetest.firebaseio.com/secrets/${encodedUserInformation}.json`)
            .then(res => res.json())
            .then(res => {
                if (!res || res.error) {
                    localStorage.removeItem("encodedUserInformation");
                    setUserLogged(null);
                } else {
                    localStorage.setItem("encodedUserInformation", encodedUserInformation);
                    setUserLogged(res);
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
