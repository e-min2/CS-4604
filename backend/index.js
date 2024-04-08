import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"W0rdP455!1!", // Put your password for your MySQL here
    database:"grade_distribution_dbms" // Put where you named the dbms but I call it grade_system_dbms

})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/students", (req, res) => {
    const q = "SELECT * FROM STUDENT";
    db.query(q, (err, data) => { // This will query our database db and return a json response of either error or the db data
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get("/instructors", (req, res) => {
    const q = "SELECT * FROM INSTRUCTOR";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data)
        }
    })
})

app.get("/departments", (req, res) => {
    const q = "SELECT * FROM DEPARTMENT";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data)
        }
    })
})


app.get("/courses", (req, res) => {
    const q = "SELECT * FROM COURSE";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data)
        }
    })
})

app.post("/students", (req, res) => {
    const q = "INSERT INTO STUDENT (`Student_ID`, `Student_Name`, `Major`, `Minor`, `Year`, `SGPA_Value`) VALUES (?)";
    const values = [req.body.Student_ID, req.body.Student_Name, req.body.Major, req.body.Minor, req.body.Year, req.body.SGPA_Value];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            const q2 = "INSERT INTO DECLARES (`Stud_ID`, `Maj_Name`, `Min_Name`) VALUES (?)";
            const values2 = [req.body.Student_ID, req.body.Major, req.body.Minor];
            db.query(q2, [values2], (err2, data2) => {
            // Within this else block we can initiate another insert query into the DECLARES table. 
                if (err2) {
                   // console.log("fail");
                   // console.error("Error inserting into DECLARES:", err2); Was just error checking
                    return res.json(err2);
                } else {
                    console.log("Successfully added a new student");
                    return res.json("Student has been added");
                }
            })
        }
    })
})

app.post("/instructors", (req, res) => {
    const q = "INSERT INTO INSTRUCTOR (`Teacher_ID`, `Instructor_Name`, `Inst_Dep`) VALUES (?)";
    const values = [req.body.Teacher_ID, req.body.Instructor_Name, req.body.Inst_Dep];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into INSTRUCTOR:", err); 
            return res.json(err);
        } else {
            console.log("Successfully added a new professor");
            return res.json("Instructor has been added");
        }
    })
})

app.post("/departments", (req, res) => {
    const q = "INSERT INTO DEPARTMENT (`Department_Name`, `Contact_Info`, `Head_ID`) VALUES (?)";
    const values = [req.body.Department_Name, req.body.Contact_Info, req.body.Head_ID];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into DEPARTMENT:", err); 
            return res.json(err);
        } else {
            console.log("Successfully added a new department");
            return res.json("Department has been added");
        }
    })
})

app.post("/courses", (req, res) => {
    const q = "INSERT INTO COURSE (`Course_Number`, `Prerequisites`, `Departments`, `CGPA_Value`) VALUES (?)";
    const values = [req.body.Course_Number, req.body.Prerequisites, req.body.Departments, parseFloat(req.body.CGPA_Value)];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into COURSE:", err); 
            return res.json(err);
        } else {
            console.log("Successfully added a new course");
            return res.json("Course has been added");
        }
    })
})


app.delete("/students/:id", (req, res)=>{
    const studentID = req.params.id
    // Params represents the url and the id part represents the id given in the url. 
    // If we wanna delete stuff we need to have a specific ID we use to delete it. 
    // I don't think we need to account for deleting students from DECLARES table also since I enabled cascade on delete for the fk.

    const q = "DELETE FROM STUDENT WHERE Student_ID = ?"

    db.query(q, [studentID], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log("Successfully deleted a student");
            return res.json("Student has been deleted");
        }
    })
})

app.delete("/instructors/:id", (req, res)=>{
    const instructorID = req.params.id
    // Params represents the url and the id part represents the id given in the url. 
    // If we wanna delete stuff we need to have a specific ID we use to delete it. 
    // I don't think we need to account for deleting students from DECLARES table also since I enabled cascade on delete for the fk.

    const q = "DELETE FROM INSTRUCTOR WHERE Teacher_ID = ?"

    db.query(q, [instructorID], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log("Successfully deleted a professor");
            return res.json("Insutructor has been deleted");
        }
    })
})

app.delete("/departments/:name", (req, res)=>{
    const departmentName = req.params.name
    // Params represents the url and the id part represents the id given in the url. 
    // If we wanna delete stuff we need to have a specific ID we use to delete it. 
    // I don't think we need to account for deleting students from DECLARES table also since I enabled cascade on delete for the fk.

    const q = "DELETE FROM DEPARTMENT WHERE Department_Name = ?"

    db.query(q, [departmentName], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log("Successfully deleted a department");
            return res.json("Department has been deleted");
        }
    })
})

