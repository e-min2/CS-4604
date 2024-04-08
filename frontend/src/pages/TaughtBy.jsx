import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

const TaughtBy = () => {

    const [taughtby, setTaught] = useState([])

    useEffect(() => {
        const fetchAllTaught = async () => {
            try{
                const res = await axios.get("http://localhost:8800/taughtby") 
                // We made it so get requests ending with /students within backend will get all student user data .
                // This function will then get all student user data and provide it in the console. 
                setTaught(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllTaught()
    }, [])

    const handleDelete = async (cnumber, profid) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            await axios.delete("http://localhost:8800/taughtby/param1="+cnumber+"&param2="+profid) 
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of Courses Taught By Professors</h1>
            <button><Link to="/addtaughtby">Add Course Taught By</Link></button>
            <div className="taughtby">
                {taughtby.map(curr_course => (
                    <div className="taughtby" key={`${curr_course.C_Num}-${curr_course.Teach_ID}`}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{curr_course.C_Num}</h2>
                        <span><b>Professor's ID: </b> {curr_course.Teach_ID}, </span>
                        <button className="delete" onClick={() =>handleDelete(curr_course.C_Num, curr_course.Teach_ID)}>Delete Course</button>
                        <button className="update"><Link to={`/updatetaughtby/${curr_course.C_Num}/${curr_course.Teach_ID}`}>Update</Link></button> 
                    </div>
                ))}
            </div>
            {/*This is just adding a button that sends you to the add page to make a new Student*/}
            
        </div>
    )
}

export default TaughtBy