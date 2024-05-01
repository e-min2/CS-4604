import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";



  
const Major = () => {

    const [major, setMajors] = useState([])

    useEffect(() => {
        const fetchAllMajors = async () => {
            try{
                const res = await axios.get("http://localhost:8800/majors") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setMajors(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllMajors()
    }, [])

    const handleDelete = async (name) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/majors/"+name)
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Majors</h1>
            <button><Link to="/addmajor">Add New Major</Link></button>
            <div className="majors">
                {major.map(majors => (
                    <div className="majors" key={majors.Major_Name}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{majors.Major_Name}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span><b>Department: </b> {majors.Major_Dep}, </span> 
                        <button className="delete" onClick={() =>handleDelete(majors.Major_Name)}>Delete Major</button>
                        <button className="update"><Link to={`/updatemajor/${majors.Major_Name}`}>Update</Link></button> 
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Major