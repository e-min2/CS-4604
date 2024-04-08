import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateCourse = () => {

    const [course, setCourse] = useState ({
        Course_Number: null,
        Prerequisites: null,
        Departments: "",
        CGPA_Value: 0.00
    });


    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library
    const location = useLocation()

    //console.log(location.pathname.split("/")[2])

    const courseNumber = location.pathname.split("/")[2];
    const prereq = location.pathname.split("/")[3];

    /*
     This takes the pathname or the url and splits up into an array based on the / marks. 
     pathname: '/update/student ID/ 
     array["", update, student ID]
     So taking the last index of this array gives us the student ID
     You can see this by commenting out the axios.put line and outputting to console.log
    */


    const handleChange = (e) =>{
        setCourse(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleUpdate = async e => {
        /*EVERY TIME WE UPDATE THE STUDENT'S ID IT ALSO NEEDS TO REFLECT IN THE DECLARES TABLE. I think I covered this
        using the cascade option on the foreign key though. If the student's major or minor gets updated we need to add some function
        for that I believe.*/
        e.preventDefault()
        try{
            // We'll uise axios to send our put requests to our backend to update.
            await axios.put("http://localhost:8800/courses/param1="+ courseNumber+"&param2="+ prereq, course); // This is the api call we wrote for put requests to our database in order to update.
            navigate("/courses") // If everything was successful navigate to the home page. 
        }catch(err){
            console.log(err)
        }
    }


    return (

        <div className='form'>
            <h1>Update Course</h1>
            <input type="text" placeholder='Course Number' onChange={handleChange} name = "Course_Number"></input>
            <input type="text" placeholder='Prerequisites' onChange={handleChange} name = "Prerequisites"></input>
            <input type="text" placeholder='Departments' onChange={handleChange} name = "Departments"></input>
            <input type="number" placeholder='Course GPA' min="0" max ="4" step="0.1" onChange={handleChange} name = "CGPA_Value"></input>

            <button className="formButton" onClick={handleUpdate}>Update</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default UpdateCourse