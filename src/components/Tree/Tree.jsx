import React, { useState, useContext, useEffect } from 'react'
import './Tree.css'
import { Context } from '../../context/Context'
import Employee from '../Employee/Employee'
import arrayToTree from '../../utils/arrayToTree'

const Tree = () => {

    const { userLogged, users, setUsers, setUserLogged } = useContext(Context);
    const [userLoggedDetails, setUserLoggedDetails] = useState()

    useEffect(() => {
        fetch(`https://gongfetest.firebaseio.com/users.json`)
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    setUsers(arrayToTree(res));
                }
            })
            .catch(err => console.error(err))

        return () => {
            setUsers(null);
        };
    }, []);

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
