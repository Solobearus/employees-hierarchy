import React, { createContext, useState } from 'react'
import encode from '../utils/encode'
import arrayToTree from '../utils/arrayToTree'

const Context = createContext(null);
const { Provider } = Context;

const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState(null);
    const [userLogged, setUserLogged] = useState(null);

    const handleLogin = (encodedUserInformationFromLocalStorage, username, password, setLoginError) => {
        let encodedUserInformation = encodedUserInformationFromLocalStorage;

        if (!encodedUserInformation)
            encodedUserInformation = encode(username, password);

        fetch(`https://gongfetest.firebaseio.com/secrets/${encodedUserInformation}.json`)
            .then(res => res.json())
            .then(res => {
                if (!res || res.error) {
                    localStorage.removeItem("encodedUserInformation");
                    setUserLogged(null);
                    setLoginError && setLoginError('user and password is invalid');
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
                body: JSON.stringify(updatedUser)
            })
            .then(res => res.json())
            .then(res => {
                res.error ?
                    console.error(res.error) :
                    handleFetchUsers();
            })
            .catch(err => console.error(err))
    }
    const handleRemove = (userIndexInDB) => {

        fetch(`https://gongfetest.firebaseio.com/users/${userIndexInDB}.json`,
            {
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
            })
            .then(res => res.json())
            .then(res => {
                res && res.error ?
                    console.error(res.error) :
                    handleFetchUsers();
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
        handleRemove
    }}>{children}</Provider >
}


export { Context, ContextProvider }
