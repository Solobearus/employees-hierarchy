import React, { useState, useContext, useEffect } from 'react'
import './Tree.css'
import { Context } from '../../context/Context'
import Employee from '../Employee/Employee'
import arrayToTree from '../../utils/arrayToTree'

const Tree = () => {

    const { userLogged, users, setUsers } = useContext(Context);
    const [treeFromArray, setTreeFromArray] = useState(null);

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

    return (
        <div className="tree" data-testid="tree">

            {users && Object.keys(users).map(userId =>
                !users[userId].managerId &&
                <Employee user={users[userId]}>
                    
                </Employee>
            )}
        </div>
    )
}

export default Tree
