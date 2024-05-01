import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Students = () => {

    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchAllStudents = async () => {
            try{
                const res = await axios.get("http://localhost:8800/students") 
                // We made it so get requests ending with /instructors within backend will get all instructor user data .
                // This function will then get all student user data and provide it in the console. 
                setStudents(res.data);
                console.log(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllStudents()
    }, [])


    //  useEffect(() => {
    //     const fetchAllCoursesForInstructors = async () => {
    //         if (searchTerm) {
    //             try {
    //                 const res = await axios.get(`http://localhost:8800/courses/${searchTerm}`);
    //                 setFilteredCourses(res.data);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //     }
    //     fetchAllCoursesForInstructors()
    // }, [searchTerm])


    const inputStyle = {
        padding: 12,
        width: "100%",
        fontSize: '105%'
    };

    const onSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredStudents = students.filter(student => 
        student.Student_Name.toLowerCase().includes(searchTerm) ||
        (student.Major.toLowerCase().includes(searchTerm) || student.Minor.toLowerCase().includes(searchTerm))
    );

    const gpa_sum = filteredStudents.reduce((sum, student) => sum + student.SGPA_Value, 0);
    const gpa_avg = gpa_sum / filteredStudents.length;

    // This is basically preparing the data for the bar chart
    // const chartData = filteredStudents.map(student => ({
    //     name: "Average GPA Of Students Searched",
    //     GPA: gpa_avg
    // }));

    const chartData = [{
        name: "Average GPA Of Students Searched",
        GPA: gpa_avg.toFixed(2)
    }];


    return (
        <div>
        <h1>List Of All Students</h1>
        <div className="courses">
            <input 
                type="search" 
                className="search" 
                placeholder="Type Student Name or Major/Minor" 
                style={inputStyle} 
                onChange={e => onSearchChange(e.target.value)}
            />
            {searchTerm && chartData.length > 0 && ( // I have it set so the graph only renders when there is a search term because the graph gets filled with every class. 
                <BarChart
                    width={1300}
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
            {filteredStudents.map(student => (
                <div className="instructor" key={`${student.Student_ID}`}> 
                    <h2>{student.Student_Name}</h2>
                    <span><b>Student's Major: </b>{student.Major}, </span>
                    <span><b>Student's Minor: </b> {student.Minor}, </span>
                </div>
            ))}
        </div>
    </div>
            )

}

export default Students