import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Majors = () => {

    const [majors, setMajors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [gpas, setGPAS] = useState([]);

    useEffect(() => {
        const fetchAllMajors = async () => {
            try{
                const res = await axios.get("http://localhost:8800/majors");
                setMajors(res.data);
                console.log(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        fetchAllMajors();
    }, [])


    useEffect(() => {
        const fetchAllGPASForMajors = async () => {
            if (searchTerm) {
                try {
                    const res = await axios.get(`http://localhost:8800/majors/${searchTerm}`);
                    setGPAS(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        fetchAllGPASForMajors()
    }, [searchTerm])

    const inputStyle = {
        padding: 12,
        width: "100%",
        fontSize: '105%'
    };

    const onSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredMajors = majors.filter(major => 
        major.Major_Name.toLowerCase().includes(searchTerm) ||
        // (course.Prerequisites && course.Prerequisites.toLowerCase().includes(searchTerm)) || 
        // option will allow for people to search for classes in the pre-reqs but I feel like it makes the searches more clunky so if we want it on we can uncomment it.
        (major.Major_Dep && (major.Major_Dep.toLowerCase().includes(searchTerm)))
    );

    const filteredGPAs = gpas.filter(curr_gpa => {
        console.log(curr_gpa);
    })

    const gpa_sum = gpas.reduce((sum, curr_gpa) => sum + curr_gpa.SGPA_Value, 0);
    const gpa_avg = gpa_sum / gpas.length;

    const chartData = [{
        name: "Average GPA Of Searched Major",
        GPA: gpa_avg.toFixed(2)
    }];

    return (
        <div>
        <h1>List Of All Majors</h1>
        <div className="courses">
            <input 
                type="search" 
                className="search" 
                placeholder="Type Major Name or Department Name" 
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
            {filteredMajors.map(major => (
                <div className="instructor" key={`${major.Major_Name}`}> 
                    <h2>{major.Major_Name}</h2>
                    <span><b>Department: </b> {major.Major_Dep}, </span> 
                </div>
            ))}
        </div>
    </div>
            )

}

export default Majors