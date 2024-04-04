import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  

const Instructors = () => {

    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        const fetchAllInstructors = async () => {
            try{
                const res = await axios.get("http://localhost:8800/instructors") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setInstructors(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllInstructors()
    }, [])

    const handleDelete = async (id) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/instructors/"+id) 
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Instructors</h1>
            <button><Link to="/addinstructor">Add New Professor</Link></button>
            <div className="instructors">
                {instructors.map(instructor => (
                    <div className="intructor" key={instructor.Teacher_ID}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{instructor.Instructor_Name}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span><b>Professor's Name: </b> {instructor.Instructor_Name} </span>
                        <span><b>Professor's Department: </b> {instructor.Inst_Dep}, </span>
                        <button className="delete" onClick={() =>handleDelete(instructor.Teacher_ID)}>Delete Instructor</button>
                        <button className="update"><Link to={`/updateinstructors/${instructor.Teacher_ID}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Instructors