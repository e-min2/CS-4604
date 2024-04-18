import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CourseSearch = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const res = await axios.get("http://localhost:8800/courses");
                setCourses(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllCourses();
    }, []);

    // This is just styling for the search bar. 
    const inputStyle = {
        padding: 12,
        width: "100%",
        fontSize: '105%'
    };

    const onSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    // This function filters all the courses we queried for from the get request above which stores every course in the courses variable. 
    const filteredCourses = courses.filter(course => 
        course.Course_Number.toLowerCase().includes(searchTerm) ||
        // (course.Prerequisites && course.Prerequisites.toLowerCase().includes(searchTerm)) || 
        // option will allow for people to search for classes in the pre-reqs but I feel like it makes the searches more clunky so if we want it on we can uncomment it.
        (course.Departments && course.Departments.toLowerCase().includes(searchTerm))
    );

    const gpa_sum = filteredCourses.reduce((sum, course) => sum + course.CGPA_Value, 0);
    const gpa_avg = gpa_sum / filteredCourses.length;

    // This is basically preparing the data for the bar chart
    const chartData = filteredCourses.map(course => ({
        name: course.Course_Number,
        GPA: course.CGPA_Value
    }));

    return (
        <div>
            <h1>List of all Courses</h1>
            <div className="courses">
                <input 
                    type="search" 
                    className="search" 
                    placeholder="Type Course Name or Department" 
                    style={inputStyle} 
                    onChange={e => onSearchChange(e.target.value)}
                />
                {searchTerm && ( // I have it set so the graph only renders when there is a search term because the graph gets filled with every class. 
                    <>
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
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="GPA" fill="#8884d8" />
                        </BarChart>
                        <h2>Average GPA Of Course: {gpa_avg.toFixed(2)}</h2>
                    </>
                )}
                {filteredCourses.map(course => (
                    <div className="course" key={`${course.Course_Number}-${course.Prerequisites}`}> 
                        <h2>{course.Course_Number}</h2>
                        <span><b>Prerequisites: </b> {course.Prerequisites || 'None'}, </span> 
                        <span><b>Departments:  </b> {course.Departments || 'None'},  </span> 
                        <span><b>Course GPA:  </b> {course.CGPA_Value || 'N/A'} </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseSearch;