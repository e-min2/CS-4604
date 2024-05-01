import express from "express"
import mysql from "mysql"
import cors from "cors"
import jwt from "jsonwebtoken"


const app = express()


const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"", // Put your password for your MySQL here
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

app.get("/taughtby", (req, res) => {
    const q = "SELECT * FROM TAUGHT_BY";
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

app.get("/belongsto", (req, res) => {
    const q = "SELECT * FROM BELONGS_TO";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data)
        }
    })
})

app.get("/majors", (req, res) => { 
    const q = "SELECT * FROM MAJOR";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get("/minors", (req, res) => {
    const q = "SELECT * FROM MINOR";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get("/courses/:instructorname", (req, res) => {
    const instructorName = req.params.instructorname;

    const q = `
        SELECT DISTINCT c.Course_Number, c.CGPA_VALUE
        FROM COURSE c
        JOIN TAUGHT_BY tb ON c.Course_Number = tb.C_Num
        JOIN INSTRUCTOR i ON tb.Teach_ID = i.Teacher_ID
        WHERE i.Instructor_Name = ?
    `;

    db.query(q, [instructorName], (err, data) => {
        if (err) {
            console.log(err);
        } else {
           // console.log("Showing instructor's courses worked!!");
            return res.json(data);
        }
    });
});

app.get("/users", (req, res) => {
    const q = "SELECT * FROM LOGIN"

    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
           return res.json(data);
        }
    })
})

app.get("/majors/:majname", (req, res) => {
    const majName = req.params.majname; 

    const q = "SELECT SGPA_Value FROM STUDENT WHERE MAJOR = ?"; 

    db.query(q, [majName], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(data);
        }
    })
     
})

app.get("/minors/:minname", (req, res) => {
    const minName = req.params.minname; 

    const q = "SELECT SGPA_Value FROM STUDENT WHERE MINOR = ?"; 

    db.query(q, [minName], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(data);
        }
    })
     
})


app.post('/login', (req, res) => {
    const q = "SELECT * FROM LOGIN WHERE Email = ? AND Password = ?";
    const {email, password} = req.body;

    db.query(q, [email, password], (err, data) => {
        if (err) {
            console.log("We did not find the username");
            console.log(err);
            return res.json("Login failed");
        } else {
            if (data.length > 0) {
                //console.log("WE found the username");
                const token = jwt.sign({id: data[0].Email, role: data[0].Account_Type.toString()}, 'jwt_secret_key', {expiresIn: '7d'}) // Making a jwt token to put in local storage.
                
                // Send the JWT and user details to front end
                return res.json({
                    message: "Login successful",
                    token: token,
                });
            } else {
                return res.json("No record");   
            }
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

app.post("/taughtby", (req, res) => {
    const q = "INSERT INTO TAUGHT_BY (`C_Num`, `Teach_ID`) VALUES (?)";
    const values = [req.body.C_Num, req.body.Teach_ID];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into TAUGHT_BY:", err); 
            return res.json(err);
        } else {
            console.log("Successfully added a new course taught by");
            return res.json("TAUGHT_BY course has been added");
        }
    })
})

app.post("/belongsto", (req, res) => {
    const q = "INSERT INTO BELONGS_TO (`Dname`, `Course_Num`) VALUES (?)";
    const values = [req.body.Dname, req.body.Course_Num];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into Belongs To:", err); 
            return res.json(err);
        } else {
            console.log("Successfully added a new course belongs to");
            return res.json("BELONGS_TO course has been added");
        }
    })
})

app.post("/majors", (req, res) => {
    const q = "INSERT INTO MAJOR (`Major_Name`, `Major_Dep`) VALUES (?)";
    const values = [req.body.Major_Name, req.body.Major_Dep]; 

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into Major:", err);
            return res.json(err);
        } else {
            console.log("Successfully added a new major to Major");
            return res.json("New major has been added");
        }
    })
})

app.post("/minors", (req, res) => {
    const q = "INSERT INTO MINOR (`Minor_Name`, `Minor_Dep`) VALUES (?)";
    const values = [req.body.Minor_Name, req.body.Minor_Dep]; 

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting into Minor:", err);
            return res.json(err);
        } else {
            console.log("Successfully added a new minor to MINOR");
            return res.json("New minor has been added");
        }
    })
})

app.post("/users", (req, res) => {
    const q = "INSERT INTO LOGIN (`Email`, `Password`, `Account_Type`) VALUES (?)";
    const values = [req.body.Email, req.body.Password, req.body.Account_Type];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting a user into LOGIN:", err);
            return res.json(err);
        } else {
            console.log("Successfully added a new user to LOGIN");
            return res.json("New user has been added");
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
    const courseNumber = req.params.number;
    const prereq = req.params.prereq;


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

app.delete("/belongsto/param1=:department&param2=:cnumber", (req, res)=>{
    const department = req.params.department;
    const cnumber = req.params.cnumber;

    console.log(department);
    console.log(cnumber);

    const q = "DELETE FROM BELONGS_TO WHERE Dname = ? AND Course_Num = ?";

    db.query(q, [department, cnumber], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log(data)
            if (data.affectedRows > 0) {
                console.log("Successfully deleted in BELONGS_TO");
            }
            else {
                console.error("Error deleting belongs to:", err); 
            }
            return res.json("BELONGS_TO has been deleted");
        }
    })
})

app.delete("/taughtby/param1=:cnumber&param2=:profid", (req, res)=>{
    const course_num = req.params.cnumber
    const prof_id = req.params.profid;

    console.log(course_num)
    console.log(prof_id)

    const q = "DELETE FROM TAUGHT_BY WHERE C_Num = ? AND Teach_ID = ?";

    db.query(q, [course_num, prof_id], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            console.log(data)
            if (data.affectedRows > 0) {
                console.log("Successfully deleted in TAUGHT_BY");
            }
            else {
                console.error("Error deleting taught by:", err); 
                console.log("Not real");
            }
            return res.json("TAUGHT_BY has been deleted");
        }
    })
})

