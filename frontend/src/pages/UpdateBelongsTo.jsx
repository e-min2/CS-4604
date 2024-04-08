import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateBelongsTo = () => {

    const [belongsTo, setBelongsTo] = useState ({
        Dname: null,
        Course_Num: null
    });


    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library
    const location = useLocation()

    //console.log(location.pathname.split("/")[2])

    const department = location.pathname.split("/")[2];
    const cnumber = location.pathname.split("/")[3];


    const handleChange = (e) =>{
        setBelongsTo(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleUpdate = async e => {
        e.preventDefault()
        try{
            // We'll uise axios to send our put requests to our backend to update.
            await axios.put("http://localhost:8800/belongsto/param1="+ department +"&param2="+ cnumber, belongsTo); // This is the api call we wrote for put requests to our database in order to update.
            navigate("/belongsto") // If everything was successful navigate to the home page. 
        }catch(err){
            console.log(err)
        }
    }


    return (

        <div className='form'>
            <h1>Update Belongs To</h1>
            <input type="text" placeholder='Department Name' onChange={handleChange} name = "Dname"></input>
            <input type="text" placeholder='Course Number' onChange={handleChange} name = "Course_Num"></input>
            <button className="formButton" onClick={handleUpdate}>Update</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default UpdateBelongsTo