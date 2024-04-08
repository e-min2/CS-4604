import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateTaughtBy = () => {

    const [taughtBy, setTaughtBy] = useState ({
        C_Num: "",
        Teach_ID: null
    });


    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library
    const location = useLocation()

    //console.log(location.pathname.split("/")[2])

    const c_num = location.pathname.split("/")[2];
    const prof_ID = location.pathname.split("/")[3];


    const handleChange = (e) =>{
        setTaughtBy(prev =>({...prev, [e.target.name]: e.target.value}))
        // Whenever changes happen in the form the handleChange function is called which updates our current student 
    }

    const handleUpdate = async e => {
        e.preventDefault()
        try{
            // We'll uise axios to send our put requests to our backend to update.
            await axios.put("http://localhost:8800/taughtby/param1="+ c_num +"&param2="+ prof_ID, taughtBy); // This is the api call we wrote for put requests to our database in order to update.
            navigate("/taughtby") // If everything was successful navigate to the home page. 
        }catch(err){
            console.log(err)
        }
    }


    return (

        <div className='form'>
            <h1>Update Taught By</h1>
            <input type="text" placeholder='Course Number' onChange={handleChange} name = "C_Num"></input>
            <input type="number" placeholder='Instructor ID' min="9" max ="9" onChange={handleChange} name = "Teach_ID"></input>
            <button className="formButton" onClick={handleUpdate}>Update</button> 
            {/*Every time the Add button is clicked the handleClick function is called to make a post request to submit the
                student json object to the backend in order for it to be uploaded to the database.*/}
        </div>
    )
}

export default UpdateTaughtBy