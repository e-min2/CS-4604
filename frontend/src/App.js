import * as React from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStudent";
import Instructors from "./pages/Instructors";
import AddInstructor from "./pages/AddInstructor";
import UpdateInstructor from "./pages/UpdateInstructor";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import UpdateDepartment from "./pages/UpdateDepartment";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import UpdateCourse from "./pages/UpdateCourse";
import TaughtBy from "./pages/TaughtBy";
import UpdateTaughtBy from "./pages/UpdateTaughtBy";
import AddTaughtBy from "./pages/AddTaughtBy";
import BelongsTo from "./pages/BelongsTo";
import AddBelongsTo from "./pages/AddBelongsTo";
import UpdateBelongsTo from "./pages/UpdateBelongsTo";
import Major from "./pages/Major";
import AddMajor from "./pages/AddMajor";
import "./style.css";




function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            {/*This just creates all the possible links a user can use to go to various webpages on our website.*/}
            <Route path="/students" element={<Students/>}/>
            <Route path="/add" element={<AddStudent/>}/>
            <Route path="/update/:id" element={<UpdateStudent/>}/> 
            <Route path="/instructors" element={<Instructors/>}/>
            <Route path="/addinstructor" element={<AddInstructor/>}/>
            <Route path="/updateinstructors/:id" element={<UpdateInstructor/>}/>
            <Route path="/departments" element={<Departments/> }/>
            <Route path="/adddepartment" element={<AddDepartment />}/>
            <Route path="/updatedepartment/:name" element={<UpdateDepartment />}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/addcourse" element={<AddCourse />}/>
            <Route path="/updatecourse/:number/:prereq" element={<UpdateCourse />}/> 
            <Route path="/taughtby" element={<TaughtBy/>}/>
            <Route path="/addtaughtby" element={<AddTaughtBy/>}/>
            <Route path="/updatetaughtby/:cnumber/:profid" element={<UpdateTaughtBy />}/>
            <Route path="/belongsto" element={<BelongsTo />} />
            <Route path="/addbelongsto" element={<AddBelongsTo/>}/>
            <Route path="/updatebelongsto/:department/:cnumber" element={<UpdateBelongsTo />}/>
            <Route path="/majors" element={<Major/>}/>
            <Route path="/addmajor" element={<AddMajor/>}/>

            {/* The id part at the end makes sure the current student/instructor's id shows up in the url on the update page */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
