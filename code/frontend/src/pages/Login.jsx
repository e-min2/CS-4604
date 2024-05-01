import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() 

    function handleSubmit(event) {
        event.preventDefault();
    
        axios.post("http://localhost:8800/login", { email, password })
            .then(response => {

                const token = response.data.token;

                // This will store the token in localStorage, allowing us to retrieve it later.
                localStorage.setItem('token', token);

                const userRole = jwtDecode(token).role;

                if (userRole === 'Admin') {
                    navigate("/adminlanding");
                } else {
                    // We need to make a student landing so for now we'll direct everyone to the admin landing page. 
                    navigate("/studentlanding");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="login">
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Enter Email' className ='form-control' onChange = { e => setEmail(e.target.value)}/>

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