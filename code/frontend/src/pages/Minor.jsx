import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";



  
const Minor = () => {

    const [minor, setMinor] = useState([])

    useEffect(() => {
        const fetchAllMajors = async () => {
            try{
                const res = await axios.get("http://localhost:8800/minors") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setMinor(res.data);
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
            await axios.delete("http://localhost:8800/minors/"+name)
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of all Minors</h1>
            <button><Link to="/addminor">Add New Minor</Link></button>
            <div className="minors">
                {minor.map(minors => (
                    <div className="minors" key={minor.Minor_Name}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{minors.Minor_Name}</h2>
                        {/*This is just formatting to list out the student's name, major, minor, and gpa values*/}
                        <span><b>Department: </b> {minors.Minor_Dep}, </span> 
                        <button className="delete" onClick={() =>handleDelete(minors.Minor_Name)}>Delete Minor</button>
                        <button className="update"><Link to={`/updateminor/${minors.Minor_Name}`}>Update</Link></button> 
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Minor