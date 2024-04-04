import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const [student, setStudent] = useState ({
        Student_ID: null,
        Student_Name: "",
        Major: "",
        Minor: "",
        Year: "",
        SGPA_Value: null
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library

    const handleChange = (e) =>{
        setStudent(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleClick = async e => {
        /*EVERY TIME WE ADD STUDENT WE ALSO NEED TO ADD AN ENTRY FOR THE DECLARES TABLE AS WELL*/ 
        e.preventDefault() // This prevents our page from refreshing when the add button is clicked.
        try{
            // We'll uise axios to send our post requests to our backends
            await axios.post("http://localhost:8800/students", student) // This is the api call we wrote for post requests to our database. 
            navigate("/students") // If everything was successful navigate to the students page. 
        }catch(err){

        }
    }


    console.log(student)
    return (
        <div className='form'>
            <h1>Add New Student</h1>
            <input type="number" placeholder='Student ID' min="9" max ="9" onChange={handleChange} name = "Student_ID"></input>
            <input type="text" placeholder='Student Name' onChange={handleChange} name = "Student_Name"></input>
            <input type="text" placeholder='Student Major' onChange={handleChange} name = "Major"></input>
            <input type="text" placeholder='Student Minor' onChange={handleChange} name = "Minor"></input>
            <input type="text" placeholder='Student Year' onChange={handleChange} name = "Year"></input>
            <input type="number" step="0.01" placeholder='Student GPA' onChange={handleChange} name = "SGPA_Value"></input>

            <button className="formButton" onClick={handleClick}>Add</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default Add