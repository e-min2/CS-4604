import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Minors = () => {

    const [minors, setMinors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [gpas, setGPAS] = useState([]);

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


    useEffect(() => {
        const fetchAllGPASForMinors = async () => {
            if (searchTerm) {
                try {
                    const res = await axios.get(`http://localhost:8800/minors/${searchTerm}`);
                    setGPAS(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        fetchAllGPASForMinors()
    }, [searchTerm])

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


    const gpa_sum = gpas.reduce((sum, curr_gpa) => sum + curr_gpa.SGPA_Value, 0);
    const gpa_avg = gpa_sum / gpas.length;

    const chartData = [{
        name: "Average GPA Of Searched Minor",
        GPA: gpa_avg.toFixed(2)
    }];


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
             {searchTerm && chartData.length > 0 && ( // I have it set so the graph only renders when there is a search term because the graph gets filled with every class. 
                <BarChart
                    width={500}
                    height={500}
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="GPA" fill="#8884d8" />
                </BarChart>
            )}
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