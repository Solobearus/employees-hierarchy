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

    const handleFetchUsers = () => {
        fetch(`https://gongfetest.firebaseio.com/users.json`)
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    setUsers(arrayToTree(res));
                }
            })
            .catch(err => console.error(err))
    }

    const handleUpdate = (updatedUser, userIndexInDB) => {

        fetch(`https://gongfetest.firebaseio.com/users/${userIndexInDB}.json`,
            {
                method: 'PATCH',
                dataType: 'json',
                contentType: 'application/json',
                body: updatedUser
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err))
    }


    return < Provider value={{
        users,
        userLogged,
        setUsers,
        setUserLogged,
        handleLogin,
        handleFetchUsers,
        handleUpdate,
    }}>{children}</Provider >
}


export { Context, ContextProvider }
