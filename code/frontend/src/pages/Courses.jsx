import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  
const Courses = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchAllCourses = async () => {
            try{
                const res = await axios.get("http://localhost:8800/courses") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setCourses(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllCourses()
    }, [])

    const handleDelete = async (number, prereq) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            console.log(number)
            console.log(prereq)
            await axios.delete("http://localhost:8800/courses/param1="+number+"&param2="+prereq)
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Courses</h1>
            <button><Link to="/addcourse">Add New Course</Link></button>
            <div className="courses">
                {courses.map(course => (
                    <div className="courses" key={`${course.Course_Number}-${course.Prerequisites}`}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{course.Course_Number}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span><b>Prerequisites: </b> {course.Prerequisites}, </span> 
                        <span><b>Deparments:  </b> {course.Departments},  </span> 
                        <span><b>Course GPA:  </b> {course.CGPA_Value} </span>
                        <button className="delete" onClick={() =>handleDelete(course.Course_Number, course.Prerequisites)}>Delete Course</button>
                        <button className="update"><Link to={`/updatecourse/${course.Course_Number}/${course.Prerequisites}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Courses