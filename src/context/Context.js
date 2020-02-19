import React, { createContext, useState } from 'react'

const Context = createContext(null);
const { Provider } = Context;

const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [userLogged, setUserLogged] = useState(null);

    
    return < Provider value={{
        users,
        userLogged,
        setUsers,
        setUserLogged
    }}>{children}</Provider >
}


export { Context, ContextProvider }
