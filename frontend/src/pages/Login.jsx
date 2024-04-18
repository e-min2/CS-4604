import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() // This is a function that allows you to navigate from one page to another, it's from the react-router-dom library

    function handleSubmit(event) {
        event.preventDefault();
    
        axios.post("http://localhost:8800/login", { email, password })
            .then(response => {
                // Assuming a successful login is indicated by a specific status code in the response
                // For example, a status code of 200 indicates success
                if (response.status === 200) {
                    navigate("/landing");
                } else {
                    // Optionally handle unsuccessful login attempt
                    console.error('Login failed:', response);
                }
            })
            .catch(err => {
                // Handle any errors that occurred during the request
                console.log(err);
            })
    }

    return (
        <div className="login">
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className ='form-control' onChange = { e => setEmail(e.target.value)}/>

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="Password" placeholder='Enter Password' className ='form-control' onChange = { e => setPassword(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login