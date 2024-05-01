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
import UpdateMajor from "./pages/UpdateMajor";
import Minor from "./pages/Minor";
import AddMinor from "./pages/AddMinor";
import UpdateMinor from "./pages/UpdateMinor";
import Login from "./pages/Login";
import AdminLanding from "./pages/AdminLanding";
import CourseSearch from "./pages/CourseSearch";
import InstructorSearch from "./pages/InstructorSearch";
import StudentSearch from "./pages/StudentSearch";
import MajorSearch from "./pages/MajorSearch";
import MinorSearch from "./pages/MinorSearch";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";
import RoleRoutes from "./pages/RoleRoutes";
import StudentLanding from "./pages/StudentLanding";
import { Class } from "@mui/icons-material";
import "./style.css";



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            {/*This just creates all the possible links a user can use to go to various webpages on our website.*/}
            <Route path="/students" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Students/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/students" element={<Students/>}/> */}

            <Route path="/add" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddStudent/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/add" element={<AddStudent/>}/> */}

            <Route path="/update/:id" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateStudent/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/update/:id" element={<UpdateStudent/>}/>  */}

            <Route path="/instructors" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Instructors/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/instructors" element={<Instructors/>}/> */}

            <Route path="/addinstructor" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddInstructor/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/addinstructor" element={<AddInstructor/>}/> */}

            <Route path="/updateinstructors/:id" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateInstructor/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/updateinstructors/:id" element={<UpdateInstructor/>}/> */}

            <Route path="/departments" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Departments/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/departments" element={<Departments/> }/> */}

            <Route path="/adddepartment" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddDepartment/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/adddepartment" element={<AddDepartment />}/> */}

            <Route path="/updatedepartment/:name" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateDepartment/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/updatedepartment/:name" element={<UpdateDepartment />}/> */}

            <Route path="/courses" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Courses/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/courses" element={<Courses/>}/> */}

            <Route path="/addcourse" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddCourse/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/addcourse" element={<AddCourse />}/> */}

            <Route path="/updatecourse/:number/:prereq" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateCourse/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/updatecourse/:number/:prereq" element={<UpdateCourse />}/>  */}

            <Route path="/taughtby" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <TaughtBy/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/taughtby" element={<TaughtBy/>}/> */}

            <Route path="/addtaughtby" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddTaughtBy/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/addtaughtby" element={<AddTaughtBy/>}/> */}

            <Route path="/updatetaughtby/:cnumber/:profid" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateTaughtBy/>
              </RoleRoutes>
            }/>  
            {/* <Route path="/updatetaughtby/:cnumber/:profid" element={<UpdateTaughtBy />}/> */}

            <Route path="/belongsto" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <BelongsTo/>
              </RoleRoutes>
            }/> 
            {/* <Route path="/belongsto" element={<BelongsTo />} /> */}

            <Route path="/addbelongsto" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddBelongsTo/>
              </RoleRoutes>
            }/> 
            {/* <Route path="/addbelongsto" element={<AddBelongsTo/>}/> */}

            <Route path="/updatebelongsto/:department/:cnumber" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateBelongsTo/>
              </RoleRoutes>
            }/> 
            {/* <Route path="/updatebelongsto/:department/:cnumber" element={<UpdateBelongsTo />}/> */}

            <Route path="/majors" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Major/>
              </RoleRoutes>
            }/> 
            {/* <Route path="/majors" element={<Major/>}/> */}

            <Route path="/addmajor" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddMajor/>
              </RoleRoutes>
            }/>
            {/* <Route path="/addmajor" element={<AddMajor/>}/> */}

            <Route path="/updatemajor/:majname" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateMajor/>
              </RoleRoutes>
            }/>
            {/* <Route path="/updatemajor/:majname" element={<UpdateMajor/>}/> */}

            <Route path="/minors" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Minor/>
              </RoleRoutes>
            }/>
            {/* <Route path="/minors" element={<Minor/>}/> */}

            <Route path="/addminor" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddMinor/>
              </RoleRoutes>
            }/>
            {/* <Route path="/addminor" element={<AddMinor/>}/> */}

            <Route path="/updateminor/:minname" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateMinor/>
              </RoleRoutes>
            }/>
            {/* <Route path="/updateminor/:minname" element={<UpdateMinor/>}/> */}

            <Route path="/users" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <Users/>
              </RoleRoutes>
            }/>
            {/* <Route path="/users" element={<Users/>}/> */}

            <Route path="/adduser" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <AddUser/>
              </RoleRoutes>
            }/>
            {/* <Route path="/adduser" element={<AddUser/>}/> */}

            <Route path="/updateuser/:email" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <UpdateUser/>
              </RoleRoutes>
            }/>
            {/* <Route path="/updateuser/:email" element={<UpdateUser/>}/> */}

            <Route path="/studentsearch" element={
              <RoleRoutes allowedRoles={['Admin']}>
                <StudentSearch/>
              </RoleRoutes>
            }/>
             {/* <Route path="/studentsearch" element={<StudentSearch />}/> */}

             <Route path="/adminlanding" element={
              <RoleRoutes allowedRoles={['Admin', 'Student']}>
                <AdminLanding/>
              </RoleRoutes>
            }/>
            {/* <Route element={<AdminLanding />} path="/landing" /> */}

            <Route element={<Login />} path="/" />
            <Route path="/coursesearch" element={<CourseSearch/>}/>   {/*STUDENT COMPONENT*/}
            <Route path="/instructorsearch" element={<InstructorSearch/>}/> {/*STUDENT COMPONENT*/}
            <Route path="/majorsearch" element={<MajorSearch />}/> {/*STUDENT COMPONENT*/}
            <Route path="/minorsearch" element={<MinorSearch />}/> {/*STUDENT COMPONENT*/}
            <Route path="/studentlanding" element={<StudentLanding/>}/> {/*STUDENT COMPONENT*/}

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