app.delete("/courses/param1=:number&param2=:prereq", (req, res)=>{
    const courseNumber = req.params.number
    const prereq = req.params.prereq

    console.log(courseNumber)
    console.log(prereq)

    const q = "DELETE FROM COURSE WHERE Course_Number = ? AND Prerequisites = ?";

    db.query(q, [courseNumber, prereq], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log(data)
            if (data.affectedRows > 0) {
                console.log("Successfully deleted a new course");
            }
            else {
                console.log("Not real");
            }
            return res.json("Course has been deleted");
        }
    })
})


app.put("/students/:id", (req, res) => {
    const studentID = req.params.id;
    // Params represents the URL and the id part represents the id given in the URL. 
    // If we want to update students, we need to have a specific ID we use to update it, in this case, their student ID. 

    const q = "UPDATE STUDENT SET `Student_ID` = ?, `Student_Name` = ?, `Major` = ?, `Minor` = ?, `Year` = ?, `SGPA_Value` = ? WHERE Student_ID = ?";

    const values = [req.body.Student_ID, req.body.Student_Name, req.body.Major, req.body.Minor, req.body.Year, req.body.SGPA_Value, studentID];

    db.query(q, [...values, studentID], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            // Execute the second query only after the first query completes successfully
            // This query will not work if the user decides to change their student ID but in the real world someone's student ID cannot change so it should be
            const q2 = "UPDATE DECLARES SET `Maj_Name` = ?, `Min_Name` = ? WHERE Stud_ID = ?";
            db.query(q2, [req.body.Major, req.body.Minor, studentID], (err2, data2) => {
                if (err2) {
                    return res.json(err2);
                } else {
                    console.log("Successfully deleted a student");
                    return res.json("Student has been updated");
                }
            })
        }
    })
})

app.put("/instructors/:id", (req, res) => {
    const instructorID = req.params.id;
    // Params represents the URL and the id part represents the id given in the URL. 
    // If we want to update students, we need to have a specific ID we use to update it, in this case, their teacher ID. 

    const q = "UPDATE INSTRUCTOR SET `Teacher_ID` = ?, `Instructor_Name` = ?, `Inst_Dep` = ? WHERE Teacher_ID = ?";

    const values = [req.body.Teacher_ID, req.body.Instructor_Name, req.body.Inst_Dep];

    db.query(q, [...values, instructorID], (err, data) => {
        if (err) {
            console.error("Error updating professors:", err); 
            return res.json(err);
        } else {
            console.log("Successfully updated a professor");
            return res.json("Professor has been updated");
        }
    })
})

app.put("/departments/:name", (req, res) => {
    const departmentName = req.params.name;
    // Params represents the URL and the id part represents the id given in the URL. 
    // If we want to update students, we need to have a specific ID we use to update it, in this case, their teacher ID. 

    const q = "UPDATE DEPARTMENT SET `Department_Name` = ?, `Contact_Info` = ?, `Head_ID` = ? WHERE Department_Name = ?";
    console.log("real\n");
    const values = [req.body.Department_Name, req.body.Contact_Info, req.body.Head_ID];

    db.query(q, [...values, departmentName], (err, data) => {
        if (err) {
            console.error("Error updating departments:", err); 
            return res.json(err);
        } else {
            console.log("Successfully updated a department");
            return res.json("Department has been updated");
        }
    })
})

app.put("/courses/param1=:number&param2=:prereq", (req, res) => {
    const courseNumber = req.params.number
    const prereq = req.params.prereq;
    // Params represents the URL and the id part represents the id given in the URL. 
    // If we want to update students, we need to have a specific ID we use to update it, in this case, their teacher ID. 

    const q = "UPDATE COURSE SET `Course_Number` = ?, `Prerequisites` = ?, `Departments` = ?, `CGPA_Value` = ? WHERE Course_Number = ? AND Prerequisites = ?" ;
    const values = [req.body.Course_Number, req.body.Prerequisites, req.body.Departments, req.body.CGPA_Value];

    db.query(q, [...values, courseNumber, prereq], (err, data) => {
        if (err) {
            console.error("Error updating courses:", err); 
            return res.json(err);
        } else {
            console.log("Successfully updated a course");
            return res.json("Course has been updated");
        }
    })
})


/*
 If you get an authentication error it's the issue that the TA mentioned that she had to fix, 
 I had it on my end as well and I had to fix it as well. The solution is in her slides. 
*/
app.listen(8800, ()=>{
 // This is our port number and you can connect with localHost:8800
    console.log("Connected to backend!!!")

})

