import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  
const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8800/users") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setUsers(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])

    const handleDelete = async (email) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/users/"+email);
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List Of All Users</h1>
            {/* <button><Link to="/addcourse">Add New Course</Link></button> */}
            <div className="users">
                {users.map(user => (
                    <div className="users" key={user.Email}> 
                        <h2>{user.Account_Type}</h2>
                        <span><b>Email: </b> {user.Email}, </span> 
                        <button className="delete" onClick={() =>handleDelete(user.Email)}>Delete Account</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users