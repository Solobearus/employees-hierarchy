import React, { createContext, useState } from 'react'
import encode from '../utils/encode'

const Context = createContext(null);
const { Provider } = Context;

const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState(null);
    const [userLogged, setUserLogged] = useState(null);

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

    return < Provider value={{
        users,
        userLogged,
        setUsers,
        setUserLogged,
        handleLogin
    }}>{children}</Provider >
}


export { Context, ContextProvider }
