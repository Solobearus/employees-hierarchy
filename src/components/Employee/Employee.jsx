import React, { useContext, useState } from 'react'
import './Employee.css'
import { Context } from '../../context/Context'


const Employee = ({ user }) => {

    const { firstName, lastName, email, photo, children, userIndexInDB } = user;

    const { users, handleUpdate, handleRemove } = useContext(Context);
    const [openChildren, setOpenChildren] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false)
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const handleEditOrConfirm = () => {
        if (edit === false && remove === false) {
            setNewFirstName(firstName);
            setNewLastName(lastName);
            setNewEmail(email);
            setEdit(true);
        } else if (edit === true) {
            const updatedUser = {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail
            }
            handleUpdate(updatedUser, userIndexInDB);
            setEdit(false);
        } else if (remove === true) {
            handleRemove(userIndexInDB)
            setRemove(false);
        }
    }

    const handleRemoveOrCancel = () => {
        if (edit) {
            setEdit(false);
        } else if (remove) {
            setRemove(false);
        } else {
            setRemove(true);
        }
    }

    return (
        < div className="employee" data-testid="employee">
            <div className="info">
                <img src={photo} alt="" />
                {
                    edit ?
                        <>
                            <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                            <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        </>
                        :
                        <>
                            <div>{`${firstName}  ${lastName}`}</div>
                            <div>{email}</div>
                        </>
                }

                <div>
                    <button onClick={() => { handleEditOrConfirm() }}>{edit || remove ? "confirm" : "edit"}</button>
                    <button onClick={() => { handleRemoveOrCancel() }}>{edit || remove ? "cancel" : "remove"}</button>
                </div>
            </div>

            {openChildren &&
                <div className="children">
                    {children && children.map(childId => {
                        const user = users[childId];
                        return <Employee key={childId} user={user}></Employee>
                    })}
                </div>
            }
            {children && <button
                className="openChildren"
                onClick={() => setOpenChildren(!openChildren)}>
                {openChildren ? "hide employees" : "show employees"}
            </button>}
        </div >
    )
}

export default Employee
