import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

  
const Departments = () => {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const fetchAllDepartments = async () => {
            try{
                const res = await axios.get("http://localhost:8800/departments") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setDepartments(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllDepartments()
    }, [])

    const handleDelete = async (id) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/departments/"+id) 
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Departments</h1>
            <button><Link to="/adddepartment">Add New Department</Link></button>
            <div className="departments">
                {departments.map(department => (
                    <div className="department" key={department.Department_Name}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{department.Department_Name}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span><b>Contact Info: </b> {department.Contact_Info}, </span>
                        <span><b>Head ID:  </b> {department.Head_ID}, </span>
                        <button className="delete" onClick={() =>handleDelete(department.Department_Name)}>Delete Department</button>
                        <button className="update"><Link to={`/updatedepartment/${department.Department_Name}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Departments