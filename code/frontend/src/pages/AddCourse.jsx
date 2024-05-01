import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {

    const [course, setCourse] = useState ({
        Course_Number: null,
        Prerequisites: null,
        Departments: "",
        CGPA_Value: 0.00
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library

    const handleChange = (e) =>{
        setCourse(prev =>({...prev, [e.target.name]: e.target.value}));
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleClick = async e => {
        /*EVERY TIME WE ADD STUDENT WE ALSO NEED TO ADD AN ENTRY FOR THE DECLARES TABLE AS WELL*/ 
        e.preventDefault() // This prevents our page from refreshing when the add button is clicked.
        try{
            // We'll uise axios to send our post requests to our backends
            await axios.post("http://localhost:8800/courses", course) // This is the api call we wrote for post requests to our database. 
            navigate("/courses") // If everything was successful navigate to the students page. 
        }catch(err){

        }
    }


    console.log(course)
    return (
        <div className='form'>
            <h1>Add New Course</h1>
            <input type="text" placeholder='Course Number' onChange={handleChange} name = "Course_Number"></input>
            <input type="text" placeholder='Prerequisites' onChange={handleChange} name = "Prerequisites"></input>
            <input type="text" placeholder='Departments' onChange={handleChange} name = "Departments"></input>
            <input type="number" placeholder='Course GPA' min="0" max ="4" step="0.1" onChange={handleChange} name = "CGPA_Value"></input>

            <button className="formButton" onClick={handleClick}>Add Course</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default AddCourse