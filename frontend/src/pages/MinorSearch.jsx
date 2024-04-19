import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Minors = () => {

    const [minors, setMinors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllMinors = async () => {
            try{
                const res = await axios.get("http://localhost:8800/minors");
                setMinors(res.data);
                console.log(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        fetchAllMinors();
    }, [])

    const inputStyle = {
        padding: 12,
        width: "100%",
        fontSize: '105%'
    };

    const onSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredMinors = minors.filter(minor => 
        (minor.Minor_Name.toLowerCase().includes(searchTerm) || 
        (minor.Minor_Dep && minor.Minor_Dep.toLowerCase().includes(searchTerm)))
    );
    return (
        <div>
        <h1>List Of All Minors</h1>
        <div className="courses">
            <input 
                type="search" 
                className="search" 
                placeholder="Type Minor Name or Department Name" 
                style={inputStyle} 
                onChange={e => onSearchChange(e.target.value)}
            />
            {filteredMinors.map(minor => (
                <div className="instructor" key={`${minor.Minor_Name}`}> 
                    <h2>{minor.Minor_Name}</h2>
                    <span><b>Department: </b> {minor.Minor_Dep}, </span> 
                </div>
            ))}
        </div>
    </div>
            )

}

export default Minors