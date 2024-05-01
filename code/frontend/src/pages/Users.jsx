import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  
const Users = () => {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("everyone");

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

    const toggleFilter = () => {
        setFilter(filter === 'everyone' ? 'admin' : filter === 'admin' ? 'student' : 'everyone');
    };

    return (
        <div>
            <h1>List Of All Users</h1>
            <button><Link to="/adduser">Add New User</Link></button>
            {/* Button to toggle user display */}
            <button onClick={toggleFilter}> {filter === 'everyone' ? 'Show Admins' : filter === 'admin' ? 'Show Students' : 'Show Everyone'}  </button>
            {/*The button will display what user will be shown next after being clicked*/}
            <div className="users">
                {users
                    .filter(user => filter === 'everyone' || user.Account_Type.toLowerCase() === filter) // Filters all the user accounts based on their Account_Type
                    .map(user => ( // This will then map all the filtered users
                        <div className="user" key={user.Email}>
                            <h2>{user.Account_Type}</h2>
                            <span><b>Email: </b> {user.Email}, </span>
                            <button className="delete" onClick={() => handleDelete(user.Email)}>Delete Account</button>
                            <button className="update"><Link to={`/updateuser/${user.Email}`}>Update</Link></button>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Users