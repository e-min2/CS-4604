import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  

const Students = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchAllStudents = async () => {
            try{
                const res = await axios.get("http://localhost:8800/students") 
                // We made it so get requests ending with /students within backend will get all student user data .
                // This function will then get all student user data and provide it in the console. 
                setStudents(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllStudents()
    }, [])

    const handleDelete = async (id) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/students/"+id) 
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Students</h1>
            <button><Link to="/add">Add new Student</Link></button>
            <div className="students">
                {students.map(student => (
                    <div className="student" key={student.Student_ID}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{student.Student_Name}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span>Student's Major: {student.Major}, </span>
                        <span>Student's Minor: {student.Minor}, </span>
                        <span>Student's GPA: {student.SGPA_Value} </span>
                        <button className="delete" onClick={() =>handleDelete(student.Student_ID)}>Delete Student</button>
                        <button className="update"><Link to={`/update/${student.Student_ID}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            {/*This is just adding a button that sends you to the add page to make a new Student*/}
            
        </div>
    )
}

export default Students