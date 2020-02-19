import React, { useContext, useState } from 'react'
import './Employee.css'
import { Context } from '../../context/Context'


const Employee = ({ user }) => {

    const { firstName, lastName, email, photo, children } = user;

    const { users } = useContext(Context);
    const [openChildren, setOpenChildren] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setremove] = useState(false)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const handleEditOrConfirm = () => {
        if (edit === false) {
            setNewName(`${firstName}  ${lastName}`);
            setNewEmail(email);
        }else if(remove === false){

        }
        setEdit(!edit)
    }
    const handleRemoveOrCancel = () => {

    }

    return (
        < div className="employee" data-testid="employee">
            <div className="info">
                <img src={photo} alt="" />
                {
                    edit ?
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        :
                        <div>{`${firstName}  ${lastName}`}</div>
                }
                {
                    edit ?
                        <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        :
                        <div>{email}</div>
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
                        return <Employee user={user}></Employee>
                    })}
                </div>
            }
            {children && <div className="openChildren" onClick={() => setOpenChildren(!openChildren)}>{openChildren ? "👆" : "👇"}</div>}
        </div >
    )
}

export default Employee
