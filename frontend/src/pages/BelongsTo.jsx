import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

const BelongsTo = () => {

    const [belongsTo, setBelongs] = useState([])

    useEffect(() => {
        const fetchAllBelongs = async () => {
            try{
                const res = await axios.get("http://localhost:8800/belongsto") 
                // We made it so get requests ending with /students within backend will get all student user data .
                // This function will then get all student user data and provide it in the console. 
                setBelongs(res.data);
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllBelongs()
    }, [])

    const handleDelete = async (department, cnumber) => {
        // Our input parameter is id which is the ID that will be passed on when the delete button is clicked. 
        try{
            console.log(department)
            await axios.delete("http://localhost:8800/belongsto/param1="+department+"&param2="+cnumber) 
            // Axios allows us to sent the request to delete whatever student based on their ID 
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>List of Courses beglonging to Departments</h1>
            <button><Link to="/addbelongsto">Add Course Belongs To</Link></button>
            <div className="belongs">
                {belongsTo.map(curr_course => (
                    <div className="belongsto" key={`${curr_course.Dname}-${curr_course.Course_Num}`}> 
                    {/*The map function requires a unique key so I use the student's ID since those should be unique.*/}
                        <h2>{curr_course.Course_Num}</h2>
                        <span><b>Department: </b> {curr_course.Dname} </span>
                        <button className="delete" onClick={() =>handleDelete(curr_course.Dname, curr_course.Course_Num)}>Delete Course</button>
                        <button className="update"><Link to={`/updatebelongsto/${curr_course.Dname}/${curr_course.Course_Num}`}>Update</Link></button> 
                    </div>
                ))}
            </div>
            {/*This is just adding a button that sends you to the add page to make a new Student*/}
            
        </div>
    )
}

export default BelongsTo;