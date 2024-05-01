import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTaughtBy = () => {

    const [taughtby, setTaughtBy] = useState ({
        C_Num: "",
        Teach_ID: null
    });

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library

    const handleChange = (e) =>{
        setTaughtBy(prev =>({...prev, [e.target.name]: e.target.value}));
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleClick = async e => {
        /*EVERY TIME WE ADD STUDENT WE ALSO NEED TO ADD AN ENTRY FOR THE DECLARES TABLE AS WELL*/ 
        e.preventDefault() // This prevents our page from refreshing when the add button is clicked.
        try{
            // We'll uise axios to send our post requests to our backends
            await axios.post("http://localhost:8800/taughtby", taughtby) // This is the api call we wrote for post requests to our database. 
            navigate("/taughtby") // If everything was successful navigate to the students page. 
        }catch(err){

        }
    }


    return (
        <div className='form'>
            <h1>Add Taught By</h1>
            <input type="text" placeholder='Course Number' onChange={handleChange} name = "C_Num"></input>
            <input type="number" placeholder='Instructor ID' min="9" max ="9" onChange={handleChange} name = "Teach_ID"></input>
            <button className="formButton" onClick={handleClick}>Add Course Taught By</button> 

        </div>
    )
}

export default AddTaughtBy