import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {

    const [student, setStudent] = useState ({
        Student_ID: null,
        Student_Name: "",
        Major: "",
        Minor: "",
        Year: "",
        SGPA_Value: null
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library
    const location = useLocation()

    //console.log(location.pathname.split("/")[2])

    const studentID = location.pathname.split("/")[2]
    /*
     This takes the pathname or the url and splits up into an array based on the / marks. 
     pathname: '/update/student ID/ 
     array["", update, student ID]
     So taking the last index of this array gives us the student ID
     You can see this by commenting out the axios.put line and outputting to console.log
    */


    const handleChange = (e) =>{
        setStudent(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleUpdate = async e => {
        /*EVERY TIME WE UPDATE THE STUDENT'S ID IT ALSO NEEDS TO REFLECT IN THE DECLARES TABLE. I think I covered this
        using the cascade option on the foreign key though. If the student's major or minor gets updated we need to add some function
        for that I believe.*/
        e.preventDefault()
        try{
            // We'll uise axios to send our put requests to our backend to update.
            await axios.put("http://localhost:8800/students/"+ studentID, student) // This is the api call we wrote for put requests to our database in order to update.
            navigate("/students") // If everything was successful navigate to the home page. 
        }catch(err){
            console.log(err)
        }
    }


    return (

        <div className='form'>
            <h1>Update Student</h1>
            <input type="number" placeholder='Student ID' min="9" max ="9" onChange={handleChange} name = "Student_ID"></input>
            <input type="text" placeholder='Student Name' onChange={handleChange} name = "Student_Name"></input>
            <input type="text" placeholder='Student Major' onChange={handleChange} name = "Major"></input>
            <input type="text" placeholder='Student Minor' onChange={handleChange} name = "Minor"></input>
            <input type="text" placeholder='Student Year' onChange={handleChange} name = "Year"></input>
            <input type="number" step="0.01" placeholder='Student GPA' onChange={handleChange} name = "SGPA_Value"></input>

            <button className="formButton" onClick={handleUpdate}>Update</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default Update