app.delete("/majors/:name", (req, res) => {
    const maj_name = req.params.name; 

    const q = "DELETE FROM MAJOR WHERE Major_Name = ?"

    db.query (q, [maj_name], (err, data) => {
        if (err) {
            return res.json(errr);
        } else {
            if (data.affectedRows > 0) {
                console.log("Successfully deleted a Major");
            } else {
                console.error("Error deleting major:", err);
                console.log("Not real");
            }
            return res.json("Major has been deleted");
        }
    })
})

app.delete("/minors/:name", (req, res) => {
    const maj_name = req.params.name; 

    const q = "DELETE FROM MINOR WHERE Minor_Name = ?"

    db.query (q, [maj_name], (err, data) => {
        if (err) {
            return res.json(errr);
        } else {
            if (data.affectedRows > 0) {
                console.log("Successfully deleted a Minor");
            } else {
                console.error("Error deleting minor:", err);
                console.log("Not real");
            }
            return res.json("Minor has been deleted");
        }
    })
})

app.delete("/users/:email", (req, res) => {
    const user_email = req.params.email; 
    const q = "DELETE FROM LOGIN WHERE Email = ?"; 

    db.query(q, [user_email], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            if (data.affectedRows > 0) {
                console.log("Successfully deleted an account");
            } else {
                console.error("Error deleting an account:", err);
                console.log("note real");
            }
            return res.json("Successfully deleted an account");
        }
    })
})


app.put("/students/:id", (req, res) => {
    const studentID = req.params.id;
    // Params represents the URL and the id part represents the id given in the URL. 
    // If we want to update students, we need to have a specific ID we use to update it, in this case, their student ID. 

    const q = "UPDATE STUDENT SET `Student_ID` = ?, `Student_Name` = ?, `Major` = ?, `Minor` = ?, `Year` = ?, `SGPA_Value` = ? WHERE Student_ID = ?";

    const values = [req.body.Student_ID, req.body.Student_Name, req.body.Major, req.body.Minor, req.body.Year, req.body.SGPA_Value, studentID];
    // Body represents the data sent in from the students variable within the update function. 

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
                    console.log("Successfully updated a student");
                    return res.json("Student has been updated");
                }
            })
        }
    })
})

app.put("/instructors/:id", (req, res) => {
    const instructorID = req.params.id;

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

app.put("/taughtby/param1=:cnumber&param2=:profid", (req, res) => {
    const current_course_num = req.params.cnumber
    const current_prof_id = req.params.profid;

    const q = "UPDATE TAUGHT_BY SET `C_Num` = ?, `Teach_ID` = ? WHERE C_Num = ? AND Teach_ID = ?" ;
    const values = [req.body.C_Num, req.body.Teach_ID];

    db.query(q, [...values, current_course_num, current_prof_id], (err, data) => {
        if (err) {
            console.error("Error updating TAUGHT_BY:", err); 
            return res.json(err);
        } else {
            console.log("Successfully updated a TAUGHT_BY");
            return res.json("TAUGHT_BY has been updated");
        }
    })
})

app.put("/belongsto/param1=:department&param2=:cnumber", (req, res) => {
    const department = req.params.department;
    const cnumber = req.params.cnumber;

    const q = "UPDATE BELONGS_TO SET `Dname` = ?, `Course_Num` = ? WHERE Dname = ? AND Course_Num = ?" ;
    const values = [req.body.Dname, req.body.Course_Num];

    db.query(q, [...values, department, cnumber], (err, data) => {
        if (err) {
            console.error("Error updating BELONGS_TO:", err); 
            return res.json(err);
        } else {
            console.log("Successfully updated a BELONGS_TO");
            return res.json("BELONGS_TO has been updated");
        }
    })
})


app.put("/majors/:majname", (req, res) => {

    const majname = req.params.majname;
    const values = [req.body.Major_Name, req.body.Major_Dep]; 

    const q = "UPDATE MAJOR SET `Major_Name` = ?, `Major_Dep` = ? WHERE Major_Name = ?";

    db.query(q, [...values, majname], (err, data) => {
        if (err) {
            console.error("Error updating MAJOR:", err);
            return res.json(err);
        } else {
            console.log("Sucessfully updated MAJOR");
            return res.json("Updated MAJOR"); 
        }
    })

})

app.put("/minors/:minname", (req, res) => {

    const minname = req.params.minname;
    const values = [req.body.Minor_Name, req.body.Minor_Dep]; 

    const q = "UPDATE MINOR SET `Minor_Name` = ?, `Minor_Dep` = ? WHERE Minor_Name = ?"

    db.query(q, [...values, minname], (err, data) => {
        if (err) {
            console.error("Error updating MINOR:", err);
            return res.json(err);
        } else {
            if (data.affectedRows > 0) {
                console.log("Sucessfully updated MINOR");
            } else {
                console.error("Error updating a minor:", err);
                console.log("note real");
            }
            return res.json("Updated MINOR"); 
        }
    })

})


app.put("/updateuser/:email", (req, res) => {
    const email = req.params.email;
    const values = [req.body.Email, req.body.Password, req.body.Account_Type];

    const q = "UPDATE LOGIN SET `Email` = ?, `Password` = ?, `Account_Type` = ? WHERE Email = ?";

    db.query(q, [...values, email], (err, data) => {
        if (err) {
            console.error("Error updating LOGIN:", err);
            return res.json(err);
        } else {
            console.log("Succesfully updated User");
            return res.json("Updated LOGIN"); 
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
