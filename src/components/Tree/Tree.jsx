import React, { useContext, useEffect } from 'react'
import './Tree.css'
import { Context } from '../../context/Context'
import Employee from '../Employee/Employee'

const Tree = () => {

    const { userLogged, users, handleFetchUsers, setUsers, setUserLogged } = useContext(Context);

    useEffect(() => {
        handleFetchUsers();
        return () => {
            setUsers(null);
        };
    }, [handleFetchUsers,setUsers]);

    const handleLogout = () => {
        localStorage.removeItem("encodedUserInformation");
        setUserLogged(null)
    }

    return (
        <div className="tree" data-testid="tree">
            <div className="header">
                <div className="username">
                    {users && `${users[userLogged].firstName} ${users[userLogged].lastName}`}
                </div>
                <button onClick={() => handleLogout()}>
                    Logout
                </button>
            </div>
            {users && Object.keys(users).map(userId =>
                !users[userId].managerId &&
                <Employee key={userId} user={users[userId]}></Employee>
            )}
        </div>
    )
}

export default Tree
