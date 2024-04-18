import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateUser = () => {

    const [user, setUser] = useState ({
        Email: "",
        Password: "",
        Account_Type: ""
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library
    const location = useLocation()

    const email = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setUser(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleUpdate = async e => {
        /*EVERY TIME WE UPDATE THE STUDENT'S ID IT ALSO NEEDS TO REFLECT IN THE DECLARES TABLE. I think I covered this
        using the cascade option on the foreign key though. If the student's major or minor gets updated we need to add some function
        for that I believe.*/
        e.preventDefault()
        try{
            // We'll uise axios to send our put requests to our backend to update.
            await axios.put("http://localhost:8800/updateuser/"+ email, user); // This is the api call we wrote for put requests to our database in order to update.
            navigate("/users"); // If everything was successful navigate to the home page. 
        }catch(err){
            console.log(err)
        }
    }

    return (

        <div className='form'>
            <h1>Update User</h1>
            <input type="text" placeholder='User Email' onChange={handleChange} name = "Email"></input>
            <input type="text" placeholder='User Password' onChange={handleChange} name = "Password"></input>
            <input type="text" placeholder='Account Type' onChange={handleChange} name = "Account_Type"></input>
            <button className="formButton" onClick={handleUpdate}>Update</button> 

        </div>
    )
}

export default UpdateUser