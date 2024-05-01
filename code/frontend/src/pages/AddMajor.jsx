import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMajor = () => {

    const [major, setMajor] = useState ({
        Major_Name: "", 
        Major_Dep: ""
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library

    const handleChange = (e) =>{
        setMajor(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleClick = async e => {
        /*EVERY TIME WE ADD STUDENT WE ALSO NEED TO ADD AN ENTRY FOR THE DECLARES TABLE AS WELL*/ 
        e.preventDefault() // This prevents our page from refreshing when the add button is clicked.
        try{
            // We'll uise axios to send our post requests to our backends
            await axios.post("http://localhost:8800/majors", major) // This is the api call we wrote for post requests to our database. 
            navigate("/majors") // If everything was successful navigate to the students page. 
        }catch(err){

        }
    }

    return (
        <div className='form'>
            <h1>Add New Major</h1>
            <input type="text" placeholder='Major Name' onChange={handleChange} name = "Major_Name"></input>
            <input type="text" placeholder='Major Department' onChange={handleChange} name = "Major_Dep"></input>
            <button className="formButton" onClick={handleClick}>Add</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default AddMajor