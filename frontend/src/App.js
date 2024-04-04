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
import Add from "./pages/Add";
import Update from "./pages/Update";
import Instructors from "./pages/Instructors";
import AddInstructor from "./pages/AddInstructor";
import UpdateInstructor from "./pages/UpdateInstructor";
import "./style.css";



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            {/*This just creates all the possible links a user can use to go to various webpages on our website.*/}
            <Route path="/students" element={<Students/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update/:id" element={<Update/>}/> 
            <Route path="/instructors" element={<Instructors/>}/>
            <Route path="/addinstructor" element={<AddInstructor/>}/>
            <Route path="/updateinstructors/:id" element={<UpdateInstructor/>}/>
            {/*The id part at the end makes sure the current student/instructor's id shows up in the url on the update page*/}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
